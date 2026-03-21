# michaeldahlke.com
[![Netlify Status](https://api.netlify.com/api/v1/badges/1edc4021-c5fb-44f2-b31c-d11c1c48efa0/deploy-status)](https://app.netlify.com/sites/frabjous-kringle-7c78e4/deploys)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Real AI Chat Setup

The portfolio chat uses a Netlify Function so the OpenAI API key stays on the
server.

1. Copy `.env.example` to `.env` in Netlify or add the same variables in the Netlify dashboard.
2. Set `OPENAI_API_KEY`.
3. Optionally set `OPENAI_MODEL` if you want something other than `gpt-5-mini`.
4. Deploy on Netlify so `/api/portfolio-chat` resolves to `netlify/functions/portfolio-chat.js`.

For local testing of the real chat flow, run the site through Netlify Dev rather
than plain Vite so the function route is available.

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
