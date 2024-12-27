"use client"
import React from "react";
import { Room } from "@/app/Room";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { useParams } from "next/navigation";

const page = () => {
  const {id} = useParams();

  // console.log(id);
  return (
    <main>
      <Room id={id as string}>
        <CollaborativeEditor />
      </Room>
    </main>
  );
};

export default page;
