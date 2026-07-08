"""
Roteiro animado — Modelagem do Banco de Dados da CazéTV
Manim Community Edition (v0.18+)

RENDERIZAR
    manim -pqh modelagem.py Completo
    manim -pql modelagem.py ER            # prévia da cena principal

Cenas: Intro · Normalizar · ER · Fecho · Completo
"""

from manim import *

FONT = "Montserrat"

BG     = "#0b0c11"
VERDE  = "#1de782"
GOLD   = "#ffc531"
AZUL   = "#5bd0ff"
CINZA  = "#8b909b"
GRAF   = "#181b22"
BRANCO = "#f8fafc"
VERM   = "#ff2f45"

config.background_color = BG


def titulo(txt, size=46, grad=(VERDE, AZUL)):
    t = Text(txt, font=FONT, weight=BOLD, font_size=size)
    t.set_color_by_gradient(*grad)
    return t


def tabela(nome, campos, cor=AZUL, w=3.0, fs=16):
    linhas = VGroup(*[Text(c, font=FONT, font_size=fs, color=BRANCO) for c in campos])
    linhas.arrange(DOWN, buff=0.16, aligned_edge=LEFT)
    total_h = 0.55 + linhas.height + 0.4
    box = RoundedRectangle(corner_radius=0.1, width=w, height=total_h,
                           stroke_color=cor, stroke_width=2.5,
                           fill_color=GRAF, fill_opacity=1)
    header = Rectangle(width=w, height=0.55, stroke_width=0, fill_color=cor, fill_opacity=1)
    header.move_to(box.get_top() + DOWN * 0.275)
    htxt = Text(nome, font=FONT, weight=BOLD, font_size=19, color=BG).move_to(header.get_center())
    linhas.next_to(header, DOWN, buff=0.16).align_to(box, LEFT).shift(RIGHT * 0.22)
    grp = VGroup(box, header, htxt, linhas)
    grp.box = box
    return grp


def rel(a, b, label=None):
    ln = Line(a, b, color=CINZA, stroke_width=2.5)
    grp = VGroup(ln)
    if label:
        t = Text(label, font=FONT, font_size=15, color=CINZA)
        t.move_to(ln.get_center()).shift(UP * 0.2)
        grp.add(t)
    return grp


def limpar(scene):
    if scene.mobjects:
        scene.play(*[FadeOut(m) for m in scene.mobjects], run_time=0.6)


# ─────────────────────────────────────────────────────────────
# 1 — INTRO
# ─────────────────────────────────────────────────────────────
def p_intro(self):
    t = titulo("Modelagem do Banco", 52)
    sub = Text("do type TypeScript à tabela SQL", font=FONT, font_size=26, color=CINZA)
    VGroup(t, sub).arrange(DOWN, buff=0.35)
    self.play(Write(t), run_time=1.3)
    self.play(FadeIn(sub, shift=UP * 0.3))
    self.wait(1.4)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 2 — NORMALIZAR (o problema da duplicação → uma linha só)
# ─────────────────────────────────────────────────────────────
def p_normalizar(self):
    head = Text("O mesmo time, repetido", font=FONT, weight=BOLD, font_size=30, color=BRANCO)
    head.to_edge(UP, buff=0.7)
    self.play(Write(head))

    rotulos = ['Jogo', 'Ao vivo', 'Grupo', 'Chave']
    xs = [-4.6, -1.55, 1.55, 4.6]
    cards = VGroup()
    for x, r in zip(xs, rotulos):
        box = RoundedRectangle(corner_radius=0.12, width=2.5, height=1.0,
                               stroke_color=CINZA, stroke_width=2, fill_color=GRAF, fill_opacity=1)
        flag = Text("🇧🇷 Brasil", font=FONT, weight=BOLD, font_size=20, color=BRANCO)
        flag.move_to(box.get_center())
        lab = Text(r, font=FONT, font_size=16, color=CINZA).next_to(box, UP, buff=0.12)
        c = VGroup(box, flag, lab)
        c.box = box
        c.flag = flag
        cards.add(c)
    cards.move_to(UP * 1.3)

    self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cards], lag_ratio=0.2))
    self.play(*[Indicate(c.flag, color=VERM, scale_factor=1.15) for c in cards], run_time=1.0)

    # a tabela Team — a fonte única
    team = tabela("Team", ["id 🔑", "name  → Brasil", "short → BRA", "flag, cores"], VERDE, w=3.2)
    team.move_to(DOWN * 1.7)
    self.play(DrawBorderThenFill(team), run_time=1.0)

    # cada card vira uma referência (teamId) apontando pra Team
    setas = VGroup()
    novos = []
    for c in cards:
        novos.append(Text("teamId 🔗", font=FONT, weight=BOLD, font_size=18, color=GOLD).move_to(c.flag.get_center()))
        setas.add(Arrow(c.box.get_bottom(), team.box.get_top(), color=GOLD, buff=0.15,
                        stroke_width=2.5, max_tip_length_to_length_ratio=0.15))
    self.play(*[Transform(c.flag, n) for c, n in zip(cards, novos)], run_time=0.9)
    self.play(LaggedStart(*[GrowArrow(s) for s in setas], lag_ratio=0.15), run_time=1.2)

    cap = Text("1 linha. O resto aponta pra ela.", font=FONT, weight=BOLD, font_size=24, color=VERDE)
    cap.to_edge(DOWN, buff=0.4)
    self.play(FadeIn(cap, shift=UP * 0.2))
    self.wait(1.6)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 3 — ER (o diagrama de tabelas + relações)
