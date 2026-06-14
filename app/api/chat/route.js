import { searchKaprukaProducts } from "@/lib/kaprukaMcp";

function extractContext(message, currentContext = {}) {
  const lower = message.toLowerCase();

  let recipient = currentContext.recipient || "Not identified";
  if (lower.match(/\b(amma|mother|mom)\b/)) recipient = "Mother";
  else if (lower.match(/\b(thaththa|father|dad)\b/)) recipient = "Father";
  else if (lower.match(/\b(wife|kella|girlfriend)\b/)) recipient = "Wife/Girlfriend";
  else if (lower.match(/\b(husband|kolla|boyfriend)\b/)) recipient = "Husband/Boyfriend";
  else if (lower.match(/\b(friend|yaluwa)\b/)) recipient = "Friend";
  else if (lower.match(/\b(aiya|brother|malli)\b/)) recipient = "Brother";
  else if (lower.match(/\b(akki|sister|nangi)\b/)) recipient = "Sister";

  let occasion = currentContext.occasion || "Not identified";
  if (lower.match(/\b(birthday|bday|upandinaya)\b/)) occasion = "Birthday";
  else if (lower.match(/\b(anniversary)\b/)) occasion = "Anniversary";
  else if (lower.match(/\b(wedding|mangalalya)\b/)) occasion = "Wedding";
  else if (lower.match(/\b(gift|thaaggak)\b/)) occasion = "Gift";

  let budget = currentContext.budget || "Not identified";
  const budgetMatch = message.match(/\b\d{3,6}\b/);
  if (budgetMatch) budget = `Rs. ${budgetMatch[0]}`;

  let city = currentContext.city || "Not identified";
  if (lower.match(/\b(colombo|kolamba)\b/)) city = "Colombo";
  else if (lower.match(/\b(kandy|nuwara)\b/)) city = "Kandy";
  else if (lower.match(/\b(galle|gaalla)\b/)) city = "Galle";
  else if (lower.match(/\b(kurunegala)\b/)) city = "Kurunegala";

  let category = currentContext.category || "Not identified";
  if (lower.match(/\b(flower|flowers|mal|bouquet|roses)\b/)) category = "Flowers";
  else if (lower.match(/\b(cake|cakes)\b/)) category = "Cakes";
  else if (lower.match(/\b(chocolate|chocolates|choko|ferrero|lindt)\b/)) category = "Chocolates";
  else if (lower.match(/\b(hamper|hampers|basket)\b/)) category = "Hampers";
  else if (lower.match(/\b(watch|watches)\b/)) category = "Watches";
  else if (lower.match(/\b(perfume|perfumes)\b/)) category = "Perfumes";
  else if (lower.match(/\b(bear|teddy|toy)\b/)) category = "Soft Toys";

  let stage = "Product Selection";
  if (recipient === "Not identified" && occasion === "Not identified" && budget === "Not identified") {
    stage = "Gathering Info";
  } else if (budget === "Not identified" || category === "Not identified") {
    stage = "Budget & Preferences";
  }

  return { recipient, occasion, budget, city, category, stage };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body.message || "";
    const currentContext = body.currentContext || {};

    const extractedContext = extractContext(userMessage, currentContext);
    
    const lowerMsg = userMessage.toLowerCase();
    const isTanglish = lowerMsg.match(/\b(amma|thaththa|aiya|akki|nangi|malli|upandinaya|thaaggak|mal|kolamba|nuwara)\b/);

    // Determine if it's a direct product search
    const productKeywords = lowerMsg.match(/\b(cake|cakes|flower|flowers|chocolate|chocolates|choko|hamper|hampers|mal|rose|roses|teddy|watch|mug|perfume|gift box|bouquet)\b/);
    const isVagueGiftQuery = lowerMsg.match(/\b(gift|present|idea|suggest|recommend|help me|something for)\b/);
    const isGreeting = lowerMsg.match(/^(hi|hello|hey|greetings)$/);

    let isDirectSearch = false;
    if (productKeywords) {
      isDirectSearch = true;
    } else if (!isVagueGiftQuery && !isGreeting && extractedContext.recipient === "Not identified" && extractedContext.occasion === "Not identified") {
      // e.g., "yoga mats around 3000" - No recipient, no occasion, no vague "gift" words.
      // We assume the user is just searching directly.
      isDirectSearch = true;
    }

    let reply = "";
    let products = [];

    // If they explicitly ask for products, OR if we already know the category from context history
    if (isDirectSearch || extractedContext.category !== "Not identified") {
      let searchQuery = isDirectSearch ? userMessage : extractedContext.category;
      
      // Make query more realistic by appending occasion
      if (extractedContext.occasion !== "Not identified" && extractedContext.occasion !== "Gift" && !searchQuery.toLowerCase().includes(extractedContext.occasion.toLowerCase())) {
        searchQuery = `${extractedContext.occasion} ${searchQuery}`;
      }
      
      products = await searchKaprukaProducts(searchQuery, {
        budget: extractedContext.budget,
        occasion: extractedContext.occasion
      });

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
    } else {
      // Vague query. We need to gather context and guide them.
      const missing = [];
      if (extractedContext.recipient === "Not identified") missing.push("who you are shopping for");
      if (extractedContext.occasion === "Not identified") missing.push("the occasion");
      
      if (missing.length > 0) {
         reply = `I'd love to help you find the perfect gift! Could you tell me ${missing.join(' and ')}?`;
      } else {
         reply = `Great! I'll find something special for your ${extractedContext.recipient}'s ${extractedContext.occasion}. Do you have a specific budget in mind, or would you prefer me to show you our best flowers, cakes, or hampers?`;
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