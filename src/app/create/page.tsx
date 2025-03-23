"use client"

import Navbar from "@/components/Navbar";
import CreateRoomCard from "@/components/CreateRoomCard";

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Create a Collaborative Room</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start a new collaborative coding session and invite your team members to join. 
              No registration required - just create and share.
            </p>
          </div>
          
          <div className="flex justify-center">
            <CreateRoomCard />
          </div>
        </div>
      </main>
    </div>
  );
}