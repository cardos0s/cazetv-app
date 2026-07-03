"""
Roteiro animado — System Design do App da CazéTV (Vídeo 1)
Manim Community Edition (v0.18+)

COMO RENDERIZAR
---------------
Instala (uma vez):
    pip install manim
    # o Manim precisa do ffmpeg; no Mac: brew install ffmpeg

Renderiza uma cena isolada (prévia rápida, abre no player):
    manim -pql system_design.py Arquitetura      # -ql = baixa qualidade (rápido)
    manim -pqh system_design.py Arquitetura      # -qh = alta qualidade (1080p)

Renderiza o vídeo INTEIRO de uma vez:
    manim -pqh system_design.py Completo

Cenas disponíveis:
    Intro · Problema · Requisitos · Arquitetura · ModeloDados · Telas · Stack · Outro · Completo

DICA: a fonte "Montserrat" deixa tudo mais bonito. Se não tiver instalada,
troque a constante FONT abaixo por "Poppins", "Arial" ou "" (padrão do sistema).
"""

from manim import *

# ─────────────────────────────────────────────────────────────
# Paleta CazéTV + configuração
# ─────────────────────────────────────────────────────────────
FONT   = "Montserrat"   # troque se não tiver instalada

BG     = "#0B0F14"      # fundo quase-preto
VERDE  = "#00E676"      # verde CazéTV (cliente / marca)
TEAL   = "#00BFA5"      # plano de vídeo
AZUL   = "#448AFF"      # plano de dados
ROXO   = "#B388FF"      # push
CINZA  = "#94A3B8"      # texto secundário
GRAF   = "#1E2732"      # superfícies
BRANCO = "#F8FAFC"
VERMELHO = "#FF1744"    # "AO VIVO"

config.background_color = BG


# ─────────────────────────────────────────────────────────────
# Helpers de composição
# ─────────────────────────────────────────────────────────────
def titulo(txt, size=48, grad=(VERDE, TEAL)):
    t = Text(txt, font=FONT, weight=BOLD, font_size=size)
    t.set_color_by_gradient(*grad)
    return t


def cabecalho(txt):
    """Título de topo com sublinhado animável."""
    h = titulo(txt, 42)
    h.to_edge(UP, buff=0.6)
    linha = Underline(h, color=VERDE, stroke_width=3)
    return h, linha


def caixa(label, sub=None, cor=VERDE, w=3.4, h=1.5):
    """Card com borda arredondada, título e subtítulo."""
    box = RoundedRectangle(
        corner_radius=0.2, width=w, height=h,
        stroke_color=cor, stroke_width=3.5,
        fill_color=cor, fill_opacity=0.10,
    )
    lab = Text(label, font=FONT, weight=BOLD, font_size=30, color=BRANCO)
    grp = VGroup(box, lab)
    if sub:
        s = Text(sub, font=FONT, font_size=21, color=cor)
        lab.move_to(box.get_center()).shift(UP * 0.26)
        s.move_to(box.get_center()).shift(DOWN * 0.30)
        grp.add(s)
    else:
        lab.move_to(box.get_center())
    grp.caixa = box  # atalho pra pegar a borda depois
    return grp


def item(txt, cor=VERDE, size=26):
    ck = Text("✓", font=FONT, weight=BOLD, color=cor, font_size=size + 2)
    tx = Text(txt, font=FONT, font_size=size, color=BRANCO)
    return VGroup(ck, tx).arrange(RIGHT, buff=0.25, aligned_edge=UP)


def fluxo(scene, ini, fim, cor, n=3, rt=2.2, radius=0.08):
    """Anima pontos correndo de `ini` até `fim` (pacotes de dados)."""
    caminho = Line(ini, fim)
    pontos = VGroup(*[Dot(radius=radius, color=cor) for _ in range(n)])
    scene.add(pontos)
    scene.play(
        LaggedStart(*[MoveAlongPath(p, caminho) for p in pontos], lag_ratio=0.35),
        run_time=rt,
    )
    scene.remove(pontos)


def limpar(scene):
    if scene.mobjects:
        scene.play(*[FadeOut(m) for m in scene.mobjects], run_time=0.6)


