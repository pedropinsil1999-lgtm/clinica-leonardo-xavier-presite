# Gera 2 camadas SVG vetoriais de curvas de nível (Skin Flow) para o fundo animado por CSS.
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

W, H = 1600, 1000
GX, GY = 320, 200


def campo(seed, comps=9, wmin=380, wmax=1000):
    r = np.random.default_rng(seed)
    x = np.linspace(0, W, GX)[None, :]
    y = np.linspace(0, H, GY)[:, None]
    z = np.zeros((GY, GX))
    for _ in range(comps):
        wl = r.uniform(wmin, wmax)
        ang = r.uniform(0, np.pi)
        kx, ky = np.cos(ang) * 2 * np.pi / wl, np.sin(ang) * 2 * np.pi / wl
        z += r.uniform(0.5, 1.0) * np.sin(kx * x + ky * y + r.uniform(0, 6.28))
    # componente fina, dá o aspecto orgânico de "pele"
    for _ in range(4):
        wl = r.uniform(140, 260)
        ang = r.uniform(0, np.pi)
        kx, ky = np.cos(ang) * 2 * np.pi / wl, np.sin(ang) * 2 * np.pi / wl
        z += 0.28 * np.sin(kx * x + ky * y + r.uniform(0, 6.28))
    return x[0], y[:, 0], z


def svg(seed, niveis, cor, op, largura, nome):
    x, y, z = campo(seed)
    fig = plt.figure()
    cs = plt.contour(x, y, z, levels=np.linspace(z.min() * 0.9, z.max() * 0.9, niveis))
    partes = []
    for nivel, segs in enumerate(cs.allsegs):
        d = []
        for s in segs:
            if len(s) < 8:
                continue
            s = s[::2]
            d.append("M" + "L".join(f"{p[0]:.0f} {H - p[1]:.0f}" for p in s))
        if d:
            # opacidade varia por nível: dá profundidade
            o = op * (0.55 + 0.45 * ((nivel % 4) / 3))
            partes.append(f'<path d="{"".join(d)}" opacity="{o:.2f}"/>')
    plt.close(fig)
    out = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">'
           f'<g fill="none" stroke="{cor}" stroke-width="{largura}" stroke-linejoin="round" stroke-linecap="round">{"".join(partes)}</g></svg>')
    open(f"public/midia/{nome}.svg", "w").write(out)
    print(nome, len(out) // 1024, "KB")


svg(11, 16, "#C8B08A", 0.30, 1.3, "flow-a")
svg(29, 10, "#E3D5BF", 0.20, 1.0, "flow-b")
