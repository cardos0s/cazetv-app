# App da CazéTV 📺

App de streaming de esporte ao vivo — **Vídeo 2** da série (a construção).
Segue o system design do Vídeo 1 (`../docs/SYSTEM_DESIGN.md`).

## Stack
- **Expo** (SDK 57) + **Expo Router** (navegação por arquivos)
- **expo-video** — player HLS de verdade
- **TypeScript**
- Estilo com `StyleSheet` + tokens de tema (`src/theme.ts`)

## Como rodar
```bash
npm install        # já configurado com legacy-peer-deps (.npmrc)
npm start          # abre o Metro + QR code
# aperte 'i' (iOS), 'a' (Android) ou leia o QR no app Expo Go
```

## As 5 telas
| Rota | Tela | O que faz |
|---|---|---|
| `app/(tabs)/index.tsx` | **Home** | Carrossel "ao vivo agora" + próximos + resultados |
| `app/(tabs)/agenda.tsx` | **Agenda** | Jogos agrupados por dia (SectionList) |
| `app/(tabs)/busca.tsx` | **Busca** | Filtra por time/campeonato + sugestões |
| `app/evento/[id].tsx` | **Detalhe** | Confronto, infos e botão assistir/lembrete |
| `app/player/[id].tsx` | **Player** | Vídeo HLS em tela cheia + reações |

## Estrutura
```
app/            → rotas (Expo Router)
src/
  theme.ts      → paleta CazéTV (mesma do vídeo de system design)
  types.ts      → modelo de dados (Evento, Time)
  data/         → dados mockados + seletores (aoVivoAgora, proximos, buscar...)
  components/   → EventoCard, DestaqueCard, Escudo, LiveBadge, Logo
```

## Dados
Tudo mockado em `src/data/eventos.ts` (fase 1 do design). Os jogos "ao vivo"
usam **streams HLS de teste públicos**, então o player toca de verdade na demo.
Próximo passo (Vídeo 3): trocar o mock por uma API real com TanStack Query.
