import { motion } from "framer-motion";
import { Plus, Sparkles, Globe, Clock, MoreVertical, Trash2, Copy, ExternalLink } from "lucide-react";
import { useBuilder } from "@/contexts/BuilderContext";
import { useNavigate } from "react-router-dom";
import { WebProject } from "@/types/builder";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const { projects, addProject, deleteProject } = useBuilder();
  const navigate = useNavigate();

  const handleNewProject = () => {
    navigate("/ai-generate");
  };

  const handleOpenEditor = (project: WebProject) => {
    navigate("/editor/" + project.id);
  };

  const handleDuplicate = (project: WebProject) => {
    const dup: WebProject = {
      ...project,
      id: Date.now().toString(),
      name: project.name + " (Copy)",
      lastEdited: "Just now",
      status: "draft",
    };
    addProject(dup);
  };

  return (
    <div className="min-h-screen bg-editor-bg">
      {/* Top Nav */}
      <header className="border-b border-editor-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-editor-bg" />
          </div>
          <h1 className="text-xl font-display font-bold text-editor-text">SiteForge AI</h1>
        </div>
        <Button
          onClick={handleNewProject}
          className="gradient-primary text-primary-foreground font-semibold gap-2 shadow-glow hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Website
        </Button>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-display font-bold text-editor-text mb-2">Your Websites</h2>
          <p className="text-editor-text-muted mb-8">Create, manage, and publish your AI-generated websites.</p>
        </motion.div>

        {/* Create Card + Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* New Project Card */}
          <motion.button
            onClick={handleNewProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative rounded-xl border-2 border-dashed border-editor-border hover:border-editor-accent p-8 flex flex-col items-center justify-center gap-4 min-h-[220px] transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center group-hover:animate-pulse-glow transition-all">
              <Plus className="w-7 h-7 text-editor-bg" />
            </div>
            <div className="text-center">
              <p className="font-display font-semibold text-editor-text">Create New Website</p>
              <p className="text-sm text-editor-text-muted mt-1">AI-powered or from scratch</p>
            </div>
          </motion.button>

          {/* Project Cards */}
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="group relative rounded-xl border border-editor-border bg-editor-surface hover:border-editor-accent/50 transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleOpenEditor(project)}
            >
              {/* Thumbnail */}
              <div className="h-36 gradient-card relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <Globe className="w-16 h-16 text-editor-accent" />
                </div>
                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      project.status === "published"
                        ? "bg-editor-accent/20 text-editor-accent"
                        : "bg-editor-surface text-editor-text-muted"
                    }`}
                  >
                    {project.status === "published" ? "Live" : "Draft"}
                  </span>
                </div>
                {/* Menu */}
                <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-8 h-8 rounded-lg bg-editor-bg/60 backdrop-blur flex items-center justify-center hover:bg-editor-bg/80 transition-colors">
                        <MoreVertical className="w-4 h-4 text-editor-text" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-editor-surface border-editor-border">
                      <DropdownMenuItem
                        className="text-editor-text hover:bg-editor-surface-hover gap-2"
                        onClick={() => handleDuplicate(project)}
                      >
                        <Copy className="w-4 h-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-editor-text hover:bg-editor-surface-hover gap-2"
                      >
                        <ExternalLink className="w-4 h-4" /> Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive hover:bg-editor-surface-hover gap-2"
                        onClick={() => deleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-display font-semibold text-editor-text truncate">{project.name}</h3>
                <p className="text-sm text-editor-text-muted mt-1 line-clamp-1">{project.description}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-editor-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {project.lastEdited}
                  </span>
                  <span>{project.pages} pages</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