# ─────────────────────────────────────────────────────────────
# 1 — INTRO
# ─────────────────────────────────────────────────────────────
def p_intro(self):
    ring = Circle(radius=0.95, color=VERDE, stroke_width=7)
    play = Triangle(color=VERDE, fill_color=VERDE, fill_opacity=1).scale(0.45).rotate(-PI / 2)
    play.move_to(ring.get_center()).shift(RIGHT * 0.07)
    logo = VGroup(ring, play)

    self.play(Create(ring), FadeIn(play, scale=0.4), run_time=1.1)
    self.play(logo.animate.scale(0.75).to_edge(UP, buff=0.9), run_time=0.9)

    t = titulo("App da CazéTV", 58)
    sub = Text("System Design", font=FONT, font_size=32, color=CINZA)
    VGroup(t, sub).arrange(DOWN, buff=0.35).move_to(ORIGIN).shift(DOWN * 0.2)

    self.play(Write(t), run_time=1.4)
    self.play(FadeIn(sub, shift=UP * 0.3))
    self.wait(1.5)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 2 — O DESAFIO
# ─────────────────────────────────────────────────────────────
def p_problema(self):
    h, linha = cabecalho("O desafio")
    self.play(Write(h), Create(linha))

    # celular à esquerda
    corpo = RoundedRectangle(corner_radius=0.3, width=2.7, height=5,
                             stroke_color=CINZA, stroke_width=3,
                             fill_color=GRAF, fill_opacity=1)
    tela = RoundedRectangle(corner_radius=0.15, width=2.3, height=4.2,
                            fill_color="#05080B", fill_opacity=1, stroke_width=0)
    tela.move_to(corpo.get_center())
    live_dot = Dot(radius=0.09, color=VERMELHO)
    live_txt = Text("AO VIVO", font=FONT, weight=BOLD, font_size=20, color=BRANCO)
    live = VGroup(live_dot, live_txt).arrange(RIGHT, buff=0.12)
    live.move_to(tela.get_top() + DOWN * 0.5)
    campo = RoundedRectangle(corner_radius=0.1, width=1.9, height=1.2,
                             fill_color=VERDE, fill_opacity=0.18, stroke_color=VERDE,
                             stroke_width=1.5).move_to(tela.get_center())
    telefone = VGroup(corpo, tela, campo, live).to_edge(LEFT, buff=1.3)

    self.play(FadeIn(telefone, shift=RIGHT * 0.4))
    self.play(live_dot.animate.set_opacity(0.2), rate_func=there_and_back,
              run_time=0.8)

    # curva de pico de audiência à direita
    eixos = VGroup(
        Line(ORIGIN, RIGHT * 4.2, color=CINZA, stroke_width=2),
        Line(ORIGIN, UP * 2.6, color=CINZA, stroke_width=2),
    ).move_to(RIGHT * 2.4 + DOWN * 0.3)
    origem = eixos.get_center() + LEFT * 2.1 + DOWN * 1.3
    pts = [origem + RIGHT * x + UP * y for x, y in
           [(0, 0.1), (1.2, 0.3), (2.2, 0.5), (3.0, 2.4), (3.6, 2.1), (4.1, 2.3)]]
    curva = VMobject(color=VERDE, stroke_width=5).set_points_smoothly(pts)
    rot = Text("pico do clássico", font=FONT, font_size=22, color=VERDE)
    rot.next_to(pts[3], UP, buff=0.15)

    self.play(Create(eixos))
    self.play(Create(curva), run_time=1.6)
    self.play(FadeIn(rot, shift=DOWN * 0.2))

    linhas = VGroup(
        item("Assistir ao vivo, em qualquer lugar", VERDE, 24),
        item("Aguentar 10x a audiência num minuto", TEAL, 24),
        item("Baixa latência e resiliência", AZUL, 24),
    ).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
    linhas.next_to(eixos, DOWN, buff=0.7).to_edge(RIGHT, buff=0.8)

    self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.3) for l in linhas],
                          lag_ratio=0.4), run_time=1.8)
    self.wait(1.5)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 3 — REQUISITOS
