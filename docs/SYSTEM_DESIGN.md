# System Design — App da CazéTV 📺

> Roteiro do **Vídeo 1**. A ideia é pensar o app *antes* de escrever código.
> Stack alvo: **React Native + Expo**. Escopo: **app de streaming completo**.

---

## 1. O que é o app

A CazéTV transmite esporte ao vivo de graça (Champions League, NBA, Brasileirão, etc.).
O app mobile precisa entregar essa experiência no celular:

- **Assistir ao vivo** com player de vídeo em baixa latência.
- **Descobrir** o que está no ar agora e o que vem depois (agenda).
- **Não perder o jogo** — notificação de "vai começar".
- **Reengajar** — reações/chat durante a transmissão (fase 2).

## 2. Personas & jobs-to-be-done

| Persona | O que quer |
|---|---|
| Torcedor | Abrir o app e cair direto no jogo que está ao vivo |
| Planejador | Ver a agenda da semana e ativar lembrete |
| Zapeador | Trocar rápido entre transmissões simultâneas |

## 3. Requisitos

### Funcionais
- [ ] Home com carrossel de transmissões **ao vivo agora**
- [ ] Agenda de jogos (por dia / por campeonato)
- [ ] Player de vídeo ao vivo (HLS) em tela cheia e picture-in-picture
- [ ] Detalhe do evento (times, campeonato, horário, "assistir")
- [ ] Push notification: "o jogo X vai começar"
- [ ] Busca por time / campeonato

### Não-funcionais (o que separa app amador de profissional)
- **Escala de pico**: um clássico pode 10x a audiência em minutos → CDN + cache.
- **Baixa latência**: streaming ao vivo tolera poucos segundos de atraso.
- **Resiliência**: se a API cair, a home mostra último estado em cache.
- **Performance no device**: lista fluida (FlatList), imagens otimizadas.
- **Offline gracioso**: agenda visível mesmo sem conexão.

## 4. Arquitetura de alto nível

```
┌─────────────┐     HTTPS/JSON      ┌──────────────┐
│  App (RN)   │ ──────────────────► │   API/BFF    │
│  Expo       │ ◄────────────────── │  (eventos,   │
└──────┬──────┘                     │   agenda)    │
       │                            └──────┬───────┘
       │ HLS (.m3u8)                       │
       │                                   ▼
       ▼                            ┌──────────────┐
┌─────────────┐                     │   Banco      │
│  CDN de     │ ◄────ingestão────── │  (eventos)   │
│  vídeo      │      de vídeo       └──────────────┘
└─────────────┘
```

- **App (React Native + Expo)**: UI, navegação, player, push.
- **BFF/API**: entrega dados prontos pro app (agenda, eventos ao vivo, URLs de stream).
- **CDN de vídeo**: serve o HLS (`.m3u8` + segmentos) perto do usuário. É o que aguenta o pico.
- **Push (Expo Notifications / FCM)**: dispara os lembretes.

## 5. Modelo de dados (simplificado)

```ts
type Evento = {
  id: string
  titulo: string          // "Real Madrid x Barcelona"
  campeonato: string      // "La Liga"
  timeCasa: Time
  timeFora: Time
  inicio: string          // ISO datetime
  status: 'agendado' | 'ao_vivo' | 'encerrado'
  streamUrl?: string      // .m3u8 (só quando ao vivo)
  thumbnail: string
}

type Time = { id: string; nome: string; escudo: string }

type Usuario = {
  id: string
  lembretes: string[]     // ids de eventos
  pushToken?: string
}
```

## 6. Telas do app (vira o mapa do Vídeo 2)

1. **Home** — "ao vivo agora" + destaques + próximos jogos
2. **Agenda** — lista por dia, filtro por campeonato
3. **Player** — vídeo ao vivo, controles, PiP
4. **Detalhe do evento** — info + botão assistir + lembrete
5. **Busca**

## 7. Decisões de stack (e o porquê)

| Decisão | Escolha | Por quê |
|---|---|---|
| Framework | React Native + Expo | Setup rápido, testa no celular via QR, bom pra gravar |
| Navegação | Expo Router | Roteamento por arquivos, familiar pra quem vem do Next |
| Player | `expo-video` | Player oficial, suporta HLS e PiP |
| Estado servidor | TanStack Query | Cache, refetch, offline — resolve os não-funcionais |
| Estilo | NativeWind (Tailwind) | Rápido de escrever, consistente |
| Notificações | Expo Notifications | Push com pouco setup |
| Dados (fase 1) | API mock / JSON | Foca na UI antes do backend real |

## 8. Roadmap dos vídeos

- **Vídeo 1 (este doc)**: system design — requisitos, arquitetura, telas, stack.
- **Vídeo 2**: scaffold do Expo + navegação + Home + Player com dados mock.
- **Vídeo 3 (opcional)**: agenda, busca e push notifications.

---

### Ganchos pra falar na câmera 🎙️
- "Por que desenhar antes de codar? Porque refazer arquitetura no meio custa caro."
- "O segredo de um app de streaming não é o player — é aguentar o pico do clássico."
- "CDN é o herói invisível: o vídeo nem passa pela nossa API."
