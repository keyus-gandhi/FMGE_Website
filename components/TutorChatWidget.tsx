import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Sparkles, 
  BookOpen, 
  RefreshCw, 
  AlertCircle, 
  GraduationCap, 
  X,
  MessageSquare,
  FileText,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  references?: { source_file: string; page_number: number }[];
}

const SUGGESTIONS = [
  "What is the powerhouse of the cell?",
  "Explain mitochondrial ATP production.",
  "What is LMR 3.0?",
  "High-yield Pathology topics"
];

function parseInlineMarkdown(text: string) {
  if (!text) return "";
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-bold text-slate-100">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderMarkdown(content: string) {
  if (!content) return null;
  const lines = content.split("\n");
  
  return lines.map((line, lineIdx) => {
    // 1. Check for headings
    if (line.startsWith("### ")) {
      return <h4 key={lineIdx} className="text-xs font-bold mt-2 mb-1 text-slate-100">{parseInlineMarkdown(line.slice(4))}</h4>;
    }
    if (line.startsWith("## ")) {
      return <h3 key={lineIdx} className="text-sm font-bold mt-2.5 mb-1 text-slate-50">{parseInlineMarkdown(line.slice(3))}</h3>;
    }
    if (line.startsWith("# ")) {
      return <h2 key={lineIdx} className="text-base font-bold mt-3 mb-1.5 text-white">{parseInlineMarkdown(line.slice(2))}</h2>;
    }

    // 2. Check for bullet list items
    const listMatch = line.match(/^[\s]*[-*+]\s+(.*)$/);
    if (listMatch) {
      return (
        <li key={lineIdx} className="ml-3 list-disc text-slate-200 mt-0.5 mb-0.5 text-xs leading-relaxed">
          {parseInlineMarkdown(listMatch[1])}
        </li>
      );
    }

    // 3. Regular paragraph or empty line
    if (line.trim() === "") {
      return <div key={lineIdx} className="h-1.5" />;
    }

    return (
      <p key={lineIdx} className="text-xs leading-relaxed text-slate-200 mb-0.5">
        {parseInlineMarkdown(line)}
      </p>
    );
  });
}