# ─────────────────────────────────────────────────────────────
def p_requisitos(self):
    h, linha = cabecalho("Requisitos")
    self.play(Write(h), Create(linha))

    tit_f = Text("Funcionais", font=FONT, weight=BOLD, font_size=30, color=VERDE)
    func = VGroup(
        item("Home com transmissões ao vivo", VERDE),
        item("Agenda de jogos", VERDE),
        item("Player HLS + tela cheia", VERDE),
        item("Push: \"vai começar\"", VERDE),
        item("Busca por time / campeonato", VERDE),
    ).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
    col_f = VGroup(tit_f, func).arrange(DOWN, buff=0.4, aligned_edge=LEFT)

    tit_nf = Text("Não-funcionais", font=FONT, weight=BOLD, font_size=30, color=AZUL)
    nfunc = VGroup(
        item("Escala de pico (CDN + cache)", AZUL),
        item("Baixa latência no ao vivo", AZUL),
        item("Resiliência: cai a API, cache salva", AZUL),
        item("Lista fluida no device", AZUL),
        item("Offline gracioso", AZUL),
    ).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
    col_nf = VGroup(tit_nf, nfunc).arrange(DOWN, buff=0.4, aligned_edge=LEFT)

    cols = VGroup(col_f, col_nf).arrange(RIGHT, buff=1.3, aligned_edge=UP)
    cols.next_to(linha, DOWN, buff=0.7)

    self.play(FadeIn(tit_f), FadeIn(tit_nf))
    self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.2) for l in func],
                          lag_ratio=0.25), run_time=1.8)
    self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.2) for l in nfunc],
                          lag_ratio=0.25), run_time=1.8)
    self.wait(1.2)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 4 — ARQUITETURA (cena principal)
# ─────────────────────────────────────────────────────────────
def p_arquitetura(self):
    h, linha = cabecalho("Arquitetura")
    self.play(Write(h), Create(linha))

    # dois planos (fundo)
    plano_v = RoundedRectangle(width=5.6, height=4.4, corner_radius=0.3,
                               fill_color=TEAL, fill_opacity=0.06,
                               stroke_color=TEAL, stroke_opacity=0.35, stroke_width=2)
    plano_v.move_to(LEFT * 3.3 + DOWN * 1.1)
    plano_d = RoundedRectangle(width=5.6, height=4.4, corner_radius=0.3,
                               fill_color=AZUL, fill_opacity=0.06,
                               stroke_color=AZUL, stroke_opacity=0.35, stroke_width=2)
    plano_d.move_to(RIGHT * 3.3 + DOWN * 1.1)
    tag_v = Text("PLANO DE VÍDEO", font=FONT, weight=BOLD, font_size=20, color=TEAL)
    tag_v.move_to(plano_v.get_top() + DOWN * 0.35)
    tag_d = Text("PLANO DE DADOS", font=FONT, weight=BOLD, font_size=20, color=AZUL)
    tag_d.move_to(plano_d.get_top() + DOWN * 0.35)

    # caixas
    app = caixa("App", "React Native + Expo", VERDE, w=3.8, h=1.5).move_to(UP * 1.9)
    cdn = caixa("CDN de vídeo", "HLS · aguenta o pico", TEAL, w=3.4, h=1.4)
    cdn.move_to(LEFT * 3.3 + DOWN * 1.4)
    api = caixa("API / BFF", "agenda · eventos", AZUL, w=3.4, h=1.4)
    api.move_to(RIGHT * 3.3 + DOWN * 1.4)
    db = caixa("Banco", "eventos", CINZA, w=2.8, h=1.1)
    db.move_to(RIGHT * 3.3 + DOWN * 3.2)

    # setas
    seta_v = Arrow(app.caixa.get_corner(DL) + RIGHT * 0.2, cdn.caixa.get_top(),
                   color=TEAL, buff=0.12, stroke_width=4, max_tip_length_to_length_ratio=0.12)
    seta_d = Arrow(app.caixa.get_corner(DR) + LEFT * 0.2, api.caixa.get_top(),
                   color=AZUL, buff=0.12, stroke_width=4, max_tip_length_to_length_ratio=0.12)
    seta_db = Arrow(api.caixa.get_bottom(), db.caixa.get_top(),
                    color=CINZA, buff=0.12, stroke_width=4, max_tip_length_to_length_ratio=0.2)

    lbl_v = Text("HLS", font=FONT, font_size=22, color=TEAL).next_to(seta_v.get_center(), LEFT, buff=0.15)
    lbl_d = Text("JSON", font=FONT, font_size=22, color=AZUL).next_to(seta_d.get_center(), RIGHT, buff=0.15)

    # entra em cena
    self.play(FadeIn(plano_v), FadeIn(plano_d), Write(tag_v), Write(tag_d))
    self.play(DrawBorderThenFill(app), run_time=1.1)
    self.play(DrawBorderThenFill(cdn), DrawBorderThenFill(api), run_time=1.1)
    self.play(GrowArrow(seta_v), GrowArrow(seta_d), FadeIn(lbl_v), FadeIn(lbl_d))
    self.play(DrawBorderThenFill(db), GrowArrow(seta_db))

    # fluxos de dados
    fluxo(self, app.caixa.get_corner(DR) + LEFT * 0.2, api.caixa.get_top(), AZUL, n=3)  # request
    fluxo(self, api.caixa.get_bottom(), db.caixa.get_top(), CINZA, n=2)                  # lê banco
    fluxo(self, cdn.caixa.get_top(), app.caixa.get_corner(DL) + RIGHT * 0.2, TEAL, n=4)  # vídeo sobe

    # punchline
    key = Text("O vídeo não passa pela API.", font=FONT, weight=BOLD, font_size=34, color=BRANCO)
    key.to_edge(DOWN, buff=0.5)
    self.play(Write(key))
    self.play(key.animate.set_color(VERDE).scale(1.08),
              Flash(key, color=VERDE, line_length=0.25, num_lines=16, flash_radius=2.4))
    self.wait(1.8)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 5 — MODELO DE DADOS
