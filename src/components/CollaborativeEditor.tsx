"use client";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { useCallback, useEffect, useState } from "react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import styles from "./CollaborativeEditor.module.css";
import { Avatars } from "@/components/Avatars";
import { Toolbar } from "@/components/Toolbar";
import "./splitView.css";

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor() {
  const [text, setText] = useState("");
  const room = useRoom();
  const [element, setElement] = useState<HTMLElement>();
  const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();
  const [output, setOutput] = useState({output:"",stderr:"",time:0});
  const [loading, setLoading] = useState<boolean>(false);
  const [leftWidth, setLeftWidth] = useState(400); // Initial width of the left pane
  const [isResizing, setIsResizing] = useState(false);
  const [language, setLanguage] = useState("javascript"); // Default language

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > 100 && newWidth < window.innerWidth - 100) {
        setLeftWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  async function handleSubmitCode(code: string, language: string) {
    try {
      setLoading(true);
      const apiUrl = "https://playground-backend-d9i0.onrender.com/api/v1/run";
      // console.log(code,language);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        throw new Error(`API Error: ${errorData.message || response.statusText}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data);
      setOutput(data);
    } catch (error) {
      console.error("Error sending code:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);
  // console.log(userInfo);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  // Set up Liveblocks Yjs provider and attach CodeMirror editor
  useEffect(() => {
    let provider: LiveblocksYjsProvider;
    let ydoc: Y.Doc;
    let view: EditorView;

    if (!element || !room || !userInfo) {
      return;
    }

    // Create Yjs provider and document
    ydoc = new Y.Doc();
    provider = new LiveblocksYjsProvider(room as any, ydoc);
    const ytext = ydoc.getText("codemirror");
    const undoManager = new Y.UndoManager(ytext);
    setYUndoManager(undoManager);

    // Attach user info to Yjs
    provider.awareness.setLocalStateField("user", {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + "80", // 6-digit hex code at 50% opacity
    });

    // Set up CodeMirror and extensions
    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        javascript(),
        python(),
        yCollab(ytext, provider.awareness, { undoManager }),
      ],
    });
    const handleDocChange = () => {
      const currentText = ytext.toString();
      setText(currentText); // Update state
    };

    ytext.observe(handleDocChange);
    // Attach CodeMirror to element
    view = new EditorView({
      state,
      parent: element,
    });

    return () => {
      ydoc?.destroy();
      provider?.destroy();
      view?.destroy();
      ytext.unobserve(handleDocChange);
    };
  }, [element, room, userInfo]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.editorHeader}>
          <div>
            {yUndoManager ? <Toolbar yUndoManager={yUndoManager} /> : null}
          </div>

          {/* Language Selector */}
          <select
            title="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border-2 p-2 border-purple-400 bg-purple-400 text-white font-semibold rounded-lg hover:bg-white hover:text-purple-400 mr-2"
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="js">JavaScript</option>
            <option value="go">Go</option>
            <option value="py">Python</option>
            {/* <option value="java">Java</option>
            <option value="rust">Rust</option> */}
          </select>

          {/* Run Code Button */}
          <button
            className="border-2 p-2 border-purple-400 bg-purple-400 text-white font-semibold rounded-lg hover:bg-white hover:text-purple-400"
            onClick={async () => {
              try {
                await handleSubmitCode(text, language); // Pass the selected language
              } catch (error) {
                console.error("Error submitting code:", error);
              }
            }}
          >
            {loading ? "Loading..." : "Run Code"}
          </button>
          <Avatars />
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row justify-center">
          <div className={styles.editorContainer} style={{ width: leftWidth }} ref={ref}></div>
          <div className="resizer hover:bg-blue-500 hover:text-blue-500 flex items-center justify-center text-xl font-bold text-gray-500 rounded-lg h-[85vh]" onMouseDown={handleMouseDown}>|</div>
          <div className="bg-gray-900 w-1/2 rounded-lg h-[100vh] text-white p-4">:/sh
          {output.output ? <div>{output.output}</div> : <div>{output.stderr}</div>}
          <div className="text-center">{"----------"+output.time +"ms----------"}</div></div>
          
        </div>
      </div>
    </>
  );
}