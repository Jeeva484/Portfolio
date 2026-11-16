/**
 * Jeeva Sugin D - Professional Portfolio
 * Interactive Functionality & Live Simulator Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRecruiterLens();
  initProjectFilters();
  initSynapseSimulator();
  initStrokeSimulator();
  initModals();
  initContactForm();
  initCounters();
  initMobileMenu();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', activeTheme);
      localStorage.setItem('theme', activeTheme);
      updateThemeIcon(activeTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fas fa-sun text-yellow-400';
  } else {
    icon.className = 'fas fa-moon text-indigo-600';
  }
}

/* ==========================================================================
   2. Recruiter Lens Switcher (Tailoring Feature)
   ========================================================================== */
function initRecruiterLens() {
  const pills = document.querySelectorAll('.recruiter-pill');
  const banner = document.getElementById('recruiter-lens-msg');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const role = pill.getAttribute('data-role');
      applyRecruiterLens(role);
    });
  });

  function applyRecruiterLens(role) {
    // Reset all highlights
    document.querySelectorAll('.highlighted-for-role').forEach(el => {
      el.classList.remove('highlighted-for-role');
    });

    const synapseCard = document.getElementById('project-synapse');
    const strokeCard = document.getElementById('project-stroke');
    const weatherCard = document.getElementById('project-weather');
    const enterpriseCard = document.getElementById('project-enterprise');
    const pokedexCard = document.getElementById('project-pokedex');
    const invoicelyCard = document.getElementById('project-invoicely');

    const skillGenAI = document.getElementById('skills-genai');
    const skillWeb = document.getElementById('skills-web');
    const skillCloud = document.getElementById('skills-cloud');
    const skillSupport = document.getElementById('skills-support');
    const skillCore = document.getElementById('skills-core');

    if (role === 'software') {
      if (synapseCard) synapseCard.classList.add('highlighted-for-role');
      if (pokedexCard) pokedexCard.classList.add('highlighted-for-role');
      if (weatherCard) weatherCard.classList.add('highlighted-for-role');
      if (skillWeb) skillWeb.classList.add('highlighted-for-role');
      if (skillCore) skillCore.classList.add('highlighted-for-role');
      if (banner) {
        banner.innerHTML = `<span class="font-semibold text-indigo-400">⚡ Tailored for Software Engineer / Developer:</span> Highlighting React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, Microservices, Python, Java, MongoDB, and CI/CD.`;
        banner.classList.remove('hidden');
      }
    } else if (role === 'genai') {
      if (synapseCard) synapseCard.classList.add('highlighted-for-role');
      if (strokeCard) strokeCard.classList.add('highlighted-for-role');
      if (skillGenAI) skillGenAI.classList.add('highlighted-for-role');
      if (banner) {
        banner.innerHTML = `<span class="font-semibold text-cyan-400">✨ Tailored for AI/ML & Generative AI Engineer:</span> Highlighting RAG pipeline, Qdrant vector search, LangChain agents, OpenAI GPT, TensorFlow, CNN, and IEEE published research.`;
        banner.classList.remove('hidden');
      }
    } else if (role === 'support') {
      if (invoicelyCard) invoicelyCard.classList.add('highlighted-for-role');
      if (skillSupport) skillSupport.classList.add('highlighted-for-role');
      if (skillCloud) skillCloud.classList.add('highlighted-for-role');
      if (banner) {
        banner.innerHTML = `<span class="font-semibold text-emerald-400">🛠️ Tailored for Application Support, Technical Support & System Engineer:</span> Highlighting Linux systems, Grafana observability, Postman API debugging, error reproduction, and Go backend diagnostics.`;
        banner.classList.remove('hidden');
      }
    } else if (role === 'get') {
      if (enterpriseCard) enterpriseCard.classList.add('highlighted-for-role');
      if (synapseCard) synapseCard.classList.add('highlighted-for-role');
      if (skillCore) skillCore.classList.add('highlighted-for-role');
      if (skillCloud) skillCloud.classList.add('highlighted-for-role');
      if (banner) {
        banner.innerHTML = `<span class="font-semibold text-amber-400">🎓 Tailored for Graduate Engineer Trainee (GET):</span> Highlighting JEE Advanced & Main qualification, Java Full Stack (Wipro TalentNext), AWS Cloud, Core CS (DSA, OOP, OS, Networks), and Agile SDLC.`;
        banner.classList.remove('hidden');
      }
    } else {
      if (banner) banner.classList.add('hidden');
    }
  }
}

