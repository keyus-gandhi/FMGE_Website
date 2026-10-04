import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  Headphones,
  Loader2,
  MessageCircle,
  RefreshCcw,
  Send,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserRound,
  Wrench,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "@formspree/react";
import { z } from "zod";

const supportSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  category: z.enum(["technical", "account", "billing", "content", "other"]),
  subject: z.string().trim().min(5, "Please add a short subject"),
  message: z.string().trim().min(10, "Please describe the issue in a little more detail"),
});

type SupportFormData = z.infer<typeof supportSchema>;
type SupportMessage = {
  id: number;
  sender: "student" | "support";
  text: string;
  time: string;
};

const troubleshootingSteps = [
  {
    icon: Trash2,
    title: "Clear the app cache",
    description:
      "Open your phone Settings, select Apps → Aspira Edge → Storage, then tap Clear cache. Reopen the app and try again.",
  },
  {
    icon: Download,
    title: "Update the app fully",
    description:
      "Open the App Store or Google Play, find Aspira Edge, and install every available update before testing again.",
  },
  {
    icon: RefreshCcw,
    title: "Restart your phone",
    description:
      "A full restart clears temporary background errors and reconnects the app to our services.",
  },
  {
    icon: Smartphone,
    title: "Reinstall the app",
    description:
      "If the issue remains, uninstall and reinstall Aspira Edge. Sign in with the same email so your purchases and progress sync.",
  },
];

const initialForm: SupportFormData = {
  name: "",
  email: "",
  category: "technical",
  subject: "",
  message: "",
};

