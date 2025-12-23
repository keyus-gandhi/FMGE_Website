import {
  CheckCircle,
  BookOpen,
  Zap,
  Users,
  Award,
  Stethoscope,
  Smartphone,
  Image,
  Layers,
  MessagesSquare,
  ShoppingBag,
  ArrowRight,
  // NEW ICONS ADDED HERE
  Globe,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import FeatureCard from "@/components/FeatureCard";
import FeatureModal from "@/components/FeatureModal";
import DownloadAppModal from "@/components/DownloadAppModal";

const FEATURES = [
  {
    id: "mock-tests",
    title: "PYQs & Mock Tests",
    icon: <Award size={28} />,
    shortDesc:
      "Practice with realistic mock exams & PYQs from all 19 subjects.",
    fullDesc:
      "Our comprehensive mock tests are designed to replicate the exact format, difficulty, and time constraints of the actual FMG exam. Access a huge bank of Previous Year Questions (PYQs) covering all 19 subjects to understand exam patterns and high-yield topics.",
    benefits: [
      "Full-length practice exams mimicking real exam conditions",
      "PYQ bank for all 19 subjects",
      "Timed tests to improve speed and accuracy",
      "Detailed explanations for every question",
      "Performance analytics and progress tracking",
      "Practice by topic or full integrated exams",
    ],
    details: [
      "Access the complete PYQ bank (all 19 subjects)",
      "Take full-length mock exams under timed conditions",
      "Review detailed explanations after completing tests",
      "Track your performance and identify weak areas",
      "Practice specific topics or full integrated exams",
    ],
    delay: 0,
  },
  {
    id: "lmr-3",
    title: "LMR 3.0",
    icon: <BookOpen size={28} />,
    shortDesc:
      "Your ultimate Last Minute Revision tool, curated by experts for high-yield topics.",
    fullDesc:
      "LMR 3.0 (Last Minute Revision) is our flagship high-yield resource. It's designed to help you cover the most essential topics, facts, and concepts just before your exam, ensuring maximum retention.",
    benefits: [
      "High-yield facts for all subjects",
      "Perfect for rapid revision",
      "Focus on must-know topics",
      "Curated by top medical educators",
      "Concise and easy-to-digest format",
    ],
    details: [
      "Access the complete LMR 3.0 digital book",
      "Bookmark and highlight key sections",
      "Quickly review before the exam",
      "Search for specific topics",
    ],
    delay: 100,
  },
  {
    id: "buzz-image-books",
    title: "Buzz Book & Image Book",
    icon: <Image size={28} />,
    shortDesc:
      "Master key buzzwords and visual topics with our specialized content books.",
    fullDesc:
      "The Buzz Book helps you master the specific keywords and one-liners that frequently appear in exams. The Image Book provides a comprehensive collection of high-yield images, diagrams, and clinical slides.",
    benefits: [
      "Extensive Buzzword collection",
      "High-yield Image Book for visual learners",
      "Master pattern recognition for image-based questions",
      "Quickly identify key diagnostic features",
      "Covers all 19 subjects",
    ],
    details: [
      "Browse the dedicated Buzz Book",
      "Study from the Image Book library",
      "Practice image-based questions",
      "Search by topic or keyword",
    ],
    delay: 200,
  },
  {
    id: "flashcards",
    title: "Flashcards",
    icon: <Layers size={28} />,
    shortDesc:
      "Reinforce your learning with spaced repetition flashcards for all subjects.",
    fullDesc:
      "Our digital flashcard decks are perfect for active recall and spaced repetition. Cover all 19 subjects and solidify your memory of key facts, drugs, and concepts.",
    benefits: [
      "Active recall learning method",
      "Spaced repetition algorithm",
      "Decks for all 19 subjects",
      "Create and customize your own decks",
      "Track your memory strength",
    ],
    details: [
      "Review daily flashcard recommendations",
      "Track your mastery of each card",
      "Use pre-made or custom decks",
      "Sync progress across devices",
    ],
    delay: 300,
  },
  {
    id: "daily-updates",
    title: "Daily Updates",
    icon: <Zap size={28} />,
    shortDesc:
      "Stay current with new questions, explanations, and medical insights added daily.",
    fullDesc:
      "We continuously update our content to reflect the latest medical knowledge and exam trends. Every day brings fresh questions and insights from our expert medical team, ensuring you're always studying the most relevant and up-to-date material for FMG exam success.",
    benefits: [
      "New questions added every single day",
      "Latest medical guidelines and protocols",
      "Recent exam trends and hot topics",
      "Expert medical insights and tips",
      "Current clinical case studies",
      "Regular curriculum updates",
    ],
    details: [
      "Access newly added questions daily",
      "Learn about trending exam topics",
      "Study recent clinical case scenarios",
      "Get expert tips from experienced physicians",
      "Stay updated with medical advancements",
    ],
    delay: 400,
  },
  {
    id: "expert-lectures",
    title: "Expert Lectures",
    icon: <Users size={28} />,
    shortDesc:
      "Comming Soon: Learn from experienced physicians and exam coaches through detailed video lectures.",
    fullDesc:
      "Join live and recorded sessions with experienced physicians, board-certified specialists, and successful FMG candidates. Our expert instructors break down complex medical concepts, share exam strategies, and provide insider knowledge to help you maximize your exam performance.",
    benefits: [
      "Video lectures by board-certified physicians",
      "Recorded sessions available 24/7",
      "Interactive Q&A with medical experts",
      "Exam strategy and study tips",
      "Real patient case discussions",
      "Organized curriculum with clear progression",
    ],
    details: [
      "Watch recorded lectures anytime, anywhere",
      "Learn from experienced FMG coaches",
      "Participate in live interactive sessions",
      "Get answers to your medical questions",
      "Learn exam-specific strategies",
    ],
    delay: 500,
  },
  {
    id: "progress-tracking",
    title: "Progress Tracking",
    icon: <CheckCircle size={28} />,
    shortDesc:
      "Monitor your performance with detailed analytics and personalized learning recommendations.",
    fullDesc:
      "Our advanced analytics dashboard provides comprehensive insights into your learning journey. Track your scores, identify knowledge gaps, and receive personalized recommendations to optimize your study plan and maximize your chances of success.",
    benefits: [
      "Detailed performance metrics and analytics",
      "Personalized learning recommendations",
      "Knowledge gap identification",
      "Comparative performance analysis",
      "Study streak and milestone tracking",
      "Customized study plans based on performance",
    ],
    details: [
      "View detailed performance analytics",
      "Identify your strongest and weakest areas",
      "Receive personalized study recommendations",
      "Track your improvement over time",
      "Set and monitor study goals",
    ],
    delay: 600,
  },
  {
    id: "medical-excellence",
    title: "Medical Excellence",
    icon: <Stethoscope size={28} />,
    shortDesc:
      "Comprehensive coverage of clinical concepts essential for the FMG examination.",
    fullDesc:
      "Every aspect of the FMG exam curriculum is covered with the depth and rigor expected of a medical professional. Our content ensures you understand not just the 'what' but also the 'why' and 'how,' building the clinical reasoning skills essential for passing the exam and practicing medicine.",
    benefits: [
      "Complete FMG exam curriculum coverage",
      "Deep clinical reasoning development",
      "Evidence-based medical knowledge",
      "Practical clinical applications",
      "Integration of basic and clinical sciences",
      "Focus on high-yield clinical concepts",
    ],
    details: [
      "Master all major clinical disciplines",
      "Develop strong clinical reasoning skills",
      "Learn integrated medical concepts",
      "Study evidence-based practices",
      "Apply knowledge to clinical scenarios",
    ],
    delay: 700,
  },
  {
    id: "community-support",
    title: "Community & Support",
    icon: <MessagesSquare size={28} />,
    shortDesc:
      "Join a dedicated community of FMG peers and mentors for support and discussion.",
    fullDesc:
      "You're not alone on this journey. Join our private community forums to connect with fellow FMG candidates, ask questions, share study tips, and get support from peers and mentors who understand the process.",
    benefits: [
      "Private discussion forums",
      "Connect with peers and mentors",
      "Ask questions and share resources",
      "Motivational support",
      "Stay updated with group announcements",
    ],
    details: [
      "Access private forums",
      "Join study groups",
      "Get peer-to-peer support",
      "Share your experiences",
      "Find study partners",
    ],
    delay: 800,
  },
];

export default function Index() {
  const [selectedFeature, setSelectedFeature] = useState<
    (typeof FEATURES)[0] | null
  >(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleDownloadClick = (url: string) => {
    setDownloadUrl(url);
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22><rect fill=%22%23f0f5ff%22 width=%221200%22 height=%22600%22/><g opacity=%220.05%22><circle cx=%22200%22 cy=%22100%22 r=%2280%22 fill=%22%231e40af%22/><circle cx=%221000%22 cy=%22500%22 r=%22120%22 fill=%22%231e40af%22/><path d=%22M0,300 Q300,200 600,300 T1200,300%22 stroke=%22%231e40af%22 stroke-width=%222%22 fill=%22none%22/><path d=%22M100,0 Q200,150 300,0%22 stroke=%22%231e40af%22 stroke-width=%222%22 fill=%22none%22 opacity=%220.3%22/></g></svg>')",
        }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
        </div>

        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6 animate-fade-in">
              <Stethoscope size={18} className="text-primary" />
              <span className="text-sm font-semibold text-primary">
                FMG Exam Preparation Platform
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up"
              style={{
                background:
                  "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Master the FMG Exam
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up leading-relaxed"
              style={{ animationDelay: "100ms" }}
            >
              Comprehensive preparation for foreign medical graduates. Access
              mock tests, daily updates, study materials, and expert lectures to
              excel your medical licensing journey.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <button
                type="button"
                onClick={() => {
                  const element = document.getElementById("getApp");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="btn-primary"
              >
                Start Your Journey
              </button>
              <Link to="/support" className="btn-secondary">
                Get Support
              </Link>
            </div>

            {/* Small Link for Purchase under buttons */}
            <div
              className="mt-6 animate-slide-up"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                to="/purchase"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary/50"
              >
                <ShoppingBag size={14} />
                Looking to buy books? Visit our Web Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Improved iOS Purchase Guide Banner */}
      <section className="bg-primary text-primary-foreground py-10 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Side: The "Why" */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                <Smartphone size={14} /> iOS Users
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                How to Buy LMR 3.0 Book
              </h2>
              <p className="text-primary-foreground/90 text-sm md:text-base leading-relaxed mb-4">
                To access the <strong>LMR 3.0 Book</strong> and other premium
                content on your iPhone, you must purchase them via this secure
                website.
              </p>

              <div className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-white/10">
                <AlertCircle
                  className="shrink-0 mt-0.5 text-yellow-300"
                  size={18}
                />
                <p className="text-xs text-left">
                  <strong>Critical:</strong> You must use the{" "}
                  <span className="underline decoration-yellow-300 decoration-2 underline-offset-2">
                    SAME Email & Password
                  </span>{" "}
                  here as you do in the app for the purchase to sync. And For
                  Android users, purchases can made directly within the app.
                </p>
              </div>
            </div>

            {/* Right Side: The "How" (3 Steps) */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center w-full sm:w-32">
                <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center mb-2 font-bold shadow-lg">
                  1
                </div>
                <div className="text-sm font-semibold mb-1">Get App</div>
                <div className="text-xs opacity-80">
                  Create account in Aspira Edge App
                </div>
              </div>

              <div className="hidden sm:block h-px w-8 bg-white/30"></div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center w-full sm:w-32">
                <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center mb-2 font-bold shadow-lg">
                  2
                </div>
                <div className="text-sm font-semibold mb-1">Buy Here</div>
                <div className="text-xs opacity-80">
                  Purchase securely on this website
                </div>
              </div>

              <div className="hidden sm:block h-px w-8 bg-white/30"></div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center w-full sm:w-32">
                <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center mb-2 font-bold shadow-lg">
                  <RefreshCw size={18} />
                </div>
                <div className="text-sm font-semibold mb-1">Auto Sync</div>
                <div className="text-xs opacity-80">
                  Open app & read instantly
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button centered below on mobile, right aligned on desktop */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              to="/purchase"
              className="flex items-center gap-2 bg-white text-primary hover:bg-slate-100 font-bold py-4 px-8 rounded-xl transition-all shadow-xl hover:shadow-2xl active:scale-95"
            >
              <Globe size={20} />
              Go to Book Purchase Portal
              <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/30">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive platform provides all the tools and resources
              for FMG exam preparation. Click on any feature to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.shortDesc}
                delay={feature.delay}
                onClick={() => setSelectedFeature(feature)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Aspira Edge?
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "High-Quality Content",
                    desc: "Created by experienced medical educators and exam experts",
                  },
                  {
                    title: "Proven Success Rate",
                    desc: "Thousands of doctors have successfully passed using our platform",
                  },
                  {
                    title: "Personalized Learning",
                    desc: "Adaptive learning paths tailored to your strengths and weaknesses",
                  },
                  {
                    title: "24/7 Support",
                    desc: "Dedicated support team ready to help you anytime",
                  },
                  {
                    title: "Affordable Pricing",
                    desc: "Competitive rates with flexible payment options",
                  },
                ].map((benefit, i) => (
                  <li
                    key={i}
                    className="flex gap-4 items-start animate-slide-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white flex-shrink-0 mt-1">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {benefit.title}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {benefit.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-2xl opacity-20 blur-3xl"></div>
              <div className="relative card-elevated p-8 md:p-10">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "10K+", label: "Active Students" },
                    { number: "5K+", label: "Practice Questions" },
                    { number: "95%", label: "Pass Rate" },
                    { number: "4.9★", label: "User Rating" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center"
                      style={{
                        animation: `fade-in 0.6s ease-out ${i * 150}ms both`,
                      }}
                    >
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        {stat.number}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get App Section */}
      <section
        id="getApp"
        className="py-20 md:py-28 relative overflow-hidden bg-slate-50 dark:bg-slate-900/30"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
              <div className="text-center mb-10">
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-6 animate-fade-in"
                  style={{ animationDelay: "0ms" }}
                >
                  <Smartphone size={40} className="text-white" />
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up"
                  style={{ animationDelay: "100ms" }}
                >
                  Study On The Go
                </h2>
                <p
                  className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up"
                  style={{ animationDelay: "200ms" }}
                >
                  Download our mobile app for seamless learning. Access mock
                  tests, study materials, and expert lectures anywhere, anytime.
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-lg mx-auto animate-slide-up"
                style={{ animationDelay: "300ms" }}
              >
                {/* APP STORE BUTTON - ENABLED WITH LINK */}
                <button
                  type="button"
                  onClick={() =>
                    handleDownloadClick(
                      "https://apps.apple.com/in/app/aspira-edge/id6755354949",
                    )
                  }
                  className="group flex items-center justify-start gap-3 px-5 py-4 rounded-xl bg-foreground hover:bg-foreground/90 text-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] border-2 border-foreground w-full sm:w-auto"
                >
                  <svg
                    className="w-8 h-8 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[11px] opacity-80 font-medium">
                      Download on the
                    </span>
                    <span className="text-lg font-semibold -mt-0.5">
                      App Store
                    </span>
                  </div>
                </button>

                {/* GOOGLE PLAY BUTTON */}
                <button
                  type="button"
                  onClick={() => handleDownloadClick("https://play.google.com/store/apps/details?id=com.fmge.fmge_app")}
                  className="group flex items-center justify-start gap-3 px-5 py-4 rounded-xl bg-foreground hover:bg-foreground/90 text-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] border-2 border-foreground w-full sm:w-auto"
                >
                  <svg
                    className="w-8 h-8 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,14.5L15.12,12.42L17.19,10.33L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[11px] opacity-80 font-medium">
                      Get it on
                    </span>
                    <span className="text-lg font-semibold -mt-0.5">
                      Google Play
                    </span>
                  </div>
                </button>
              </div>

              {/* Additional features list */}
              <div className="mt-10 pt-10 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  {[
                    { icon: <CheckCircle size={20} />, text: "Offline Access" },
                    { icon: <Zap size={20} />, text: "Instant Sync" },
                    { icon: <Smartphone size={20} />, text: "All Devices" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 animate-fade-in"
                      style={{ animationDelay: `${400 + i * 100}ms` }}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Modals */}
      <FeatureModal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        feature={selectedFeature}
      />

      <DownloadAppModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        downloadUrl={downloadUrl}
      />
    </div>
  );
}
