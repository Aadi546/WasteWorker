import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const ExecutiveSummaryDashboard = () => {
  const navigate = useNavigate();
  const summary = {
    collectedToday: 68,
    outstandingTasks: 59,
    complianceRate: 88
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/10 via-muted to-transparent">
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <Icon name="Recycle" size={18} color="white" />
                    </div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">Operations</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Waste Worker Dashboard</h1>
                  <p className="text-muted-foreground">Daily overview and quick access to your key tasks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Collected Today</p>
                  <p className="text-2xl font-bold text-foreground">{summary.collectedToday}</p>
                </div>
                <div className="w-10 h-10 rounded-md bg-success/15 flex items-center justify-center">
                  <Icon name="CheckCircle" size={18} className="text-success" />
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Outstanding Tasks</p>
                  <p className="text-2xl font-bold text-foreground">{summary.outstandingTasks}</p>
                </div>
                <div className="w-10 h-10 rounded-md bg-warning/15 flex items-center justify-center">
                  <Icon name="ClipboardList" size={18} className="text-warning" />
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Compliance Rate</p>
                  <p className="text-2xl font-bold text-foreground">{summary.complianceRate}%</p>
                </div>
                <div className="w-10 h-10 rounded-md bg-accent/15 flex items-center justify-center">
                  <Icon name="ShieldCheck" size={18} className="text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <button onClick={() => navigate('/daily-tasks')} className="group rounded-lg border border-border bg-muted/40 hover:bg-muted transition-colors p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/15 flex items-center justify-center group-hover:scale-105 transition">
                      <Icon name="CheckSquare" size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Daily Task List</p>
                      <p className="text-xs text-muted-foreground">Which households to collect from</p>
                    </div>
                  </div>
                </button>

                <button onClick={() => navigate('/scanner')} className="group rounded-lg border border-border bg-muted/40 hover:bg-muted transition-colors p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-success/15 flex items-center justify-center group-hover:scale-105 transition">
                      <Icon name="QrCode" size={18} className="text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">QR/Barcode Scanner</p>
                      <p className="text-xs text-muted-foreground">Check segregation compliance</p>
                    </div>
                  </div>
                </button>

                <button onClick={() => navigate('/route-map')} className="group rounded-lg border border-border bg-muted/40 hover:bg-muted transition-colors p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-accent/15 flex items-center justify-center group-hover:scale-105 transition">
                      <Icon name="Map" size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Route Map</p>
                      <p className="text-xs text-muted-foreground">Optimized route & GPS</p>
                    </div>
                  </div>
                </button>

                <button onClick={() => navigate('/training')} className="group rounded-lg border border-border bg-muted/40 hover:bg-muted transition-colors p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-secondary/15 flex items-center justify-center group-hover:scale-105 transition">
                      <Icon name="BookOpen" size={18} className="text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Training</p>
                      <p className="text-xs text-muted-foreground">Learn safety & handling</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveSummaryDashboard;