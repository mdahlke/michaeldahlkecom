<script setup lang="ts">
import markeyImage from "@/assets/projects/markeyds.png";
import rummageCityImage from "@/assets/projects/rummagecity.png";
import shutboxImage from "@/assets/projects/shutbox.png";
import taraMusicImage from "@/assets/projects/taramusic.png";
import tivoImage from "@/assets/projects/tivo.png";
import fantasyDraftImage from "@/assets/projects/fantasydraft.png";

const yearsDoingIt = new Date().getFullYear() - 2012;

const projects = [
  {
    title: 'Fantasy Draft',
    url: 'https://draft.michaeldahlke.com/',
    image: fantasyDraftImage,
    badge: 'Featured',
    category: 'Product engineering',
    summary: 'A fantasy sports platform built to be fast, reliable, and easy to use on draft day.',
    detail: 'This project is a great example of my strengths in building and maintaining a complex system from backend to frontend using modern web technologies.',
    techStack: ['Vue.js', 'PHP', 'Laravel', 'MySQL', 'WebSockets', 'DigitalOcean'],
  },
  {
    title: "Markey Digital Signage",
    url: "https://my.markeyds.com",
    image: markeyImage,
    badge: "Featured",
    category: "Product engineering",
    summary:
      "A long-running production platform where I’ve helped lead backend modernization and the gradual move to a more maintainable Vue frontend.",
    detail:
      "This project best represents my day-to-day strengths: improving a mature system without freezing delivery, working through legacy coupling, and continuing to ship features while the architecture gets healthier.",
    techStack: [
      "Vue.js",
      "Vuetify",
      "PHP",
      "Fat-Free Framework",
      "MySQL",
      "Google APIs",
    ],
  },
  {
    title: "Rummage City",
    url: "https://www.rummagecity.com",
    image: rummageCityImage,
    badge: "Long arc",
    category: "Independent product",
    summary:
      "A project that has evolved across many iterations and stacks, and a good snapshot of how I learn through building something with staying power.",
    detail:
      "It started as a way to keep learning with purpose and has become a long-term product sandbox for trying, discarding, and improving ideas over time.",
    techStack: ["WordPress", "Vue.js", "PHP", "Mapbox API"],
  },
  {
    title: "Shutbox",
    url: "https://shutbox.michaeldahlke.com/",
    image: shutboxImage,
    badge: "Playful build",
    category: "Frontend app",
    summary:
      "A browser version of a dice game built for the fun of making something interactive, polished, and immediately usable.",
    detail:
      "This one shows the side of me that likes shipping contained, tangible experiences instead of waiting for a perfect excuse to build.",
    techStack: ["Vue.js"],
  },
  {
    title: "TiVo Google Assistant",
    url: "https://www.wisnet.com/how-to-teach-google-assistant-to-talk-to-your-tivo/",
    image: tivoImage,
    badge: "Integration",
    category: "Automation experiment",
    summary:
      "A side project from the pre-smart-device era that connected voice control to a TiVo setup through custom glue code.",
    detail:
      "It is old, a little nerdy, and still useful as a signal: I like making systems talk to each other when they obviously should have done that already.",
    techStack: ["PHP", "Telnet", "Dialogflow"],
  },
  {
    title: "Tara Dahlke Music",
    url: "https://www.taradahlkemusic.com/",
    image: taraMusicImage,
    badge: "Personal site",
    category: "Media experience",
    summary:
      "A music-focused site built to make songs easy to listen to and navigate, while keeping the experience light and personal.",
    detail:
      "This project is less about technical complexity and more about shaping the experience around a real person and a real use case.",
    techStack: ["Vue.js"],
  },
];

const featuredProject = projects[0];
const secondaryProjects = projects.slice(1);

const valueSignals = [
  "Long-running products and legacy modernization",
  "Frontend, backend, infrastructure, and API integration",
  "Independent builds with enough personality to feel human",
];
</script>

