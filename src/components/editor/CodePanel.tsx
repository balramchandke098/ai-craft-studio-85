import { useState } from "react";
import { CanvasElement } from "@/types/builder";
import { Copy, Check } from "lucide-react";

interface Props {
  elements: CanvasElement[];
}

export default function CodePanel({ elements }: Props) {
  const [copied, setCopied] = useState(false);
  const html = generateHTML(elements);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-auto bg-editor-bg p-4 relative">
      <button
        onClick={handleCopy}
        className="absolute top-6 right-6 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-editor-surface border border-editor-border text-editor-text-muted text-xs hover:text-editor-text transition-colors"
      >
        {copied ? <Check className="w-3 h-3 text-editor-accent" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="text-sm text-editor-text font-mono whitespace-pre-wrap leading-relaxed">
        <code>{html}</code>
      </pre>
    </div>
  );
}

function generateHTML(elements: CanvasElement[]): string {
  const lines: string[] = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>My Website</title>',
    '  <script src="https://cdn.tailwindcss.com"></script>',
    '</head>',
    '<body>',
  ];

  for (const el of elements) {
    lines.push(elementToHTML(el));
  }

  lines.push('</body>', '</html>');
  return lines.join('\n');
}

function elementToHTML(el: CanvasElement): string {
  switch (el.type) {
    case "navbar":
      return `  <nav class="flex items-center justify-between px-8 py-4 bg-gray-900 text-white">
    <span class="font-bold text-lg">${el.props.brand}</span>
    <div class="flex gap-6 text-sm">
      ${(el.props.links as string[]).map(l => `<a href="#" class="opacity-80 hover:opacity-100">${l}</a>`).join('\n      ')}
    </div>
  </nav>`;
    case "hero":
      return `  <section class="px-8 py-20 text-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <h1 class="text-4xl font-bold mb-4">${el.props.title}</h1>
    <p class="text-lg opacity-80 mb-8 max-w-xl mx-auto">${el.props.subtitle}</p>
    <button class="px-6 py-3 bg-teal-500 text-gray-900 font-semibold rounded-lg">${el.props.cta}</button>
  </section>`;
    case "heading":
      return `  <h2 class="text-2xl font-bold px-8 py-4">${el.props.text}</h2>`;
    case "text":
      return `  <p class="px-8 py-3 text-gray-700">${el.props.text}</p>`;
    case "button":
      return `  <div class="px-8 py-3"><button class="px-5 py-2.5 bg-teal-500 text-white font-medium rounded-lg">${el.props.text}</button></div>`;
    case "footer":
      return `  <footer class="px-8 py-6 bg-gray-900 text-gray-400 text-sm flex justify-between">
    <span>© ${el.props.year} ${el.props.brand}</span>
    <span>Built with SiteForge AI</span>
  </footer>`;
    default:
      return `  <!-- ${el.type} component -->`;
  }
}
