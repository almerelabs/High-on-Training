import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────  SCHEMA (Blok 1 — Ryan, juli 2026)  ───────────────────────── */

const S = (pct, kg, reps, rust) => ({ pct, kg, reps, rust });

const STRETCH_FULL = [
  { name: "Worlds greatest stretch", dose: "5 per been" },
  { name: "Adductor rock back", dose: "10 per been" },
  { name: "90/90 hip rotation", dose: "6 per kant" },
  { name: "Couch stretch", dose: "30 sec" },
  { name: "Knees over toes", dose: "30 sec" },
];

const DAYS_B1 = [
  {
    id: "d1", nr: 1, name: "Full Body", sub: "Kracht", type: "kracht",
    ex: [
      {
        id: "d1a", aitips: ["Sta precies in het midden van de stang, voeten heupbreedte.", "Zet je romp rechterop dan bij een gewone deadlift — dat spaart je onderrug.", "Duw met je hielen door de grond, alsof je de vloer wegduwt.", "Houd je rug recht: nooit bol trekken om het gewicht los te rukken.", "Kijk vooruit, niet omlaag, zodat je nek en rug in lijn blijven."], desc: "Je staat ín een zeshoekige stang en tilt het gewicht op door je benen te strekken. Traint je hele achterkant: benen, billen en rug.", kind: "str", name: "Hex-bar deadlift", sets: 4, max5: "100 kg", max1: "112,5 kg",
        wk: [S("62,5%", "70", "6", "150s"), S("62,5%", "70", "6", "150s"), S("65%", "72,5", "6", "150s"), S("65%", "72,5", "6", "150s")],
        tip: "Gebruik 2 opwarmsetjes (50% en 75% van werksetgewicht). Daarna werken met aangegeven gewicht. Altijd minstens 2 RIR.",
      },
      {
        id: "d1b", aitips: ["Knijp je schouderbladen samen en 'in je achterzakken' — stevige basis.", "Ellebogen ~45-75° van je lijf, niet wijd gespreid: spaart je schouders.", "Voeten stevig op de grond, billen op de bank aangespannen.", "Laat de stang gecontroleerd zakken tot je borst, niet stuiteren.", "Duw hem in een lichte boog omhoog, richting je schouders."], desc: "Liggend op een bank duw je de halterstang van je borst recht omhoog. Dé oefening voor borst, schouders en triceps.", kind: "str", name: "Bench press", sets: 3, max5: "90 kg", max1: "95 kg",
        wk: [S("52,5%", "50", "6-10", "120s"), S("52,5%", "50", "6-10", "120s"), S("55%", "52,5", "6-10", "120s"), S("55%", "52,5", "6-10", "120s")],
        tip: "Gebruik 2 opwarmsetjes (50% en 75% van werksetgewicht). Altijd minstens 2 RIR. Tempo: gecontroleerd zakken en gecontroleerd omhoog.",
      },
      {
        id: "d1c", aitips: ["Begin met een dead hang en trek eerst je schouderbladen omlaag.", "Trek je borst naar de stang, niet alleen je kin eroverheen.", "Geen zwaai of momentum — rustig omhoog én rustig omlaag.", "Houd je schouders laag, niet optrekken richting je oren.", "Kies zoveel hulp (band/machine) dat je nette, volledige reps haalt."], desc: "Jezelf optrekken aan een stang tot je kin erboven komt. Assisted = een band of machine helpt mee. Voor rug en armen.", kind: "str", name: "(Assisted) pull-up", sets: 3,
        wk: [S("80%", "BW", "8-10", "120s"), S("80%", "BW", "8-10", "120s"), S("82,5%", "BW", "8-10", "120s"), S("82,5%", "BW", "8-10", "120s")],
        tip: "Eén opwarmset met scapula pull-ups. Daarna 3 setjes pull-ups. Probeer in de eerste set maximale pull-ups met eigen lichaamsgewicht te doen en match daarna de reps assisted.",
      },
      {
        id: "d1d", aitips: ["Laat langzaam zakken (4 tellen), 2 tellen vasthouden, dan omhoog.", "Houd de kettlebell dicht tegen je borst, ellebogen naar binnen.", "Knieën naar buiten duwen in lijn met je tenen.", "Rug recht en borst omhoog, ook onderin de squat.", "Zak zo diep als comfortabel kan zonder je rug te krommen."], desc: "Squat met een kettlebell tegen je borst. Traint benen en billen, en opent je heupen.", kind: "str", name: "Goblet squat", sets: 3, tag: "Tempo 4-2-1-0", max5: "30 kg", max1: "35 kg",
        wk: [S("60%", "20", "8-10", "90s"), S("60%", "20", "8-10", "90s"), S("62,5%", "22,5", "8-10", "90s"), S("62,5%", "22,5", "8-10", "90s")],
        tip: "LET OP: gewicht is laag, maar tempo LANGZAAM. 4 seconden zakken, 2 seconden vasthouden en dan omhoog. Dit gaat helpen je heupen te openen. Kwaliteit boven kwantiteit.",
      },
      {
        id: "d1e", aitips: ["Stel de stoel zo in dat de handvatten op schouderhoogte starten.", "Duw recht omhoog, niet naar voren — pols boven elleboog.", "Houd je onderrug tegen het kussen, kern licht aangespannen.", "Gecontroleerd omhoog en langzaam terug, geen zwaai.", "Zak tot je ellebogen net onder schouderhoogte zijn."], desc: "Zittend duw je het gewicht recht boven je hoofd. Traint je schouders en triceps.", kind: "str", name: "Shoulder press machine", sets: 3, max5: "65 kg", max1: "75 kg",
        wk: [S("60%", "45", "6-10", "90s"), S("60%", "45", "6-10", "90s"), S("62,5%", "47,5", "6-10", "90s"), S("62,5%", "47,5", "6-10", "90s")],
        tip: "Gebruik 2 opwarmsetjes (50% en 75% van werksetgewicht). Daarna werken met aangegeven gewicht. Altijd minstens 2 RIR. Tempo: gecontroleerd zakken en gecontroleerd omhoog.",
      },
      {
        id: "d1s", aitips: ["Adem rustig door tijdens de goblet squat hold — niet inhouden.", "Duw je knieën met je ellebogen naar buiten, dat opent je heupen.", "Houd je hielen plat op de grond, gewicht op je middenvoet.", "Rechte rug, borst omhoog: kwaliteit boven tijd.", "Voelt 45 sec te zwaar? Doe kortere blokjes met dezelfde houding."], desc: "Vaste reeks rekoefeningen voor soepele heupen en benen. Rustig uitvoeren, blijven ademen.", kind: "stretch", name: "Stretch cycle", rounds: 3, tag: "Los uit te voeren",
        items: [
          { name: "Goblet squat hold", dose: "16 kg · 45 sec" },
          { name: "Adductor rock back", dose: "10 per been" },
          { name: "90/90 hip rotation", dose: "6 per kant" },
        ],
        tip: "Bij de goblet squat hold is het belangrijk om met je ellebogen je knieën naar buiten te duwen. Word comfortabel in die positie; als het kan maak je je rug recht (op den duur). Doe drie ronden van elke stretchoefening.",
      },
    ],
  },
  {
    id: "d2", nr: 2, name: "Interval run", sub: "Cardio", type: "cardio",
    ex: [
      {
        id: "d2r", aitips: ["Begin echt rustig in de inloop — je lichaam moet opwarmen.", "Verdeel je energie: niet de eerste interval al voluit.", "Land onder je heup met korte, snelle pasjes.", "Gebruik de 90 sec rust echt om te herstellen, wandel desnoods.", "Adem ritmisch; kun je nog een paar woorden zeggen, dan zit je goed."], desc: "Korte, snelle stukken hardlopen met rust ertussen. Maakt je sneller en fitter.", kind: "interval", name: "Interval run",
        warmup: "1 km rustig inlopen (zone 2)", dist: "600 m", rest: "90 sec wandelen of rustig joggen",
        wk: [{ n: 6, tempo: "5:00" }, { n: 6, tempo: "4:55" }, { n: 7, tempo: "5:00" }, { n: 7, tempo: "4:55" }],
        tip: "Set 1 is inlopen: 1 km rustig. Daarna 600 m rennen op aangegeven tempo, gevolgd door 90 sec wandelen of rustig joggen. Herhaal 6× (week 1 en 2) of 7× (week 3 en 4).",
      },
      {
        id: "d2s", aitips: ["Rustig bewegen, nooit doorveren of forceren in een rek.", "Blijf ademen — uitademen als je iets dieper de rek in zakt.", "Voel rek, geen pijn; scherpe pijn is het signaal om terug te gaan.", "Doe links en rechts even lang voor balans.", "Drie volle ronden: alle oefeningen af, dan weer van voren af aan."], desc: "Vaste reeks rekoefeningen voor soepele heupen en benen. Rustig uitvoeren, blijven ademen.", kind: "stretch", name: "Stretch cycle (avond)", rounds: 3, items: STRETCH_FULL,
        tip: "Dit doe je in de avond, of in ieder geval een paar uur na de run. Drie ronden: loop alle oefeningen af en begin daarna weer vanaf de eerste.",
      },
    ],
  },
  {
    id: "d3", nr: 3, name: "Full Body", sub: "Kracht", type: "kracht",
    ex: [
      {
        id: "d3a", aitips: ["Stap naar achteren en zak recht omlaag, knie richting de grond.", "Voorste knie boven je enkel, niet ver voorbij je tenen.", "Houd je romp rechtop, borst omhoog, blik vooruit.", "Duw jezelf omhoog via de hiel van je voorste voet.", "Begin licht: balans eerst, gewicht daarna."], desc: "Je stapt naar achteren, zakt door beide knieën en komt weer omhoog. Traint benen en billen, één been tegelijk.", kind: "str", name: "Lunge", sets: 3, tag: "Backward stepping", max5: "50 kg", max1: "52 kg",
        wk: [S("50%", "25", "6-10 p.b.", "120s"), S("50%", "25", "6-10 p.b.", "120s"), S("52,5%", "27,5", "6-10 p.b.", "120s"), S("52,5%", "27,5", "6-10 p.b.", "120s")],
        tip: "Gebruik 1 à 2 opwarmsetjes. Daarna met aangegeven gewicht werken. Aangegeven reps zijn per been — probeer die ook te halen!",
      },
      {
        id: "d3b", aitips: ["Begin met rechte rug en borst omhoog, schouders laag.", "Trek het gewicht naar je buik en knijp je schouderbladen samen.", "Leid de beweging met je ellebogen, niet met je handen.", "Laat langzaam terug tot je armen bijna gestrekt zijn.", "Geen rug- of romp­zwaai: je rug blijft stil."], desc: "Zittend trek je het gewicht naar je toe, alsof je roeit. Traint je rug en biceps.", kind: "str", name: "Machine row", sets: 3, max5: "70 kg", max1: "80 kg",
        wk: [S("62,5%", "50", "6-10", "120s"), S("62,5%", "50", "6-10", "120s"), S("65%", "52,5", "6-10", "120s"), S("65%", "52,5", "6-10", "120s")],
        tip: "Gebruik 2 opwarmsetjes (50% en 75% van werksetgewicht). Altijd minstens 1 RIR. Tempo C-0-C-0.",
      },
      {
        id: "d3c", aitips: ["Bankje op ~30°, niet te steil, anders wordt het schouderwerk.", "Start met de dumbbells boven je borst, polsen recht.", "Ellebogen iets ingetrokken, gecontroleerd laten zakken.", "Duw omhoog tot de dumbbells elkaar bijna raken.", "Kies gewicht waarmee je alle reps netjes haalt."], desc: "Bankdrukken met losse dumbbells op een schuin bankje. Legt de nadruk op je bovenborst en schouders.", kind: "str", name: "Incline DB press", sets: 3, max5: "30 kg", max1: "37,5 kg",
        wk: [S("55%", "20", "6-10", "120s"), S("55%", "20", "6-10", "120s"), S("57,5%", "22,5", "6-10", "120s"), S("57,5%", "22,5", "6-10", "120s")],
        tip: "Gebruik 1 à 2 opwarmsetjes. Daarna met aangegeven gewicht werken. Kwaliteit boven alles, maar probeer wel te pushen: als je meer reps kunt, doe dat dan ook.",
      },
      {
        id: "d3d", aitips: ["Stel de machine zo in dat je knie op de draai-as ligt.", "Trek je hielen richting je billen, rustig en gecontroleerd.", "Knijp je hamstrings bovenin even aan.", "Laat langzaam terug — de terugweg traint net zo hard.", "Houd je heupen op het kussen, niet omhoog komen."], desc: "In de machine trek je je hielen richting je billen. Traint de achterkant van je bovenbenen.", kind: "str", name: "Hamstring curl", sets: 3, max5: "50 kg", max1: "55 kg",
        wk: [S("65%", "35", "6-10", "120s"), S("65%", "35", "6-10", "120s"), S("67,5%", "37,5", "6-10", "120s"), S("67,5%", "37,5", "6-10", "120s")],
        tip: "Opwarmen met 1 à 2 opwarmsetjes, daarna werken met werkgewicht. Gewicht is indicatief: als je meer kan, doe je meer.",
      },
      {
        id: "d3e", aitips: ["Kies één biceps- en één triceps­oefening die fijn voelen.", "Eerst alle biceps-reps, meteen door naar triceps, dán pas rust.", "Rustig tempo, volledige beweging, geen zwaai met je romp.", "Houd je ellebogen op hun plek, alleen je onderarm beweegt.", "Lichter gewicht, nette reps: armen reageren goed op volume."], desc: "Twee armoefeningen direct na elkaar: eerst biceps (buigen), meteen triceps (strekken), dán pas rust.", kind: "str", name: "Superset armen (naar keus)", sets: 3, max5: "15 kg", max1: "20 kg",
        wk: [S("65%", "12,5", "8-12", "60s"), S("65%", "12,5", "8-12", "60s"), S("67,5%", "12,5", "8-12", "60s"), S("67,5%", "12,5", "8-12", "60s")],
        tip: "Meteen werken. Kies de biceps- en tricepsoefening die jij het lekkerst vindt en doe daar supersetjes mee: eerst biceps, dan meteen triceps, en dan pas 60 sec rust. Repeat.",
      },
    ],
  },
  {
    id: "d4", nr: 4, name: "Long run", sub: "Cardio · zone 2", type: "cardio",
    ex: [
      {
        id: "d4r", aitips: ["Blijf echt in zone 2 — je moet nog kunnen praten tijdens het lopen.", "Start langzamer dan je wilt; tempo bewaren is de kunst.", "Korte, ontspannen pasjes, land onder je lichaam.", "Houd je hartslag in de gaten, niet je tempo, dat is leidend.", "Drink en eet wat als de afstand oploopt richting 10-11 km."], desc: "Lange, rustige duurloop op lage hartslag — je moet nog kunnen praten. Bouwt je motor op.", kind: "run", name: "Long run (zone 2)",
        wk: [{ dist: "8 km" }, { dist: "9 km" }, { dist: "10 km" }, { dist: "11 km" }],
        zone: "Zone 2 · ~140 hartslag",
        tip: "Opwarmen met een lichte jog, stretchen van de bilspieren en hamstrings, en vervolgens een easy run in zone 2 (~140 hartslag). Focus echt op je hartslag tijdens de run.",
      },
      {
        id: "d4s", aitips: ["Rustig bewegen, nooit doorveren of forceren.", "Blijf ademen en ontspan de spier die je rekt.", "Voel rek, geen pijn — ga bij scherpe pijn terug.", "Links en rechts even lang aanhouden.", "Doe dit een paar uur na je run of 's avonds, spieren zijn dan warm."], desc: "Vaste reeks rekoefeningen voor soepele heupen en benen. Rustig uitvoeren, blijven ademen.", kind: "stretch", name: "Stretch cycle (avond)", rounds: 3, items: STRETCH_FULL,
        tip: "Dit doe je in de avond, of in ieder geval een paar uur na de run. Drie ronden: loop alle oefeningen af en begin daarna weer vanaf de eerste.",
      },
    ],
  },
  {
    id: "d5", nr: 5, name: "Mobiliteit", sub: "Rustdag", type: "mob",
    ex: [
      {
        id: "d5s", aitips: ["Neem de tijd, dit is herstel — geen prestatie.", "Blijf ademen en ontspan bewust in elke rek.", "Voel rek, geen pijn; scherpe pijn betekent terug.", "Doe beide kanten even lang.", "Drie volle ronden zodat je op minimaal 3× per week uitkomt."], desc: "Vaste reeks rekoefeningen voor soepele heupen en benen. Rustig uitvoeren, blijven ademen.", kind: "stretch", name: "Stretch cycle", rounds: 3, items: STRETCH_FULL,
        tip: "Dit doe je op een rustdag, zodat je de stretch cycle in ieder geval 3× per week hebt gedaan. Drie ronden: loop alle oefeningen af en begin daarna weer vanaf de eerste.",
      },
    ],
  },
];

