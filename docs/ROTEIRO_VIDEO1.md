# Roteiro — Vídeo 1: System Design do App da CazéTV

Duração alvo: ~6 a 8 min · Formato: narração + animação (Manim)

Legenda:
🎙️ = narração (o que você fala) · 🎬 = tela (o que aparece)

---

## Cena 1 — Abertura (0:00 – 0:25)

🎬 Logo com botão de play, título "App da CazéTV" surgindo, subtítulo "System Design".

🎙️ "Bora construir o app da CazéTV. Streaming de esporte ao vivo, de graça, no celular. Mas antes de escrever uma linha de código, a gente vai fazer a parte que separa o app amador do profissional: o system design. Nesse vídeo eu desenho o app inteiro no papel — e você vai ver que isso economiza semanas de retrabalho."

---

## Cena 2 — O desafio (0:25 – 1:30)

🎬 Um celular com selo "AO VIVO" piscando. Ao lado, um gráfico com a audiência subindo de repente num "pico do clássico". Três bullets aparecem em cascata.

🎙️ "Parece simples: é só tocar um vídeo, né? Não é. Streaming ao vivo tem três desafios que quebram a maioria dos apps.

Um — assistir ao vivo, com qualidade, em qualquer conexão.

Dois — e esse é o assassino: aguentar o pico. Num clássico, a audiência pode multiplicar por dez em questão de minutos. Se a arquitetura não prevê isso, o app cai justo na hora H.

Três — baixa latência e resiliência. Se um serviço falha, o torcedor não pode ficar na tela preta."

---

## Cena 3 — Requisitos (1:30 – 2:40)

🎬 Duas colunas: "Funcionais" (verde) e "Não-funcionais" (azul), cada item com um ✓ aparecendo em cascata.

🎙️ "Todo system design começa separando duas coisas.

Os requisitos funcionais — o que o app faz: home com as transmissões ao vivo, agenda de jogos, o player, notificação de 'o jogo vai começar', e busca.

E os não-funcionais — como o app se comporta sob pressão: escala pra aguentar o pico, baixa latência, resiliência quando a API cai, lista fluida no celular e um modo offline decente.

Repara: a lista da direita é a que ninguém vê… até o dia que dá errado. É ela que a gente vai proteger com a arquitetura."

---

## Cena 4 — Arquitetura ⭐ (2:40 – 4:40)

🎬 Monta o diagrama: caixa "App" no topo, "CDN de vídeo" embaixo à esquerda, "API / BFF" à direita, "Banco" abaixo da API. Setas crescem. Pontinhos de dados correm pelos caminhos. Dois planos ao fundo — vídeo (teal) e dados (azul). No fim, o punchline pisca.

🎙️ "Aqui está o coração do design. E o segredo é enxergar que existem dois caminhos separados.

O plano de dados, à direita: o app conversa com a nossa API — que também chamamos de BFF, backend for frontend. Ela entrega a agenda, os eventos, quem tá ao vivo. E lê tudo do banco. São pacotes pequenos, JSON, leves.

E o plano de vídeo, à esquerda: o vídeo em si não vem da nossa API. Ele vem de uma CDN — uma rede de servidores espalhada pelo mundo — no formato HLS. É ELA que aguenta o pico do clássico, porque foi feita pra isso.

E aqui está a sacada que você tem que levar desse vídeo: [pausa] o vídeo não passa pela nossa API. Se passasse, a gente precisaria de uma infraestrutura absurda pra aguentar milhões de torcedores. Ao separar os dois planos, a nossa API fica pequena e barata, e a CDN faz o trabalho pesado."

---

## Cena 5 — Modelo de dados (4:40 – 5:30)

🎬 Painel estilo editor de código. O `type Evento` é escrito linha a linha.

🎙️ "Com a arquitetura de pé, o modelo de dados quase se escreve sozinho. A entidade central é o Evento — o jogo. Ele tem título, campeonato, os dois times, o horário de início, e um status: agendado, ao vivo ou encerrado.

E olha esse campo aqui — a streamUrl, o link do vídeo em HLS. Ele só existe quando o jogo tá ao vivo. Simples assim: se tem URL, tem transmissão."

---

## Cena 6 — As telas (5:30 – 6:15)

🎬 Cinco mini-celulares entram em cascata: Home, Agenda, Player, Detalhe, Busca. O Player ganha destaque.

🎙️ "Traduzindo tudo isso pra telas, o app tem cinco: a Home, com o que tá ao vivo agora. A Agenda, com os próximos jogos. O Player — a estrela. A tela de Detalhe do evento. E a Busca.

Esse mapa de telas vira o roteiro do próximo vídeo, quando a gente começa a codar."

---

## Cena 7 — Stack (6:15 – 7:10)

🎬 Lista de decisões com "pills" coloridas em cascata.

🎙️ "E por último, a stack — com o porquê de cada escolha, que é o que importa.

React Native com Expo, porque dá pra testar no celular na hora e é ótimo pra mostrar em vídeo. Expo Router pra navegação. O expo-video pro player, que já suporta HLS e picture-in-picture. TanStack Query pros dados do servidor — é ele que resolve cache e offline. NativeWind pro estilo. E Expo Notifications pros pushs.

Nenhuma escolha é por moda. Cada uma responde a um requisito lá do começo."

---

## Cena 8 — Fechamento (7:10 – 7:40)

🎬 Recap "Desenhar antes de codar" + gancho: "Próximo vídeo: construindo o app".

🎙️ "E é isso. A gente desenhou o app inteiro sem escrever código de produção — e agora sabe exatamente o que construir, e por quê.

No próximo vídeo, a gente põe a mão na massa: cria o projeto Expo, monta a Home e faz o player rodar. Se quiser acompanhar, se inscreve aí. Valeu, e até a próxima!"

---

### Notas de gravação
- Marque uma **pausa** clara antes do punchline da Cena 4 — é o momento mais importante do vídeo.
- Cenas 4 e 7 são as mais densas: fale um pouco mais devagar.
- Se o vídeo ficar longo, a Cena 5 (modelo de dados) é a mais cortável.
