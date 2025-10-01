# 📂 Categories Guide

This guide explains our categorization system and helps you choose the right category for AI tools. Proper categorization ensures tools are discoverable and users can find relevant tools easily.

## 🎯 Categorization Principles

### Primary Use Case
We categorize tools based on their **primary use case** and **target audience**, not secondary features.

### Single Category Rule
Each tool belongs to **exactly one category**. Choose the category that best represents the tool's main purpose.

### User-Centric Approach
Categories are designed around **who uses the tool** and **what problem it solves**.

## 📋 Category Definitions

### 🤖 Development
**For**: Software developers, programmers, coders
**Tools**: Code assistants, debuggers, deployment tools, testing frameworks
**Examples**:
- GitHub Copilot (code completion)
- Tabnine (autocomplete)
- Cursor AI (AI-first editor)
- Replit Ghostwriter (code generation)

**Not Included**: General productivity tools, unless coding-specific

---

### 🎨 Design
**For**: UI/UX designers, graphic designers, visual artists
**Tools**: Image generators, design assistants, prototyping tools
**Examples**:
- Midjourney (image generation)
- DALL-E (AI art)
- Figma AI (design assistance)
- Canva Magic Studio (design automation)

**Not Included**: Code-based design tools (goes to Development)

---

### ✍️ Content Creation
**For**: Writers, content creators, marketers, bloggers
**Tools**: Writing assistants, content generators, copywriting tools
**Examples**:
- ChatGPT (general writing)
- Jasper (marketing copy)
- Copy.ai (content generation)
- Grammarly (writing improvement)

**Not Included**: Design-focused content tools (goes to Design)

---

### 💼 Business
**For**: Business owners, managers, entrepreneurs
**Tools**: Business intelligence, analytics, automation, CRM
**Examples**:
- Salesforce Einstein (sales automation)
- Tableau CRM (business analytics)
- Zapier AI (workflow automation)
- HubSpot AI (marketing automation)

**Not Included**: General productivity tools (goes to Productivity)

---

### ⚡ Productivity
**For**: Knowledge workers, professionals, students
**Tools**: Task management, note-taking, organization, general productivity
**Examples**:
- Notion AI (note-taking and organization)
- Todoist AI (task management)
- Mem.ai (knowledge management)
- ClickUp AI (project management)

**Not Included**: Business-specific tools (goes to Business)

---

### 🔬 Research
**For**: Researchers, academics, analysts, scientists
**Tools**: Data analysis, literature review, academic research
**Examples**:
- Semantic Scholar (academic search)
- Elicit (research assistant)
- Scite (citation analysis)
- Consensus (research synthesis)

**Not Included**: General search tools or data visualization (goes to appropriate categories)

---

### 📢 Marketing
**For**: Marketing professionals, social media managers, advertisers
**Tools**: Social media management, SEO, advertising, content marketing
**Examples**:
- Hootsuite (social media management)
- Ahrefs (SEO analysis)
- Google Ads AI (advertising)
- Mailchimp AI (email marketing)

**Not Included**: General content creation (goes to Content Creation)

---

### 🎓 Education
**For**: Students, teachers, educators, learners
**Tools**: Learning platforms, tutoring systems, educational content
**Examples**:
- Duolingo (language learning)
- Khan Academy AI (personalized learning)
- Quizlet (study tools)
- Socratic (homework help)

**Not Included**: Research tools (goes to Research)

---

### 🎵 Audio
**For**: Musicians, podcasters, audio engineers, content creators
**Tools**: Music generation, audio editing, voice synthesis, sound design
**Examples**:
- AIVA (music composition)
- Descript (audio editing)
- Respeecher (voice synthesis)
- Lalal.ai (audio separation)

**Not Included**: Video tools with audio features (goes to Video)

---

### 🎬 Video
**For**: Video creators, filmmakers, content producers, editors
**Tools**: Video editing, generation, animation, post-production
**Examples**:
- Runway ML (video editing)
- Synthesia (video creation)
- Pika Labs (video generation)
- Descript (video editing)

**Not Included**: Audio-only tools (goes to Audio)

---

### 📊 Data Science
**For**: Data scientists, analysts, ML engineers, researchers
**Tools**: Data analysis, machine learning, visualization, statistics
**Examples**:
- Google Colab (data analysis)
- DataRobot (ML automation)
- Tableau (data visualization)
- Jupyter AI (notebook assistance)