/* ─────────────────────────  SCHEMA (Blok 2 — Ryan, sep 2026)  ───────────────────────── */

/* Blok 2 werkt met vaste werkgewichten: week 1 t/m 4 hetzelfde plan. */
const F = (kg, reps, rust) => ({ kg, reps, rust });
const W4 = (v) => [v, v, v, v];

const STRETCH_B2 = [
  { name: "World's greatest stretch", dose: "5 per been" },
  { name: "Adductor rock back", dose: "10 per been" },
  { name: "90/90 hip rotation", dose: "6 per kant" },
  { name: "Couch stretch", dose: "30 sec per kant" },
  { name: "Knees over toes", dose: "30 sec per kant" },
];

const DAYS_B2 = [
  {
    id: "b2d1", nr: 1, name: "Full Body", sub: "Kracht + stretch", type: "kracht",
    intro: "Stretch cycle blijft staan. Warm je goed op en gebruik bij de eerste grote oefeningen 1 à 2 specifieke opwarmsets. Kwaliteit en snelheid gaan vóór extra reps.",
    ex: [
      {
        id: "b2d1s", kind: "stretch", name: "Stretch cycle", rounds: 3, items: STRETCH_B2, tag: "Vooraf",
        desc: "Vaste reeks rekoefeningen voor soepele heupen en benen. Rustig uitvoeren, blijven ademen.",
        aitips: [
          "Rustig en gecontroleerd door de volledige bewegingsuitslag — niet doorveren.",
          "Forceer nooit door pijn heen; rek voelen is genoeg.",
          "Bij de 90/90 draai je echt vanuit de heup, niet vanuit je onderrug.",
          "Couch stretch: kantel je bekken licht achterover en houd je romp lang.",
          "Knees over toes: hak zoveel mogelijk aan de grond, binnen comfortabele range.",
        ],
        tip: "Doorloop de volledige stretch cycle 3×, rustig en gecontroleerd. Focus op heupmobiliteit en forceer geen pijn.",
      },
      {
        id: "b2d1a", kind: "str", name: "Jumping hex bar deadlift", sets: 4, tag: "Explosief",
        wk: W4(F("50", "6", "120-150s")),
        desc: "Hex-bar deadlift die je zó explosief uitvoert dat je aan het eind loskomt van de grond. Traint snelkracht in benen, billen en rug.",
        aitips: [
          "Start elke rep vanuit stilstand op de grond — deadstop, niet stuiteren.",
          "Denk 'zo snel mogelijk omhoog', niet 'zo zwaar mogelijk'.",
          "Land zacht, door je knieën, en reset je houding voor de volgende rep.",
          "Rug recht en borst omhoog, ook als je snelheid maakt.",
          "Zakt je snelheid duidelijk in? Stop de set — dat is het signaal, niet de reps.",
        ],
        tip: "Explosieve intentie. Elke rep technisch strak; stop als snelheid duidelijk inzakt. Altijd vanuit de deadstop van de grond, dus niet bouncen.",
      },
      {
        id: "b2d1b", kind: "str", name: "Chest press machine", sets: 3,
        wk: W4(F("60", "8-12", "90-120s")),
        desc: "Zittend duw je het gewicht van je borst weg. Traint borst, schouders en triceps met veel controle.",
        aitips: [
          "Stel de stoel zo in dat de handvatten op borsthoogte staan.",
          "Schouderbladen tegen het kussen, borst omhoog.",
          "Gecontroleerd zakken (ca. 2 sec), krachtig uitstoten.",
          "Strek je ellebogen bijna, maar klap ze niet hard op slot.",
          "Blijf circa 1-2 RIR: eindig elke set met nog een rep in de tank.",
        ],
        tip: "Gecontroleerd zakken, krachtig uitstoten. Blijf circa 1-2 RIR.",
      },
      {
        id: "b2d1c", kind: "str", name: "Chin-ups", sets: 3, tag: "Max reps",
        wk: W4(F("BW", "max reps", "120s")),
        desc: "Optrekken aan de stang met je handpalmen naar je toe. Traint rug en biceps over de volledige beweging.",
        aitips: [
          "Begin in een dead hang en trek eerst je schouderbladen omlaag.",
          "Trek door tot je kin duidelijk boven de stang is — volledige ROM.",
          "Rustig laten zakken tot bijna gestrekte armen, niet laten vallen.",
          "Geen zwaai of trappen: stop de set voordat je techniek uiteenvalt.",
          "Noteer je reps per set, dat is hier je progressie.",
        ],
        tip: "Volledige ROM. Stop vóór techniek uiteenvalt; noteer reps per set.",
      },
      {
        id: "b2d1d", kind: "str", name: "Walking lunges", sets: 3, tag: "15 kg per hand",
        wk: W4(F("15", "14-20 stappen", "90-120s")),
        desc: "Lopend uitvallen met een dumbbell in elke hand. Traint benen en billen én je balans, been voor been.",
        aitips: [
          "Lange, stabiele passen — knie volgt de richting van je voet.",
          "Romp rechtop, schouders laag, kijk vooruit.",
          "Zak recht omlaag met je achterste knie, niet naar voren duiken.",
          "Duw jezelf omhoog via de hiel van je voorste voet.",
          "Het aantal stappen is totaal per set, dus ongeveer 7-10 per been.",
        ],
        tip: "Lange, stabiele passen; knie volgt de voet. Aantal stappen is totaal per set.",
      },
      {
        id: "b2d1e", kind: "str", name: "Seated dumbbell press", sets: 3, tag: "per dumbbell",
        wk: W4(F("15", "8-12", "90s")),
        desc: "Zittend duw je twee dumbbells boven je hoofd. Traint schouders en triceps, en vraagt meer stabiliteit dan een machine.",
        aitips: [
          "Zit rechtop met je onderrug tegen de rugleuning, buik licht aangespannen.",
          "Start met de dumbbells op schouderhoogte, polsen recht boven je ellebogen.",
          "Gecontroleerd omlaag, krachtig omhoog — geen zwaai met je romp.",
          "Duw recht omhoog; de dumbbells hoeven elkaar niet te raken.",
          "Zakken je ellebogen te ver door? Beperk de diepte tot net onder schouderhoogte.",
        ],
        tip: "Romp stabiel, gecontroleerd omlaag en krachtig omhoog.",
      },
    ],
  },
  {
    id: "b2d2", nr: 2, name: "Interval run", sub: "Cardio", type: "cardio",
    intro: "De kwaliteit van de 5 × 1000 m staat centraal. Start niet te hard: 5:20/km is het richttempo voor alle vijf herhalingen. Stretch pas ten minste 4 uur later.",
    ex: [
      {
        id: "b2d2r", kind: "interval", name: "Interval run", dist: "1000 m",
        warmup: "10-15 min inlopen + 3-4 versnellingen",
        cooldown: "5-10 min rustig uitlopen",
        rest: "2 min wandelen of rustig joggen",
        wk: W4({ n: 5, tempo: "5:20" }),
        desc: "Vijf stukken van 1000 m op een vast, gelijkmatig tempo, met rust ertussen. Bouwt je snelheidsuithoudingsvermogen op.",
        aitips: [
          "Begin de warming-up echt rustig en voeg pas daarna korte versnellingen toe.",
          "Loop alle vijf de 1000-meters op hetzelfde tempo — de eerste voelt te makkelijk, dat hoort.",
          "Verdeel je energie: wie interval 1 te hard loopt, verliest interval 4 en 5.",
          "Gebruik de 2 minuten rust echt om te herstellen, wandelen mag.",
          "Land onder je heup met korte, snelle pasjes en houd je schouders ontspannen.",
        ],
        tip: "5 herhalingen van 1000 m. Houd het tempo zo gelijkmatig mogelijk rond de 5:20 per km; 2 minuten rustige wandel/jogpauze. Begin rustig met inlopen en voeg dynamische loopdrills en korte versnellingen toe voordat de intervallen starten.",
      },
      {
        id: "b2d2s", kind: "stretch", name: "Stretch cycle (later op de dag)", rounds: 3, items: STRETCH_B2,
        desc: "Vaste reeks rekoefeningen voor soepele heupen en benen. Rustig uitvoeren, blijven ademen.",
        aitips: [
          "Minimaal 4 uur ná de intervaltraining, anders rek je in vermoeide spieren.",
          "Rustig bewegen, nooit doorveren of forceren in een rek.",
          "Blijf ademen — uitademen als je iets dieper de rek in zakt.",
          "Doe links en rechts even lang voor balans.",
          "Drie volle ronden: alle oefeningen af, dan weer van voren af aan.",
        ],
        tip: "Minimaal 4 uur na de intervaltraining. Gebruik dezelfde stretch cycle als op dag 1: drie ronden, loop alle oefeningen af en begin daarna weer vanaf de eerste.",
      },
    ],
  },
  {
    id: "b2d3", nr: 3, name: "Full Body", sub: "Kracht", type: "kracht",
    intro: "Warm de eerste compoundoefeningen specifiek op. Bij de superset telt kwaliteit: stop de set zodra de uitvoering duidelijk verslechtert.",
    ex: [
      {
        id: "b2d3a", kind: "str", name: "Goblet squat", sets: 3, tag: "3 sec omlaag · explosief omhoog",
        wk: W4(F("passend", "15", "90s")),
        desc: "Squat met een kettlebell of dumbbell tegen je borst. Nu niet traag-en-zwaar zoals in blok 1, maar rustig zakken en explosief omhoog.",
        aitips: [
          "Zak in ongeveer 3 seconden, kom er daarna zo explosief mogelijk uit.",
          "Houd het gewicht dicht tegen je borst, ellebogen naar binnen.",
          "Knieën naar buiten duwen, in lijn met je tenen.",
          "Rug recht en borst omhoog, ook onderin de squat.",
          "Kies je gewicht op basis van je snelheid omhoog, niet op basis van zwaarte.",
        ],
        tip: "Rustig naar beneden (ca. 3 sec), explosief omhoog. Houd romp en knieën stabiel. Gebruik je techniek uit blok 1 om nu explosief in deze beweging te zijn.",
      },
      {
        id: "b2d3b", kind: "str", name: "Barbell bent-over row", sets: 4,
        wk: W4(F("40", "6-8", "120s")),
        desc: "Voorovergebogen met een halterstang trek je het gewicht naar je buik. Zware rugoefening voor je hele bovenrug.",
        aitips: [
          "Scharnier vanuit je heupen, romp rond 45° of lager, rug recht.",
          "Trek naar je onderrib of buik, niet naar je borst.",
          "Leid met je ellebogen en knijp je schouderbladen samen.",
          "Houd je romp gefixeerd: geen meeveren met je onderrug.",
          "Laat de stang gecontroleerd zakken, ook als het zwaar wordt.",
        ],
        tip: "Romp gefixeerd, trek naar onderrib/buik. Geen momentum uit de onderrug.",
      },
      {
        id: "b2d3c", kind: "str", name: "Flat dumbbell press", sets: 3, tag: "per dumbbell",
        wk: W4(F("25", "6-8", "120s")),
        desc: "Bankdrukken met losse dumbbells op een vlakke bank. Vraagt meer stabiliteit dan een stang en is vriendelijker voor je schouders.",
        aitips: [
          "Knijp je schouderbladen samen en houd ze stabiel op de bank.",
          "Ellebogen ongeveer 45° van je lijf, niet wijd gespreid.",
          "Laat gecontroleerd zakken tot borsthoogte, niet doorzakken.",
          "Druk krachtig omhoog, de dumbbells iets naar elkaar toe.",
          "Voeten stevig op de grond voor een stabiele basis.",
        ],
        tip: "Schouderbladen stabiel; gecontroleerd zakken en krachtig drukken.",
      },
      {
        id: "b2d3d", kind: "str", name: "Hamstring curl", sets: 3,
        wk: W4(F("35", "6-10", "90s")),
        desc: "In de machine trek je je hielen richting je billen. Traint de achterkant van je bovenbenen.",
        aitips: [
          "Stel de machine zo in dat je knie op de draai-as ligt.",
          "Trek rustig en gecontroleerd, knijp bovenin even aan.",
          "Laat langzaam terug — de terugweg traint net zo hard.",
          "Houd je heupen op het kussen, niet omhoog komen.",
          "Blijf op 1-2 RIR; past 35 kg niet bij de repsrange, pas dan het gewicht aan.",
        ],
        tip: "Zelfde basis als vorig schema: volledige controle, 1-2 RIR. Pas gewicht aan als 35 kg niet bij de range past.",
      },
      {
        id: "b2d3e", kind: "str", name: "Push-ups", sets: 3, tag: "Superset A",
        wk: W4(F("BW", "max reps", "0s → curls")),
        desc: "Opdrukken op eigen lichaamsgewicht, direct gevolgd door dumbbell curls. Eerste helft van de superset.",
        aitips: [
          "Lichaam in één rechte lijn: geen doorgezakte heupen.",
          "Handen iets breder dan schouderbreedte, ellebogen ongeveer 45°.",
          "Borst tot vlak boven de grond, dan krachtig omhoog.",
          "Technisch maximale reps: stop als je gaat doorzakken.",
          "Geen rust — meteen door naar de dumbbell curls.",
        ],
        tip: "Technisch maximale reps. Direct door naar dumbbell curls (dus geen rust ertussen, pas rust na de curls).",
      },
      {
        id: "b2d3f", kind: "str", name: "Dumbbell curl", sets: 3, tag: "Superset B",
        wk: W4(F("12", "max reps", "60-90s")),
        desc: "Biceps curls met dumbbells, direct na de push-ups. Pas hierna neem je rust.",
        aitips: [
          "Ellebogen blijven op hun plek, alleen je onderarm beweegt.",
          "Niet zwaaien met je romp om het gewicht omhoog te krijgen.",
          "Rustig laten zakken tot bijna gestrekte arm.",
          "Max reps met nette techniek: ook de laatste rep moet er netjes uitzien.",
          "Daarna pas 60-90 sec rust voor de volgende ronde.",
        ],
        tip: "Max reps met nette techniek; niet zwaaien. Daarna pas rust.",
      },
    ],
  },
  {
    id: "b2d4", nr: 4, name: "Zone 2 run", sub: "Cardio · zone 2", type: "cardio",
    intro: "De prikkel komt uit consistente Zone 2-tijd, niet uit steeds verder lopen. Stretch minimaal 4 uur na de run.",
    ex: [
      {
        id: "b2d4r", kind: "run", name: "Run — Zone 2", zone: "Zone 2 · comfortabel aeroob",
        wk: W4({ dist: "10 km" }),
        desc: "Rustige duurloop van 10 km op lage hartslag — je moet nog kunnen praten. Bouwt je motor op.",
        aitips: [
          "Blijf echt in zone 2: kun je nog praten, dan zit je goed.",
          "Start langzamer dan je wilt; tempo bewaren is de kunst.",
          "Stuur op hartslag, niet op tempo — heuvels en warmte tellen mee.",
          "Korte, ontspannen pasjes, land onder je lichaam.",
          "Geen progressie in afstand nodig, tenzij je richting een halve marathon wilt.",
        ],
        tip: "Iedere week circa 10 km in Zone 2. Houd het echt aerobisch en comfortabel; geen progressie in afstand nodig tenzij je doel is om de halve marathon te gaan lopen.",
      },
      {
        id: "b2d4s", kind: "stretch", name: "Stretch cycle (later op de dag)", rounds: 3, items: STRETCH_B2,
        desc: "Vaste reeks rekoefeningen voor soepele heupen en benen. Rustig uitvoeren, blijven ademen.",
        aitips: [
          "Minimaal 4 uur na (of vóór) de run, niet direct erna.",
          "Rustig bewegen en ontspan bewust de spier die je rekt.",
          "Voel rek, geen pijn — bij scherpe pijn ga je terug.",
          "Links en rechts even lang aanhouden.",
          "Drie volle ronden: alle oefeningen af, dan opnieuw.",
        ],
        tip: "Minimaal 4 uur na of voor de run. Zelfde stretch cycle als dag 1.",
      },
    ],
  },
  {
    id: "b2d5", nr: 5, name: "Mobiliteit", sub: "Rustdag", type: "mob",
    intro: "Ongewijzigd: doe drie volledige rondes. Eén ronde = alle mobiliteitsoefeningen achter elkaar, daarna opnieuw vanaf de eerste.",
    ex: [
      {
        id: "b2d5s", kind: "stretch", name: "Stretch cycle", rounds: 3, items: STRETCH_B2,
        desc: "Vaste reeks rekoefeningen voor soepele heupen en benen. Rustig uitvoeren, blijven ademen.",
        aitips: [
          "Neem de tijd, dit is herstel — geen prestatie.",
          "Rustig door de volledige bewegingsuitslag, controle en ademhaling centraal.",
          "Niet overstrekken in je onderrug bij de couch stretch.",
          "Doe beide kanten even lang.",
          "Drie volle ronden, zodat je op minimaal 3× per week uitkomt.",
        ],
        tip: "Doe drie volledige rondes. Eén ronde = alle mobiliteitsoefeningen achter elkaar, daarna opnieuw vanaf de eerste.",
      },
    ],
  },
];

