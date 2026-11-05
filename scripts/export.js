const fs = require('fs');
const path = require('path');

function exportDatabase() {
  console.log('📦 Exporting AI Tools Database to CSV and Markdown Directory...\n');

  const toolsPath = path.join(__dirname, '../data/tools.json');
  const categoriesPath = path.join(__dirname, '../data/categories.json');
  const csvPath = path.join(__dirname, '../data/tools.csv');
  const dirMdPath = path.join(__dirname, '../DIRECTORY.md');

  if (!fs.existsSync(toolsPath)) {
    throw new Error('data/tools.json not found. Run npm run aggregate first.');
  }

  const { tools, lastUpdated, totalTools } = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
  const categories = fs.existsSync(categoriesPath)
    ? JSON.parse(fs.readFileSync(categoriesPath, 'utf8'))
    : [];

  // 1. Export CSV
  const csvHeaders = ['id', 'name', 'category', 'pricing', 'rating', 'featured', 'popular', 'new', 'link', 'tags', 'description'];
  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = Array.isArray(val) ? val.join(';') : String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const csvRows = [csvHeaders.join(',')];
  tools.forEach(tool => {
    const row = [
      escapeCsv(tool.id),
      escapeCsv(tool.name),
      escapeCsv(tool.category),
      escapeCsv(tool.pricing),
      escapeCsv(tool.rating || ''),
      escapeCsv(tool.featured ? 'true' : 'false'),
      escapeCsv(tool.popular ? 'true' : 'false'),
      escapeCsv(tool.new ? 'true' : 'false'),
      escapeCsv(tool.link),
      escapeCsv(tool.tags || []),
      escapeCsv(tool.description)
    ];
    csvRows.push(row.join(','));
  });

  const csvContent = csvRows.join('\n') + '\n';
  fs.writeFileSync(csvPath, csvContent);

  const webCsvPath = path.join(__dirname, '../web/tools.csv');
  const docsCsvPath = path.join(__dirname, '../docs/tools.csv');
  fs.writeFileSync(webCsvPath, csvContent);
  if (fs.existsSync(path.join(__dirname, '../docs'))) {
    fs.writeFileSync(docsCsvPath, csvContent);
  }

  console.log(`✅ CSV exported: ${csvPath} (${tools.length} rows)`);

  // 2. Export DIRECTORY.md (Awesome-style catalog)
  const categoryMap = {};
  categories.forEach(c => { categoryMap[c.id] = c.name; });

  const grouped = {};
  tools.forEach(tool => {
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push(tool);
  });

  const mdLines = [
    '# 📚 Complete AI Tools Directory',
    '',
    `> Curated catalog of **${totalTools} tools** across **${Object.keys(grouped).length} categories**.`,
    `> Last updated: ${new Date(lastUpdated).toDateString()}`,
    '',
    '## 🧭 Category Navigation',
    ''
  ];

  Object.keys(grouped).sort().forEach(cat => {
    const name = categoryMap[cat] || cat.toUpperCase();
    mdLines.push(`- [${name} (${grouped[cat].length})](#${cat})`);
  });

  mdLines.push('', '---', '');

  Object.keys(grouped).sort().forEach(cat => {
    const name = categoryMap[cat] || cat.toUpperCase();
    const catTools = grouped[cat];
    mdLines.push(`## <a id="${cat}"></a>📂 ${name} (${catTools.length} tools)`, '');
    mdLines.push('| Tool | Pricing | Rating | Tags | Description |');
    mdLines.push('| :--- | :---: | :---: | :--- | :--- |');

    catTools.forEach(tool => {
      const toolLink = `[**${tool.name}**](${tool.link})`;
      const badges = [];
      if (tool.featured) badges.push('⭐');
      if (tool.new) badges.push('🆕');
      const nameWithBadge = badges.length ? `${toolLink} ${badges.join(' ')}` : toolLink;
      const rating = tool.rating ? `★ ${tool.rating}` : '-';
      const tags = (tool.tags || []).slice(0, 3).map(t => `\`${t}\``).join(' ');
      const desc = (tool.description || '').replace(/\|/g, '\\|');

      mdLines.push(`| ${nameWithBadge} | \`${tool.pricing}\` | ${rating} | ${tags} | ${desc} |`);
    });

    mdLines.push('', '[⬆ Back to Top](#-category-navigation)', '');
  });

  fs.writeFileSync(dirMdPath, mdLines.join('\n') + '\n');
  console.log(`✅ Directory Markdown exported: ${dirMdPath}`);
}

if (require.main === module) {
  exportDatabase();
}

module.exports = { exportDatabase };
