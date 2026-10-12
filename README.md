# Term Suggestions - Technical Test

Small TypeScript application implementing the term suggestion algorithm described in the technical test.

## Objective

Given a search term and a list of possible terms, return the N closest matches.

Similarity is determined by the minimum number of character replacements required to match the search term.

Character insertion is not considered, therefore terms shorter than the search term are excluded.

## Ranking

Suggestions are ranked using:

1. Lowest difference score
2. Closest length to the search term
3. Alphabetical order

## Implementation

The business logic is contained in:

`src/services/TermSuggestionService.ts`

The user interface is intentionally separated from the algorithm so the suggestion service can be tested and reused independently.

For candidates longer than the search term, a sliding window is used to compare every possible substring of the same length as the search term.

## Example

Search term:

`gros`

Available terms:

- gros
- gras
- graisse
- agressif
- go
- ros
- gro

Number of suggestions:

`2`

Expected result:

1. gros — score 0
2. gras — score 1

## Run locally

```bash
npm install
npm run dev