import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, Stethoscope } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, ValidationError } from '@formspree/react';

const supportSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  category: z.enum([
    "technical",
    "account",
    "billing",
    "content",
    "other",
  ]),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type SupportFormData = z.infer<typeof supportSchema>;

export default function Support() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<SupportFormData>({
    name: "",
    email: "",
    category: "other",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<SupportFormData>>({});
  const [state, formspreeHandleSubmit] = useForm("xzzypkqg");

  // Redirect to home after successful submission
  useEffect(() => {
    if (state.succeeded) {
      setFormData({
        name: "",
        email: "",
        category: "other",
        subject: "",
        message: "",
      });
      setErrors({});

      // Show spinner/success for 3 seconds, then redirect
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof SupportFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate form data with Zod (client-side)
      const validatedData = supportSchema.parse(formData);
      
      // If validation passes, submit via Formspree
      formspreeHandleSubmit(e);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Partial<SupportFormData> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof SupportFormData;
          formErrors[path] = err.message as any;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      {/* Header */}
      <section className="container px-4 mb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Support</h1>
          <p className="text-lg text-muted-foreground">
            Have a question or issue? We're here to help. Fill out the form
            below and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="container px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Mail,
              title: "Email",
              value: "kgandhi7878@gmail.com",
              subtitle: "Response within 24 hours",
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+91 7073238605",
              subtitle: "Available 10 AM - 6 PM IST",
            },
            {
              icon: MapPin,
              title: "Location",
              value: "Kherwara, Udaipur",
              subtitle: "Rajasthan, 313803, India",
            },
          ].map((contact, i) => {
            const Icon = contact.icon;
            return (
              <div
                key={i}
                className="card-elevated p-6 text-center"
                style={{
                  animation: `slide-up 0.6s ease-out ${i * 100}ms both`,
                }}
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white mx-auto mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-foreground mb-1">{contact.title}</h3>
                <p className="font-semibold text-primary mb-1">{contact.value}</p>
                <p className="text-sm text-muted-foreground">{contact.subtitle}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Support Form */}
      <section className="container px-4 max-w-2xl mx-auto">
        <div className="card-elevated p-8 md:p-10">
          {state.succeeded ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white mx-auto mb-4">
                <Stethoscope className="animate-spin" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Thank you for reaching out!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your message has been sent to{" "}
                <a 
                  href="mailto:kgandhi7878@gmail.com" 
                  className="text-primary hover:underline font-semibold"
                >
                  kgandhi7878@gmail.com
                </a>
                . Redirecting you back to home...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.name
                      ? "border-destructive bg-destructive/5"
                      : "border-border bg-input hover:border-primary/30 focus:border-primary focus:outline-none"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
                <ValidationError 
                  prefix="Name" 
                  field="name"
                  errors={state.errors}
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.email
                      ? "border-destructive bg-destructive/5"
                      : "border-border bg-input hover:border-primary/30 focus:border-primary focus:outline-none"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Issue Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors bg-input ${
                    errors.category ? "border-destructive" : "border-border"
                  } hover:border-primary/30 focus:border-primary focus:outline-none`}
                >
                  <option value="other">Select a category</option>
                  <option value="technical">Technical Issue</option>
                  <option value="account">Account Problem</option>
                  <option value="billing">Billing Question</option>
                  <option value="content">Content Request</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">{errors.category}</p>
                )}
                <ValidationError 
                  prefix="Category" 
                  field="category"
                  errors={state.errors}
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.subject
                      ? "border-destructive bg-destructive/5"
                      : "border-border bg-input hover:border-primary/30 focus:border-primary focus:outline-none"
                  }`}
                  placeholder="Brief description of your issue"
                />
                {errors.subject && (
                  <p className="text-sm text-destructive mt-1">{errors.subject}</p>
                )}
                <ValidationError 
                  prefix="Subject" 
                  field="subject"
                  errors={state.errors}
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors resize-none ${
                    errors.message
                      ? "border-destructive bg-destructive/5"
                      : "border-border bg-input hover:border-primary/30 focus:border-primary focus:outline-none"
                  }`}
                  placeholder="Please describe your issue in detail..."
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message}</p>
                )}
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state.submitting}
                className={`w-full btn-primary flex items-center justify-center gap-2 transition-opacity ${
                  state.submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {state.submitting ? (
                  <>
                    <Stethoscope size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Your message will be sent securely to kgandhi7878@gmail.com
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container px-4 mt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How do I reset my password?",
                a: "You can reset your password by clicking 'Forgot Password' on the login page. Check your email for the reset link.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and popular UPI / wallet payment methods.",
              },
              {
                q: "Can I get a refund?",
                a: "As per our Terms & Conditions, subscription fees are non-refundable once activated. Refunds may only be considered for payment failures or duplicate transactions.",
              },
              {
                q: "How often is the content updated?",
                a: "We are constantly working to update our content with new questions, explanations, and insights to keep you current.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="card-elevated p-6"
                style={{
                  animation: `slide-up 0.6s ease-out ${i * 100}ms both`,
                }}
              >
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}