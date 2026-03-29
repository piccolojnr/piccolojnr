---
title: Memraiq
summary: AI SaaS for querying personal knowledge with a custom RAG pipeline, multi-tenant API, and production deployments on Vercel and Railway.
tags:
  - ai
  - saas
  - fullstack
featured: true
sortOrder: 1
liveUrl: https://app.memraiq.com
cover: artifacts/preview.png
---

# Project: Memraiq — AI-Powered Portfolio RAG Platform

---

## Overview

| | |
|---|---|
| **Status** | Live — v1 deployed; v2 in active development |
| **Period** | March 2026 – Present |
| **Role** | Solo developer — designed, built, deployed, and maintaining |
| **Creator** | Daud Rahim |
| **Type** | Solo / Personal SaaS |
| **Client / Organisation** | Self — personal product |
| **Industry** | AI / Developer Tools / SaaS |
| **Confidential?** | No — live product; screenshots and live demo available |

---

## The problem

Professionals and developers accumulate large amounts of personal documentation — portfolios, notes, project writeups, CVs, experience logs — but have no intelligent way to query or surface insights from them. Static documents require manual searching and context-switching. There was no tool purpose-built for asking natural language questions against a personal knowledge vault and getting grounded, cited answers back. I built Memraiq to solve that.

---

## What I did

- Designed the entire platform architecture from scratch — service boundaries, data model, auth flow, RAG pipeline, and deployment topology
- Built and deployed the full-stack v1 application: Next.js frontend, FastAPI backend, Qdrant vector store, and LightRAG integration
- Built a custom RAG system from scratch (memra-rag) as the foundation for v2 — including custom semantic chunking, multi-stage retrieval, query classification, cross-encoder reranking, and Neo4j graph store integration
- Implemented a multi-tenant API with per-org data isolation, encrypted API key storage, conversation history, and cost tracking
- Built the frontend chat interface with streaming answers, source citations, a full markdown vault editor, and a real-time pipeline control panel with SSE progress streaming
- Set up the full deployment infrastructure across Vercel (frontend), Railway (API + RAG service), Supabase (PostgreSQL), and Qdrant cloud (vectors)
- Navigated LightRAG's limitations and made the architectural decision to build a custom RAG pipeline to gain full control over chunking, retrieval quality, and cost

---

<h2 class="case-study-results-heading">Results</h2>

Solo-built AI SaaS: grounded Q&A over personal knowledge vaults, multi-tenant API, and a custom RAG core — live in production.

- **Shipped** a working v1, then replaced the bundled RAG dependency with **memra-rag** (custom chunking, retrieval, reranking, graph augmentation) so quality and cost stay under control as usage grows.
- **Live product** — marketing site, authenticated app (chat, vault, pipeline UX), and admin dashboard across **memraiq.com**, **app.memraiq.com**, and **admin.memraiq.com**.
- **Delivery scope** — four services (frontend, two API generations, RAG service), **15+** API surfaces, six RAG pipeline stages end-to-end, four cloud providers.

| Metric | Value | Notes |
|---|---|---|
| Live deployments | 3 | memraiq.com, app.memraiq.com, admin.memraiq.com |
| Services built | 4 | memra-app, memra-api, memra-rag, memra-api-v2 |
| RAG pipeline components | 6 | Chunker, embedder, classifier, retriever, reranker, generator |
| API endpoints | 15+ | Auth, vault CRUD, pipeline control, conversations, export, settings |
| Infrastructure providers | 4 | Vercel, Railway, Supabase, Qdrant cloud |

**In plain language:** Built and shipped a live AI SaaS product end to end — architecture through production. Validated with v1, then rebuilt the intelligence layer as a first-party RAG system for lasting control over retrieval and spend. Today it is a real multi-tenant product with admin, vault editing, streaming answers with citations, and production infrastructure — not a demo.

---

## How I did it

**Stack (one glance):** Next.js 15 on **Vercel**; **FastAPI** + SQLModel on **Railway**; PostgreSQL via **Supabase**; **Qdrant** for vectors and **Neo4j** for graph edges; **Claude** and **OpenAI** for models and embeddings. JWT auth, encrypted API keys, per-organization data isolation, SSE for long-running pipeline feedback.

