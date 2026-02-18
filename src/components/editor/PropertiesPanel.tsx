import { CanvasElement } from "@/types/builder";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings2 } from "lucide-react";

interface Props {
  element: CanvasElement | null;
  onUpdate: (updates: Partial<CanvasElement>) => void;
}

export default function PropertiesPanel({ element, onUpdate }: Props) {
  if (!element) {
    return (
      <div className="w-64 border-l border-editor-border bg-editor-panel p-4 flex flex-col items-center justify-center text-center shrink-0">
        <Settings2 className="w-8 h-8 text-editor-text-muted mb-3 opacity-40" />
        <p className="text-sm text-editor-text-muted">Select an element to edit its properties</p>
      </div>
    );
  }

  const updateProp = (key: string, value: any) => {
    onUpdate({ props: { ...element.props, [key]: value } });
  };

  return (
    <div className="w-64 border-l border-editor-border bg-editor-panel overflow-y-auto shrink-0">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-editor-accent" />
          <h3 className="text-xs font-semibold text-editor-text-muted uppercase tracking-wider">
            {element.type}
          </h3>
        </div>

        <div className="space-y-3">
          {Object.entries(element.props).map(([key, value]) => {
            if (typeof value === "string") {
              return (
                <div key={key}>
                  <label className="text-[11px] font-medium text-editor-text-muted uppercase tracking-wide mb-1 block">
                    {key}
                  </label>
                  {value.length > 60 ? (
                    <Textarea
                      value={value}
                      onChange={(e) => updateProp(key, e.target.value)}
                      rows={3}
                      className="bg-editor-surface border-editor-border text-editor-text text-sm resize-none"
                    />
                  ) : (
                    <Input
                      value={value}
                      onChange={(e) => updateProp(key, e.target.value)}
                      className="bg-editor-surface border-editor-border text-editor-text text-sm h-8"
                    />
                  )}
                </div>
              );
            }
            if (Array.isArray(value) && typeof value[0] === "string") {
              return (
                <div key={key}>
                  <label className="text-[11px] font-medium text-editor-text-muted uppercase tracking-wide mb-1 block">
                    {key}
                  </label>
                  <Textarea
                    value={(value as string[]).join(", ")}
                    onChange={(e) => updateProp(key, e.target.value.split(",").map((s) => s.trim()))}
                    rows={2}
                    className="bg-editor-surface border-editor-border text-editor-text text-sm resize-none"
                  />
                  <p className="text-[10px] text-editor-text-muted mt-1">Comma separated</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
