# 🤖 AI Tools Database

[![Validate Data](https://github.com/Durgesh-Vaigandla/ai-tools-database/actions/workflows/validate.yml/badge.svg)](https://github.com/Durgesh-Vaigandla/ai-tools-database/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A community-driven, open-source database of AI tools for developers, designers, creators, and businesses. Powered by the community, maintained with ❤️.

## 📊 Live Statistics

- **Total Tools**: ![Tools Count](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=totalTools&label=tools&color=blue)
- **Categories**: 12
- **Contributors**: ![Contributors](https://img.shields.io/github/contributors/Durgesh-Vaigandla/ai-tools-database)
- **Last Updated**: ![Last Commit](https://img.shields.io/github/last-commit/Durgesh-Vaigandla/ai-tools-database/main)

## 🚀 Quick Start

### For Users
Visit [CSEdge AI Tools Directory](https://csedge.co/ai-tools) to browse and discover AI tools.

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
│   ├── migrate.js          # CSV to JSON migration
│   └── test.js             # Test suite
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
npm run stats       # Generate database statistics
npm run migrate     # Migrate CSV data to JSON format
```

## 📋 Categories

| Category | Description | Tools Count |
|----------|-------------|-------------|
| **Development** | Coding assistants, debuggers, deployment tools | ![Dev Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.development&label=tools) |
| **Design** | UI/UX tools, image generators, prototyping | ![Design Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.design&label=tools) |
| **Content Creation** | Writing assistants, content generators | ![Content Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.content&label=tools) |
| **Business** | Business intelligence, analytics, automation | ![Business Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.business&label=tools) |
| **Productivity** | Task management, workflow optimization | ![Productivity Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.productivity&label=tools) |
| **Research** | Academic research, data analysis | ![Research Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.research&label=tools) |
| **Marketing** | Social media, SEO, advertising tools | ![Marketing Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.marketing&label=tools) |
| **Education** | Learning platforms, tutoring systems | ![Education Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.education&label=tools) |
| **Audio** | Music generation, audio editing | ![Audio Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.audio&label=tools) |
| **Video** | Video editing, generation, animation | ![Video Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.video&label=tools) |
| **Data Science** | Data analysis, ML, visualization | ![Data Science Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.data-science&label=tools) |
| **Automation** | Workflow automation, API integration | ![Automation Tools](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/stats.json&query=categories.automation&label=tools) |

## 🤝 Contributing

We welcome contributions from everyone! Here's how you can help:

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

## 🔗 API Access

### Direct JSON Access

```javascript
// Get all tools
fetch('https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/tools.json')
  .then(res => res.json())
  .then(data => console.log(data));

// Get tools by category
fetch('https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/tools/development.json')
  .then(res => res.json())
  .then(tools => console.log(tools));

// Get categories
fetch('https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/categories.json')
  .then(res => res.json())
  .then(categories => console.log(categories));
```

### Example Usage

```javascript
// Find featured development tools
const devTools = await fetch('https://raw.githubusercontent.com/Durgesh-Vaigandla/ai-tools-database/main/data/tools/development.json')
  .then(res => res.json());

const featuredTools = devTools.filter(tool => tool.featured);
console.log('Featured Development Tools:', featuredTools);
```

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
- 🔄 Integration with CSEdge website
- 🔄 Mobile app companion

## 🙏 Acknowledgments

- **Contributors**: Everyone who submits and maintains tools
- **CSEdge Community**: For inspiration and support
- **Open Source Community**: For tools and frameworks used

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/Durgesh-Vaigandla/ai-tools-database/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Durgesh-Vaigandla/ai-tools-database/discussions)
- **Website**: [CSEdge](https://csedge.co)

---

**Made with ❤️ by the CSEdge Community**