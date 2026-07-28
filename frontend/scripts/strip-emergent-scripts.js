// Post-build step for Netlify (and any other non-Emergent production
// deploy). Strips the Emergent platform bootstrap script and the
// Emergent-owned PostHog analytics snippet out of the built
// build/index.html. These are only meaningful while the app is being
// iterated on inside the Emergent editor/preview, so the checked-in
// public/index.html keeps them (they are needed there), and this
// script removes them from the static bundle that actually ships.
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "..", "build", "index.html");

if (!fs.existsSync(indexPath)) {
  console.warn("[strip-emergent] build/index.html not found, skipping.");
  process.exit(0);
}

let html = fs.readFileSync(indexPath, "utf8");
const before = html.length;

// 1. Emergent platform bootstrap script tag, e.g.
//    <script src="https://assets.emergent.sh/scripts/emergent-main.js"></script>
html = html.replace(
  /\s*<script[^>]*src="https:\/\/assets\.emergent\.sh\/[^"]*"[^>]*><\/script>/g,
  ""
);

// 2. Emergent's own PostHog analytics init block (identified by its
//    ap.emergent.sh api host, which is Emergent's telemetry, not ours).
html = html.replace(
  /\s*<script>(?:[^<]|<(?!\/script>))*ap\.emergent\.sh(?:[^<]|<(?!\/script>))*<\/script>/g,
  ""
);

if (html.length !== before) {
  fs.writeFileSync(indexPath, html);
  console.log("[strip-emergent] Removed Emergent-specific scripts from build/index.html");
} else {
  console.log("[strip-emergent] No Emergent-specific scripts found, nothing to strip.");
}
