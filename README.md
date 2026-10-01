# sourcing

Personal deal-sourcing and company-review app. Mobile-first, dark, built as a research card rather than a glow template.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). On a wide screen the UI sits in a phone frame. `npm run build` typechecks and writes `dist/`.

## Flow

1. **Garden stroll.** On the first visit in a browser session, `public/intro/arctic-garden-stroll.mp4` autoplays muted and full-bleed inside the phone (`playsInline` on mobile). It is the opening footage, not a still. Near the end the frame fades to black. Skip is at the bottom.
2. **Title.** The screen is dark, the word **sourcing** appears, and a thin blue line glides across. It holds, then continues. Tap to go on.
3. **Review.** One company card at a time. The queue loads from Supabase `public.companies` (`select *`), in the same order as `src/data/companies.json`. If that request fails or comes back empty, the app uses that JSON file (98 Taiwan companies). A return to the queue in the same session skips the garden and the title and opens on the first company that has no `public.reviews` row.

Each card is the brief. On the main card, not a second sheet: the name, `kind_plain` and `stage` when those fields are set, a **First Read** block when `first_read` is set (that paragraph, then `first_read_evidence` strings as skim bullets; the block is omitted when `first_read` is null), the full `what_it_is` (it wraps; it is not cut to the first sentence or one line), 104 headcount and open jobs only when that number exists, the decision hooks in full, and — when the field is non-empty and not a repeat of `what_it_is` — one bullet each from fundraising, traction, and team. Empty fields are skipped. The card body scrolls. No, Maybe, Yes, Dig, and the comment stay pinned. If `what_it_is` is null, the sentence is taken only from that row's summary, sector, and decision hooks. Links are website, TwinCN, a small **104** badge (`url_104` or `job_board_104_url`), and LinkedIn. A null URL is omitted. A null 104 number is omitted, and the card does not print "Unknown".

## Actions

**No**, **Maybe**, and **Yes** are the vote row. **Dig** sits above them and means need more info. It is not a fourth vote.

The comment box is always on screen (`data-voice-target="review-comment"`). The first tap arms a choice. Tap it again, or tap **Save**, to upsert `public.reviews` (`company_id`, `vote`, `dig`, `comment`). This build does not call ElevenLabs.

Votes upsert one row per company in `public.reviews` (`company_id`, `vote`, `dig`, `comment`). A refresh, or a later visit, opens the first company with no review row. When every company has one, the queue shows a done state instead of the first card. Undo puts the last card back in this session. Review again clears the on-screen queue without replaying the intro and without deleting saved rows. The next pass overwrites them on save.

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
