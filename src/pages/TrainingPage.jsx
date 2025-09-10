import React, { useState } from 'react';
import Header from '../components/ui/Header';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const TrainingPage = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(0);

  const trainingModules = [
    {
      id: 'safety',
      title: 'Safety Protocols',
      description: 'Essential safety guidelines for waste collection',
      icon: 'Shield',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      lessons: [
        {
          title: 'Personal Protective Equipment (PPE)',
          content: 'Learn about the essential safety gear required for waste collection including gloves, masks, safety shoes, and high-visibility clothing.',
          duration: '5 min',
          type: 'video'
        },
        {
          title: 'Hazardous Waste Identification',
          content: 'Understand how to identify and handle different types of hazardous waste materials safely.',
          duration: '8 min',
          type: 'interactive'
        },
        {
          title: 'Emergency Procedures',
          content: 'Know the proper procedures to follow in case of accidents or emergencies during waste collection.',
          duration: '6 min',
          type: 'quiz'
        }
      ]
    },
    {
      id: 'segregation',
      title: 'Waste Segregation',
      description: 'Proper waste sorting and categorization techniques',
      icon: 'Recycle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      lessons: [
        {
          title: 'Waste Categories',
          content: 'Learn about different waste categories: biodegradable, non-biodegradable, recyclable, and hazardous waste.',
          duration: '7 min',
          type: 'video'
        },
        {
          title: 'Sorting Techniques',
          content: 'Master the proper techniques for sorting waste at the source and during collection.',
          duration: '10 min',
          type: 'interactive'
        },
        {
          title: 'Quality Assessment',
          content: 'Learn how to assess the quality of waste segregation and provide feedback to households.',
          duration: '5 min',
          type: 'quiz'
        }
      ]
    },
    {
      id: 'equipment',
      title: 'Equipment Handling',
      description: 'Proper use and maintenance of collection equipment',
      icon: 'Wrench',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      lessons: [
        {
          title: 'Collection Vehicle Operation',
          content: 'Learn the basics of operating waste collection vehicles safely and efficiently.',
          duration: '12 min',
          type: 'video'
        },
        {
          title: 'Equipment Maintenance',
          content: 'Understand daily maintenance routines for collection equipment and vehicles.',
          duration: '8 min',
          type: 'interactive'
        },
        {
          title: 'Troubleshooting',
          content: 'Common issues and solutions for collection equipment problems.',
          duration: '6 min',
          type: 'quiz'
        }
      ]
    },
    {
      id: 'communication',
      title: 'Customer Communication',
      description: 'Effective communication with residents and stakeholders',
      icon: 'MessageCircle',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      lessons: [
        {
          title: 'Resident Interaction',
          content: 'Best practices for communicating with residents about waste collection schedules and segregation.',
          duration: '6 min',
          type: 'video'
        },
        {
          title: 'Feedback Collection',
          content: 'How to collect and document feedback from residents about waste management services.',
          duration: '5 min',
          type: 'interactive'
        },
        {
          title: 'Conflict Resolution',
          content: 'Techniques for handling complaints and resolving conflicts with residents.',
          duration: '7 min',
          type: 'quiz'
        }
      ]
    }
  ];

  const startModule = (moduleId) => {
    setSelectedModule(moduleId);
    setCurrentLesson(0);
  };

  const completeLesson = () => {
    if (currentLesson < trainingModules.find(m => m.id === selectedModule).lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else {
      setCompletedModules([...completedModules, selectedModule]);
      setSelectedModule(null);
      setCurrentLesson(0);
    }
  };

  const getLessonTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'interactive': return 'MousePointer';
      case 'quiz': return 'HelpCircle';
      default: return 'BookOpen';
    }
  };

  const getLessonTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-primary';
      case 'interactive': return 'text-success';
      case 'quiz': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  if (selectedModule) {
    const module = trainingModules.find(m => m.id === selectedModule);
    const lesson = module.lessons[currentLesson];
    const progress = ((currentLesson + 1) / module.lessons.length) * 100;

    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedModule(null)}
                className="mr-4"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Back to Modules
              </Button>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 ${module.bgColor} rounded-lg mr-4`}>
                  <Icon name={module.icon} size={24} className={module.color} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{module.title}</h1>
                  <p className="text-muted-foreground">Lesson {currentLesson + 1} of {module.lessons.length}</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">{lesson.title}</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getLessonTypeIcon(lesson.type)} size={16} className={getLessonTypeColor(lesson.type)} />
                      <span className="text-sm text-muted-foreground capitalize">{lesson.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Content Placeholder */}
              <div className="bg-muted/50 rounded-lg p-8 text-center mb-6">
                <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4">
                  <Icon name={getLessonTypeIcon(lesson.type)} size={40} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{lesson.title}</h3>
                <p className="text-muted-foreground mb-4">{lesson.content}</p>
                <div className="text-sm text-muted-foreground">
                  {lesson.type === 'video' && 'Video content would be displayed here'}
                  {lesson.type === 'interactive' && 'Interactive content would be displayed here'}
                  {lesson.type === 'quiz' && 'Quiz questions would be displayed here'}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  disabled={currentLesson === 0}
                  onClick={() => setCurrentLesson(currentLesson - 1)}
                >
                  <Icon name="ChevronLeft" size={16} className="mr-2" />
                  Previous
                </Button>
                
                <Button onClick={completeLesson}>
                  {currentLesson === module.lessons.length - 1 ? 'Complete Module' : 'Next Lesson'}
                  <Icon name="ChevronRight" size={16} className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Module Progress</h3>
              
              <div className="space-y-3">
                {module.lessons.map((lessonItem, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border ${
                      index === currentLesson 
                        ? 'bg-primary/10 border-primary/20' 
                        : index < currentLesson 
                          ? 'bg-success/10 border-success/20'
                          : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          index < currentLesson 
                            ? 'bg-success text-white' 
                            : index === currentLesson 
                              ? 'bg-primary text-white'
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {index < currentLesson ? (
                            <Icon name="Check" size={14} />
                          ) : (
                            <span className="text-xs font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{lessonItem.title}</p>
                          <p className="text-xs text-muted-foreground">{lessonItem.duration}</p>
                        </div>
                      </div>
                      <Icon 
                        name={getLessonTypeIcon(lessonItem.type)} 
                        size={16} 
                        className={getLessonTypeColor(lessonItem.type)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mr-4">
              <Icon name="BookOpen" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Training Module</h1>
              <p className="text-muted-foreground">Safety & waste handling tutorials</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">{completedModules.length}</p>
              <p className="text-sm text-muted-foreground">Completed Modules</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">{trainingModules.length}</p>
              <p className="text-sm text-muted-foreground">Total Modules</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">
                {Math.round((completedModules.length / trainingModules.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">2h 15m</p>
              <p className="text-sm text-muted-foreground">Total Duration</p>
            </div>
          </div>
        </div>

        {/* Training Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingModules.map((module) => (
            <div 
              key={module.id}
              className={`bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-shadow cursor-pointer ${
                completedModules.includes(module.id) ? 'ring-2 ring-success/20' : ''
              }`}
              onClick={() => startModule(module.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex items-center justify-center w-12 h-12 ${module.bgColor} rounded-lg`}>
                  <Icon name={module.icon} size={24} className={module.color} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
                    {completedModules.includes(module.id) && (
                      <Icon name="CheckCircle" size={20} className="text-success" />
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{module.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="BookOpen" size={14} />
                        <span>{module.lessons.length} lessons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{module.lessons.reduce((total, lesson) => {
                          const minutes = parseInt(lesson.duration);
                          return total + minutes;
                        }, 0)} min</span>
                      </div>
                    </div>
                    
                    <Button size="sm" variant={completedModules.includes(module.id) ? "outline" : "default"}>
                      {completedModules.includes(module.id) ? 'Review' : 'Start'}
                      <Icon name="ChevronRight" size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates Section */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedModules.map((moduleId) => {
              const module = trainingModules.find(m => m.id === moduleId);
              return (
                <div key={moduleId} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className={`flex items-center justify-center w-10 h-10 ${module.bgColor} rounded-lg`}>
                    <Icon name="Award" size={20} className={module.color} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{module.title} Certificate</h4>
                    <p className="text-sm text-muted-foreground">Completed successfully</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Icon name="Download" size={14} className="mr-2" />
                    Download
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TrainingPage;
