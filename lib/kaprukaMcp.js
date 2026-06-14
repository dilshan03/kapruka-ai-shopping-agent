import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export async function searchKaprukaProducts(query, options = {}) {
  const client = new Client({
    name: "kapruka-ai-shopping-agent",
    version: "1.0.0",
  });

  const transport = new StreamableHTTPClientTransport(
    new URL("https://mcp.kapruka.com/mcp")
  );

  try {
    await client.connect(transport);

    const result = await client.callTool({
      name: "kapruka_search_products",
      arguments: {
        params: {
          q: query,
          limit: 30,
          currency: "LKR",
          response_format: "json",
        },
      },
    });

    const text = result.content?.[0]?.text || "";

    if (!text || text.startsWith("Error:") || text.startsWith("Error ")) {
      return [];
    }

    if (text.startsWith("No products found")) {
      return [];
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      return [];
    }

    let results = data.results || [];

    // Filter by budget if provided
    if (options.budget && options.budget !== "Not identified") {
      const budgetValue = Number(String(options.budget).replace(/[^\d]/g, ""));
      if (budgetValue > 0) {
        results = results.filter(product => {
          const price = Number(product.price?.amount || 0);
          return price > 0 && price <= budgetValue;
        });
      }
    }

    // Limit to 6
    results = results.slice(0, 6);

    return results.map((product, index) => ({
      id: product.id || `product-${index}`,
      name: product.name || "Kapruka Product",
      price: product.price?.amount
        ? `Rs. ${Number(product.price.amount).toLocaleString()}`
        : "Price unavailable",
      image: product.image_url || "https://placehold.co/200x200?text=No+Image",
      url: product.url || "#",
      availability: product.availability || "In Stock",
      category: product.category || "General",
    }));
  } catch (error) {
    console.error("Kapruka MCP error:", error);
    return [];
  } finally {
    try {
      await client.close();
    } catch { }
  }
}