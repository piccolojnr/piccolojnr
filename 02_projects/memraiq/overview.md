---
title: Memraiq
summary: Custom RAG platform built around systematic failure analysis — identifying where retrieval and reasoning break, then redesigning the pipeline until behavior was reliable.
tags:
  - ai
  - saas
  - fullstack
featured: true
sortOrder: 1
liveUrl: https://memraiq.com
cover: artifacts/preview.png
---

# Memraiq — AI-Powered Knowledge Platform

---

## Overview

|              |                                                                            |
| ------------ | -------------------------------------------------------------------------- |
| **Status**   | Live, v1 deployed; v2 in active development                                |
| **Period**   | March 2026 – Present                                                       |
| **Role**     | Solo developer — architecture, implementation, deployment, and maintenance |
| **Type**     | Personal SaaS product                                                      |
| **Industry** | AI / Developer Tools                                                       |

---

## The problem

Professionals accumulate large amounts of personal documentation — portfolios, project writeups, notes, CVs — with no intelligent way to query across them. I built Memraiq to let users ask natural language questions against a personal knowledge vault and get grounded, cited answers back.

The harder problem turned out to be this: building a RAG system that actually behaves reliably. Getting a pipeline to return _something_ is easy. Getting it to return the right thing, decline when it shouldn't answer, and stay consistent across different query types is not. That gap became the core engineering challenge.

---

## What I built

A multi-tenant SaaS platform across four services:

- **Next.js 15 frontend** — streaming chat interface, markdown vault editor, real-time pipeline status via SSE
- **FastAPI multi-tenant API** — JWT auth, encrypted API keys, per-org data isolation, conversation history, cost tracking
- **memra-rag** — custom RAG service built from scratch: semantic chunking, Qdrant vector store, Neo4j graph store, query classification, cross-encoder reranking
- **Infrastructure** — Vercel (frontend), Railway (API + RAG), Supabase (PostgreSQL), Qdrant cloud

The v1 used LightRAG as the retrieval layer. Once real usage exposed its limits, I replaced it with `memra-rag` — a fully custom pipeline I designed and built to regain control over chunking quality, retrieval behavior, and cost.

---

## Failure analysis and system iteration

This is the part I spent the most time on. Rather than treating the RAG pipeline as a black box and tuning prompts, I evaluated its behavior systematically and redesigned components based on specific failure modes.

### Failure 1: Over-retrieval on simple queries

**What I observed:** The system triggered full retrieval for every query, including conversational inputs that needed no context at all. This added unnecessary latency and cost on every turn.

**Root cause:** No routing layer — the pipeline had one path for everything.

**Fix:** Introduced an intent classification layer upstream. It decides whether a query needs retrieval, and if so, which retrieval mode. Queries that don't need context skip the pipeline entirely.

---

### Failure 2: Hallucination when context was insufficient

**What I observed:** When a user asked about something not in their vault, the model would generate a plausible-sounding answer with no grounding. The system had no way to say "I don't know."

**Root cause:** No constraint on generation. The model was given a query and told to answer; it did.

**Fix:** Added an explicit "insufficient context" path. When the retriever returns nothing relevant, the system declines to answer rather than fabricating. This required changing the generation prompt _and_ adding a confidence signal from the retriever, so the generator had something to gate on.

---

### Failure 3: Rigid retrieval across different query types

**What I observed:** Vector-only retrieval worked well for focused factual questions but failed on relational or multi-hop queries — things like "how does my IoT project relate to my systems experience?" — where the answer depended on connections across documents, not similarity to a single query.

**Root cause:** One retrieval mode for all query shapes.

**Fix:** Added a `hybrid` mode pairing Qdrant vector retrieval with Neo4j graph traversal. The intent classifier routes relational queries into hybrid mode and factual queries into `naive` (vector-only). The graph edges encode relationships across documents that pure vector similarity can't capture.

---

### Failure 4: Answers with no traceability

**What I observed:** Early responses gave no indication of where information came from. Debugging a wrong answer meant manually re-running the pipeline and inspecting intermediate outputs.

**Root cause:** Citations and source tracking weren't built into the pipeline — they were an afterthought.

**Fix:** Made source references a first-class output at every stage. The retriever attaches source metadata; the generator is prompted to cite; the frontend renders citations inline. This also improved the user experience significantly: grounded answers are visibly more trustworthy.

---

### Failure 5: Inconsistent behavior on empty vaults

**What I observed:** New users who hadn't uploaded anything yet received irrelevant or confusing responses. The system had no awareness of "no data" as a distinct state.

**Root cause:** The pipeline assumed there was always something to retrieve.

**Fix:** Added an empty-vault detection path that intercepts queries before retrieval and guides users to upload content. Simple conditional, but it mattered for real-world reliability.

---

## What this work taught me

Each failure mode had the same structure: the system did something that looked plausible on the surface but was wrong for a specific reason. Fixing it required understanding _why_ it was wrong — not just patching symptoms. Over-retrieval wasn't a prompt problem; it was a missing routing layer. Hallucination wasn't a temperature problem; it was a missing constraint on generation.

The habit of asking "what exactly went wrong, and what structural change fixes it" rather than "what prompt tweak makes the output look better" is what pushed the pipeline from unreliable to trustworthy.

---

## Technical stack

**Python · FastAPI · Next.js 15 · Qdrant · Neo4j · PostgreSQL · Claude · OpenAI · Vercel · Railway · Supabase · Docker**

---

## What made this hard

Designing a multi-service architecture solo meant every boundary, data model, and API contract was a decision I had to own without a second opinion. LightRAG was opinionated and difficult to debug; diagnosing problems meant reading source code, not documentation. Building the custom RAG pipeline required understanding and implementing each stage — chunking strategies, embedding, vector and graph retrieval, reranking — not just importing a library. And all of this while keeping the live v1 running and the frontend moving forward.

---

## Links

|                |                                                               |
| -------------- | ------------------------------------------------------------- |
| Live app       | [app.memraiq.com](https://app.memraiq.com) (sign-up required) |
| Marketing site | [memraiq.com](https://memraiq.com)                            |
| GitHub         | [piccolojnr](https://github.com/piccolojnr)                   |