# ─────────────────────────────────────────────────────────────
def p_er(self):
    comp = tabela("Competition", ["id 🔑", "name", "season"], AZUL, w=2.8).move_to(UP * 2.4)
    team = tabela("Team", ["id 🔑", "name", "short", "flag, cores"], VERDE, w=2.9).move_to(LEFT * 4.5 + DOWN * 0.4)
    match = tabela("Match", ["id 🔑", "competitionId 🔗", "homeTeamId 🔗", "awayTeamId 🔗", "status, placar"], GOLD, w=3.7).move_to(DOWN * 0.4)
    stat = tabela("MatchStat", ["id 🔑", "matchId 🔗", "label", "home / away %"], AZUL, w=2.9).move_to(RIGHT * 4.5 + DOWN * 0.4)

    self.play(DrawBorderThenFill(match), run_time=0.9)
    self.play(DrawBorderThenFill(comp), DrawBorderThenFill(team), DrawBorderThenFill(stat), run_time=1.0)

    r1 = rel(comp.box.get_bottom(), match.box.get_top(), "1 — N")
    r2 = rel(team.box.get_right(), match.box.get_left(), "1 — N")
    r3 = rel(match.box.get_right(), stat.box.get_left(), "1 — N")
    self.play(*[Create(r[0]) for r in [r1, r2, r3]])
    self.play(*[FadeIn(r[1]) for r in [r1, r2, r3]])

    extra = Text("+ ChatMessage · User · Channel · Clip · GroupStanding",
                 font=FONT, font_size=18, color=CINZA).to_edge(DOWN, buff=0.4)
    self.play(FadeIn(extra))
    self.wait(1.8)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# 4 — FECHO (TS → Prisma → SQL)
# ─────────────────────────────────────────────────────────────
def p_fecho(self):
    def chip(txt, cor):
        box = RoundedRectangle(corner_radius=0.12, width=3.0, height=1.0,
                               stroke_color=cor, stroke_width=3, fill_color=cor, fill_opacity=0.10)
        t = Text(txt, font=FONT, weight=BOLD, font_size=22, color=BRANCO).move_to(box.get_center())
        return VGroup(box, t)

    a = chip("type Match", AZUL)
    b = chip("model Match", VERDE)
    c = chip("TABLE match", GOLD)
    fila = VGroup(a, b, c).arrange(RIGHT, buff=1.0).move_to(UP * 0.6)
    ar1 = Arrow(a.get_right(), b.get_left(), color=CINZA, buff=0.1)
    ar2 = Arrow(b.get_right(), c.get_left(), color=CINZA, buff=0.1)

    self.play(FadeIn(a, shift=UP * 0.2))
    self.play(GrowArrow(ar1), FadeIn(b, shift=UP * 0.2))
    self.play(GrowArrow(ar2), FadeIn(c, shift=UP * 0.2))

    key = Text("Um dado, um lugar. O resto são referências.",
               font=FONT, weight=BOLD, font_size=30, color=BRANCO).move_to(DOWN * 1.4)
    self.play(Write(key))
    self.play(key.animate.set_color(VERDE).scale(1.05),
              Flash(key, color=VERDE, line_length=0.2, num_lines=14, flash_radius=2.8))
    self.wait(1.8)
    limpar(self)


# ─────────────────────────────────────────────────────────────
# Cenas
# ─────────────────────────────────────────────────────────────
class Intro(Scene):
    def construct(self): p_intro(self)


class Normalizar(Scene):
    def construct(self): p_normalizar(self)


class ER(Scene):
    def construct(self): p_er(self)


class Fecho(Scene):
    def construct(self): p_fecho(self)


class Completo(Scene):
    def construct(self):
        for parte in [p_intro, p_normalizar, p_er, p_fecho]:
            parte(self)
