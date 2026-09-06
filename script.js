/* =========================================================
   MOBILE MENU TOGGLE
========================================================= */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

/* =========================================================
   DARK / LIGHT MODE
========================================================= */
const darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeIcon.classList.toggle('bx-moon');
  darkModeIcon.classList.toggle('bx-sun');
});

/* =========================================================
   ACTIVE LINK ON SCROLL
========================================================= */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  /* Header shadow only after scrolling */
  const header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 0);
  sections.forEach(sec => {
    const top    = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector('.navbar a[href*=' + id + ']');
      if (active) active.classList.add('active');
    }
  });

  /* Close mobile menu when scrolling */
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
});

/* =========================================================
   SIMPLE TYPING EFFECT (no external library)
========================================================= */
const roles = ['Web Developer', 'AI Engineer', 'Applied AI Developer', 'Solutions Developer'];
const typeEl = document.querySelector('.typing-text');

let roleIndex = 0;
let charIndex = 0;
let deleting  = false;

function type() {
  const word = roles[roleIndex];
  typeEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, deleting ? 1400 : 300);
  }
}

type();

/* =========================================================
   PROJECTS SECTION RENDER & STACKING INTERACTION
   - Dynamic rendering from projects.json (with static fallback)
   - Code-editor styled cards with syntax highlighting
   - Color-coded status badges, animated progress bars, and latest changelog summaries
   - Sticky stacking offsets on scroll
========================================================= */
const fallbackProjects = [
  {
    "id": "portfolio-website",
    "title": "Portfolio Website & AI Assistant",
    "description": "Full-stack personal portfolio and conversational assistant architecture built with modern web technologies, containerisation, and API integration.",
    "category": "Web / Full-Stack",
    "tags": ["React", "Node.js", "Express", "Docker", "JavaScript", "CSS3"],
    "status": "in-progress",
    "currentPhase": 1,
    "totalPhases": 6,
    "progressPercent": 15,
    "repoUrl": "https://github.com/skikszilcho/portfolio-website",
    "liveUrl": "#",
    "changelog": [
      { "version": "0.1.0", "date": "2025-01", "notes": "Initial static site with animated SVG workspace, dark/light theme toggle, and responsive layout." },
      { "version": "0.2.0", "date": "2025-02", "notes": "Architecture planning, data schema design, and modular component specification." }
    ]
  },
  {
    "id": "local-ai",
    "title": "Local AI Environment",
    "description": "Privacy-focused local environment for running open-source large language models, inference workflows, and document retrieval locally without external cloud dependencies.",
    "category": "AI & Machine Learning",
    "tags": ["Python", "Local LLMs", "RAG", "Vector Search", "Docker"],
    "status": "in-progress",
    "currentPhase": 2,
    "totalPhases": 4,
    "progressPercent": 50,
    "repoUrl": "https://github.com/skikszilcho/local-AI",
    "liveUrl": "",
    "changelog": [
      { "version": "0.1.0", "date": "2025-01", "notes": "Initial containerised model deployment and runtime configuration." },
      { "version": "0.2.0", "date": "2025-02", "notes": "Integrated local document context indexing and conversational execution interface." }
    ]
  },
  {
    "id": "mise-en-place",
    "title": "Mise-en-Place",
    "description": "Smart recipe management and meal preparation platform designed to organise recipes, automate meal planning and prep schedules, and track grocery and ingredient inventory.",
    "category": "Web / Application",
    "tags": ["JavaScript", "React", "Tailwind CSS", "Database", "Full-Stack"],
    "status": "in-progress",
    "currentPhase": 1,
    "totalPhases": 4,
    "progressPercent": 25,
    "repoUrl": "https://github.com/skikszilcho/mise-en-place",
    "liveUrl": "",
    "changelog": [
      { "version": "0.1.0", "date": "2025-01", "notes": "System architecture, recipe data model design, and initial meal planning workflow specifications." }
    ]
  },
  {
    "id": "railway-crime-analytics",
    "title": "Geospatial Railway Transit Analytics",
    "description": "Exploratory data analysis, risk clustering, and interactive hotspot heatmaps to identify high-risk transit corridors and inform safety interventions.",
    "category": "Data & Analytics",
    "tags": ["Python", "Pandas", "Power BI", "GeoJSON", "EDA", "Data Visualisation"],
    "status": "completed",
    "currentPhase": 4,
    "totalPhases": 4,
    "progressPercent": 100,
    "repoUrl": "",
    "liveUrl": "",
    "changelog": [
      { "version": "1.0.0", "date": "2024-06", "notes": "Delivered interactive GeoJSON heatmap, automated data pipelines, and KPI dashboard for risk assessment." }
    ]
  },
  {
    "id": "chemical-process-simulation-optimization",
    "title": "Process Numerical Simulation & Optimisation",
    "description": "Computational modelling, discretization, and constrained non-linear optimization for complex engineering dynamic systems and process efficiency analysis.",
    "category": "Engineering / Simulation",
    "tags": ["Python", "NumPy", "SciPy", "Numerical Simulation", "Optimisation"],
    "status": "completed",
    "currentPhase": 3,
    "totalPhases": 3,
    "progressPercent": 100,
    "repoUrl": "",
    "liveUrl": "",
    "changelog": [
      { "version": "1.0.0", "date": "2024-11", "notes": "Implemented mathematical solvers and nonlinear optimization algorithms for continuous process modelling and parameter estimation." }
    ]
  }
];

