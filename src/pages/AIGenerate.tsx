import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Loader2, Wand2, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBuilder } from "@/contexts/BuilderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WebProject } from "@/types/builder";

const BUSINESS_TYPES = [
  { label: "SaaS / Tech", icon: "🚀" },
  { label: "Restaurant", icon: "🍽️" },
  { label: "Portfolio", icon: "🎨" },
  { label: "E-commerce", icon: "🛒" },
  { label: "Agency", icon: "💼" },
  { label: "Blog", icon: "✍️" },
  { label: "Education", icon: "📚" },
  { label: "Healthcare", icon: "🏥" },
];

export default function AIGenerate() {
  const navigate = useNavigate();
  const { addProject } = useBuilder();
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const newProject: WebProject = {
        id: Date.now().toString(),
        name: businessName || businessType + " Website",
        description: description || `AI-generated ${businessType} website`,
        lastEdited: "Just now",
        status: "draft",
        pages: 5,
      };
      addProject(newProject);
      setGenerating(false);
      navigate("/editor/" + newProject.id);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-editor-bg flex flex-col">
      {/* Header */}
      <header className="border-b border-editor-border px-6 py-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-editor-text-muted hover:text-editor-text hover:bg-editor-surface"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-editor-accent" />
          <span className="font-display font-semibold text-editor-text">AI Website Generator</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {/* Step 0: Choose business type */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-display font-bold text-editor-text mb-3">
                    What type of website do you need?
                  </h2>
                  <p className="text-editor-text-muted">Pick a category and our AI will craft the perfect site.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {BUSINESS_TYPES.map((bt) => (
                    <button
                      key={bt.label}
                      onClick={() => {
                        setBusinessType(bt.label);
                        setStep(1);
                      }}
                      className={`p-4 rounded-xl border transition-all duration-200 text-center hover:scale-[1.03] ${
                        businessType === bt.label
                          ? "border-editor-accent bg-editor-accent/10"
                          : "border-editor-border bg-editor-surface hover:border-editor-accent/40"
                      }`}
                    >
                      <div className="text-3xl mb-2">{bt.icon}</div>
                      <div className="text-sm font-medium text-editor-text">{bt.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-display font-bold text-editor-text mb-3">
                    Tell us about your {businessType}
                  </h2>
                  <p className="text-editor-text-muted">The more details, the better the AI result.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-editor-text mb-2 block">Business Name</label>
                    <Input
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Acme Studios"
                      className="bg-editor-surface border-editor-border text-editor-text placeholder:text-editor-text-muted focus:border-editor-accent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-editor-text mb-2 block">Description</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your business, services, target audience, and any design preferences..."
                      rows={4}
                      className="bg-editor-surface border-editor-border text-editor-text placeholder:text-editor-text-muted focus:border-editor-accent resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(0)}
                    className="border-editor-border text-editor-text hover:bg-editor-surface"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="flex-1 gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating your website...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" /> Generate Website
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generation overlay */}
          <AnimatePresence>
            {generating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-editor-bg/80 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto animate-pulse-glow">
                    <Sparkles className="w-10 h-10 text-editor-bg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-editor-text mb-2">
                      Creating your website...
                    </h3>
                    <p className="text-editor-text-muted">AI is generating layout, content, and design</p>
                  </div>
                  <div className="flex items-center gap-2 justify-center text-sm text-editor-text-muted">
                    <Loader2 className="w-4 h-4 animate-spin text-editor-accent" />
                    <span>Building hero section, about, services, contact...</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
