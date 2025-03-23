"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { Code, Copy, ArrowRight, Check } from "lucide-react";

const CreateRoomCard = () => {
  const router = useRouter();
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createRoom = () => {
    setIsLoading(true);
    // Create UUID for room
    const roomId = crypto.randomUUID();
    const url = `${window.location.origin}/room/${roomId}`;
    
    // Simulate API call
    setTimeout(() => {
      setRoomUrl(url);
      setIsLoading(false);
      toast({
        title: "Room created!",
        description: "Share the link with your collaborators to start coding together.",
      });
    }, 800);
  };

  const copyToClipboard = () => {
    if (!roomUrl) return;
    
    navigator.clipboard.writeText(roomUrl)
      .then(() => {
        setHasCopied(true);
        toast({
          title: "Link copied!",
          description: "Room link has been copied to clipboard.",
        });
        
        setTimeout(() => setHasCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please try copying manually.",
          variant: "destructive",
        });
      });
  };

  const joinRoom = () => {
    if (!roomUrl) return;
    
    // Extract room ID from URL
    const roomId = roomUrl.split('/').pop();
    router.push(`/room/${roomId}`);
  };

  return (
    <Card className="w-full max-w-md glass border border-primary/10 shadow-xl transition-all duration-500 hover:shadow-primary/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Code className="text-primary" size={24} />
          Create a Room
        </CardTitle>
        <CardDescription>
          Start a collaborative coding session and invite your team
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {roomUrl ? (
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground mb-1">Room URL:</p>
            <div className="flex items-center space-x-2 bg-secondary/50 p-3 rounded-lg break-all text-sm">
              <code className="flex-1 font-mono truncate">{roomUrl}</code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-primary/10"
                      onClick={copyToClipboard}
                    >
                      {hasCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{hasCopied ? 'Copied!' : 'Copy URL'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-soft">
              <Code className="text-primary" size={32} />
            </div>
            <p className="text-sm text-center text-muted-foreground max-w-xs">
              Create a new room to get a shareable link and start coding together in real-time
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        {roomUrl ? (
          <>
            <Button 
              variant="outline" 
              className="w-full sm:flex-1 rounded-full border-primary/20"
              onClick={() => setRoomUrl(null)}
            >
              Create New Room
            </Button>
            <Button 
              className="w-full sm:flex-1 rounded-full gap-1 group shadow-md"
              onClick={joinRoom}
            >
              <span>Join Room</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </>
        ) : (
          <Button 
            className="w-full rounded-full gap-1 shadow-md hover:shadow-lg"
            onClick={createRoom}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Room"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateRoomCard;