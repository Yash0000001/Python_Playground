import { Code, Users, Zap, Globe, Lock, Clock, Cpu, RefreshCcw } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <div 
    className="glass p-6 rounded-2xl border border-primary/10 transition-all duration-300 hover:shadow-md animate-fade-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Code className="text-primary" size={24} />,
      title: "Collaborative Editing",
      description: "Real-time synchronized editing with multiple collaborators simultaneously.",
      delay: 100
    },
    {
      icon: <Zap className="text-primary" size={24} />,
      title: "Instant Execution",
      description: "Run your code with a single click and see results immediately.",
      delay: 200
    },
    {
      icon: <Users className="text-primary" size={24} />,
      title: "Team Collaboration",
      description: "Share your room with an unlimited number of team members.",
      delay: 300
    },
    {
      icon: <Globe className="text-primary" size={24} />,
      title: "Multiple Languages",
      description: "Support for all major programming languages and frameworks.",
      delay: 400
    },
    {
      icon: <Lock className="text-primary" size={24} />,
      title: "Secure Connection",
      description: "End-to-end encryption ensures your code stays private and secure.",
      delay: 500
    },
    {
      icon: <Clock className="text-primary" size={24} />,
      title: "Persistent Sessions",
      description: "Your work is automatically saved and persisted between sessions.",
      delay: 600
    },
    {
      icon: <Cpu className="text-primary" size={24} />,
      title: "Powerful Backend",
      description: "Golang-powered execution engine for fast and reliable processing.",
      delay: 700
    },
    {
      icon: <RefreshCcw className="text-primary" size={24} />,
      title: "Auto Syncing",
      description: "Changes are instantly synced across all connected clients.",
      delay: 800
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">Powerful Features</h2>
          <p className="text-muted-foreground text-lg animate-fade-up" style={{ animationDelay: '100ms' }}>
            Everything you need for seamless collaborative coding and execution
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;