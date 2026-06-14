import { searchKaprukaProducts } from "./lib/kaprukaMcp.js";

async function run() {
  console.log("Starting MCP Test...");
  const products = await searchKaprukaProducts("cake");
  console.log("Result:", products);
}

run().catch(console.error);
