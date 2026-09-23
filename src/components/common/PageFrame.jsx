import { ArrowLeft, Sparkles } from "lucide-react";

export default function PageFrame({ title, eyebrow, children }) {
  return (
    <main className="feature-page">
      <div className="feature-page-top">
        <a href="/" className="back-link">
          <ArrowLeft size={16} /> Back to TechMart
        </a>
        <a href="/" className="feature-brand">
          <span>
            <Sparkles size={15} />
          </span>
          tech<b>mart</b>
        </a>
      </div>
      <div className="feature-heading">
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      {children}
    </main>
  );
}