/* ==========================================================================
   3. Project Filters
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white');
        b.classList.add('bg-slate-800/60', 'text-slate-300');
      });
      btn.classList.remove('bg-slate-800/60', 'text-slate-300');
      btn.classList.add('bg-indigo-600', 'text-white');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. SynapseAI Live RAG Simulator
   ========================================================================== */
function initSynapseSimulator() {
  const sendBtn = document.getElementById('synapse-sim-send');
  const promptInput = document.getElementById('synapse-sim-input');
  const promptPills = document.querySelectorAll('.synapse-preset');
  const chatOutput = document.getElementById('synapse-chat-box');
  const statusEl = document.getElementById('synapse-status-indicator');

  const cannedKnowledge = {
    "architecture": {
      query: "How does SynapseAI handle document ingestion & vector search?",
      contextChunk: "Document Parsing -> Text Chunking (500 tokens, 50 overlap) -> OpenAI text-embedding-3-small -> Upsert to Qdrant Vector DB with collection metadata -> HNSW Indexing.",
      answer: "SynapseAI utilizes an asynchronous FastAPI backend to chunk uploaded PDFs, embed vectors via OpenAI embeddings, and index them in Qdrant Vector DB using Cosine Similarity. Query retrieval uses semantic similarity filters to guarantee sub-second grounded responses.",
      citations: ["source: architecture_spec.pdf (Page 4)", "collection: enterprise_docs_v1"],
      similarity: "0.942"
    },
    "hallucination": {
      query: "How do you prevent AI hallucinations in SynapseAI?",
      contextChunk: "Strict temperature: 0.1, RAG system prompt with enforced context boundaries and direct citation provenance checks.",
      answer: "We enforce strict context bounding in the LangChain orchestrator. If the cosine similarity score in Qdrant falls below 0.78, the model explicitly responds with 'Information not found in provided documents' rather than hallucinating answers.",
      citations: ["source: evaluation_benchmarks.md (Sec 2.1)"],
      similarity: "0.918"
    },
    "techstack": {
      query: "Why did you choose FastAPI and Qdrant over traditional stacks?",
      contextChunk: "FastAPI async event loop + Pydantic validation delivers <15ms API overhead. Qdrant delivers native vector payload filtering and Rust-backed throughput.",
      answer: "FastAPI was chosen for its native asynchronous capabilities and automatic OpenAPI validation. Qdrant was selected for its high-performance Rust core, in-memory payload filtering, and seamless Docker container deployment.",
      citations: ["source: tech_stack_decision_log.pdf"],
      similarity: "0.965"
    }
  };

  promptPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const type = pill.getAttribute('data-query-type');
      if (cannedKnowledge[type]) {
        executeSynapseQuery(cannedKnowledge[type]);
      }
    });
  });

  if (sendBtn && promptInput) {
    sendBtn.addEventListener('click', () => {
      const val = promptInput.value.trim();
      if (!val) return;
      executeSynapseQuery({
        query: val,
        contextChunk: `Retrieved semantic chunk from enterprise vector space matching '${val}'...`,
        answer: `SynapseAI synthesized this context-aware response based on the uploaded repository docs: Verified facts matching '${val}'. Vector similarity search confirmed 100% citation grounding with 0.1 temperature.`,
        citations: ["source: uploaded_corpus_knowledge.pdf", "vector_id: #qd-9482"],
        similarity: "0.894"
      });
      promptInput.value = '';
    });
  }

  function executeSynapseQuery(data) {
    if (!chatOutput) return;

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble-user p-3 rounded-lg text-sm max-w-[85%] self-end ml-auto mb-3';
    userMsg.innerHTML = `<span class="text-xs text-indigo-300 font-semibold block mb-1"><i class="fas fa-user mr-1"></i>You:</span> ${data.query}`;
    chatOutput.appendChild(userMsg);
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Show indexing/retrieval status
    if (statusEl) {
      statusEl.innerHTML = `<span class="inline-flex items-center text-xs text-cyan-400 font-mono"><i class="fas fa-spinner fa-spin mr-2"></i> Querying Qdrant Vector DB & verifying citations...</span>`;
    }

    // Simulate vector search latency
    setTimeout(() => {
      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-bubble-ai p-3 rounded-lg text-sm max-w-[90%] mb-3 border border-slate-700';
      aiMsg.innerHTML = `
        <div class="flex items-center justify-between text-xs text-cyan-400 font-semibold mb-2">
          <span><i class="fas fa-robot mr-1"></i> SynapseAI Assistant</span>
          <span class="text-emerald-400 font-mono text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            Cosine Match: ${data.similarity}
          </span>
        </div>
        <p class="text-slate-200 text-sm leading-relaxed mb-3">${data.answer}</p>
        <div class="bg-slate-900/80 p-2 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
          <div class="text-indigo-300 font-semibold mb-1"><i class="fas fa-quote-left mr-1"></i> Grounded Evidence:</div>
          <p class="italic text-slate-300 mb-1">"${data.contextChunk}"</p>
          <div class="text-slate-500 text-[10px]">Citations: ${data.citations.join(' • ')}</div>
        </div>
      `;
      chatOutput.appendChild(aiMsg);
      chatOutput.scrollTop = chatOutput.scrollHeight;

      if (statusEl) {
        statusEl.innerHTML = `<span class="inline-flex items-center text-xs text-emerald-400 font-mono"><i class="fas fa-check-circle mr-1"></i> Grounded response generated in 184ms</span>`;
      }
    }, 600);
  }
}

