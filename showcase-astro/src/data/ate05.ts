import type { PortfolioProject } from "../types/project";

const ate05Project: PortfolioProject = {
  slug: "ate05",
  title: "ATE05 Restaurant POS",
  summary:
    "Offline-first restaurant POS with React, Tauri and SQLite. Order, checkout and kitchen workflows, encrypted backups and Windows thermal printing.",
  tags: ["desktop", "fullstack", "payments"],
  featured: true,
  sortOrder: 1,
  status: "In use; actively developed",
  githubUrl: "https://github.com/piccolojnr/ate05",
  coverImage:
    "https://raw.githubusercontent.com/piccolojnr/ate05/main/docs/artifacts/menu-1024-populated.png",
  images: [
    "https://raw.githubusercontent.com/piccolojnr/ate05/main/docs/artifacts/menu-1024-populated.png",
    "https://raw.githubusercontent.com/piccolojnr/ate05/main/docs/artifacts/checkout-receipt-result.png",
    "https://raw.githubusercontent.com/piccolojnr/ate05/main/docs/artifacts/kitchen-board-1440.png",
  ],
  body: `# ATE05 Restaurant POS

## The problem

Restaurant staff need to take orders, record payments, coordinate the kitchen and print receipts without depending on a reliable internet connection.

## What I built

- A desktop point-of-sale application with order, table, checkout and kitchen workflows.
- Partial and mixed payment handling, including cash change calculations.
- Local SQLite persistence with shared business rules and typed data access.
- Encrypted portable backups and Google Drive backup integration.
- Network ESC/POS printing and native installed Windows printer queues.

## Architecture and decisions

The interface uses React and TypeScript, packaged with Tauri. SQLite is the local source of truth. Shared domain modules hold money calculations and restaurant rules, while the desktop bridge handles native capabilities.

Payments and printing are separate operations. A printer failure does not discard a recorded payment or receipt; staff can retry printing the persisted document.

Windows USB and Bluetooth printers use the installed printer queue, letting staff select the printer without discovering a network address.

## Delivery and verification

The application has been installed for restaurant use. Development includes database and domain checks, Rust tests and browser workflow checks. Windows installers are internally signed for distribution.

## Stack

React, TypeScript, Tauri, Rust, SQLite, Drizzle, Vitest and Playwright.

## Screenshots

The gallery shows the menu, partial payment checkout and kitchen board using demo data.

[Source code](https://github.com/piccolojnr/ate05) · [Printer guide](https://github.com/piccolojnr/ate05/blob/main/docs/printer-configuration.md)`,
  repoFolderUrl: "https://github.com/piccolojnr/ate05",
};

export default ate05Project;
