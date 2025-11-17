

import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";

export default function DownloadAppModal({ isOpen, onClose, downloadUrl }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    device: "",
    message: "", // 1. Added message field to state
  });
  
  // 2. Added state for loading and error handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Updated handleSubmit to be async and use fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/mblqeoye", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success!
        onClose(); // Close the modal
        if (downloadUrl) {
          // Open the download link in a new tab
          window.open(downloadUrl, "_blank", "noopener,noreferrer");
        }
        // Reset form for next time
        setFormData({
          name: "",
          email: "",
          phone: "",
          device: "",
          message: "",
        });
      } else {
        // Handle server errors
        throw new Error("Form submission failed.");
      }
    } catch (err) {
      // Handle network or other errors
      console.error(err);
      setError("Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      {/* Modal Panel */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent click-through
        className="relative w-full max-w-lg p-6 mx-4 bg-white rounded-lg shadow-xl dark:bg-slate-900"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Get the App
        </h2>
        <p className="text-muted-foreground mb-6">
          Please fill out this form to get the download link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md input-base"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md input-base"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone No. */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md input-base"
              placeholder="+1 555-123-4567"
            />
          </div>

          {/* 4. ADDED THE MESSAGE TEXTAREA */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md input-base"
              placeholder="Any additional comments..."
            />
          </div>

          {/* Device */}
          <div>
            <label
              htmlFor="device"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Device <span className="text-red-500">*</span>
            </label>
            <select
              id="device"
              name="device"
              value={formData.device}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md input-base"
            >
              <option value="" disabled>
                -- Select your device --
              </option>
              <option value="android">Android</option>
              <option value="ios">iOS</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting} // 5. Disable button when submitting
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit & Get Link
                </>
              )}
            </button>
          </div>
          
          {/* 6. Show error message if one exists */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}