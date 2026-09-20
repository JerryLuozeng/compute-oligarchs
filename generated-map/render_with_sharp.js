const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const base = __dirname;
const raw = JSON.parse(fs.readFileSync(path.join(base, "azgaar_states_raw.json"), "utf8"));
const scale = 4;

function idColor(id) {
  return `#${(id & 255).toString(16).padStart(2, "0")}${((id >> 8) & 255).toString(16).padStart(2, "0")}${((id >> 16) & 255).toString(16).padStart(2, "0")}`;
}

function previewColor(id) {
  const palette = [
    "#7f8f77",
    "#b06f58",
    "#6686a8",
    "#9a8660",
    "#6fa17d",
    "#8a6f9d",
    "#a88570",
    "#789a9d",
  ];
  const emphasis = {
    4: "#9ab85d",
    6: "#b0524d",
    10: "#5f8fb7",
    16: "#a89055",
    22: "#6d9a72",
    28: "#866aa0",
  };
  return emphasis[id] || palette[(id - 1) % palette.length];
}

function escapeXml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;",
  })[char]);
}

function svg(kind) {
  const [minX, minY, width, height] = raw.viewBox;
  const background = kind === "id" ? "#000000" : "#354f7d";
  const paths = raw.paths.map((region, index) => {
    const id = index + 1;
    const fill = kind === "id" ? idColor(id) : previewColor(id);
    return `<path id="${escapeXml(region.id || `region_${id}`)}" d="${escapeXml(region.d)}" fill="${fill}" fill-rule="evenodd" stroke="none"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${width} ${height}" width="${width * scale}" height="${height * scale}"><rect x="${minX}" y="${minY}" width="${width}" height="${height}" fill="${background}"/>${paths}</svg>`;
}

async function render(kind, filename) {
  const source = svg(kind);
  fs.writeFileSync(path.join(base, filename.replace(/\.png$/, ".svg")), source, "utf8");
  await sharp(Buffer.from(source)).png().toFile(path.join(base, filename));
}

async function main() {
  await render("id", "azgaar_region_id_map_aa.png");
  await render("preview", "azgaar_region_preview.png");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
