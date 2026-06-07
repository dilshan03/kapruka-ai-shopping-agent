export async function searchKaprukaProducts(query) {
  console.log("Searching Kapruka MCP for:", query);

  return [
    {
      id: "mock-1",
      name: "Sample Kapruka Product",
      price: "Rs. 4,500",
      image: "https://via.placeholder.com/200",
    },
  ];
}