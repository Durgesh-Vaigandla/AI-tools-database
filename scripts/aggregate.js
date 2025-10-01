const fs = require('fs');
const path = require('path');

function aggregateTools() {
  const toolsDir = path.join(__dirname, '../data/tools');
  const mainToolsPath = path.join(__dirname, '../data/tools.json');

  console.log('📊 Aggregating all AI tools data...\n');

  // Get all category files
  const categoryFiles = fs.readdirSync(toolsDir)
    .filter(file => file.endsWith('.json'));

  let allTools = [];
  let categories = [];
  let totalTools = 0;

  // Read each category file and aggregate tools
  categoryFiles.forEach(file => {
    const category = file.replace('.json', '');
    const filePath = path.join(toolsDir, file);

    try {
      const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`📂 Processing ${category}.json: ${tools.length} tools`);

      // Add category info to each tool
      const toolsWithCategory = tools.map(tool => ({
        ...tool,
        category: category
      }));

      allTools = allTools.concat(toolsWithCategory);
      categories.push({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
        count: tools.length
      });

      totalTools += tools.length;

    } catch (error) {
      console.error(`❌ Error reading ${file}:`, error.message);
    }
  });

  // Sort all tools by name
  allTools.sort((a, b) => a.name.localeCompare(b.name));

  // Create main data structure
  const mainData = {
    lastUpdated: new Date().toISOString(),
    version: "1.0.0",
    totalTools: totalTools,
    categories: categories,
    tools: allTools
  };

  // Write to main tools.json
  fs.writeFileSync(mainToolsPath, JSON.stringify(mainData, null, 2));

  console.log(`\n✅ Aggregation complete:`);
  console.log(`   Total tools: ${totalTools}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   File updated: data/tools.json`);

  return mainData;
}

// Run aggregation if called directly
if (require.main === module) {
  aggregateTools();
}

module.exports = { aggregateTools };