**How the pieces evolved:** v1 paired the app and API with **LightRAG** to reach production quickly. Once usage made the limits obvious (chunking, tuning, cost visibility), I stood up **memra-rag** — a dedicated FastAPI service for ingestion, semantic chunking, embedding, vector + graph retrieval, query expansion, and cross-encoder reranking — and wired it in through **memra-api-v2** over Railway private networking. The client stays a full SaaS shell: streaming chat, markdown vault with preview, admin subdomain, and real-time pipeline status.

---

## What made this hard

- Designing a multi-service architecture solo with no team to sanity-check decisions — every service boundary, data model, and API contract had to be thought through alone
- LightRAG is opinionated and hard to debug when retrieval quality is poor — diagnosing problems meant reading source code rather than documentation
- Building a custom RAG pipeline required understanding and implementing chunking strategies, embedding pipelines, vector search tuning, graph retrieval, and cross-encoder reranking — not just wiring up a library
- Keeping three live deployments (frontend, API, RAG) in sync during iteration, especially when the v2 API and RAG service are being developed in parallel
- Building a SaaS product — auth, multi-tenancy, billing hooks, encrypted secrets, per-org data isolation — on top of a technically complex RAG core, as a solo developer

---

## What I'm proud of

Building the custom RAG pipeline. It would have been easy to stay on LightRAG and call it done — but I recognised the ceiling and built my way out of it. The memra-rag service is a proper, production-oriented RAG system: semantic chunking, Qdrant + Neo4j retrieval, query classification, and cross-encoder reranking. That's not a tutorial project — that's a system that required a real understanding of how retrieval works and the patience to build and test each layer. The fact that I did that while also maintaining the live v1 and continuing to ship the frontend is the part I'm most proud of.

---

## What I'd do differently

I'd define the RAG service's API contract earlier and mock it on the API side before the service was built, so memra-api-v2 and memra-rag could be developed truly in parallel without blocking each other. I also underestimated how much time the multi-tenancy and settings-layering logic in the API would take — I'd extract that into its own design phase next time before touching routes.

---

## Artifacts & evidence

**Browse in repo:** [`artifacts/`](./artifacts/) — screenshots, previews, and other files (GitHub shows a folder listing).

| Type | Description | Link / Location | Public? |
|---|---|---|---|
| Live app | Frontend (chat, vault, pipeline) | [app.memraiq.com](https://app.memraiq.com) | Yes (sign-up required) |
| Marketing site | Landing page | [memraiq.com](https://memraiq.com) | Yes |
| Admin dashboard | Admin panel | [admin.memraiq.com](https://admin.memraiq.com) | Restricted |
| Screenshots | UI screenshots & previews | [`artifacts/`](./artifacts/) | Yes |
| Source code | All four repos in portfolio vault | `/portfolio-vault/` | Private |
| Architecture docs | Detailed system design + schema | `memraiq-architecture-plan.md`, `memraiq-system-design.md` | Private |

---

## How to pitch this project

### For a technical audience
Built a multi-tenant RAG SaaS platform across four services: a Next.js 15 frontend, a FastAPI multi-tenant API with encrypted secrets and SSE streaming, a custom RAG pipeline (semantic chunking, Qdrant + Neo4j retrieval, query classification, cross-encoder reranking), and a v2 API integrating it all. Deployed across Vercel, Railway, Supabase, and Qdrant cloud. Migrated from LightRAG to a fully custom retrieval system after identifying the limits of the third-party dependency.

### For a business / non-technical audience
Built a live AI product from scratch that lets users ask questions about their personal knowledge vault and get grounded, cited answers. Shipped a working v1, validated it, then rebuilt the core intelligence layer from scratch to improve quality. The product is live with a public-facing app, an admin dashboard, and a full subscription-ready backend — all built solo.

### One-line version
> Built and deployed a full-stack AI SaaS platform for querying personal knowledge vaults using a custom-built RAG pipeline — live at memraiq.com.

---

## Tags

`ai` `rag` `saas` `full-stack` `next.js` `fastapi` `python` `qdrant` `neo4j` `vector-search` `anthropic` `openai` `multi-tenant` `vercel` `railway` `supabase` `solo` `production` `developer-tools` `nlp`
