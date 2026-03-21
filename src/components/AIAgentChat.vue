<script setup lang="ts">
import { computed, nextTick, ref } from "vue";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const input = ref("");
const isThinking = ref(false);
const messageId = ref(1);
const messages = ref<Message[]>([
  {
    id: messageId.value++,
    role: "assistant",
    text:
      "I’m Michael’s portfolio assistant. Ask about projects, tech stack, experience, or what kind of work he likes doing.",
  },
]);

const promptChips = [
  "What projects stand out?",
  "What stack does Michael use most?",
  "What kind of work does he enjoy?",
  "What’s his background?",
];
const errorMessage = ref("");
const canSend = computed(() => !!input.value.trim() && !isThinking.value);
const assistantEndpoint = `${window.location.origin}/.netlify/functions/portfolio-chat`;

async function appendAssistantReply() {
  isThinking.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(assistantEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages.value.map((message) => ({
          role: message.role,
          text: message.text,
        })),
      }),
    });

    const rawBody = await response.text();
    let data: { reply?: string; error?: string } = {};

    if (rawBody.trim()) {
      try {
        data = JSON.parse(rawBody) as { reply?: string; error?: string };
      } catch {
        throw new Error("The assistant returned an unreadable response.");
      }
    }

    if (!response.ok || !data.reply) {
      throw new Error(
        data.error ||
          (response.status === 404
            ? "The Netlify function endpoint was not found. Make sure Netlify Dev is running and the functions server started correctly."
            : "The assistant could not answer that right now."),
      );
    }

    messages.value.push({
      id: messageId.value++,
      role: "assistant",
      text: data.reply,
    });
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "The assistant could not answer that right now.";
  } finally {
    isThinking.value = false;
    await nextTick();
  }
}

async function submitMessage(raw?: string) {
  const text = (raw ?? input.value).trim();
  if (!text || isThinking.value) {
    return;
  }

  messages.value.push({
    id: messageId.value++,
    role: "user",
    text,
  });

  input.value = "";
  await appendAssistantReply();
}
</script>

<template>
  <section class="ai-chat">
    <div class="chat-intro">
      <p class="chat-kicker">Portfolio assistant</p>
      <h2>Ask the site what Michael is actually good at</h2>
      <p>
        Ask about projects, stack, experience, or the kind of work I enjoy
        doing most.
      </p>
    </div>

    <div class="chat-shell">
      <aside class="chat-sidebar">
        <div class="agent-badge">
          <span class="agent-dot" />
          <div>
            <strong>Michael AI</strong>
            <p>Portfolio guide, project explainer, stack summary</p>
          </div>
        </div>

        <div class="prompt-list">
          <button
            v-for="prompt in promptChips"
            :key="prompt"
            class="prompt-chip"
            type="button"
            @click="submitMessage(prompt)"
          >
            {{ prompt }}
          </button>
        </div>
      </aside>

      <div class="chat-panel">
        <div class="message-list">
          <article
            v-for="message in messages"
            :key="message.id"
            class="message"
            :class="message.role"
          >
            <span class="message-role">
              {{ message.role === "assistant" ? "AI" : "You" }}
            </span>
            <p>{{ message.text }}</p>
          </article>

          <article v-if="isThinking" class="message assistant pending">
            <span class="message-role">AI</span>
            <p>Thinking<span class="dots">...</span></p>
          </article>
        </div>

        <p v-if="errorMessage" class="chat-error">{{ errorMessage }}</p>

        <form class="chat-composer" @submit.prevent="submitMessage()">
          <label class="sr-only" for="portfolio-chat">Ask about Michael</label>
          <input
            id="portfolio-chat"
            v-model="input"
            type="text"
            placeholder="Ask about projects, stack, or experience"
          />
          <button type="submit" :disabled="!canSend">Send</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.ai-chat {
  display: grid;
  gap: 22px;
}

.chat-intro {
  max-width: 700px;
}

.chat-kicker,
.message-role {
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.chat-kicker {
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.78rem;
  font-weight: 700;
}

.chat-intro h2 {
  color: #fff8eb;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 8px 0 12px;
}

.chat-intro p {
  color: rgba(255, 255, 255, 0.74);
}

.chat-shell {
  display: grid;
  gap: 18px;

  @media (min-width: 980px) {
    grid-template-columns: minmax(260px, 0.75fr) minmax(0, 1.35fr);
  }
}

.chat-sidebar,
.chat-panel {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
    rgba(8, 12, 14, 0.78);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
}

.chat-sidebar {
  display: grid;
  gap: 18px;
  align-content: start;
  padding: 22px;
}

.agent-badge {
  align-items: start;
  display: flex;
  gap: 12px;
}

.agent-badge strong {
  color: #fff8eb;
  display: block;
  font-size: 1.05rem;
  font-weight: 800;
}

.agent-badge p {
  color: rgba(255, 255, 255, 0.62);
  margin-top: 4px;
}

.agent-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, $green, $yellow);
  box-shadow: 0 0 18px rgba(43, 159, 94, 0.5);
  margin-top: 6px;
}

.prompt-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.prompt-chip {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff8eb;
  cursor: pointer;
  font: inherit;
  font-size: 0.92rem;
  padding: 10px 14px;
  text-align: left;
  transition: transform 160ms ease, border-color 160ms ease, background-color 160ms ease;
}

.prompt-chip:hover {
  border-color: rgba(241, 200, 60, 0.28);
  background: rgba(241, 200, 60, 0.08);
  transform: translateY(-1px);
}

.chat-panel {
  display: grid;
  gap: 16px;
  min-height: 540px;
  padding: 18px;
}

.message-list {
  display: grid;
  align-content: start;
  gap: 12px;
  min-height: 420px;
}

.message {
  border-radius: 18px;
  max-width: min(100%, 640px);
  padding: 14px 16px;
}

.message.assistant {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.message.user {
  background: linear-gradient(135deg, rgba(43, 159, 94, 0.24), rgba(83, 61, 74, 0.45));
  border: 1px solid rgba(43, 159, 94, 0.2);
  justify-self: end;
}

.message.pending {
  opacity: 0.84;
}

.message-role {
  color: rgba(255, 255, 255, 0.52);
  display: block;
  font-size: 0.72rem;
  font-weight: 800;
  margin-bottom: 6px;
}

.message p {
  color: #fff8eb;
  line-height: 1.6;
}

.chat-composer {
  display: grid;
  gap: 12px;

  @media (min-width: 700px) {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}

.chat-composer input {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff8eb;
  font: inherit;
  min-height: 52px;
  outline: none;
  padding: 0 18px;
}

.chat-composer input::placeholder {
  color: rgba(255, 255, 255, 0.38);
}

.chat-composer button {
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, $green, #5fcf82);
  color: #08110c;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  min-height: 52px;
  padding: 0 20px;
}

.chat-composer button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.chat-error {
  color: #ffb2a7;
  font-size: 0.92rem;
}

.dots {
  letter-spacing: 0.2em;
}
</style>
