# Project Weyne

**Construir o jogador. Formar o homem. Desenvolver a pessoa.**

Sistema integral de desenvolvimento: homem, pessoa e futebolista, 2026/27. Acordar às 05:00 todos os dias e luzes apagadas às 20:30 (8 h 30 na cama). Quatro modos para cada dia (escola, sem escola, férias e feriado), com horários e sessões próprios: a app sugere o modo pelo calendário escolar e pelos feriados, e muda-se com um toque. Por baixo dos modos, **Tempo mau** passa os treinos de rua e de campo desse dia para casa: em silêncio, sem passes à parede e sem saltos, à mesma hora; a ida e o regresso do campo viram estudo e os testes de campo passam para o próximo dia sem chuva. Manhã do atleta (fé, 10 minutos a ler o jogo com imagens reais, força e técnica em casa em silêncio, mobilidade), tarde do futebolista e do estudante, noite do homem interior (diário, avaliação do dia, leitura, exame de consciência). Cada dia tem uma missão principal, 3 objetivos, os blocos por períodos com o porquê de cada um, o progresso e a avaliação do dia. Política de intensidade: a quarta é o dia máximo (uma sessão com um objetivo, cada esforço a 100%, preparação, supervisão e recuperação planeada), segunda, terça, quinta, sexta e sábado são exigentes, domingo é o jogo; recuperação, mobilidade e sono têm objetivo mas não contam como treino de intensidade. Um só tempo livre por dia.

**Treinos (versão 13, reconstruída de raiz):** uma biblioteca de 98 exercícios, cada um com 13 campos (nome, capacidade, objetivo, material, organização do espaço, instruções, séries e repetições, duração, descanso, intensidade, erros comuns, critérios de sucesso e progressão) e 4 degraus: treinar, dominar, aplicar e manter sob pressão. Técnica (domínio e controlo, passe, condução, drible e criatividade, finalização, técnica avançada), preparação física (aceleração, velocidade máxima, força, potência, resistência, repetição de sprints, agilidade, coordenação, equilíbrio, mobilidade, estabilidade e prevenção), perceção e decisão com transferência para o jogo, tática (princípios, espaços, desmarcação, linhas de passe, pressão, coberturas, transições, sistemas) e as 3 posições: médio, ponta de lança e ponta esquerda. Cada sessão tem duas versões que alternam semana a semana e uma versão com colegas (1v1, rondo, jogo reduzido). Quatro fases (construção da base, desenvolvimento avançado, integração, preparação competitiva) que mudam por critérios de domínio e de avaliação, não por datas. Avaliação de referência nas semanas 1 e 2 e reavaliação a cada 4 semanas nas 13 áreas, com testes de cabeça (tático e de decisão), currículo tático de 24 temas e o trilho competitivo (clube e jogos) desde a fase 1. Só com o material da lista: bola, pesos, barra improvisada, pedras, cones improvisados, banco, cadeira, toalha, espaço exterior e o campo.

Também: 9 áreas do homem com 12 temas cada (caráter e princípios, finanças, comunicação e dicção, pensamento crítico e raciocínio lógico com um problema de lógica por semana, inteligência emocional, liderança, cultura geral, escrita, ciência), plano de leitura da Bíblia e 12 valores, evolução em 9 dimensões com pontos fracos e ajustes, objetivos da semana, do mês e do trimestre, vida de profissional (pré e pós-treino, pré-jogo, análise do jogo, carga da semana com rácio, sono, nutrição e hidratação, prevenção e preparação mental), avaliações da semana, do mês e do trimestre com pontos fortes e pontos fracos, A jornada começa a 10/11/2026.

É uma app web instalável (PWA): fica no ecrã do telemóvel com ícone próprio, abre em ecrã inteiro e funciona sem internet.

**Link:** https://weynemilagre-png.github.io/we/

## Instalar no telemóvel

- **iPhone:** abre o link no Safari, toca em Partilhar e escolhe "Adicionar ao ecrã principal".
- **Android:** abre o link no Chrome e toca em "Instalar" (ou nos três pontos e em "Instalar app").

## Os teus dados

Os blocos feitos, o modo de cada dia, os objetivos e as avaliações, o diário, os check-ins, as intenções, as revisões da semana, os recordes e testes, a fase e o trilho competitivo, os degraus dos exercícios, as cargas da força, as revisões dos jogos, as sessões treinadas e o perfil ficam guardados só neste telemóvel (`localStorage`). Não vão para nenhum servidor e não estão neste repositório. Instalada no ecrã principal, a app protege melhor estes dados do que um separador do browser.

Na primeira abertura da versão de 26/10/2026, os registos antigos vão para um arquivo no próprio telemóvel e a jornada começa limpa. O arquivo entra na cópia de segurança e pode ser reposto em **Mais → Cópia de segurança**.

Para não perder o ano se o telemóvel se estragar ou for trocado: **Mais → Cópia de segurança**. Cria um ficheiro com todos os registos para guardar no email, no Drive ou no WhatsApp, e recupera-o noutro telemóvel. A app lembra a cópia na revisão de domingo.

## Calendário

`rotina-semanal.ics` tem a semana normal (escola à segunda, terça, quinta e sexta, sem escola à quarta e ao sábado; blocos do dia 🟢, sem refeições, duches nem tempo livre) de 10/11/2026 a 28/03/2027, no fuso de Lisboa. Subscreve-se em **Mais → Calendário** e atualiza-se sozinho.

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

Outra app no mesmo site, em `football-iq/`: aprender a ler o jogo com dados dos 103 jogos do CAN 2023 e do Euro 2024. É instalável como o Project Weyne e funciona sem internet. Na primeira abertura guarda a app e todos os dados (cerca de 2 MB a descarregar).

**Link:** https://weynemilagre-png.github.io/we/football-iq/

- Instala-se da mesma forma que o Project Weyne. Os dados de cada uma ficam separados no telemóvel.
- O original está no claude.ai. Fora do Claude, "Perguntar" responde sozinho a termos, notas e resultados, e as avaliações ficam guardadas no telemóvel.
- **Dados:** StatsBomb Open Data, para uso não comercial e com atribuição (está em Perfil → Como funciona). A área "Agora" (Premier League e Liga dos Campeões, da Sportradar) não está aqui: esses dados não podem ser publicados abertamente. Não acrescentes `data/live.json`.
- **Actualizar:** substitui `football-iq/index.html` e os ficheiros em `football-iq/data/` pelos novos. Mantém o bloco de fontes locais, o manifesto e o registo do `sw.js` no `<head>` e no fim do `<body>`. Os jogos novos entram sozinhos na cache porque a lista sai de `data/index.json`.
- O `sw.js` do Project Weyne não toca em `football-iq/` e só apaga caches `rotina-*`. Se acrescentares outra app ao site, junta a pasta dela a `OUTRAS` nesse ficheiro.

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