/* ─────────────────────────  blokken  ───────────────────────── */

const BLOKS = [
  {
    id: "blok1", name: "Blok 1", period: "juli 2026", badge: "archief", archived: true,
    days: DAYS_B1, storageKey: "blok1-ryan-log", logId: "ryan-blok1",
    eyebrow: "Trainingslog Ryan · Blok 1 · juli 2026",
    subtitle: "Kracht · conditie · mobiliteit — 4 weken · coach Zlatan",
  },
  {
    id: "blok2", name: "Blok 2", period: "sep 2026", badge: "actief", archived: false,
    days: DAYS_B2, storageKey: "blok2-ryan-log", logId: "ryan-blok2",
    eyebrow: "Trainingslog Ryan · Blok 2 · september 2026",
    subtitle: "Kracht · conditie · mobiliteit — 5 dagen · 4 weken · coach Zlatan",
  },
];

const DEFAULT_BLOK = 1; // blok 2 is de startpagina

const TYPE_COLOR = { kracht: "var(--kracht)", cardio: "var(--cardio)", mob: "var(--mob)" };
const TYPE_LABEL = { kracht: "Kracht", cardio: "Cardio", mob: "Mobiliteit" };

/* ─────────────────────────  storage adapter  ─────────────────────────
   Werkt in drie omgevingen, automatisch gedetecteerd:
   1. Gepubliceerde website MET Supabase  → echte online opslag, live te
      delen met Zlatan (vul SUPABASE_URL + SUPABASE_ANON_KEY hieronder in).
   2. Claude-artifact (preview)           → window.storage.
   3. Elke browser zonder config          → localStorage (blijft op dat
      apparaat bewaard, zodat je nooit data kwijtraakt).
--------------------------------------------------------------------- */

