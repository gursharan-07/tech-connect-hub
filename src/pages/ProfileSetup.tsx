import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const profileSchema = z.object({
  displayName: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  location: z.string().trim().max(100).optional(),
  bio: z.string().trim().max(500).optional(),
  userRole: z.enum(['developer', 'learner']),
  techStacks: z.array(z.string()).min(1, { message: 'Select at least one tech stack' }),
  learningGoals: z.array(z.string()).min(1, { message: 'Add at least one learning goal' }),
  projectInterests: z.array(z.string()).min(1, { message: 'Add at least one project interest' })
});

export default function ProfileSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [availableTechStacks, setAvailableTechStacks] = useState<Array<{ id: string; name: string }>>([]);
  
  const [formData, setFormData] = useState({
    displayName: '',
    location: '',
    bio: '',
    userRole: 'learner' as 'developer' | 'learner',
    selectedTechStacks: [] as string[],
    learningGoalInput: '',
    learningGoals: [] as string[],
    projectInterestInput: '',
    projectInterests: [] as string[]
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check if profile already exists
    const checkProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', user.id)
        .single();
      
      if (data?.user_role) {
        navigate('/dashboard');
      }
    };

    // Fetch available tech stacks
    const fetchTechStacks = async () => {
      const { data } = await supabase
        .from('tech_stacks')
        .select('id, name')
        .order('name');
      
      if (data) {
        setAvailableTechStacks(data);
      }
    };

    checkProfile();
    fetchTechStacks();
  }, [user, navigate]);

  const addItem = (field: 'learningGoals' | 'projectInterests') => {
    const inputField = field === 'learningGoals' ? 'learningGoalInput' : 'projectInterestInput';
    const value = formData[inputField].trim();
    
    if (value && value.length <= 200) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value],
        [inputField]: ''
      }));
    }
  };

  const removeItem = (field: 'learningGoals' | 'projectInterests', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const toggleTechStack = (stackId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTechStacks: prev.selectedTechStacks.includes(stackId)
        ? prev.selectedTechStacks.filter(id => id !== stackId)
        : [...prev.selectedTechStacks, stackId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      profileSchema.parse({
        displayName: formData.displayName,
        location: formData.location,
        bio: formData.bio,
        userRole: formData.userRole,
        techStacks: formData.selectedTechStacks,
        learningGoals: formData.learningGoals,
        projectInterests: formData.projectInterests
      });

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          display_name: formData.displayName,
          location: formData.location || null,
          bio: formData.bio || null,
          user_role: formData.userRole
        })
        .eq('id', user!.id);

      if (profileError) throw profileError;

      // Add tech stacks
      const techStackInserts = formData.selectedTechStacks.map(stackId => ({
        user_id: user!.id,
        tech_stack_id: stackId
      }));
      
      const { error: techError } = await supabase
        .from('user_tech_stacks')
        .insert(techStackInserts);

      if (techError) throw techError;

      // Add learning goals
      const goalInserts = formData.learningGoals.map(goal => ({
        user_id: user!.id,
        goal
      }));
      
      const { error: goalError } = await supabase
        .from('learning_goals')
        .insert(goalInserts);

      if (goalError) throw goalError;

      // Add project interests
      const interestInserts = formData.projectInterests.map(interest => ({
        user_id: user!.id,
        interest
      }));
      
      const { error: interestError } = await supabase
        .from('project_interests')
        .insert(interestInserts);

      if (interestError) throw interestError;

      toast({
        title: 'Profile created!',
        description: 'Welcome to CodeCollab. Let\'s find your study partners!'
      });

      navigate('/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0].message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create profile. Please try again.',
          variant: 'destructive'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>Tell us about yourself to find the perfect study partners</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name *</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder="Your name"
                required
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label>I am a *</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={formData.userRole === 'learner' ? 'default' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, userRole: 'learner' }))}
                >
                  Learner
                </Button>
                <Button
                  type="button"
                  variant={formData.userRole === 'developer' ? 'default' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, userRole: 'developer' }))}
                >
                  Developer
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, Country"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
                maxLength={500}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Tech Stack *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md">
                {availableTechStacks.map(stack => (
                  <Button
                    key={stack.id}
                    type="button"
                    variant={formData.selectedTechStacks.includes(stack.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleTechStack(stack.id)}
                    className="justify-start"
                  >
                    {stack.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Learning Goals *</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.learningGoalInput}
                  onChange={(e) => setFormData(prev => ({ ...prev, learningGoalInput: e.target.value }))}
                  placeholder="e.g., Master React Hooks"
                  maxLength={200}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('learningGoals'))}
                />
                <Button type="button" onClick={() => addItem('learningGoals')}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.learningGoals.map((goal, index) => (
                  <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="text-sm">{goal}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('learningGoals', index)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Project Interests *</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.projectInterestInput}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectInterestInput: e.target.value }))}
                  placeholder="e.g., Build a mobile app"
                  maxLength={200}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('projectInterests'))}
                />
                <Button type="button" onClick={() => addItem('projectInterests')}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.projectInterests.map((interest, index) => (
                  <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="text-sm">{interest}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('projectInterests', index)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Profile...' : 'Complete Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}