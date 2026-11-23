# Gera arte procedural (curvas de nível "Skin Flow") como placeholder on-brand
import numpy as np, sys
from PIL import Image, ImageFilter
rng=np.random.default_rng
def noise(w,h,seed,oct=5):
    r=rng(seed); out=np.zeros((h,w))
    amp=1; tot=0
    for o in range(oct):
        s=2**(o+2)
        g=r.random((s+1,s+1))
        im=Image.fromarray((g*255).astype(np.uint8)).resize((w,h),Image.BICUBIC)
        out+=np.asarray(im)/255*amp; tot+=amp; amp*=.5
    out=out/tot
    im=Image.fromarray((out*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(18))
    o=np.asarray(im)/255.0
    return (o-o.min())/(o.max()-o.min()+1e-6)
def hexc(h): h=h.lstrip('#'); return np.array([int(h[i:i+2],16) for i in (0,2,4)],float)
pal={
 'forest':('#08211D','#17483F','#C8B08A'),
 'ivory':('#EFE7DB','#E3D5BF','#A3876A'),
 'wood':('#3A2A1E','#B98F62','#EFE7DB'),
 'jade':('#0C2E29','#2F8A73','#E3D5BF'),
 'champ':('#C8B08A','#E3D5BF','#17483F'),
}
jobs=[('consulta','ivory',1),('toxina','forest',2),('bioestimulador','champ',3),('limpeza','jade',4),
('laser','forest',5),('corporais','wood',6),('cirurgia','ivory',7),('porta-saude','ivory',8),('porta-estetica','forest',9),
('espaco-1','wood',10),('espaco-2','forest',11),('espaco-3','champ',12),('espaco-4','jade',13),('espaco-5','ivory',14)]
W,H=900,1125
for name,p,seed in jobs:
    a,b,c=[hexc(x) for x in pal[p]]
    n=noise(W,H,seed)
    yy,xx=np.mgrid[0:H,0:W]/H
    grad=np.clip(0.1+0.7*n+0.2*(1-yy),0,1)[...,None]
    img=a*(1-grad)+b*grad
    # light
    cx,cy=rng(seed).random(2)*[0.6,0.5]+[0.2,0.1]
    d=np.sqrt((xx*H/W*W/H-cx)**2*1+(yy-cy)**2)
    img+= (c-img)*np.clip(0.35-d,0,1)[...,None]*0.9
    # contour lines
    f=n*16; fr=np.abs(f-np.round(f))
    line=np.clip(1-fr/0.07,0,1)**2
    img=img*(1-line[...,None]*0.6)+c*line[...,None]*0.6
    # grain
    img+=rng(seed+99).normal(0,4,img.shape)
    im=Image.fromarray(np.clip(img,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    im.save(f'public/midia/arte/{name}.png')
print('ok')
