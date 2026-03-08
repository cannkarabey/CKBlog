<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Globe,
  Server,
  Wrench,
  Briefcase,
  GraduationCap,
  MapPin,
  Send,
  ArrowUpRight,
} from "lucide-vue-next";

const { t } = useI18n();

const social = [
  { icon: Github, label: "GitHub", href: "https://github.com/username" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/username" },
  { icon: Mail, label: "E-posta", href: "mailto:hello@ckblog.dev" },
];

const skillCategories = computed(() => [
  {
    key: "languages",
    icon: Code2,
    items: ["Java", "TypeScript", "JavaScript", "C", "SQL"],
  },
  {
    key: "frontend",
    icon: Globe,
    items: ["Vue 3", "Vite", "Pinia", "Vue Router", "Tailwind CSS"],
  },
  {
    key: "backend",
    icon: Server,
    items: ["Node.js", "Express", "Prisma", "REST"],
  },
  {
    key: "tools",
    icon: Wrench,
    items: ["Git", "Docker", "Postman", "Figma", "VS Code"],
  },
]);

const timeline = computed(() => [
  {
    icon: Briefcase,
    when: t("about.timeline1When"),
    title: t("about.timeline1Title"),
    desc: t("about.timeline1Desc"),
  },
  {
    icon: Briefcase,
    when: t("about.timeline2When"),
    title: t("about.timeline2Title"),
    desc: t("about.timeline2Desc"),
  },
  {
    icon: GraduationCap,
    when: t("about.timeline3When"),
    title: t("about.timeline3Title"),
    desc: t("about.timeline3Desc"),
  },
]);
</script>

<template>
  <div class="about-page">
    <!-- ======= PAGE HEADER ======= -->
    <header class="about-header">
      <h1 class="about-title">{{ t("about.title") }}</h1>
      <p class="about-subtitle">{{ t("about.subtitle") }}</p>
    </header>

    <!-- ======= PROFILE HERO ======= -->
    <div class="profile-wrapper">
      <section class="profile-card">
        <div class="profile-avatar-col">
          <div class="avatar-ring">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
              alt="Yusuf Karabey"
              loading="lazy"
              class="avatar-img"
            />
          </div>
        </div>

        <div class="profile-info">
          <div class="profile-location">
            <MapPin class="location-icon" />
            <span>{{ t("about.location") }}</span>
          </div>

          <h2 class="profile-name">Yusuf Karabey</h2>
          <p class="profile-role">{{ t("about.role") }}</p>
          <p class="profile-bio">{{ t("about.bio") }}</p>

          <div class="social-links">
            <a
              v-for="s in social"
              :key="s.href"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="social-link"
            >
              <component :is="s.icon" class="social-icon" />
              <span>{{ s.label }}</span>
              <ArrowUpRight class="social-arrow" />
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- ======= CONTENT AREA (720px) ======= -->
    <div class="about-content">
      <!-- Skills Section -->
      <section class="about-section">
        <h3 class="section-heading">{{ t("about.skills") }}</h3>
        <div class="skills-grid">
          <div
            v-for="cat in skillCategories"
            :key="cat.key"
            class="skill-card"
          >
            <div class="skill-card-head">
              <component :is="cat.icon" class="skill-card-icon" />
              <span>{{ t("about." + cat.key) }}</span>
            </div>
            <div class="skill-chips">
              <span v-for="item in cat.items" :key="item" class="skill-chip">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline Section -->
      <section class="about-section">
        <h3 class="section-heading">{{ t("about.timeline") }}</h3>
        <div class="tl">
          <div
            v-for="(item, idx) in timeline"
            :key="idx"
            class="tl-item"
          >
            <div class="tl-rail">
              <div class="tl-dot">
                <component :is="item.icon" class="tl-dot-icon" />
              </div>
              <div v-if="idx < timeline.length - 1" class="tl-line"></div>
            </div>
            <div class="tl-body">
              <span class="tl-when">{{ item.when }}</span>
              <h4 class="tl-title">{{ item.title }}</h4>
              <p class="tl-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="about-cta">
        <div class="cta-icon-wrap">
          <Send class="cta-icon" />
        </div>
        <h3 class="cta-title">{{ t("about.ctaTitle") }}</h3>
        <p class="cta-sub">{{ t("about.ctaSub") }}</p>
        <a href="mailto:hello@ckblog.dev" class="cta-btn">
          <Mail class="cta-btn-icon" />
          {{ t("about.ctaButton") }}
        </a>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ===========================
   ABOUT PAGE — Editorial Layout
   =========================== */

.about-page {
  padding-bottom: 4rem;
}

/* ===========================
   PAGE HEADER
   =========================== */
.about-header {
  text-align: center;
  padding: 3rem 1rem 2rem;
  max-width: 720px;
  margin: 0 auto;
}

.about-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  margin: 0;
}

