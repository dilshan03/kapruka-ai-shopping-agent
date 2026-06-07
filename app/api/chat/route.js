import { searchKaprukaProducts } from "@/lib/kaprukaMcp";

export async function POST(request) {
  try {
    const body = await request.json();

    const products = await searchKaprukaProducts(body.message);

    return Response.json({
      reply: `I searched Kapruka for "${body.message}". Here are some matching products.`,
      products,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return Response.json(
      {
        reply: "Sorry, something went wrong while searching products.",
        products: [],
      },
      { status: 500 }
    );
  }
}