# ─────────────────────────────────────────────────────────────
def p_modelo(self):
    h, linha = cabecalho("Modelo de dados")
    self.play(Write(h), Create(linha))

    linhas = [
        ("type ", "Evento", " = {", BRANCO),
        ("  id, titulo, campeonato", "", "", CINZA),
        ("  timeCasa, timeFora: ", "Time", "", TEAL),
        ("  inicio: ", "Date", "", AZUL),
        ("  status: ", "'ao_vivo' | 'agendado' | 'encerrado'", "", VERDE),
        ("  streamUrl?: ", "string  // .m3u8", "", TEAL),
        ("}", "", "", BRANCO),
    ]
    txt = VGroup()
    for a, b, c, cor in linhas:
        linha_txt = VGroup(
            Text(a, font=FONT, font_size=26, color=CINZA if a.startswith("  ") else BRANCO),
            Text(b, font=FONT, weight=BOLD, font_size=26, color=cor),
            Text(c, font=FONT, font_size=26, color=BRANCO),
        ).arrange(RIGHT, buff=0.08, aligned_edge=DOWN)
        txt.add(linha_txt)
    txt.arrange(DOWN, buff=0.24, aligned_edge=LEFT)

    painel = RoundedRectangle(corner_radius=0.2, width=txt.width + 1.2,
                              height=txt.height + 1.0, fill_color=GRAF,
                              fill_opacity=1, stroke_color=CINZA, stroke_width=1.5)
    painel.move_to(txt.get_center())
    bolinhas = VGroup(*[Dot(radius=0.06, color=c) for c in [VERMELHO, "#FFC400", VERDE]])
    bolinhas.arrange(RIGHT, buff=0.12).move_to(painel.get_corner(UL) + DR * 0.3)

    grupo = VGroup(painel, bolinhas, txt).move_to(ORIGIN).shift(DOWN * 0.3)

    self.play(FadeIn(painel), FadeIn(bolinhas))
    self.play(LaggedStart(*[Write(l) for l in txt], lag_ratio=0.35), run_time=2.6)
    self.wait(1.5)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 6 — TELAS DO APP
# ─────────────────────────────────────────────────────────────
def _mini_phone(nome, cor):
    corpo = RoundedRectangle(corner_radius=0.16, width=1.7, height=3.4,
                             stroke_color=cor, stroke_width=2.5,
                             fill_color=GRAF, fill_opacity=1)
    barra = RoundedRectangle(corner_radius=0.06, width=1.3, height=0.7,
                             fill_color=cor, fill_opacity=0.45, stroke_width=0)
    barra.move_to(corpo.get_top() + DOWN * 0.6)
    linhas = VGroup(*[
        RoundedRectangle(corner_radius=0.04, width=1.3, height=0.22,
                         fill_color=CINZA, fill_opacity=0.4, stroke_width=0)
        for _ in range(3)
    ]).arrange(DOWN, buff=0.18).move_to(corpo.get_center() + DOWN * 0.3)
    label = Text(nome, font=FONT, weight=BOLD, font_size=22, color=BRANCO)
    label.next_to(corpo, DOWN, buff=0.25)
    return VGroup(corpo, barra, linhas, label)


