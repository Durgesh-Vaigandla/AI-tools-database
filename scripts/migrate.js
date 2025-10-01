const fs = require('fs');
const path = require('path');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function migrateCSVToJSON(csvPath, outputDir) {
  console.log('🔄 Starting CSV to JSON migration...\n');

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    return false;
  }

  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.trim().split('\n');

  if (lines.length < 2) {
    console.error('❌ CSV file must have at least a header row and one data row');
    return false;
  }

  const headers = parseCSVLine(lines[0]);
  console.log(`📋 Found ${headers.length} columns:`, headers.join(', '));

  const tools = [];
  const categoryMap = {};

  // Process each data row
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    if (values.length !== headers.length) {
      console.warn(`⚠️  Row ${i + 1}: Expected ${headers.length} columns, got ${values.length}`);
      continue;
    }

    // Create tool object
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index] ? values[index].trim().replace(/^"|"$/g, '') : '';
    });

    // Convert to new format
    const tool = {
      id: obj.name ? obj.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') : `tool-${i}`,
      name: obj.name || '',
      description: obj.description || '',
      category: obj.category ? obj.category.toLowerCase().replace(/\s+/g, '-') : 'general',
      pricing: obj.pricing || 'Free',
      link: obj.link || '',
      tags: obj.tags ? obj.tags.split(',').map(tag => tag.trim()) : [],
      featured: obj.featured?.toLowerCase() === 'yes' || obj.featured?.toLowerCase() === 'true',
      popular: obj.popular?.toLowerCase() === 'yes' || obj.popular?.toLowerCase() === 'true',
      new: obj.new?.toLowerCase() === 'yes' || obj.new?.toLowerCase() === 'true',
      rating: parseFloat(obj.rating) || 0,
      submittedBy: 'durgesh-vaigandla',
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      verificationStatus: 'verified'
    };

    tools.push(tool);

    // Group by category
    if (!categoryMap[tool.category]) {
      categoryMap[tool.category] = [];
    }
    categoryMap[tool.category].push(tool);
  }

  console.log(`\n📊 Migration Summary:`);
  console.log(`   Total tools migrated: ${tools.length}`);
  console.log(`   Categories found: ${Object.keys(categoryMap).length}`);

  // Create category files
  Object.entries(categoryMap).forEach(([category, categoryTools]) => {
    const filePath = path.join(outputDir, `${category}.json`);
    fs.writeFileSync(filePath, JSON.stringify(categoryTools, null, 2));
    console.log(`   ✅ ${category}: ${categoryTools.length} tools`);
  });

  // Update main tools.json
  const mainToolsData = {
    lastUpdated: new Date().toISOString(),
    version: "1.0.0",
    totalTools: tools.length,
    categories: Object.keys(categoryMap),
    tools: tools
  };

  fs.writeFileSync(path.join(path.dirname(outputDir), 'tools.json'), JSON.stringify(mainToolsData, null, 2));

  console.log('\n🎉 Migration completed successfully!');
  return true;
}

// CLI usage
if (require.main === module) {
  const csvPath = process.argv[2] || '../../data/ai-tools.csv';
  const outputDir = process.argv[3] || './data/tools';

  const absoluteCsvPath = path.resolve(csvPath);
  const absoluteOutputDir = path.resolve(outputDir);

  console.log(`📁 Source CSV: ${absoluteCsvPath}`);
  console.log(`📁 Output directory: ${absoluteOutputDir}\n`);

  // Ensure output directory exists
  if (!fs.existsSync(absoluteOutputDir)) {
    fs.mkdirSync(absoluteOutputDir, { recursive: true });
  }

  const success = migrateCSVToJSON(absoluteCsvPath, absoluteOutputDir);
  process.exit(success ? 0 : 1);
}

module.exports = { migrateCSVToJSON };