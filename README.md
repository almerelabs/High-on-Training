# High on Training — trainingslog Ryan

Interactieve webapp voor Ryan's trainingsschema's (schema's door coach Zlatan).
Online opslag via Supabase; jij en Zlatan zien dezelfde live gegevens.

## Blokken

De app opent op **blok 2** (september 2026). Met de schakelaar bovenaan ga je
terug naar **blok 1** (juli 2026, archief) en weer terug.

Elk blok heeft zijn eigen logboek:

| Blok | Supabase-rij (`workout_logs.id`) | localStorage-sleutel |
|------|----------------------------------|----------------------|
| Blok 1 | `ryan-blok1` | `blok1-ryan-log` |
| Blok 2 | `ryan-blok2` | `blok2-ryan-log` |

De rij voor blok 2 wordt automatisch aangemaakt zodra je er voor het eerst iets
in logt. Blok 1 blijft daardoor volledig ongemoeid — en blijft ook bewerkbaar.

Een nieuw blok toevoegen: zet het schema in `src/App.jsx` in een nieuwe
`DAYS_B…`-constante, voeg een regel toe aan `BLOKS`, en zet `DEFAULT_BLOK` op
de index van het blok dat de startpagina moet zijn.

## Lokaal draaien

```bash
npm install
npm run dev
```

Open de link die verschijnt (meestal http://localhost:5173).

## Bouwen voor productie

```bash
npm run build
```

De statische site staat dan in de map `dist/`.

## Online zetten (Netlify)

1. Zet dit project in een GitHub-repo (zie stappen die je van Claude kreeg).
2. Netlify → Add new site → Import from GitHub → kies de repo.
3. Build command: `npm run build` — Publish directory: `dist`.
4. Deploy. Je krijgt een gratis link die je met Zlatan deelt.

De Supabase-URL en -sleutel staan al ingevuld bovenin `src/App.jsx`.
