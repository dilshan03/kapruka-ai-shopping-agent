export async function searchKaprukaProducts(query) {
  try {
    console.log("Searching Kapruka MCP for:", query);

    // Temporary fallback until real MCP call is added
    return [
      {
        id: "mock-1",
        name: `Search result for: ${query}`,
        price: "Rs. 4,500",
        image: "https://via.placeholder.com/200",
      },
      {
        id: "mock-2",
        name: "Kapruka Gift Product",
        price: "Rs. 5,200",
        image: "https://via.placeholder.com/200",
      },
    ];
  } catch (error) {
    console.error("Kapruka MCP search failed:", error);

    return [];
  }
}