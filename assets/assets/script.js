const chapters = [
  { slug: "chapter1",  title: "Chapter 1 — Introduction & Why This Matters" },
  { slug: "chapter2",  title: "Chapter 2 — Core Concepts & Vocabulary" },
  { slug: "chapter3",  title: "Chapter 3 — Market Landscape & Case Studies" },
  { slug: "chapter4",  title: "Chapter 4 — Legal & Compliance Basics" },
  { slug: "chapter5",  title: "Chapter 5 — Sourcing & Diligence" },
  { slug: "chapter6",  title: "Chapter 6 — Financials, Valuation & Offers" },
  { slug: "chapter7",  title: "Chapter 7 — Integration Playbooks" },
  { slug: "chapter8",  title: "Chapter 8 — Risks, Failure Patterns & Fixes" },
  { slug: "chapter9",  title: "Chapter 9 — Templates, Tools & Checklists" },
  { slug: "chapter10", title: "Chapter 10 — Capstone, References & Next Steps" },
];

function buildSidebar(containerSelector, activeSlug) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  const ul = document.createElement('ul');
  ul.className = 'toc';
  chapters.forEach(ch => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href = `${ch.slug}/`; // will be prefixed below
    a.textContent = ch.title;
    if (ch.slug === activeSlug) a.classList.add('active');
    li.appendChild(a);
    ul.appendChild(li);
  });
  el.innerHTML = ''; el.appendChild(ul);
}

function prefixLinks(container, prefix) {
  if (!container) return;
  container.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('./') || href.startsWith('../')) return;
    if (/^https?:\/\//i.test(href)) return;
    if (href.startsWith('#')) return;
    a.setAttribute('href', prefix + href);
  });
}

function wireChapterPage() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const match = path.match(/\/(chapter\d+)(?:\/index\.html)?$/i);
  if (!match) return; // not a chapter
  const slug = match[1];
  const idx = chapters.findIndex(c => c.slug === slug);
  if (idx === -1) return;

  const h1 = document.querySelector('h1[data-auto-title]');
  if (h1 && !h1.textContent.trim()) h1.textContent = chapters[idx].title;

  buildSidebar('#sidebar', slug);
  prefixLinks(document.querySelector('#sidebar'), '../');

  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  const prevLink = document.querySelector('#prevLink');
  const nextLink = document.querySelector('#nextLink');
  if (prev && prevLink) { prevLink.href = `../${prev.slug}/`; prevLink.querySelector('span').textContent = prev.title; }
  if (next && nextLink) { nextLink.href = `../${next.slug}/`; nextLink.querySelector('span').textContent = next.title; }

  document.querySelectorAll('a[data-home]').forEach(a => a.setAttribute('href', '../index.html'));

  // Footer internal links (glossary, questions, etc.) should be relative from chapter
  prefixLinks(document.querySelector('#siteFooter'), '../');
}

function wireHomePage() {
  if (!/\/(index\.html)?$/.test(window.location.pathname)) return;
  buildSidebar('#sidebar', null);
  prefixLinks(document.querySelector('#sidebar'), './');

  const list = document.querySelector('#chapterList');
  if (list) {
    chapters.forEach(ch => {
      const li = document.createElement('li');
      li.innerHTML = `<a class="btn" href="./${ch.slug}/">${ch.title}</a>`;
      list.appendChild(li);
    });
  }

  // Footer links from home
  prefixLinks(document.querySelector('#siteFooter'), './');
}

document.addEventListener('DOMContentLoaded', () => {
  wireHomePage();
  wireChapterPage();
});
