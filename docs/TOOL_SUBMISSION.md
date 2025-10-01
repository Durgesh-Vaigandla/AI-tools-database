# 🆕 Tool Submission Guide

This guide walks you through the process of submitting a new AI tool to the database. Follow these steps carefully to ensure your submission is accepted quickly.

## 📋 Before You Start

### Check Requirements

- [ ] Tool has an **official website** or reliable landing page
- [ ] Tool is **functional** and not vaporware
- [ ] Tool is **AI-powered** (primary function involves AI/ML)
- [ ] Tool is **not already in the database**
- [ ] You have **tested the tool** personally (if possible)

### Choose the Right Category

Select the most appropriate category for your tool:

| Category | Best For | Examples |
|----------|----------|----------|
| **development** | Coding assistants, debuggers, deployment | GitHub Copilot, Tabnine |
| **design** | UI/UX tools, image generators, prototyping | Midjourney, Figma AI |
| **content** | Writing assistants, content generators | ChatGPT, Jasper |
| **business** | Analytics, automation, productivity | Business intelligence tools |
| **productivity** | Task management, workflow optimization | General productivity tools |
| **research** | Academic research, data analysis | Research and analysis tools |
| **marketing** | Social media, SEO, advertising | Marketing automation tools |
| **education** | Learning platforms, tutoring | Educational AI tools |
| **audio** | Music generation, audio editing | Audio processing tools |
| **video** | Video editing, generation, animation | Video creation tools |
| **data-science** | Data analysis, ML, visualization | Data science platforms |
| **automation** | Workflow automation, API integration | Process automation tools |

## 🚀 Step-by-Step Submission

### Step 1: Fork the Repository

