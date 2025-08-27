
"use client";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import React, { useEffect, useRef } from 'react';

const Home = () => {
  const hasInitialized = useRef(false);
  useEffect(() => {
      // Prevent multiple connections in React Strict Mode
      if (hasInitialized.current) {
        console.log("SSE already initialized, skipping");
        return;
      }
      
      hasInitialized.current = true;
      const controller = new AbortController();
      const { signal } = controller;
      
      const getStream = async () => {
        try {
          console.log("SSE starts");
          await fetchEventSource('/api/sse', {
            signal,
            async onopen(response) {
              if (response.ok) {
                console.log("SSE connected");
                return;
              } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                // client-side errors are usually non-retriable
                throw new Error("SSE FatalError");
              } else {
                throw new Error("SSE RetriableError");
              }
            },
            onmessage(ev) {
              const data = JSON.parse(ev.data);
              console.log("SSE data: ", data);
              if (data.event === "error") {
                controller.abort();
                console.log("SSE error");
              }
              if (data.event === "done") {
                console.log("SSE done");
              }
              if (["done", "error"].includes(data.event)) {
                console.log("SSE closed");
                return;
              }
              // setMessages(prev => [...prev,data])
            },
            onerror(err) {
              console.log("SSE error: ", err);
            }
          });
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.log("SSE connection error: ", error);
          }
        }
      };
      
      getStream();
      
      // Cleanup function to abort the connection when component unmounts
      return () => {
        console.log("Cleaning up SSE connection");
        controller.abort();
        hasInitialized.current = false;
      };
    }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Mock SSE by MSW
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-4xl font-bold">
          Server-Sent Events Mock
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Mock SSE Stream{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Create and test Server-Sent Events streams using Mock Service Worker for development.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Real-time Testing{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Test real-time functionality without requiring a backend server connection.
          </p>
        </div>
      </div>
    </main>
  )
};

export default Home;