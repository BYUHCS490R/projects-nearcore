```markdown
mini-notion — Notion-like prototype (HTML/CSS/JS) with AI integration example
================================================================================

What I built for you
- A single-page prototype (index.html, styles.css, app.js) that behaves like a tiny Notion:
  - Create pages and databases stored in the browser (localStorage).
  - Simple block editor (text, headings, todos).
  - Simple database (columns + rows) editor.
  - Sidebar for pages/DBs, search, create/delete.
  - An "Ask AI" box that sends a prompt + current page/db context to a backend endpoint (/api/ai).
- Example Node.js server (server.js + package.json) that proxies requests to OpenAI or Hugging Face. This protects API keys.

Notes & tradeoffs
- This is a frontend-first prototype meant to demonstrate the UI and data model.
- Data is stored in localStorage for simplicity. For production you'll want a real backend and database (Postgres, SQLite, or an object store).
- Directly calling OpenAI/Hugging Face from the browser would expose your API key — do not do this in production. Use a server-side proxy or serverless function.

How to run (quick)
1. Install Node (if you want AI integration and a simple static server).
2. Save files (index.html, styles.css, app.js, server.js, package.json, README.md) into a directory.
3. In that directory run:
   - npm install
   - Set an environment variable:
     - For OpenAI: OPENAI_API_KEY
     - Or for Hugging Face: HUGGINGFACE_API_KEY
   - Start the server:
     - node server.js
4. Open http://localhost:3000 in your browser.
5. Click items, create pages/databases, and use the "Ask AI" field. The client will POST to /api/ai, which relays to the configured provider.

Server (what it does)
- If OPENAI_API_KEY is present, it calls the OpenAI Chat Completions endpoint with your prompt + context.
- Otherwise, if HUGGINGFACE_API_KEY is present, it calls a Hugging Face text-generation endpoint.
- The server returns JSON: { text: "AI reply..." }.

Next steps you may want
- Replace localStorage with IndexedDB or a real backend and add user accounts.
- Add rich blocks (images, embeds, markdown import/export).
- Implement permissions, sharing, version history, and collaborative editing (WebSockets / CRDT).
- Improve AI features: page summarization, auto-tagging, smart database filters, content generation blocks.

If you'd like, I can:
- Expand the server to support streaming responses and show them live in the browser.
- Replace localStorage with a small Express + SQLite backend and add simple auth.
- Add a nicer WYSIWYG editor and block reordering.

```