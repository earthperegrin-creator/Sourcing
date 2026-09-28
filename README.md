# sourcing

Personal deal-sourcing and company-review app. Mobile-first, phone-width, Arctic palette: midnight indigo, pearl snow, a restrained cyan line.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). On a wide screen the UI sits in a phone frame. `npm run build` typechecks and writes `dist/`.

## Flow

1. **Garden stroll.** `public/intro/arctic-garden-stroll.mp4` plays full-bleed in the phone. Near the end the frame darkens. Skip is at the bottom if you do not want to wait.
2. **Title.** A dark screen with the word **sourcing**. It holds, then continues. Tap to go on.
3. **Review.** One company card at a time, seeded from `src/data/companies.json`.

The five companies, in order:

- Tokuiten
- HistoSonics
- EF Polymer
- Green Chem
- PandaDoc

Cards use the fields from that file: country, stage, summary, traction, fundraising, team, rubric lean, website, and LinkedIn when those values exist.

## Actions

**No**, **Maybe**, and **Yes** are the review. Each one records a vote and advances to the next card.

**Dig** means need more info. It is not a fourth vote. It parks the company for follow-up, advances the queue, and does not add a No / Maybe / Yes score. The closing screen lists votes on their own and keeps “Need more info” separate.

Undo sits in the header. Review again clears the queue without replaying the intro.
