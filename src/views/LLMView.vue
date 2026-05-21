<script setup lang="ts">
import { LMStudioClient } from "@lmstudio/sdk";
const client = new LMStudioClient();

const model = await client.llm.model("qwen/qwen3-4b-2507");
const result = await model.respond("What is the meaning of life?");

console.info(result.content);
</script>

