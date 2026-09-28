# AI Architecture Studio 🚀

> A high-performance, server-driven interactive dashboard that generates structured technical architecture plans, code examples, and performance metrics in real-time powered by **Google Gemini 1.5 Flash AI** and **Next.js 15 (App Router)**.

![AI Architecture Studio Banner](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.png)

---

## 🌟 Key Features

- ⚡ **Next.js 15 App Router & React 19:** Built with modern server/client component boundaries for optimal rendering performance.
- 🤖 **Structured AI Responses:** Integrates `@google/genai` enforcing structured JSON outputs (`responseMimeType: "application/json"`).
- 🛡️ **Type-Safe End-to-End:** Built with TypeScript in strict mode for resilient props and API payloads.
- 🎨 **Modern Dark Mode UI:** Styled using Tailwind CSS v4 and `lucide-react` icons.
- 🔐 **Secure Proxy Route Handler:** Uses Next.js API Routes (`/api/analyze`) to protect environment variables from client-side exposure.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (`strict: true`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Provider:** [Google Gemini API](https://aistudio.google.com/) (`gemini-1.5-flash`)
- **Icons & Utils:** `lucide-react`, `clsx`, `tailwind-merge`
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js 18+ installed on your machine.

- [Node.js Downloads](https://nodejs.org/)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/ai-architecture-studio.git
cd ai-architecture-studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> Get a free API Key at [Google AI Studio](https://aistudio.google.com/).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Architecture

```text
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts         # Secure Server API Proxy for Gemini AI
│   ├── globals.css              # Tailwind Base & Global CSS
│   ├── layout.tsx               # Root Server Layout
│   └── page.tsx                 # Main Interactive Dashboard Page
├── components/
│   ├── PromptForm.tsx           # Client Component (Interactive User Form)
│   └── ResultDashboard.tsx      # Client Component (Data Visualization)
├── lib/
│   ├── gemini.ts                # Google GenAI SDK Client Initialization
│   └── utils.ts                 # Classname Merging Utilities (cn)
└── types/
    └── index.ts                 # TypeScript Interfaces and Domain Models
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).