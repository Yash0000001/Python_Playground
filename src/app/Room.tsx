import { ReactNode, useMemo } from "react";
import { RoomProvider } from "@liveblocks/react/suspense";
import { useSearchParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "@/components/Loading";
import { useRoom } from "@liveblocks/react";

function getCode() {
  const room = useRoom();
  const yText = room.getStorage(); // Assuming "code" is your key
  const currentCode = yText.toString();
  console.log(currentCode + "hello");
  return currentCode;
}

export function Room({ id, children }: { id: string; children: ReactNode }) {
  const roomId = useExampleRoomId(
    `liveblocks:examples:nextjs-yjs-codemirror/${id}`
  );

  return (
    <RoomProvider
      key={id}
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>{children}</ClientSideSuspense>
    </RoomProvider>
  );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useExampleRoomId(roomId: string) {
  const params = useSearchParams();
  const exampleId = params?.get("exampleId");

  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId;
  }, [roomId, exampleId]);

  return exampleRoomId;
}
