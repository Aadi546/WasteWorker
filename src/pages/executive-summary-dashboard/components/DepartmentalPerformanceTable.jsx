import React from 'react';
import Icon from '../../../components/AppIcon';

const DepartmentalPerformanceTable = () => {
  const departments = [
    {
      id: 1,
      name: 'North District',
      manager: 'Sarah Johnson',
      efficiency: 94.2,
      compliance: 89.5,
      satisfaction: 4.3,
      costPerHousehold: 28.50,
      trend: 'up',
      trendValue: '+2.1%',
      status: 'excellent',
      alerts: 0,
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      name: 'South District',
      manager: 'Michael Chen',
      efficiency: 91.8,
      compliance: 92.1,
      satisfaction: 4.1,
      costPerHousehold: 31.20,
      trend: 'up',
      trendValue: '+1.8%',
      status: 'good',
      alerts: 1,
      lastUpdate: '1 hour ago'
    },
    {
      id: 3,
      name: 'East District',
      manager: 'Emily Rodriguez',
      efficiency: 87.3,
      compliance: 85.2,
      satisfaction: 3.9,
      costPerHousehold: 33.75,
      trend: 'down',
      trendValue: '-1.2%',
      status: 'warning',
      alerts: 3,
      lastUpdate: '30 min ago'
    },
    {
      id: 4,
      name: 'West District',
      manager: 'David Thompson',
      efficiency: 92.6,
      compliance: 88.7,
      satisfaction: 4.2,
      costPerHousehold: 29.80,
      trend: 'stable',
      trendValue: '0.0%',
      status: 'good',
      alerts: 0,
      lastUpdate: '45 min ago'
    },
    {
      id: 5,
      name: 'Central District',
      manager: 'Lisa Park',
      efficiency: 89.1,
      compliance: 91.3,
      satisfaction: 4.0,
      costPerHousehold: 32.10,
      trend: 'up',
      trendValue: '+0.8%',
      status: 'good',
      alerts: 2,
      lastUpdate: '1.5 hours ago'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-success text-white';
      case 'good': return 'bg-accent text-white';
      case 'warning': return 'bg-warning text-white';
      case 'critical': return 'bg-error text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return { icon: 'TrendingUp', color: 'text-success' };
      case 'down': return { icon: 'TrendingDown', color: 'text-error' };
      default: return { icon: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const getPerformanceColor = (value, type) => {
    if (type === 'cost') {
      if (value <= 30) return 'text-success';
      if (value <= 35) return 'text-warning';
      return 'text-error';
    } else {
      if (value >= 90) return 'text-success';
      if (value >= 85) return 'text-warning';
      return 'text-error';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Building2" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Departmental Performance</h3>
            <p className="text-sm text-muted-foreground">District-wise operational metrics</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-muted-foreground hover:text-foreground micro-interaction">
            Export
          </button>
          <button className="text-sm text-primary hover:text-primary/80 micro-interaction">
            View Details
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">District</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Efficiency</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Compliance</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Satisfaction</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Cost/HH</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Alerts</th>
            </tr>
          </thead>
          <tbody>
            {departments?.map((dept) => {
              const trendData = getTrendIcon(dept?.trend);
              return (
                <tr key={dept?.id} className="border-b border-border hover:bg-muted/30 micro-interaction">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-foreground">{dept?.name}</div>
                      <div className="text-sm text-muted-foreground">{dept?.manager}</div>
                      <div className="text-xs text-muted-foreground mt-1">Updated {dept?.lastUpdate}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dept?.status)}`}>
                      {dept?.status?.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-medium ${getPerformanceColor(dept?.efficiency, 'efficiency')}`}>
                      {dept?.efficiency}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-medium ${getPerformanceColor(dept?.compliance, 'compliance')}`}>
                      {dept?.compliance}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="font-medium text-foreground">{dept?.satisfaction}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-medium ${getPerformanceColor(dept?.costPerHousehold, 'cost')}`}>
                      ${dept?.costPerHousehold}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className={`flex items-center justify-center space-x-1 ${trendData?.color}`}>
                      <Icon name={trendData?.icon} size={16} />
                      <span className="text-sm font-medium">{dept?.trendValue}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {dept?.alerts > 0 ? (
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-error">{dept?.alerts}</span>
                      </div>
                    ) : (
                      <Icon name="Check" size={16} className="text-success mx-auto" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-muted-foreground">Excellent (≥90%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <span className="text-muted-foreground">Good (85-89%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-muted-foreground">Warning (&lt;85%)</span>
            </div>
          </div>
          <span className="text-muted-foreground">5 districts monitored</span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentalPerformanceTable;