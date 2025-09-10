import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PeriodSelector = ({ onPeriodChange, onComparisonToggle }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [comparisonEnabled, setComparisonEnabled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const periods = [
    { value: 'monthly', label: 'Monthly View', icon: 'Calendar' },
    { value: 'quarterly', label: 'Quarterly View', icon: 'CalendarDays' },
    { value: 'yearly', label: 'Yearly View', icon: 'CalendarRange' }
  ];

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setIsDropdownOpen(false);
    onPeriodChange?.(period);
  };

  const handleComparisonToggle = () => {
    const newState = !comparisonEnabled;
    setComparisonEnabled(newState);
    onComparisonToggle?.(newState);
  };

  const currentPeriod = periods?.find(p => p?.value === selectedPeriod);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Desktop layout */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Reporting Period:</span>
        </div>
        
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2"
          >
            <Icon name={currentPeriod?.icon} size={16} />
            <span>{currentPeriod?.label}</span>
            <Icon name="ChevronDown" size={16} className={`micro-interaction ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </Button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 z-20">
              {periods?.map((period) => (
                <button
                  key={period?.value}
                  onClick={() => handlePeriodSelect(period?.value)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted micro-interaction ${
                    selectedPeriod === period?.value ? 'bg-muted text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon name={period?.icon} size={16} />
                  <span className="text-sm">{period?.label}</span>
                  {selectedPeriod === period?.value && (
                    <Icon name="Check" size={14} className="ml-auto text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        </div>
        <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">Department Comparison:</span>
          <button
            onClick={handleComparisonToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full micro-interaction ${
              comparisonEnabled ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                comparisonEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Printer" size={16} className="mr-2" />
            Print
          </Button>
        </div>
      </div>
      </div>
      {/* Mobile Layout */}
      <div className="flex lg:hidden items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={18} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Period</span>
        </div>
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Icon name={currentPeriod?.icon} size={16} className="mr-1" />
            <span className="text-xs">{selectedPeriod?.charAt(0)?.toUpperCase() + selectedPeriod?.slice(1)}</span>
          </Button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-44 bg-popover border border-border rounded-lg shadow-lg py-2 z-20">
              {periods?.map((period) => (
                <button
                  key={period?.value}
                  onClick={() => handlePeriodSelect(period?.value)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted micro-interaction ${
                    selectedPeriod === period?.value ? 'bg-muted text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon name={period?.icon} size={14} />
                  <span className="text-xs">{period?.label}</span>
                  {selectedPeriod === period?.value && (
                    <Icon name="Check" size={12} className="ml-auto text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          variant={comparisonEnabled ? "default" : "ghost"}
          size="sm"
          onClick={handleComparisonToggle}
        >
          <Icon name="BarChart3" size={16} />
        </Button>
      </div>
      {/* Dropdown Overlay for Mobile */}
      {isDropdownOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default PeriodSelector;