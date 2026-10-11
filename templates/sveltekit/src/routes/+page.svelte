<script lang="ts">
  let query = $state('');
  const notes = [
    { title: 'Make the first screen smaller', tag: 'Interface', excerpt: 'Start with one honest job. Let the second screen wait until it earns its keep.' },
    { title: 'Return the useful error', tag: 'Backend', excerpt: 'A 404 should say what was not found, not invite the caller to guess.' },
    { title: 'Give the empty state a verb', tag: 'Interface', excerpt: '“Add your first note” beats a blank box and a tiny illustration.' },
    { title: 'Keep the contract visible', tag: 'Backend', excerpt: 'Write down the shape of a request before the handler grows around it.' },
  ];
  const filtered = $derived(notes.filter((note) => `${note.title} ${note.tag} ${note.excerpt}`.toLowerCase().includes(query.toLowerCase())));
</script>

<svelte:head><meta name="description" content="Small notes about building useful things." /></svelte:head>
<main>
  <nav><a class="brand" href="/" aria-label="Field notes home"><span>✳</span> fieldnotes</a><a href="https://github.com/evanxdsouza/cooltontest">Open source ↗</a></nav>
  <section class="intro"><p class="eyebrow"><i></i> A notebook for the work</p><h1>Keep the good<br /><em>bits close.</em></h1><p class="lede">Little notes from the process of making interfaces and systems feel considered.</p><div class="count">A LIVING COLLECTION <span>·</span> 04 NOTES</div></section>
  <section class="notes" aria-label="Notes"><div class="toolbar"><h2>Recent notes</h2><label><span aria-hidden="true">⌕</span><input bind:value={query} aria-label="Search notes" placeholder="Search notes…" /></label></div>
    {#each filtered as note}<article class="note"><div class="note-tag">{note.tag}</div><div><h3>{note.title}</h3><p>{note.excerpt}</p></div><span class="arrow" aria-hidden="true">↗</span></article>{:else}<p class="empty">No notes match that search. Try another word.</p>{/each}
  </section>
  <footer><span>Made slowly, shipped anyway.</span><span>FIELDNOTES / VOL. 01</span></footer>
</main>

<style>
  :global(*){box-sizing:border-box}:global(body){margin:0;background:#f2f1eb;color:#20221e;font-family:Inter,ui-sans-serif,system-ui,sans-serif}main{max-width:1020px;margin:0 auto;padding:0 48px}nav{height:78px;border-bottom:1px solid #deded6;display:flex;align-items:center;justify-content:space-between;font-size:12px}nav a:last-child{color:#6c6f65}.brand{font-weight:800;font-size:16px;letter-spacing:-.7px}.brand span{display:inline-grid;place-items:center;width:25px;height:25px;background:#dff16d;border-radius:8px;margin-right:7px}.intro{padding:80px 0 61px}.eyebrow,.count{font:10px ui-monospace,monospace;letter-spacing:1.1px;text-transform:uppercase;color:#73766d}.eyebrow{display:flex;gap:8px;align-items:center}.eyebrow i{width:7px;height:7px;border-radius:50%;background:#8eaa61}.intro h1{font-size:clamp(56px,8vw,83px);line-height:.99;letter-spacing:-6px;margin:25px 0 17px}.intro h1 em{font-weight:400;color:#82905f}.lede{max-width:380px;font-size:14px;line-height:1.8;color:#74766e}.count{padding-top:27px;font-size:9px}.count span{padding:0 6px;color:#a2b270}.notes{border-top:1px solid #dadbd2}.toolbar{display:flex;align-items:center;justify-content:space-between;padding:22px 0}.toolbar h2{font-size:14px;margin:0}.toolbar label{display:flex;align-items:center;gap:8px;border:1px solid #ddded5;border-radius:4px;padding:8px 10px;background:#faf9f5}.toolbar label span{font-size:17px}.toolbar input{border:0;outline:none;background:transparent;font:11px inherit;width:135px}.note{display:grid;grid-template-columns:120px 1fr 20px;gap:15px;align-items:center;padding:23px 0;border-top:1px solid #e0e0d8}.note-tag{font:9px ui-monospace,monospace;color:#65806a}.note h3{font-size:15px;letter-spacing:-.3px;margin:0 0 5px}.note p{font-size:11px;color:#777970;margin:0;line-height:1.7}.arrow{color:#777c6a}.empty{padding:32px 0;color:#73766d;font-size:13px}footer{display:flex;justify-content:space-between;border-top:1px solid #dadbd2;padding:23px 0;margin-top:34px;color:#888a81;font:9px ui-monospace,monospace}@media(max-width:600px){main{padding:0 22px}.intro{padding:58px 0 45px}.intro h1{font-size:64px;letter-spacing:-4px}.note{grid-template-columns:75px 1fr 14px;gap:9px;padding:19px 0}.note h3{font-size:13px}.note p{font-size:10px}.toolbar label{padding:7px}.toolbar input{width:100px}footer{font-size:8px}}@media(prefers-reduced-motion:reduce){:global(html){scroll-behavior:auto}}
</style>
