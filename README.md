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
3. **Review.** One company card at a time. The queue loads from Supabase `public.companies`, in the same order as `src/data/companies.json`. If that request fails or comes back empty, the app uses that JSON file (98 Taiwan companies).

Cards keep the larger body type, short bullets, and the 104.com metric row (headcount, open jobs, hiring). Unknown headcount stays unknown. A compact icon row sits under the company name: website, TwinCN incorporation, a **104** badge, and LinkedIn. Each opens in a new tab and hides when its URL is null. Summary, signals, fundraising, team, why interesting, and decision hooks stay as bullets. The first twenty slugs still use the shorter handwritten briefs. Details opens the original summary, the raw traction line, and sources.

## Actions

**No**, **Maybe**, and **Yes** are the primary row. The first tap opens a **Note** field. Type a comment, or leave it empty, then tap **Save** or tap the same vote again. The card then moves on.

**Dig** sits above that row. It means need more info. The same note field opens, and the save writes `dig: true` without a Yes / Maybe / No score.

The note is a normal textarea (`inputMode="text"`) with `data-voice-target="review-comment"` so a later ElevenLabs control can attach to it. This build does not call ElevenLabs.

Votes upsert one row per company in `public.reviews` (`company_id`, `vote`, `dig`, `comment`). A refresh resumes companies that already have a vote or a dig. Undo puts the last card back in this session. Review again clears the on-screen queue without replaying the intro and without deleting saved rows. The next pass overwrites them on save.

If the browser has no Supabase client, the header shows **Local** and votes stay on this device.

## Supabase

```bash
cp .env.example .env.local
```

`.env.example` has the project URL and the publishable anon key:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Do not put the service-role key in a `VITE_` variable. The anon key is meant for the browser. Row level security allows anon to read `companies` and to read, insert, and update `reviews`.

### Vercel

Vite inlines `VITE_*` values at **build** time. In the Vercel project, open **Settings → Environment Variables** and add both names for Production and Preview, using the values in `.env.example`. Save, then redeploy so a new build picks them up. Changing the variables without a new deployment leaves the previous values in the bundle.
