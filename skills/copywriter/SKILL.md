---
name: ralph-copywriter
description: Use this skill when the user asks to "write marketing content", "create blog posts", "write case studies", "draft newsletters", "create social media posts", "plan content calendar", "write SaaS content", or mentions content marketing, copywriting, thought leadership blogs, or autonomous content creation.
version: 1.0.0
license: MIT
---

# Ralph the Copywriter Skill

An autonomous AI copywriter skill for creating SaaS marketing content.

## When to Use This Skill

Activate this skill when the user:
- Asks to write blog posts, articles, or thought leadership content
- Needs case studies, customer success stories
- Wants to create social media content batches
- Needs newsletter or email sequence drafts
- Asks about content marketing strategy
- Mentions "Ralph" or autonomous content creation
- Has trends, research, or communications they want turned into content

## Capabilities

### Content Types
- **Blog Posts**: SEO-optimized articles (800-2000 words)
- **Case Studies**: Customer success stories with metrics (1000-1500 words)
- **Social Media**: Twitter/LinkedIn posts (<280 chars)
- **Newsletters**: Weekly/monthly roundups (500-800 words)
- **Thought Leadership**: Data-driven industry analysis

### Workflow
1. **Plan**: Analyze source material → Create content brief
2. **Write**: Draft content following brand voice guidelines
3. **Review**: Self-critique and improve
4. **Publish**: Finalize with meta descriptions

### Data Sources
The copywriter can work with:
- **Trends**: Industry trends with relevance scores
- **Research**: Studies, surveys, data points
- **Communications**: Product updates, announcements, milestones

## How to Use

### Quick Content Request
```
Write a blog post about AI agents in enterprise based on recent trends
```

### Full Ralph Loop
```
/ralph-marketer --max-iterations 25
```

### Check Status
```
/ralph-status
```

## Content Quality Standards

### Voice Guidelines
- Professional but approachable
- Data-driven but human
- Active voice, specific numbers
- No buzzword salad

### Structure Templates

**Blog Post**:
Hook → Problem → Solution → Proof → CTA

**Case Study**:
Challenge → Solution → Results → Testimonial

**Newsletter**:
Intro → Content Summaries → Trend Highlight → CTA

## Examples

### Example 1: Blog from Trend
**Input**: Trend about AI agents in enterprise (95/100 relevance)
**Output**: 1500-word thought leadership piece with industry statistics, use cases, and actionable recommendations

### Example 2: Case Study from Communication
**Input**: Customer success communication (TechCorp 400% increase)
**Output**: Structured case study with specific metrics, timeline, and customer quotes

### Example 3: Social Batch
**Input**: Recently published blog post
**Output**: 5 unique social posts with different angles, all under 280 characters

## Integration with Ralph Loop

This skill works best within a Ralph Wiggum loop where:
- Each iteration focuses on one content piece
- Memory persists via git commits and progress.txt
- Quality gates (tests) prevent bad content
- Learnings compound across iterations

Start with `/ralph-init` to set up, then `/ralph-marketer` to run.
