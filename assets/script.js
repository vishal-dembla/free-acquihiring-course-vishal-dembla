/* shadcn-docs inspired shell: sidebars, on-this-page, prev/next, quiz */

const CHAPTERS = [
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

const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

function currentSlug(){
  const m = location.pathname.replace(/\/+$/,'').match(/\/(chapter\d+)(?:\/index\.html)?$/i);
  return m ? m[1] : null;
}

function buildLeftTOC(activeSlug, prefix){
  const box = $('#leftTOC'); if (!box) return;
  const ul = document.createElement('ul'); ul.className = 'toc';
  CHAPTERS.forEach(ch=>{
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href = `${prefix}${ch.slug}/`; a.textContent = ch.title;
    if (ch.slug === activeSlug) a.classList.add('active');
    li.appendChild(a); ul.appendChild(li);
  });
  box.innerHTML = '<h4>Sections</h4>';
  box.appendChild(ul);
}

function buildRightTOC(){
  const box = $('#rightTOC'); if (!box) return;
  const hs = $$('.content h2'); if (!hs.length){ box.innerHTML=''; return; }
  const ul = document.createElement('ul');
  hs.forEach(h=>{
    if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/[^\w]+/g,'-');
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href = `#${h.id}`; a.textContent = h.textContent;
    li.appendChild(a); ul.appendChild(li);
  });
  box.innerHTML = '<h4>On this page</h4>';
  box.appendChild(ul);
}

function wirePrevNext(activeSlug, prefix){
  const i = CHAPTERS.findIndex(c=>c.slug===activeSlug); if (i<0) return;
  const prev = $('#prevLink'), next = $('#nextLink');
  if (prev && CHAPTERS[i-1]) { prev.href = `${prefix}${CHAPTERS[i-1].slug}/`; prev.textContent = `← ${CHAPTERS[i-1].title}`; }
  if (next && CHAPTERS[i+1]) { next.href = `${prefix}${CHAPTERS[i+1].slug}/`; next.textContent = `${CHAPTERS[i+1].title} →`; }
}

function wireQuiz(){
  $$('.quiz-answer').forEach(ans=>{
    if (ans.dataset.wired==='1') return;
    ans.dataset.wired = '1';
    const btn = document.createElement('button');
    btn.type='button'; btn.className='quiz-toggle'; btn.textContent='Show answer';
    btn.addEventListener('click',()=>{
      const open = ans.style.display !== 'none';
      ans.style.display = open ? 'none' : 'block';
      btn.textContent = open ? 'Show answer' : 'Hide answer';
    });
    ans.style.display='none';
    ans.parentNode.insertBefore(btn, ans);
  });
}

function wireHome(){
  if (!/\/(index\.html)?$/.test(location.pathname)) return false;
  buildLeftTOC(null,'./');
  buildRightTOC();
  const list = $('#chapterList');
  if (list){
    CHAPTERS.forEach(ch=>{
      const li = document.createElement('li');
      li.innerHTML = `<a class="navbtn" href="./${ch.slug}/">${ch.title}</a>`;
      list.appendChild(li);
    });
  }
  wireQuiz();
  return true;
}

function wireChapter(){
  const slug = currentSlug(); if (!slug) return false;
  buildLeftTOC(slug,'../');
  buildRightTOC();
  wirePrevNext(slug,'../');
  $$('a[data-home]').forEach(a=>a.href='../index.html');
  wireQuiz();
  return true;
}

document.addEventListener('DOMContentLoaded', ()=>{
  if (wireHome()) return;
  wireChapter();
});
