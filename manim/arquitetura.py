"""
Roteiro animado — Arquitetura em Camadas do App da CazéTV
Manim Community Edition (v0.18+)

RENDERIZAR
    manim -pqh arquitetura.py Completo        # vídeo inteiro
    manim -pql arquitetura.py Camadas         # prévia rápida da cena principal

Cenas: Intro · Camadas · Fecho · Completo
"""

from manim import *

FONT = "Montserrat"

BG     = "#0b0c11"
VERDE  = "#1de782"   # server state / marca
GOLD   = "#ffc531"   # tempo real / socket
AZUL   = "#5bd0ff"
CINZA  = "#8b909b"
GRAF   = "#181b22"
BRANCO = "#f8fafc"

config.background_color = BG


def titulo(txt, size=46, grad=(VERDE, AZUL)):
    t = Text(txt, font=FONT, weight=BOLD, font_size=size)
    t.set_color_by_gradient(*grad)
    return t


def caixa(label, sub=None, cor=VERDE, w=3.6, h=0.9, fs=24):
    box = RoundedRectangle(corner_radius=0.14, width=w, height=h,
                           stroke_color=cor, stroke_width=3,
                           fill_color=cor, fill_opacity=0.10)
    lab = Text(label, font=FONT, weight=BOLD, font_size=fs, color=BRANCO)
    grp = VGroup(box, lab)
    if sub:
        lab.move_to(box.get_center()).shift(UP * 0.14)
        s = Text(sub, font=FONT, font_size=15, color=cor)
        s.move_to(box.get_center()).shift(DOWN * 0.20)
        grp.add(s)
    else:
        lab.move_to(box.get_center())
    grp.caixa = box
    return grp


def seta(a, b, cor=CINZA, w=3):
    return Arrow(a, b, color=cor, buff=0.12, stroke_width=w,
                 max_tip_length_to_length_ratio=0.28)


def fluxo(scene, pts, cor, n=3, rt=1.8, radius=0.07):
    caminho = VMobject().set_points_as_corners(pts)
    dots = VGroup(*[Dot(radius=radius, color=cor) for _ in range(n)])
    scene.add(dots)
    scene.play(LaggedStart(*[MoveAlongPath(d, caminho) for d in dots],
                           lag_ratio=0.3), run_time=rt)
    scene.remove(dots)


def limpar(scene):
    if scene.mobjects:
        scene.play(*[FadeOut(m) for m in scene.mobjects], run_time=0.6)


# ─────────────────────────────────────────────────────────────
# 1 — INTRO
# ─────────────────────────────────────────────────────────────
def p_intro(self):
    t = titulo("Arquitetura em Camadas", 52)
    sub = Text("do system design ao código que escala", font=FONT,
               font_size=26, color=CINZA)
    VGroup(t, sub).arrange(DOWN, buff=0.35)
    self.play(Write(t), run_time=1.3)
    self.play(FadeIn(sub, shift=UP * 0.3))
    self.wait(1.4)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 2 — CAMADAS (cena principal)
