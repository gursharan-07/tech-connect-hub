import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Code, Target, Briefcase, Star, TrendingUp } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Developer",
    level: "Pro",
    points: 2450,
    location: "San Francisco",
    skills: ["React", "TypeScript", "Node.js"],
    goals: ["Build SaaS", "Open Source"],
    activeCollabs: 3,
    completedProjects: 12,
  },
  {
    id: 2,
    name: "Alex Kumar",
    role: "Learner",
    level: "Rising",
    points: 850,
    location: "New York",
    skills: ["JavaScript", "Python", "Django"],
    goals: ["Web Development", "API Design"],
    activeCollabs: 1,
    completedProjects: 4,
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Developer",
    level: "Elite",
    points: 5200,
    location: "Austin",
    skills: ["Vue.js", "GraphQL", "PostgreSQL"],
    goals: ["Mentorship", "Microservices"],
    activeCollabs: 5,
    completedProjects: 28,
  },
  {
    id: 4,
    name: "Jordan Lee",
    role: "Learner",
    level: "Explorer",
    points: 320,
    location: "Seattle",
    skills: ["HTML", "CSS", "JavaScript"],
    goals: ["Frontend Development", "UI/UX"],
    activeCollabs: 1,
    completedProjects: 1,
  },
];

const Browse = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Elite": return "bg-gradient-to-r from-amber-500 to-orange-500";
      case "Pro": return "bg-gradient-to-r from-primary to-blue-500";
      case "Rising": return "bg-gradient-to-r from-emerald-500 to-teal-500";
      default: return "bg-gradient-to-r from-slate-400 to-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Your Perfect Study Partner</h1>
          <p className="text-muted-foreground">Connect with developers and learners who share your goals</p>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6 animate-slide-in">
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-10" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Role</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All roles</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="learner">Learner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Tech Stack</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tech" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue.js</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="node">Node.js</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter city..." className="pl-10" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Learning Goals</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile Apps</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* User Cards Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">{mockUsers.length} partners found</p>
              <Select defaultValue="relevant">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="points">Highest Points</SelectItem>
                  <SelectItem value="active">Most Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockUsers.map((user, index) => (
                <Card 
                  key={user.id} 
                  className="bg-card shadow-card hover:shadow-hover transition-all duration-300 border-border/50 animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{user.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">{user.role}</Badge>
                            <div className={`px-2 py-0.5 rounded text-xs font-medium text-white ${getLevelColor(user.level)}`}>
                              {user.level}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{user.points}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                          <Code className="h-4 w-4" />
                          <span>Skills</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill) => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                          <Target className="h-4 w-4" />
                          <span>Goals</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {user.goals.map((goal) => (
                            <Badge key={goal} className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20">{goal}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{user.activeCollabs} active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{user.completedProjects} completed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 pb-6">
                    <Button className="w-full bg-gradient-hero hover:opacity-90">
                      Request Collaboration
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Browse;