export default function TutorChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your AI Study Tutor. Ask me any medical or conceptual questions from your FMGE textbook preparation materials!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Check backend server status
  const checkBackend = async () => {
    setBackendStatus("checking");
    setErrorMsg(null);
    try {
      const response = await fetch("http://localhost:8000/api/health");
      if (response.ok) {
        setBackendStatus("online");
      } else {
        setBackendStatus("offline");
      }
    } catch (e) {
      setBackendStatus("offline");
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, isOpen]);

  // Close widget if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        // Option to close on outside click, comment out if annoying
        // setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (textToSubmit: string) => {
    if (!textToSubmit.trim() || loading) return;

    setErrorMsg(null);
    setLoading(true);
    setInput("");

    // Add user message to state
    const userMsg: Message = { role: "user", content: textToSubmit };
    setMessages(prev => [...prev, userMsg]);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: textToSubmit,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to generate answer from server.");
      }

      if (!response.body) {
        throw new Error("No response stream received from the backend.");
      }

      // Initialize the assistant message template in list
      setMessages(prev => [...prev, { role: "assistant", content: "", references: [] }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let accumulatedText = "";
      let fetchedReferences: { source_file: string; page_number: number }[] = [];
      let buffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
        const lines = buffer.split("\n");
        // Keep the last potentially incomplete line in buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            try {
              const data = JSON.parse(trimmed.slice(6));
              if (data.references) {
                fetchedReferences = data.references;
              }
              if (data.text) {
                accumulatedText += data.text;
              }
              if (data.error) {
                throw new Error(data.error);
              }

              // Update the assistant response state dynamically
              setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last.role === "assistant") {
                  last.content = accumulatedText;
                  last.references = fetchedReferences;
                }
                return updated;
              });
            } catch (jsonErr) {
              // Ignore partial parsing errors on split boundaries
            }
          }
        }
      }

      // Read any residual buffer content
      if (buffer.trim().startsWith("data: ")) {
        try {
          const data = JSON.parse(buffer.trim().slice(6));
          if (data.text) {
            accumulatedText += data.text;
            setMessages(prev => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === "assistant") {
                last.content = accumulatedText;
              }
              return updated;
            });
          }
        } catch (e) {}
      }

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Could not connect to Python backend on http://localhost:8000.");
      setMessages(prev => prev.filter((_, idx) => idx !== prev.length - 1)); // clean empty template
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          // Ping backend on toggle open to update status
          if (!isOpen) checkBackend();
        }}
        className={cn(
          "p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer relative group",
          isOpen ? "bg-slate-800 text-slate-200 rotate-90" : ""
        )}
        title="Open AI Study Tutor"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {/* Glow indicator if backend is online and widget is closed */}
        {!isOpen && backendStatus === "online" && (
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
          </span>
        )}
      </button>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[360px] sm:w-[380px] md:w-[410px] h-[550px] bg-slate-900/98 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn text-slate-100">
          
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-900 to-indigo-950/85 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-primary w-5 h-5 animate-pulse" />
              <div>
                <h2 className="text-sm font-bold tracking-tight bg-gradient-to-r from-primary to-indigo-300 bg-clip-text text-transparent">
                  AI Study Tutor
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {backendStatus === "checking" && (
                    <span className="text-[10px] text-yellow-400 flex items-center gap-0.5">
                      <RefreshCw size={8} className="animate-spin" /> Checking Backend
                    </span>
                  )}
                  {backendStatus === "online" && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Online
                    </span>
                  )}
                  {backendStatus === "offline" && (
                    <button 
                      onClick={checkBackend} 
                      className="text-[10px] text-rose-400 flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      <AlertCircle size={8} /> Offline (Retry)
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Warnings and errors */}
          {backendStatus === "offline" && (
            <div className="bg-rose-500/10 border-b border-rose-500/20 text-rose-300 text-[10px] px-3.5 py-2 flex items-center gap-2">
              <AlertCircle size={12} className="text-rose-400 shrink-0" />
              <span>
                Backend offline. Run <code>run.bat</code> in <code>python_backend</code>.
              </span>
            </div>
          )}
          {errorMsg && (
            <div className="bg-rose-500/10 border-b border-rose-500/20 text-rose-300 text-[10px] px-3.5 py-2 flex items-center gap-2">
              <AlertCircle size={12} className="text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Conversation Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/30">
            {messages.map((m, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col max-w-[85%] animate-fadeIn",
                  m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                {/* Bubble content */}
                <div 
                  className={cn(
                    "px-3.5 py-2 rounded-2xl text-xs leading-relaxed",
                    m.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none shadow-md" 
                      : "bg-slate-800/90 border border-slate-750 rounded-tl-none text-slate-200 shadow-sm"
                  )}
                >
                  <div className="prose prose-invert max-w-none">
                    {m.content ? renderMarkdown(m.content) : (loading && idx === messages.length - 1 ? (
                      <span className="flex items-center gap-1 py-1">
                        <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </span>
                    ) : null)}
                  </div>
                </div>

                {/* Citations block */}
                {m.role === "assistant" && m.references && m.references.length > 0 && (
                  <div className="mt-1.5 ml-1 flex flex-wrap gap-1">
                    <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-0.5">
                      <FileText size={8} /> Cited:
                    </span>
                    {m.references.map((ref, rIdx) => (
                      <span 
                        key={rIdx}
                        className="text-[9px] bg-slate-950 border border-slate-850 px-1.5 py-0.5 rounded text-indigo-400 font-medium"
                        title={`From textbook: ${ref.source_file}`}
                      >
                        {ref.source_file.replace(/_/, " ")} (Pg {ref.page_number})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Shelf */}
          {messages.length === 1 && !loading && (
            <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-850">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                Quick Prompts:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSubmit(s)}
                    className="text-left text-[10px] bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-primary/50 p-2 rounded-xl transition-all text-slate-400 hover:text-slate-200 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(input);
            }} 
            className="p-3 bg-slate-950 border-t border-slate-850/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                backendStatus === "offline"
                  ? "Start the Python server..."
                  : "Ask a question from textbook..."
              }
              disabled={loading || backendStatus === "offline"}
              className="flex-1 bg-slate-900 border border-slate-800 hover:border-slate-750 focus:border-primary/80 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none transition-colors disabled:opacity-50 text-slate-200"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading || backendStatus === "offline"}
              className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-40 p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-95 shrink-0"
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
