# Rotina 2026/27

Projeto Weyne: sistema de desenvolvimento de um futebolista, 2026/27. Segunda a sábado de treino, cada dia no limite de uma qualidade diferente, e domingo de descanso e futsal. O dia divide-se em manhã (o indivíduo), tarde (o futebolista) e noite (a mente), com um só tempo livre. As 4 posições (médio centro, extremo esquerdo, médio ofensivo e ponta de lança) têm um dia cada. Biblioteca de exercícios com ficha completa, níveis e critérios para subir ou descer, plano de 12 semanas com critérios para avançar, testes no fim de cada ciclo de 4 semanas, revisão do jogo e revisão semanal com decisões. A jornada começou a 26/10/2026.

É uma app web instalável (PWA): fica no ecrã do telemóvel com ícone próprio, abre em ecrã inteiro e funciona sem internet.

**Link:** https://weynemilagre-png.github.io/we/

## Instalar no telemóvel

- **iPhone:** abre o link no Safari, toca em Partilhar e escolhe "Adicionar ao ecrã principal".
- **Android:** abre o link no Chrome e toca em "Instalar" (ou nos três pontos e em "Instalar app").

## Os teus dados

Os blocos feitos, o diário, os check-ins, as intenções, as revisões da semana, os recordes e testes, os níveis dos exercícios, as cargas da força, as revisões dos jogos, as sessões treinadas e o perfil ficam guardados só neste telemóvel (`localStorage`). Não vão para nenhum servidor e não estão neste repositório. Instalada no ecrã principal, a app protege melhor estes dados do que um separador do browser.

Na primeira abertura da versão de 26/10/2026, os registos antigos vão para um arquivo no próprio telemóvel e a jornada começa limpa. O arquivo entra na cópia de segurança e pode ser reposto em **Mais → Cópia de segurança**.

Para não perder o ano se o telemóvel se estragar ou for trocado: **Mais → Cópia de segurança**. Cria um ficheiro com todos os registos para guardar no email, no Drive ou no WhatsApp, e recupera-o noutro telemóvel. A app lembra a cópia na revisão de domingo.

## Calendário

`rotina-semanal.ics` tem a semana normal (blocos do dia 🟢, sem refeições, duches nem tempo livre) de 26/10/2026 a 28/03/2027, no fuso de Lisboa. Subscreve-se em **Mais → Calendário** e atualiza-se sozinho.

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

## FOOTBALL IQ

Outra app no mesmo site, em `football-iq/`: aprender a ler o jogo com dados dos 103 jogos do CAN 2023 e do Euro 2024. É instalável como a Rotina e funciona sem internet. Na primeira abertura guarda a app e todos os dados (cerca de 2 MB a descarregar).

**Link:** https://weynemilagre-png.github.io/we/football-iq/

- Instala-se da mesma forma que a Rotina. Os dados de cada uma ficam separados no telemóvel.
- O original está no claude.ai. Fora do Claude, "Perguntar" responde sozinho a termos, notas e resultados, e as avaliações ficam guardadas no telemóvel.
- **Dados:** StatsBomb Open Data, para uso não comercial e com atribuição (está em Perfil → Como funciona). A área "Agora" (Premier League e Liga dos Campeões, da Sportradar) não está aqui: esses dados não podem ser publicados abertamente. Não acrescentes `data/live.json`.
- **Actualizar:** substitui `football-iq/index.html` e os ficheiros em `football-iq/data/` pelos novos. Mantém o bloco de fontes locais, o manifesto e o registo do `sw.js` no `<head>` e no fim do `<body>`. Os jogos novos entram sozinhos na cache porque a lista sai de `data/index.json`.
- O `sw.js` da Rotina não toca em `football-iq/` e só apaga caches `rotina-*`. Se acrescentares outra app ao site, junta a pasta dela a `OUTRAS` nesse ficheiro.

## Ficheiros

| Ficheiro | O que é |
| --- | --- |
| `football-iq/` | A app FOOTBALL IQ (página, dados, `sw.js` próprio, ícones e fontes) |
| `index.html` | A app |
| `manifest.webmanifest` | Nome, ícone e cores da app instalada |
| `sw.js` | Guarda a app para funcionar sem internet |
| `rotina-semanal.ics` | O calendário para subscrever |
| `tools/gerar-calendario.mjs` | Gera o calendário a partir de `index.html` |
| `icons/` | Ícones (o cone) |
| `fonts/` | Barlow e Big Shoulders Display, licença SIL OFL 1.1 (`fonts/OFL.txt`) |
