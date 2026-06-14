# Kapruka AI Shopping Agent

A premium, conversational AI shopping concierge built for the Kapruka Agent Challenge. This project allows users to describe who they are shopping for, the occasion, their budget, and delivery city. It then seamlessly extracts this context, queries Kapruka's product catalog via MCP (Model Context Protocol), and presents high-quality product recommendations in a dynamic and luxurious UI.

## Features
- 🛍️ **Conversational Interface**: Chat with the Kapruka AI to find the perfect gifts.
- 🧠 **Context Extraction**: Automatically identifies the recipient, occasion, budget, and delivery city (supports simple English & Tanglish).
- 📦 **Smart Recommendations**: Integrates with Kapruka's product search using `@modelcontextprotocol/sdk`.
- 🛒 **Cart & Checkout Flow**: Manage items, adjust quantities, select delivery options, add gift messages, and proceed to a mock checkout.
- 📱 **Mobile Responsive**: Fully optimized for desktop and mobile with interactive sidebars and drawers.

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS
- Lucide React (Icons)
- Model Context Protocol (MCP) SDK

## Setup Commands
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## MCP Endpoint
The agent connects to the official Kapruka MCP endpoint at `https://mcp.kapruka.com/mcp` using `StreamableHTTPClientTransport`.

## Deployment
[Link placeholder]
