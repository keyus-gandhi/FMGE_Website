import { CheckCircle, BookOpen, Zap, Users, Award, Stethoscope, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import FeatureCard from "@/components/FeatureCard";
import FeatureModal from "@/components/FeatureModal";

const FEATURES = [
  {
    id: "mock-tests",
    title: "Mock Tests",
    icon: <Award size={28} />,
    shortDesc:
      "Practice with realistic full-length mock exams that simulate the actual FMG exam experience.",
    fullDesc:
      "Our comprehensive mock tests are designed to replicate the exact format, difficulty, and time constraints of the actual FMG exam. With hundreds of carefully crafted questions developed by medical experts, you'll build confidence and identify areas for improvement before the real test.",
    benefits: [
      "Full-length practice exams mimicking real exam conditions",
      "Timed tests to improve speed and accuracy",
      "Detailed explanations for every question",
      "Performance analytics and progress tracking",
      "Practice by topic or full integrated exams",
      "Regular updates with new practice materials",
    ],
    details: [
      "Take full-length mock exams under timed conditions",
      "Review detailed explanations after completing tests",
      "Track your performance and identify weak areas",
      "Practice specific topics or full integrated exams",
      "Compare your scores with national averages",
    ],
    delay: 0,
  },
  {
    id: "daily-updates",
    title: "Daily Updates",
    icon: <Zap size={28} />,
    shortDesc: "Stay current with new questions, explanations, and medical insights added daily.",
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
    delay: 100,
  },
  {
    id: "study-books",
    title: "Study Books",
    icon: <BookOpen size={28} />,
    shortDesc: "Access comprehensive study guides and reference materials curated by medical experts.",
    fullDesc:
      "Our curated collection of study materials includes comprehensive guides, reference books, and detailed notes on all major FMG exam topics. Each resource has been reviewed and selected by our team of medical educators to ensure quality and relevance for your exam preparation.",
    benefits: [
      "Comprehensive study guides for all exam topics",
      "High-yield notes and quick references",
      "Clinical case presentations",
      "Medical illustrations and diagrams",
      "Downloadable PDF materials",
      "Organized by exam subject areas",
    ],
    details: [
      "Access organized study guides by topic",
      "Review high-yield facts and mnemonics",
      "Study clinical case scenarios",
      "View medical illustrations and diagrams",
      "Download materials for offline study",
    ],
    delay: 200,
  },
  {
    id: "expert-lectures",
    title: "Expert Lectures",
    icon: <Users size={28} />,
    shortDesc: "Learn from experienced physicians and exam coaches through detailed video lectures.",
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
    delay: 300,
  },
  {
    id: "progress-tracking",
    title: "Progress Tracking",
    icon: <CheckCircle size={28} />,
    shortDesc: "Monitor your performance with detailed analytics and personalized learning recommendations.",
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
    delay: 400,
  },
  {
    id: "medical-excellence",
    title: "Medical Excellence",
    icon: <Stethoscope size={28} />,
    shortDesc: "Comprehensive coverage of clinical concepts essential for the FMG examination.",
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
    delay: 500,
  },
];

export default function Index() {
  const [selectedFeature, setSelectedFeature] = useState<(typeof FEATURES)[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22><rect fill=%22%23f0f5ff%22 width=%221200%22 height=%22600%22/><g opacity=%220.05%22><circle cx=%22200%22 cy=%22100%22 r=%2280%22 fill=%22%231e40af%22/><circle cx=%221000%22 cy=%22500%22 r=%22120%22 fill=%22%231e40af%22/><path d=%22M0,300 Q300,200 600,300 T1200,300%22 stroke=%22%231e40af%22 stroke-width=%222%22 fill=%22none%22/><path d=%22M100,0 Q200,150 300,0%22 stroke=%22%231e40af%22 stroke-width=%222%22 fill=%22none%22 opacity=%220.3%22/></g></svg>')",
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
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6 animate-fade-in"
            >
              <Stethoscope size={18} className="text-primary" />
              <span className="text-sm font-semibold text-primary">
                FMG Exam Preparation Platform
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up"
              style={{
                background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))",
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
              mock tests, daily updates, study materials, and expert lectures
              to excel your medical licensing journey.
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
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="btn-primary"
              >
                Start Your Journey
              </button>
              <Link
                to="/support"
                className="btn-secondary"
              >
                Get Support
              </Link>
            </div>
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
              Our comprehensive platform provides all the tools and resources for
              FMG exam preparation. Click on any feature to learn more.
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
                Why Choose MedExam?
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
<section id="getApp" className="py-20 md:py-28 relative overflow-hidden bg-slate-50 dark:bg-slate-900/30">
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
                  Download our mobile app for seamless learning. Access mock tests, study materials, and expert lectures anywhere, anytime.
                </p>
              </div>

              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-lg mx-auto animate-slide-up"
                style={{ animationDelay: "300ms" }}
              >
                {/* App Store Button */}
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-start gap-3 px-5 py-4 rounded-xl bg-foreground hover:bg-foreground/90 text-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] border-2 border-foreground"
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
                    <span className="text-[11px] opacity-80 font-medium">Download on the</span>
                    <span className="text-lg font-semibold -mt-0.5">App Store</span>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-start gap-3 px-5 py-4 rounded-xl bg-foreground hover:bg-foreground/90 text-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] border-2 border-foreground"
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
                    <span className="text-[11px] opacity-80 font-medium">Get it on</span>
                    <span className="text-lg font-semibold -mt-0.5">Google Play</span>
                  </div>
                </a>
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

      {/* Feature Modal */}
      <FeatureModal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        feature={selectedFeature}
      />
    </div>
  );
}