# ─────────────────────────────────────────────────────────────
def p_camadas(self):
    # Camada de UI (topo, larga)
    ui = caixa("TELAS · UI", "Expo Router", VERDE, w=8.4, h=1.0, fs=26)
    ui.move_to(UP * 2.7)

    # Lane esquerda — estado de servidor
    query = caixa("TanStack Query", "cache · loading · erro", VERDE).move_to(LEFT * 2.5 + UP * 1.1)
    repo = caixa("Repository", None, VERDE).move_to(LEFT * 2.5 + DOWN * 0.3)
    apibox = caixa("API", "mock ↔ real", VERDE).move_to(LEFT * 2.5 + DOWN * 1.7)

    # Lane direita — estado de cliente / tempo real
    store = caixa("Zustand store", "minuto · chat · reações", GOLD).move_to(RIGHT * 2.5 + UP * 1.1)
    rt = caixa("Realtime", "WebSocket", GOLD).move_to(RIGHT * 2.5 + DOWN * 1.7)

    # Base — domain
    dom = caixa("domain / models", "tipos usados por todas as camadas", AZUL, w=8.4, h=0.85, fs=22)
    dom.move_to(DOWN * 3.15)

    # rótulos das lanes
    lbl_srv = Text("ESTADO DE SERVIDOR", font=FONT, weight=BOLD, font_size=15, color=VERDE)
    lbl_srv.next_to(query, UP, buff=0.25)
    lbl_cli = Text("ESTADO DE CLIENTE", font=FONT, weight=BOLD, font_size=15, color=GOLD)
    lbl_cli.next_to(store, UP, buff=0.25)

    # setas lane servidor
    s1 = seta(ui.caixa.get_bottom() + LEFT * 2.5, query.caixa.get_top(), VERDE)
    s2 = seta(query.caixa.get_bottom(), repo.caixa.get_top(), VERDE)
    s3 = seta(repo.caixa.get_bottom(), apibox.caixa.get_top(), VERDE)
    # setas lane cliente
    s4 = seta(ui.caixa.get_bottom() + RIGHT * 2.5, store.caixa.get_top(), GOLD)
    s5 = seta(rt.caixa.get_top(), store.caixa.get_bottom(), GOLD)

    # monta de cima pra baixo
    self.play(DrawBorderThenFill(ui), run_time=0.9)
    self.play(FadeIn(lbl_srv), FadeIn(lbl_cli))
    self.play(DrawBorderThenFill(query), DrawBorderThenFill(store), run_time=0.8)
    self.play(GrowArrow(s1), GrowArrow(s4))
    self.play(DrawBorderThenFill(repo), run_time=0.6)
    self.play(GrowArrow(s2))
    self.play(DrawBorderThenFill(apibox), DrawBorderThenFill(rt), run_time=0.8)
    self.play(GrowArrow(s3), GrowArrow(s5))
    self.play(DrawBorderThenFill(dom), run_time=0.8)
    self.wait(0.5)

    # Fluxo 1 — requisição do servidor (desce e volta)
    tag1 = Text("useMatch()  →  fetch", font=FONT, font_size=20, color=VERDE).to_edge(DOWN, buff=0.35)
    self.play(FadeIn(tag1))
    desce = [ui.caixa.get_bottom() + LEFT * 2.5, query.caixa.get_top(),
             query.caixa.get_bottom(), repo.caixa.get_top(),
             repo.caixa.get_bottom(), apibox.caixa.get_top()]
    fluxo(self, desce, VERDE, n=3, rt=1.6)
    sobe = list(reversed(desce))
    fluxo(self, sobe, VERDE, n=3, rt=1.6)
    self.play(FadeOut(tag1))

    # Fluxo 2 — tempo real empurra (sobe)
    tag2 = Text("socket  →  store  →  UI (chat, placar)", font=FONT, font_size=20, color=GOLD).to_edge(DOWN, buff=0.35)
    self.play(FadeIn(tag2))
    empurra = [rt.caixa.get_top(), store.caixa.get_bottom(),
               store.caixa.get_top(), ui.caixa.get_bottom() + RIGHT * 2.5]
    fluxo(self, empurra, GOLD, n=4, rt=1.8)
    self.wait(0.8)
    self.play(FadeOut(tag2))
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 3 — FECHO
# ─────────────────────────────────────────────────────────────
def p_fecho(self):
    l1 = Text("Query cuida do que o servidor manda.", font=FONT, weight=BOLD,
              font_size=34, color=VERDE)
    l2 = Text("Zustand cuida do que acontece no app.", font=FONT, weight=BOLD,
              font_size=34, color=GOLD)
    VGroup(l1, l2).arrange(DOWN, buff=0.35).move_to(UP * 0.8)
    self.play(Write(l1))
    self.play(Write(l2))
    self.wait(0.8)

    key = Text("Trocar o mock por um backend real = 1 arquivo (api.ts)",
               font=FONT, font_size=26, color=BRANCO).move_to(DOWN * 1.4)
    self.play(FadeIn(key, shift=UP * 0.3))
    self.play(key.animate.set_color(AZUL).scale(1.05),
              Flash(key, color=AZUL, line_length=0.2, num_lines=14, flash_radius=2.6))
    self.wait(1.8)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# Cenas
# ─────────────────────────────────────────────────────────────
class Intro(Scene):
    def construct(self): p_intro(self)


class Camadas(Scene):
    def construct(self): p_camadas(self)


class Fecho(Scene):
    def construct(self): p_fecho(self)


class Completo(Scene):
    def construct(self):
        for parte in [p_intro, p_camadas, p_fecho]:
            parte(self)