**Not Included**: Business analytics (goes to Business)

---

### 🔄 Automation
**For**: Developers, business users, workflow designers
**Tools**: Workflow automation, API integration, process optimization
**Examples**:
- Zapier (workflow automation)
- Make (integration platform)
- Automate.io (business automation)
- Hugging Face (ML automation)

**Not Included**: Business-specific automation (goes to Business)

## 🤔 Decision Tree

Use this flowchart to choose the right category:

```
Does the tool primarily help with coding/development?
├── Yes → Development
└── No
    ├── Does it create or edit visual content/images?
    │   ├── Yes → Design
    │   └── No
    │       ├── Does it help with writing/content creation?
    │       │   ├── Yes → Content Creation
    │       │   └── No
    │       │       ├── Is it for business management/analytics?
    │       │       │   ├── Yes → Business
    │       │       │   └── No
    │       │       │       ├── Is it for general productivity/tasks?
    │       │       │       │   ├── Yes → Productivity
    │       │       │       │   └── No
    │       │       │       │       ├── Is it for academic research?
    │       │       │       │       │   ├── Yes → Research
    │       │       │       │       │   └── No
    │       │       │       │       │       ├── Is it for marketing/advertising?
    │       │       │       │       │       │   ├── Yes → Marketing
    │       │       │       │       │       │   └── No
    │       │       │       │       │       │       ├── Is it for learning/education?
    │       │       │       │       │       │       │   ├── Yes → Education
    │       │       │       │       │       │       │   └── No
    │       │       │       │       │       │       │       ├── Is it audio/music focused?
    │       │       │       │       │       │       │       │   ├── Yes → Audio
    │       │       │       │       │       │       │       │   └── No
    │       │       │       │       │       │       │       │       ├── Is it video focused?
    │       │       │       │       │       │       │       │       │   ├── Yes → Video
    │       │       │       │       │       │       │       │       │   └── No
    │       │       │       │       │       │       │       │       │       ├── Is it data science/ML focused?
    │       │       │       │       │       │       │       │       │       │   ├── Yes → Data Science
    │       │       │       │       │       │       │       │       │       │   └── No
    │       │       │       │       │       │       │       │       │       │       └── Automation
```

## ❓ Common Questions

### "My tool does multiple things. Which category?"
Choose the **primary use case**. If a tool does both design and development, consider who the main users are and what the core feature is.

### "Is there a category for my tool type?"
If your tool doesn't fit perfectly, choose the closest match. We can always discuss adding new categories if there's demand.

### "Should I choose based on the tool name or features?"
**Features over name**. A tool called "Design Assistant" that actually helps with coding should go in Development if that's its primary function.

### "What about tools that work across categories?"
Most tools have a primary focus. For example, Notion AI is primarily a productivity tool, even though it can be used for various purposes.

### "Can a tool be in multiple categories?"
No, each tool belongs to exactly one category to avoid confusion and ensure clean organization.

## 📞 Need Help Choosing?

If you're unsure about the right category:

1. **Check existing tools**: Look at similar tools in the database
2. **Read descriptions**: Focus on what the tool actually does
3. **Ask for help**: Create a GitHub Discussion or Issue asking for category guidance
4. **Provide context**: Include the tool's main features and target users

## 🔄 Category Evolution

Our categorization system may evolve as the AI landscape changes. We regularly review and update categories based on:

- New types of AI tools emerging
- Community feedback
- Usage patterns and search behavior
- Tool submissions that don't fit current categories

## 📊 Category Statistics

| Category | Current Tools | Growth Trend |
|----------|---------------|--------------|
| Development | High | Growing |
| Design | High | Growing |
| Content Creation | High | Growing |
| Business | Medium | Steady |
| Productivity | Medium | Growing |
| Research | Low | Emerging |
| Marketing | Medium | Growing |
| Education | Low | Emerging |
| Audio | Low | Emerging |
| Video | Low | Emerging |
| Data Science | Medium | Steady |
| Automation | Low | Emerging |

---

Proper categorization helps users discover relevant tools quickly. When in doubt, choose the category that best represents the tool's primary purpose and target audience.