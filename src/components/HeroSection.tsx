"use client"

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code, Users, Zap } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      containerRef.current.style.setProperty('--mouse-x', x.toString());
      containerRef.current.style.setProperty('--mouse-y', y.toString());
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(
          circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), 
          rgba(var(--primary-rgb, 0, 122, 255), 0.06), 
          transparent 40%
        )`,
        '--primary-rgb': '0, 122, 255'
      } as React.CSSProperties}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-1/3 -right-12 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="container max-w-5xl mx-auto space-y-6 text-center z-10">
        <div className="inline-flex items-center px-3 py-1 space-x-2 bg-primary/10 rounded-full text-xs font-medium text-primary mb-4 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span>Realtime Collaborative Coding</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Code together, <span className="text-primary">instantly</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
          A powerful, real-time collaborative code editor with instant code execution. No setup, no downloads, just pure coding collaboration.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Button asChild className="rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all group">
            <Link href="/create">
              <span>Start Coding</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-8 h-12 border-primary/20">
            <a href="#features">
              <span>Learn More</span>
            </a>
          </Button>
        </div>
        
        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-1.5 bg-secondary/80 px-4 py-1.5 rounded-full text-sm">
            <Code size={14} className="text-primary" /> 
            <span>Multiple Languages</span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary/80 px-4 py-1.5 rounded-full text-sm">
            <Users size={14} className="text-primary" /> 
            <span>Unlimited Collaborators</span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary/80 px-4 py-1.5 rounded-full text-sm">
            <Zap size={14} className="text-primary" /> 
            <span>Live Code Execution</span>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;