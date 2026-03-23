<script setup
    lang="ts">
    import AIAgentChat from "@/components/AIAgentChat.vue";
    import InteractiveTechStack from "@/components/InteractiveTechStack.vue";

    const yearsDoingIt = new Date().getFullYear() - 2012;
    const githubUrl = "https://github.com/mdahlke";
    const emailUser = ["madahlke", "27"].join("");
    const emailDomain = ["gmail", "com"].join(".");
    const emailSubject = encodeURIComponent("Project inquiry from michaeldahlke.com");
    const emailHref = `mailto:${emailUser}@${emailDomain}?subject=${emailSubject}`;
    const openEmail = () => {
        window.location.href = emailHref;
    };

    const currentFocus = [
        {
            title: "Building with",
            langs: ["Laravel", "Vue.js", "Nuxt.js", "Vuetify"],
            titlePosition: "left" as const,
        },
        {
            title: "Shipping through",
            langs: ["Docker", "DigitalOcean", "CI/CD", "Infrastructure"],
            titlePosition: "left" as const,
        },
        {
            title: "Tinkering on",
            langs: ["Proxmox", "n8n", "ESP32", "Jellyfin", "TrueNAS", "3D Printing"],
            titlePosition: "left" as const,
        },
        {
            title: "Trusted for",
            langs: ["PHP", "MySQL", "APIs", "DNS", "Linux", "Secure Coding"],
            titlePosition: "left" as const,
        },
    ];

    const principles = [
        "Make complex systems feel boring to run.",
        "Build maintainable features before clever abstractions.",
        "Treat infrastructure, UX, and code quality as one job.",
    ];

    const proofPoints = [
        {
            title: "Legacy modernization that actually ships",
            body: "Migrated mature PHP systems forward while the business kept moving, including substantial compatibility work across older patterns and newer runtime expectations.",
        },
        {
            title: "Payments and failure states",
            body: "Comfortable owning revenue-sensitive flows, third-party integrations, and the ugly edge cases that show up when transactions, retries, and user trust all collide.",
        },
        {
            title: "Debugging beyond the app layer",
            body: "Homelab and infrastructure work made me better at tracing problems across code, containers, networking, storage, and production behavior instead of stopping at the first stack trace.",
        },
    ];
</script>

<template>
    <section class="home-view">
        <v-container class="home-container">
            <section class="hero-panel">
                <div class="hero-copy">
                    <p class="eyebrow">Senior full-stack engineer</p>
                    <h1 class="title-text">Michael Dahlke</h1>
                    <p class="hero-specialty">
                        Specializing in ticketing platforms, payment flows,
                        legacy modernization, and Vue/Laravel systems that need to
                        stay reliable while they evolve.
                    </p>
                    <p class="hero-lead">
                        I build production web software with a bias toward clarity,
                        maintainability, and shipping work that still pays off after launch.
                        My sweet spot is full-stack product engineering where frontend,
                        backend, infrastructure, and business constraints all matter at the
                        same time.
                    </p>

                    <div class="hero-actions">
                        <router-link class="primary-action" to="/projects">View selected work</router-link>
                        <a class="secondary-action" :href="githubUrl" target="_blank" rel="noreferrer">GitHub</a>
                        <a class="secondary-action" href="" @click.prevent="openEmail">Email me</a>
                    </div>

                    <div class="hero-metrics">
                        <article>
                            <strong>{{ yearsDoingIt }}+</strong>
                            <span>years building for the web</span>
                        </article>
                        <article>
                            <strong>Payments + APIs</strong>
                            <span>revenue-sensitive flows and integrations</span>
                        </article>
                        <article>
                            <strong>Full ownership</strong>
                            <span>frontend, backend, infrastructure, delivery</span>
                        </article>
                    </div>
                </div>

                <aside class="hero-card">
                    <p class="card-label">Current shape of work</p>
                    <div class="signal-list">
                        <div class="signal-item">
                            <span class="signal-name">Core stack</span>
                            <p>Laravel, Vue, APIs, and the operational glue that keeps product teams moving.</p>
                        </div>
                        <div class="signal-item">
                            <span class="signal-name">Sweet spot</span>
                            <p>Modernizing legacy surfaces while still delivering meaningful new product value.</p>
                        </div>
                        <div class="signal-item">
                            <span class="signal-name">Best fit</span>
                            <p>Teams that need someone comfortable moving between product detail, systems design, and production reality.</p>
                        </div>
                    </div>
                </aside>
            </section>

            <section class="section-block proof-panel">
                <div class="section-heading">
                    <p class="section-kicker">Proof</p>
                    <h2>What I actually bring to a team</h2>
                    <p>
                        The site should do more than say I write code. These are the areas
                        where my experience is strongest and most useful.
                    </p>
                </div>

                <div class="proof-grid">
                    <article v-for="item in proofPoints" :key="item.title" class="proof-card">
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.body }}</p>
                    </article>
                </div>
            </section>

            <section class="section-block">
                <div class="section-heading">
                    <p class="section-kicker">Capabilities</p>
                    <h2>What I work with most</h2>
                    <p>
                        These are the tools, systems, and areas of work that come up most often
                        in the projects I build and maintain.
                    </p>
                </div>

                <div class="stack-grid">
                    <interactive-tech-stack v-for="stack in currentFocus" :key="stack.title" :title="stack.title"
                        :langs="stack.langs" :titlePosition="stack.titlePosition" />
                </div>
            </section>

            <section class="section-block principles-panel">
                <div class="section-heading compact">
                    <p class="section-kicker">Approach</p>
                    <h2>How I like to work</h2>
                </div>

                <div class="principles-grid">
                    <article v-for="principle in principles" :key="principle" class="principle-card">
                        <p>{{ principle }}</p>
                    </article>
                </div>
            </section>

            <section class="section-block chat-panel-block">
                <AIAgentChat />
            </section>
        </v-container>
    </section>
