# High on Training — trainingslog Ryan

Interactieve webapp voor Ryan's trainingsschema's (schema's door coach Zlatan).
Online opslag via Supabase; jij en Zlatan zien dezelfde live gegevens.

## Blokken

De app opent op **blok 3** (oktober 2026). Met de schakelaar bovenaan ga je
terug naar **blok 1** (juli 2026) en **blok 2** (september 2026), allebei
archief, en weer terug.

Elk blok heeft zijn eigen logboek:

| Blok | Supabase-rij (`workout_logs.id`) | localStorage-sleutel |
|------|----------------------------------|----------------------|
| Blok 1 | `ryan-blok1` | `blok1-ryan-log` |
| Blok 2 | `ryan-blok2` | `blok2-ryan-log` |
| Blok 3 | `ryan-blok3` | `blok3-ryan-log` |

De rij voor een nieuw blok wordt automatisch aangemaakt zodra je er voor het
eerst iets in logt. Oudere blokken blijven daardoor volledig ongemoeid — en
blijven ook bewerkbaar.

Blok 3 heeft 3 trainingsdagen plus een mobiliteitsdag voor de rustdagen; de
blokkaart en tellers passen zich aan het aantal dagen van het blok aan. Een
blok kan een eigen uitlegkaart hebben (`notes`, zoals RIR, tempo en
progressie) en afvinklijsten (`kind: "check"`) voor mobiliteit en warming-up.

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
