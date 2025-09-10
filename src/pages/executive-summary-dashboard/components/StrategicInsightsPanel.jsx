import React from 'react';
import Icon from '../../../components/AppIcon';

const StrategicInsightsPanel = () => {
  const insights = [
    {
      id: 1,
      type: 'optimization',
      title: 'Route Optimization Opportunity',
      description: `District 7 shows 15% efficiency improvement potential through route consolidation. Estimated savings: $12,000/month.`,
      priority: 'high',
      impact: 'High',
      effort: 'Medium',
      timeline: '2-3 weeks',
      icon: 'Route',
      action: 'Review Routes'
    },
    {
      id: 2,
      type: 'training',
      title: 'Training Priority Alert',
      description: `Segregation compliance dropped 8% in Zone C. Additional training recommended for 12 field workers.`,
      priority: 'medium',
      impact: 'Medium',
      effort: 'Low',
      timeline: '1 week',
      icon: 'GraduationCap',
      action: 'Schedule Training'
    },
    {
      id: 3,
      type: 'resource',
      title: 'Resource Allocation',
      description: `Peak collection hours (8-10 AM) require 2 additional vehicles in high-density areas to meet SLA targets.`,
      priority: 'high',
      impact: 'High',
      effort: 'High',
      timeline: '4-6 weeks',
      icon: 'Truck',
      action: 'Resource Planning'
    },
    {
      id: 4,
      type: 'technology',
      title: 'Technology Enhancement',
      description: `GPS tracking accuracy improved collection verification by 23%. Expand to remaining 40% of fleet.`,
      priority: 'low',
      impact: 'Medium',
      effort: 'Medium',
      timeline: '6-8 weeks',
      icon: 'Smartphone',
      action: 'Tech Rollout'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error bg-error/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-accent bg-accent/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Lightbulb" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Strategic Insights</h3>
            <p className="text-sm text-muted-foreground">AI-driven recommendations</p>
          </div>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 micro-interaction">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {insights?.map((insight) => (
          <div 
            key={insight?.id}
            className={`border-l-4 rounded-lg p-4 ${getPriorityColor(insight?.priority)} micro-interaction hover:shadow-sm`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                  <Icon name={insight?.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{insight?.title}</h4>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getPriorityBadge(insight?.priority)}`}>
                    {insight?.priority?.toUpperCase()} PRIORITY
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {insight?.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Target" size={12} />
                  <span>Impact: {insight?.impact}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{insight?.timeline}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={12} />
                  <span>Effort: {insight?.effort}</span>
                </div>
              </div>
              <button className="text-xs text-primary hover:text-primary/80 font-medium micro-interaction">
                {insight?.action}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last updated: 2 hours ago</span>
          <button className="flex items-center space-x-1 text-primary hover:text-primary/80 micro-interaction">
            <Icon name="RefreshCw" size={14} />
            <span>Refresh Insights</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategicInsightsPanel;