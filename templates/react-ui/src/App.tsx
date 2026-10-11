import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Button, SearchInput, SectionHeading, Tag } from './components';
import fastApiCode from '../../fastapi/main.py?raw';
import reactCode from './components.tsx?raw';
import goCode from '../../go-api/main.go?raw';
import svelteKitCode from '../../sveltekit/src/routes/+page.svelte?raw';
import flutterCode from '../../flutter-ui/lib/main.dart?raw';
import railsCode from '../../rails-api/app/controllers/api/tasks_controller.rb?raw';
import axumCode from '../../axum-api/src/main.rs?raw';
import elmCode from '../../elm-ui/src/Main.elm?raw';
import springBootCode from '../../spring-boot-api/src/main/java/dev/littlepatterns/TaskController.java?raw';
import phoenixCode from '../../phoenix-api/lib/little_patterns/task_controller.ex?raw';

type Template = { name: string; category: string; language: string; note: string; color: string; slug: string; code: string };
const templates: Template[] = [
  { name: 'Pocket tasks API', category: 'Backend', language: 'FastAPI', note: 'Typed routes, validation, in-memory store.', color: 'blue', slug: 'fastapi', code: fastApiCode },
  { name: 'Soft-panel dashboard', category: 'Interface', language: 'React', note: 'A calm home for the numbers that matter.', color: 'lime', slug: 'react-ui', code: reactCode },
  { name: 'Tasks that travel', category: 'Backend', language: 'Go', note: 'A tiny JSON API, no framework required.', color: 'peach', slug: 'go-api', code: goCode },
  { name: 'Field notes', category: 'Interface', language: 'SvelteKit', note: 'A filterable collection page with soul.', color: 'lilac', slug: 'sveltekit', code: svelteKitCode },
  { name: 'Checked, not cluttered', category: 'Interface', language: 'Flutter', note: 'Reusable rows and friendly task states.', color: 'mint', slug: 'flutter-ui', code: flutterCode },
  { name: 'Little by little', category: 'Backend', language: 'Rails', note: 'A focused controller and a clean route.', color: 'pink', slug: 'rails-api', code: railsCode },
  { name: 'Typed at the edges', category: 'Backend', language: 'Axum', note: 'Shared state and typed JSON responses.', color: 'mint', slug: 'axum-api', code: axumCode },
  { name: 'A page with a pulse', category: 'Interface', language: 'Elm', note: 'Explicit updates, simple state, no surprises.', color: 'peach', slug: 'elm-ui', code: elmCode },
  { name: 'Small signals', category: 'Backend', language: 'Spring Boot', note: 'A REST endpoint with a proper request DTO.', color: 'blue', slug: 'spring-boot-api', code: springBootCode },
  { name: 'Mountain air', category: 'Backend', language: 'Phoenix', note: 'A Phoenix JSON controller and route.', color: 'lilac', slug: 'phoenix-api', code: phoenixCode },
];
const filters = ['Everything', 'Interface', 'Backend'];

function snippetPreview(code: string) {
  const lines = code.trim().split('\n');
  return `${lines.slice(0, 6).join('\n')}${lines.length > 6 ? '\n…' : ''}`;
}

function Icon({ name }: { name: string }) {
  if (name === 'arrow') return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg>;
  if (name === 'spark') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></svg>;
  return null;
}

export default function App() {
  const [filter, setFilter] = useState('Everything');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState('');
  const [selected, setSelected] = useState<Template>(templates[1]);
  const [tasks, setTasks] = useState([{ title: 'Sketch the first screen', done: true }, { title: 'Make the button feel right', done: false }]);
  const [draft, setDraft] = useState('');
  const [method, setMethod] = useState('GET');
  const [apiTasks, setApiTasks] = useState([{ id: 1, title: 'Sketch the first screen', done: true }]);
  const [response, setResponse] = useState(() => JSON.stringify({ message: 'Ready to make a request' }, null, 2));
  const shown = useMemo(() => templates.filter((item) => (filter === 'Everything' || item.category === filter) && `${item.name} ${item.language} ${item.note}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  async function copyCode(item: Template) {
    try { await navigator.clipboard.writeText(item.code); setCopied(item.name); window.setTimeout(() => setCopied(''), 1600); }
    catch { setCopied('Clipboard unavailable'); window.setTimeout(() => setCopied(''), 1600); }
  }
  function runRequest() {
    if (method === 'GET') setResponse(JSON.stringify({ tasks: apiTasks }, null, 2));
    if (method === 'POST') {
      const task = { id: apiTasks.length + 1, title: 'A small new thing', done: false };
      setApiTasks((current) => [...current, task]);
      setResponse(JSON.stringify({ task }, null, 2));
    }
    if (method === 'PATCH') {
      const updated = apiTasks.map((task) => task.id === 1 ? { ...task, done: !task.done } : task);
      setApiTasks(updated);
      setResponse(JSON.stringify({ task: updated[0] }, null, 2));
    }
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
      <div className="hero-art" role="img" aria-label="A sample card preview showing a completed task list">
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
      <div className="library-controls"><div className="filter-tabs" role="group" aria-label="Filter patterns">{filters.map((item) => <button key={item} className={`filter-tab ${filter === item ? 'is-active' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'Interface' ? <span>04</span> : item === 'Backend' ? <span>06</span> : null}</button>)}</div><SearchInput aria-label="Search patterns" placeholder="Find a pattern…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div className="pattern-grid">{shown.map((item, index) => <article className={`pattern-card pattern-card--${item.color} ${selected.name === item.name ? 'is-selected' : ''}`} key={item.name} style={{ '--delay': `${index * 45}ms` } as CSSProperties}>
        <div className="pattern-top"><Tag color={item.category === 'Interface' ? 'green' : 'ink'}>{item.category}</Tag><button className="copy-button" onClick={() => copyCode(item)} aria-label={`Copy ${item.language} code example`}>{copied === item.name ? 'Copied ✓' : 'Copy ↗'}</button></div>
        <div className="pattern-info"><h3>{item.name}</h3><p>{item.note}</p><button className="open-example" onClick={() => setSelected(item)} aria-pressed={selected.name === item.name}>{selected.name === item.name ? 'Viewing example' : 'Open live example'} <Icon name="arrow" /></button></div>
        <div className="code-window"><div className="code-top"><span className="code-language"><i/> {item.language}</span><span className="code-dots">···</span></div><pre><code>{snippetPreview(item.code)}</code></pre></div>
        <div className="pattern-foot"><span className="pattern-index">{String(templates.indexOf(item) + 1).padStart(2, '0')}</span><span>{item.language}</span><Icon name="arrow" /></div>
      </article>)}</div>
      {shown.length === 0 && <div className="empty-state"><span>⌕</span><h3>No matches in this little library.</h3><p>Try another word, or clear the filter.</p><Button tone="quiet" onClick={() => { setFilter('Everything'); setQuery(''); }}>Show every pattern</Button></div>}
    </section>

    <section className="workbench shell" id="workbench" aria-labelledby="workbench-title">
      <div className="workbench-heading"><div><span className="eyebrow">Try it before you take it</span><h2 id="workbench-title">The pattern, in motion.</h2></div><span className="workbench-number">LIVE WORKBENCH / {String(templates.indexOf(selected) + 1).padStart(2, '0')}</span></div>
      <div className="workbench-grid">
        <section className="workbench-preview" aria-label={`${selected.language} live example`}>
          <div className="workbench-bar"><span><i className="live-dot"/> LIVE PREVIEW</span><Tag color={selected.category === 'Interface' ? 'green' : 'ink'}>{selected.language}</Tag></div>
          {selected.category === 'Interface' ? <div className="live-app">
            <div className="live-app-top"><span className="live-brand">{selected.language === 'SvelteKit' ? 'fieldnotes' : 'today, gently'}<b>✳</b></span><span className="live-date">MONDAY · AT YOUR PACE</span></div>
            {selected.language === 'SvelteKit' ? <><p className="live-intro">A notebook for the work.</p><label className="live-search"><span>⌕</span><input aria-label="Search preview notes" placeholder="Search notes…" onChange={(event) => setDraft(event.target.value)} /></label>{['Make the first screen smaller', 'Return the useful error', 'Keep the contract visible'].filter((title) => title.toLowerCase().includes(draft.toLowerCase())).map((title) => <div className="live-note" key={title}><span>FIELD NOTE</span><b>{title}</b><small>Keep one useful idea close, then turn it into something real.</small></div>)}</> : <><p className="live-intro">A short list. A little progress.</p><div className="live-meter"><span style={{ width: `${tasks.length ? Math.round(tasks.filter((task) => task.done).length / tasks.length * 100) : 0}%` }}/></div><div className="live-list">{tasks.map((task, index) => <label className="live-task" key={`${task.title}-${index}`}><input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((entry, i) => i === index ? { ...entry, done: !entry.done } : entry))}/><span>{task.title}</span><small>{task.done ? 'DONE' : 'NEXT'}</small></label>)}</div><form className="live-add" onSubmit={(event) => { event.preventDefault(); if (draft.trim()) { setTasks((current) => [...current, { title: draft.trim(), done: false }]); setDraft(''); } }}><input aria-label="New task" placeholder="Add one small thing…" value={draft} onChange={(event) => setDraft(event.target.value)}/><button type="submit" aria-label="Add task">+</button></form></>}
            <div className="live-app-foot"><span>MADE FOR SMALL STARTS</span><span>{selected.language.toUpperCase()} / SAMPLE</span></div>
          </div> : <div className="api-console"><div className="api-label">REQUEST PLAYGROUND <span>LOCAL DEMO · NO SERVER</span></div><div className="request-line"><select aria-label="HTTP method" value={method} onChange={(event) => setMethod(event.target.value)}><option>GET</option><option>POST</option><option>PATCH</option></select><code>{method === 'PATCH' ? '/tasks/1' : '/tasks'}</code><Button onClick={runRequest}>Send request <Icon name="arrow" /></Button></div><div className="api-caption"><span>RESPONSE</span><span className="status-pill">200 OK</span></div><pre className="response-code"><code>{response}</code></pre><p className="api-hint">Try <b>POST</b> to create a task or <b>PATCH</b> to toggle its completion. This playground simulates the endpoints locally.</p></div>}
        </section>
        <section className="source-panel" aria-label="Copyable source snippet"><div className="source-top"><div><span className="eyebrow">The useful bit</span><h3>{selected.name}</h3></div><Button tone="quiet" onClick={() => copyCode(selected)}>{copied === selected.name ? 'Copied ✓' : 'Copy snippet'}</Button></div><div className="source-meta"><span><i/> {selected.language}</span><span>{selected.category.toUpperCase()} / EXAMPLE</span></div><pre className="source-code" tabIndex={0}><code>{selected.code}</code></pre><div className="source-foot"><span>Small enough to understand. Yours to change.</span><a href={`https://github.com/evanxdsouza/cooltontest/tree/main/templates/${selected.slug}`} target="_blank" rel="noreferrer">Full template ↗</a></div></section>
      </div>
      <div className="workbench-legend"><span><i className="live-dot"/> interactive preview</span><span>click a card above to switch patterns</span></div>
    </section>

    <section className="components-section" id="components"><div className="shell components-layout"><div className="components-copy"><span className="eyebrow">A small kit of parts</span><h2>Good manners,<br/>built in.</h2><p>A few reusable pieces from the gallery itself. Keyboard-friendly, legible, and not allergic to being changed.</p><a href="https://github.com/evanxdsouza/cooltontest/blob/main/templates/react-ui/src/components.tsx" target="_blank" rel="noreferrer" className="text-link">Read the component source <Icon name="arrow" /></a></div><div className="component-board"><div className="board-top"><span>COMPONENTS / 001—004</span><span className="board-star">✳</span></div><div className="component-row"><span className="component-label">BUTTONS</span><div className="demo-items"><Button>Primary action <Icon name="arrow" /></Button><Button tone="lime">Try a little color</Button><Button tone="quiet">Quiet action</Button></div></div><div className="component-row"><span className="component-label">STATUS TAGS</span><div className="demo-items"><Tag color="ink">Backend</Tag><Tag color="green">Ready to remix</Tag><Tag color="lilac">New pattern</Tag></div></div><div className="component-row component-row--last"><span className="component-label">A GOOD EMPTY STATE</span><div className="empty-demo"><span>✳</span><div><b>Nothing on the shelf yet.</b><small>Add your first pattern and it’ll show up here.</small></div><button aria-label="Add a pattern">+</button></div></div></div></div></section>

    <footer className="footer shell"><a className="wordmark" href="#top"><span className="mark"><Icon name="spark" /></span>little patterns<span className="wordmark-dot">.</span></a><span>Small starts for very real projects.</span><a href="https://github.com/evanxdsouza/cooltontest" target="_blank" rel="noreferrer">Open source, MIT <Icon name="arrow" /></a></footer>
    <div className="toast" role="status" aria-live="polite">{copied && copied !== 'Clipboard unavailable' ? 'Copied to clipboard' : copied}</div>
  </main>;
}
