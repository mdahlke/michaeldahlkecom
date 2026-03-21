const currentYear = new Date().getFullYear();
const yearsDoingIt = currentYear - 2012;

const knowledgeBase = `
Michael Dahlke is a web developer who has been building for the web since 2012.

Homepage positioning:
- He builds reliable web products with a bias toward clarity, strong foundations, and maintainable delivery.
- Current strengths include Laravel, Vue.js, Nuxt.js, Vuetify, PHP, MySQL, APIs, DNS, Linux, Docker, CI/CD, and infrastructure work.
- He also enjoys homelab and systems-oriented hobbies like Proxmox, n8n, ESP32, Jellyfin, TrueNAS, media tooling, and 3D printing.

How the portfolio frames his work:
- Full-stack engineer with both frontend and backend experience.
- Comfortable with infrastructure and operational ownership, not just UI work.
- Practical sweet spot: improving long-running products, modernizing legacy systems, and shipping new features without making the system harder to operate.

Projects highlighted on the portfolio:
- Markey Digital Signage: a long-running project he took technical leadership on, helping continue backend framework conversion and modern Vue-based frontend work.
- Shutbox: a game project built with Vue.js.
- TiVo Google Assistant: a PHP, Telnet, and Dialogflow integration project.
- Tara Dahlke Music: a Vue.js music site for his wife's music.
- Rummage City: a long-running learning and product project involving WordPress, Vue.js, PHP, and Mapbox API.

Project stack references on the site:
- Markey Digital Signage uses Vue.js, Vuetify, PHP, Fat-Free Framework, MySQL, HTML/CSS, Google Maps API, Google Calendar API, Instagram API, and Open Weather API.
- Shutbox uses Vue.js.
- TiVo Google Assistant uses PHP, Telnet, and Dialogflow.
- Tara Dahlke Music uses Vue.js.
- Rummage City uses WordPress, Vue.js, PHP, and Mapbox API.

Important constraints:
- Answer only from the information in this knowledge base.
- If something is not clearly supported here, say that the portfolio does not provide enough information.
- Do not invent employers, education, clients, locations, prices, or availability.
- Keep answers concise, helpful, and grounded in the portfolio.
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
        instructions: `You are Michael Dahlke's portfolio assistant.\n\nKnowledge base:\n${knowledgeBase}`,
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
