import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const BIG_PROJECTS = [
  {
    id: "paperPilot",
    emoji: "📄",
    name: "PaperPilot",
    tagline: "Chat with ArXiv research papers",
    level: "⭐⭐⭐",
    time: "5–7 weeks",
    impact: "HIGH",
    accentColor: "#00b4d8",
    description:
      "An intelligent research assistant that ingests ArXiv papers by topic, builds a semantic knowledge base, lets you chat across multiple papers simultaneously, compare methodologies, and find contradictions. Weekly digest email feature.",
    whyItStands:
      "Solves a real pain every researcher has. Shows RAG mastery, evaluation discipline, and practical UX thinking. Easy to demo live. Gets real users organically.",
    stack: ["LangChain / LlamaIndex", "FAISS or Weaviate", "sentence-transformers", "FastAPI", "Streamlit / Gradio", "RAGAS (evaluation)", "Celery + Redis (digest)"],
    hfSpace: "Deploy a Gradio demo: enter any ArXiv topic → get an interactive chatbot over recent papers. Push the embedding model to HF Hub.",
    githubReadme: [
      "Problem statement with a screenshot of a real frustrating research workflow",
      "Architecture diagram (draw.io or Excalidraw)",
      "Chunking strategy comparison table (chunk size vs retrieval quality)",
      "RAGAS evaluation results in a table",
      "Live demo badge linking to HF Space",
      "Limitations section — shows maturity",
    ],
    blogPost: "Write: 'How I Built a RAG System That Actually Works: Lessons from PaperPilot'",
    todos: [
      "Set up project structure with cookiecutter or manually",
      "Implement ArXiv API ingestion + PDF parsing",
      "Experiment with 3 different chunking strategies, document results",
      "Build vector store with FAISS, test with Weaviate",
      "Build RAG chain with LangChain",
      "Add reranking with Cohere Rerank",
      "Evaluate with RAGAS — measure faithfulness + relevance",
      "Build Gradio UI and deploy to HF Spaces",
      "Write README with architecture diagram",
      "Write blog post on Medium/Substack",
    ],
  },
  {
    id: "domainFinetune",
    emoji: "🧠",
    name: "DomainMind",
    tagline: "Fine-tune a 7B LLM for a specific domain",
    level: "⭐⭐⭐⭐",
    time: "4–5 weeks",
    impact: "VERY HIGH",
    accentColor: "#ff6b6b",
    description:
      "Pick one domain: medical QA, legal clause extraction, financial report summarisation, or code review. Fine-tune Mistral-7B or Phi-3 using QLoRA on a curated dataset. Publish the adapter weights to HF Hub. Compare against GPT-4 baseline using structured evals.",
    whyItStands:
      "Fine-tuning + evaluation + HuggingFace publishing is exactly what AI engineers are hired to do. The benchmark comparison shows scientific rigour. Having a model on HF Hub is a concrete, permanent artifact anyone can use.",
    stack: ["HuggingFace Transformers", "PEFT + LoRA", "TRL (SFTTrainer)", "unsloth (faster training)", "bitsandbytes (4-bit quantisation)", "Weights & Biases", "Gradio"],
    hfSpace: "Publish the LoRA adapter to HF Hub under your username. Create a Gradio Space that loads the adapter and lets users test it vs the base model side-by-side.",
    githubReadme: [
      "Dataset curation methodology — how you collected and cleaned it",
      "Training config (LoRA rank, alpha, learning rate) as a YAML block",
      "Training loss curve (W&B screenshot or matplotlib)",
      "Evaluation table: your model vs base model vs GPT-4 on benchmark",
      "HuggingFace model card link",
      "Inference code snippet in README for immediate use",
    ],
    blogPost: "Write: 'Fine-Tuning Mistral-7B on [Domain] with QLoRA: A Complete Walkthrough'",
    todos: [
      "Choose domain and find a suitable open dataset (HF Datasets, Kaggle, or scrape)",
      "Clean and format dataset into instruction format (system/user/assistant)",
      "Set up Colab Pro or Vast.ai GPU environment",
      "Install unsloth + PEFT + TRL",
      "Run baseline inference on base model, record results",
      "Fine-tune with QLoRA, track with W&B",
      "Evaluate on held-out test set with structured metrics",
      "Compare against GPT-4 using OpenAI API on same test set",
      "Push adapter to HuggingFace Hub with a full model card",
      "Build Gradio Space: side-by-side base vs fine-tuned",
      "Write blog post documenting the entire process",
    ],
  },
  {
    id: "mlopsTemplate",
    emoji: "⚙️",
    name: "MLOps Blueprint",
    tagline: "Production-ready ML pipeline template",
    level: "⭐⭐⭐",
    time: "4–6 weeks",
    impact: "HIGH",
    accentColor: "#06d6a0",
    description:
      "Build and open-source a production ML project template: trains a model, tracks experiments with MLflow, serves via FastAPI, containerises with Docker, deploys to AWS/GCP with GitHub Actions CI/CD, and monitors with Prometheus + Grafana. Others can use it as a starter.",
    whyItStands:
      "Shows MLOps maturity. An open-source tool with real GitHub stars is worth 10 notebooks. Hiring managers at scale-ups love engineers who understand the full lifecycle. This is a tool, not just a project.",
    stack: ["MLflow", "FastAPI", "Docker + Docker Compose", "GitHub Actions", "AWS SageMaker / GCP Vertex AI", "Prometheus + Grafana", "DVC"],
    hfSpace: "N/A — deploy the API to a free-tier cloud service (Render, Railway, or AWS EC2 free tier) and link it from the README.",
    githubReadme: [
      "Animated GIF or screenshot of the full pipeline running",
      "Architecture diagram showing every component",
      "'Get started in 5 minutes' section with one-liner commands",
      "Folder structure explanation",
      "How to swap in your own model/dataset",
      "CI/CD pipeline status badge",
      "Monitoring dashboard screenshot",
    ],
    blogPost: "Write: 'The ML Project Structure I Wish I Had When I Started'",
    todos: [
      "Design the full project folder structure",
      "Build a simple baseline model (doesn't need to be fancy — focus is infra)",
      "Integrate MLflow experiment tracking",
      "Wrap model in FastAPI with /predict and /health endpoints",
      "Write Dockerfile and docker-compose.yml",
      "Set up GitHub Actions: lint → test → build → deploy",
      "Add Prometheus metrics to FastAPI",
      "Deploy to AWS EC2 or GCP Cloud Run",
      "Add DVC for data versioning",
      "Write comprehensive README with architecture diagram",
      "Publish template as a cookiecutter or GitHub template repo",
    ],
  },
  {
    id: "aiAgent",
    emoji: "🤖",
    name: "ResearchAgent",
    tagline: "Multi-step agent that researches and writes reports",
    level: "⭐⭐⭐⭐",
    time: "5–6 weeks",
    impact: "VERY HIGH",
    accentColor: "#f4a261",
    description:
      "An agentic system that takes a research question, autonomously searches the web, reads relevant pages, cross-references sources, detects contradictions, and produces a structured, cited report with confidence scores. Uses LangGraph for the orchestration.",
    whyItStands:
      "Agentic AI is the frontier in 2025–2026. This shows you understand tool use, planning, memory, and multi-step reasoning — not just calling an API. Very few junior/mid engineers can build this properly.",
    stack: ["LangGraph", "Tavily or Serper (web search API)", "BeautifulSoup / Playwright", "OpenAI / Anthropic API", "Pydantic (structured outputs)", "LangSmith (tracing)", "FastAPI + Streamlit"],
    hfSpace: "Deploy a Streamlit Space on HF: enter a research question, watch the agent work step-by-step in real time, get a formatted report with sources.",
    githubReadme: [
      "Agent architecture diagram showing nodes and edges in the graph",
      "Example inputs and outputs (screenshot of a generated report)",
      "LangSmith trace screenshot showing the agent's reasoning steps",
      "Evaluation: how do you measure report quality?",
      "Known failure modes and edge cases — shows engineering maturity",
      "Cost estimate per query",
    ],
    blogPost: "Write: 'Building a Research Agent with LangGraph: Architecture Decisions and Lessons'",
    todos: [
      "Design the agent graph: search → read → synthesise → verify → report",
      "Set up LangGraph state machine",
      "Integrate Tavily search tool",
      "Build web page reader tool with content extraction",
      "Add source cross-referencing logic",
      "Implement structured output with Pydantic",
      "Add LangSmith tracing for observability",
      "Build Streamlit UI with real-time step display",
      "Evaluate 20 queries manually, document failure patterns",
      "Deploy to HF Spaces",
      "Write blog post",
    ],
  },
  {
    id: "kaggleGold",
    emoji: "🏆",
    name: "Kaggle Competition Project",
    tagline: "Top 15% finish with full write-up",
    level: "⭐⭐",
    time: "3–4 weeks per competition",
    impact: "HIGH",
    accentColor: "#a8dadc",
    description:
      "Pick one active Kaggle competition in tabular data or NLP. Aim for Top 15%. The competition itself is less important than the full documented solution: EDA notebook, feature engineering write-up, ensemble strategy, and a post-competition analysis.",
    whyItStands:
      "A medal or Top 15% finish is a credential that is universally understood. The write-up turns it into a portfolio piece. It also shows you can work under constraints and deadlines.",
    stack: ["pandas", "numpy", "scikit-learn", "XGBoost + LightGBM + CatBoost", "optuna (hyperparameter tuning)", "SHAP (explainability)"],
    hfSpace: "Not applicable — publish the Kaggle notebook publicly and link it from GitHub.",
    githubReadme: [
      "Competition description and your problem framing",
      "EDA findings with key plots",
      "Feature engineering decisions and why",
      "Model selection process and ablation results table",
      "Final ensemble strategy",
      "Leaderboard screenshot",
      "What you'd do differently with more time",
    ],
    blogPost: "Write: '[Competition Name] — My Solution, Feature Engineering Tricks, and What I Learned'",
    todos: [
      "Pick a competition: prefer tabular or NLP over CV if new to Kaggle",
      "Spend first week ONLY on EDA — understand the data deeply",
      "Build a strong baseline with a single XGBoost model",
      "Iteratively add features, track each in a spreadsheet with CV scores",
      "Add LightGBM and CatBoost, build ensemble",
      "Use Optuna for hyperparameter tuning",
      "Add SHAP analysis to understand feature importance",
      "Document every experiment in a notebook with clear markdown cells",
      "Publish final solution notebook publicly on Kaggle",
      "Write blog post / competition discussion post",
    ],
  },
  {
    id: "evalFramework",
    emoji: "📊",
    name: "LLMEval Dashboard",
    tagline: "Open-source LLM evaluation & benchmarking tool",
    level: "⭐⭐⭐⭐",
    time: "4–5 weeks",
    impact: "VERY HIGH",
    accentColor: "#c77dff",
    description:
      "Build an open-source tool that lets users compare multiple LLMs (GPT-4o, Claude, Mistral, Llama) on custom datasets across custom metrics. Side-by-side output viewer, automatic scoring with an LLM judge, cost tracking, and exportable reports.",
    whyItStands:
      "Evaluation is the least-glamorous and most-needed skill in AI engineering right now. Building a tool that others use gives you open-source credibility AND demonstrates deep LLM understanding. This can realistically get GitHub stars.",
    stack: ["LiteLLM (multi-provider)", "Pydantic", "FastAPI", "React or Streamlit", "SQLite / PostgreSQL", "Plotly (charts)", "PromptFoo or build from scratch"],
    hfSpace: "Host a live demo with a pre-loaded dataset comparing 3 models on 50 prompts. Let users try their own prompts.",
    githubReadme: [
      "GIF demo of the side-by-side comparison UI",
      "Supported providers table",
      "Metrics explanation (LLM judge, ROUGE, BERTScore, etc.)",
      "Quick start in 3 commands",
      "Example output report (exported PDF or HTML)",
      "Cost tracking explanation",
    ],
    blogPost: "Write: 'Why LLM Evaluation is Broken and How I Built a Tool to Fix It'",
    todos: [
      "Design the data model: Experiments, Models, Prompts, Responses, Scores",
      "Integrate LiteLLM for multi-provider support",
      "Build prompt runner with async batching",
      "Implement LLM-as-judge scoring with structured output",
      "Add ROUGE and BERTScore for reference-based tasks",
      "Build side-by-side comparison UI",
      "Add cost tracking per model per run",
      "Export results to HTML report",
      "Deploy demo to HF Spaces or Render",
      "Submit to r/MachineLearning and Hacker News Show HN",
      "Write blog post",
    ],
  },
];

