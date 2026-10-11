import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Button, SearchInput, SectionHeading, Tag } from './components';

type Template = { name: string; category: string; language: string; note: string; color: string; code: string };
const templates: Template[] = [
  { name: 'Pocket tasks API', category: 'Backend', language: 'FastAPI', note: 'Typed routes, validation, in-memory store.', color: 'blue', code: `app = FastAPI()\n\n@app.get("/tasks")\ndef list_tasks():\n    return tasks` },
  { name: 'Soft-panel dashboard', category: 'Interface', language: 'React', note: 'A calm home for the numbers that matter.', color: 'lime', code: `<Panel title="This week">\n  <Metric value="24" label="shipped" />\n</Panel>` },
  { name: 'Tasks that travel', category: 'Backend', language: 'Go', note: 'A tiny JSON API, no framework required.', color: 'peach', code: `mux.HandleFunc("GET /tasks", listTasks)\n\njson.NewEncoder(w).Encode(tasks)` },
  { name: 'Field notes', category: 'Interface', language: 'SvelteKit', note: 'A filterable collection page with soul.', color: 'lilac', code: `<input bind:value={query} />\n{#each filtered as note}\n  <NoteCard {note} />\n{/each}` },
  { name: 'Checked, not cluttered', category: 'Interface', language: 'Flutter', note: 'Reusable rows and friendly task states.', color: 'mint', code: `TaskRow(\n  title: "Sketch the first screen",\n  done: false,\n)` },
  { name: 'Little by little', category: 'Backend', language: 'Rails', note: 'A focused controller and a clean route.', color: 'pink', code: `resources :tasks, only: %i[index create]\n\nrender json: Task.order(created_at: :desc)` },
  { name: 'Typed at the edges', category: 'Backend', language: 'Axum', note: 'Shared state and typed JSON responses.', color: 'mint', code: `Router::new()\n  .route("/tasks", get(list))\n  .with_state(state)` },
  { name: 'A page with a pulse', category: 'Interface', language: 'Elm', note: 'Explicit updates, simple state, no surprises.', color: 'peach', code: `type Msg = Toggle Int\n\nupdate msg model =\n    case msg of\n      Toggle id -> flip id model` },
  { name: 'Small signals', category: 'Backend', language: 'Spring Boot', note: 'A REST endpoint with a proper request DTO.', color: 'blue', code: `@GetMapping("/tasks")\nList<TaskView> list() {\n  return service.all();\n}` },
  { name: 'Mountain air', category: 'Backend', language: 'Phoenix', note: 'A Phoenix JSON controller and route.', color: 'lilac', code: `get "/tasks", TaskController, :index\n\ndef index(conn, _params) do\n  json(conn, %{tasks: []})\nend` },
];
const filters = ['Everything', 'Interface', 'Backend'];

function Icon({ name }: { name: string }) {
  if (name === 'arrow') return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg>;
  if (name === 'spark') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></svg>;
  return null;
}

