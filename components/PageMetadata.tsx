import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const home = { title: "Aspira Edge | FMGE Preparation, Mock Tests & LMR Revision", description: "Prepare for the FMGE with Aspira Edge. Explore previous year questions, mock tests, LMR revision books, image-based learning and flashcards. Get the app on iOS and Android." };
const pages: Record<string, typeof home> = {
  "/": home,
  "/about": { title: "About Aspira Edge | FMGE Learning & Revision Resources", description: "Discover Aspira Edge and its approach to FMGE preparation. Explore practice questions, LMR revision books, image books and flashcards." },
  "/support": { title: "Student Support | Aspira Edge", description: "Get help with Aspira Edge. Report an app, account, payment or learning-resource issue and explore troubleshooting steps." },
  "/purchase": { title: "Book Store | Aspira Edge", description: "Explore Aspira Edge study books and revision resources for FMGE preparation." },
  "/privacy": { title: "Privacy Policy | Aspira Edge", description: "Read the Aspira Edge privacy policy." },
  "/terms": { title: "Terms of Service | Aspira Edge", description: "Read the Aspira Edge terms of service." },
};

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const metadata = pages[pathname];
    document.title = metadata?.title ?? "Page Not Found | Aspira Edge";
    const description = metadata?.description ?? "This Aspira Edge page could not be found.";
    for (const [selector, value] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', document.title],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:title"]', document.title],
      ['meta[name="twitter:description"]', description],
      ['meta[name="robots"]', metadata ? "index, follow" : "noindex, follow"],
    ]) document.querySelector(selector)?.setAttribute("content", value);
  }, [pathname]);
  return null;
}
