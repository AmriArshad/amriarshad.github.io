// Random IT quote on the home page, pulled from awesome-it-quotes and rendered as text only.
const el = document.getElementById("random-quote");
const SOURCE = "https://raw.githubusercontent.com/victorlaerte/awesome-it-quotes/refs/heads/master/README.md";

function parse(markdown) {
  const quotes = [];
  for (const line of markdown.split("\n")) {
    if (!line.startsWith("|") || !line.includes('"')) continue;
    if (line.includes("Quote") || line.includes(":-:")) continue;
    const parts = line.split("|");
    if (parts.length < 3) continue;

    const authorPart = parts[2].trim();
    let author = "Unknown";
    const bracket = authorPart.match(/\[([^\]]+)\]/);
    const br = authorPart.match(/<br>\s*([^(<]+)/);
    if (bracket) author = bracket[1];
    else if (br) author = br[1].trim();
    author = author.replace(/^!\[/, "").replace(/\].*$/, "");

    // Only the first quote in a cell; tidy <br> and strip quote marks and stray spaces at the ends,
    // since the page adds its own curly quotes.
    const text = parts[1].trim().split("<br><br>")[0]
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/^[\s“”"]+|[\s“”"]+$/g, "");
    if (text.length > 20 && text.length < 220) quotes.push({ text, author });
  }
  return quotes;
}

async function show() {
  try {
    const res = await fetch(SOURCE);
    const quotes = parse(await res.text());
    if (!quotes.length) return;
    const q = quotes[Math.floor(Math.random() * quotes.length)];

    const blockquote = document.createElement("blockquote");
    const p = document.createElement("p");
    p.textContent = q.text;
    const footer = document.createElement("footer");
    const source = document.createElement("a");
    source.href = "https://github.com/victorlaerte/awesome-it-quotes";
    source.rel = "noopener";
    source.textContent = "source";
    footer.append(`— ${q.author} · `, source);
    blockquote.append(p, footer);
    el.replaceChildren(blockquote);
  } catch (err) {
    console.error("Error fetching quote:", err);
  }
}

if (el) show();
