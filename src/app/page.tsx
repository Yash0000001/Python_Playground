import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import CreateRoomCard from "@/components/CreateRoomCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Github, Twitter, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Navbar transparent />
      
      <main className="flex-1">
        <HeroSection />
        
        <Features />
        
        {/* Create Room Section */}
        <section id="create" className="py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight animate-fade-up">Start Coding Together in Seconds</h2>
                <p className="text-muted-foreground text-lg animate-fade-up" style={{ animationDelay: '100ms' }}>
                  Create a room, share the link, and start coding collaboratively with your team, instantly. No accounts, no setup, just pure coding.
                </p>
                <ul className="space-y-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
                  {[
                    "One-click room creation",
                    "Shareable links for instant collaboration",
                    "Persistent rooms for ongoing projects",
                    "No registration required"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center animate-fade-up" style={{ animationDelay: '300ms' }}>
                <CreateRoomCard />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto max-w-4xl text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up">Ready to transform your coding workflow?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
              Join thousands of developers who are already using our platform to code collaboratively and build amazing applications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all group">
                <Link href="/create">
                  <span>Start Coding Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  <span>View on GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary/50 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-xl font-bold flex items-center space-x-2">
                <span className="text-primary">Code</span>
                <span>Collab</span>
              </Link>
              <p className="text-muted-foreground mt-2 max-w-md">
                A powerful, real-time collaborative code editor with instant code execution.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} CodeCollab. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}