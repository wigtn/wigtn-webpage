<p align="center">
  <img src="public/images/wigtn_logo_banner.jpg" alt="WIGTN" width="400" />
</p>

<h3 align="center">We prove ourselves by what we build, not how long we've built.</h3>

<p align="center">
  <a href="https://wigtn.com">Website</a> &middot;
  <a href="https://github.com/wigtn">GitHub</a> &middot;
  <a href="https://huggingface.co/Wigtn">HuggingFace</a>
</p>

---

## Who We Are

**WIGTN** (와 이게 되네 — "Wow, this actually works!") is a 5-person AI-native research crew based in Korea. We build practical, domain-specialized AI tools — from fine-tuned VLMs to real-time voice translation systems — and ship them as open-source.

We're active in the Korean AI community through **Modulabs RAPIDS Lab** and **BrainCrew Log26**, and have competed in hackathons including **Ralphthon Seoul #2** (Roguekit) and **Google Gemini Live Agent Challenge** (TimeLens).

## Projects

### TimeLens — AI Cultural Heritage Companion
> **Gemini Live Agent Challenge Entry** &middot; Status: **Live**

AI-powered museum guide. Point your camera at an artifact and get real-time AI explanations with historical context and restoration visualizations.

[![YouTube](https://img.shields.io/badge/Demo-YouTube-red?logo=youtube)](https://youtu.be/ITaMtVO5jFg?si=Qb9-5mGiXtHMcewm)
[![GitHub](https://img.shields.io/badge/Code-GitHub-black?logo=github)](https://github.com/wigtn/wigtn-timelens)
[![Live](https://img.shields.io/badge/Try-Live_Demo-blue)](https://timelens-852253134165.asia-northeast3.run.app/)

---

### WIGVO — Real-Time Voice Translation for Phone Calls
> **ACL 2026 System Demonstrations** (submitted) &middot; Status: **Live**

Dual-Session Echo Gating architecture enabling natural bilingual conversations over standard PSTN phone lines. 0 echo-loop incidents across 148 production calls. 480ms VAD latency after 7-stage evolution.

[![YouTube](https://img.shields.io/badge/Demo-YouTube-red?logo=youtube)](https://youtu.be/_ixVEnHJxjk?si=P257fqme3B0zTzNu)
[![GitHub](https://img.shields.io/badge/Code-GitHub-black?logo=github)](https://github.com/wigtn/wigvo-v2)
[![Live](https://img.shields.io/badge/Try-Live_Demo-blue)](https://wigvo-web-gzjzn35jyq-du.a.run.app/)

---

### WigtnOCR-v1 — Korean Document Parsing Model
> **EMNLP 2026 Industry Track** (targeting) &middot; Status: **Released**

VLM-based Korean government document parser. Teacher-Student Pseudo-GT pipeline using Qwen3-VL-30B teacher and 122B judge. LoRA fine-tuned Qwen3-VL-2B in 31 minutes on RTX PRO 6000 Blackwell x2.

| Benchmark | Score | Rank |
|-----------|-------|------|
| OmniDocBench Table TEDS | 0.649 | **#1** |
| KoGovDoc-Bench Retrieval Hit@1 | 0.739 | **#1** (among 6 parsers) |

[![HuggingFace](https://img.shields.io/badge/Model-HuggingFace-yellow?logo=huggingface)](https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR)
[![GitHub](https://img.shields.io/badge/Code-GitHub-black?logo=github)](https://github.com/wigtn/wigtnOCR-v1)

---

### WIGVU — AI-Powered Korean Learning
> Status: **Preparing**

Learn Korean from real content — K-Drama clips, K-POP lyrics, YouTube videos — with sentence-level translation and expression analysis.

[![GitHub](https://img.shields.io/badge/Code-GitHub-black?logo=github)](https://github.com/wigtn/wigvu)

---

### WIGEX — Travel Expense Tracker with Receipt OCR
> Status: **Preparing**

Receipt OCR powered by our own WigtnOCR model. Real-time currency conversion and offline support.

[![GitHub](https://img.shields.io/badge/Code-GitHub-black?logo=github)](https://github.com/wigtn/wigex)

---

### WIGTN Coding — Claude Code Plugin Ecosystem
> Status: **Active**

Unified Claude Code plugin from idea to deploy. 12 agents, 3 commands, 3 skills, and 17 design styles with team-based parallel execution for 3-5x speedup.

[![GitHub](https://img.shields.io/badge/Code-GitHub-black?logo=github)](https://github.com/wigtn/wigtn-plugins-with-claude-code)

---

## Team

| Name | Role | GitHub |
|------|------|--------|
| Hyeongseob Kim | Founder & Crew Lead | [@Hyeongseob91](https://github.com/Hyeongseob91) |
| Jinmo Kim | Solution Architect | [@moriroKim](https://github.com/moriroKim) |
| Hyeonsang Kim | AI Product Engineer | [@HyeonsangKim](https://github.com/HyeonsangKim) |
| Sangwoo Son | AI Engineer | [@wigtn](https://github.com/wigtn) |
| Hyunwoo Cho | AI Product Engineer | [@starz-woo](https://github.com/starz-woo) |

## Tech Stack

This website is built with:

- **Next.js 15** + **React 19** + **TypeScript**
- **Tailwind CSS** + **Framer Motion**
- **Static Export** deployed via GitHub Pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## License

&copy; 2025 WIGTN. All rights reserved.
