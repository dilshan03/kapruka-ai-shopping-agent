export async function POST(request) {
  const body = await request.json();

  return Response.json({
    reply: `I received your message: "${body.message}". Next, I will search Kapruka products.`,
    products: [
      {
        id: "1",
        name: "Chocolate Birthday Cake",
        price: "Rs. 4,500",
        image: "https://via.placeholder.com/200",
      },
    ],
  });
}