1. Go to [ai-tools-database repository](https://github.com/Durgesh-Vaigandla/ai-tools-database)
2. Click the **"Fork"** button in the top-right corner
3. This creates a copy of the repository in your GitHub account

### Step 2: Clone Your Fork

```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/ai-tools-database.git
cd ai-tools-database

# Set up the upstream remote
git remote add upstream https://github.com/Durgesh-Vaigandla/ai-tools-database.git
```

### Step 3: Create a Branch

```bash
# Create and switch to a new branch
git checkout -b add-tool-name

# Example: git checkout -b add-chatgpt
```

### Step 4: Prepare Your Tool Data

Create a JSON entry for your tool. Use this template:

```json
{
  "id": "tool-name-kebab-case",
  "name": "Tool Display Name",
  "description": "Brief description of what the tool does and its main benefits. Keep it under 500 characters and focus on functionality rather than marketing language.",
  "category": "chosen-category",
  "pricing": "Free|Freemium|Paid|Subscription",
  "link": "https://official-website.com",
  "tags": ["tag1", "tag2", "tag3"],
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

### Step 5: Add to the Correct File

1. Navigate to `data/tools/`
2. Open the appropriate category file (e.g., `development.json`)
3. Add your tool entry to the JSON array
4. Save the file

### Step 6: Validate Your Changes

```bash
# Install dependencies (first time only)
npm install

# Validate your JSON
npm run validate

# Format the files
npm run format

# Run tests
npm run test
```

### Step 7: Commit Your Changes

```bash
# Check what files changed
git status

# Add your changes
git add data/tools/your-category.json

# Commit with a clear message
git commit -m "Add [Tool Name] to [category] category

- Tool: [Tool Name]
- Category: [category]
- Pricing: [pricing model]
- Description: [brief description]"
```

### Step 8: Push and Create Pull Request

```bash
# Push your branch to GitHub
git push origin add-tool-name
```

Then:

1. Go to your forked repository on GitHub
2. Click **"Compare & pull request"**
3. Fill out the pull request template
4. Provide a clear description
5. Submit the pull request

## 📝 Detailed Field Guide

### ID (Required)
- **Format**: `kebab-case-with-only-lowercase-letters-numbers-hyphens`
- **Rules**: No spaces, no special characters except hyphens
- **Example**: `github-copilot`, `chat-gpt-4`, `midjourney-v5`
- **Uniqueness**: Must be unique across ALL categories

### Name (Required)
- **Content**: Official or commonly used name
- **Format**: Title case, proper capitalization
- **Length**: Keep it reasonable (usually 2-50 characters)
- **Example**: `"GitHub Copilot"`, `"ChatGPT"`, `"Midjourney"`

### Description (Required)
- **Length**: 10-500 characters
- **Content**: Focus on functionality and benefits
- **Style**: Clear, concise, objective
- **Avoid**: Marketing hype, exaggerated claims
- **Good Example**: `"AI-powered code completion tool that suggests code snippets and entire functions in real-time as you type."`
- **Bad Example**: `"The most amazing, revolutionary AI tool ever created that will change your life forever!"`

### Category (Required)
- **Options**: See the category table above
- **Rule**: Choose the single best fit
- **Consideration**: Think about who primarily uses the tool

### Pricing (Required)
- **Options**: `"Free"`, `"Freemium"`, `"Paid"`, `"Subscription"`
- **Definition**:
  - **Free**: Completely free to use
  - **Freemium**: Free basic features, paid premium features
  - **Paid**: One-time purchase required
  - **Subscription**: Recurring payment required

### Link (Required)
- **Content**: Official website or primary landing page
- **Format**: Full URL with `https://`
- **Verification**: Link should work and lead to the actual tool
- **Avoid**: Affiliate links, redirect links, app store links (unless primary)

### Tags (Optional but Recommended)
- **Purpose**: Help with search and discovery
- **Format**: Lowercase, use hyphens for multi-word tags
- **Relevance**: Only include highly relevant tags
- **Examples**: `["coding", "ai", "productivity"]`, `["image-generation", "art", "creativity"]`
- **Limit**: Maximum 10 tags

### Boolean Flags
- **featured**: `true` only for exceptional, widely-used tools (maintainer decision)
- **popular**: `true` for trending or highly-rated tools (maintainer decision)
- **new**: `true` for recently launched tools (within last 3-6 months)

### Rating
- **Initial**: Set to `0` for new submissions
- **Update**: Can be updated based on community feedback
- **Scale**: 0-5, with 0.5 increments allowed

### Timestamps
- **submittedAt**: Current date/time in ISO format
- **Format**: `YYYY-MM-DDTHH:mm:ssZ` (e.g., `2024-01-15T10:00:00Z`)

## 🔍 Validation Checklist

Before submitting, ensure:

- [ ] JSON is valid (no syntax errors)
- [ ] All required fields are present
- [ ] ID follows the correct format
- [ ] Category is valid
- [ ] Link is accessible and correct
- [ ] Description is clear and accurate
- [ ] No duplicate tools exist
- [ ] `npm run validate` passes
- [ ] `npm run test` passes

## 🐛 Common Issues and Solutions

### "Validation Failed"
**Problem**: Your JSON doesn't match the schema
**Solution**: Check the error messages and fix the issues. Common problems:
- Missing required fields
- Invalid ID format
- Wrong data types

### "Tool Already Exists"
**Problem**: Similar tool already in database
**Solution**:
- Search more thoroughly for existing entries
- Consider updating the existing entry instead
- Check for different names of the same tool

### "Wrong Category"
**Problem**: Tool placed in incorrect category
**Solution**:
- Review the category definitions
- Choose the category that best fits the primary use case
- Ask for clarification in your PR description

### "Link Not Working"
**Problem**: Provided link is broken or incorrect
**Solution**:
- Double-check the URL
- Ensure it's the official website
- Test the link in an incognito window

## 📞 Need Help?

- **GitHub Issues**: For technical problems
- **GitHub Discussions**: For questions about the process
- **Pull Request Comments**: For PR-specific help

## 🎯 After Submission

### What Happens Next

1. **Automated Validation**: GitHub Actions will check your submission
2. **Manual Review**: Maintainers will review for quality and accuracy
3. **Feedback**: You may receive requests for changes
4. **Approval**: Once approved, your tool will be added to the database
5. **Live**: Tool appears in the database within 24 hours

### Recognition

- Your GitHub username will be credited as the submitter
- You'll be listed as a contributor to the project
- Active contributors may receive special recognition

## 📋 Quick Reference

### Required Fields Summary
- `id` (string): Unique kebab-case identifier
- `name` (string): Display name
- `description` (string): 10-500 character description
- `category` (string): One of the predefined categories
- `pricing` (string): Free/Freemium/Paid/Subscription
- `link` (string): Valid URL

### Useful Commands
```bash
# Validate your changes
npm run validate

# Format JSON files
npm run format

# Run all tests
npm run test

# Check for existing tools
grep -r "tool-name" data/tools/
```

---

Happy contributing! Your submissions help build a valuable resource for the AI community. 🚀