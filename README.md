# Rotina 2026/27

App de treino e rotina: sistema de desenvolvimento do extremo esquerdo, 12.º ano, 2026/27.

É uma app web instalável (PWA): fica no ecrã do telemóvel com ícone próprio, abre em ecrã inteiro e funciona sem internet.

**Link:** https://weynemilagre-png.github.io/we/

## Instalar no telemóvel

- **iPhone:** abre o link no Safari, toca em Partilhar e escolhe "Adicionar ao ecrã principal".
- **Android:** abre o link no Chrome e toca em "Instalar" (ou nos três pontos e em "Instalar app").

## Os teus dados

O diário, os blocos feitos e o nível de cada dia ficam guardados só neste telemóvel (`localStorage`). Não vão para nenhum servidor. Instalada no ecrã principal, a app protege melhor estes dados do que um separador do browser.

Para não perder o ano se o telemóvel se estragar ou for trocado: **Mais → Cópia de segurança**. Cria um ficheiro com todos os registos para guardar no email, no Drive ou no WhatsApp, e recupera-o noutro telemóvel. A app lembra a cópia na revisão de domingo.

## Calendário

`rotina-semanal.ics` tem a semana normal (blocos do dia 🟢, sem refeições, duches nem tempo livre) de 5/10/2026 a 28/03/2027, no fuso de Lisboa. Subscreve-se em **Mais → Calendário** e atualiza-se sozinho.

Se mudares horários em `index.html`, gera o calendário de novo antes do push:

```
node tools/gerar-calendario.mjs
```

## Publicar (uma vez)

1. Settings → General → Danger Zone → Change visibility → **Public**. O GitHub grátis só publica sites de repositórios públicos.
2. Settings → Pages → Build and deployment → Source: **Deploy from a branch**, Branch: **main**, pasta **/ (root)** → Save.

## Atualizar

- O conteúdo está todo em `index.html`. Cada push para `main` chega ao telemóvel sozinho na abertura seguinte com internet.
- Se mudares ícones ou fontes, sobe a `VERSION` em `sw.js`.

## Ficheiros

| Ficheiro | O que é |
| --- | --- |
| `index.html` | A app |
| `manifest.webmanifest` | Nome, ícone e cores da app instalada |
| `sw.js` | Guarda a app para funcionar sem internet |
| `rotina-semanal.ics` | O calendário para subscrever |
| `tools/gerar-calendario.mjs` | Gera o calendário a partir de `index.html` |
| `icons/` | Ícones (o cone) |
| `fonts/` | Barlow e Big Shoulders Display, licença SIL OFL 1.1 (`fonts/OFL.txt`) |
