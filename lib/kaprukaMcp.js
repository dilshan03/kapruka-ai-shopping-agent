import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const KAPRUKA_MCP_URL = "https://mcp.kapruka.com/mcp";

export async function searchKaprukaProducts(query) {
  const transport = new StreamableHTTPClientTransport(
    new URL(KAPRUKA_MCP_URL)
  );

  const client = new Client({
    name: "kapruka-ai-shopping-agent",
    version: "1.0.0",
  });

  try {
    await client.connect(transport);

    const result = await client.callTool({
      name: "kapruka_search_products",
      arguments: {
        q: query,
        limit: 6,
        currency: "LKR",
        in_stock_only: true,
        response_format: "compact",
      },
    });

    await client.close();

    const textContent = result.content?.find(
      (item) => item.type === "text"
    )?.text;

    if (!textContent) return [];

    const parsed = JSON.parse(textContent);

    const products = parsed.products || parsed.results || parsed || [];

    return products.map((product, index) => ({
      id: product.id || product.product_id || `product-${index}`,
      name: product.name || product.title || "Kapruka Product",
      price:
        product.price ||
        product.display_price ||
        product.price_text ||
        "Price not available",
      image:
        product.image ||
        product.image_url ||
        product.thumbnail ||
        "https://via.placeholder.com/200",
      url: product.url || product.product_url || "#",
    }));
  } catch (error) {
    console.error("Real Kapruka MCP search failed:", error);
    return [];
  }
}