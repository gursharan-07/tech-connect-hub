import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, Flame, Target, Users, CheckCircle, Clock } from "lucide-react";

const Dashboard = () => {
  const userStats = {
    name: "Alex",
    level: "Rising",
    points: 850,
    nextLevelPoints: 1500,
    streak: 7,
    activeCollabs: 2,
    completedProjects: 4,
  };

  const recentActivity = [
    { type: "collab_started", partner: "Sarah Chen", project: "E-commerce API", points: 50, time: "2 hours ago" },
    { type: "project_completed", partner: "Jordan Lee", project: "Portfolio Site", points: 200, time: "1 day ago" },
    { type: "daily_streak", points: 10, time: "Today" },
  ];

  const activeCollaborations = [
    { id: 1, partner: "Sarah Chen", project: "E-commerce API", progress: 35, dueDate: "5 days" },
    { id: 2, partner: "Maria Garcia", project: "Chat Application", progress: 60, dueDate: "3 days" },
  ];

  const progressToNextLevel = (userStats.points / userStats.nextLevelPoints) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {userStats.name}! 👋</h1>
          <p className="text-muted-foreground">Track your progress and manage your collaborations</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card className="bg-gradient-card shadow-card border-border/50 animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Points</p>
                  <p className="text-3xl font-bold text-foreground">{userStats.points}</p>
                </div>
                <div className="p-3 bg-gradient-hero rounded-lg">
                  <Star className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-muted-foreground">Level: {userStats.level}</span>
                  <span className="text-muted-foreground">{userStats.nextLevelPoints - userStats.points} to Pro</span>
                </div>
                <Progress value={progressToNextLevel} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Daily Streak</p>
                  <p className="text-3xl font-bold text-foreground">{userStats.streak} days</p>
                </div>
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Flame className="h-6 w-6 text-accent" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">Keep it up! +10 points daily</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Projects</p>
                  <p className="text-3xl font-bold text-foreground">{userStats.completedProjects}</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Trophy className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{userStats.activeCollabs} active collaborations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Collaborations */}
          <Card className="bg-card shadow-card border-border/50 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Collaborations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCollaborations.map((collab) => (
                <div key={collab.id} className="p-4 bg-gradient-card rounded-lg border border-border/50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{collab.project}</h4>
                      <p className="text-sm text-muted-foreground">with {collab.partner}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {collab.dueDate}
                    </Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{collab.progress}%</span>
                    </div>
                    <Progress value={collab.progress} className="h-2" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">View Details</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card shadow-card border-border/50 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gradient-card rounded-lg border border-border/50">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'project_completed' ? 'bg-emerald-500/20' :
                    activity.type === 'collab_started' ? 'bg-primary/20' : 'bg-accent/20'
                  }`}>
                    {activity.type === 'project_completed' ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : activity.type === 'collab_started' ? (
                      <Users className="h-4 w-4 text-primary" />
                    ) : (
                      <Flame className="h-4 w-4 text-accent" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.type === 'project_completed' && `Completed "${activity.project}"`}
                      {activity.type === 'collab_started' && `Started collaboration: "${activity.project}"`}
                      {activity.type === 'daily_streak' && 'Daily streak maintained!'}
                    </p>
                    {activity.partner && (
                      <p className="text-xs text-muted-foreground mt-0.5">with {activity.partner}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      <Badge className="bg-accent/10 text-accent hover:bg-accent/20">+{activity.points} pts</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Rewards Info */}
        <Card className="mt-6 bg-gradient-hero text-primary-foreground shadow-hover animate-fade-in" style={{ animationDelay: "500ms" }}>
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Earning Points & Leveling Up</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Start Collab</p>
                    <p className="opacity-90">+50 points</p>
                  </div>
                  <div>
                    <p className="font-semibold">Complete Project</p>
                    <p className="opacity-90">+200 points</p>
                  </div>
                  <div>
                    <p className="font-semibold">Daily Streak</p>
                    <p className="opacity-90">+10 points/day</p>
                  </div>
                  <div>
                    <p className="font-semibold">Level Up</p>
                    <p className="opacity-90">Unlock perks!</p>
                  </div>
                </div>
              </div>
              <Trophy className="h-16 w-16 opacity-80 hidden md:block" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
