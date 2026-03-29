# Cvičení 6 — twa-ticketapp-2026

## Vzorová aplikace pro správu ticketů.

Minimální Astro projekt. Pracujeme z Docker kontejneru — není potřeba mít Node.js nainstalovaný lokálně.

*Předpoklad:* nainstalovaný Docker Desktop.

---

## 1) Spuštění dev serveru

```bash
docker compose up dev
```

Co se stane:
- Docker stáhne node:24-alpine (jen poprvé)
- Uvnitř kontejneru se automaticky spustí npm install a npm run dev
- Lokální soubory jsou propojené — změny v editoru se projeví okamžitě

Přístup v prohlížeči:
- http://localhost:4322/

---

## 2) Ruční vstup do kontejneru (volitelné)

Pokud potřebuješ spustit npm příkaz (např. instalace balíčku), otevři nový terminál a spusť:

```bash
docker compose exec dev sh
```

Teď jsi uvnitř kontejneru. Spouštěj npm příkazy normálně:

```bash
npm install <balicek>    # instalace balíčku
npm run build            # produkční build
npm run preview          # preview buildu
exit                     # opuštění kontejneru
```

*Všechny npm příkazy spouštěj uvnitř kontejneru, ne na hostitelském počítači.*

---

## 3) Zastavení

Ctrl+C v terminálu kde běží `docker compose up dev`, nebo:

```bash
docker compose down
```

---

## Struktura projektu

```
src/
  styles/
    app.css         # vlastní styly aplikace
  pages/
    index.astro     # hlavní stránka (chráněná přihlášením)
    login.astro     # přihlašovací stránka
astro.config.mjs    # konfigurace Astro (vč. aliasu @sg-styles)
package.json        # závislosti
docker-compose.yml  # Docker konfigurace (dev)
twa-styleguide-2026/  # Git submodul — sdílený style guide
```

---

## Přihlášení

Aplikace používá jednoduchou clientside autentizaci s persistencí v `localStorage`.

| Uživatel | Heslo   |
|----------|---------|
| `admin`  | `admin` |

- Po přihlášení je session uložena v `localStorage` — přežije zavření prohlížeče
- Nepřihlášený uživatel je automaticky přesměrován na `/login`
- Odhlášení smaže session a přesměruje zpět na `/login`

---

## Submodul twa-styleguide-2026

Projekt používá Git submodul [twa-styleguide-2026](https://github.com/pacesmarek/twa-styleguide-2026) — sdílený style guide (CSS proměnné, komponenty, typografie).

Po naklonování repozitáře je potřeba submodul inicializovat:

```bash
git submodule update --init --recursive
```

Nebo při klonování rovnou:

```bash
git clone --recurse-submodules https://github.com/pacesmarek/twa-ticketapp-2026.git
```
