import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import RatingStars from '../components/ui/RatingStars';
import Textarea from '../components/ui/Textarea';
import { setHouseholdRating, getHouseholdRating } from '../utils/ratings';
import { loadTasksFromStorage, saveTasksToStorage, loadLastScansFromStorage, saveLastScansToStorage } from '../utils/tasks';

const DailyTasksPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Map of householdId -> last scan info
  const [lastScans, setLastScans] = useState({});

  // Load persisted tasks and scans once
  useEffect(() => {
    const storedTasks = loadTasksFromStorage();
    if (storedTasks && Array.isArray(storedTasks) && storedTasks.length) {
      setTasks(storedTasks);
    }
    const storedScans = loadLastScansFromStorage();
    if (storedScans && typeof storedScans === 'object') {
      setLastScans(storedScans);
    }
  }, []);

  // Persist tasks and scans on change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);
  useEffect(() => {
    saveLastScansToStorage(lastScans);
  }, [lastScans]);

  // Seed an example review for a completed task (H003) if not already saved
  useEffect(() => {
    try {
      const existing = getHouseholdRating('H003');
      if (!existing) {
        setHouseholdRating('H003', 4, 'Segregation was good, minor mix-ups in paper bin.');
      }
    } catch {}
  }, []);

  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [modalTaskId, setModalTaskId] = useState(null);
  const [modalHouseholdId, setModalHouseholdId] = useState('');
  const [modalRating, setModalRating] = useState(0);
  const [modalReview, setModalReview] = useState('');

  const openRatingModal = (task) => {
    setModalTaskId(task.id);
    setModalHouseholdId(task.householdId);
    const existing = getHouseholdRating(task.householdId);
    setModalRating(existing?.rating || 0);
    setModalReview(existing?.review || '');
    setRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setRatingModalOpen(false);
    setModalTaskId(null);
    setModalHouseholdId('');
    setModalRating(0);
    setModalReview('');
  };

  const confirmCompleteWithRating = () => {
    if (!modalTaskId) return;
    if (!modalRating || modalRating < 1) return; // require rating
    setHouseholdRating(modalHouseholdId, modalRating, modalReview);
    setTasks(tasks.map(task =>
      task.id === modalTaskId
        ? { ...task, status: 'completed' }
        : task
    ));
    closeRatingModal();
  };

  const handleStart = (task) => {
    navigate('/scanner', {
      state: {
        taskId: task.id,
        expectedHouseholdId: task.householdId,
        autoStart: true,
        returnTo: '/daily-tasks'
      }
    });
  };

  // When returning from scanner with a successful scan, store scan info and mark that task as in-progress
  useEffect(() => {
    const scanSuccessForTaskId = location.state?.scanSuccessForTaskId;
    const scannedHouseholdId = location.state?.scannedHouseholdId;
    const scannedAt = location.state?.scannedAt;
    if (scanSuccessForTaskId && scannedHouseholdId && scannedAt) {
      // persist scan info
      setLastScans(prev => ({
        ...prev,
        [scannedHouseholdId]: { scannedAt }
      }));
      // mark task in-progress
      setTasks(prev => prev.map(task =>
        task.id === scanSuccessForTaskId
          ? { ...task, status: 'in-progress' }
          : task
      ));
      // Clear the navigation state so it doesn't re-trigger on refresh/navigation
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

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

  const ratingsMap = useMemo(() => {
    const map = {};
    tasks.forEach(t => {
      const r = getHouseholdRating(t.householdId);
      if (r) map[t.householdId] = r;
    });
    return map;
  }, [tasks]);

  const minutesAgo = (timestamp) => {
    const diffMs = Date.now() - timestamp;
    const mins = Math.floor(diffMs / 60000);
    return mins;
  };

  const hasRecentMatchingScan = (householdId) => {
    const info = lastScans[householdId];
    if (!info) return false;
    return Date.now() - info.scannedAt <= 10 * 60 * 1000; // 10 minutes
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg font-semibold text-foreground">Collection Tasks</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="hidden xs:inline-flex">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border w-full overflow-hidden ${
                    task.status === 'completed'
                      ? 'bg-success/5 border-success/20'
                      : task.status === 'in-progress'
                        ? 'bg-primary/5 border-primary/20'
                        : 'bg-card border-border'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
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

                      <p className="text-foreground font-medium mb-1 break-words">{task.address}</p>
                      <p className="text-sm text-muted-foreground mb-2 break-words">{task.notes}</p>

                      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{task.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name={getStatusIcon(task.status)} size={14} />
                          <span className="capitalize">{task.status}</span>
                        </div>
                        {lastScans[task.householdId]?.scannedAt && (
                          <div className="flex items-center space-x-1">
                            <Icon name="QrCode" size={14} />
                            <span>Scanned • {minutesAgo(lastScans[task.householdId].scannedAt)}m ago</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:space-x-2 sm:gap-0 sm:ml-4">
                      {task.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleStart(task)}
                        >
                          <Icon name="Play" size={14} className="mr-1" />
                          Start
                        </Button>
                      )}

                      {task.status === 'in-progress' && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => openRatingModal(task)}
                          disabled={!hasRecentMatchingScan(task.householdId)}
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
                  {/* Rating display for completed */}
                  {task.status === 'completed' && ratingsMap[task.householdId]?.rating && (
                    <div className="mt-3 p-3 rounded-md border border-border bg-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Segregation Rating</span>
                        <RatingStars value={ratingsMap[task.householdId]?.rating} readOnly />
                      </div>
                      {ratingsMap[task.householdId]?.review && (
                        <p className="mt-2 text-sm text-muted-foreground break-words">{ratingsMap[task.householdId]?.review}</p>
                      )}
                    </div>
                  )}
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

      {ratingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-lg p-6 mx-3">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Complete Task</h3>
                <p className="text-sm text-muted-foreground">Provide a segregation rating for {modalHouseholdId}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={closeRatingModal}>
                <Icon name="X" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-foreground mb-2">Segregation Rating</span>
                <RatingStars value={modalRating} onChange={setModalRating} />
                {!modalRating && (
                  <p className="mt-1 text-xs text-destructive">Rating is required</p>
                )}
              </div>
              <Textarea
                label="Optional description"
                placeholder="Add notes (optional)"
                value={modalReview}
                onChange={(e) => setModalReview(e.target.value)}
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <Button variant="outline" onClick={closeRatingModal}>Cancel</Button>
              <Button onClick={confirmCompleteWithRating} disabled={!modalRating}>Save & Complete</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyTasksPage;
