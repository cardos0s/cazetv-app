# CazéTV — App de Streaming de Esportes ⚽📺

Projeto de conteúdo em **dois vídeos**: do **system design** à **construção** de um app de streaming esportivo inspirado na CazéTV, com tema **Copa 2026**. Feito em **React Native + Expo**.

> ⚠️ **Projeto educacional / demonstração.** Não é afiliado à CazéTV nem ao Casimiro. Todos os dados (jogos, placares, chat, canais) são **fictícios** e o "vídeo" do player é um **mockup animado** — não há transmissão real. A marca CazéTV pertence aos seus donos.

---

## 🎬 Sobre a série

| Vídeo | Tema | Onde está |
|-------|------|-----------|
| **1 — System Design** | Como se pensa a arquitetura de um app de streaming antes de codar | [`docs/`](docs/) + [`manim/`](manim/) |
| **2 — Construindo o app** | Implementação da UI a partir de um design handoff de alta fidelidade | [`app-mobile/`](app-mobile/) |

## 📁 Estrutura

```
cazetv/
├── docs/         # System design, modelo de dados e roteiros de narração
├── manim/        # Animações do Vídeo 1 (Manim / Python)
└── app-mobile/   # O app (Expo Router + TypeScript)
```

---

## 📱 O app (`app-mobile/`)

### Telas
- **Início** — hero do jogo ao vivo, "ao vivo agora", jogos de hoje e cortes
- **Copa** — hub do torneio: Hoje, Grupos (tabela) e Mata-mata (chaveamento)
- **Ao Vivo** — canais e resenhas transmitindo (Principal, Resenha do Casimiro, etc.)
- **Perfil** — placeholder
- **Player** — vídeo (mockup de campo) + placar ao vivo + abas **Chat / Estatísticas** + reações flutuantes

### Destaques de implementação
- **Estados ao vivo simulados**: o minuto do jogo corre (+1 a cada 5s) e o chat da torcida recebe mensagens novas sozinho (a cada ~2,8s).
- **Animações** com `react-native-reanimated`: entradas em cascata, pulso do "AO VIVO", feedback de toque e reações que sobem sobre o vídeo.
- **Mockup do gramado** (`FieldMock`) com bola animada — sem depender de stream externo, ideal pra gravar.
- **Fidelidade de design**: fontes **Anton** + **Archivo**, paleta e espaçamentos do handoff.

### Stack
`Expo Router` · `TypeScript` · `react-native-reanimated` · `expo-linear-gradient` · `@expo-google-fonts` (Anton, Archivo) · `@expo/vector-icons`

---

## 🚀 Rodando o app

Pré-requisitos: **Node 18+** e o app **Expo Go** no celular (ou um simulador iOS/Android).

```bash
cd app-mobile
npm install
npm start
```

Depois, no terminal do Metro:
- **`i`** abre no simulador iOS
- **`a`** abre no Android
- ou leia o **QR code** com o Expo Go

---

## 🎨 Vídeo 1 — Animações (Manim)

```bash
cd manim
pip install manim            # requer ffmpeg
manim -pqh system_design.py Completo   # renderiza o vídeo inteiro
```

Cada cena também renderiza sozinha (ex.: `manim -pqh system_design.py Arquitetura`).

---

## 📄 Licença

Uso educacional. Marcas e identidade visual da CazéTV são de seus respectivos donos.
