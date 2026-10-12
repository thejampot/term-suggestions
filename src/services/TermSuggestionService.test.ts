import { describe, expect, it } from "vitest";
import { TermSuggestionService } from "./TermSuggestionService";

describe("TermSuggestionService", () => {
  it("returns 0 for an exact match", () => {
    expect(
      TermSuggestionService.getDifferenceScore("gros", "gros")
    ).toBe(0);
  });

  it("returns 1 when one character differs", () => {
    expect(
      TermSuggestionService.getDifferenceScore("gros", "gras")
    ).toBe(1);
  });

  it("finds the best matching section inside a longer word", () => {
    expect(
      TermSuggestionService.getDifferenceScore("gros", "agressif")
    ).toBe(1);
  });

  it("finds the best alignment for graisse and agressif", () => {
    expect(
      TermSuggestionService.getDifferenceScore(
        "graisse",
        "agressif"
      )
    ).toBe(4);
  });

  it("returns 2 for graisse", () => {
    expect(
      TermSuggestionService.getDifferenceScore("gros", "graisse")
    ).toBe(2);
  });

  it("rejects candidates shorter than the search term", () => {
    expect(
      TermSuggestionService.getDifferenceScore("gros", "gro")
    ).toBeNull();
  });

  it("returns the expected result from the technical test", () => {
    const result = TermSuggestionService.getSuggestions(
      "gros",
      [
        "gros",
        "gras",
        "graisse",
        "agressif",
        "go",
        "ros",
        "gro",
      ],
      2
    );

    expect(result.map((item) => item.term)).toEqual([
      "gros",
      "gras",
    ]);
  });

  it("uses length as the second sorting criterion", () => {
    const result = TermSuggestionService.getSuggestions(
      "gros",
      ["agressif", "gras"],
      2
    );

    expect(result.map((item) => item.term)).toEqual([
      "gras",
      "agressif",
    ]);
  });

  it("uses alphabetical order as the final tie breaker", () => {
    const result = TermSuggestionService.getSuggestions(
      "gros",
      ["tros", "bros"],
      2
    );

    expect(result.map((item) => item.term)).toEqual([
      "bros",
      "tros",
    ]);
  });
});