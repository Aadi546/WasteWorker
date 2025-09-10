import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveKPICard = ({ title, value, unit, trend, trendValue, benchmark, status, icon, description }) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-success/10 border-success/20';
      case 'good': return 'bg-accent/10 border-accent/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'critical': return 'bg-error/10 border-error/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-6 ${getStatusColor(status)} micro-interaction hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={16} />
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-lg text-muted-foreground">{unit}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Benchmark: {benchmark}</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              status === 'excellent' ? 'bg-success' :
              status === 'good' ? 'bg-accent' :
              status === 'warning' ? 'bg-warning' :
              status === 'critical' ? 'bg-error' : 'bg-muted-foreground'
            }`} />
            <span className="capitalize text-muted-foreground">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveKPICard;