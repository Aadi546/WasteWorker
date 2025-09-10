import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const DailyTasksPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      householdId: 'H001',
      address: '123 Main Street, Sector 15',
      priority: 'high',
      status: 'pending',
      estimatedTime: '15 min',
      notes: 'Large family, multiple bins'
    },
    {
      id: 2,
      householdId: 'H002',
      address: '456 Oak Avenue, Sector 16',
      priority: 'medium',
      status: 'pending',
      estimatedTime: '10 min',
      notes: 'Regular collection'
    },
    {
      id: 3,
      householdId: 'H003',
      address: '789 Pine Road, Sector 17',
      priority: 'low',
      status: 'completed',
      estimatedTime: '8 min',
      notes: 'Completed at 9:30 AM'
    },
    {
      id: 4,
      householdId: 'H004',
      address: '321 Elm Street, Sector 18',
      priority: 'high',
      status: 'pending',
      estimatedTime: '12 min',
      notes: 'Special waste handling required'
    },
    {
      id: 5,
      householdId: 'H005',
      address: '654 Maple Drive, Sector 19',
      priority: 'medium',
      status: 'in-progress',
      estimatedTime: '10 min',
      notes: 'Currently collecting'
    }
  ]);

  const markAsCompleted = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: 'completed' }
        : task
    ));
  };

  const startTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: 'in-progress' }
        : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-primary bg-primary/10';
      case 'pending': return 'text-muted-foreground bg-muted/50';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'pending': return 'Circle';
      default: return 'Circle';
    }
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mr-4">
                <Icon name="CheckSquare" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Daily Task List</h1>
                <p className="text-muted-foreground">Which households to collect from</p>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                  <p className="text-2xl font-bold text-foreground">{tasks.length}</p>
                </div>
                <Icon name="List" size={24} className="text-primary" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">{pendingTasks.length}</p>
                </div>
                <Icon name="Clock" size={24} className="text-warning" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-primary">{inProgressTasks.length}</p>
                </div>
                <Icon name="Play" size={24} className="text-primary" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">{completedTasks.length}</p>
                </div>
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Collection Tasks</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    task.status === 'completed'
                      ? 'bg-success/5 border-success/20'
                      : task.status === 'in-progress'
                        ? 'bg-primary/5 border-primary/20'
                        : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {task.householdId}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority} priority
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>

                      <p className="text-foreground font-medium mb-1">{task.address}</p>
                      <p className="text-sm text-muted-foreground mb-2">{task.notes}</p>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{task.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name={getStatusIcon(task.status)} size={14} />
                          <span className="capitalize">{task.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      {task.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => startTask(task.id)}
                        >
                          <Icon name="Play" size={14} className="mr-1" />
                          Start
                        </Button>
                      )}

                      {task.status === 'in-progress' && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => markAsCompleted(task.id)}
                        >
                          <Icon name="Check" size={14} className="mr-1" />
                          Complete
                        </Button>
                      )}

                      <Button size="sm" variant="outline">
                        <Icon name="MapPin" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4" onClick={() => navigate('/scanner')}>
                <div className="text-center">
                  <Icon name="QrCode" size={24} className="text-primary mx-auto mb-2" />
                  <p className="font-medium text-foreground">Scan QR Code</p>
                  <p className="text-sm text-muted-foreground">Check household compliance</p>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4" onClick={() => navigate('/route-map')}>
                <div className="text-center">
                  <Icon name="Map" size={24} className="text-primary mx-auto mb-2" />
                  <p className="font-medium text-foreground">View Route Map</p>
                  <p className="text-sm text-muted-foreground">Optimized collection route</p>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4" onClick={() => navigate('/training')}>
                <div className="text-center">
                  <Icon name="BookOpen" size={24} className="text-primary mx-auto mb-2" />
                  <p className="font-medium text-foreground">Training Module</p>
                  <p className="text-sm text-muted-foreground">Safety & handling tutorials</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyTasksPage;