const PHASES = [
  {
    id: "p1",
    title: "Phase 1 — Foundation",
    weeks: "Weeks 1–6",
    color: "#e63946",
    items: [
      { id: "p1_1", text: "Read 'Fluent Python' Ch. 1–10, implement each concept" },
      { id: "p1_2", text: "Build a neural net from scratch in NumPy (no PyTorch)" },
      { id: "p1_3", text: "Watch Karpathy 'Zero to Hero' series — all episodes" },
      { id: "p1_4", text: "Rebuild the same net in PyTorch — compare" },
      { id: "p1_5", text: "Complete fast.ai Part 1 (Practical Deep Learning)" },
      { id: "p1_6", text: "Solve 30 LeetCode mediums in Python (focus on arrays, graphs, DP)" },
      { id: "p1_7", text: "Build and publish your first Python package to PyPI" },
      { id: "p1_8", text: "Enter one Kaggle tabular competition — aim for Top 30%" },
      { id: "p1_9", text: "Set up your GitHub profile README (pinned repos, bio, stats)" },
      { id: "p1_10", text: "Create your HuggingFace account and complete the profile" },
    ],
  },
  {
    id: "p2",
    title: "Phase 2 — LLM Engineering",
    weeks: "Weeks 7–16",
    color: "#f77f00",
    items: [
      { id: "p2_1", text: "Read Anthropic + OpenAI prompt engineering guides fully" },
      { id: "p2_2", text: "Build a simple chatbot with memory using OpenAI API" },
      { id: "p2_3", text: "Build PaperPilot (RAG system) — full project" },
      { id: "p2_4", text: "Add RAGAS evaluation to PaperPilot, document results" },
      { id: "p2_5", text: "Deploy PaperPilot to HuggingFace Spaces" },
      { id: "p2_6", text: "Start DomainMind: collect and clean your training dataset" },
      { id: "p2_7", text: "Fine-tune Mistral-7B with QLoRA on Colab Pro" },
      { id: "p2_8", text: "Push fine-tuned model to HuggingFace Hub with model card" },
      { id: "p2_9", text: "Build LangGraph agent (ResearchAgent project)" },
      { id: "p2_10", text: "Set up LangSmith tracing on all LLM projects" },
      { id: "p2_11", text: "Write 2 blog posts (one per major project)" },
      { id: "p2_12", text: "Complete DeepLearning.AI 'LangChain for LLM Application Dev'" },
    ],
  },
  {
    id: "p3",
    title: "Phase 3 — Production & MLOps",
    weeks: "Weeks 17–24",
    color: "#2a9d8f",
    items: [
      { id: "p3_1", text: "Read 'Designing ML Systems' by Chip Huyen (full book)" },
      { id: "p3_2", text: "Containerise one existing project with Docker" },
      { id: "p3_3", text: "Serve a model with FastAPI — add /predict, /health, /metrics" },
      { id: "p3_4", text: "Build the MLOps Blueprint template project" },
      { id: "p3_5", text: "Set up GitHub Actions CI/CD for a project" },
      { id: "p3_6", text: "Deploy a project to AWS EC2 or GCP Cloud Run" },
      { id: "p3_7", text: "Track experiments with MLflow (replace all print statements)" },
      { id: "p3_8", text: "Add DVC to manage data versions on one project" },
      { id: "p3_9", text: "Begin AWS Solutions Architect Associate course" },
      { id: "p3_10", text: "Build a basic Airflow DAG for a data pipeline" },
      { id: "p3_11", text: "Write blog post: 'From Notebook to Production in 5 Steps'" },
    ],
  },
  {
    id: "p4",
    title: "Phase 4 — Advanced & Eval",
    weeks: "Weeks 25–36",
    color: "#8338ec",
    items: [
      { id: "p4_1", text: "Build LLMEval Dashboard project" },
      { id: "p4_2", text: "Add SHAP explainability to one ML project" },
      { id: "p4_3", text: "Complete AWS ML Specialty certification" },
      { id: "p4_4", text: "Build and deploy multi-agent workflow with CrewAI or LangGraph" },
      { id: "p4_5", text: "Contribute a PR (even docs) to one major open-source AI repo" },
      { id: "p4_6", text: "Enter one more Kaggle competition — aim for Top 15%" },
      { id: "p4_7", text: "Present one project at a local AI meetup or conference" },
      { id: "p4_8", text: "Benchmark your fine-tuned model vs GPT-4 on 100 examples" },
      { id: "p4_9", text: "Study 10 ML system design problems (from Chip Huyen's site)" },
      { id: "p4_10", text: "Record a 5-minute walkthrough video of your best project" },
    ],
  },
  {
    id: "p5",
    title: "Phase 5 — Portfolio Polish",
    weeks: "Ongoing",
    color: "#3a86ff",
    items: [
      { id: "p5_1", text: "Pin 5 best repos on GitHub — all with complete READMEs" },
      { id: "p5_2", text: "Add demo GIFs to every repo README" },
      { id: "p5_3", text: "Write a professional bio and pin it on GitHub + LinkedIn + HF" },
      { id: "p5_4", text: "Publish 5+ blog posts total (Medium, Substack, or personal site)" },
      { id: "p5_5", text: "Get HuggingFace profile to 3+ public models/spaces" },
      { id: "p5_6", text: "Update CV with GitHub, HF, Kaggle, and blog links" },
      { id: "p5_7", text: "Get LinkedIn to 500+ connections with relevant network" },
      { id: "p5_8", text: "Apply to 5 jobs per week — don't wait until 'ready'" },
      { id: "p5_9", text: "Do 10 mock ML system design interviews (use Pramp or peers)" },
      { id: "p5_10", text: "Review and update all project READMEs every 3 months" },
    ],
  },
];

