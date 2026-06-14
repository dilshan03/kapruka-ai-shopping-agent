"use client";

import { useState } from "react";
import Header from "./Header";
import ChatMessage from "./ChatMessage";
import ProductCarousel from "./ProductCarousel";
import SuggestedPrompts from "./SuggestedPrompts";
import Sidebar from "./Sidebar";
import LoadingState from "./LoadingState";

export default function ChatArea() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your Kapruka AI shopping assistant. Tell me who you're shopping for, the occasion, budget, and delivery city. I'll curate the perfect selection for you.",
    },
  ]);

  const [input, setInput] = useState("");
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [context, setContext] = useState({
    recipient: "Not identified",
    occasion: "Not identified",
    budget: "Not identified",
    city: "Not identified",
    stage: "Recipient Identified",
  });

  const updateContextFromMessage = (message) => {
    const lower = message.toLowerCase();

    setContext({
      recipient: lower.includes("mother") || lower.includes("mom")
        ? "Mother"
        : lower.includes("wife")
          ? "Wife"
          : lower.includes("friend")
            ? "Friend"
            : "Not identified",

      occasion: lower.includes("birthday")
        ? "Birthday"
        : lower.includes("anniversary")
          ? "Anniversary"
          : lower.includes("wedding")
            ? "Wedding"
            : "Gift",

      budget: message.match(/\d+/)
        ? `Rs. ${message.match(/\d+/)[0]}`
        : "Not identified",

      city: lower.includes("colombo")
        ? "Colombo"
        : lower.includes("kandy")
          ? "Kandy"
          : lower.includes("galle")
            ? "Galle"
            : "Not identified",

      stage: "Product Selection",
    });
  };

  const sendMessage = async (customMessage) => {
    const userMessage = customMessage || input;
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    updateContextFromMessage(userMessage);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Wonderful! I found some premium options that match your request.",
          products: data.products || [],
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't search products right now.",
          products: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="h-screen bg-[#FBFAF8] flex overflow-hidden">
      <main className="flex-1 flex flex-col">
        <Header cartCount={cart.length} />

        <section className="flex-1 overflow-y-auto px-10 py-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {isLoading && <LoadingState />}

            {messages.map((message, index) => (
              <div key={index}>
                <ChatMessage role={message.role} content={message.content} />

                {message.products?.length > 0 && (
                  <ProductCarousel
                    products={message.products}
                    onAddToCart={addToCart}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="px-10 pb-6">
          <div className="max-w-5xl mx-auto">
            <SuggestedPrompts onPromptClick={sendMessage} />

            <div className="mt-4 bg-white rounded-3xl shadow-lg border border-red-100 flex items-center px-5 py-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Who are you shopping for today?"
                className="flex-1 outline-none text-sm bg-transparent"
              />

              <button
                onClick={() => sendMessage()}
                className="w-12 h-12 rounded-2xl bg-[#C91508] text-white text-xl shadow-lg hover:bg-[#A81207] transition"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </main>

      <Sidebar cart={cart} context={context} />
    </div>
  );
}