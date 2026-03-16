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
    styleguide.css  # styly
  pages/
    index.astro     # hlavní stránka
astro.config.mjs    # konfigurace Astro
package.json        # závislosti
docker-compose.yml  # Docker konfigurace (dev)
```
