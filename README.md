# sourcing

Personal deal-sourcing and company-review app. Mobile-first, phone-width, Arctic palette: midnight indigo, pearl snow, a restrained cyan line.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). On a wide screen the UI sits in a phone frame. `npm run build` typechecks and writes `dist/`.

## Flow

1. **Garden stroll.** `public/intro/arctic-garden-stroll.mp4` autoplays muted and full-bleed inside the phone (`playsInline` on mobile). It is the opening footage, not a still. Near the end the frame fades to black. Skip is at the bottom.
2. **Title.** A dark screen with the word **sourcing**. It holds, then continues. Tap to go on.
3. **Review.** One company card at a time, seeded from `src/data/companies.json`.

The twenty Taiwan companies, in file order: Skymizer, Gallopwave, ioNetworks, AIWin, KeyXentic, Ubiik, FlowVIEW Tek, Wolley, LIPS, Hihealth, Calyxtechs, ECOLUX, Huede Healthtech, RelaJet / Otoadd, EMCT, BigGo, PYRAS TECHNOLOGY, Develop, Aiii, DWTEK.

Cards use that file, including the structured 104 fields. Headcount, open jobs, and hiring activity sit in a 104.com metric row under the name. Unknown headcount stays unknown. Summary, signals, fundraising, team, why interesting, and decision hooks are short bullets. Fundraising and team say when the record does not have them. Details opens the original summary, the raw traction line, and sources. Rubric lean is the badge on the card.

## Actions

**No**, **Maybe**, and **Yes** are the primary row. Each one records a vote and the card eases to the next company.

**Dig** sits above that row. It means need more info. It parks the company for follow-up and does not add a Yes, Maybe, or No score. The Done screen shows those three counts, then lists flagged companies on their own.

Undo sits in the header. Review again clears the queue without replaying the intro.
