import { Suggestion } from "@/types/suggestion";

export class TermSuggestionService {
  static getDifferenceScore(
    searchTerm: string,
    candidate: string
  ): number | null {
    const search = searchTerm.toLowerCase();
    const value = candidate.toLowerCase();

    if (search.length === 0) {
      return null;
    }

    if (value.length < search.length) {
      return null;
    }

    let bestScore = Number.POSITIVE_INFINITY;

    for (
      let start = 0;
      start <= value.length - search.length;
      start++
    ) {
      const section = value.slice(start, start + search.length);

      let differences = 0;

      for (let i = 0; i < search.length; i++) {
        if (search[i] !== section[i]) {
          differences++;
        }
      }

      bestScore = Math.min(bestScore, differences);

      if (bestScore === 0) {
        break;
      }
    }

    return bestScore;
  }

  static getSuggestions(
    searchTerm: string,
    choices: string[],
    numberOfSuggestions: number
  ): Suggestion[] {
    const search = searchTerm.trim().toLowerCase();

    if (!search || numberOfSuggestions <= 0) {
      return [];
    }

    const suggestions: Suggestion[] = [];

    for (const choice of choices) {
      const term = choice.trim().toLowerCase();

      if (!term) {
        continue;
      }

      const score = this.getDifferenceScore(search, term);

      if (score === null) {
        continue;
      }

      suggestions.push({
        term,
        score,
        lengthDifference: Math.abs(term.length - search.length),
      });
    }

    suggestions.sort((a, b) => {
      if (a.score !== b.score) {
        return a.score - b.score;
      }

      if (a.lengthDifference !== b.lengthDifference) {
        return a.lengthDifference - b.lengthDifference;
      }

      return a.term.localeCompare(b.term);
    });

    return suggestions.slice(0, numberOfSuggestions);
  }
}