// ▼▼▼  VUL DEZE TWEE IN NA HET AANMAKEN VAN JE SUPABASE-PROJECT  ▼▼▼
const SUPABASE_URL = "https://gdeomzovuuasxonipcsi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CXzOwhSAz7rklNYHkBxiqw_167_MXeG";
// ▲▲▲  laat leeg om zonder Supabase te draaien (Claude / localStorage) ▲▲▲

// Eén gedeelde "kluis" per blok zodat jij én Zlatan dezelfde data zien.
// Elk blok heeft zijn eigen rij (blok.logId) — blok 1 blijft dus gewoon bewaard.

const supaEnabled = () => SUPABASE_URL && SUPABASE_ANON_KEY;

// Werkt met zowel de oude 'anon' JWT-sleutels als de nieuwe 'sb_publishable_...' sleutels.
const supaHeaders = (extra = {}) => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  ...extra,
});

const storage = {
  async load(blok) {
    // 1) Supabase
    if (supaEnabled()) {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/workout_logs?id=eq.${blok.logId}&select=data`,
          { headers: supaHeaders() }
        );
        if (res.ok) {
          const rows = await res.json();
          if (rows && rows[0] && rows[0].data) return rows[0].data;
          return {}; // rij bestaat nog niet — leeg beginnen
        }
      } catch (e) { /* val terug op lokaal */ }
    }
    // 2) Claude-artifact
    if (typeof window !== "undefined" && window.storage) {
      try {
        const r = await window.storage.get(blok.storageKey, true);
        if (r && r.value) return JSON.parse(r.value);
      } catch (e) { /* val terug op localStorage */ }
    }
    // 3) localStorage
    try {
      const raw = localStorage.getItem(blok.storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* niets */ }
    return {};
  },

  async save(blok, data) {
    // Altijd óók lokaal wegschrijven als vangnet
    try { localStorage.setItem(blok.storageKey, JSON.stringify(data)); } catch (e) {}

    if (supaEnabled()) {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/workout_logs?on_conflict=id`,
        {
          method: "POST",
          headers: supaHeaders({
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates",
          }),
          body: JSON.stringify({ id: blok.logId, data, updated_at: new Date().toISOString() }),
        }
      );
      if (!res.ok) throw new Error("Supabase save mislukt (" + res.status + ")");
      return "supabase";
    }
    if (typeof window !== "undefined" && window.storage) {
      await window.storage.set(blok.storageKey, JSON.stringify(data), true);
      return "claude";
    }
    return "local";
  },

  mode() {
    if (supaEnabled()) return "supabase";
    if (typeof window !== "undefined" && window.storage) return "claude";
    return "local";
  },
};

/* ─────────────────────────  helpers  ───────────────────────── */

const dayKey = (w, d) => `w${w}d${d}`;

function emptyExLog(ex, week) {
  if (ex.kind === "str") return { sets: Array.from({ length: ex.sets }, () => ({ kg: "", reps: "", ok: false })), note: "" };
  if (ex.kind === "stretch") return { rounds: [false, false, false], note: "" };
  if (ex.kind === "interval") {
    const n = ex.wk[week].n;
    return { warm: { ok: false }, ints: Array.from({ length: n }, () => ({ val: "", ok: false })), cool: { ok: false }, note: "" };
  }
  if (ex.kind === "run") return { dist: "", time: "", ok: false, note: "" };
  return { note: "" };
}

/* Gewicht/reps netjes tonen: "60" → "60 kg", "BW" → "BW / assisted",
   "passend" en "max reps" blijven staan zoals ze zijn. */
function kgLabel(kg) {
  if (!kg) return "gewicht naar gevoel";
  if (kg === "BW") return "BW / assisted";
  return /^[\d.,]+$/.test(String(kg)) ? `${kg} kg` : kg;
}
function repsLabel(reps) {
  return /^[\d\s\-–]+$/.test(String(reps)) ? `${reps} reps` : reps;
}

function fmtDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
  } catch { return ""; }
}

function exDoneCount(ex, log) {
  if (!log) return 0;
  if (ex.kind === "str") return (log.sets || []).filter((s) => s.ok).length;
  if (ex.kind === "stretch") return (log.rounds || []).filter(Boolean).length;
  if (ex.kind === "interval") return (log.ints || []).filter((i) => i.ok).length + (log.warm?.ok ? 1 : 0) + (ex.cooldown && log.cool?.ok ? 1 : 0);
  if (ex.kind === "run") return log.ok ? 1 : 0;
  return 0;
}
function exTotalCount(ex, week) {
  if (ex.kind === "str") return ex.sets;
  if (ex.kind === "stretch") return ex.rounds;
  if (ex.kind === "interval") return ex.wk[week].n + 1 + (ex.cooldown ? 1 : 0);
  if (ex.kind === "run") return 1;
  return 0;
}

