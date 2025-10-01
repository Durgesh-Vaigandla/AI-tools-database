# 🤝 Contributing to AI Tools Database

Thank you for your interest in contributing to the AI Tools Database! This document provides comprehensive guidelines for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Adding New Tools](#adding-new-tools)
- [Updating Existing Tools](#updating-existing-tools)
- [Data Standards](#data-standards)
- [Validation](#validation)
- [Pull Request Process](#pull-request-process)
- [Recognition](#recognition)

## 🤟 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

- GitHub account
- Basic knowledge of JSON
- Understanding of AI tools landscape

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/Durgesh-Vaigandla/ai-tools-database.git
cd ai-tools-database

# Install dependencies
npm install

# Run validation to ensure everything works
npm run validate
```

## 🎯 How to Contribute

### Types of Contributions

1. **Add New Tools** - Submit new AI tools to the database
2. **Update Existing Tools** - Modify information for existing entries
3. **Improve Documentation** - Enhance guides, README, or other docs
4. **Bug Fixes** - Fix validation scripts, data issues, or automation
5. **Feature Requests** - Suggest new features or improvements

### Contribution Workflow

1. **Fork** the repository
2. **Create a branch** for your changes (`git checkout -b add-tool-name`)
3. **Make your changes** following the guidelines below
4. **Test your changes** (`npm run validate`)
5. **Commit your changes** (`git commit -m "Add [Tool Name]"`)
6. **Push to your branch** (`git push origin add-tool-name`)
7. **Create a Pull Request**

## ➕ Adding New Tools

### Step 1: Choose the Right Category

Review our [categories guide](CATEGORIES.md) to select the most appropriate category:

- **development**: Coding assistants, debuggers, deployment tools
- **design**: UI/UX tools, image generators, prototyping
- **content**: Writing assistants, content generators
- **business**: Analytics, automation, productivity tools
- **research**: Data analysis, academic tools
- **marketing**: Social media, SEO, advertising tools

### Step 2: Check for Duplicates

Before adding a new tool, search the existing database:

```bash
# Search for existing tools
grep -r "tool-name" data/tools/
```

### Step 3: Add the Tool Entry

Edit the appropriate category file in `data/tools/{category}.json`:

```json
{
  "id": "unique-tool-id",
  "name": "Tool Display Name",
  "description": "Clear, concise description (max 500 characters)",
  "category": "chosen-category",
  "pricing": "Free|Freemium|Paid|Subscription",
  "link": "https://official-website.com",
  "tags": ["relevant", "tags", "here"],
  "featured": false,
  "popular": false,
  "new": true,
  "rating": 0,
  "submittedBy": "your-github-username",
  "submittedAt": "2024-01-15T10:00:00Z",
  "lastUpdated": "2024-01-15T10:00:00Z",
  "verificationStatus": "pending"
}
```

### Step 4: Validate Your Entry

```bash
# Run validation
npm run validate

# Format the JSON
npm run format
```

### Step 5: Submit for Review

Create a pull request with:
- Clear title: `Add [Tool Name] to [Category]`
- Description explaining why the tool should be included
- Link to the tool's website
- Any relevant screenshots or examples

## 🔄 Updating Existing Tools

### Types of Updates

- **Fix broken links** - Update outdated URLs
- **Update pricing** - Change from Free to Freemium, etc.
- **Improve descriptions** - Make descriptions clearer or more accurate
- **Add ratings** - Include community feedback
- **Mark as featured/popular** - Highlight exceptional tools
- **Update features** - Reflect new capabilities

### Update Process

1. Locate the tool in the appropriate category file
2. Make your changes following the schema
3. Update the `lastUpdated` timestamp
4. Run validation
5. Submit a pull request

## 📏 Data Standards

### Required Fields

All tool entries must include:

- `id`: Unique kebab-case identifier
- `name`: Display name
- `description`: Clear description (10-500 characters)
- `category`: One of the predefined categories
- `pricing`: Free, Freemium, Paid, or Subscription
- `link`: Valid URL to official website

### ID Format

- Use kebab-case: `tool-name-here`
- Only lowercase letters, numbers, and hyphens
- Must be unique across all categories
- Based on the tool name, not the company

### Description Guidelines

- **Length**: 10-500 characters
- **Content**: Focus on what the tool does, not marketing hype
- **Clarity**: Use simple, understandable language
- **Accuracy**: Ensure information is correct and current

### Tags

- **Relevance**: Only include highly relevant tags
- **Format**: Lowercase, no spaces, use hyphens for multi-word tags
- **Limit**: Maximum 10 tags per tool
- **Consistency**: Use existing tags when possible

## ✅ Validation

### Automated Validation

Before submitting, ensure your changes pass all validation:

```bash
# Validate JSON schema compliance
npm run validate

# Run test suite
npm run test

# Format and sort files
npm run format
```

### Common Validation Errors

- **Missing required fields**: Ensure all required fields are present
- **Invalid ID format**: Must match `^[a-z0-9-]+$`
- **Invalid URLs**: Must be properly formatted
- **Schema violations**: Check against `data/schema.json`
- **Duplicate IDs**: Each tool must have a unique ID

## 🔄 Pull Request Process

### PR Guidelines

- **Title**: Use format `Add [Tool Name]` or `Update [Tool Name]`
- **Description**: Explain what you're adding/updating and why
- **Branch**: Create from your fork, not main branch
- **Commits**: Squash related changes into logical commits

### PR Template

```
## Description
Brief description of the changes

## Type of Change
- [ ] New tool addition
- [ ] Existing tool update
- [ ] Documentation improvement
- [ ] Bug fix

## Changes Made
- Added/Updated tool: [Tool Name]
- Category: [Category]
- Changes: [What changed]

## Validation
- [ ] JSON schema validation passes
- [ ] Tests pass
- [ ] Formatting applied
- [ ] No duplicate entries

## Additional Notes
Any additional context or screenshots
```

### Review Process

1. **Automated Checks**: GitHub Actions will validate your PR
2. **Manual Review**: Maintainers will review for quality and accuracy
3. **Feedback**: Address any requested changes
4. **Approval**: PR will be merged once approved

## 🏆 Recognition

### Contributor Recognition

Contributors are recognized through:

- **GitHub Attribution**: Your username in `submittedBy` field
- **Contributors List**: Added to repository contributors
- **Community Recognition**: Featured in release notes
- **Badges**: Special contributor badges for active participants

### Contribution Tiers

- **Contributor**: 1+ accepted submissions
- **Regular Contributor**: 5+ accepted submissions
- **Top Contributor**: 25+ accepted submissions
- **Maintainer**: Significant contributions to project infrastructure

## 🆘 Getting Help

### Where to Ask Questions

- **GitHub Issues**: For bugs or feature requests
- **GitHub Discussions**: For general questions
- **Pull Request Comments**: For PR-specific questions

### Common Issues

**"My PR fails validation"**
- Run `npm run validate` locally to identify issues
- Check the schema requirements in `data/schema.json`
- Ensure your JSON is properly formatted

**"Tool already exists"**
- Search existing entries more thoroughly
- Consider updating the existing entry instead
- Check for similar tools under different names

**"Category confusion"**
- Review the [categories guide](CATEGORIES.md)
- Ask in GitHub Discussions if unsure
- Look at existing tools in similar categories

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/Durgesh-Vaigandla/ai-tools-database/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Durgesh-Vaigandla/ai-tools-database/discussions)
- **Email**: For private matters

---

Thank you for contributing to the AI Tools Database! Your contributions help build a valuable resource for the entire AI community. 🚀