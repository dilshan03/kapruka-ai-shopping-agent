import { searchKaprukaProducts } from "@/lib/kaprukaMcp";

function extractContext(message) {
  const lower = message.toLowerCase();

  let recipient = "Not identified";
  if (lower.match(/\b(amma|mother|mom)\b/)) recipient = "Mother";
  else if (lower.match(/\b(thaththa|father|dad)\b/)) recipient = "Father";
  else if (lower.match(/\b(wife|kella|girlfriend)\b/)) recipient = "Wife/Girlfriend";
  else if (lower.match(/\b(husband|kolla|boyfriend)\b/)) recipient = "Husband/Boyfriend";
  else if (lower.match(/\b(friend|yaluwa)\b/)) recipient = "Friend";
  else if (lower.match(/\b(aiya|brother|malli)\b/)) recipient = "Brother";
  else if (lower.match(/\b(akki|sister|nangi)\b/)) recipient = "Sister";

  let occasion = "Not identified";
  if (lower.match(/\b(birthday|bday|upandinaya)\b/)) occasion = "Birthday";
  else if (lower.match(/\b(anniversary)\b/)) occasion = "Anniversary";
  else if (lower.match(/\b(wedding|mangalalya)\b/)) occasion = "Wedding";
  else if (lower.match(/\b(gift|thaaggak)\b/)) occasion = "Gift";

  let budget = "Not identified";
  const budgetMatch = message.match(/\b\d{3,6}\b/);
  if (budgetMatch) budget = `Rs. ${budgetMatch[0]}`;

  let city = "Not identified";
  if (lower.match(/\b(colombo|kolamba)\b/)) city = "Colombo";
  else if (lower.match(/\b(kandy|nuwara)\b/)) city = "Kandy";
  else if (lower.match(/\b(galle|gaalla)\b/)) city = "Galle";
  else if (lower.match(/\b(kurunegala)\b/)) city = "Kurunegala";

  let category = "Not identified";
  if (lower.match(/\b(flower|flowers|mal)\b/)) category = "Flowers";
  else if (lower.match(/\b(cake|cakes)\b/)) category = "Cakes";
  else if (lower.match(/\b(chocolate|chocolates|choko)\b/)) category = "Chocolates";
  else if (lower.match(/\b(hamper|hampers)\b/)) category = "Hampers";

  let stage = "Product Selection";
  if (recipient === "Not identified" && occasion === "Not identified" && budget === "Not identified") {
    stage = "Gathering Info";
  } else if (budget === "Not identified") {
    stage = "Budget Established";
  }

  return { recipient, occasion, budget, city, category, stage };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body.message || "";

    const products = await searchKaprukaProducts(userMessage);
    const extractedContext = extractContext(userMessage);

    let reply = "";
    
    // Check if the user is using Tanglish/Sinhala keywords
    const isTanglish = userMessage.toLowerCase().match(/\b(amma|thaththa|aiya|akki|nangi|malli|upandinaya|thaaggak|mal|kolamba|nuwara)\b/);

    if (products.length > 0) {
      if (isTanglish) {
        reply = "I found some premium options for you! Have a look at these, they match perfectly.";
      } else {
        reply = "Wonderful! I found some premium options that match your request. Here are my top recommendations.";
      }
    } else {
      if (isTanglish) {
        reply = "I couldn't find an exact match for that. Would you like me to try looking for some beautiful flowers, cakes, or chocolates instead?";
      } else {
        reply = "I couldn’t find an exact match. Would you like me to try flowers, cakes, chocolates, or hampers?";
      }
    }

    return Response.json({
      reply,
      products,
      extractedContext,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({
      reply: "I'm sorry, I'm having trouble connecting right now. Let's try again in a moment.",
      products: [],
      extractedContext: { recipient: "Not identified", occasion: "Not identified", budget: "Not identified", city: "Not identified", category: "Not identified", stage: "Error" }
    });
  }
}