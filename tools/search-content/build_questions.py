"""Search Content Layer v1 — Question Page / Hub の静的生成（ACR-20261001-019）。
正本：dreamin-spiral-os docs/repository-architecture/search-content-standard-v1.md（Question Page Template）。
使い方：python3 tools/search-content/build_questions.py（b8e-lab の root で実行）"""
import json, os, re, html, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from questions_data import Q
from videos_data import V
B = 'https://www.b8e.co.jp'
DS = "Dreamin' Spiral 🌱"
HUB = '/dreamin-spiral/questions/'
PUBLISHED = '2026-10-01'
esc = lambda s: html.escape(s, quote=True).replace('&#x27;', "'")
guide = open('dreamin-spiral/guide/index.html', encoding='utf-8').read()
CHROME_TOP = guide[guide.index('<body class="ds-page">'):guide.index('  <main>')]
CHROME_BOTTOM = guide[guide.index('  </main>') + len('  </main>\n'):]
# Guide 固有の script（GAS Transition）は Question Page に持ち込まない
CHROME_BOTTOM = re.sub(r'\n *<script src="/gas-transition\.js"[^>]*></script>', '', CHROME_BOTTOM)
byid = {q['id']: q for q in Q}
P = lambda t: f'<span class="ds-phrase">{esc(t)}</span>'
def para(chunks, cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'        <p{c}>{"".join(P(x) for x in chunks)}</p>'
def iso_dur(sec):
    s = int(sec); return f'PT{s // 60}M{s % 60}S'
def ld(objs):
    return ''.join('  <script type="application/ld+json">\n' + json.dumps(o, ensure_ascii=False, indent=2) + '\n  </script>\n' for o in objs)
def crumbs(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": B + u} for i, (n, u) in enumerate(items)]}
def head(title, desc, url, ogt, ogd, ogi, ogtype, lds):
    return f'''<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{esc(desc)}">
  <title>{esc(title)}</title>
  <link rel="canonical" href="{B}{url}">
  <meta property="og:type" content="{ogtype}">
  <meta property="og:title" content="{esc(ogt)}">
  <meta property="og:description" content="{esc(ogd)}">
  <meta property="og:url" content="{B}{url}">
  <meta property="og:image" content="{B}{ogi}">
  <meta property="og:site_name" content="B8E">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(ogt)}">
  <meta name="twitter:description" content="{esc(ogd)}">
  <meta name="twitter:image" content="{B}{ogi}">
  <link rel="stylesheet" href="/style.css">
  <script defer src="/_vercel/insights/script.js"></script>
{ld(lds)}</head>

'''
AUTHOR = {"@type": "Person", "name": "中村 琢八", "url": B + "/about.html"}
PUBLISHER = {"@type": "Organization", "name": "BEAT EIGHT EMOTION株式会社", "url": B + "/"}

def page(q):
    url = f'{HUB}{q["slug"]}/'
    ogi = f'/assets/ogp/questions/{q["slug"]}.png'
    title = f'{q["q"]}｜{DS}'
    lds = [{"@context": "https://schema.org", "@type": "Article", "headline": q['q'], "description": q['desc'],
            "inLanguage": "ja", "author": AUTHOR, "publisher": PUBLISHER, "datePublished": PUBLISHED, "dateModified": PUBLISHED,
            "mainEntityOfPage": B + url, "image": B + ogi, "isPartOf": {"@type": "CollectionPage", "url": B + HUB, "name": "問いから読む"}},
           crumbs([("TOP", "/"), (DS, "/dreamin-spiral/"), ("問いから読む", HUB), (q['q'], url)])]
    v = V.get(q['video']) if q['video'] else None
    if v:
        lds.append({"@context": "https://schema.org", "@type": "VideoObject", "name": v['title'],
                    "description": f"{v['title']}（{v['channel']}）", "thumbnailUrl": v['thumbnail'], "uploadDate": v['uploadDate'],
                    "duration": iso_dur(v['duration_sec']), "embedUrl": f"https://www.youtube.com/embed/{q['video']}",
                    "url": f"https://www.youtube.com/watch?v={q['video']}"})
    h = head(title, q['desc'], url, q['q'], q['card'], ogi, 'article', lds)
    out = [h, CHROME_TOP, '  <main>\n',
           f'''    <!-- Search Content Layer v1 ・ Question Page（{q["id"]} ・ Theme: {q["theme"]}）。
         生成：tools/search-content/build_questions.py ／ 正本：dreamin-spiral-os docs/repository-architecture/search-content-standard-v1.md -->

    <!-- 01 Question Hero — H1 そのものを Human Question にする（思想 ・ Service 説明から始めない） -->
    <section class="ds-service-hero q-hero">
      <a class="ds-service-eyebrow q-eyebrow" href="{HUB}">問いから読む</a>
      <h1 class="ds-service-title">
        {"<br>".join(P(x) for x in q["qh"])}
      </h1>
    </section>

    <div class="page-content q-page">

      <!-- 02 Recognition -->
      <div class="section-block ds-service-section q-section q-recognition">
''']
    out += [para(p) + '\n' for p in q['recognition']]
    out.append('      </div>\n\n      <!-- 03 What Is Happening（断定しない） -->\n      <div class="section-block ds-service-section q-section">\n        <h2>何が起きているんだろう</h2>\n')
    out += [para(p) + '\n' for p in q['happening']]
    if q.get('note'):
        out.append(f'        <p class="q-note">{"".join(P(c) for c in re.split(r"(?<=、)", q["note"]) if c)}</p>\n')
    out.append('      </div>\n\n      <!-- 04 Another View -->\n      <div class="section-block ds-service-section q-section">\n        <h2>少し違う見方</h2>\n')
    out += [para(p) + '\n' for p in q['view']]
    out.append('      </div>\n\n      <!-- 05 Observe in Daily Life（Homework にしない） -->\n      <div class="section-block ds-service-section q-section q-observe">\n        <h2>日常の中で、少しだけ観てみる</h2>\n')
    out += [para(p) + '\n' for p in q['observe']]
    out.append('      </div>\n\n')
    if v:
        out.append(f'''      <!-- 06 Watch / Listen（Video は Hero にしない） -->
      <div class="section-block ds-service-section q-section">
        <h2>この問いについて、動画でも話しています。</h2>
        <div class="q-video">
          <iframe src="https://www.youtube-nocookie.com/embed/{q["video"]}" title="{esc(v["title"])}" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <p class="q-video-caption"><a href="https://www.youtube.com/watch?v={q["video"]}" target="_blank" rel="noopener">{"".join(P(c) for c in re.split(r"(?<=[】。？」])", v["title"]) if c)}</a>{P("（" + v["channel"] + "）")}</p>
      </div>

''')
    out.append('      <!-- 07 Related Questions（Meaning でつなぐ ・ 最大 3） -->\n      <div class="section-block ds-service-section q-section">\n        <h2>近くにある問い</h2>\n        <ul class="q-related">\n')
    for rid in q['related']:
        r = byid[rid]
        out.append(f'          <li><a href="{HUB}{r["slug"]}/">{esc(r["q"])}</a></li>\n')
    out.append('        </ul>\n      </div>\n\n')
    n = q['next']
    out.append(f'''      <!-- 08 Natural Next Action（強い CTA にしない ・ 1 つだけ ・ 全 Question を Guide へ送らない） -->
      <div class="section-block ds-service-section q-section q-next">
        <p>{esc(n[1])}</p>
        <a class="ds-service-secondary" href="{n[2]}">{esc(n[3])}</a>
      </div>

      <a href="{HUB}" class="back-link">← 問いから読む</a>

    </div>

''')
    out += ['  </main>\n', CHROME_BOTTOM]
    os.makedirs(f'dreamin-spiral/questions/{q["slug"]}', exist_ok=True)
    open(f'dreamin-spiral/questions/{q["slug"]}/index.html', 'w', encoding='utf-8').write(''.join(out))

def hub():
    url = HUB
    desc = '日々の中で、ふと気になったこと。うまく言葉にならない違和感。そんな小さな問いから、少しずつ見ていく Dreamin\' Spiral 🌱 の読みものです。'
    lds = [{"@context": "https://schema.org", "@type": "CollectionPage", "name": "問いから読む", "description": desc, "url": B + url,
            "inLanguage": "ja", "publisher": PUBLISHER,
            "hasPart": [{"@type": "Article", "headline": q['q'], "url": f'{B}{HUB}{q["slug"]}/'} for q in Q]},
           crumbs([("TOP", "/"), (DS, "/dreamin-spiral/"), ("問いから読む", url)])]
    h = head(f'問いから読む｜{DS}', desc, url, f'問いから読む｜{DS}', '日々の中で、ふと気になったこと。うまく言葉にならない違和感。そんな小さな問いから、少しずつ見ていきます。', '/assets/ogp/questions/questions-hub.png', 'website', lds)
    cards = ''.join(f'''          <li>
            <a class="q-card" href="{HUB}{q["slug"]}/">
              <span class="q-card-theme">{esc(q["theme"])}</span>
              <span class="q-card-q">{"".join(P(x) for x in q["qh"])}</span>
              <span class="q-card-line">{"".join(P(x) for x in (q.get("card_chunks") or [c for c in re.split(r"(?<=[、。])", q["card"]) if c]))}</span>
            </a>
          </li>
''' for q in Q)
    body = f'''  <main>

    <!-- Search Content Layer v1 ・ Hub（問いから読む）。一般的な Blog 一覧にしない。Theme は Metadata として持ち、Pilot では UI に大きく出さない。
         生成：tools/search-content/build_questions.py ／ 正本：dreamin-spiral-os docs/repository-architecture/search-content-standard-v1.md -->
    <section class="ds-service-hero q-hero">
      <span class="ds-service-eyebrow">{DS}</span>
      <h1 class="ds-service-title">問いから読む</h1>
      <p class="ds-service-lead">
        {P("日々の中で、")}{P("ふと気になったこと。")}<br>
        {P("うまく言葉にならない違和感。")}
      </p>
      <p class="ds-service-lead">
        {P("そんな小さな問いから、")}<br>
        {P("少しずつ見ていきます。")}
      </p>
    </section>

    <div class="page-content q-page">

      <div class="section-block ds-service-section q-section">
        <h2 class="q-hub-label">Recent Questions</h2>
        <ul class="q-cards">
{cards}        </ul>
      </div>

      <a href="/dreamin-spiral/" class="back-link">← {DS}</a>

    </div>

  </main>
'''
    os.makedirs('dreamin-spiral/questions', exist_ok=True)
    open('dreamin-spiral/questions/index.html', 'w', encoding='utf-8').write(h + CHROME_TOP + body + CHROME_BOTTOM)

if __name__ == '__main__':
    for q in Q: page(q)
    hub()
    print('built hub +', len(Q), 'questions')
