import React from "react";
import { Sparkles, ClipboardList, Download } from "lucide-react";
import "./Features.css";

const CARDS = [
  {
    icon: <Sparkles size={32} strokeWidth={2.2} />,
    title: "AI-Powered",
    text: "Advanced AI analyzes your code structure"
  },
  {
    icon: <ClipboardList size={32} strokeWidth={2.2} />,
    title: "Multiple Formats",
    text: "Export as pdf, docx or md",
  },
  {
    icon: <Download size={32} strokeWidth={2.2} />,
    title: "Instant Download",
    text: "Get your documentation ready in min",
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="features__cards">
        {CARDS.map(({ icon, title, text }) => (
          <article className="card" key={title}>
            <span className="card__icon">{icon}</span>
            <h3 className="card__title">{title}</h3>
            <p className="card__text">{text}</p>
          </article>
        ))}
      </div>

      {/* <div className="features__badges">
        <span className="badge">Markdown (.md)</span>
        <span className="badge">PDF (.pdf)</span>
        <span className="badge">Word (.docx)</span>
      </div> */}
    </section>
  );
}
