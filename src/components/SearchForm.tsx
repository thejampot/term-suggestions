"use client";

import { FormEvent, useState } from "react";
import { TermSuggestionService } from "@/services/TermSuggestionService";
import { Suggestion } from "@/types/suggestion";
import SuggestionList from "./SuggestionList";

const DEFAULT_TERMS = [
  "gros",
  "gras",
  "graisse",
  "agressif",
  "go",
  "ros",
  "gro",
];

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("gros");
  const [numberOfSuggestions, setNumberOfSuggestions] = useState(2);

  const [termsText, setTermsText] = useState(
    DEFAULT_TERMS.join("\n")
  );

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const choices = termsText
      .split("\n")
      .map((term) => term.trim())
      .filter(Boolean);

    const result = TermSuggestionService.getSuggestions(
      searchTerm,
      choices,
      numberOfSuggestions
    );

    setSuggestions(result);
    setHasSearched(true);
  }

  return (
    <div className="pageWrapper">
      <div className="pageTitle">
        <p className="eyebrow">Technical Test</p>
        <h1>Term Suggestions</h1>
      </div>

      <div className="splitCard">
        <div className="leftPanel">
          <h2>Find the best matches</h2>
          <p className="panelText">
            Enter a search term and compare it against a list of
            available terms using character replacement scoring.
          </p>

          <form onSubmit={handleSubmit} className="formBlock">
            <div className="field">
              <label htmlFor="searchTerm">Search term</label>
              <input
                id="searchTerm"
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                required
              />
            </div>

            <div className="field">
              <label htmlFor="numberOfSuggestions">
                Number of suggestions
              </label>
              <input
                id="numberOfSuggestions"
                type="number"
                min="1"
                value={numberOfSuggestions}
                onChange={(event) =>
                  setNumberOfSuggestions(
                    Math.max(1, Number(event.target.value))
                  )
                }
              />
            </div>

            <div className="field">
              <label htmlFor="terms">Available terms</label>
              <textarea
                id="terms"
                value={termsText}
                onChange={(event) =>
                  setTermsText(event.target.value)
                }
                rows={8}
              />
            </div>

            <button type="submit" className="submitButton">
              Find suggestions
            </button>
          </form>
        </div>

        <div className="rightPanel">
          <h2>Results</h2>
          <p className="panelText lightText">
            Matching results are sorted by difference score, then
            by closest length, then alphabetically.
          </p>

          <SuggestionList
            suggestions={suggestions}
            hasSearched={hasSearched}
          />
        </div>
      </div>
    </div>
  );
}