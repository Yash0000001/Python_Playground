import React from "react";
import { Room } from "@/app/Room";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";

const page = () => {
  return (
    <main>
      <Room>
        <CollaborativeEditor />
      </Room>
    </main>
  );
};

export default page;
