import { ArrowUpRight, Award, BookOpen, Check, Layers, Smartphone, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const resources = [
  { icon: Award, title: "Practice with purpose", label: "PYQs & mock tests", description: "Use previous year questions and mock tests to build familiarity with exam topics and find the areas that need more attention." },
  { icon: BookOpen, title: "Make revision count", label: "LMR revision books", description: "Return to essential concepts with focused last-minute revision resources that fit into your study routine." },
  { icon: Layers, title: "Learn beyond the page", label: "Image books & flashcards", description: "Connect visual clues with key concepts and strengthen recall through short, focused review sessions." },
];

export default function About() {
  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white md:py-28">
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="container relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300"><Stethoscope size={17} /> About Aspira Edge</p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">A clearer path to your <span className="text-blue-400">next chapter.</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">Preparing for the FMGE takes dedication. Aspira Edge brings practice and revision together, helping foreign medical graduates approach their studies with focus.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#resources" className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-600">Explore our resources <ArrowUpRight size={18} /></a>
              <Link to="/support" className="rounded-xl border border-slate-600 px-6 py-3 font-semibold hover:bg-slate-800">Talk to support</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-7 shadow-2xl md:p-10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-6"><div className="rounded-xl bg-blue-500/20 p-3 text-blue-300"><BookOpen size={26} /></div><div><p className="font-bold">Your study companion</p><p className="text-sm text-slate-400">From the first review to the final revision</p></div></div>
            <div className="space-y-6 py-7">
              {[['01', 'Understand', 'Build connections between the concepts you study.'], ['02', 'Practice', 'Put your knowledge to work with exam-focused questions.'], ['03', 'Revise', 'Return to key topics and reinforce what you have learned.']].map(([number, title, text]) => <div key={number} className="flex gap-5"><span className="text-xl font-bold text-blue-400">{number}</span><div><h2 className="text-lg font-bold">{title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-400">{text}</p></div></div>)}
            </div>
            <div className="rounded-xl bg-blue-500/10 px-4 py-3 text-sm text-blue-200">Small, consistent steps. A stronger study routine.</div>
          </div>
        </div>
      </section>

      <section id="resources" className="container scroll-mt-24 px-4 py-20 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tools for your preparation</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2"><h2 className="max-w-lg text-3xl font-bold leading-tight md:text-4xl">Resources that work together.</h2><p className="max-w-lg leading-relaxed text-muted-foreground">Practice, review, and recall each play a part in preparation. Explore learning resources designed to support these different moments in your study day.</p></div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">{resources.map(({ icon: Icon, title, label, description }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="mb-7 inline-flex rounded-2xl bg-blue-50 p-4 text-primary"><Icon size={26} /></div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">{label}</p><h3 className="text-xl font-bold">{title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p></article>)}</div>
      </section>

      <section className="container px-4 pb-20">
        <div className="grid gap-10 rounded-3xl bg-blue-50 p-8 md:p-14 lg:grid-cols-2">
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Our approach</p><h2 className="text-3xl font-bold">Keep learning focused.<br />Keep moving forward.</h2><p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">Aspira Edge brings learning resources into one place so you can spend more time studying and less time deciding where to start.</p></div>
          <div className="space-y-5">{['Combine question practice with regular revision.', 'Use visual resources to connect images and concepts.', 'Build a routine that fits your preparation stage.', 'Ask for help when an app issue interrupts your studies.'].map(text => <div key={text} className="flex items-start gap-3 rounded-xl bg-white p-4"><Check size={19} className="mt-0.5 shrink-0 text-primary" /><p className="text-sm font-medium leading-relaxed">{text}</p></div>)}</div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-center"><div className="mx-auto max-w-2xl"><Smartphone size={32} className="mx-auto mb-5 text-primary" /><h2 className="text-3xl font-bold md:text-4xl">Your next study session starts here.</h2><p className="mt-4 text-muted-foreground">Find Aspira Edge on the App Store and Google Play.</p><div className="mt-7 flex flex-wrap justify-center gap-4"><a href="https://apps.apple.com/in/app/aspira-edge/id6755354949" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-slate-900 px-7 py-3 font-semibold text-white hover:bg-slate-700">App Store ↗</a><a href="https://play.google.com/store/apps/details?id=com.fmge.fmge_app" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-slate-900 px-7 py-3 font-semibold text-white hover:bg-slate-700">Google Play ↗</a></div></div></section>
    </div>
  );
}
