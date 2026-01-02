# Payload Hydration Fix Patch

## Problema
Versione: Payload 3.69.0 + Next.js 15
Descrizione: Il componente `RootLayout` di Payload inietta uno stile `<style>` nel server-rendering per prevenire il FOUC. Questo causa un conflitto di idratazione (Hydration Mismatch) con Next.js 15 lato client, facendo crashare l'app in dev mode.

## Soluzione
Questa patch rimuove l'iniezione dello stile server-side all'interno di `node_modules/@payloadcms/next/dist/layouts/Root/index.js` e aggiunge `suppressHydrationWarning` al tag `<head>`.

## Quando rimuoverla?
Questa patch è legata alla versione `3.69.0`.
Quando aggiornerai Payload a una nuova versione, pnpm smetterà di applicarla.
Se l'errore "Hydration failed" non compare più con la nuova versione, puoi cancellare questa cartella e rimuovere la entry `patchedDependencies` dal `package.json`.

## Riferimenti
Se apri una issue su GitHub, incolla qui il link per tracciare la risoluzione ufficiale.
