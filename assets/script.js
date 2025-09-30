// =========================================================
// Course Docs Script (TOC active state, Prev/Next, Quiz)
// =========================================================

// Chapters list
const chapters = [
  "Chapter 1: What is Acquihiring?",
  "Chapter 2: Why India is Different",
  "Chapter 3: Legal & Compliance",
  "Chapter 4: Deal Mechanics",
  "Chapter 5: Valuation Methods",
  "Chapter 6: Recruiter Playbook",
  "Chapter 7: Founder/Operator Lens",
  "Chapter 8: Post-Acquihire Integration",
  "Chapter 9: Case Studies",
  "Chapter 10: Templates & FAQs"
];

// Set sidebar TOC + navbar links
document.addEventListener("DOMContentLoaded", () => {
  const toc = document.querySelector(".toc");
  if (toc) {
    toc.querySelectorAll("a").forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });
  }

  // Prev/Next nav
  const nav = document.querySelector(".navbar");
  if (nav) {
    const path = window.location.pathname;
    const currentIndex = chapters.findIndex(ch => path.includes(`chapter${chapters.indexOf(ch)+1}`));

    if (currentIndex !== -1) {
      if (currentIndex > 0) {
        const prevBtn = document.createElement("a");
        prevBtn.href = `../chapter${currentIndex}/index.html`;
        prevBtn.className = "navbtn";
        prevBtn.textContent = `← ${chapters[currentIndex-1]}`;
        nav.appendChild(prevBtn);
      }
      if (currentIndex < chapters.length - 1) {
        const nextBtn = document.createElement("a");
        nextBtn.href = `../chapter${currentIndex+2}/index.html`;
        nextBtn.className = "navbtn";
        nextBtn.textContent = `${chapters[currentIndex+1]} →`;
        nav.appendChild(nextBtn);
      }
    }
  }

  // Quiz toggle
  document.querySelectorAll(".quiz-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      if (answer.style.display === "block") {
        answer.style.display = "none";
      } else {
        answer.style.display = "block";
      }
    });
  });
});
