import React, { useState, useEffect } from 'react';
import Header from '../components/ui/Header';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const RouteMapPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0);
  const [collectedHouseholds, setCollectedHouseholds] = useState([]);
  const [routeData, setRouteData] = useState([
    { id: 'H001', name: 'Household 1', address: '123 Main St', lat: 28.6139, lng: 77.2090, status: 'pending', priority: 'high' },
    { id: 'H002', name: 'Household 2', address: '456 Oak Ave', lat: 28.6149, lng: 77.2100, status: 'pending', priority: 'medium' },
    { id: 'H003', name: 'Household 3', address: '789 Pine Rd', lat: 28.6159, lng: 77.2110, status: 'pending', priority: 'low' },
    { id: 'H004', name: 'Household 4', address: '321 Elm St', lat: 28.6169, lng: 77.2120, status: 'pending', priority: 'high' },
    { id: 'H005', name: 'Household 5', address: '654 Maple Dr', lat: 28.6179, lng: 77.2130, status: 'pending', priority: 'medium' },
  ]);

  useEffect(() => {
    // Simulate getting current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Fallback to default location (Delhi)
          setCurrentLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      // Fallback to default location
      setCurrentLocation({ lat: 28.6139, lng: 77.2090 });
    }
  }, []);

  const startTracking = () => {
    setIsTracking(true);
    // Simulate route progress
    const interval = setInterval(() => {
      setRouteProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTracking(false);
          return 100;
        }
        return prev + 10;
      });
    }, 2000);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setRouteProgress(0);
  };

  const markAsCollected = (householdId) => {
    setCollectedHouseholds(prev => [...prev, householdId]);
    setRouteData(prev => prev.map(household => 
      household.id === householdId 
        ? { ...household, status: 'collected' }
        : household
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'collected': return 'CheckCircle';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'collected': return 'text-success';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mr-4">
              <Icon name="Map" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Route Map</h1>
              <p className="text-muted-foreground">Optimized collection route with GPS tracking</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Collection Route</h2>
              <div className="flex space-x-2">
                <Button 
                  variant={isTracking ? "destructive" : "default"} 
                  size="sm"
                  onClick={isTracking ? stopTracking : startTracking}
                >
                  <Icon name={isTracking ? "Square" : "Play"} size={16} className="mr-2" />
                  {isTracking ? "Stop" : "Start"} Tracking
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative bg-muted rounded-lg h-96 mb-4 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Map" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive Map View</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {currentLocation ? 
                      `Current Location: ${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` :
                      'Getting location...'
                    }
                  </p>
                </div>
              </div>
              
              {/* Route Progress Overlay */}
              {isTracking && (
                <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Navigation" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Route Progress</span>
                  </div>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${routeProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{routeProgress}% Complete</p>
                </div>
              )}
            </div>

            {/* Route Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{routeData.length}</p>
                <p className="text-sm text-muted-foreground">Total Stops</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-success">{collectedHouseholds.length}</p>
                <p className="text-sm text-muted-foreground">Collected</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-warning">{routeData.length - collectedHouseholds.length}</p>
                <p className="text-sm text-muted-foreground">Remaining</p>
              </div>
            </div>
          </div>

          {/* Route List */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Collection Stops</h2>
            
            <div className="space-y-3">
              {routeData.map((household, index) => (
                <div 
                  key={household.id}
                  className={`p-3 rounded-lg border ${
                    household.status === 'collected' 
                      ? 'bg-success/10 border-success/20' 
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {index + 1}. {household.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          household.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                          household.priority === 'medium' ? 'bg-warning/20 text-warning' :
                          'bg-success/20 text-success'
                        }`}>
                          {household.priority}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{household.address}</p>
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getStatusIcon(household.status)} 
                          size={14} 
                          className={getStatusColor(household.status)} 
                        />
                        <span className={`text-xs ${getStatusColor(household.status)}`}>
                          {household.status === 'collected' ? 'Collected' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    
                    {household.status === 'pending' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsCollected(household.id)}
                        className="ml-2"
                      >
                        <Icon name="Check" size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 space-y-2">
              <Button variant="outline" className="w-full">
                <Icon name="Navigation" size={16} className="mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" className="w-full">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Optimize Route
              </Button>
              <Button variant="outline" className="w-full">
                <Icon name="Download" size={16} className="mr-2" />
                Export Route
              </Button>
            </div>
          </div>
        </div>

        {/* Route Information */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Route Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Estimated Time</p>
              <p className="text-lg font-bold text-foreground">2h 30m</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Icon name="MapPin" size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Total Distance</p>
              <p className="text-lg font-bold text-foreground">15.2 km</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Icon name="Fuel" size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Fuel Estimate</p>
              <p className="text-lg font-bold text-foreground">8.5 L</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Icon name="DollarSign" size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Cost Estimate</p>
              <p className="text-lg font-bold text-foreground">₹450</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RouteMapPage;
