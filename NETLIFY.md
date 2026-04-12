# Netlify Deployment Guide

## Co je připraveno

Projekt je nakonfigurován pro deployment na Netlify s těmito změnami:

1. **Static + Server Routes** — `output: 'static'` s jednotlivými server-rendered API routes (Astro 6)
2. **Netlify Adapter** — `@astrojs/netlify` převádí API routes na Netlify Functions
3. **Client-side data loading** — Stránky načítají data pomocí Alpine.js a `fetch()` z API
4. **Netlify Blobs** — `@netlify/blobs` ukládá tickets do cloudového key-value storage místo lokálního `tickets.json`
5. **Build konfigurace** — `netlify.toml` obsahuje build příkazy a nastavení

## Výhody tohoto přístupu

- ✅ Stránky jsou statické HTML soubory (rychlé načtení)
- ✅ Netlify Functions se volají jen pro API operace (CRUD)
- ✅ Nižší spotřeba Function calls = levnější provoz
- ✅ Data vždy aktuální (načítají se z API, ne z build času)

## Server vs Static režim

### S `output: 'server'` (SSR):

Každý request na `/tickets`:
1. Netlify Function spustí celou stránku (SSR)
2. Server zavolá `const tickets = await getTickets()`
3. Vygeneruje HTML s daty natvrdo embedovanými v HTML
4. Odešle kompletní HTML → uživatel
5. **= 1 Function call na každé načtení stránky**

### S `output: 'static'` (JAMstack):

**Při buildu:**
- Vygeneruje se `/tickets/index.html` (prázdná šablona bez dat)

**Každý request na `/tickets`:**
1. Netlify servíruje statický HTML z CDN (**0 Function calls**)
2. Alpine.js v prohlížeči: `fetch('/api/tickets')` (**1 Function call jen pro data**)
3. Data se zobrazí v tabulce dynamicky

**Výsledek:**
- Server: **1 Function call = celá stránka**
- Static: **0 Function pro stránku + 1 Function jen pro data**
- → Rychlejší, levnější, lépe škáluje

## Lokální vývoj

```bash
# Docker (doporučeno)
docker compose up

# Nebo přímo
npm run dev
```

**⚠️ Poznámka:** V lokálním vývoji Netlify Blobs pracuje v in-memory režimu. Data se nezachovají po restartu. Pro plnou funkcionalitu testujte na Netlify preview.

## Deployment na Netlify

### Varianta 1: Automatický deploy z GitHubu

1. Pushněte projekt na GitHub
2. Přihlaste se na [netlify.com](https://netlify.com)
3. **Add new site** → **Import an existing project**
4. Připojte GitHub repository
5. Netlify automaticky detekuje `netlify.toml` a spustí build

### Varianta 2: Manuální deploy pomocí Netlify CLI

```bash
# Nainstalovat Netlify CLI
npm install -g netlify-cli

# Přihlásit se
netlify login

# Inicializovat projekt
netlify init

# Deploy
netlify deploy --prod
```

## Netlify Blobs Storage

Data jsou uložena v Netlify Blobs store pod názvem `tickets`. 

**Free tier limity:**
- 1 GB storage
- 1 GB bandwidth/měsíc

**Initial data:** První přístup vrátí prázdné pole, protože Blobs store je prázdný. Pro nahrání počátečních dat můžete:
- Vytvořit tickets ručně přes UI po deployi
- Vytvořit migration script (viz níže)

### Migration script (volitelné)

Pokud chcete nahrát existující data ze `src/data/tickets.json`:

```bash
# Vytvořit API route pro inicializaci
# src/pages/api/init-data.ts
```

## Kontrola funkčnosti

Po deployi otestujte:
- ✅ Načtení stránky
- ✅ Přihlášení (admin/admin)
- ✅ Vytvoření nového ticketu
- ✅ Editace ticketu
- ✅ Smazání ticketu
- ✅ Refresh stránky — data se zachovají

## Submodule

**Důležité:** Před deployem zkontrolujte, že submodule `twa-styleguide-2026` je aktuální:

```bash
git submodule update --init --recursive
```

Netlify automaticky inicializuje submodules při buildu.

## Troubleshooting

### Build fails
Zkontrolujte Node verzi v `netlify.toml` (musí být >= 22.12.0)

### Data se neukládají
- Netlify Functions mají read-only filesystem
- Data MUSÍ být v Netlify Blobs, ne v `tickets.json`
- Zkontrolujte, že `src/lib/tickets.ts` používá `@netlify/blobs`

### Styly nefungují
Ujistěte se, že submodule je správně inicializován a `@sg-styles` alias funguje

## Environment Variables

Pokud byste v budoucnu potřebovali environment variables:

1. Netlify Dashboard → Site settings → Environment variables
2. Nebo lokálně v `.env` (již je v `.gitignore`)

## Náklady

S Free tier Netlify:
- ✅ 100 GB bandwidth/měsíc
- ✅ Netlify Functions: 125k požadavků/měsíc
- ✅ Netlify Blobs: 1 GB storage + 1 GB bandwidth
- ✅ SSR/SSG stránky bez limitu

Pro váš projekt je to zdarma.
