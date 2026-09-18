/**
 * Vercel → GAS Transition Standard v1 — 共通の振る舞い
 *
 * 正本: dreamin-spiral-os docs/design-systems/web-design-system/vercel-gas-transition-standard-v1.md
 * 実装記録: docs/vercel-gas-transition-v1.md
 *
 * Vercel のページから GAS Web App へ同じタブで移るとき、押した瞬間に
 * 行き先につながる短い言葉（Transition View）を出してから移動する。
 *
 * 使い方（ページ側は行き先と言葉だけを渡す）:
 *   <a href="https://script.google.com/macros/s/…/exec?…"
 *      data-gas-transition
 *      data-transition-eyebrow="DREAMIN' SPIRAL …"      （任意）
 *      data-transition-heading="…を開いています。"
 *      data-transition-text="…">…</a>
 *   <script src="/gas-transition.js" defer></script>
 *
 * - href は本物の GAS URL のまま（JavaScript が動かなくても普通に移動できる）
 * - data-gas-transition があり、href が script.google.com の link だけを扱う（他の link には触れない）
 * - 新しいタブ（修飾キー ・ 中クリック ・ target）や download は、ブラウザの通常の動作に任せる
 * - 人工的な待ちは入れない。Transition View を描画できる最小限の scheduling の後に移動する
 * - 移動は 1 回だけ（連打 ・ 再操作では移動しない）。戻るで戻ってきたら元のページに戻す
 */
(function () {
  'use strict';

  var GAS_URL = /^https:\/\/script\.google\.com\//;
  var STYLE_ID = 'gas-transition-style';
  var state = { active: false, view: null, hidden: [] };

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      // いまのページ（Service Page の Hero）の色 ・ 書体 ・ 余白の続きとして見せる
      '.gas-transition{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;',
      'padding:40px 24px;text-align:center;color:#f7f6f4;',
      'background:radial-gradient(ellipse at 50% 20%,rgba(110,145,245,.12) 0%,transparent 65%),',
      'linear-gradient(180deg,#1c2f60 0%,#0b1028 100%);animation:gas-transition-in .12s ease-out;}',
      '.gas-transition__inner{max-width:520px;}',
      // 日本語を語の途中で折り返さない（対応ブラウザは文節で折り返す。非対応は通常の折り返し）
      '.gas-transition__heading,.gas-transition__text{word-break:auto-phrase;overflow-wrap:anywhere;}',
      '.gas-transition__eyebrow{display:block;margin-bottom:28px;font-size:.72rem;color:#8c8680;letter-spacing:.14em;text-transform:uppercase;}',
      '.gas-transition__heading{margin:0;font-size:1.2rem;font-weight:300;line-height:2;color:#f0eeeb;letter-spacing:.06em;outline:none;}',
      '.gas-transition__text{margin:20px 0 0;font-size:.95rem;line-height:2.2;color:#c9c5bf;}',
      '.gas-transition__bar{display:block;width:64px;height:1px;margin:36px auto 0;background:#c9a882;',
      'animation:gas-transition-breathe 1.6s ease-in-out infinite;}',
      '@keyframes gas-transition-in{from{opacity:.4}to{opacity:1}}',
      '@keyframes gas-transition-breathe{0%,100%{opacity:.35}50%{opacity:1}}',
      '@media (prefers-reduced-motion:reduce){.gas-transition,.gas-transition__bar{animation:none}}',
      'html.gas-transition-active,html.gas-transition-active body{overflow:hidden;}'
    ].join('');
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function add(parent, tag, cls, text) {
    var node = document.createElement(tag);
    node.className = cls;
    if (text) node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  /** Transition View を出し、元のページを支援技術 ・ 操作から外す（元の CTA を読み上げ直させない） */
  function render(link) {
    injectStyle();
    var view = document.createElement('div');
    view.className = 'gas-transition';
    view.setAttribute('role', 'status');
    view.setAttribute('aria-live', 'polite');
    var inner = add(view, 'div', 'gas-transition__inner');
    var eyebrow = link.getAttribute('data-transition-eyebrow');
    if (eyebrow) add(inner, 'span', 'gas-transition__eyebrow', eyebrow);
    var heading = add(inner, 'p', 'gas-transition__heading',
      link.getAttribute('data-transition-heading') || 'ページを開いています。');
    heading.setAttribute('tabindex', '-1');
    var text = link.getAttribute('data-transition-text');
    if (text) add(inner, 'p', 'gas-transition__text', text);
    add(inner, 'span', 'gas-transition__bar').setAttribute('aria-hidden', 'true');

    state.hidden = [];
    Array.prototype.forEach.call(document.body.children, function (child) {
      if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE') return;
      state.hidden.push({ el: child, ariaHidden: child.getAttribute('aria-hidden'), inert: child.inert });
      child.setAttribute('aria-hidden', 'true');
      child.inert = true;
    });
    document.body.appendChild(view);
    document.documentElement.classList.add('gas-transition-active');
    try { heading.focus({ preventScroll: true }); } catch (e) { heading.focus(); }
    state.view = view;
  }

  /** 戻るで戻ってきたとき（bfcache から復元）に、元のページへ戻す */
  function restore() {
    if (state.view && state.view.parentNode) state.view.parentNode.removeChild(state.view);
    state.hidden.forEach(function (h) {
      if (h.ariaHidden === null) h.el.removeAttribute('aria-hidden'); else h.el.setAttribute('aria-hidden', h.ariaHidden);
      h.el.inert = !!h.inert;
    });
    state.hidden = [];
    state.view = null;
    state.active = false;
    document.documentElement.classList.remove('gas-transition-active');
  }

  function isPlainActivation(ev, link) {
    if (ev.defaultPrevented) return false;
    if (typeof ev.button === 'number' && ev.button !== 0) return false;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return false;
    var target = link.getAttribute('target');
    if (target && target !== '_self') return false;
    if (link.hasAttribute('download')) return false;
    return GAS_URL.test(link.href);
  }

  document.addEventListener('click', function (ev) {
    var link = ev.target && ev.target.closest ? ev.target.closest('a[data-gas-transition]') : null;
    if (!link) return;
    if (state.active) { ev.preventDefault(); return; }     // 移動は 1 回だけ
    if (!isPlainActivation(ev, link)) return;              // 通常の動作に任せる

    ev.preventDefault();
    state.active = true;
    var url = link.href;
    render(link);

    // Transition View を描画してから、すぐに移動する（通常の履歴 ・ 同じタブ）。
    // requestAnimationFrame → setTimeout(0) で次の描画の後に移る。rAF が止まる環境の保険として短い timer も置く
    var gone = false;
    function go() {
      if (gone) return;
      gone = true;
      window.location.assign(url);
    }
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(function () { setTimeout(go, 0); });
    }
    setTimeout(go, 100);
  });

  window.addEventListener('pageshow', function () {
    if (state.active) restore();
  });
}());