/* Build a WhatsApp-ready text summary for one week */
function buildExport(logs, week, blok) {
  const DAYS = blok.days;
  const lines = [`TUSSENSTAND RYAN — ${blok.name}, week ${week + 1}`, `High on Training · coach Zlatan`, ""];
  let any = false;
  DAYS.forEach((day) => {
    const dl = logs[dayKey(week, day.nr)];
    if (!dl) return;
    const hasData = day.ex.some((ex) => exDoneCount(ex, dl.ex?.[ex.id]) > 0 || (dl.ex?.[ex.id]?.note || "").trim());
    if (!hasData && !dl.done && !(dl.note || "").trim()) return;
    any = true;
    lines.push(`DAG ${day.nr} · ${day.name.toUpperCase()}${dl.done ? " ✅" : ""}${dl.date ? ` (${fmtDate(dl.date)})` : ""}`);
    day.ex.forEach((ex) => {
      const el = dl.ex?.[ex.id];
      if (!el) return;
      if (ex.kind === "str") {
        const done = (el.sets || []).filter((s) => s.ok || s.kg || s.reps);
        if (!done.length && !(el.note || "").trim()) return;
        const plan = ex.wk[week];
        const setsTxt = (el.sets || [])
          .map((s, i) => {
            if (!s.ok && !s.kg && !s.reps) return null;
            const kg = s.kg || plan.kg;
            const reps = s.reps || "?";
            return `${kg}×${reps}${s.ok ? "✓" : ""}`;
          })
          .filter(Boolean)
          .join("  ");
        lines.push(`• ${ex.name} (plan ${plan.kg} × ${plan.reps}): ${setsTxt || "—"}`);
        if ((el.note || "").trim()) lines.push(`  💬 ${el.note.trim()}`);
      } else if (ex.kind === "stretch") {
        const r = (el.rounds || []).filter(Boolean).length;
        if (r > 0) lines.push(`• ${ex.name}: ${r}/3 ronden`);
        if ((el.note || "").trim()) lines.push(`  💬 ${el.note.trim()}`);
      } else if (ex.kind === "interval") {
        const n = (el.ints || []).filter((i) => i.ok).length;
        if (n > 0 || el.warm?.ok) {
          const tempos = (el.ints || []).map((i) => i.val).filter(Boolean).join(", ");
          lines.push(`• ${ex.name}: ${el.warm?.ok ? "inloop ✓, " : ""}${n}/${ex.wk[week].n} intervallen à ${ex.dist} (plan ${ex.wk[week].tempo})${tempos ? ` — ${tempos}` : ""}${el.cool?.ok ? ", uitloop ✓" : ""}`);
        }
        if ((el.note || "").trim()) lines.push(`  💬 ${el.note.trim()}`);
      } else if (ex.kind === "run") {
        if (el.ok || el.dist || el.time) {
          lines.push(`• ${ex.name}: ${el.dist || ex.wk[week].dist}${el.time ? ` in ${el.time}` : ""}${el.ok ? " ✓" : ""} (plan ${ex.wk[week].dist})`);
        }
        if ((el.note || "").trim()) lines.push(`  💬 ${el.note.trim()}`);
      }
    });
    if ((dl.note || "").trim()) lines.push(`💬 Dag-notitie: ${dl.note.trim()}`);
    lines.push("");
  });
  if (!any) return null;
  return lines.join("\n").trim();
}

/* ─────────────────────────  component  ───────────────────────── */

