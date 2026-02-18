import { useState, createContext, useContext, ReactNode } from "react";
import { WebProject, PageData, CanvasElement, DeviceMode } from "@/types/builder";

interface BuilderState {
  projects: WebProject[];
  currentProject: WebProject | null;
  currentPage: PageData | null;
  selectedElement: CanvasElement | null;
  deviceMode: DeviceMode;
  showCodeMode: boolean;
  setProjects: (p: WebProject[]) => void;
  setCurrentProject: (p: WebProject | null) => void;
  setCurrentPage: (p: PageData | null) => void;
  setSelectedElement: (e: CanvasElement | null) => void;
  setDeviceMode: (m: DeviceMode) => void;
  setShowCodeMode: (v: boolean) => void;
  addProject: (p: WebProject) => void;
  deleteProject: (id: string) => void;
}

const BuilderContext = createContext<BuilderState | null>(null);

const DEMO_PROJECTS: WebProject[] = [
  {
    id: "1",
    name: "TechStartup Landing",
    description: "Modern SaaS landing page with hero and pricing",
    lastEdited: "2 hours ago",
    status: "published",
    pages: 4,
  },
  {
    id: "2",
    name: "Portfolio Website",
    description: "Creative portfolio with gallery and contact",
    lastEdited: "Yesterday",
    status: "draft",
    pages: 3,
  },
  {
    id: "3",
    name: "Restaurant Menu",
    description: "Online menu with reservation system",
    lastEdited: "3 days ago",
    status: "draft",
    pages: 5,
  },
];

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<WebProject[]>(DEMO_PROJECTS);
  const [currentProject, setCurrentProject] = useState<WebProject | null>(null);
  const [currentPage, setCurrentPage] = useState<PageData | null>(null);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [showCodeMode, setShowCodeMode] = useState(false);

  const addProject = (p: WebProject) => setProjects((prev) => [p, ...prev]);
  const deleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));

  return (
    <BuilderContext.Provider
      value={{
        projects, currentProject, currentPage, selectedElement, deviceMode, showCodeMode,
        setProjects, setCurrentProject, setCurrentPage, setSelectedElement, setDeviceMode, setShowCodeMode,
        addProject, deleteProject,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used within BuilderProvider");
  return ctx;
}
