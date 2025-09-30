// ===== Brand-independent logic; change only the chapters array below =====
const chapters = [
  { slug: "chapter1",  title: "Chapter 1 — Why Acquihiring in India & When It Makes Sense" },
  { slug: "chapter2",  title: "Chapter 2 — Deal Models: Acquihire-Only, Asset/Share Deals, Team Lift-Outs" },
  { slug: "chapter3",  title: "Chapter 3 — Legal & Compliance: Companies Act, Labor, IP, ESOP Transfer, Cross-Border" },
  { slug: "chapter4",  title: "Chapter 4 — Valuation & Deal Economics: Offers, Buyouts, Retention, Earn-outs" },
  { slug: "chapter5",  title: "Chapter 5 — Diligence Playbook: Tech, Culture, Finance, HR, Risks" },
  { slug: "chapter6",  title: "Chapter 6 — Negotiation & Term Sheets: Key Clauses, Warranties, Pitfalls" },
  { slug: "chapter7",  title: "Chapter 7 — Integration: HR Ops, Payroll Migration, ESOP Mapping, Onboarding" },
  { slug: "chapter8",  title: "Chapter 8 — India Case Studies: What Worked, What Failed, Why" },
  { slug: "chapter9",  title: "Chapter 9 — Toolkits & Templates: Checklists, Emails, FAQs" },
  { slug: "chapter10", title: "Chapter 10 — Getting Started: Glossary, References, Next Steps" },
];

// ---------- Helpers ----------
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
/* -------- Sidebar + Navigation already set up earlier -------- */

/* -------- Quiz: toggle answers -------- */
document.addEventListener('DOMContentLoaded', () => {
  const answers = document.querySelectorAll('.quiz-answer');
  answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Show answer';
    btn.className = 'quiz-toggle';
    btn.addEventListener('click', () => {
      const visible = ans.style.display !== 'none';
      ans.style.display = visible ? 'none' : 'block';
      btn.textContent = visible ? 'Show answer' : 'Hide answer';
    });
    ans.parentNode.insertBefore(btn, ans);
    ans.style.display = 'none'; // hidden by default
  });
});


