const fs = require('fs');
const path = require('path');

function runTests() {
  console.log('🧪 Running AI Tools Database Tests...\n');

  const tests = [
    testDirectoryStructure,
    testSchemaExists,
    testCategoriesExist,
    testSampleData,
    testDataIntegrity
  ];

  let passed = 0;
  let failed = 0;

  tests.forEach(test => {
    try {
      const result = test();
      if (result) {
        console.log(`✅ ${test.name}`);
        passed++;
      } else {
        console.log(`❌ ${test.name}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}`);
      failed++;
    }
  });

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log('🎉 All tests passed!');
    return true;
  } else {
    console.log('❌ Some tests failed. Please fix the issues.');
    return false;
  }
}

function testDirectoryStructure() {
  const requiredDirs = [
    'data',
    'data/tools',
    'scripts',
    'docs',
    '.github',
    '.github/workflows',
    '.github/ISSUE_TEMPLATE'
  ];

  return requiredDirs.every(dir => {
    const exists = fs.existsSync(path.join(__dirname, '..', dir));
    if (!exists) {
      throw new Error(`Missing directory: ${dir}`);
    }
    return exists;
  });
}

function testSchemaExists() {
  const schemaPath = path.join(__dirname, '../data/schema.json');
  if (!fs.existsSync(schemaPath)) {
    throw new Error('Schema file not found');
  }

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  return schema.$schema && schema.type === 'object' && schema.properties;
}

function testCategoriesExist() {
  const categoriesPath = path.join(__dirname, '../data/categories.json');
  if (!fs.existsSync(categoriesPath)) {
    throw new Error('Categories file not found');
  }

  const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  return Array.isArray(categories) && categories.length > 0;
}

function testSampleData() {
  const toolsDir = path.join(__dirname, '../data/tools');
  const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    throw new Error('No tool files found');
  }

  // Test at least one file
  const sampleFile = path.join(toolsDir, files[0]);
  const tools = JSON.parse(fs.readFileSync(sampleFile, 'utf8'));

  return Array.isArray(tools) && tools.length > 0 && tools[0].id && tools[0].name;
}

function testDataIntegrity() {
  const toolsDir = path.join(__dirname, '../data/tools');
  const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(toolsDir, file);
    const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const tool of tools) {
      // Check required fields
      const required = ['id', 'name', 'description', 'category', 'pricing', 'link'];
      for (const field of required) {
        if (!tool[field]) {
          throw new Error(`Missing required field '${field}' in ${file} for tool ${tool.id || 'unknown'}`);
        }
      }

      // Check ID format
      if (!/^[a-z0-9-]+$/.test(tool.id)) {
        throw new Error(`Invalid ID format for tool ${tool.id} in ${file}`);
      }
    }
  }

  return true;
}

// Run tests if called directly
if (require.main === module) {
  const success = runTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runTests };