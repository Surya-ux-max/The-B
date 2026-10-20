export const portfolioData = {
  personal: {
    name: "Tarunika B",
    role: "Full Stack Developer",
    status: "Available for Full Stack Engineering & Innovative Product Roles",
    badge: "Labs 2025 Edition",
    heroHeadline: "Be the first to experiment",
    heroSubheadline: "Building scalable distributed architectures, reactive interfaces, and experimental digital products at the edge of possibility.",
    sectionHeadline: "Discover our latest experiments and help shape the future.",
    bodyCopy: "Discover new ideas, experiment with emerging technologies, and explore what's possible.",
    email: "tarunika.dev@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    stats: [
      { value: "5+", label: "Years Engineering Experience" },
      { value: "40+", label: "Full Stack Systems Deployed" },
      { value: "99.98%", label: "Average Production Uptime" },
      { value: "10k+", label: "Active Platform Users" }
    ]
  },

  filterCategories: ["All", "Experiments", "Create", "Explore"],

  experiments: [
    {
      id: "edge-foresight",
      title: "Google AI Edge Foresight",
      category: "Experiments",
      accent: "#5B95F9",
      accentBg: "rgba(91, 149, 249, 0.12)",
      description: "Low-latency browser-based edge inference dashboard with real-time tensor visualization and predictive stream analysis.",
      techStack: ["React", "WebAssembly", "TensorFlow.js", "Tailwind CSS"],
      year: "2025",
      metrics: "12ms inference",
      status: "Live Prototype",
      github: "https://github.com",
      demoUrl: "#"
    },
    {
      id: "cloudscale-pipeline",
      title: "Distributed Event Orchestrator",
      category: "Create",
      accent: "#34A853",
      accentBg: "rgba(52, 168, 83, 0.12)",
      description: "High-throughput microservices event bus processing asynchronous jobs with guaranteed delivery and distributed tracing.",
      techStack: ["Node.js", "Go", "PostgreSQL", "Redis", "Docker"],
      year: "2024",
      metrics: "50k ops/sec",
      status: "Production Verified",
      github: "https://github.com",
      demoUrl: "#"
    },
    {
      id: "dynamic-canvas",
      title: "Collaborative Infinite Canvas",
      category: "Explore",
      accent: "#FFCE35",
      accentBg: "rgba(255, 206, 53, 0.18)",
      description: "Infinite collaborative workspace featuring real-time multi-cursor syncing, vector path smoothing, and tree-structured undo/redo.",
      techStack: ["TypeScript", "React", "WebSockets", "HTML5 Canvas"],
      year: "2024",
      metrics: "60 FPS rendering",
      status: "Interactive Lab",
      github: "https://github.com",
      demoUrl: "#"
    },
    {
      id: "omnisearch-vector",
      title: "OmniSearch Vector Engine",
      category: "Experiments",
      accent: "#5B95F9",
      accentBg: "rgba(91, 149, 249, 0.12)",
      description: "Hybrid semantic search platform combining sparse lexical scoring with dense vector cosine similarity for instant context retrieval.",
      techStack: ["Python", "FastAPI", "Next.js", "FAISS", "Docker"],
      year: "2024",
      metrics: "< 8ms query time",
      status: "Research Build",
      github: "https://github.com",
      demoUrl: "#"
    },
    {
      id: "prism-tokens",
      title: "Prism Multi-Platform Token System",
      category: "Create",
      accent: "#F6B4F0",
      accentBg: "rgba(246, 180, 240, 0.25)",
      description: "Automated design token engine generating synchronized type scales, color systems, and accessible contrast checks across Web and Mobile.",
      techStack: ["TypeScript", "Node CLI", "CSS Variables", "Figma API"],
      year: "2024",
      metrics: "100% WCAG AAA",
      status: "Developer Tool",
      github: "https://github.com",
      demoUrl: "#"
    },
    {
      id: "acoustic-synth",
      title: "Acoustic Neural Synthesizer",
      category: "Explore",
      accent: "#FFCE35",
      accentBg: "rgba(255, 206, 53, 0.18)",
      description: "Playful digital audio synthesizer mapping geometric drag coordinates to real-time harmonic FM synthesis and visual FFT spectra.",
      techStack: ["Web Audio API", "Canvas 2D", "React", "DSP Algorithms"],
      year: "2023",
      metrics: "Sub-5ms audio lag",
      status: "Interactive Sandbox",
      github: "https://github.com",
      demoUrl: "#"
    }
  ],

  stackCategories: [
    {
      name: "Frontend Engineering",
      color: "#5B95F9",
      skills: [
        { title: "React & Next.js", desc: "Component architecture, Server Components, SSR & Hydration" },
        { title: "TypeScript", desc: "Strict type modeling, robust interfaces, and generics" },
        { title: "Tailwind CSS & CSS Architecture", desc: "Tokenized systems, responsive fluid layouts, modern CSS" },
        { title: "State Management & Reactivity", desc: "Zustand, React Query, Redux Toolkit, Context API" }
      ]
    },
    {
      name: "Backend & Systems",
      color: "#34A853",
      skills: [
        { title: "Node.js & Express / NestJS", desc: "Modular RESTful & GraphQL microservices" },
        { title: "Python & FastAPI", desc: "High-performance async services, AI/ML pipeline orchestration" },
        { title: "Go (Golang)", desc: "Concurrent networking, CLI tools, lightweight daemon services" },
        { title: "API Security & Auth", desc: "JWT, OAuth2, RBAC access policies, rate-limiting" }
      ]
    },
    {
      name: "Databases & Infrastructure",
      color: "#FFCE35",
      skills: [
        { title: "PostgreSQL & Prisma / Drizzle", desc: "Relational modeling, indexing, ACID transactions, migrations" },
        { title: "MongoDB & NoSQL", desc: "Document storage, aggregation pipelines, schema flexibility" },
        { title: "Redis & In-Memory Caching", desc: "Pub/Sub queues, distributed session stores, rate limiters" },
        { title: "Docker & Cloud Deployment", desc: "Containerization, AWS (S3, EC2, Lambda), GCP, Edge Workers" }
      ]
    }
  ],

  principles: [
    {
      num: "01",
      title: "Reliability at the core",
      desc: "Rock-solid backend contracts, type safety, and resilient database schemas lay the groundwork for any great user interface.",
      accent: "#5B95F9"
    },
    {
      num: "02",
      title: "Tactile, responsive interfaces",
      desc: "Software should feel alive. Micro-interactions, spring mechanics, and instantaneous feedback respect user intuition.",
      accent: "#FFCE35"
    },
    {
      num: "03",
      title: "Curiosity-driven engineering",
      desc: "Every challenge is an opportunity to experiment, prototype hypotheses, and turn complex ideas into tangible digital tools.",
      accent: "#34A853"
    }
  ]
};
