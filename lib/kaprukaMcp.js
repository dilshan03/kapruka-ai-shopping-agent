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
      return [
        {
          id: "error-1",
          name: text || "Kapruka search returned an error",
          price: "Try another search",
          image: "https://via.placeholder.com/200",
          url: "#",
        },
      ];
    }

    if (text.startsWith("No products found")) {
      return [];
    }

    const data = JSON.parse(text);

    return (data.results || []).map((product, index) => ({
      id: product.id || `product-${index}`,
      name: product.name || "Kapruka Product",
      price: product.price?.amount
        ? `LKR ${Number(product.price.amount).toLocaleString()}`
        : "Price unavailable",
      image: product.image_url || "https://via.placeholder.com/200",
      url: product.url || "#",
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