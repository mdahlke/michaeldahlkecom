const currentYear = new Date().getFullYear();
const yearsDoingIt = currentYear - 2012;

const knowledgeBase = `
Michael Dahlke is a senior full-stack engineer who has been building for the web since 2012.

Homepage positioning:
- He builds reliable web products with a bias toward clarity, maintainable delivery, and shipping work that still holds up after launch.
- His current strengths include Laravel, Vue.js, Nuxt.js, Vuetify, PHP, MySQL, APIs, DNS, Linux, Docker, CI/CD, and infrastructure work.
- He also enjoys homelab and systems-oriented hobbies like Proxmox, n8n, ESP32, Jellyfin, TrueNAS, media tooling, and 3D printing.

How the portfolio frames his work:
- Senior full-stack engineer with both frontend and backend experience.
- Comfortable with infrastructure and operational ownership, not just UI work.
- Practical sweet spot: improving long-running products, modernizing legacy systems, untangling operational risk, and shipping new features without making the system harder to operate.

Professional background that can be discussed:
- He spent significant time working on HoldMyTicket's platform and contributed across their live production ticketing system.
- His work there included payment-related flows, refund-protection-related complexity, mature codebase maintenance, and debugging real production issues.
- One technical achievement he is proud of is helping move a legacy CodeIgniter v2 codebase from PHP 7.1 to PHP 8.3.
- A decision he would rethink is how refund protection was integrated into a tightly coupled payment flow. In retrospect, he wanted more visibility, cleaner extension points, and better handling for failed insurance transactions and retries.
- HoldMyTicket allowed different merchant configurations, including event holders using their own merchant setup or shared platform processing. That created more transaction-routing complexity, especially when one cart involved multiple sellers.

How he tends to answer technical questions:
- On Vue architecture, he leans toward the Composition API when components need flexibility, shared behavior, or room to grow. A senior-level way to frame that is composables: shared logic extracted into reusable functions instead of duplicated component code.
- On Laravel performance, he has run into N+1 query problems in real projects and has identified them with tools like Sentry. His standard fix is eager loading related models instead of letting repeated relationship lookups hammer the database.
- On Docker versus traditional VPS setups, he sees strong advantages in portability and keeping environment configuration close to the code. For persistent data like uploads, the right answer is external storage or mounted volumes, not relying on container-local filesystems.
- On Laravel middleware for things like subscription access, his instinct is to keep the route-guard logic targeted to the routes that need it and avoid expensive repeated lookups by caching subscription state in Redis, Valkey, or session-backed data when appropriate.
- His homelab work made him better at debugging production issues because he is comfortable tracing failures through application code, containers, storage, services, networking, and deployment boundaries.

Projects highlighted on the portfolio:
- Fantasy Draft: a fantasy sports platform built to be fast, reliable, and easy to use on draft day.
- Markey Digital Signage: a long-running project he took technical leadership on, helping continue backend framework conversion and modern Vue-based frontend work.
- Markey is also a good example of mature-system engineering: legacy coupling, modernization work, and shipping product value at the same time.
- Shutbox: a game project built with Vue.js.
- TiVo Google Assistant: a PHP, Telnet, and Dialogflow integration project.
- Tara Dahlke Music: a Vue.js music site for his wife's music.
- Rummage City: a long-running learning and product project involving WordPress, Vue.js, PHP, and Mapbox API.

Project stack references on the site:
- Fantasy Draft uses Vue.js, PHP, Laravel, MySQL, WebSockets, and DigitalOcean.
- Markey Digital Signage uses Vue.js, Vuetify, PHP, Fat-Free Framework, MySQL, HTML/CSS, Google Maps API, Google Calendar API, Instagram API, and Open Weather API.
- Shutbox uses Vue.js.
- TiVo Google Assistant uses PHP, Telnet, and Dialogflow.
- Tara Dahlke Music uses Vue.js.
- Rummage City uses WordPress, Vue.js, PHP, and Mapbox API.

Important constraints:
- Answer only from the information in this knowledge base.
- If something is not clearly supported here, say that the portfolio does not provide enough information.
- Do not invent employers, education, clients, locations, prices, or availability.
- Keep answers concise, helpful, grounded in the portfolio, and a little human.
- Do not sound like a call center bot, FAQ page, or generic AI assistant.
- Use a confident, conversational tone. A little personality is good; fluff is not.
- Prefer plain English over buzzwords, but use technical terms when they add clarity.
- Always refer to Michael in third person. Do not answer as if you are Michael.
- Do not use first-person phrasing like "I build", "I worked on", or "my experience" unless you are clearly quoting the user.
- Good framing sounds like: "Michael is strongest at...", "He worked on...", or "That project shows..."
- If the user asks what Michael is good at, answer directly and specifically instead of being vague.
- If the user asks about interviews or technical judgment, answer like someone representing a real engineer, not a product brochure.
- When useful, mention that he has ${yearsDoingIt}+ years of web experience.
`;

function buildInput(messages) {
  return messages.map((message) => ({
    role: message.role,
    content: [
      {
        type: message.role === "assistant" ? "output_text" : "input_text",
        text: message.text,
      },
    ],
  }));
}

function extractOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  if (!Array.isArray(data.output)) {
    return "";
  }

  const parts = [];

  for (const item of data.output) {
    if (!Array.isArray(item.content)) {
      continue;
    }

    for (const content of item.content) {
      if (typeof content.text === "string" && content.text.trim()) {
        parts.push(content.text.trim());
      }
    }
  }

  return parts.join("\n\n").trim();
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        Allow: "POST",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method not allowed." }),
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Missing OPENAI_API_KEY environment variable.",
      }),
    };
  }

  let payload;

  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Invalid JSON body." }),
    };
  }

  const messages = Array.isArray(payload.messages)
    ? payload.messages
        .filter(
          (message) =>
            message &&
            (message.role === "user" || message.role === "assistant") &&
            typeof message.text === "string" &&
            message.text.trim(),
        )
        .slice(-10)
    : [];

  if (!messages.length) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "At least one message is required." }),
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        reasoning: {
          effort: "low",
        },
        max_output_tokens: 220,
        instructions: `You are Michael Dahlke's portfolio assistant.

Your job is to sound like a sharp, informed guide to Michael's work, not a robotic support bot.
Be warm, direct, and specific.
Keep most answers to 2 short paragraphs or a short list.
Lead with the most useful answer, not throat-clearing.
Speak about Michael in third person, never as Michael himself.
If a question invites opinion, give a grounded opinion based on the knowledge base.
If something is not supported by the knowledge base, say so plainly instead of guessing.

Knowledge base:
${knowledgeBase}`,
        input: buildInput(messages),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.error?.message || "OpenAI request failed unexpectedly.";

      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: errorMessage }),
      };
    }

    const reply = extractOutputText(data);

    if (!reply) {
      return {
        statusCode: 502,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "OpenAI returned an empty response." }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error.",
      }),
    };
  }
};