</template>

<style scoped
    lang="scss">
    .home-view {
        padding: 32px 0 72px;
    }

    .home-container {
        display: grid;
        gap: 32px;
    }

    .hero-panel,
    .section-block {
        border: 1px solid rgba(255, 255, 255, 0.08);
        background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
            rgba(10, 14, 14, 0.72);
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
        border-radius: 28px;
    }

    .hero-panel {
        display: grid;
        gap: 28px;
        overflow: hidden;
        padding: 28px;

        @media (min-width: 980px) {
            align-items: stretch;
            grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.9fr);
            padding: 40px;
        }
    }

    .hero-panel::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at top left, rgba(43, 159, 94, 0.24), transparent 38%),
            radial-gradient(circle at bottom right, rgba(241, 200, 60, 0.18), transparent 34%);
        pointer-events: none;
    }

    .hero-copy,
    .hero-card,
    .section-heading,
    .proof-card,
    .principle-card {
        position: relative;
        z-index: 1;
    }

    .eyebrow,
    .section-kicker,
    .card-label,
    .signal-name {
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .eyebrow,
    .section-kicker,
    .card-label {
        color: rgba(255, 255, 255, 0.66);
        font-size: 0.78rem;
        font-weight: 700;
    }

    .title-text {
        margin-top: 12px;
        color: #fff8eb;
        font-size: clamp(3.5rem, 12vw, 6.6rem);
        font-weight: 900;
        letter-spacing: -0.04em;
        line-height: 0.94;
        text-wrap: balance;
    }

    .hero-specialty {
        color: $yellow;
        font-size: clamp(1.02rem, 2.4vw, 1.2rem);
        font-weight: 800;
        line-height: 1.5;
        margin-top: 18px;
        max-width: 48rem;
    }

    .hero-lead {
        margin-top: 18px;
        color: rgba(255, 248, 235, 0.84);
        font-size: clamp(1.05rem, 2.8vw, 1.45rem);
        line-height: 1.5;
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 28px;
    }

    .primary-action,
    .secondary-action {
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
        padding: 0 22px;
        text-decoration: none;
        font-weight: 700;
    }

    .primary-action {
        background: linear-gradient(135deg, $green, #5fcf82);
        color: #08110c;
    }

    .secondary-action {
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: #fff8eb;
    }

    .hero-metrics {
        display: grid;
        gap: 14px;
        margin-top: 30px;

        @media (min-width: 720px) {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    .hero-metrics article {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.04);
        min-height: 120px;
        padding: 18px;
    }

    .hero-metrics strong {
        display: block;
        color: #fff;
        font-size: 1.35rem;
        font-weight: 800;
    }

    .hero-metrics span {
        color: rgba(255, 255, 255, 0.7);
        display: block;
        margin-top: 8px;
    }

    .hero-card {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 22px;
        background: rgba(6, 10, 12, 0.72);
        padding: 22px;
        align-self: stretch;
    }

    .signal-list {
        display: grid;
        gap: 18px;
        margin-top: 18px;
    }

    .signal-item {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding-top: 18px;
    }

    .signal-item:first-child {
        border-top: 0;
        padding-top: 0;
    }

    .signal-name {
        color: $yellow;
        display: inline-block;
        font-size: 0.8rem;
        font-weight: 800;
        margin-bottom: 8px;
    }

    .signal-item p,
    .section-heading p,
    .proof-card p,
    .principle-card p {
        color: rgba(255, 255, 255, 0.74);
    }

    .section-block {
        padding: 26px;

        @media (min-width: 980px) {
            padding: 34px;
        }
    }

    .section-heading {
        margin-bottom: 24px;
        max-width: 720px;
    }

    .section-heading h2 {
        color: #fff8eb;
        font-size: clamp(2rem, 5vw, 3.2rem);
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1;
        margin: 8px 0 12px;
    }

    .stack-grid,
    .principles-grid,
    .proof-grid {
        display: grid;
        gap: 18px;
    }

    .proof-panel {
        background:
            radial-gradient(circle at top left, rgba(229, 86, 67, 0.12), transparent 30%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
            rgba(10, 14, 14, 0.72);
    }

    .proof-grid {
        @media (min-width: 900px) {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    .stack-grid {
        @media (min-width: 900px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    .proof-card,
    .principle-card {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.04);
        min-height: 150px;
        padding: 22px;
    }

    .proof-card h3 {
        color: #fff8eb;
        font-size: 1.2rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin-bottom: 10px;
    }

    .principles-panel {
        background:
            linear-gradient(135deg, rgba(241, 200, 60, 0.07), rgba(43, 159, 94, 0.05)),
            rgba(10, 14, 14, 0.72);
    }

    .chat-panel-block {
        background:
            radial-gradient(circle at top right, rgba(43, 159, 94, 0.12), transparent 28%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
            rgba(10, 14, 14, 0.72);
    }

    .principles-grid {
        @media (min-width: 900px) {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
</style>
