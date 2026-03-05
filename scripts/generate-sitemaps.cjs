const fs = require("fs");
const path = require("path");

const baseUrl = "https://www.avhstore.in";
const dataPath = path.join(process.cwd(), "src", "data.js");
const dataText = fs.readFileSync(dataPath, "utf8");
const now = new Date().toISOString();

const ids = [...dataText.matchAll(/\bid\s*:\s*(\d+)\s*,/g)]
  .map((m) => m[1])
  .filter(Boolean);

const productIds = [...new Set(ids)].sort((a, b) => Number(a) - Number(b));

const staticRoutes = [
  "/",
  "/shopall",
  "/collections",
  "/categories",
  "/cart",
  "/wishlist",
  "/search",
  "/contact",
  "/ourstory",
  "/shipping",
  "/privacypolicy",
  "/retunpolicy",
  "/terms",
  "/terms-of-service",
  "/size-guide",
];

const toUrlset = (urls) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const mainUrls = staticRoutes.map((route) => ({
  loc: `${baseUrl}${route}`,
  lastmod: now,
  changefreq: route === "/" || route === "/shopall" ? "daily" : "weekly",
  priority: route === "/" ? "1.0" : route === "/shopall" ? "0.9" : "0.7",
}));

const productUrls = productIds.map((id) => ({
  loc: `${baseUrl}/product/${id}`,
  lastmod: now,
  changefreq: "weekly",
  priority: "0.8",
}));

const outDir = path.join(process.cwd(), "public");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, "sitemap-main.xml"), toUrlset(mainUrls));
fs.writeFileSync(path.join(outDir, "sitemap-products.xml"), toUrlset(productUrls));

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-products.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>
`;

fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemapIndex);
fs.writeFileSync(
  path.join(outDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`
);

console.log(`Generated static sitemap files with ${productIds.length} product URLs.`);