/* ==========================================================================
   5. Hemorrhagic Stroke CT Scanner Simulator
   ========================================================================== */
function initStrokeSimulator() {
  const btnScanA = document.getElementById('stroke-scan-a');
  const btnScanB = document.getElementById('stroke-scan-b');
  const ctVisual = document.getElementById('ct-scan-canvas');
  const resultStatus = document.getElementById('stroke-result-status');
  const confValue = document.getElementById('stroke-confidence-val');
  const latencyValue = document.getElementById('stroke-latency-val');
  const bbox = document.getElementById('ct-bounding-box-el');

  if (btnScanA) {
    btnScanA.addEventListener('click', () => {
      runInference(true);
    });
  }

  if (btnScanB) {
    btnScanB.addEventListener('click', () => {
      runInference(false);
    });
  }

  function runInference(hasStroke) {
    if (!resultStatus) return;

    resultStatus.innerHTML = `<span class="text-yellow-400"><i class="fas fa-circle-notch fa-spin mr-1"></i> Preprocessing CT slices (OpenCV skull-stripping & CNN forward pass)...</span>`;
    if (bbox) bbox.classList.add('hidden');

    setTimeout(() => {
      if (hasStroke) {
        resultStatus.innerHTML = `<span class="text-rose-400 font-bold"><i class="fas fa-exclamation-triangle mr-1"></i> Hemorrhagic Stroke Detected</span>`;
        if (confValue) confValue.innerText = "98.7%";
        if (confValue) confValue.className = "text-rose-400 font-bold text-lg";
        if (latencyValue) latencyValue.innerText = "138 ms (Flask/Render)";
        if (bbox) {
          bbox.classList.remove('hidden');
          bbox.style.top = '38%';
          bbox.style.left = '45%';
          bbox.style.width = '70px';
          bbox.style.height = '60px';
        }
      } else {
        resultStatus.innerHTML = `<span class="text-emerald-400 font-bold"><i class="fas fa-check-circle mr-1"></i> Normal Cranial Scan (No Hemorrhage)</span>`;
        if (confValue) confValue.innerText = "99.2% Negative";
        if (confValue) confValue.className = "text-emerald-400 font-bold text-lg";
        if (latencyValue) latencyValue.innerText = "124 ms (Flask/Render)";
        if (bbox) bbox.classList.add('hidden');
      }
    }, 450);
  }
}

/* ==========================================================================
   6. Case Study Modals
   ========================================================================== */
