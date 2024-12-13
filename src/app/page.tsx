"use client";
import { useEffect, useState } from "react";

const createRandomNumber = () => {
  var min = 100000;
  var max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function Home() {
  const [number, setNumber] = useState<Number>();
  const [url, setUrl] = useState<String>();

  const createRoom = () => {
    const currentUrl = window.location.href;
    setNumber(createRandomNumber());
    setUrl(currentUrl + "/room/" + number);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url as string);
      alert("URL copied to clipboard");
    } catch (error) {
      alert("Error copying to clipboard");
    }
  };

  useEffect(() => {
    setNumber(createRandomNumber());
  });
  return (
    <main>
      <div>
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl">
          <div className="text-5xl text-purple-400 mb-7">
            Create your own Room
          </div>
          <button
            type="button"
            onClick={() => createRoom()}
            className="px-2 py-1 text-2xl rounded-lg bg-purple-400 text-white mb-7"
          >
            Create
          </button>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              title="room_input"
              value={url as string}
              placeholder="Click on create button...."
              className="w-full text-2xl text-gray-400 rounded-lg border-purple-200 border-2 p-2"
            ></input>
            <button onClick={() => copyToClipboard()} className="border-2 border-purple-400 p-2 text-purple-400 hover:bg-purple-400 hover:text-white rounded-lg">Copy</button>
          </div>
        </div>
      </div>
    </main>
  );
}
