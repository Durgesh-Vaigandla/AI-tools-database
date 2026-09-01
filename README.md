# 🤖 AI Tools Database

[![Validate Data](https://github.com/Durgesh-Vaigandla/ai-tools-database/actions/workflows/validate.yml/badge.svg)](https://github.com/Durgesh-Vaigandla/ai-tools-database/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A community-driven, open-source database of AI tools for developers, designers, creators, and businesses. Powered by the community, maintained with ❤️.

## 📊 Live Statistics

- **Total Tools**: 44
- **Categories**: 12
- **Contributors**: ![Contributors](https://img.shields.io/github/contributors/Durgesh-Vaigandla/ai-tools-database)
- **Last Updated**: ![Last Commit](https://img.shields.io/github/last-commit/Durgesh-Vaigandla/ai-tools-database/main)

## 🚀 Quick Start

### For Users
Browse the [AI Tools Directory](https://github.com/Durgesh-Vaigandla/ai-tools-database) to discover AI tools.

### Live SEO Landing Page
Visit the public landing page: [AI Tools Database Website](https://durgesh-vaigandla.github.io/ai-tools-database/)

### For Contributors
1. **Fork** this repository
2. **Add/Edit** tools in the appropriate category file
3. **Test** your changes: `npm run validate`
4. **Submit** a Pull Request

## 📁 Repository Structure

```
ai-tools-database/
├── .github/
│   ├── workflows/          # GitHub Actions automation
│   └── ISSUE_TEMPLATE/     # Issue templates for contributions
├── data/
│   ├── schema.json         # JSON schema for validation
│   ├── categories.json     # Category definitions
│   ├── tools.json          # Aggregated tools data
│   └── tools/              # Individual category files
│       ├── development.json
│       ├── design.json
│       └── ...
├── scripts/
│   ├── validate.js         # Data validation script
│   ├── format.js           # JSON formatting and stats
│   ├── aggregate.js        # Data aggregation script
│   ├── test.js             # Test suite
│   └── stats.js            # Statistics generation
├── web/                    # SEO landing page (GitHub Pages)
│   ├── index.html
│   ├── script.js
│   ├── stats.json
│   ├── tools.json
│   ├── robots.txt
│   └── sitemap.xml
└── docs/                   # Documentation
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Durgesh-Vaigandla/ai-tools-database.git
cd ai-tools-database

# Install dependencies
npm install

# Run validation
npm run validate

# Run tests
npm run test
```

### Available Scripts
```bash
npm run validate    # Validate all JSON data against schema
npm run test        # Run test suite
npm run format      # Format and sort JSON files
npm run aggregate   # Aggregate all tools into main file
npm run stats       # Generate database statistics
```

## 📋 Categories

| Category | Description | Tools Count |
|----------|-------------|-------------|
| **Development** | Coding assistants, debuggers, deployment tools, and development productivity tools | 4 |
| **Design** | UI/UX design tools, image generators, prototyping, and creative design assistants | 3 |
| **Content Creation** | Writing assistants, content generators, copywriting tools, and creative writing aids | 3 |
| **Business** | Business intelligence, analytics, automation, and enterprise productivity tools | 5 |
| **Productivity** | Task management, automation, workflow optimization, and personal productivity tools | 4 |
| **Research** | Academic research, data analysis, literature review, and research assistance tools | 4 |
| **Marketing** | Social media management, SEO tools, advertising, and marketing automation | 4 |
| **Education** | Learning platforms, tutoring systems, educational content creation, and study aids | 4 |
| **Audio & Music** | Music generation, audio editing, voice synthesis, and sound design tools | 3 |
| **Video** | Video editing, generation, animation, and multimedia content creation tools | 3 |
| **Data Science** | Data analysis, machine learning, visualization, and statistical tools | 3 |
| **Automation** | Workflow automation, API integration, and process optimization tools | 4 |

## 🤝 Contributing

We welcome contributions from everyone! Here's how you can help:

### 🚀 Auto-Merge for Valid Submissions

**Good news!** Properly formatted tool submissions that pass all validation checks can be automatically merged! 

**What gets auto-merged:**
- ✅ Valid JSON format following the schema
- ✅ All required fields present
- ✅ No duplicate tools
- ✅ Proper categorization
- ✅ Working links

**What requires manual review:**
- ❌ New categories (need maintainer approval)
- ❌ Schema changes
- ❌ Major updates to existing tools

### Adding a New Tool

1. **Check if it exists**: Search the database to ensure the tool isn't already listed
2. **Choose the right category**: Review our [categories](docs/CATEGORIES.md) to find the best fit
3. **Add to the correct file**: Edit the appropriate `data/tools/{category}.json` file
4. **Follow the schema**: Ensure your entry matches the [JSON schema](data/schema.json)
5. **Test your changes**: Run `npm run validate` to ensure everything is correct
6. **Submit a PR**: Create a pull request with a clear description

### Tool Entry Format

```json
{
  "id": "tool-name-kebab-case",
  "name": "Tool Display Name",
  "description": "Brief description of what the tool does (max 500 chars)",
  "category": "development",
  "pricing": "Freemium",
  "link": "https://tool-website.com",
  "tags": ["tag1", "tag2", "tag3"],
  "featured": false,
  "popular": false,
  "new": true,
  "rating": 4.5,
  "submittedBy": "your-github-username",
  "submittedAt": "2024-01-15T10:00:00Z",
  "lastUpdated": "2024-01-15T10:00:00Z",
  "verificationStatus": "pending"
}
```

### Updating Existing Tools

- **Fix broken links**: Update outdated or broken website links
- **Update information**: Modify descriptions, pricing, or features
- **Add ratings**: Include community feedback and ratings
- **Mark as featured/popular**: Help highlight great tools

### Guidelines

- **Accuracy**: Ensure all information is correct and up-to-date
- **Neutrality**: Keep descriptions objective and factual
- **Quality**: Only submit legitimate, functional tools
- **Originality**: Don't duplicate existing entries
- **Attribution**: Include your GitHub username as `submittedBy`

## 📖 Documentation

- **[Contributing Guide](docs/CONTRIBUTING.md)** - Detailed contribution guidelines
- **[Tool Submission Guide](docs/TOOL_SUBMISSION.md)** - Step-by-step guide for adding tools
- **[Categories Guide](docs/CATEGORIES.md)** - Understanding our categorization system
- **[API Documentation](docs/API.md)** - Using the data programmatically

## 🔗 API Access & Data Consumption

### Direct JSON Endpoints

```javascript
// Get all tools (aggregated)
fetch('https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/tools.json')
  .then(res => res.json())
  .then(data => console.log(data));

// Get tools by category
fetch('https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/tools/development.json')
  .then(res => res.json())
  .then(tools => console.log(tools));

// Get database statistics
fetch('https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json')
  .then(res => res.json())
  .then(stats => console.log(stats));

// Get categories
fetch('https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/categories.json')
  .then(res => res.json())
  .then(categories => console.log(categories));
```

### For Website Integration

```javascript
// Load all AI tools for your website
async function loadAITools() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/tools.json');
    const data = await response.json();

    console.log(`Loaded ${data.totalTools} AI tools from ${data.categories.length} categories`);
    return data.tools;
  } catch (error) {
    console.error('Failed to load AI tools:', error);
    return [];
  }
}

// Usage in your website
const tools = await loadAITools();
// Now you can display, filter, or search through the tools
```

### LinkedIn Sharing & PR

Share your AI tools database updates on LinkedIn:

**Example Post:**
```
🚀 Just updated our comprehensive AI Tools Database!

📊 Current Stats:
• 44+ AI tools across 12 categories
• Development, Design, and Content Creation tools
• All tools verified and categorized

🔗 Check it out: https://github.com/Durgesh-Vaigandla/ai-tools-database

#AI #ArtificialIntelligence #DeveloperTools #OpenSource
```

**Dynamic Badges for Sharing:**
- Total Tools: ![Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=totalTools&label=AI%20Tools&color=blue)
- Categories: ![Categories](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=totalCategories&label=Categories&color=green)

## 🛡️ Quality Assurance

### Automated Validation
- **Schema Validation**: All entries must conform to our JSON schema
- **Data Integrity**: Automated checks for required fields and data types
- **Link Validation**: Periodic checks for broken or outdated links
- **Duplicate Prevention**: Automated detection of duplicate entries

### Manual Review
- **Community Review**: All submissions are reviewed by maintainers
- **Quality Checks**: Verification of tool legitimacy and functionality
- **Category Assignment**: Ensuring proper categorization
- **Content Moderation**: Maintaining quality and appropriateness

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Basic database structure
- ✅ JSON schema validation
- ✅ GitHub Actions automation
- ✅ Community contribution templates

### Phase 2 (Upcoming)
- 🔄 Link health monitoring
- 🔄 Tool rating system
- 🔄 Advanced search and filtering
- 🔄 Tool comparison features

### Phase 3 (Future)
- 🔄 API endpoints with authentication
- 🔄 Tool usage analytics
- 🔄 Integration with external websites
- 🔄 Mobile app companion

## 🙏 Acknowledgments

- **Contributors**: Everyone who submits and maintains tools
- **Open Source Community**: For tools and frameworks used

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/Durgesh-Vaigandla/ai-tools-database/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Durgesh-Vaigandla/ai-tools-database/discussions)

---

**Made with ❤️ by the Open Source Community**