.about-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0.75rem 0 0;
}

/* ===========================
   PROFILE HERO
   =========================== */
.profile-wrapper {
  padding: 0 1rem;
}

.profile-card {
  max-width: 820px;
  margin: 0 auto;
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
}

.profile-avatar-col {
  flex-shrink: 0;
}

.avatar-ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--color-accent);
  box-shadow: 0 0 24px rgba(168, 85, 247, 0.15);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  min-width: 0;
}

.profile-location {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.35rem 0.875rem;
  border-radius: 9999px;
  background: var(--color-accent-badge);
  color: var(--color-accent-badge-text);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  width: fit-content;
}

.location-icon {
  width: 0.75rem;
  height: 0.75rem;
  opacity: 0.8;
}

.profile-name {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  margin: 0;
}

.profile-role {
  font-size: 1rem;
  color: var(--color-accent);
  font-weight: 500;
  margin: 0;
}

.profile-bio {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0.25rem 0 0;
  max-width: 50ch;
}

/* Social links */
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: 0.5rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border-default);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(168, 85, 247, 0.06);
}

.social-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.social-arrow {
  width: 0.7rem;
  height: 0.7rem;
  opacity: 0.5;
}

/* ===========================
   CONTENT AREA
   =========================== */
.about-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Section */
.about-section {
  padding: 2.5rem 0 0;
}

.section-heading {
  font-family: var(--font-heading);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border-default);
}

/* ===========================
   SKILLS GRID
   =========================== */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.skill-card {
  padding: 1.25rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  transition: border-color 0.2s ease;
}

.skill-card:hover {
  border-color: var(--color-border-active);
}

.skill-card-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.skill-card-icon {
  width: 1rem;
  height: 1rem;
}

.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-chip {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: var(--color-accent-badge);
  color: var(--color-accent-badge-text);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* ===========================
   TIMELINE
   =========================== */
.tl {
  display: flex;
  flex-direction: column;
}

.tl-item {
  display: flex;
  gap: 1.25rem;
}

.tl-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.tl-dot {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--color-accent-badge);
  border: 2px solid var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tl-dot-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-accent);
}

.tl-line {
  width: 2px;
  flex: 1;
  background: var(--color-border-default);
  min-height: 2rem;
}

.tl-body {
  padding-bottom: 2rem;
}

.tl-when {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.02em;
  margin-bottom: 0.25rem;
}

.tl-title {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.375rem;
}

.tl-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 45ch;
}

/* ===========================
   CTA
   =========================== */
.about-cta {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.about-cta::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--color-accent),
    var(--color-accent-glow),
    var(--color-accent)
  );
}

.cta-icon-wrap {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--color-accent-badge);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-accent);
}

.cta-title {
  font-family: var(--font-heading);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.cta-sub {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 40ch;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  background: var(--color-accent);
  color: #0a0e1a;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  transition: filter 0.2s ease;
  margin-top: 0.5rem;
}

.cta-btn:hover {
  filter: brightness(1.1);
  color: #0a0e1a;
}

.cta-btn-icon {
  width: 1rem;
  height: 1rem;
}

/* ===========================
   RESPONSIVE
   =========================== */
@media (max-width: 640px) {
  .about-header {
    padding: 2rem 1rem 1.5rem;
  }

  .profile-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
  }

  .avatar-ring {
    width: 120px;
    height: 120px;
  }

  .profile-info {
    align-items: center;
  }

  .profile-bio {
    max-width: 100%;
  }

  .social-links {
    justify-content: center;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .about-cta {
    padding: 2rem 1.5rem;
  }
}
</style>
