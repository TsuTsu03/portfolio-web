---
caseNumber: "007"
title: "The Thrift Store: Curated Resale Storefront"
shortTitle: "The Thrift Store"
summary: "Responsive resale storefront built around one-of-one inventory, visible garment condition and a shorter path from browsing to purchase."
metaDescription: "Resale storefront case study for one-of-one fashion inventory, condition-led product pages, category browsing and responsive checkout."
category: "Commerce"
sector: "E-commerce"
role: "Front-end developer, storefront architecture and interface"
businessProblem: "Resale inventory breaks the assumptions behind ordinary e-commerce templates. Most pieces are single units, sizes do not repeat, and garment condition matters more than a variant selector that can only offer one choice."
solution: "The storefront treats one-of-one stock as the default. Category browsing accepts a catalogue that changes constantly, while product pages put condition and detail photography before the purchase decision."
ownership:
  - "Storefront information architecture and category browsing"
  - "Product detail pages built for single-unit inventory"
  - "Shopping flow and interface states"
  - "Component structure and responsive layout"
architecture:
  - decision: "Single-unit inventory as the default assumption"
    rationale: "Variant pickers on one-of-one stock add a step that can only ever have one answer. Removing them shortened the path to checkout."
  - decision: "Condition treated as primary product information"
    rationale: "It is the deciding factor in resale and the most common reason for a return, so it belongs above the fold rather than in a specification table."
technologies:
  - "Next.js"
  - "TypeScript"
  - "Tailwind CSS"
capabilities:
  - "Category browsing"
  - "Single-unit product pages"
  - "Responsive storefront"
screenshot: "../../assets/projects/thriftstore.png"
screenshotAlt: "The Thrift Store homepage showing curated second-hand fashion listings."
liveUrl: "https://thrift-store-beige.vercel.app/"
repositoryUrl: "https://github.com/TsuTsu03/thrift-store"
repositoryVisibility: "public"
status: "Deployed"
featured: false
order: 7
lastVerified: 2026-08-15
---

Resale carries a different inventory model from ordinary retail. Each piece may appear
once and disappear for good. A standard product template adds controls the catalogue
cannot use and buries the information the buyer actually needs.

### One item means one clear decision

When only one size exists, the page has no reason to ask the buyer to select it. Removing
that step shortens the path to purchase and leaves less room for confusion.

### Condition carries the weight

Condition decides the sale and often decides the return. It sits near the top of the
product page beside the photographs that support the claim.

### Evidence in the build

Commerce design shaped by the inventory itself, with a responsive component system that
stays manageable as the catalogue turns over.
