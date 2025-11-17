import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Users, Trophy, Target, MapPin, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Connect. Collaborate. Level Up.</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-hero bg-clip-text text-transparent">Study Partner</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with developers and learners who share your tech stack and goals. 
              Build together, earn rewards, and level up your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse">
                <Button size="lg" className="bg-gradient-hero hover:opacity-90 text-lg px-8">
                  Find Partners Now
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Collaborate
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a seasoned developer or just starting your coding journey, 
              CodeCollab helps you find the right partner.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-card shadow-card hover:shadow-hover transition-all duration-300 border-border/50 animate-fade-in">
              <CardContent className="pt-6">
                <div className="p-3 bg-gradient-hero rounded-lg w-fit mb-4">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Smart Matching</h3>
                <p className="text-muted-foreground">
                  Find partners based on tech stack, learning goals, project types, and experience level.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card hover:shadow-hover transition-all duration-300 border-border/50 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardContent className="pt-6">
                <div className="p-3 bg-accent/20 rounded-lg w-fit mb-4">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Rewards System</h3>
                <p className="text-muted-foreground">
                  Earn points for collaborations, maintain streaks, and level up from Explorer to Elite.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card hover:shadow-hover transition-all duration-300 border-border/50 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardContent className="pt-6">
                <div className="p-3 bg-emerald-500/20 rounded-lg w-fit mb-4">
                  <MapPin className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Local & Remote</h3>
                <p className="text-muted-foreground">
                  Filter by city to find partners nearby for in-person collabs or connect globally.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and find your coding companion
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Create Profile</h3>
              <p className="text-muted-foreground">
                Add your skills, goals, and what you're looking to build
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Find Partners</h3>
              <p className="text-muted-foreground">
                Browse and filter to find the perfect match for your project
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Start Building</h3>
              <p className="text-muted-foreground">
                Collaborate, earn points, and level up together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ 
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }} />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <Code2 className="h-16 w-16 text-primary-foreground mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and learners building amazing projects together
          </p>
          <Link to="/browse">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