export default function App() {
  const [filter, setFilter] = useState('Everything');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState('');
  const shown = useMemo(() => templates.filter((item) => (filter === 'Everything' || item.category === filter) && `${item.name} ${item.language} ${item.note}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  async function copyCode(item: Template) {
    try { await navigator.clipboard.writeText(item.code); setCopied(item.name); window.setTimeout(() => setCopied(''), 1600); }
    catch { setCopied('Clipboard unavailable'); window.setTimeout(() => setCopied(''), 1600); }
  }

  return <main>
    <nav className="topbar shell" aria-label="Main navigation">
      <a className="wordmark" href="#top" aria-label="little patterns home"><span className="mark"><Icon name="spark" /></span>little patterns<span className="wordmark-dot">.</span></a>
      <div className="top-links"><a href="#library">Library <span>10</span></a><a href="#components">Components</a><a className="github-link" href="https://github.com/evanxdsouza/cooltontest" target="_blank" rel="noreferrer">View repo <Icon name="arrow" /></a></div>
    </nav>

    <section className="hero shell" id="top">
      <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="live-dot" /> A field guide for people who build</div>
        <h1>Start with a<br/><span>good little</span><br/>pattern.</h1>
        <p className="hero-text">Useful building blocks for interfaces and APIs. Borrow a shape, change the details, make it yours.</p>
        <div className="hero-actions"><a href="#library" className="button button--dark">Explore the library <Icon name="arrow" /></a><span className="no-framework">10 starters · 10 stacks · open source</span></div>
      </div>
      <div className="hero-art" aria-label="A sample card preview showing a completed task list">
        <div className="orbit orbit--one"/><div className="orbit orbit--two"/>
        <div className="float-note float-note--top"><span className="mini-dot mini-dot--lime"/> usable, not precious</div>
        <article className="hero-card"><div className="card-kicker"><span>MONDAY / 09:41</span><span className="three-dots">•••</span></div><div className="hero-card-title">today, gently<span>✳</span></div><div className="task-line"><span className="task-check">✓</span><span>sketch the first screen</span><span className="task-time">9:00</span></div><div className="task-line"><span className="task-check task-check--empty"/><span>make the button feel right</span><span className="task-time">11:30</span></div><div className="task-line"><span className="task-check task-check--empty"/><span>send it to a human</span><span className="task-time">15:00</span></div><div className="hero-card-foot"><span>3 small things</span><span className="progress"><i/></span><b>1 / 3</b></div></article>
        <div className="float-note float-note--bottom"><span className="mini-swatch"/> thoughtful by default</div>
        <div className="art-sticker">✳<span>made to<br/>remix</span></div>
      </div>
      <div className="hero-side-note">A SMALL COLLECTION<br/>OF PRACTICAL STARTS <span>↘</span></div>
    </section>

    <section className="ticker" aria-label="Included technologies"><div className="ticker-inner"><span>REACT</span><i/> <span>RAILS</span><i/> <span>GO</span><i/> <span>ELM</span><i/> <span>PYTHON</span><i/> <span>PHOENIX</span><i/> <span>RUST</span><i/> <span>SVELTEKIT</span><i/> <span>FLUTTER</span><i/> <span>JAVA</span><i/></div></section>

    <section id="library" className="library shell"><SectionHeading eyebrow="A shelf, not a framework" title="Pick a place to begin."><span className="result-count">{shown.length.toString().padStart(2, '0')} / 10 patterns</span></SectionHeading>
      <div className="library-controls"><div className="filter-tabs" aria-label="Filter patterns">{filters.map((item) => <button key={item} className={`filter-tab ${filter === item ? 'is-active' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'Interface' ? <span>04</span> : item === 'Backend' ? <span>06</span> : null}</button>)}</div><SearchInput aria-label="Search patterns" placeholder="Find a pattern…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div className="pattern-grid">{shown.map((item, index) => <article className={`pattern-card pattern-card--${item.color}`} key={item.name} style={{ '--delay': `${index * 45}ms` } as CSSProperties}>
        <div className="pattern-top"><Tag color={item.category === 'Interface' ? 'green' : 'ink'}>{item.category}</Tag><button className="copy-button" onClick={() => copyCode(item)} aria-label={`Copy ${item.language} code example`}>{copied === item.name ? 'Copied ✓' : 'Copy ↗'}</button></div>
        <div className="pattern-info"><h3>{item.name}</h3><p>{item.note}</p></div>
        <div className="code-window"><div className="code-top"><span className="code-language"><i/> {item.language}</span><span className="code-dots">···</span></div><pre><code>{item.code}</code></pre></div>
        <div className="pattern-foot"><span className="pattern-index">{String(templates.indexOf(item) + 1).padStart(2, '0')}</span><span>{item.language}</span><Icon name="arrow" /></div>
      </article>)}</div>
      {shown.length === 0 && <div className="empty-state"><span>⌕</span><h3>No matches in this little library.</h3><p>Try another word, or clear the filter.</p><Button tone="quiet" onClick={() => { setFilter('Everything'); setQuery(''); }}>Show every pattern</Button></div>}
    </section>

    <section className="components-section" id="components"><div className="shell components-layout"><div className="components-copy"><span className="eyebrow">A small kit of parts</span><h2>Good manners,<br/>built in.</h2><p>A few reusable pieces from the gallery itself. Keyboard-friendly, legible, and not allergic to being changed.</p><a href="./src/components.tsx" className="text-link">Read the component source <Icon name="arrow" /></a></div><div className="component-board"><div className="board-top"><span>COMPONENTS / 001—004</span><span className="board-star">✳</span></div><div className="component-row"><span className="component-label">BUTTONS</span><div className="demo-items"><Button>Primary action <Icon name="arrow" /></Button><Button tone="lime">Try a little color</Button><Button tone="quiet">Quiet action</Button></div></div><div className="component-row"><span className="component-label">STATUS TAGS</span><div className="demo-items"><Tag color="ink">Backend</Tag><Tag color="green">Ready to remix</Tag><Tag color="lilac">New pattern</Tag></div></div><div className="component-row component-row--last"><span className="component-label">A GOOD EMPTY STATE</span><div className="empty-demo"><span>✳</span><div><b>Nothing on the shelf yet.</b><small>Add your first pattern and it’ll show up here.</small></div><button aria-label="Add a pattern">+</button></div></div></div></div></section>

    <footer className="footer shell"><a className="wordmark" href="#top"><span className="mark"><Icon name="spark" /></span>little patterns<span className="wordmark-dot">.</span></a><span>Small starts for very real projects.</span><a href="https://github.com/evanxdsouza/cooltontest" target="_blank" rel="noreferrer">Open source, MIT <Icon name="arrow" /></a></footer>
    <div className="toast" role="status" aria-live="polite">{copied && copied !== 'Clipboard unavailable' ? 'Copied to clipboard' : copied}</div>
  </main>;
}
