

## Plan: Add `/guia-gmn` page and navigation elements

### 1. Create `src/pages/GuiaGmn.tsx`
Since the provided HTML is a complete standalone page with its own styles, scripts, and structure that must be preserved exactly, the approach is to render it inside a React component using `dangerouslySetInnerHTML`. The component will:
- Load the external scripts (QRious library) via `useEffect`
- Load the Google Fonts via a `<link>` tag
- Inject all the HTML content (body inner HTML) and CSS via `dangerouslySetInnerHTML`
- Execute the inline `<script>` logic after mount using `useEffect`
- The page will be fully self-contained, not using the site's layout/header

### 2. Update `src/App.tsx`
Add a new route: `<Route path="/guia-gmn" element={<GuiaGmn />} />`

### 3. Update `src/pages/Home.tsx` — Navigation button
Add a "Comprar Produto" button in the header nav (line ~51-64), styled with a distinct color (gold/amber), linking to `/guia-gmn` using React Router's `Link`.

### 4. Update `src/pages/Home.tsx` — Hero banner
Add a promotional banner/card below the hero subtitle (around line ~93), with text "Novo: Guia Google Meu Negócio para Corretores — R$ 67" and a "Comprar agora →" button linking to `/guia-gmn`. Styled with a gradient background to stand out.

### Technical notes
- The GuiaGmn page HTML contains inline scripts that manipulate the DOM directly. These will be executed via `useEffect` after the HTML is injected with `dangerouslySetInnerHTML`.
- The external QRious library (`<script src="https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js">`) will be loaded dynamically.
- The page's CSS uses `:root` variables scoped within the component wrapper to avoid conflicts with the main site styles.

