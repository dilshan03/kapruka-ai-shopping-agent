import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export async function searchKaprukaProducts(query) {
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
          limit: 6,
          currency: "LKR",
          response_format: "json",
        },
      },
    });

    const text = result.content?.[0]?.text || "";

    console.log("Kapruka raw response:", text);

    if (!text || text.startsWith("Error:") || text.startsWith("Error ")) {
      console.warn("MCP returned an error:", text);
      return [];
    }

    if (text.startsWith("No products found")) {
      return [];
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse JSON from Kapruka MCP:", parseError);
      return [];
    }

    return (data.results || []).map((product, index) => ({
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