/*
 * Project Creation｜Founding Cohort の受付状態（LP ・ /apply/ 共通）
 * 正本: dreamin-spiral-os docs/repository-architecture/project-creation-launch-v1.md §4-1 ・ §11
 *
 *  - 締切（2026-09-30 18:00 JST）を過ぎると、自動的に受付終了の表示へ切り替える
 *  - 6名に達したとき（Owner の判断）は STATUS を 'closed' にする（1 行の変更）
 *  - 受付終了時: [data-pc-apply]（Primary 申込 CTA ・ 申込 Form）を隠し、[data-pc-closed]（受付終了の表示）を出す。
 *    Guide（無料）の導線 ・ LP の本文はそのまま残す
 *  - JavaScript が動かない場合は受付中の表示のまま（締切後は Stripe Payment Link も無効化する — §11）
 */
(function () {
  var STATUS = 'open';                                       // 'open' ／ 'closed'（満席時）
  var DEADLINE = Date.parse('2026-09-30T18:00:00+09:00');    // 申込締切

  var closed = STATUS === 'closed' || Date.now() >= DEADLINE;
  if (!closed) { return; }

  var i;
  var open = document.querySelectorAll('[data-pc-apply]');
  for (i = 0; i < open.length; i++) { open[i].hidden = true; }
  var notes = document.querySelectorAll('[data-pc-closed]');
  for (i = 0; i < notes.length; i++) { notes[i].hidden = false; }
})();
