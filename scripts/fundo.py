# Textura estática "Skin Flow" (curvas de nível) para seções escuras. Substitui o shader WebGL.
import numpy as np
from PIL import Image, ImageFilter
W,H=1600,1000
r=np.random.default_rng(7)
def noise(seed,oct=5):
    r=np.random.default_rng(seed); out=np.zeros((H,W)); amp=1; tot=0
    for o in range(oct):
        s=2**(o+2); g=r.random((s+1,int(s*W/H)+1))
        im=Image.fromarray((g*255).astype(np.uint8)).resize((W,H),Image.BICUBIC)
        out+=np.asarray(im)/255*amp; tot+=amp; amp*=.5
    out/=tot
    o=np.asarray(Image.fromarray((out*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(26)))/255.0
    return (o-o.min())/(o.max()-o.min()+1e-6)
n=noise(3)
yy=np.linspace(0,1,H)[:,None]
a=np.array([8,33,29.]);b=np.array([14,46,41.]);c=np.array([200,176,138.])
bg=a+(b-a)*np.clip(yy*.9+.1,0,1)[...,None]*np.ones((H,W,1))
f=n*14; fr=np.abs(f-np.round(f)); line=np.clip(1-fr/0.05,0,1)**2
alpha=(0.07+0.07*n)*line
img=bg*(1-alpha[...,None])+c*alpha[...,None]
Image.fromarray(np.clip(img,0,255).astype(np.uint8)).save('public/midia/fundo-escuro.webp',quality=62,method=6)
