const fs = require('fs');
const path = require('path');

function formatCategoryName(categoryId) {
  return categoryId
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function buildCategoriesTable(stats) {
  const categoriesPath = path.join(__dirname, '../../data/categories.json');

  if (!fs.existsSync(categoriesPath)) {
    return null;
  }

  const categoryDefs = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  if (!Array.isArray(categoryDefs)) {
    return null;
  }

  const lines = [
    '## 📋 Categories',
    '',
    '| Category | Description | Tools Count |',
    '|----------|-------------|-------------|'
  ];

  categoryDefs.forEach(category => {
    const id = category.id;
    const name = category.name || formatCategoryName(id);
    const description = (category.description || '').replace(/\|/g, '\\|');
    const count = stats.categories[id] || 0;

    lines.push(`| **${name}** | ${description} | ${count} |`);
  });

  return `${lines.join('\n')}\n`;
}

function updateReadmeStats(stats) {
  const readmePath = path.join(__dirname, '../../README.md');

  if (!fs.existsSync(readmePath)) {
    return;
  }

  let readme = fs.readFileSync(readmePath, 'utf8');

  // Keep top-level total tools count visibly in sync.
  readme = readme.replace(
    /^- \*\*Total Tools\*\*:.*$/m,
    `- **Total Tools**: ${stats.totalTools}`
  );

  // Keep the summary count in sync with generated stats.
  readme = readme.replace(
    /- \*\*Categories\*\*: \d+/,
    `- **Categories**: ${stats.totalCategories}`
  );

  // Keep the LinkedIn example snapshot aligned with current dataset size.
  readme = readme.replace(
    /• \d+\+ AI tools across \d+ categories/,
    `• ${stats.totalTools}+ AI tools across ${stats.totalCategories} categories`
  );

  // Dynamic badge should reference totalCategories, not categories.length on an object.
  readme = readme.replace(
    /query=categories\.length&label=Categories/,
    'query=totalCategories&label=Categories'
  );

  const categoriesSection = buildCategoriesTable(stats);
  if (categoriesSection) {
    readme = readme.replace(
      /## 📋 Categories[\s\S]*?## 🤝 Contributing/,
      `${categoriesSection}\n## 🤝 Contributing`
    );
  }

  fs.writeFileSync(readmePath, readme);
}

function updateWebStats(stats) {
  const webDir = path.join(__dirname, '../../web');
  const webStatsPath = path.join(webDir, 'stats.json');
  const toolsSourcePath = path.join(__dirname, '../../data/tools.json');
  const webToolsPath = path.join(webDir, 'tools.json');

  if (!fs.existsSync(webDir)) {
    return;
  }

  fs.writeFileSync(webStatsPath, JSON.stringify(stats, null, 2));

  if (fs.existsSync(toolsSourcePath)) {
    const toolsData = fs.readFileSync(toolsSourcePath, 'utf8');
    fs.writeFileSync(webToolsPath, toolsData);
  }

  // Mirror deployable site files into docs/ for fixed-folder GitHub Pages setups.
  const docsDir = path.join(__dirname, '../../docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const filesToMirror = [
    '.nojekyll',
    'index.html',
    'script.js',
    'robots.txt',
    'sitemap.xml',
    'stats.json',
    'tools.json',
    'tools.csv',
    'llms.txt'
  ];

  filesToMirror.forEach(fileName => {
    const source = path.join(webDir, fileName);
    const target = path.join(docsDir, fileName);

    if (fs.existsSync(source)) {
      fs.copyFileSync(source, target);
    }
  });
}

module.exports = { updateReadmeStats, updateWebStats };
