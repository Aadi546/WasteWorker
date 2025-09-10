import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ExecutiveSummaryDashboard from './pages/executive-summary-dashboard';
import DailyTasksPage from './pages/DailyTasksPage';
import ScannerPage from './pages/ScannerPage';
import RouteMapPage from './pages/RouteMapPage';
import TrainingPage from './pages/TrainingPage';
import SettingsPage from './pages/SettingsPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ExecutiveSummaryDashboard />} />
        <Route path="/executive-summary-dashboard" element={<ExecutiveSummaryDashboard />} />
        <Route path="/daily-tasks" element={<DailyTasksPage />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/route-map" element={<RouteMapPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
