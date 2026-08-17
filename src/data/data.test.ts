import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { capabilityGroups, isProven } from "./capabilities";
import { principles } from "./principles";
import { faqs, navItems } from "./site";

/**
 * These guard the one claim the site makes that is easy to break by accident:
 * that every capability marked as proven points at a project that exists here.
 * A renamed project would otherwise leave a capability quietly citing nothing.
 */

const shortTitles = readdirSync("src/content/work")
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const source = readFileSync(`src/content/work/${file}`, "utf8");
    const match = source.match(/^shortTitle:\s*"(.+)"$/m);
    if (!match) throw new Error(`${file} has no shortTitle`);
    return match[1];
  });

describe("capabilities", () => {
  it("cites only projects that exist", () => {
    capabilityGroups
      .flatMap((group) => group.items)
      .flatMap((item) => item.provenBy)
      .forEach((title) => expect(shortTitles).toContain(title));
  });

  it("states what every capability was used for, proven or not", () => {
    capabilityGroups
      .flatMap((group) => group.items)
      .forEach((item) => expect(item.proof.length).toBeGreaterThan(20));
  });

  it("treats a capability with no project and no site use as unproven", () => {
    const unproven = capabilityGroups
      .flatMap((group) => group.items)
      .filter((item) => !isProven(item));

    unproven.forEach((item) => {
      expect(item.provenBy).toHaveLength(0);
      expect(item.thisSite).toBeFalsy();
    });
  });

  it("keeps group ids unique, since they anchor the headings", () => {
    const ids = capabilityGroups.map((group) => group.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("principles", () => {
  it("gives every principle a claim, a cost and evidence", () => {
    expect(principles.length).toBeGreaterThanOrEqual(4);
    principles.forEach((principle) => {
      expect(principle.claim.length).toBeGreaterThan(20);
      expect(principle.body.length).toBeGreaterThan(80);
      expect(principle.evidence.length).toBeGreaterThan(40);
    });
  });
});

describe("navigation and questions", () => {
  it("keeps section ids unique", () => {
    const ids = navItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every nav item a plain accessible name", () => {
    navItems.forEach((item) => expect(item.accessibleName.length).toBeGreaterThan(4));
  });

  it("answers every question it asks", () => {
    faqs.forEach((faq) => {
      expect(faq.question.endsWith("?")).toBe(true);
      expect(faq.answer.length).toBeGreaterThan(60);
    });
  });
});