def p_telas(self):
    h, linha = cabecalho("As telas")
    self.play(Write(h), Create(linha))

    dados = [("Home", VERDE), ("Agenda", AZUL), ("Player", TEAL),
             ("Detalhe", ROXO), ("Busca", VERDE)]
    telas = VGroup(*[_mini_phone(n, c) for n, c in dados])
    telas.arrange(RIGHT, buff=0.5).scale_to_fit_width(12).move_to(ORIGIN).shift(DOWN * 0.3)

    self.play(LaggedStart(*[FadeIn(t, shift=UP * 0.4) for t in telas],
                          lag_ratio=0.35), run_time=2.4)
    self.play(telas[2].animate.scale(1.12),
              Indicate(telas[2], color=TEAL, scale_factor=1.0))
    self.wait(1.4)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 7 — STACK
# ─────────────────────────────────────────────────────────────
def _stack_row(area, escolha, cor):
    a = Text(area, font=FONT, font_size=26, color=CINZA)
    seta = Text("→", font=FONT, font_size=26, color=cor)
    pill = RoundedRectangle(corner_radius=0.22, height=0.6,
                            fill_color=cor, fill_opacity=0.15,
                            stroke_color=cor, stroke_width=2)
    esc = Text(escolha, font=FONT, weight=BOLD, font_size=24, color=cor)
    pill.stretch_to_fit_width(esc.width + 0.5)
    tag = VGroup(pill, esc)
    esc.move_to(pill.get_center())
    row = VGroup(a, seta, tag).arrange(RIGHT, buff=0.3)
    a.align_to(row, LEFT)
    return row


def p_stack(self):
    h, linha = cabecalho("Stack (e o porquê)")
    self.play(Write(h), Create(linha))

    rows = VGroup(
        _stack_row("Framework", "React Native + Expo", VERDE),
        _stack_row("Navegação", "Expo Router", VERDE),
        _stack_row("Player", "expo-video (HLS + PiP)", TEAL),
        _stack_row("Dados do servidor", "TanStack Query", AZUL),
        _stack_row("Estilo", "NativeWind", AZUL),
        _stack_row("Notificações", "Expo Notifications", ROXO),
    ).arrange(DOWN, buff=0.38, aligned_edge=LEFT)
    rows.next_to(linha, DOWN, buff=0.7)

    self.play(LaggedStart(*[FadeIn(r, shift=RIGHT * 0.3) for r in rows],
                          lag_ratio=0.3), run_time=2.6)
    self.wait(1.5)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 8 — OUTRO
# ─────────────────────────────────────────────────────────────
def p_outro(self):
    recap = VGroup(
        Text("Desenhar antes de codar.", font=FONT, weight=BOLD, font_size=40, color=BRANCO),
        Text("Vídeo o pico aguenta. A arquitetura, também.", font=FONT, font_size=26, color=CINZA),
    ).arrange(DOWN, buff=0.4)
    self.play(Write(recap[0]))
    self.play(FadeIn(recap[1], shift=UP * 0.2))
    self.wait(1.2)
    self.play(recap.animate.to_edge(UP, buff=1.2))

    prox = titulo("Próximo vídeo: construindo o app 🎬".replace("🎬", ""), 34)
    prox2 = Text("Scaffold Expo · Home · Player", font=FONT, font_size=24, color=CINZA)
    bloco = VGroup(prox, prox2).arrange(DOWN, buff=0.3).move_to(DOWN * 0.5)
    self.play(FadeIn(bloco, shift=UP * 0.3))
    self.wait(2)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# Cenas (cada uma renderiza sozinha)
# ─────────────────────────────────────────────────────────────
class Intro(Scene):
    def construct(self): p_intro(self)


class Problema(Scene):
    def construct(self): p_problema(self)


class Requisitos(Scene):
    def construct(self): p_requisitos(self)


class Arquitetura(Scene):
    def construct(self): p_arquitetura(self)


class ModeloDados(Scene):
    def construct(self): p_modelo(self)


class Telas(Scene):
    def construct(self): p_telas(self)


class Stack(Scene):
    def construct(self): p_stack(self)


class Outro(Scene):
    def construct(self): p_outro(self)


class Completo(Scene):
    """Renderiza o vídeo inteiro em sequência."""
    def construct(self):
        for parte in [p_intro, p_problema, p_requisitos, p_arquitetura,
                       p_modelo, p_telas, p_stack, p_outro]:
            parte(self)
