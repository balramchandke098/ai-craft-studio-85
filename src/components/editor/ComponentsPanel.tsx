import { motion } from "framer-motion";
import {
  Type, Image, MousePointer2, Square, Minus, MoveVertical, LayoutGrid,
  CreditCard, Star, MessageSquare, DollarSign, Phone, FileText,
  Navigation, CornerRightDown,
} from "lucide-react";

const COMPONENT_GROUPS = [
  {
    label: "Basic",
    items: [
      { type: "heading", label: "Heading", icon: Type },
      { type: "text", label: "Text", icon: FileText },
      { type: "button", label: "Button", icon: MousePointer2 },
      { type: "image", label: "Image", icon: Image },
      { type: "divider", label: "Divider", icon: Minus },
      { type: "spacer", label: "Spacer", icon: MoveVertical },
    ],
  },
  {
    label: "Sections",
    items: [
      { type: "navbar", label: "Navbar", icon: Navigation },
      { type: "hero", label: "Hero", icon: LayoutGrid },
      { type: "features", label: "Features", icon: Star },
      { type: "card", label: "Card", icon: CreditCard },
      { type: "testimonials", label: "Testimonials", icon: MessageSquare },
      { type: "pricing", label: "Pricing", icon: DollarSign },
      { type: "contact", label: "Contact", icon: Phone },
      { type: "footer", label: "Footer", icon: CornerRightDown },
    ],
  },
  {
    label: "Form",
    items: [
      { type: "form", label: "Contact Form", icon: Square },
    ],
  },
];

interface Props {
  onAddElement: (type: string) => void;
}

export default function ComponentsPanel({ onAddElement }: Props) {
  return (
    <div className="w-56 border-r border-editor-border bg-editor-panel overflow-y-auto shrink-0">
      <div className="p-3">
        <h3 className="text-xs font-semibold text-editor-text-muted uppercase tracking-wider mb-3">Components</h3>
        {COMPONENT_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="text-[10px] font-semibold text-editor-text-muted uppercase tracking-wider mb-2">{group.label}</p>
            <div className="grid grid-cols-2 gap-1.5">
              {group.items.map((item) => (
                <motion.button
                  key={item.type}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAddElement(item.type)}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-editor-border bg-editor-surface hover:border-editor-accent/50 hover:bg-editor-surface-hover transition-all text-editor-text-muted hover:text-editor-text"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
