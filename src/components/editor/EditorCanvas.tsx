import { motion } from "framer-motion";
import { CanvasElement, DeviceMode, DEVICE_WIDTHS } from "@/types/builder";
import { Trash2 } from "lucide-react";
import CanvasRenderer from "./CanvasRenderer";

interface Props {
  elements: CanvasElement[];
  selectedElement: CanvasElement | null;
  onSelectElement: (el: CanvasElement | null) => void;
  deviceMode: DeviceMode;
  onDeleteElement: (id: string) => void;
}

export default function EditorCanvas({ elements, selectedElement, onSelectElement, deviceMode, onDeleteElement }: Props) {
  const width = DEVICE_WIDTHS[deviceMode];

  return (
    <div
      className="flex-1 overflow-auto bg-editor-canvas p-6 flex justify-center"
      onClick={() => onSelectElement(null)}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-lg shadow-elevated overflow-hidden shrink-0"
        style={{ width, minHeight: 600 }}
      >
        {elements.map((el) => (
          <div
            key={el.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement(el);
            }}
            className={`relative group cursor-pointer transition-all ${
              selectedElement?.id === el.id
                ? "ring-2 ring-editor-accent ring-offset-0"
                : "hover:ring-1 hover:ring-editor-accent/30"
            }`}
          >
            <CanvasRenderer element={el} />
            {selectedElement?.id === el.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteElement(el.id);
                }}
                className="absolute top-2 right-2 w-6 h-6 rounded bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        {elements.length === 0 && (
          <div className="flex items-center justify-center h-96 text-muted-foreground text-sm">
            Click components on the left to add them
          </div>
        )}
      </motion.div>
    </div>
  );
}