<template>
  <section class="projects-view">
    <v-container class="projects-container">
      <section class="projects-hero">
        <div class="hero-copy">
          <p class="eyebrow">Selected work</p>
          <h1 class="title-big">Projects that show how I actually build</h1>
          <p class="hero-lead">
            {{ yearsDoingIt }}+ years of work leaves behind more than screenshots.
            These are the projects that best show the kind of systems I enjoy,
            the problems I tend to take on, and the level of ownership I’m
            comfortable carrying.
          </p>
        </div>

        <aside class="hero-panel">
          <p class="panel-kicker">What this work shows</p>
          <ul class="signal-list">
            <li v-for="signal in valueSignals" :key="signal">{{ signal }}</li>
          </ul>
        </aside>
      </section>

      <section class="featured-project">
        <div class="project-image-wrap">
          <img
            class="project-image"
            :src="featuredProject.image"
            :alt="`${featuredProject.title} preview`"
          />
        </div>

        <div class="project-copy">
          <p class="project-badge">{{ featuredProject.badge }}</p>
          <h2>{{ featuredProject.title }}</h2>
          <p class="project-category">{{ featuredProject.category }}</p>
          <p class="project-summary">{{ featuredProject.summary }}</p>
          <p class="project-detail">{{ featuredProject.detail }}</p>

          <div class="project-stack">
            <span v-for="item in featuredProject.techStack" :key="item" class="stack-pill">
              {{ item }}
            </span>
          </div>

          <a class="project-link" :href="featuredProject.url" target="_blank" rel="noreferrer">
            Visit project
          </a>
        </div>
      </section>

      <section class="project-grid">
        <article v-for="project in secondaryProjects" :key="project.title" class="project-card">
          <div class="project-card-image">
            <img :src="project.image" :alt="`${project.title} preview`" />
          </div>

          <div class="project-card-copy">
            <p class="project-badge">{{ project.badge }}</p>
            <h2>{{ project.title }}</h2>
            <p class="project-category">{{ project.category }}</p>
            <p class="project-summary">{{ project.summary }}</p>
            <p class="project-detail">{{ project.detail }}</p>

            <div class="project-stack compact">
              <span v-for="item in project.techStack" :key="item" class="stack-pill">
                {{ item }}
              </span>
            </div>

            <a class="project-link subtle" :href="project.url" target="_blank" rel="noreferrer">
              Open project
            </a>
          </div>
        </article>
      </section>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.projects-view {
  padding: 32px 0 72px;
}

.projects-container {
  display: grid;
  gap: 30px;
}

.projects-hero,
.featured-project,
.project-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
    rgba(10, 14, 14, 0.72);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
}

.projects-hero {
  display: grid;
  gap: 24px;
  overflow: hidden;
  padding: 28px;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.85fr);
    padding: 38px;
  }
}

.projects-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(229, 86, 67, 0.15), transparent 28%),
    radial-gradient(circle at bottom right, rgba(43, 159, 94, 0.16), transparent 34%);
  pointer-events: none;
}

.hero-copy,
.hero-panel,
.project-copy,
.project-card-copy {
  position: relative;
  z-index: 1;
}

.eyebrow,
.panel-kicker,
.project-badge {
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.title-big {
  color: #fff8eb;
  font-size: clamp(3rem, 9vw, 5.9rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.95;
  margin-top: 10px;
  max-width: 11ch;
}

.hero-lead {
  color: rgba(255, 248, 235, 0.8);
  font-size: clamp(1.05rem, 2.4vw, 1.28rem);
  line-height: 1.6;
  margin-top: 18px;
  max-width: 58ch;
}

.hero-panel {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  padding: 22px;
}

.signal-list {
  color: rgba(255, 248, 235, 0.76);
  display: grid;
  gap: 14px;
  list-style: none;
  margin-top: 18px;
  padding: 0;
}

.signal-list li {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 14px;
}

.signal-list li:first-child {
  border-top: 0;
  padding-top: 0;
}

.featured-project {
  display: grid;
  gap: 0;
  overflow: hidden;

  @media (min-width: 1080px) {
    grid-template-columns: minmax(360px, 1fr) minmax(0, 1fr);
  }
}

.project-image-wrap,
.project-card-image {
  background: rgba(255, 255, 255, 0.03);
  min-height: 100%;
}

.project-image,
.project-card-image img {
  display: block;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  width: 100%;
}

.project-copy,
.project-card-copy {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 26px;
}

.project-copy h2,
.project-card-copy h2 {
  color: #fff8eb;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}

.project-card-copy h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.project-category {
  color: $yellow;
  font-weight: 700;
}

.project-summary {
  color: rgba(255, 248, 235, 0.84);
  font-size: 1.05rem;
  line-height: 1.65;
}

.project-detail {
  color: rgba(255, 255, 255, 0.66);
  line-height: 1.7;
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.stack-pill {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff8eb;
  display: inline-flex;
  font-size: 0.88rem;
  font-weight: 700;
  min-height: 36px;
  align-items: center;
  padding: 0 14px;
}

.project-link {
  color: #08110c;
  background: linear-gradient(135deg, $green, #5fcf82);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  margin-top: 8px;
  min-height: 48px;
  padding: 0 22px;
  text-decoration: none;
  width: fit-content;
}

.project-link.subtle {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff8eb;
}

.project-grid {
  display: grid;
  gap: 22px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.project-card {
  display: grid;
  overflow: hidden;
}
</style>