const modalData = {
  synapse: {
    title: "SynapseAI — Enterprise RAG AI Assistant",
    subtitle: "Full-Stack Generative AI with Next.js, FastAPI, Qdrant & Docker",
    content: `
      <div class="space-y-4 text-slate-300">
        <div>
          <h4 class="text-white font-semibold mb-1">Architecture & Pipeline</h4>
          <p class="text-sm leading-relaxed">
            SynapseAI combines a responsive <strong>Next.js 14 + TypeScript</strong> frontend with an asynchronous <strong>FastAPI</strong> backend. Documents uploaded by users are processed through an intelligent parsing pipeline that extracts text, partitions content into semantic chunks, and creates 1536-dimensional embeddings.
          </p>
        </div>
        <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300">
          User Query ➔ Next.js Client ➔ FastAPI Gateway ➔ Qdrant Vector DB (HNSW Index) ➔ Filtered Chunks ➔ LangChain Orchestrator ➔ OpenAI GPT-4o ➔ Grounded Answer with Citations
        </div>
        <div>
          <h4 class="text-white font-semibold mb-1">Engineering Challenges Solved</h4>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li><strong>Mitigating Hallucinations:</strong> Strict cosine cutoff score (0.78) and context isolation.</li>
            <li><strong>Multi-Tenant Isolation:</strong> PostgreSQL metadata filtering ensuring users only query authorized files.</li>
            <li><strong>Containerization:</strong> Dockerized backend environment for uniform production deployment on Vercel and Render.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-1">Key Performance Metrics</h4>
          <div class="grid grid-cols-3 gap-3 text-center pt-2">
            <div class="bg-slate-800/80 p-2 rounded border border-slate-700">
              <div class="text-cyan-400 font-bold text-lg">&lt; 250ms</div>
              <div class="text-[11px] text-slate-400">Vector Retrieval</div>
            </div>
            <div class="bg-slate-800/80 p-2 rounded border border-slate-700">
              <div class="text-emerald-400 font-bold text-lg">100%</div>
              <div class="text-[11px] text-slate-400">Source Grounding</div>
            </div>
            <div class="bg-slate-800/80 p-2 rounded border border-slate-700">
              <div class="text-indigo-400 font-bold text-lg">1536</div>
              <div class="text-[11px] text-slate-400">Embedding Dims</div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  stroke: {
    title: "Hemorrhagic Stroke Detection via Deep Learning",
    subtitle: "IEEE Published Research Paper (ICGCCT 2026)",
    content: `
      <div class="space-y-4 text-slate-300">
        <div>
          <h4 class="text-white font-semibold mb-1">Clinical Motivation & Methodology</h4>
          <p class="text-sm leading-relaxed">
            Hemorrhagic strokes require immediate intervention. This project implements a custom Deep Convolutional Neural Network (CNN) trained on cranial CT scans to identify early acute intracranial bleeding with high clinical sensitivity.
          </p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-1">Data Pipeline & Preprocessing</h4>
          <p class="text-sm leading-relaxed">
            CT slices were filtered using OpenCV for skull-stripping, contrast-limited adaptive histogram equalization (CLAHE) for artifact reduction, and normalization to enhance brain tissue density differentiation.
          </p>
        </div>
        <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
          <div class="text-emerald-400 font-semibold mb-1"><i class="fas fa-file-contract mr-1"></i> Publication Reference:</div>
          <p class="text-slate-300 font-mono text-[11px]">
            "Hemorrhagic Stroke Prediction Using Deep Learning Algorithm" — Presented and published at the IEEE International Conference on Green Computing for Communication Technologies (ICGCCT 2026), March 2026.
          </p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-1">Deployment</h4>
          <p class="text-sm leading-relaxed">
            Exported the optimized TensorFlow model and built a lightweight Flask microservice deployed on Render, allowing doctors to upload DICOM/PNG slices and receive real-time classification with visual localization.
          </p>
        </div>
      </div>
    `
  },
  weather: {
    title: "Climate Intelligence & Weather App",
    subtitle: "Clean Frontend Engineering with OpenWeather API & Vercel",
    content: `
      <div class="space-y-4 text-slate-300">
        <div>
          <h4 class="text-white font-semibold mb-1">Overview</h4>
          <p class="text-sm leading-relaxed">
            A performant, responsive single-page climate web application that provides real-time meteorological forecasts, atmospheric pressure, air quality, and wind telemetry.
          </p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-1">Technical Highlights</h4>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li>Debounced search input reducing API call overhead by over 60%.</li>
            <li>Client-side caching using localStorage for frequently requested metropolitan regions.</li>
            <li>Dynamic CSS weather backdrop changing in response to UV and atmospheric conditions.</li>
          </ul>
        </div>
      </div>
    `
  },
  resume: {
    title: "Jeeva Sugin D — Professional Resume Summary",
    subtitle: "B.Tech Information Technology (2022–2026) • Seeking Roles in Chennai & Bangalore",
    content: `
      <div class="space-y-4 text-slate-300 text-sm">
        <div class="border-b border-slate-800 pb-3">
          <div class="font-semibold text-white">Target Roles & Locations:</div>
          <p class="text-cyan-400 font-medium">Software Engineer • AI/ML & GenAI Engineer • Application / Technical Support • GET • System Engineer</p>
          <p class="text-slate-400 text-xs mt-1">Preferred Hubs: <strong>Chennai & Bangalore (Bengaluru)</strong> (Open to Relocate / Immediate)</p>
        </div>
        <div class="border-b border-slate-800 pb-3">
          <div class="font-semibold text-white">Key Skills & Arsenal:</div>
          <p class="text-slate-300 text-xs leading-relaxed">
            <strong>Web & Full Stack:</strong> JavaScript, TypeScript, React.js, Next.js, Node.js, Express.js, HTML5, CSS3, REST APIs, Microservices.<br>
            <strong>AI & ML:</strong> Generative AI, LLMs, LangChain, RAG, OpenAI GPT, Vector Search (Qdrant), TensorFlow, CNN, OpenCV.<br>
            <strong>Cloud & Systems:</strong> AWS, Azure, Docker, CI/CD, GitHub Actions, Linux, Grafana, Postman, Git/GitHub.<br>
            <strong>Core CS & Data:</strong> Python, Java (OOP), Go, DSA, MongoDB, PostgreSQL, SQL/DBMS, Agile, Problem Solving, Debugging.
          </p>
        </div>
        <div class="border-b border-slate-800 pb-3">
          <div class="font-semibold text-white">Contact Information:</div>
          <p class="text-slate-400">Phone: +91 9345531316 | Email: jeevasugin@gmail.com | LinkedIn: Jeeva Sugin D | GitHub: Jeeva484</p>
        </div>
        <div class="border-b border-slate-800 pb-3">
          <div class="font-semibold text-white">Education:</div>
          <p><strong>Sona College of Technology</strong> (2022 – 2026) — B.Tech IT, CGPA: 7.58</p>
          <p class="text-xs text-slate-400">Fathima Matric Higher Secondary School (HSC: 70%, SSLC: 88%)</p>
        </div>
        <div class="border-b border-slate-800 pb-3">
          <div class="font-semibold text-white">Notable Honors:</div>
          <p>• Published IEEE Conference Paper on Hemorrhagic Stroke Prediction (ICGCCT 2026)</p>
          <p>• Cleared competitive national-level exams: JEE Main and JEE Advanced</p>
        </div>
        <div>
          <div class="font-semibold text-white">Certifications:</div>
          <p>• AWS Academy Graduate - Cloud Foundations</p>
          <p>• Java Full Stack Development - TalentNext Wipro</p>
          <p>• Introduction to Internet of Things - NPTEL</p>
        </div>
      </div>
    `
  }
};

function initModals() {
  const modalOverlay = document.getElementById('case-study-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = btn.getAttribute('data-modal');
      const data = modalData[modalKey];
      if (data && modalOverlay) {
        modalTitle.innerText = data.title;
        modalSubtitle.innerText = data.subtitle;
        modalBody.innerHTML = data.content;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   7. Contact Form & Clipboard Toast
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('jeevasugin@gmail.com').then(() => {
        showToast('Email (jeevasugin@gmail.com) copied to clipboard!');
      }).catch(() => {
        showToast('Direct email: jeevasugin@gmail.com');
      });
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      const mailtoLink = `mailto:jeevasugin@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
      
      window.location.href = mailtoLink;
      showToast('Opening your default mail client with prefilled message...');
    });
  }
}

function showToast(msg) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   8. Animated Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    if (!target) return;
    let count = 0;
    const speed = 20;
    const step = Math.ceil(target / 40);

    const update = () => {
      count += step;
      if (count < target) {
        counter.innerText = count;
        setTimeout(update, speed);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}

/* ==========================================================================
   9. Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
}
