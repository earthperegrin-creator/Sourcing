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

Cards use the fields from that file. Traction is shown as a bold lead, with the rest of that field underneath. Country, stage, summary, fundraising, rubric lean, website, and LinkedIn appear when those values exist.

## Actions

**No**, **Maybe**, and **Yes** are the primary row. Each one records a vote and the card eases to the next company.

**Dig** sits above that row. It means need more info. It parks the company for follow-up and does not add a Yes, Maybe, or No score. The Done screen shows those three counts, then lists flagged companies on their own.

Undo sits in the header. Review again clears the queue without replaying the intro.
