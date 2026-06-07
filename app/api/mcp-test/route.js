import { searchKaprukaProducts } from "@/lib/kaprukaMcp";

export async function GET() {
  const products = await searchKaprukaProducts("birthday cake");

  return Response.json({
    message: "MCP test route working",
    products,
  });
}