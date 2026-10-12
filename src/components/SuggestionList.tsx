import { Suggestion } from "@/types/suggestion";

interface SuggestionListProps {
  suggestions: Suggestion[];
  hasSearched: boolean;
}

export default function SuggestionList({
  suggestions,
  hasSearched,
}: SuggestionListProps) {
  if (!hasSearched) {
    return (
      <div className="emptyState">
        Run a search to display the best suggestions.
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="emptyState">
        No matching suggestions found.
      </div>
    );
  }

  return (
    <div className="resultsCard">
      {suggestions.map((suggestion, index) => (
        <div className="resultRow" key={suggestion.term}>
          <div className="resultLeft">
            <div className="resultIndex">{index + 1}</div>

            <div>
              <div className="resultTerm">{suggestion.term}</div>
              <div className="resultMeta">
                Length difference: {suggestion.lengthDifference}
              </div>
            </div>
          </div>

          <div
            className={
              suggestion.score === 0
                ? "scoreBadge perfect"
                : "scoreBadge"
            }
          >
            score {suggestion.score}
          </div>
        </div>
      ))}
    </div>
  );
}