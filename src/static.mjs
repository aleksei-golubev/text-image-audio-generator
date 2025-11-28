import fs from "fs";
import path from "path";

const baseDir = "./output";
const template = fs.readFileSync("./src/template.html", "utf-8");

const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const dir of dirs) {
  const folder = path.join(baseDir, dir);
  const outFile = path.join(folder, "index.html");

  // Читаем файлы
  const title = fs.readFileSync(path.join(folder, "title.txt"), "utf-8").trim();
  const titleTranslation = fs.readFileSync(path.join(folder, "title-translation.txt"), "utf-8").trim();

  let text = fs.readFileSync(path.join(folder, "text.txt"), "utf-8").trim();
  let textTranslation = fs.readFileSync(path.join(folder, "text-translation.txt"), "utf-8").trim();

  // Сохраняем абзацы
  const wrapParagraphs = (content) => {
    return content
      .split(/\n\s*\n/)           // разбиваем на абзацы по пустым строкам
      .map(p => `<p>${p.trim()}</p>`) // оборачиваем каждый абзац в <p>
      .join('\n');
  };

  text = wrapParagraphs(text);
  textTranslation = wrapParagraphs(textTranslation);

  // Подставляем в шаблон
  const html = template
    .replaceAll("{{TITLE}}", title)
    .replace("{{TITLE_TRANSLATION}}", titleTranslation)
    .replace("{{TEXT}}", text)
    .replace("{{TEXT_TRANSLATION}}", textTranslation);

  fs.writeFileSync(outFile, html, "utf-8");
  console.log(`✅ Generated: ${outFile}`);
}

// -----------------------------
// Генерация index.html со ссылками на все тексты
const listItems = dirs.map(dir => {
  const titlePath = path.join(baseDir, dir, "title.txt");
  let title = dir; // default: use directory name
  
  try {
    if (fs.existsSync(titlePath)) {
      title = fs.readFileSync(titlePath, "utf-8").trim();
    }
  } catch (err) {
    console.warn(`⚠️ Could not read title from ${titlePath}`);
  }
  
  return `<li><a href="${dir}/index.html">${title}</a></li>`;
}).join('\n');

const indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>All Texts</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 2rem auto; line-height: 1.6; }
    h1 { text-align: center; margin-bottom: 2rem; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.5rem 0; }
    a { text-decoration: none; color: #0077ff; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>All Texts</h1>
  <ul>
    ${listItems}
  </ul>
</body>
</html>
`;

fs.writeFileSync(path.join(baseDir, "index.html"), indexContent, "utf-8");
console.log(`✅ Generated index.html in ${baseDir}`);
