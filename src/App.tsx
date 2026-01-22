import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Index from "./pages/Index";
import AuthSeller from "./pages/AuthSeller";
import AuthCreator from "./pages/AuthCreator";
import SellerDashboard from "./pages/SellerDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import Campaigns from "./pages/Campaigns";
import NewCampaign from "./pages/NewCampaign";
import CampaignDetail from "./pages/CampaignDetail";
import Creators from "./pages/Creators";
import SeniorCreators from "./pages/SeniorCreators";
import CreatorProfile from "./pages/CreatorProfile";
import ProfileEdit from "./pages/ProfileEdit";
import Messages from "./pages/Messages";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has already seen the loading screen this session
    const hasSeenLoading = sessionStorage.getItem("maketik_loading_seen");
    if (hasSeenLoading) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("maketik_loading_seen", "true");
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AnimatePresence mode="wait">
              {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
            </AnimatePresence>
            {showContent && (
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth/seller" element={<AuthSeller />} />
                  <Route path="/auth/creator" element={<AuthCreator />} />
                  <Route path="/dashboard/seller" element={<SellerDashboard />} />
                  <Route path="/dashboard/creator" element={<CreatorDashboard />} />
                  <Route path="/campaigns" element={<Campaigns />} />
                  <Route path="/campaigns/new" element={<NewCampaign />} />
                  <Route path="/campaigns/:id" element={<CampaignDetail />} />
                  <Route path="/creators" element={<Creators />} />
                  <Route path="/creators/senior" element={<SeniorCreators />} />
                  <Route path="/profile/:userId" element={<CreatorProfile />} />
                  <Route path="/profile/edit" element={<ProfileEdit />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            )}
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
