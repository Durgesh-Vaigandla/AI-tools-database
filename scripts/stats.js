const fs = require('fs');
const path = require('path');

function generateStats() {
  const toolsDir = path.join(__dirname, '../data/tools');
  const statsFile = path.join(__dirname, '../data/stats.json');

  // Get all tool files
  const toolFiles = fs.readdirSync(toolsDir)
    .filter(file => file.endsWith('.json'));

  let totalTools = 0;
  const categories = {};
  const pricing = {};
  let featured = 0;
  let popular = 0;
  let newTools = 0;

  console.log('📊 Generating AI Tools Database Statistics...\n');

  // Process each category file
  toolFiles.forEach(file => {
    const category = file.replace('.json', '');
    const filePath = path.join(toolsDir, file);

    try {
      const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const categoryCount = tools.length;
      categories[category] = categoryCount;
      totalTools += categoryCount;

      console.log(`📂 Processing ${category}.json (${categoryCount} tools)`);

      // Count pricing types and flags
      tools.forEach(tool => {
        // Pricing
        const priceType = tool.pricing || 'Unknown';
        pricing[priceType] = (pricing[priceType] || 0) + 1;

        // Flags
        if (tool.featured) featured++;
        if (tool.popular) popular++;
        if (tool.new) newTools++;
      });

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  });

  // Create stats object
  const stats = {
    lastUpdated: new Date().toISOString(),
    totalTools,
    categories,
    featured,
    popular,
    new: newTools,
    pricing
  };

  // Write stats to file
  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
  console.log(`\n✅ Stats updated: ${totalTools} total tools`);
  console.log(`   Categories: ${Object.keys(categories).length}`);
  console.log(`   Featured: ${featured}, Popular: ${popular}, New: ${newTools}`);
  console.log(`   Pricing types: ${Object.keys(pricing).join(', ')}`);

  return stats;
}

// Run stats generation if called directly
if (require.main === module) {
  generateStats();
}

module.exports = { generateStats };