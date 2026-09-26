import { webkit, chromium } from 'playwright';
import fs from 'fs';

const PAGES = fs.readFileSync(process.argv[2] || '../mto/pages.txt','utf8').trim().split('\n');
const WIDTHS = (process.argv[3] || '320,360,375,390,393,412,430').split(',').map(Number);
const BASE = process.argv[4] || 'http://localhost:4403';
const ENGINE = process.argv[5] || 'webkit';
const OUT = process.argv[6] || 'wk-results.json';

const AUDIT = () => {
  const PARTICLES=new Set(['が','を','に','へ','と','で','も','は','の','や','か','ね','よ','から','ので','けど','まで','より','など','こと','です','ます','した','いる','ある','する','れる','たい','ない','ため','です。','ます。']);
  const PUNCT_START=/^[、。，．）」』】〉》〕｝)\]}!?！？ー・：；…]/;
  const NAMES=["Dreamin' Spiral","My Life, My Way","Business Creation","Project Creation","3 Weeks Tuning","BEAT EIGHT EMOTION","Founding Cohort"];
  const W = window.innerWidth;
  const out={w:W, sw:document.documentElement.scrollWidth, cw:document.documentElement.clientWidth,
             h:document.documentElement.scrollHeight, overflow:[], findings:[], blocks:0, btnOverflow:[],
             supports:{ap:CSS.supports('word-break','auto-phrase'), pretty:CSS.supports('text-wrap','pretty'), balance:CSS.supports('text-wrap','balance')}};
  document.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();
    if(r.width>0&&(r.right>W+1||r.left<-1)) out.overflow.push(e.tagName+'.'+(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className));});
  document.querySelectorAll('button,input[type=submit],a.cta-link,a.ds-service-cta,.guide-link,.video-reference-link').forEach(e=>{
    if(e.scrollWidth>e.clientWidth+1) out.btnOverflow.push((e.className||e.tagName)+':'+e.textContent.trim().slice(0,12));});
  const SEL='p,h1,h2,h3,h4,h5,h6,li,a,figcaption,button,label,dt,dd,td,th,summary,blockquote';
  document.querySelectorAll(SEL).forEach(el=>{
    if(el.querySelector('p,h1,h2,h3,h4,h5,h6,li,figcaption,button,ul,ol,div')) return;
    const st=getComputedStyle(el); if(st.display==='none'||st.visibility==='hidden') return;
    const box=el.getBoundingClientRect(); if(box.width<=0) return;
    out.blocks++;
    const range=document.createRange(); const lines=[]; const brAt=[]; let idx=0;
    (function walk(n){ for(const c of n.childNodes){
      if(c.nodeType===3){ const t=c.nodeValue;
        for(let i=0;i<t.length;i++){ const ch=t[i]; if(ch==='\n'||ch==='\r') continue;
          range.setStart(c,i); range.setEnd(c,i+1);
          const rs=range.getClientRects(); if(!rs.length) continue;
          const r=rs[0]; if(r.width===0&&r.height===0) continue;
          const key=Math.round(r.top);
          let ln=lines.find(l=>Math.abs(l.top-key)<=3);
          if(!ln){ln={top:key,text:'',left:r.left,right:r.right,si:idx};lines.push(ln);}
          ln.text+=ch; ln.left=Math.min(ln.left,r.left); ln.right=Math.max(ln.right,r.right);
          if(!/\s/.test(ch)) idx++; } }
      else if(c.nodeType===1){ if(c.tagName==='BR') brAt.push(idx); else walk(c); } } })(el);
    lines.sort((a,b)=>a.top-b.top);
    const clean=lines.map(l=>({top:l.top,text:l.text.trim(),w:Math.round(l.right-l.left),si:l.si})).filter(l=>l.text.length>0);
    if(clean.length<2) return;
    const brSet=new Set(brAt);
    const sel=el.tagName.toLowerCase()+(el.className?('.'+String(el.className).trim().split(/\s+/).join('.')):'');
    for(let i=0;i<clean.length-1;i++){
      const joined=(clean[i].text+clean[i+1].text).replace(/\s+/g,'');
      for(const nm of NAMES){ const flat=nm.replace(/\s+/g,'');
        if(joined.includes(flat) && !clean[i].text.replace(/\s+/g,'').includes(flat) && !clean[i+1].text.replace(/\s+/g,'').includes(flat))
          out.findings.push({sel,line:i+1,of:clean.length,text:nm,reasons:['name-split'],explicit:false,all:clean.map(x=>x.text),boxW:Math.round(box.width)}); } }
    clean.forEach((l,i)=>{
      const isLast=i===clean.length-1;
      const explicit = i>0 && brSet.has(l.si);
      const reasons=[];
      if(l.text.length<=2) reasons.push('len<=2');
      else if(isLast && l.text.length<=4) reasons.push('short-last');
      if(PUNCT_START.test(l.text)) reasons.push('punct-start');
      if(PARTICLES.has(l.text)) reasons.push('particle-only');
      if(l.w>0 && l.w < box.width*0.18 && l.text.length<=5) reasons.push('narrow-line');
      if(reasons.length) out.findings.push({sel,line:i+1,of:clean.length,text:l.text,w:l.w,boxW:Math.round(box.width),explicit,reasons,all:clean.map(x=>x.text)});
    });
  });
  return out;
};

const engine = ENGINE==='chromium' ? chromium : webkit;
const browser = await engine.launch();
const results=[];
for (const w of WIDTHS) {
  const ctx = await browser.newContext({viewport:{width:w,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, locale:'ja-JP'});
  const page = await ctx.newPage();
  for (const p of PAGES) {
    await page.goto(BASE+p, {waitUntil:'networkidle', timeout:45000});
    const r = await page.evaluate(AUDIT);
    r.page=p; r.engine=ENGINE; results.push(r);
  }
  await ctx.close();
  process.stdout.write(`${w} `);
}
await browser.close();
fs.writeFileSync(OUT, JSON.stringify(results));
console.log('\nwrote', OUT, results.length, 'renders');
