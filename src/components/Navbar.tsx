import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Trophy, Users } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-hero rounded-lg transition-transform group-hover:scale-105">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CodeCollab</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/browse" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
              <Users className="h-4 w-4" />
              Find Partners
            </Link>
            <Link to="/dashboard" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button size="sm" className="bg-gradient-hero hover:opacity-90">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