function currentTime() {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export default function Support() {
  const [formData, setFormData] = useState<SupportFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SupportFormData, string>>>({});
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formState, submitToFormspree] = useForm("xzzypkqg");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!import.meta.env.DEV || !new URLSearchParams(window.location.search).has("previewTicket")) {
      return;
    }

    setTicketId("AE-PREVIEW");
    setMessages([
      {
        id: 1,
        sender: "student",
        text: "The app opens, but my video lessons are not loading.",
        time: currentTime(),
      },
      {
        id: 2,
        sender: "support",
        text: "Hi Student, we have received your technical issue. Please try the troubleshooting steps shown beside this chat and tell us what happens. A support specialist will review ticket AE-PREVIEW within 24 hours.",
        time: currentTime(),
      },
    ]);
  }, []);

  useEffect(() => {
    const chatPanel = chatScrollRef.current;
    if (chatPanel) {
      chatPanel.scrollTo({ top: chatPanel.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isReplying]);

  const progress = useMemo(
    () => Math.round((completedSteps.length / troubleshootingSteps.length) * 100),
    [completedSteps],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const field = event.target.name as keyof SupportFormData;
    setFormData((previous) => ({ ...previous, [field]: event.target.value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleIssueSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = supportSchema.safeParse(formData);

    if (!result.success) {
      const nextErrors: Partial<Record<keyof SupportFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof SupportFormData;
        nextErrors[field] = error.message;
      });
      setErrors(nextErrors);
      return;
    }

    const newTicketId = `AE-${Date.now().toString().slice(-6)}`;
    setTicketId(newTicketId);
    setMessages([
      {
        id: Date.now(),
        sender: "student",
        text: result.data.message,
        time: currentTime(),
      },
      {
        id: Date.now() + 1,
        sender: "support",
        text: `Hi ${result.data.name.split(" ")[0]}, we have received your ${result.data.category} issue. Please try the troubleshooting steps shown beside this chat and tell us what happens. A support specialist will review ticket ${newTicketId} within 24 hours.`,
        time: currentTime(),
      },
    ]);

    submitToFormspree(event);
    window.setTimeout(() => {
      document.getElementById("support-workspace")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleChatSubmit = (event: FormEvent) => {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message || isReplying) return;

    setMessages((previous) => [
      ...previous,
      { id: Date.now(), sender: "student", text: message, time: currentTime() },
    ]);
    setChatInput("");
    setIsReplying(true);

    window.setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      let reply =
        "Thank you for the update. We have added it to your ticket. Our support team will review the details and respond within 24 hours.";

      if (lowerMessage.includes("cache")) {
        reply =
          "Thanks for clearing the cache. Please close the app completely, reopen it, and check whether the issue still appears.";
      } else if (lowerMessage.includes("update")) {
        reply =
          "Great, the app is updated. Please restart your phone once and test the same action again.";
      } else if (lowerMessage.includes("reinstall")) {
        reply =
          "Thanks for reinstalling. Sign in with the same registered email, allow the first sync to finish, and tell us if the issue continues.";
      } else if (lowerMessage.includes("fixed") || lowerMessage.includes("working")) {
        reply =
          "Wonderful—glad it is working again. We’ll keep this ticket available in case you need to send another update.";
      }

      setMessages((previous) => [
        ...previous,
        { id: Date.now() + 1, sender: "support", text: reply, time: currentTime() },
      ]);
      setIsReplying(false);
    }, 700);
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((previous) =>
      previous.includes(index)
        ? previous.filter((step) => step !== index)
        : [...previous, index],
    );
  };

  const startAnotherIssue = () => {
    setTicketId(null);
    setFormData(initialForm);
    setErrors({});
    setMessages([]);
    setCompletedSteps([]);
    setChatInput("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950">
      <section className="relative overflow-hidden border-b border-border bg-background py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_38%)]" />
        <div className="container relative px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
              <Headphones size={17} /> Aspira Edge Student Support
            </div>
            <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-6xl">
              Tell us what’s going wrong.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Share your issue, follow guided fixes, and continue the conversation with our support team—all in one place.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <Clock3 size={15} className="text-primary" /> Response within 24 hours
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <ShieldCheck size={15} className="text-primary" /> Your details stay private
              </span>
            </div>
          </div>
        </div>
      </section>

      {!ticketId ? (
        <section className="container px-4 py-12 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <aside className="space-y-5">
              <div className="card-elevated p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MessageCircle size={24} />
                </div>
                <h2 className="mb-2 text-2xl font-bold">How support works</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Describe the problem once. We’ll create a ticket, show the best troubleshooting steps, and open your support conversation.
                </p>
                <div className="space-y-5">
                  {["Submit your issue", "Try the suggested fixes", "Chat and receive an update within 24 hours"].map(
                    (item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

            </aside>

            <div className="card-elevated p-6 md:p-9">
              <div className="mb-7">
                <p className="mb-2 text-sm font-semibold text-primary">OPEN A SUPPORT TICKET</p>
                <h2 className="text-2xl font-bold md:text-3xl">What can we help you with?</h2>
              </div>

              <form onSubmit={handleIssueSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Full name" error={errors.name}>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" className="support-input" />
                  </FormField>
                  <FormField label="Email address" error={errors.email}>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="support-input" />
                  </FormField>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Issue type" error={errors.category}>
                    <select name="category" value={formData.category} onChange={handleChange} className="support-input">
                      <option value="technical">App not working</option>
                      <option value="account">Account or login</option>
                      <option value="billing">Payment or purchase</option>
                      <option value="content">Course content</option>
                      <option value="other">Something else</option>
                    </select>
                  </FormField>
                  <FormField label="Subject" error={errors.subject}>
                    <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Example: Videos are not loading" className="support-input" />
                  </FormField>
                </div>

                <FormField label="Describe the issue" error={errors.message}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us what happened, what you expected, and any error message you saw..."
                    className="support-input resize-none"
                  />
                </FormField>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
                  <strong>Helpful tip:</strong> Include your phone model, app version, and the last step you completed before the issue appeared.
                </div>

                <button type="submit" disabled={formState.submitting} className="btn-primary w-full gap-2 disabled:cursor-not-allowed disabled:opacity-60">
                  {formState.submitting ? <Loader2 size={19} className="animate-spin" /> : <Send size={19} />}
                  Start support conversation
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <section id="support-workspace" className="container scroll-mt-24 px-4 py-10 md:py-14">
          <div className="mx-auto mb-7 flex max-w-7xl flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950 md:flex-row md:items-center md:justify-between dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={23} />
              <div>
                <p className="font-bold">Your issue has been received</p>
                <p className="text-sm opacity-80">Ticket {ticketId} · Expected response within 24 hours</p>
              </div>
            </div>
            <button onClick={startAnotherIssue} className="rounded-lg border border-emerald-300 px-4 py-2 text-sm font-semibold transition-colors hover:bg-emerald-100 dark:border-emerald-800 dark:hover:bg-emerald-900/50">
              Report another issue
            </button>
          </div>

          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <div className="border-b border-border p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.17em] text-primary">Recommended fixes</p>
                    <h2 className="mt-1 text-2xl font-bold">Try these steps first</h2>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Wrench size={23} />
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Complete each step in order, then tell us in the chat what happened.
                </p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-right text-xs font-semibold text-muted-foreground">{progress}% complete</p>
              </div>

              <div className="space-y-3 p-5 md:p-6">
                {troubleshootingSteps.map((step, index) => {
                  const Icon = step.icon;
                  const completed = completedSteps.includes(index);
                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => toggleStep(index)}
                      className={`w-full rounded-xl border p-4 text-left transition-all ${
                        completed
                          ? "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
                          : "border-border bg-background hover:border-primary/35 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${completed ? "bg-emerald-600 text-white" : "bg-primary/10 text-primary"}`}>
                          {completed ? <Check size={20} /> : <Icon size={20} />}
                        </div>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-xs font-bold text-muted-foreground">STEP {index + 1}</span>
                            {completed && <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">DONE</span>}
                          </div>
                          <h3 className="font-bold">{step.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="m-5 mt-0 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
                <AlertCircle className="mt-0.5 shrink-0" size={20} />
                <p className="text-sm leading-relaxed">
                  <strong>Still not working?</strong> Don’t worry. Send us the result in chat. Complex issues can take up to <strong>24 hours</strong> to investigate and resolve.
                </p>
              </div>
            </div>

            <div className="flex min-h-[680px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <div className="flex items-center justify-between border-b border-border bg-background/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                    <Headphones size={21} />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                  </div>
                  <div>
                    <h2 className="font-bold">Aspira Edge Support</h2>
                    <p className="text-xs text-muted-foreground">Ticket {ticketId} · Replies within 24 hours</p>
                  </div>
                </div>
                <span className="hidden rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 sm:inline dark:bg-emerald-950 dark:text-emerald-300">Ticket open</span>
              </div>

              <div ref={chatScrollRef} className="flex-1 space-y-5 overflow-y-auto bg-slate-50/60 p-5 md:p-6 dark:bg-slate-950/40">
                <div className="mx-auto max-w-sm rounded-full bg-secondary px-4 py-2 text-center text-xs text-muted-foreground">
                  Conversation started today
                </div>
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === "student" ? "flex-row-reverse" : ""}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.sender === "student" ? "bg-slate-200 text-slate-700" : "bg-primary text-white"}`}>
                      {message.sender === "student" ? <UserRound size={15} /> : <Headphones size={15} />}
                    </div>
                    <div className={`max-w-[82%] ${message.sender === "student" ? "text-right" : ""}`}>
                      <div className={`inline-block rounded-2xl px-4 py-3 text-left text-sm leading-relaxed ${message.sender === "student" ? "rounded-tr-sm bg-primary text-white" : "rounded-tl-sm border border-border bg-card"}`}>
                        {message.text}
                      </div>
                      <p className="mt-1 px-1 text-[11px] text-muted-foreground">{message.time}</p>
                    </div>
                  </div>
                ))}
                {isReplying && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"><Headphones size={15} /></div>
                    <div className="flex gap-1 rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3">
                      {[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${dot * 120}ms` }} />)}
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleChatSubmit} className="border-t border-border bg-background p-4">
                <div className="flex items-end gap-3 rounded-xl border border-border bg-card p-2 focus-within:border-primary">
                  <textarea
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        handleChatSubmit(event);
                      }
                    }}
                    rows={2}
                    placeholder="Type an update or ask for help..."
                    className="min-h-[48px] flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
                  />
                  <button type="submit" disabled={!chatInput.trim() || isReplying} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
                    <Send size={18} />
                  </button>
                </div>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">Never share your password, OTP, or complete payment-card details.</p>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label} *</span>
      {children}
      {error && <span className="mt-1.5 flex items-center gap-1 text-sm text-destructive"><AlertCircle size={14} /> {error}</span>}
    </label>
  );
}
