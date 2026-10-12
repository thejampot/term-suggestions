# Term Suggestions - Technical Test

Small TypeScript application implementing the term suggestion algorithm described in the technical test.

The project includes:

- A reusable TypeScript service containing the business logic
- A simple Next.js interface to demonstrate the algorithm
- Automated tests covering the main edge cases
- A clean separation between UI and algorithmic logic

## Live Demo

Try the application here:

https://term-suggestions.vercel.app

## Objective

Given a search term and a list of possible terms, return the N closest matches.

Similarity is determined by the minimum number of character replacements required to match the search term.

Character insertion is not considered, therefore terms shorter than the search term are excluded.

## Ranking

Suggestions are ranked using the following rules:

1. Lowest difference score
2. Closest length to the search term
3. Alphabetical order

## How the algorithm works

For candidates with the same length as the search term, characters are compared directly.

For candidates longer than the search term, a sliding window is used.

The window has the same length as the search term and moves through the candidate word.

For each position, the algorithm counts how many characters would need to be replaced.

The lowest score found is kept.

Example:

Search term:

`gros`

Candidate:

`agressif`

Possible 4-character sections:

- `agre`
- `gres`
- `ress`
- `essi`
- `ssif`

The best match is:

`gres`

Compared with:

`gros`

Only one character differs, therefore the score is:

`1`

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

1. `gros` — score 0
2. `gras` — score 1

## Project structure

```text
src/
├── app/
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── SearchForm.tsx
│   └── SuggestionList.tsx
├── services/
│   ├── TermSuggestionService.ts
│   └── TermSuggestionService.test.ts
└── types/
    └── suggestion.ts