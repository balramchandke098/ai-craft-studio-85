import {
  ArrowLeft, Monitor, Tablet, Smartphone, Code, Eye, Sparkles,
  PanelLeft, PanelRight, Download, Share2, Undo, Redo,
} from "lucide-react";
import { DeviceMode } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  deviceMode: DeviceMode;
  setDeviceMode: (m: DeviceMode) => void;
  showCodeMode: boolean;
  setShowCodeMode: (v: boolean) => void;
  onBack: () => void;
  leftPanelOpen: boolean;
  setLeftPanelOpen: (v: boolean) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (v: boolean) => void;
}

export default function EditorToolbar({
  deviceMode, setDeviceMode, showCodeMode, setShowCodeMode, onBack,
  leftPanelOpen, setLeftPanelOpen, rightPanelOpen, setRightPanelOpen,
}: Props) {
  const devices: { mode: DeviceMode; icon: typeof Monitor; label: string }[] = [
    { mode: "desktop", icon: Monitor, label: "Desktop" },
    { mode: "tablet", icon: Tablet, label: "Tablet" },
    { mode: "mobile", icon: Smartphone, label: "Mobile" },
  ];

  return (
    <div className="h-12 border-b border-editor-border flex items-center justify-between px-3 gap-2 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onBack} className="text-editor-text-muted hover:text-editor-text hover:bg-editor-surface h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Dashboard</TooltipContent>
        </Tooltip>

        <div className="w-px h-5 bg-editor-border mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setLeftPanelOpen(!leftPanelOpen)} className={`h-8 w-8 ${leftPanelOpen ? "text-editor-accent" : "text-editor-text-muted"} hover:bg-editor-surface`}>
              <PanelLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Components Panel</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setRightPanelOpen(!rightPanelOpen)} className={`h-8 w-8 ${rightPanelOpen ? "text-editor-accent" : "text-editor-text-muted"} hover:bg-editor-surface`}>
              <PanelRight className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Properties Panel</TooltipContent>
        </Tooltip>

        <div className="w-px h-5 bg-editor-border mx-1" />

        <Button variant="ghost" size="icon" className="h-8 w-8 text-editor-text-muted hover:bg-editor-surface">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-editor-text-muted hover:bg-editor-surface">
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Center: Device + View */}
      <div className="flex items-center gap-1 bg-editor-surface rounded-lg p-0.5">
        {devices.map(({ mode, icon: Icon, label }) => (
          <Tooltip key={mode}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setDeviceMode(mode)}
                className={`h-7 w-8 rounded-md flex items-center justify-center transition-colors ${
                  deviceMode === mode
                    ? "bg-editor-accent text-editor-bg"
                    : "text-editor-text-muted hover:text-editor-text"
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{label}</TooltipContent>
          </Tooltip>
        ))}

        <div className="w-px h-5 bg-editor-border mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setShowCodeMode(!showCodeMode)}
              className={`h-7 px-2.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-colors ${
                showCodeMode
                  ? "bg-editor-highlight text-white"
                  : "text-editor-text-muted hover:text-editor-text"
              }`}
            >
              {showCodeMode ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
              {showCodeMode ? "Visual" : "Code"}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{showCodeMode ? "Switch to Visual" : "Switch to Code"}</TooltipContent>
        </Tooltip>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-editor-text-muted hover:bg-editor-surface gap-1.5 h-8 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-editor-accent" /> AI Assist
        </Button>
        <Button variant="ghost" size="sm" className="text-editor-text-muted hover:bg-editor-surface gap-1.5 h-8 text-xs">
          <Download className="w-3.5 h-3.5" /> Export
        </Button>
        <Button size="sm" className="gradient-primary text-primary-foreground font-semibold gap-1.5 h-8 text-xs shadow-glow hover:opacity-90">
          <Share2 className="w-3.5 h-3.5" /> Publish
        </Button>
      </div>
    </div>
  );
}
