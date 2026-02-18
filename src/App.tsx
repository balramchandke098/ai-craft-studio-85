import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BuilderProvider } from "@/contexts/BuilderContext";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import AIGenerate from "./pages/AIGenerate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BuilderProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/ai-generate" element={<AIGenerate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BuilderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