export default function App() {
  const [logs, setLogs] = useState({});
  const [week, setWeek] = useState(0); // 0..3
  const [dayNr, setDayNr] = useState(1); // 1..5
  const [view, setView] = useState("training"); // training | overzicht
  const [blokIdx, setBlokIdx] = useState(DEFAULT_BLOK); // 0 = blok 1 (archief), 1 = blok 2
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [progExId, setProgExId] = useState(null);
  const [toast, setToast] = useState("");
  const saveTimer = useRef(null);
  const lastEditRef = useRef(0);
  const logsRef = useRef(logs);
  logsRef.current = logs;

  const blok = BLOKS[blokIdx];
  const DAYS = blok.days;
  const blokRef = useRef(blok);
  blokRef.current = blok;

  /* load once + poll voor live sync met Zlatan */
  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      const data = await storage.load(blok);
      if (alive) { setLogs(data || {}); setLoading(false); }
    })();

    // Als Supabase aanstaat: elke 15s verversen zodat de trainer live meekijkt.
    // (Alleen overschrijven als er niet net lokaal iets is aangepast.)
    let poll = null;
    if (storage.mode() === "supabase") {
      poll = setInterval(async () => {
        if (Date.now() - lastEditRef.current < 8000) return; // niet tijdens typen
        const data = await storage.load(blok);
        if (alive && data) setLogs(data);
      }, 15000);
    }
    return () => { alive = false; if (poll) clearInterval(poll); };
  }, [blokIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  /* debounced save */
  const scheduleSave = useCallback(() => {
    lastEditRef.current = Date.now();
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await storage.save(blokRef.current, logsRef.current);
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2000);
      } catch (e) {
        setSaveState("error");
      }
    }, 700);
  }, []);

  const updateLogs = useCallback((fn) => {
    setLogs((prev) => {
      const next = fn(structuredClone(prev));
      return next;
    });
    scheduleSave();
  }, [scheduleSave]);

  const switchBlok = async (idx) => {
    if (idx === blokIdx) return;
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
      try { await storage.save(blokRef.current, logsRef.current); setSaveState("saved"); }
      catch (e) { setSaveState("error"); }
    }
    setLogs({});
    setWeek(0);
    setDayNr(1);
    setView("training");
    setProgExId(null);
    setBlokIdx(idx);
    window.scrollTo({ top: 0 });
  };

  const day = DAYS.find((d) => d.nr === dayNr);
  const dk = dayKey(week, dayNr);
  const dayLog = logs[dk] || {};

  const getExLog = (ex) => dayLog.ex?.[ex.id] || emptyExLog(ex, week);

  const setExLog = (ex, fn) =>
    updateLogs((L) => {
      if (!L[dk]) L[dk] = { ex: {}, note: "", done: false, date: null };
      if (!L[dk].ex) L[dk].ex = {};
      const cur = L[dk].ex[ex.id] || emptyExLog(ex, week);
      L[dk].ex[ex.id] = fn(cur);
      if (!L[dk].date) L[dk].date = new Date().toISOString();
      return L;
    });

  const toggleDayDone = () =>
    updateLogs((L) => {
      if (!L[dk]) L[dk] = { ex: {}, note: "", done: false, date: null };
      L[dk].done = !L[dk].done;
      if (L[dk].done && !L[dk].date) L[dk].date = new Date().toISOString();
      return L;
    });

  const setDayNote = (v) =>
    updateLogs((L) => {
      if (!L[dk]) L[dk] = { ex: {}, note: "", done: false, date: null };
      L[dk].note = v;
      return L;
    });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const copyExport = async (w) => {
    const txt = buildExport(logsRef.current, w, blokRef.current);
    if (!txt) {
      showToast(`Nog niets gelogd in week ${w + 1}`);
      return;
    }
    try {
      await navigator.clipboard.writeText(txt);
      showToast("Tussenstand gekopieerd — plak in WhatsApp");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showToast("Tussenstand gekopieerd — plak in WhatsApp");
      } catch {
        showToast("Kopiëren lukte niet — zie Overzicht");
      }
      document.body.removeChild(ta);
    }
  };

  /* ── render helpers ── */

  const renderStrength = (ex) => {
    const plan = ex.wk[week];
    const el = getExLog(ex);
    return (
      <div>
        <div className="planline">
          <span className="plan-chip main">{kgLabel(plan.kg)}</span>
          <span className="plan-chip">{repsLabel(plan.reps)}</span>
          {plan.pct && <span className="plan-chip">{plan.pct}</span>}
          <span className="plan-chip">rust {plan.rust}</span>
        </div>
        <div className="setgrid-head">
          <span>set</span><span>kg</span><span>reps</span><span></span>
        </div>
        {el.sets.map((s, i) => (
          <div className={"setrow" + (s.ok ? " ok" : "")} key={i}>
            <span className="setnum">{i + 1}</span>
            <input
              inputMode="decimal"
              placeholder={plan.kg === "BW" ? "BW" : plan.kg || "kg"}
              value={s.kg}
              onChange={(e) => setExLog(ex, (c) => { c.sets[i].kg = e.target.value; return c; })}
            />
            <input
              inputMode="numeric"
              placeholder={plan.reps}
              value={s.reps}
              onChange={(e) => setExLog(ex, (c) => { c.sets[i].reps = e.target.value; return c; })}
            />
            <button
              className={"check" + (s.ok ? " on" : "")}
              aria-label={`Set ${i + 1} gedaan`}
              onClick={() => setExLog(ex, (c) => { c.sets[i].ok = !c.sets[i].ok; return c; })}
            >✓</button>
          </div>
        ))}
      </div>
    );
  };

  const renderStretch = (ex) => {
    const el = getExLog(ex);
    return (
      <div>
        <ul className="stretchlist">
          {ex.items.map((it) => (
            <li key={it.name}><span>{it.name}</span><span className="dose">{it.dose}</span></li>
          ))}
        </ul>
        <div className="rounds">
          {[0, 1, 2].map((r) => (
            <button
              key={r}
              className={"roundbtn" + (el.rounds?.[r] ? " on" : "")}
              onClick={() => setExLog(ex, (c) => { if (!c.rounds) c.rounds = [false, false, false]; c.rounds[r] = !c.rounds[r]; return c; })}
            >
              Ronde {r + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderInterval = (ex) => {
    const plan = ex.wk[week];
    const el = getExLog(ex);
    const ints = el.ints && el.ints.length === plan.n ? el.ints : Array.from({ length: plan.n }, (_, i) => el.ints?.[i] || { val: "", ok: false });
    return (
      <div>
        <div className="planline">
          <span className="plan-chip main">{plan.n} × {ex.dist}</span>
          <span className="plan-chip">tempo {plan.tempo}</span>
          <span className="plan-chip">rust: {ex.rest}</span>
        </div>
        <div className={"setrow warm" + (el.warm?.ok ? " ok" : "")}>
          <span className="setnum">→</span>
          <span className="warmlabel">{ex.warmup}</span>
          <button className={"check" + (el.warm?.ok ? " on" : "")} aria-label="Inloop gedaan"
            onClick={() => setExLog(ex, (c) => { c.warm = { ok: !c.warm?.ok }; return c; })}>✓</button>
        </div>
        <div className="setgrid-head interval"><span>int.</span><span>tijd / tempo</span><span></span></div>
        {ints.map((s, i) => (
          <div className={"setrow interval" + (s.ok ? " ok" : "")} key={i}>
            <span className="setnum">{i + 1}</span>
            <input
              placeholder={plan.tempo}
              value={s.val}
              onChange={(e) => setExLog(ex, (c) => {
                if (!c.ints || c.ints.length !== plan.n) c.ints = ints.map((x) => ({ ...x }));
                c.ints[i].val = e.target.value; return c;
              })}
            />
            <button className={"check" + (s.ok ? " on" : "")} aria-label={`Interval ${i + 1} gedaan`}
              onClick={() => setExLog(ex, (c) => {
                if (!c.ints || c.ints.length !== plan.n) c.ints = ints.map((x) => ({ ...x }));
                c.ints[i].ok = !c.ints[i].ok; return c;
              })}>✓</button>
          </div>
        ))}
        {ex.cooldown && (
          <div className={"setrow warm" + (el.cool?.ok ? " ok" : "")}>
            <span className="setnum">←</span>
            <span className="warmlabel">{ex.cooldown}</span>
            <button className={"check" + (el.cool?.ok ? " on" : "")} aria-label="Uitlopen gedaan"
              onClick={() => setExLog(ex, (c) => { c.cool = { ok: !c.cool?.ok }; return c; })}>✓</button>
          </div>
        )}
      </div>
    );
  };

  const renderRun = (ex) => {
    const plan = ex.wk[week];
    const el = getExLog(ex);
    return (
      <div>
        <div className="planline">
          <span className="plan-chip main">{plan.dist}</span>
          <span className="plan-chip">{ex.zone}</span>
        </div>
        <div className={"setrow run" + (el.ok ? " ok" : "")}>
          <input placeholder={`afstand (${plan.dist})`} value={el.dist}
            onChange={(e) => setExLog(ex, (c) => { c.dist = e.target.value; return c; })} />
          <input placeholder="tijd (bv. 58:30)" value={el.time}
            onChange={(e) => setExLog(ex, (c) => { c.time = e.target.value; return c; })} />
          <button className={"check" + (el.ok ? " on" : "")} aria-label="Run gedaan"
            onClick={() => setExLog(ex, (c) => { c.ok = !c.ok; return c; })}>✓</button>
        </div>
      </div>
    );
  };

  const renderExercise = (ex) => {
    const el = getExLog(ex);
    const done = exDoneCount(ex, el);
    const total = exTotalCount(ex, week);
    return (
      <section className="excard" key={ex.id}>
        <header className="exhead">
          <div>
            <h3>{ex.name}</h3>
            {ex.tag && <span className="tag">{ex.tag}</span>}
          </div>
          <span className={"progress" + (done >= total && total > 0 ? " full" : "")}>{done}/{total}</span>
        </header>

        {ex.kind === "str" && renderStrength(ex)}
        {ex.kind === "stretch" && renderStretch(ex)}
        {ex.kind === "interval" && renderInterval(ex)}
        {ex.kind === "run" && renderRun(ex)}

        <div className="infocard tip">
          <span className="infolabel">Tip van Zlatan</span>
          <p>{ex.tip}</p>
        </div>
        {ex.desc && (
          <div className="infocard desc">
            <span className="infolabel">{ex.name}</span>
            <p>{ex.desc}</p>
          </div>
        )}
        {ex.aitips && ex.aitips.length > 0 && (
          <div className="infocard aitips">
            <span className="infolabel">AI Tips · goed uitvoeren</span>
            <ul>
              {ex.aitips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        )}
        {(ex.max5 || ex.max1) && (
          <p className="maxline">Max: {ex.max5 ? `5RM ${ex.max5}` : ""}{ex.max5 && ex.max1 ? " · " : ""}{ex.max1 ? `1RM ${ex.max1}` : ""}</p>
        )}

        <input
          className="exnote"
          placeholder="💬 Opmerking voor Zlatan (afwijking, gevoel, blessure…)"
          value={el.note || ""}
          onChange={(e) => setExLog(ex, (c) => { c.note = e.target.value; return c; })}
        />
      </section>
    );
  };

  /* progression tab */
  const parseKg = (v) => {
    if (v === null || v === undefined) return null;
    const n = parseFloat(String(v).replace(",", "."));
    return Number.isFinite(n) ? n : null;
  };

  const TRACKABLE = DAYS.flatMap((d) =>
    d.ex.filter((e) => e.kind !== "stretch").map((e) => ({ ...e, dayNr: d.nr, dayName: d.name, dayType: d.type }))
  );

  const renderProgress = () => {
    const ex = TRACKABLE.find((e) => e.id === progExId) || TRACKABLE[0];
    const color = TYPE_COLOR[ex.dayType];

    /* collect per-week data */
    const weeks = [0, 1, 2, 3].map((w) => {
      const el = logs[dayKey(w, ex.dayNr)]?.ex?.[ex.id];
      if (ex.kind === "str") {
        const plan = ex.wk[w];
        const planKg = parseKg(plan.kg);
        const sets = (el?.sets || []).filter((s) => s.ok || s.kg || s.reps);
        const kgs = sets.map((s) => parseKg(s.kg) ?? (s.ok ? planKg : null)).filter((v) => v !== null);
        const best = kgs.length ? Math.max(...kgs) : null;
        return { w, plan, planKg, sets, best, note: el?.note || "" };
      }
      if (ex.kind === "interval") {
        const doneN = (el?.ints || []).filter((i) => i.ok).length;
        const tempos = (el?.ints || []).map((i) => i.val).filter(Boolean);
        return { w, plan: ex.wk[w], doneN, tempos, note: el?.note || "" };
      }
      if (ex.kind === "run") {
        return { w, plan: ex.wk[w], dist: el?.dist || "", time: el?.time || "", ok: !!el?.ok, note: el?.note || "" };
      }
      return { w, note: el?.note || "" };
    });

    const maxBar = ex.kind === "str"
      ? Math.max(...weeks.map((x) => x.best ?? 0), ...weeks.map((x) => x.planKg ?? 0), 1)
      : 1;

    return (
      <div className="progview">
        <p className="ov-intro">Kies een oefening en zie hoe je je over de vier weken ontwikkelt — plan versus wat je écht deed.</p>
        <select className="prog-select" value={ex.id} onChange={(e) => setProgExId(e.target.value)}>
          {DAYS.filter((d) => d.ex.some((e) => e.kind !== "stretch")).map((d) => (
            <optgroup key={d.id} label={`Dag ${d.nr} · ${d.name}`}>
              {d.ex.filter((e) => e.kind !== "stretch").map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </optgroup>
          ))}
        </select>

        {ex.kind === "str" && (
          <div className="prog-chart">
            {weeks.map((x) => (
              <div className="prog-col" key={x.w}>
                <span className="prog-val">{x.best !== null ? String(x.best).replace(".", ",") : "·"}</span>
                <div className="prog-barwrap">
                  <div className="prog-plan" style={{ height: `${(x.planKg ?? 0) / maxBar * 100}%` }} />
                  {x.best !== null && (
                    <div className="prog-bar" style={{ height: `${x.best / maxBar * 100}%`, background: color }} />
                  )}
                </div>
                <span className="prog-wk">W{x.w + 1}</span>
                <span className="prog-planlbl">plan {x.plan.kg}</span>
              </div>
            ))}
          </div>
        )}
        {ex.kind === "str" && (
          <p className="prog-legend">
            <span className="dot" style={{ background: color }} /> beste set (kg) · <span className="dot plan" /> plan van Zlatan
          </p>
        )}

        <div className="prog-detail">
          {weeks.map((x) => (
            <div className="prog-week" key={x.w}>
              <span className="prog-week-lbl">Week {x.w + 1}</span>
              {ex.kind === "str" && (
                <span className="prog-week-txt">
                  {x.sets.length
                    ? x.sets.map((s, i) => `${s.kg || x.plan.kg}×${s.reps || "?"}${s.ok ? "✓" : ""}`).join("  ")
                    : "—"}
                </span>
              )}
              {ex.kind === "interval" && (
                <span className="prog-week-txt">
                  {x.doneN > 0 ? `${x.doneN}/${x.plan.n} × ${ex.dist} (plan ${x.plan.tempo})${x.tempos.length ? ` — ${x.tempos.join(", ")}` : ""}` : "—"}
                </span>
              )}
              {ex.kind === "run" && (
                <span className="prog-week-txt">
                  {x.ok || x.dist || x.time ? `${x.dist || x.plan.dist}${x.time ? ` in ${x.time}` : ""}${x.ok ? " ✓" : ""} (plan ${x.plan.dist})` : `— (plan ${x.plan.dist})`}
                </span>
              )}
              {x.note.trim() && <span className="prog-note">💬 {x.note.trim()}</span>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* overview tab */
  const renderOverview = () => {
    const weeksWithData = [0, 1, 2, 3];
    return (
      <div className="overview">
        <p className="ov-intro">
          Alles wat Ryan logt staat hier per week — dezelfde link, dezelfde live data voor Ryan én Zlatan.
        </p>
        {weeksWithData.map((w) => {
          const txt = buildExport(logs, w, blok);
          const daysDone = DAYS.filter((d) => logs[dayKey(w, d.nr)]?.done).length;
          return (
            <section className="ov-week" key={w}>
              <header>
                <h3>Week {w + 1}</h3>
                <span className="ov-count">{daysDone}/5 trainingen afgerond</span>
                <button className="sharebtn small" onClick={() => copyExport(w)}>Kopieer</button>
              </header>
              {txt ? <pre className="ov-pre">{txt}</pre> : <p className="ov-empty">Nog niets gelogd.</p>}
            </section>
          );
        })}
      </div>
    );
  };

  const dayDoneCount = DAYS.reduce((acc, d) => {
    for (let w = 0; w < 4; w++) if (logs[dayKey(w, d.nr)]?.done) acc++;
    return acc;
  }, 0);

  /* ── UI ── */
  return (
    <div className="app">
      <style>{css}</style>

      <header className="masthead">
        <nav className="blokswitch" aria-label="Kies trainingsblok">
          {BLOKS.map((b, i) => (
            <button key={b.id} className={i === blokIdx ? "on" : ""} onClick={() => switchBlok(i)}>
              {b.name}<span>{b.period} · {b.badge}</span>
            </button>
          ))}
        </nav>

        {blok.archived && (
          <div className="archnotice">
            Je kijkt terug in {blok.name} ({blok.period}). Alles blijft bewaard — je kunt hier nog gewoon aanvullen of corrigeren.
            <button onClick={() => switchBlok(DEFAULT_BLOK)}>Terug naar {BLOKS[DEFAULT_BLOK].name}</button>
          </div>
        )}

        <div className="mast-top">
          <div>
            <p className="eyebrow">{blok.eyebrow}</p>
            <h1>HIGH<span className="accent">/</span>ON<span className="accent">/</span>TRAINING</h1>
            <p className="subtitle">{blok.subtitle}</p>
          </div>
          <div className="mast-count">
            <span className="big">{dayDoneCount}</span>
            <span className="small">van 20<br />afgerond</span>
          </div>
        </div>

        {/* blokkaart: 4 weken × 5 dagen */}
        <div className="blokkaart" role="navigation" aria-label="Weekoverzicht">
          {[0, 1, 2, 3].map((w) => (
            <div className="bk-row" key={w}>
              <span className="bk-wk">W{w + 1}</span>
              {DAYS.map((d) => {
                const done = logs[dayKey(w, d.nr)]?.done;
                const active = view === "training" && w === week && d.nr === dayNr;
                return (
                  <button
                    key={d.id}
                    className={"bk-cell" + (done ? " done" : "") + (active ? " active" : "")}
                    style={done ? { background: TYPE_COLOR[d.type], borderColor: TYPE_COLOR[d.type] } : {}}
                    aria-label={`Week ${w + 1}, dag ${d.nr}${done ? " (afgerond)" : ""}`}
                    onClick={() => { setWeek(w); setDayNr(d.nr); setView("training"); window.scrollTo({ top: 0 }); }}
                  >
                    {d.nr}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <nav className="tabs">
          <button className={view === "training" ? "on" : ""} onClick={() => setView("training")}>Training</button>
          <button className={view === "voortgang" ? "on" : ""} onClick={() => setView("voortgang")}>Voortgang</button>
          <button className={view === "overzicht" ? "on" : ""} onClick={() => setView("overzicht")}>Delen</button>
          <span className={"savestate " + saveState}>
            {saveState === "saving" ? "opslaan…"
              : saveState === "saved" ? (storage.mode() === "supabase" ? "online opgeslagen ✓" : "opgeslagen ✓")
              : saveState === "error" ? "opslaan mislukt"
              : storage.mode() === "supabase" ? "online ●"
              : storage.mode() === "local" ? "op dit apparaat"
              : ""}
          </span>
        </nav>
      </header>

      {loading ? (
        <p className="loading">Schema laden…</p>
      ) : view === "overzicht" ? (
        renderOverview()
      ) : view === "voortgang" ? (
        renderProgress()
      ) : (
        <main>
          <div className="daypicker">
            {DAYS.map((d) => (
              <button
                key={d.id}
                className={"daybtn" + (d.nr === dayNr ? " on" : "")}
                style={d.nr === dayNr ? { borderColor: TYPE_COLOR[d.type], color: TYPE_COLOR[d.type] } : {}}
                onClick={() => setDayNr(d.nr)}
              >
                <span className="d-nr">Dag {d.nr}</span>
                <span className="d-name">{d.name}</span>
              </button>
            ))}
          </div>

          <div className="dayhead" style={{ borderColor: TYPE_COLOR[day.type] }}>
            <div>
              <h2>Dag {day.nr} — {day.name}</h2>
              <p>{TYPE_LABEL[day.type]} · week {week + 1}{dayLog.date ? ` · ${fmtDate(dayLog.date)}` : ""}</p>
            </div>
            <button className={"donebtn" + (dayLog.done ? " on" : "")} onClick={toggleDayDone}
              style={dayLog.done ? { background: TYPE_COLOR[day.type], borderColor: TYPE_COLOR[day.type] } : {}}>
              {dayLog.done ? "Afgerond ✓" : "Rond af"}
            </button>
          </div>

          {day.intro && (
            <div className="infocard dayintro">
              <span className="infolabel">Zo pak je dag {day.nr} aan</span>
              <p>{day.intro}</p>
            </div>
          )}

          {day.ex.map(renderExercise)}

          <textarea
            className="daynote"
            placeholder="💬 Dag-notitie voor Zlatan (hoe voelde het, wat wil je aanpassen…)"
            value={dayLog.note || ""}
            onChange={(e) => setDayNote(e.target.value)}
            rows={3}
          />

          <button className="sharebtn" onClick={() => copyExport(week)}>
            Deel tussenstand week {week + 1} met Zlatan
          </button>
          <p className="sharenote">
            Kopieert een samenvatting voor WhatsApp. Zlatan kan óók gewoon deze link openen: hij ziet dezelfde live gegevens (tabs “Voortgang” en “Delen”).
          </p>
        </main>
      )}

      <footer className="brand">
        RYAN<span className="accent">/</span>LOG
        <span className="brand-sub">een schema van High on Training · coach Zlatan</span>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

/* ─────────────────────────  styles  ───────────────────────── */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..900&family=IBM+Plex+Mono:wght@400;600&display=swap');

:root{
  --bg:#0D1015; --panel:#151A22; --panel2:#1B222D; --line:#28313F;
  --text:#EAEFF6; --muted:#8794A8;
  --kracht:#FF8A2A; --cardio:#3ED6A8; --mob:#9D8CFF;
  --ok:#3ED6A8;
}
*{box-sizing:border-box; -webkit-tap-highlight-color:transparent;}
html,body{margin:0; max-width:100%; overflow-x:hidden;}
.app{
  min-height:100vh; background:var(--bg); color:var(--text);
  font-family:'Archivo',system-ui,sans-serif; font-variation-settings:'wdth' 100;
  max-width:560px; margin:0 auto; padding:16px 14px 64px;
  overflow-x:hidden;
}
@media (prefers-reduced-motion: reduce){ *{transition:none!important; animation:none!important;} }

/* masthead */
.masthead{margin-bottom:14px;}
.mast-top{display:flex; justify-content:space-between; align-items:flex-start; gap:12px;}
.mast-top > div:first-child{min-width:0;}
.eyebrow{font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); margin:0 0 4px;}
h1{font-size:clamp(19px,6.4vw,32px); font-weight:900; font-variation-settings:'wdth' 112; letter-spacing:-.01em; margin:0; line-height:1.02; overflow-wrap:anywhere;}
h1 .accent{color:var(--kracht);}
.subtitle{color:var(--muted); font-size:12.5px; margin:6px 0 0;}
.mast-count{text-align:right; font-family:'IBM Plex Mono',monospace; flex-shrink:0;}
.mast-count .big{font-size:30px; font-weight:600; color:var(--kracht); display:block; line-height:1;}
.mast-count .small{font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:.08em;}

/* blokschakelaar */
.blokswitch{
  display:flex; gap:6px; background:var(--panel); border:1px solid var(--line);
  border-radius:12px; padding:4px; margin-bottom:12px;
}
.blokswitch button{
  flex:1; background:none; border:none; border-radius:9px; color:var(--muted);
  font:inherit; font-size:13.5px; font-weight:700; padding:8px 6px; cursor:pointer;
  display:flex; flex-direction:column; align-items:center; gap:2px; line-height:1.15;
}
.blokswitch button span{
  font-family:'IBM Plex Mono',monospace; font-size:9px; font-weight:400;
  text-transform:uppercase; letter-spacing:.1em; color:#525E70;
}
.blokswitch button.on{background:var(--panel2); color:var(--text);}
.blokswitch button.on span{color:var(--kracht);}

/* archiefmelding */
.archnotice{
  display:flex; flex-wrap:wrap; align-items:center; gap:8px;
  background:var(--panel2); border:1px solid var(--line); border-left:3px solid var(--mob);
  border-radius:0 10px 10px 0; padding:10px 12px; margin-bottom:12px;
  font-size:12.5px; line-height:1.5; color:var(--muted);
}
.archnotice button{
  margin-left:auto; background:var(--mob); border:none; border-radius:8px; color:#0D1015;
  font:inherit; font-weight:700; font-size:12px; padding:8px 12px; cursor:pointer;
}

/* blokkaart */
.blokkaart{margin:16px 0 12px; display:flex; flex-direction:column; gap:6px;}
.bk-row{display:flex; align-items:center; gap:6px;}
.bk-wk{font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--muted); width:24px;}
.bk-cell{
  flex:1; height:30px; border-radius:8px; border:1px solid var(--line);
  background:var(--panel); color:var(--muted); font-family:'IBM Plex Mono',monospace;
  font-size:11px; cursor:pointer; transition:transform .1s;
}
.bk-cell.done{color:#0D1015; font-weight:600;}
.bk-cell.active{outline:2px solid var(--text); outline-offset:1px;}
.bk-cell:active{transform:scale(.94);}

/* tabs */
.tabs{display:flex; gap:8px; align-items:center; border-bottom:1px solid var(--line); padding-bottom:0;}
.tabs button{
  background:none; border:none; color:var(--muted); font:inherit; font-size:13.5px; font-weight:600;
  padding:8px 2px 10px; cursor:pointer; border-bottom:2px solid transparent;
}
.tabs button.on{color:var(--text); border-bottom-color:var(--kracht);}
.savestate{margin-left:auto; font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--muted);}
.savestate.saved{color:var(--ok);}
.savestate.error{color:#FF6B6B;}

.loading{color:var(--muted); text-align:center; padding:40px 0;}

/* day picker */
.daypicker{display:flex; gap:8px; overflow-x:auto; padding:12px 0 4px; scrollbar-width:none;}
.daypicker::-webkit-scrollbar{display:none;}
.daybtn{
  flex:0 0 auto; background:var(--panel); border:1px solid var(--line); border-radius:12px;
  padding:8px 12px; text-align:left; cursor:pointer; color:var(--muted);
  display:flex; flex-direction:column; gap:1px; min-width:92px;
}
.daybtn .d-nr{font-family:'IBM Plex Mono',monospace; font-size:10px; text-transform:uppercase; letter-spacing:.08em;}
.daybtn .d-name{font-weight:700; font-size:13px; color:var(--text);}
.daybtn.on{background:var(--panel2);}
.daybtn.on .d-name{color:inherit;}

/* day header */
.dayhead{
  display:flex; justify-content:space-between; align-items:center; gap:10px;
  border-left:3px solid; padding:6px 0 6px 12px; margin:14px 0 12px;
}
.dayhead h2{font-size:19px; margin:0; font-weight:800;}
.dayhead p{margin:2px 0 0; color:var(--muted); font-size:12px;}
.donebtn{
  border:1px solid var(--line); background:var(--panel); color:var(--text);
  font:inherit; font-weight:700; font-size:13px; border-radius:10px; padding:10px 14px; cursor:pointer; flex-shrink:0;
}
.donebtn.on{color:#0D1015;}

/* exercise card */
.excard{background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:14px 14px 12px; margin-bottom:12px;}
.exhead{display:flex; justify-content:space-between; align-items:baseline; gap:8px; margin-bottom:8px;}
.exhead h3{margin:0; font-size:16px; font-weight:800; display:inline;}
.tag{
  display:inline-block; margin-left:8px; font-family:'IBM Plex Mono',monospace; font-size:9.5px;
  text-transform:uppercase; letter-spacing:.08em; color:var(--kracht);
  border:1px solid currentColor; border-radius:5px; padding:2px 5px; vertical-align:2px;
}
.progress{font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--muted);}
.progress.full{color:var(--ok);}

.planline{display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;}
.plan-chip{
  font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:var(--muted);
  background:var(--panel2); border-radius:6px; padding:4px 7px;
}
.plan-chip.main{color:var(--text); font-weight:600;}

.setgrid-head{
  display:grid; grid-template-columns:28px 1fr 1fr 40px; gap:8px;
  font-family:'IBM Plex Mono',monospace; font-size:9.5px; text-transform:uppercase;
  letter-spacing:.08em; color:var(--muted); padding:0 2px 4px;
}
.setgrid-head.interval{grid-template-columns:28px 1fr 40px;}
.setrow{display:grid; grid-template-columns:28px 1fr 1fr 40px; gap:8px; align-items:center; margin-bottom:6px;}
.setrow.interval{grid-template-columns:28px 1fr 40px;}
.setrow.warm{grid-template-columns:28px 1fr 40px;}
.setrow.run{grid-template-columns:1fr 1fr 40px;}
.setnum{font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--muted); text-align:center;}
.warmlabel{font-size:13px; color:var(--muted);}
.setrow input{
  width:100%; background:var(--panel2); border:1px solid var(--line); border-radius:9px;
  color:var(--text); font:inherit; font-size:15px; padding:10px 10px; min-height:42px;
}
.setrow input::placeholder{color:#525E70;}
.setrow input:focus{outline:2px solid var(--kracht); outline-offset:-1px; border-color:var(--kracht);}
.setrow.ok input{border-color:rgba(62,214,168,.45);}
.check{
  height:42px; border-radius:9px; border:1px solid var(--line); background:var(--panel2);
  color:#525E70; font-size:16px; cursor:pointer;
}
.check.on{background:var(--ok); border-color:var(--ok); color:#0D1015; font-weight:700;}
.check:focus-visible{outline:2px solid var(--text);}

/* stretch */
.stretchlist{list-style:none; margin:0 0 10px; padding:0;}
.stretchlist li{
  display:flex; justify-content:space-between; gap:10px; padding:7px 2px;
  border-bottom:1px dashed var(--line); font-size:13.5px;
}
.stretchlist li:last-child{border-bottom:none;}
.stretchlist .dose{color:var(--muted); font-family:'IBM Plex Mono',monospace; font-size:11px; white-space:nowrap;}
.rounds{display:flex; gap:8px;}
.roundbtn{
  flex:1; min-height:42px; border-radius:9px; border:1px solid var(--line); background:var(--panel2);
  color:var(--muted); font:inherit; font-size:13px; font-weight:600; cursor:pointer;
}
.roundbtn.on{background:var(--mob); border-color:var(--mob); color:#0D1015;}

/* info cards — één consistente stijl voor tip / beschrijving / AI tips */
.infocard{
  margin:10px 0 0; background:var(--panel2); border:1px solid var(--line);
  border-left:3px solid var(--line); border-radius:0 10px 10px 0; padding:10px 12px;
}
.infocard .infolabel{
  display:block; font-family:'IBM Plex Mono',monospace; font-size:9.5px; font-weight:600;
  text-transform:uppercase; letter-spacing:.14em; margin-bottom:5px; color:var(--muted);
}
.infocard p{margin:0; font-size:13px; line-height:1.55; color:var(--text);}

.infocard.tip{border-left-color:var(--kracht);}
.infocard.tip .infolabel{color:var(--kracht);}

.infocard.desc{border-left-color:#3B475A;}
.infocard.desc .infolabel{color:var(--text);}
.infocard.desc p{color:var(--muted);}

.infocard.dayintro{margin:0 0 12px; border-left-color:var(--mob);}
.infocard.dayintro .infolabel{color:var(--mob);}
.infocard.dayintro p{color:var(--muted);}

.infocard.aitips{border-left-color:var(--cardio);}
.infocard.aitips .infolabel{color:var(--cardio);}
.infocard.aitips ul{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:5px;}
.infocard.aitips li{
  position:relative; font-size:13px; line-height:1.5; color:var(--text); padding-left:16px;
}
.infocard.aitips li::before{
  content:"→"; position:absolute; left:0; top:0; color:var(--cardio); font-weight:700;
}
.maxline{margin:8px 0 0; font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:var(--muted);}
.exnote{
  width:100%; margin-top:10px; background:transparent; border:none; border-bottom:1px dashed var(--line);
  color:var(--text); font:inherit; font-size:13px; padding:6px 2px;
}
.exnote::placeholder{color:#525E70;}
.exnote:focus{outline:none; border-bottom-color:var(--kracht);}

.daynote{
  width:100%; background:var(--panel); border:1px solid var(--line); border-radius:12px;
  color:var(--text); font:inherit; font-size:14px; padding:12px; margin:4px 0 14px; resize:vertical;
}
.daynote::placeholder{color:#525E70;}
.daynote:focus{outline:2px solid var(--kracht); outline-offset:-1px;}

.sharebtn{
  width:100%; min-height:48px; border-radius:12px; border:none; background:var(--kracht);
  color:#0D1015; font:inherit; font-weight:800; font-size:15px; cursor:pointer;
}
.sharebtn.small{width:auto; min-height:32px; font-size:12px; padding:0 12px; margin-left:auto;}
.sharenote{color:var(--muted); font-size:11.5px; line-height:1.5; margin:8px 0 0;}

/* overview */
.overview{padding-top:12px;}
.ov-intro{color:var(--muted); font-size:12.5px; margin:0 0 14px;}
.ov-week{background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:12px 14px; margin-bottom:12px;}
.ov-week header{display:flex; align-items:center; gap:10px; margin-bottom:8px;}
.ov-week h3{margin:0; font-size:15px; font-weight:800;}
.ov-count{font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:var(--muted);}
.ov-pre{
  white-space:pre-wrap; font-family:'IBM Plex Mono',monospace; font-size:11.5px; line-height:1.6;
  color:var(--text); background:var(--panel2); border-radius:9px; padding:10px 12px; margin:0;
}
.ov-empty{color:#525E70; font-size:13px; margin:0;}

/* progression */
.progview{padding-top:12px;}
.prog-select{
  width:100%; min-height:46px; background:var(--panel); border:1px solid var(--line); border-radius:12px;
  color:var(--text); font:inherit; font-size:15px; font-weight:700; padding:0 12px; margin-bottom:16px;
  -webkit-appearance:none; appearance:none;
}
.prog-select:focus{outline:2px solid var(--kracht); outline-offset:-1px;}
.prog-chart{
  display:flex; gap:12px; align-items:stretch; background:var(--panel); border:1px solid var(--line);
  border-radius:14px; padding:16px 14px 12px; height:210px;
}
.prog-col{flex:1; display:flex; flex-direction:column; align-items:center; gap:4px;}
.prog-val{font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:600;}
.prog-barwrap{
  position:relative; flex:1; width:100%; max-width:52px; border-radius:8px 8px 3px 3px; overflow:hidden;
  background:var(--panel2); display:flex; align-items:flex-end;
}
.prog-plan{
  position:absolute; left:0; right:0; bottom:0; border-top:2px dashed var(--muted); background:transparent;
}
.prog-bar{width:100%; border-radius:6px 6px 0 0; transition:height .25s;}
.prog-wk{font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--text);}
.prog-planlbl{font-family:'IBM Plex Mono',monospace; font-size:9px; color:var(--muted);}
.prog-legend{
  display:flex; align-items:center; gap:6px; font-size:11.5px; color:var(--muted); margin:10px 2px 16px;
}
.prog-legend .dot{width:10px; height:10px; border-radius:3px; display:inline-block;}
.prog-legend .dot.plan{background:transparent; border-top:2px dashed var(--muted); height:0; width:14px; border-radius:0;}
.prog-detail{display:flex; flex-direction:column; gap:8px; margin-top:4px;}
.prog-week{
  background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:10px 12px;
  display:flex; flex-direction:column; gap:3px;
}
.prog-week-lbl{font-family:'IBM Plex Mono',monospace; font-size:10px; text-transform:uppercase; letter-spacing:.1em; color:var(--muted);}
.prog-week-txt{font-family:'IBM Plex Mono',monospace; font-size:13px;}
.prog-note{font-size:12.5px; color:var(--muted);}

/* footer */
.brand{
  margin-top:34px; text-align:center; font-weight:900; font-variation-settings:'wdth' 118;
  font-size:15px; letter-spacing:.04em; color:var(--muted);
}
.brand .accent{color:var(--kracht);}
.brand-sub{
  display:block; font-family:'IBM Plex Mono',monospace; font-size:9.5px; font-weight:400;
  text-transform:uppercase; letter-spacing:.14em; margin-top:4px; color:#525E70;
}

.toast{
  position:fixed; bottom:18px; left:50%; transform:translateX(-50%);
  background:var(--text); color:#0D1015; font-weight:700; font-size:13px;
  border-radius:10px; padding:11px 16px; box-shadow:0 6px 24px rgba(0,0,0,.5); z-index:50; max-width:90vw;
}
`;
