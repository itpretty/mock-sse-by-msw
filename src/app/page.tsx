
"use client";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import React, { useEffect, useRef, useState } from 'react';

const Home = () => {
  const hasInitialized = useRef(false);
  const [summaryText, setSummaryText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  
  const summaryTexts = {
    'AI Technology': 'Artificial Intelligence represents one of the most transformative technologies of our time. From machine learning algorithms that can process vast amounts of data to natural language processing systems that understand human communication, AI is reshaping industries and creating new possibilities. Modern AI systems can perform complex tasks such as image recognition, language translation, and predictive analytics with remarkable accuracy. As we continue to advance in this field, AI promises to enhance human capabilities and solve some of our most challenging problems.',
    'Web Development': 'Modern web development has evolved dramatically with the introduction of powerful frameworks and tools. React, Next.js, and TypeScript have revolutionized how we build user interfaces, providing developers with robust solutions for creating scalable and maintainable applications. Server-side rendering, static site generation, and edge computing are pushing the boundaries of web performance. The integration of AI and machine learning into web applications is opening new frontiers for intelligent user experiences.',
    'Data Science': 'Data Science combines statistical analysis, machine learning, and domain expertise to extract meaningful insights from complex datasets. In today\'s data-driven world, organizations rely on data scientists to identify patterns, predict trends, and make informed decisions. From recommendation systems that personalize user experiences to predictive models that forecast market behavior, data science is at the heart of digital transformation across industries.',
    'Technology Trends': 'The technology landscape is constantly evolving with emerging trends that shape our digital future. Cloud computing has revolutionized how we deploy and scale applications, while edge computing brings processing closer to data sources. Quantum computing promises to solve complex problems that are intractable for classical computers. Meanwhile, sustainable technology and green computing are becoming increasingly important as we address environmental challenges through innovation.',
    'GitHub Markdown': '# GitHub Markdown Guide\n\n## Headers\n\n### This is a level 3 header\n\n**Bold text** and *italic text* for emphasis.\n\n## Code Examples\n\n```javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```\n\n## Lists\n\n- Unordered list item 1\n- Unordered list item 2\n  - Nested item\n\n1. Ordered list item 1\n2. Ordered list item 2\n\n## Links and Images\n\n[GitHub](https://github.com)\n\n![Alt text](https://via.placeholder.com/150)\n\n## Tables\n\n| Feature | Status |\n|---------|--------|\n| Syntax highlighting | ✅ |\n| Task lists | ✅ |\n| Emoji support | 🎉 |\n\n## Blockquotes\n\n> This is a blockquote\n> with multiple lines\n\n## Task Lists\n\n- [x] Completed task\n- [ ] Pending task\n- [ ] Another pending task'
  };
  
  const typeText = (text: string) => {
    setIsTyping(true);
    setSummaryText('');
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setSummaryText(prev => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30); // Adjust speed here (lower = faster)
  };
  
  const handleSummaryClick = (topic: string) => {
    setSelectedTopic(topic);
    const text = summaryTexts[topic as keyof typeof summaryTexts];
    typeText(text);
  };
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
      {/* AI Summary Block */}
      <div className="w-full max-w-4xl mx-auto mb-16 rounded-xl bg-white p-6 shadow-lg border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Summary Generator</h2>
          <p className="text-gray-600">Click a button to generate an AI summary on different topics</p>
        </div>
        
        {/* 5 Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {Object.keys(summaryTexts).map((topic) => (
            <button
              key={topic}
              onClick={() => handleSummaryClick(topic)}
              disabled={isTyping}
              className={`
                inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                border border-gray-300 hover:border-gray-400 hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  selectedTopic === topic
                    ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800 shadow-md'
                    : 'bg-white text-gray-700'
                }
              `}
            >
              {topic}
            </button>
          ))}
        </div>
        
        {/* Result Display with Typing Effect */}
        <div className="border border-gray-300 rounded-xl p-4 min-h-[200px] bg-gray-50">
          {selectedTopic ? (
            <div>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900">{selectedTopic} Summary</h3>
                {isTyping && (
                  <div className="ml-auto flex items-center text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse mr-1"></div>
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse mr-1" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                )}
              </div>
              <div className="text-gray-800 leading-relaxed text-sm">
                {summaryText}
                {isTyping && (
                  <span className="inline-block w-0.5 h-4 bg-gray-900 ml-1 animate-pulse"></span>
                )}
              </div>
              {!isTyping && summaryText && (
                <div className="mt-4 text-xs text-gray-500 border-t border-gray-300 pt-3">
                  ✨ Generated by AI • {summaryText.length} characters • {Math.ceil(summaryText.length / 5)} words
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                <span className="text-xl">🤖</span>
              </div>
              <p className="text-center text-sm">Select a topic above to generate an AI summary</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
};

export default Home;