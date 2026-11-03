import os
S=os.path.dirname(os.path.abspath(__file__))
specs={ # name: (w,h,layout,scale)
 'instagram':(1080,1350,'port',1.0),
 'youtube':(1280,720,'land',1.0),
 'facebook':(1200,630,'land',0.92),
 'linkedin':(1200,627,'land',0.92),
 'x':(1600,900,'land',1.22),
}
css='''
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0e0c16;--ink:#fff;--mut:#a9a3c2;--acc:#b7a4ff;--acc2:#7c66f0}
body{width:%(w)dpx;height:%(h)dpx;overflow:hidden;background:var(--bg);font-family:"Inter Display","Inter","Noto Color Emoji",sans-serif;color:var(--ink);position:relative}
.glow{position:absolute;inset:0;background:radial-gradient(60%% 70%% at %(gx)s,rgba(124,102,240,.42),transparent 70%%),radial-gradient(40%% 50%% at 0%% 100%%,rgba(124,102,240,.18),transparent 70%%)}
.grain{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.035) 1px,transparent 1px);background-size:4px 4px}
.wrap{position:absolute;inset:0;display:flex;padding:%(pad)dpx}
.text{display:flex;flex-direction:column;justify-content:center;gap:%(gap)dpx;z-index:3}
.kick{display:inline-flex;align-self:flex-start;gap:.4em;align-items:center;font-weight:700;font-size:%(k)dpx;letter-spacing:.06em;text-transform:uppercase;color:#e6e0ff;background:rgba(124,102,240,.28);border:1px solid rgba(183,164,255,.45);padding:.45em .9em;border-radius:999px}
h1{font-weight:800;font-size:%(h1)dpx;line-height:.98;letter-spacing:-.035em}
h1 em{font-style:normal;color:var(--acc)}
.sub{font-weight:600;font-size:%(sub)dpx;color:var(--mut);line-height:1.3}
.sub b{color:#fff}
.brand{display:flex;align-items:center;gap:%(bg)dpx;font-weight:700;font-size:%(bf)dpx;letter-spacing:-.02em}
.brand img{height:%(lg)dpx}
.cta{display:inline-flex;align-self:flex-start;align-items:center;gap:.6em;background:#fff;color:#14111f;font-weight:700;font-size:%(cf)dpx;padding:.6em 1.1em;border-radius:999px;box-shadow:0 10px 40px rgba(124,102,240,.45)}
.cta span{color:#6d5ae0;font-weight:600}
.shot{position:relative;z-index:2}
.shot .card{border-radius:%(r)dpx;overflow:hidden;border:2px solid rgba(183,164,255,.35);box-shadow:0 30px 90px rgba(0,0,0,.6),0 0 80px rgba(124,102,240,.35)}
.shot .card img{display:block;width:100%%}
.bot{position:absolute;z-index:4;filter:drop-shadow(0 12px 30px rgba(124,102,240,.6))}
.tag{position:absolute;z-index:4;background:#7c66f0;color:#fff;font-weight:700;border-radius:999px;padding:.4em .9em;box-shadow:0 8px 24px rgba(0,0,0,.4)}
'''
def html(name,w,h,lay,s):
    f=lambda v:int(v*s)
    if lay=='land':
        v=dict(w=w,h=h,gx='75% 50%',pad=f(64),gap=f(22),k=f(19),h1=f(92),sub=f(28),bg=f(14),bf=f(34),lg=f(46),cf=f(22),r=f(22))
        body=f'''<div class="wrap" style="gap:{f(48)}px;align-items:center">
<div class="text" style="flex:0 0 50%">
 <div class="brand"><img src="logo_t.png">Spotter</div>
 <div class="kick">🤖 AI Meeting Assistant · Mac</div>
 <h1>Spotter<br>answers. <em>Live.</em></h1>
 <div class="sub">👀 <b>Reads</b> your screen. 👂 <b>Hears</b> the call.<br>🔒 <b>Nothing kept.</b></div>
 <div class="cta">Request early access <span>→ lynkk.ai</span></div>
</div>
<div class="shot" style="flex:1">
 <div class="card"><img src="ui.png"></div>
 <img class="bot" src="bot_t.png" style="width:{f(150)}px;left:{-f(60)}px;bottom:{-f(40)}px">
 <div class="tag" style="font-size:{f(20)}px;right:{-f(14)}px;top:{-f(18)}px">⌘↩ to ask</div>
</div></div>'''
        if name=='youtube':  # thumbnail: fewer words, bigger type
            body=body.replace('<div class="sub">👀 <b>Reads</b> your screen. 👂 <b>Hears</b> the call.<br>🔒 <b>Nothing kept.</b></div>','<div class="sub" style="font-size:%dpx">👀 Reads. 👂 Hears.<br>🔒 <b>Keeps nothing.</b></div>'%f(32)).replace('<div class="cta">Request early access <span>→ lynkk.ai</span></div>','')
            v['h1']=f(104)
    else:
        v=dict(w=w,h=h,gx='50% 75%',pad=f(72),gap=f(24),k=f(24),h1=f(112),sub=f(34),bg=f(16),bf=f(40),lg=f(54),cf=f(28),r=f(28))
        body=f'''<div class="wrap" style="flex-direction:column;gap:{f(44)}px">
<div class="text">
 <div class="brand"><img src="logo_t.png">Spotter</div>
 <div class="kick">🤖 AI Meeting Assistant · Mac</div>
 <h1>Spotter answers. <em>Live.</em></h1>
 <div class="sub">👀 <b>Reads</b> your screen. 👂 <b>Hears</b> the call. 🔒 <b>Nothing kept.</b></div>
</div>
<div class="shot" style="margin:0 {f(10)}px">
 <div class="card"><img src="ui.png" style="height:{f(720)}px;object-fit:cover;object-position:top"></div>
 <img class="bot" src="bot_t.png" style="width:{f(170)}px;right:{-f(30)}px;bottom:{-f(50)}px">
 <div class="tag" style="font-size:{f(24)}px;left:{f(24)}px;bottom:{-f(22)}px">⚡ Early access · lynkk.ai</div>
</div></div>'''
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{css%v}</style></head><body><div class="glow"></div><div class="grain"></div>{body}</body></html>'
for n,(w,h,l,s) in specs.items():
    open(os.path.join(S,f'banner-{n}.html'),'w').write(html(n,w,h,l,s))
