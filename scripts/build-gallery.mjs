import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('templates');
const out = path.resolve('gallery-dist');
const examples = [
  { name: 'React + TypeScript', slug: 'react-ui', kind: 'Interface', file: 'src/components.tsx', note: 'Reusable UI primitives and a polished template workbench.' },
  { name: 'SvelteKit', slug: 'sveltekit', kind: 'Interface', file: 'src/routes/+page.svelte', note: 'A responsive, searchable template catalog.' },
  { name: 'Ruby on Rails', slug: 'rails-api', kind: 'Backend', file: 'app/controllers/api/tasks_controller.rb', note: 'JSON task API with routes, model, and migration.' },
  { name: 'Java + Spring Boot', slug: 'spring-boot-api', kind: 'Backend', file: 'src/main/java/dev/littlepatterns/TaskController.java', note: 'REST controller with request validation and DTOs.' },
  { name: 'Python + FastAPI', slug: 'fastapi', kind: 'Backend', file: 'main.py', note: 'Typed routes, validation, and an in-memory task store.' },
  { name: 'Go', slug: 'go-api', kind: 'Backend', file: 'main.go', note: 'Standard-library JSON API with a small in-memory store.' },
  { name: 'Rust + Axum', slug: 'axum-api', kind: 'Backend', file: 'src/main.rs', note: 'Async JSON API with shared application state.' },
  { name: 'Dart + Flutter', slug: 'flutter-ui', kind: 'Interface', file: 'lib/main.dart', note: 'Task-list app with reusable chips and task rows.' },
  { name: 'Elm', slug: 'elm-ui', kind: 'Interface', file: 'src/Main.elm', note: 'Functional, update-driven task list.' },
  { name: 'Elixir + Phoenix', slug: 'phoenix-api', kind: 'Backend', file: 'lib/little_patterns/task_controller.ex', note: 'JSON task controller and Phoenix routes.' },
];

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const cards = await Promise.all(examples.map(async (example, index) => {
  const source = await readFile(path.join(root, example.slug, example.file), 'utf8');
  const lines = source.trimEnd().split('\n');
  const preview = lines.slice(0, 9).join('\n');
  const href = `/examples/${example.slug}/${example.file}`;
  return `<article class="card" data-kind="${example.kind.toLowerCase()}" data-search="${escapeHtml(`${example.name} ${example.slug} ${example.note}`.toLowerCase())}">
    <div class="card-top"><span>${example.kind}</span><span>${String(index + 1).padStart(2, '0')} / 10</span></div>
    <h2>${escapeHtml(example.name)}</h2><p>${escapeHtml(example.note)}</p>
    <pre><code>${escapeHtml(preview)}${lines.length > 9 ? '\n…' : ''}</code></pre>
    <div class="card-actions"><a href="${href}">Open full source ↗</a><details><summary>Read here (${lines.length} lines)</summary><pre><code>${escapeHtml(source)}</code></pre></details></div>
  </article>`;
}));

await mkdir(out, { recursive: true });
await writeFile(path.join(out, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Browse all ten copy-friendly UI and API examples across ten stacks."><title>little patterns · all examples</title><style>
:root{color-scheme:light;--ink:#20211e;--muted:#62645d;--line:#deded6;--paper:#f4f3ee;--card:#fbfaf6;--lime:#ddf36a;--green:#496848;font-family:Inter,ui-sans-serif,system-ui,sans-serif}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink)}a{color:inherit}.shell{width:min(1160px,calc(100% - 40px));margin:auto}.top{display:flex;justify-content:space-between;align-items:center;padding:22px 0;border-bottom:1px solid var(--line)}.brand{font-weight:800;text-decoration:none}.brand i{display:inline-grid;place-items:center;background:var(--lime);width:27px;height:27px;border-radius:8px;font-style:normal;margin-right:8px}.top small{color:var(--muted)}header{padding:64px 0 36px}header p,.card p{color:var(--muted);line-height:1.6}h1{font-size:clamp(42px,7vw,76px);letter-spacing:-.06em;line-height:.98;margin:12px 0}.eyebrow,.card-top,.count,summary{font:11px ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}.controls{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-top:28px}.filters{display:flex;gap:8px}.filters button,.search{border:1px solid var(--line);border-radius:6px;background:var(--card);padding:10px 13px;color:var(--ink)}.filters button{cursor:pointer}.filters button[aria-pressed=true]{background:var(--ink);color:#fff}.search{min-width:min(320px,100%)}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;padding-bottom:64px}.card{border:1px solid var(--line);border-radius:8px;background:var(--card);padding:18px;min-width:0}.card-top{display:flex;justify-content:space-between;color:#5f6258}.card h2{font-size:23px;letter-spacing:-.04em;margin:18px 0 4px}.card p{font-size:14px;margin:0 0 16px;min-height:44px}.card pre{max-height:190px;overflow:auto;white-space:pre-wrap;background:#eeede7;padding:14px;border-radius:5px;font:12px/1.65 ui-monospace,monospace;color:#343630}.card-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}.card-actions>a{font-weight:700;color:var(--green)}details{width:100%;margin-top:10px}summary{cursor:pointer;color:var(--muted)}details pre{max-height:420px}.empty{display:none;padding:35px;text-align:center;color:var(--muted)}footer{border-top:1px solid var(--line);padding:20px 0 36px;color:var(--muted);font-size:13px}@media(max-width:680px){.grid{grid-template-columns:1fr}header{padding-top:42px}.top small{font-size:11px}}
</style></head><body><nav class="top shell"><a class="brand" href="/"><i>✳</i>little patterns.</a><small>10 examples · 10 stacks</small></nav><main class="shell"><header><div class="eyebrow">A shelf, not a framework</div><h1>All the examples,<br>in one place.</h1><p>Browse, search, and read source for every UI and backend starter. Each card links straight to the full file.</p><div class="controls"><div class="filters" aria-label="Filter examples"><button type="button" data-filter="all" aria-pressed="true">Everything <span>10</span></button><button type="button" data-filter="interface" aria-pressed="false">Interface <span>04</span></button><button type="button" data-filter="backend" aria-pressed="false">Backend <span>06</span></button></div><input class="search" type="search" placeholder="Find a stack or pattern…" aria-label="Search examples"><span class="count" aria-live="polite">10 examples</span></div></header><section class="grid" aria-label="All ten stack examples">${cards.join('\n')}</section><p class="empty">No examples match that search.</p></main><footer class="shell">Source templates are open source under the repository’s MIT license. Examples are starter patterns, not production-ready services.</footer><script>
const buttons=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('.card')],search=document.querySelector('.search'),count=document.querySelector('.count'),empty=document.querySelector('.empty');let filter='all';function update(){const query=search.value.trim().toLowerCase();let visible=0;for(const card of cards){const show=(filter==='all'||card.dataset.kind===filter)&&card.dataset.search.includes(query);card.hidden=!show;if(show)visible++}count.textContent=visible+' example'+(visible===1?'':'s');empty.style.display=visible?'none':'block'}for(const button of buttons)button.addEventListener('click',()=>{filter=button.dataset.filter;for(const item of buttons)item.setAttribute('aria-pressed',String(item===button));update()});search.addEventListener('input',update);
</script></body></html>`);
