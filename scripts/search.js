#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function searchCLI() {
  const toolsPath = path.join(__dirname, '../data/tools.json');
  if (!fs.existsSync(toolsPath)) {
    console.error('❌ data/tools.json not found. Run npm run aggregate first.');
    process.exit(1);
  }

  const { tools } = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
🔍 AI Tools CLI Search

Usage:
  npm run search -- "<query>" [options]
  node scripts/search.js "<query>" [options]

Options:
  --category=<cat>   Filter by category (e.g. development, video, audio)
  --pricing=<tier>   Filter by pricing (Free, Freemium, Paid, Subscription)
  --featured         Show only featured tools
  --popular          Show only popular tools
  --new              Show only newly added tools
  --limit=<number>   Max results to return (default: 15)

Examples:
  npm run search -- "agent"
  npm run search -- "code" --pricing=Free
  npm run search -- --category=development --featured
`);
    process.exit(0);
  }

  let query = '';
  let categoryFilter = null;
  let pricingFilter = null;
  let featuredOnly = false;
  let popularOnly = false;
  let newOnly = false;
  let limit = 15;

  args.forEach(arg => {
    if (arg.startsWith('--category=')) {
      categoryFilter = arg.split('=')[1].toLowerCase().trim();
    } else if (arg.startsWith('--pricing=')) {
      pricingFilter = arg.split('=')[1].toLowerCase().trim();
    } else if (arg.startsWith('--limit=')) {
      limit = parseInt(arg.split('=')[1], 10) || 15;
    } else if (arg === '--featured') {
      featuredOnly = true;
    } else if (arg === '--popular') {
      popularOnly = true;
    } else if (arg === '--new') {
      newOnly = true;
    } else if (!arg.startsWith('--')) {
      query = arg.toLowerCase().trim();
    }
  });

  const matches = tools.filter(tool => {
    if (categoryFilter && tool.category.toLowerCase() !== categoryFilter) return false;
    if (pricingFilter && tool.pricing.toLowerCase() !== pricingFilter) return false;
    if (featuredOnly && !tool.featured) return false;
    if (popularOnly && !tool.popular) return false;
    if (newOnly && !tool.new) return false;

    if (!query) return true;

    const inName = tool.name.toLowerCase().includes(query);
    const inDesc = (tool.description || '').toLowerCase().includes(query);
    const inTags = (tool.tags || []).some(t => t.toLowerCase().includes(query));
    const inId = tool.id.toLowerCase().includes(query);

    return inName || inDesc || inTags || inId;
  });

  console.log(`\n🔎 Found ${matches.length} matching AI tool${matches.length === 1 ? '' : 's'}:\n`);

  matches.slice(0, limit).forEach((tool, i) => {
    const badges = [];
    if (tool.featured) badges.push('⭐ Featured');
    if (tool.new) badges.push('🆕 New');
    const badgeStr = badges.length ? ` [${badges.join(' | ')}]` : '';
    const ratingStr = tool.rating ? ` ★ ${tool.rating}` : '';

    console.log(`${(i + 1).toString().padStart(2, ' ')}. \x1b[1m${tool.name}\x1b[0m (${tool.category}) - \x1b[32m${tool.pricing}\x1b[0m${ratingStr}${badgeStr}`);
    console.log(`    🔗 ${tool.link}`);
    console.log(`    📝 ${tool.description}`);
    if (tool.tags && tool.tags.length) {
      console.log(`    🏷️  ${tool.tags.join(', ')}`);
    }
    console.log('');
  });

  if (matches.length > limit) {
    console.log(`... and ${matches.length - limit} more. Use --limit=${matches.length} to view all.`);
  }
}

if (require.main === module) {
  searchCLI();
}

