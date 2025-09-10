import React from 'react';
import Header from '../components/ui/Header';

const SettingsPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Configure your preferences here.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