function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projects.map((p, index) => {
    const formattedTags = p.tags.map(t => `<span class="syn-string">'${t}'</span>`).join(', ');
    const statusClass = p.status || 'in-progress';
    const statusLabel = statusClass === 'in-progress' ? 'In Progress' : (statusClass === 'completed' ? 'Completed' : 'Planned');
    const progressPercent = p.progressPercent || 0;
    const currentPhase = p.currentPhase || 0;
    const totalPhases = p.totalPhases || 1;

    let linksHtml = '';
    if (p.repoUrl) {
      linksHtml += `<a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" title="View Source Code"><i class="bx bxl-github"></i></a>`;
    }
    if (p.liveUrl && p.liveUrl !== '#') {
      linksHtml += `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" title="Live Preview"><i class="bx bx-link-external"></i></a>`;
    }

    const changelogLatest = p.changelog && p.changelog.length > 0
      ? p.changelog[p.changelog.length - 1]
      : null;

    return `
      <div class="project-card-wrapper" style="top: ${8 + index * 1.5}rem; z-index: ${index + 1};">
        <div class="project-card">
          <div class="card-header">
            <div class="card-dots">
              <span class="dot-red"></span>
              <span class="dot-yellow"></span>
              <span class="dot-green"></span>
            </div>
            <div class="card-header-title">${p.title}</div>
            <div class="card-header-actions">
              ${linksHtml}
            </div>
          </div>
          <div class="card-body">
            <div class="code-line">
              <span class="syn-keyword">const</span> <span class="syn-var">project</span> <span class="syn-accent">=</span> <span class="syn-bracket">{</span>
            </div>
            <div class="code-line code-indent">
              <span class="syn-prop">name</span><span class="syn-colon">:</span> <span class="syn-string">'${p.title}'</span><span class="syn-comma">,</span>
            </div>
            <div class="code-line code-indent">
              <span class="syn-prop">category</span><span class="syn-colon">:</span> <span class="syn-string">'${p.category}'</span><span class="syn-comma">,</span>
            </div>
            <div class="code-line code-indent">
              <span class="syn-prop">tools</span><span class="syn-colon">:</span> <span class="syn-bracket">[</span>${formattedTags}<span class="syn-bracket">]</span><span class="syn-comma">,</span>
            </div>
            <div class="code-line code-indent">
              <span class="syn-prop">description</span><span class="syn-colon">:</span> <span class="syn-desc">'${p.description}'</span><span class="syn-comma">,</span>
            </div>
            
            <div class="card-meta-bar">
              <div class="status-badge ${statusClass}">
                <span class="status-dot"></span>
                <span>${statusLabel}</span>
              </div>

              <div class="progress-container">
                <div class="progress-track">
                  <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                </div>
                <span class="progress-label">Phase ${currentPhase} of ${totalPhases} (${progressPercent}%)</span>
              </div>
            </div>

            ${changelogLatest ? `
            <div class="changelog-summary">
              <strong>Latest Update (${changelogLatest.version}):</strong> <span>${changelogLatest.notes}</span>
            </div>
            ` : ''}

            <div class="code-line" style="margin-top: .8rem;">
              <span class="syn-bracket">};</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Fetch projects from projects.json with fallback
fetch('projects.json')
  .then(res => {
    if (!res.ok) throw new Error('HTTP error ' + res.status);
    return res.json();
  })
  .then(data => renderProjects(data))
  .catch(() => renderProjects(fallbackProjects));
