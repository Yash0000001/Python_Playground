"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GithubIcon, Menu, X } from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        {
          "bg-transparent": transparent && !isScrolled,
          "glass shadow-sm": isScrolled || !transparent || isMobileMenuOpen,
        }
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold flex items-center space-x-2 transition-all hover:opacity-80"
        >
          <span className="text-primary">Code</span>
          <span>Collab</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="/documentation" className="text-sm font-medium hover:text-primary transition-colors">
            Documentation
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-primary transition-colors flex items-center space-x-1"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
          <Button asChild size="sm" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">
            <Link href="/create">Get Started</Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground p-2 rounded-full hover:bg-secondary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-md">
          <nav className="flex flex-col space-y-4 p-6 animate-fade-in">
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/#features" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/documentation" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center space-x-1"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
            <Button 
              asChild 
              size="sm" 
              className="rounded-full px-6 w-full shadow-md hover:shadow-lg transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/create">Get Started</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;