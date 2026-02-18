import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditorToolbar from "@/components/editor/EditorToolbar";
import ComponentsPanel from "@/components/editor/ComponentsPanel";
import EditorCanvas from "@/components/editor/EditorCanvas";
import PropertiesPanel from "@/components/editor/PropertiesPanel";
import CodePanel from "@/components/editor/CodePanel";
import { useBuilder } from "@/contexts/BuilderContext";
import { CanvasElement, DeviceMode } from "@/types/builder";

const DEMO_ELEMENTS: CanvasElement[] = [
  {
    id: "nav-1",
    type: "navbar",
    props: { brand: "SiteForge", links: ["Home", "About", "Services", "Contact"] },
    style: {},
  },
  {
    id: "hero-1",
    type: "hero",
    props: {
      title: "Build Something Amazing",
      subtitle: "AI-powered tools to create stunning websites in minutes.",
      cta: "Get Started",
    },
    style: {},
  },
  {
    id: "features-1",
    type: "features",
    props: {
      items: [
        { title: "AI Generation", description: "Describe and generate entire websites" },
        { title: "Drag & Drop", description: "Visual builder with live preview" },
        { title: "One-Click Publish", description: "Deploy instantly to the web" },
      ],
    },
    style: {},
  },
  {
    id: "cta-1",
    type: "cta",
    props: { title: "Ready to launch?", subtitle: "Start building your website today.", button: "Create Free" },
    style: {},
  },
  {
    id: "footer-1",
    type: "footer",
    props: { brand: "SiteForge", year: "2026" },
    style: {},
  },
];

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deviceMode, setDeviceMode, showCodeMode, setShowCodeMode, selectedElement, setSelectedElement } = useBuilder();
  const [elements, setElements] = useState<CanvasElement[]>(DEMO_ELEMENTS);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const handleSelectElement = (el: CanvasElement | null) => {
    setSelectedElement(el);
    if (el && !rightPanelOpen) setRightPanelOpen(true);
  };

  const handleAddElement = (type: string) => {
    const newEl: CanvasElement = {
      id: Date.now().toString(),
      type,
      props: getDefaultProps(type),
      style: {},
    };
    setElements((prev) => [...prev, newEl]);
  };

  const handleDeleteElement = (id: string) => {
    setElements((prev) => prev.filter((e) => e.id !== id));
    if (selectedElement?.id === id) setSelectedElement(null);
  };

  const handleUpdateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  return (
    <div className="h-screen flex flex-col bg-editor-bg overflow-hidden">
      <EditorToolbar
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        showCodeMode={showCodeMode}
        setShowCodeMode={setShowCodeMode}
        onBack={() => navigate("/")}
        leftPanelOpen={leftPanelOpen}
        setLeftPanelOpen={setLeftPanelOpen}
        rightPanelOpen={rightPanelOpen}
        setRightPanelOpen={setRightPanelOpen}
      />
      <div className="flex-1 flex overflow-hidden">
        {leftPanelOpen && (
          <ComponentsPanel onAddElement={handleAddElement} />
        )}
        <div className="flex-1 overflow-hidden">
          {showCodeMode ? (
            <CodePanel elements={elements} />
          ) : (
            <EditorCanvas
              elements={elements}
              selectedElement={selectedElement}
              onSelectElement={handleSelectElement}
              deviceMode={deviceMode}
              onDeleteElement={handleDeleteElement}
            />
          )}
        </div>
        {rightPanelOpen && !showCodeMode && (
          <PropertiesPanel
            element={selectedElement}
            onUpdate={(updates) => {
              if (selectedElement) handleUpdateElement(selectedElement.id, updates);
            }}
          />
        )}
      </div>
    </div>
  );
}

function getDefaultProps(type: string): Record<string, any> {
  switch (type) {
    case "heading": return { text: "New Heading", level: "h2" };
    case "text": return { text: "Add your text here..." };
    case "button": return { text: "Click Me", variant: "primary" };
    case "image": return { src: "", alt: "Image" };
    case "divider": return {};
    case "spacer": return { height: "40px" };
    case "card": return { title: "Card Title", description: "Card description goes here" };
    case "hero": return { title: "Hero Title", subtitle: "Hero subtitle", cta: "Get Started" };
    case "navbar": return { brand: "Brand", links: ["Home", "About", "Contact"] };
    case "footer": return { brand: "Brand", year: "2026" };
    case "features": return { items: [{ title: "Feature", description: "Description" }] };
    case "testimonials": return { items: [{ name: "John", text: "Great product!" }] };
    case "pricing": return { plans: [{ name: "Basic", price: "$9/mo" }] };
    case "contact": return { title: "Get in Touch" };
    case "form": return { fields: ["Name", "Email", "Message"] };
    default: return {};
  }
}
