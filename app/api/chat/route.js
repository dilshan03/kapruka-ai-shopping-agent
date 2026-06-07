import { searchKaprukaProducts } from "@/lib/kaprukaMcp";

export async function POST(request) {
  const body = await request.json();

  const products = await searchKaprukaProducts(body.message);

  return Response.json({
    reply: `I searched Kapruka for "${body.message}". Here are some matching products.`,
    products,
  });
}