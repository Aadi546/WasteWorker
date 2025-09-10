import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: 'Home',
      tooltip: 'Executive summary dashboard',
      isActive: location.pathname === '/' || location.pathname === '/executive-summary-dashboard'
    },
    {
      label: 'Daily Task List',
      path: '/daily-tasks',
      icon: 'CheckSquare',
      tooltip: 'Which households to collect from',
      isActive: location.pathname === '/daily-tasks'
    },
    {
      label: 'QR/Barcode Scanner',
      path: '/scanner',
      icon: 'QrCode',
      tooltip: 'Scan household dustbin to check segregation compliance',
      isActive: location.pathname === '/scanner'
    },
    {
      label: 'Route Map',
      path: '/route-map',
      icon: 'Map',
      tooltip: 'Optimized collection route with GPS tracking',
      isActive: location.pathname === '/route-map'
    },
    {
      label: 'Training Module',
      path: '/training',
      icon: 'BookOpen',
      tooltip: 'Safety & waste handling tutorials',
      isActive: location.pathname === '/training'
    }
  ];

  // Secondary menu removed since Settings is available in profile menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Recycle" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              SwachhSamadhan
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <div key={item?.path} className="relative group">
              <Button
                variant={item?.isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className="micro-interaction touch-friendly px-4 py-2 h-10"
              >
                <Icon name={item?.icon} size={18} className="mr-2" />
                {item?.label}
              </Button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-10">
                {item?.tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          ))}

          {/* More Menu removed */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="touch-friendly p-2"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {/* User Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="touch-friendly p-2"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
            >
              <Icon name="Bell" size={20} />
            </Button>
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-elevation-3 p-3 z-20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-popover-foreground">Notifications</span>
                  <button
                    className="text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setShowNotifications(false)}
                  >Close</button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted">
                    <div className="w-6 h-6 rounded bg-primary/15 flex items-center justify-center">
                      <Icon name="Bell" size={14} className="text-primary" />
                    </div>
                    <div className="text-sm">
                      <p className="text-popover-foreground">Shift starts in 30 minutes</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted">
                    <div className="w-6 h-6 rounded bg-success/15 flex items-center justify-center">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                    </div>
                    <div className="text-sm">
                      <p className="text-popover-foreground">3 tasks marked completed</p>
                      <p className="text-xs text-muted-foreground">5 min ago</p>
                    </div>
                  </div>
                  <button
                    className="w-full text-xs text-muted-foreground hover:text-foreground text-left mt-1"
                    onClick={() => navigate('/daily-tasks')}
                  >View all tasks</button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="touch-friendly p-2"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            >
              <Icon name="User" size={20} />
            </Button>
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-3 p-2 z-20">
                <button
                  onClick={() => { setShowProfile(false); navigate('/settings'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted text-popover-foreground"
                >
                  <Icon name="Settings" size={16} />
                  Settings
                </button>
                <button
                  onClick={() => { setShowProfile(false); alert('Signed out'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted text-popover-foreground"
                >
                  <Icon name="LogOut" size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-card border-t border-border z-[60] max-h-[80vh] overflow-auto">
          <div className="px-4 py-3 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left micro-interaction touch-friendly ${
                  item?.isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} className="mr-3" />
                <div>
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs opacity-75 mt-1">{item?.tooltip}</div>
                </div>
              </button>
            ))}
            
            {/* Secondary items removed */}

            <div className="border-t border-border pt-2 mt-4 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 touch-friendly"
                onClick={() => alert('No new notifications')}
              >
                <Icon name="Bell" size={20} className="mr-2" />
                Notifications
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 touch-friendly"
                onClick={() => navigate('/settings')}
              >
                <Icon name="User" size={20} className="mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;