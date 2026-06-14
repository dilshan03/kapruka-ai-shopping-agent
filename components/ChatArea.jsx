"use client";

import { useState } from "react";
import Header from "./Header";
import ChatMessage from "./ChatMessage";
import ProductCarousel from "./ProductCarousel";
import SuggestedPrompts from "./SuggestedPrompts";
import Sidebar from "./Sidebar";
import LoadingState from "./LoadingState";
import CheckoutModal from "./CheckoutModal";

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

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    date: "Not selected",
    fee: "Free",
    status: "Pending"
  });

  const [giftMessage, setGiftMessage] = useState("");

  const updateContextFromMessage = (message) => {
    // Basic optimistic update, real context comes from backend
    setContext(prev => ({
      ...prev,
      stage: "Product Selection"
    }));
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

      if (data.extractedContext) {
        setContext(data.extractedContext);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "I encountered an issue while searching.",
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
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  return (
    <div className="h-screen bg-[#FBFAF8] flex overflow-hidden">
      <main className="flex-1 flex flex-col h-full">
        <Header cartCount={cart.length} onCartClick={() => setIsCheckoutOpen(true)} />

        <section className="flex-1 overflow-y-auto px-4 md:px-10 py-6">
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

        <div className="px-4 md:px-10 pb-6 shrink-0 bg-gradient-to-t from-[#FBFAF8] pt-4">
          <div className="max-w-5xl mx-auto">
            <SuggestedPrompts onPromptClick={sendMessage} />

            <div className="mt-4 bg-white rounded-3xl shadow-lg border border-red-100 flex items-center px-4 py-3 md:px-5 md:py-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Who are you shopping for today?"
                className="flex-1 outline-none text-sm bg-transparent text-gray-900 placeholder-gray-400"
              />

              <button
                onClick={() => sendMessage()}
                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#C91508] text-white text-xl shadow-lg hover:bg-[#A81207] transition ml-2 flex items-center justify-center"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </main>

      <Sidebar 
        cart={cart} 
        context={context} 
        deliveryDetails={deliveryDetails}
        setDeliveryDetails={setDeliveryDetails}
        giftMessage={giftMessage}
        setGiftMessage={setGiftMessage}
        onCheckout={() => setIsCheckoutOpen(true)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        deliveryDetails={deliveryDetails}
        context={context}
        giftMessage={giftMessage}
      />
    </div>
  );
}