const RESOURCES = [
  {
    category: "Deep Learning",
    color: "#e63946",
    items: [
      { name: "Karpathy: Neural Networks Zero to Hero", url: "https://youtube.com/@AndrejKarpathy", type: "YouTube", free: true, priority: "Must" },
      { name: "fast.ai Practical Deep Learning", url: "https://course.fast.ai", type: "Course", free: true, priority: "Must" },
      { name: "Deep Learning Book (Goodfellow)", url: "https://deeplearningbook.org", type: "Book", free: true, priority: "Reference" },
      { name: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials", type: "Docs", free: true, priority: "Must" },
    ],
  },
  {
    category: "LLMs & GenAI",
    color: "#f77f00",
    items: [
      { name: "DeepLearning.AI Short Courses (LangChain, RAG, Agents)", url: "https://learn.deeplearning.ai", type: "Course", free: true, priority: "Must" },
      { name: "Anthropic Prompt Engineering Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", type: "Docs", free: true, priority: "Must" },
      { name: "HuggingFace NLP Course", url: "https://huggingface.co/learn/nlp-course", type: "Course", free: true, priority: "Must" },
      { name: "LangChain Academy (agents, RAG)", url: "https://academy.langchain.com", type: "Course", free: true, priority: "High" },
      { name: "Unsloth Fine-tuning Notebooks", url: "https://github.com/unslothai/unsloth", type: "GitHub", free: true, priority: "High" },
    ],
  },
  {
    category: "MLOps & Production",
    color: "#2a9d8f",
    items: [
      { name: "Designing ML Systems — Chip Huyen", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", type: "Book", free: false, priority: "Must" },
      { name: "MLflow Docs", url: "https://mlflow.org/docs/latest/index.html", type: "Docs", free: true, priority: "Must" },
      { name: "FastAPI Docs", url: "https://fastapi.tiangolo.com", type: "Docs", free: true, priority: "Must" },
      { name: "Full Stack Deep Learning (LLMOps focus)", url: "https://fullstackdeeplearning.com", type: "Course", free: true, priority: "High" },
      { name: "AWS ML Specialty Exam Guide", url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/", type: "Cert", free: false, priority: "High" },
    ],
  },
  {
    category: "Evaluation & Safety",
    color: "#8338ec",
    items: [
      { name: "RAGAS Docs (RAG evaluation)", url: "https://docs.ragas.io", type: "Docs", free: true, priority: "High" },
      { name: "LangSmith Docs (LLM observability)", url: "https://docs.smith.langchain.com", type: "Docs", free: true, priority: "High" },
      { name: "Anthropic's AI Safety Papers", url: "https://anthropic.com/research", type: "Papers", free: true, priority: "Medium" },
      { name: "SHAP Documentation", url: "https://shap.readthedocs.io", type: "Docs", free: true, priority: "Medium" },
    ],
  },
  {
    category: "System Design",
    color: "#3a86ff",
    items: [
      { name: "Chip Huyen ML Interviews (free chapter)", url: "https://huyenchip.com/ml-interviews-book/", type: "Book", free: true, priority: "Must" },
      { name: "ML System Design — Twitter/Meta posts by Chip Huyen", url: "https://huyenchip.com/blog/", type: "Blog", free: true, priority: "High" },
      { name: "Eugene Yan's Applied ML Blog", url: "https://eugeneyan.com", type: "Blog", free: true, priority: "High" },
    ],
  },
];

const DOC_TEMPLATE = [
  {
    section: "1. Problem Statement",
    icon: "🎯",
    content: "What real problem does this solve? Who has this problem? Why haven't they solved it already? Write 2–3 sentences as if explaining to a smart friend who doesn't know ML. Add a screenshot or image that shows the problem.",
    example: "\"Researchers spend hours manually skimming 20+ papers to answer a single question. PaperPilot lets them query across 500 papers in seconds and get cited, source-linked answers.\"",
  },
  {
    section: "2. Architecture Diagram",
    icon: "🗺️",
    content: "Draw the full system: data flow, components, APIs, databases. Use Excalidraw (free, web-based) or draw.io. Export as PNG and embed in README. Hiring managers look at this first.",
    example: "User → Gradio UI → FastAPI → LangChain RAG Chain → FAISS Vector DB ← ArXiv PDF Ingestion Pipeline",
  },
  {
    section: "3. Quick Start (≤5 commands)",
    icon: "⚡",
    content: "Anyone should be able to run your project in under 5 minutes. Docker preferred. Provide .env.example. Never hardcode secrets. Test your own README on a clean machine.",
    example: "git clone ... → cp .env.example .env → docker compose up → open localhost:8501",
  },
  {
    section: "4. Results / Benchmarks",
    icon: "📊",
    content: "Show numbers. Tables beat text. Compare to baselines. Show before/after. Use markdown tables. Include eval scores, accuracy, latency, cost if relevant.",
    example: "| Model | Faithfulness | Relevance | Latency | Cost/query | | Base | 0.61 | 0.72 | 1.2s | $0.003 | | + Rerank | 0.81 | 0.88 | 1.8s | $0.006 |",
  },
  {
    section: "5. Tech Stack Badge Row",
    icon: "🏷️",
    content: "Use shields.io badges at the top: Python version, license, HF Space link, CI status. These make your README look professional instantly and give quick metadata.",
    example: "![Python](https://img.shields.io/badge/python-3.11-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![HF Spaces](https://img.shields.io/badge/🤗-Spaces-orange)",
  },
  {
    section: "6. Limitations & Future Work",
    icon: "🔭",
    content: "This section shows engineering maturity. List 3–5 known limitations honestly. Then list 3 future improvements. Junior devs never include this — it immediately signals senior thinking.",
    example: "Limitations: Hallucinations on papers >2023 due to chunking cutoff. Future: Add hybrid BM25+dense search, multi-language support.",
  },
  {
    section: "7. Blog Post Link",
    icon: "✍️",
    content: "Every project must have a companion blog post. Link it prominently. The blog post explains your thinking, decisions, and lessons. The README is the map; the blog is the story.",
    example: "📝 Read the full write-up: 'How I Built PaperPilot — Lessons from RAG at Scale'",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const C = {
  bg: "#08080f",
  surface: "#0f0f1a",
  border: "#1a1a2e",
  text: "#dde1e7",
  muted: "#6b7280",
  amber: "#f59e0b",
};

export default function Planner() {
  const [tab, setTab] = useState("projects");
  const [openProject, setOpenProject] = useState(null);
  const [checked, setChecked] = useState({});
  const [openPhase, setOpenPhase] = useState("p1");

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const phaseProgress = (phase) => {
    const total = phase.items.length;
    const done = phase.items.filter((i) => checked[i.id]).length;
    return { done, total, pct: Math.round((done / total) * 100) };
  };

  const totalDone = Object.values(checked).filter(Boolean).length;
  const totalItems = PHASES.flatMap((p) => p.items).length;

  const tabs = [
    { id: "projects", label: "🚀 Big Projects" },
    { id: "todos", label: "✅ Todo Lists" },
    { id: "resources", label: "📚 Where to Learn" },
    { id: "docs", label: "📝 How to Document" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Mono', 'Fira Code', monospace", color: C.text, paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #0c0c20 0%, #08080f 100%)", borderBottom: `1px solid ${C.border}`, padding: "36px 20px 28px", textAlign: "center" }}>
        <div style={{ fontSize: 10, color: C.amber, letterSpacing: 5, marginBottom: 10, textTransform: "uppercase" }}>AI Engineering · Project Planner</div>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 800, margin: "0 0 10px", color: "#fff", letterSpacing: -1 }}>
          Your Build Queue
        </h1>
        <p style={{ color: C.muted, fontSize: 13, maxWidth: 520, margin: "0 auto 20px", lineHeight: 1.7 }}>
          6 outstanding projects · 5 learning phases · resources for every step · documentation templates
        </p>
        {/* Overall progress */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "#111120", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 18px" }}>
          <div style={{ fontSize: 12, color: C.muted }}>Overall Progress</div>
          <div style={{ width: 120, height: 6, background: "#222", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${Math.round((totalDone / totalItems) * 100)}%`, height: "100%", background: C.amber, borderRadius: 3, transition: "width 0.4s" }} />
          </div>
          <div style={{ fontSize: 13, color: C.amber, fontWeight: 700 }}>{totalDone}/{totalItems}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "20px 16px 0", flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "9px 18px", borderRadius: 6,
            border: tab === t.id ? `1px solid ${C.amber}` : `1px solid ${C.border}`,
            background: tab === t.id ? "#1a1500" : C.surface,
            color: tab === t.id ? C.amber : C.muted,
            cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700, transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 0" }}>

        {/* ══════════════ PROJECTS TAB ══════════════ */}
        {tab === "projects" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.8, margin: "0 0 8px" }}>
              These 6 projects are designed to cover every major skill, be deployable and demonstrable, and stand out on a CV. Tap any to expand the full plan.
            </p>
            {BIG_PROJECTS.map((p) => {
              const open = openProject === p.id;
              return (
                <div key={p.id} style={{ background: C.surface, border: `1px solid ${open ? p.accentColor : C.border}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s" }}>
                  <div onClick={() => setOpenProject(open ? null : p.id)} style={{ padding: "18px 20px", cursor: "pointer", display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{p.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>{p.name}</span>
                        <span style={{ background: p.accentColor + "22", color: p.accentColor, border: `1px solid ${p.accentColor}44`, fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>{p.impact}</span>
                        <span style={{ color: C.muted, fontSize: 12 }}>{p.level}</span>
                        <span style={{ color: C.muted, fontSize: 12 }}>· {p.time}</span>
                      </div>
                      <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>{p.tagline}</div>
                    </div>
                    <div style={{ color: C.muted, fontSize: 16, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s", flexShrink: 0 }}>▼</div>
                  </div>

                  {open && (
                    <div style={{ padding: "0 20px 22px", borderTop: `1px solid ${C.border}` }}>
                      <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.8, margin: "16px 0 14px" }}>{p.description}</p>

                      {/* Why it stands out */}
                      <div style={{ background: "#0a1a10", border: "1px solid #1a3a1a", borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: "#06d6a0", letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>⭐ Why This Stands Out</div>
                        <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{p.whyItStands}</p>
                      </div>

                      {/* Stack */}
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Tech Stack</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {p.stack.map((s) => (
                            <span key={s} style={{ background: "#141428", border: `1px solid #2a2a50`, color: "#a0c4ff", fontSize: 11, padding: "3px 10px", borderRadius: 4 }}>{s}</span>
                          ))}
                        </div>
                      </div>

                      {/* HF Space */}
                      <div style={{ background: "#140a1a", border: "1px solid #2a1a3a", borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: "#c77dff", letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>🤗 HuggingFace Space</div>
                        <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{p.hfSpace}</p>
                      </div>

                      {/* README checklist */}
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>README Must-Haves</div>
                        {p.githubReadme.map((r, i) => (
                          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, color: "#aaa", fontSize: 13, lineHeight: 1.6 }}>
                            <span style={{ color: p.accentColor, flexShrink: 0 }}>✓</span><span>{r}</span>
                          </div>
                        ))}
                      </div>

                      {/* Blog post idea */}
                      <div style={{ background: "#1a1400", border: `1px solid #3a2a00`, borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
                        <div style={{ fontSize: 11, color: C.amber, letterSpacing: 2, marginBottom: 4, textTransform: "uppercase" }}>✍️ Blog Post</div>
                        <p style={{ color: "#aaa", fontSize: 13, margin: 0 }}>{p.blogPost}</p>
                      </div>

                      {/* Todos */}
                      <div>
                        <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Step-by-Step Todos</div>
                        {p.todos.map((todo, i) => (
                          <div key={i} onClick={() => toggle(`${p.id}_${i}`)} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "7px 10px", borderRadius: 6, marginBottom: 4, cursor: "pointer", background: checked[`${p.id}_${i}`] ? "#0d1a0d" : "transparent", transition: "background 0.2s" }}>
                            <div style={{ width: 18, height: 18, border: `2px solid ${checked[`${p.id}_${i}`] ? "#06d6a0" : "#333"}`, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: checked[`${p.id}_${i}`] ? "#06d6a0" : "transparent", transition: "all 0.2s", marginTop: 1 }}>
                              {checked[`${p.id}_${i}`] && <span style={{ color: "#000", fontSize: 11, fontWeight: 900 }}>✓</span>}
                            </div>
                            <span style={{ color: checked[`${p.id}_${i}`] ? "#555" : "#aaa", fontSize: 13, lineHeight: 1.6, textDecoration: checked[`${p.id}_${i}`] ? "line-through" : "none" }}>{i + 1}. {todo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══════════════ TODOS TAB ══════════════ */}
        {tab === "todos" && (
          <div>
            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.8, margin: "0 0 16px" }}>
              Check off tasks as you complete them. Progress is saved for this session. Work through phases in order — each builds on the previous.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PHASES.map((phase) => {
                const { done, total, pct } = phaseProgress(phase);
                const open = openPhase === phase.id;
                return (
                  <div key={phase.id} style={{ background: C.surface, border: `1px solid ${open ? phase.color : C.border}`, borderRadius: 12, overflow: "hidden" }}>
                    <div onClick={() => setOpenPhase(open ? null : phase.id)} style={{ padding: "16px 20px", cursor: "pointer" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <span style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>{phase.title}</span>
                          <span style={{ marginLeft: 10, fontSize: 12, color: C.muted }}>{phase.weeks}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 12, color: phase.color, fontWeight: 700 }}>{done}/{total}</span>
                          <div style={{ width: 80, height: 5, background: "#222", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: phase.color, borderRadius: 3, transition: "width 0.4s" }} />
                          </div>
                          <div style={{ color: C.muted, fontSize: 14, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>▼</div>
                        </div>
                      </div>
                    </div>
                    {open && (
                      <div style={{ padding: "0 20px 16px", borderTop: `1px solid ${C.border}` }}>
                        {phase.items.map((item) => (
                          <div key={item.id} onClick={() => toggle(item.id)} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 10px", borderRadius: 6, marginTop: 6, cursor: "pointer", background: checked[item.id] ? "#0a1a0a" : "transparent", transition: "background 0.2s" }}>
                            <div style={{ width: 18, height: 18, border: `2px solid ${checked[item.id] ? phase.color : "#333"}`, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: checked[item.id] ? phase.color : "transparent", transition: "all 0.2s", marginTop: 1 }}>
                              {checked[item.id] && <span style={{ color: "#000", fontSize: 11, fontWeight: 900 }}>✓</span>}
                            </div>
                            <span style={{ color: checked[item.id] ? "#555" : "#aaa", fontSize: 13, lineHeight: 1.6, textDecoration: checked[item.id] ? "line-through" : "none" }}>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════ RESOURCES TAB ══════════════ */}
        {tab === "resources" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.8, margin: 0 }}>
              Curated resources — only the best, no filler. Most are free. Prioritised by impact.
            </p>
            {RESOURCES.map((cat) => (
              <div key={cat.category} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{cat.category}</span>
                </div>
                {cat.items.map((item, i) => (
                  <div key={i} style={{ padding: "12px 20px", borderBottom: i < cat.items.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 13, color: "#dde", fontWeight: 600, marginBottom: 2 }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{item.url}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <span style={{ background: "#1a1428", color: "#a0c4ff", fontSize: 10, padding: "2px 8px", borderRadius: 4, border: "1px solid #2a2a50" }}>{item.type}</span>
                      <span style={{ background: item.free ? "#0a1a0a" : "#1a0a0a", color: item.free ? "#06d6a0" : "#e63946", fontSize: 10, padding: "2px 8px", borderRadius: 4, border: `1px solid ${item.free ? "#1a3a1a" : "#3a1a1a"}` }}>{item.free ? "Free" : "Paid"}</span>
                      <span style={{ background: item.priority === "Must" ? "#1a1400" : "#111", color: item.priority === "Must" ? C.amber : C.muted, fontSize: 10, padding: "2px 8px", borderRadius: 4, border: `1px solid ${item.priority === "Must" ? "#3a2a00" : "#222"}`, fontWeight: item.priority === "Must" ? 700 : 400 }}>{item.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ══════════════ DOCS TAB ══════════════ */}
        {tab === "docs" && (
          <div>
            <div style={{ background: "#0a1a0a", border: "1px solid #1a3a1a", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#06d6a0", fontWeight: 700, marginBottom: 8 }}>The Golden Rule of Documentation</div>
              <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.8, margin: 0 }}>
                Write your README for a smart senior engineer who has never seen your project and has 90 seconds to decide if it's worth reading further. Every section must earn its place. If it doesn't help them understand faster — cut it.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DOC_TEMPLATE.map((section, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 22, flexShrink: 0 }}>{section.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 8 }}>{section.section}</div>
                      <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.7, margin: "0 0 10px" }}>{section.content}</p>
                      <div style={{ background: "#0d0d1e", border: "1px solid #2a2a4e", borderRadius: 6, padding: "10px 14px" }}>
                        <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginBottom: 4, textTransform: "uppercase" }}>Example</div>
                        <div style={{ color: "#a0c4ff", fontSize: 12, lineHeight: 1.7, fontStyle: "italic" }}>{section.example}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Commit hygiene */}
            <div style={{ marginTop: 20, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 14 }}>📦 Professional Commit Hygiene</div>
              {[
                { prefix: "feat:", desc: "A new feature — e.g. feat: add reranking to RAG pipeline" },
                { prefix: "fix:", desc: "A bug fix — e.g. fix: handle empty PDF pages in parser" },
                { prefix: "docs:", desc: "Documentation only — e.g. docs: add architecture diagram to README" },
                { prefix: "eval:", desc: "Evaluation changes — e.g. eval: add RAGAS faithfulness metric" },
                { prefix: "refactor:", desc: "Code change with no feature/fix — e.g. refactor: extract chunking logic" },
                { prefix: "chore:", desc: "Maintenance — e.g. chore: update dependencies, add .gitignore" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "7px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ color: C.amber, fontWeight: 700, fontSize: 12, minWidth: 80, flexShrink: 0 }}>{c.prefix}</span>
                  <span style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>{c.desc}</span>
                </div>
              ))}
              <p style={{ color: C.muted, fontSize: 12, marginTop: 12, lineHeight: 1.7 }}>
                Make small, frequent commits. Hiring managers read commit histories. One giant "initial commit" is a red flag.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
