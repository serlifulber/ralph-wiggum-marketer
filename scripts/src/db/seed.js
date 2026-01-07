import Database from 'better-sqlite3';

const db = new Database('./data/content.db');

// Clear existing data
db.exec(`
  DELETE FROM agent_log;
  DELETE FROM published;
  DELETE FROM drafts;
  DELETE FROM content_plan;
  DELETE FROM communications;
  DELETE FROM research;
  DELETE FROM trends;
`);

// ===========================================
// TRENDS (from TrendScout Agent)
// ===========================================
const insertTrend = db.prepare(`
  INSERT INTO trends (topic, description, source, relevance_score, status)
  VALUES (?, ?, ?, ?, 'active')
`);

const trends = [
  {
    topic: 'AI Agents in Enterprise',
    description: 'Companies are rapidly adopting autonomous AI agents for workflow automation. 73% of Fortune 500 planning AI agent deployment by 2025.',
    source: 'Gartner Report 2024',
    relevance: 95
  },
  {
    topic: 'Prompt Engineering as a Skill',
    description: 'Prompt engineering emerging as critical business skill. LinkedIn reports 300% increase in job postings mentioning prompt engineering.',
    source: 'LinkedIn Workforce Report',
    relevance: 88
  },
  {
    topic: 'Context Windows Getting Larger',
    description: 'LLMs now support 1M+ token context windows. This changes how we think about document processing and long-form analysis.',
    source: 'Anthropic Blog',
    relevance: 82
  },
  {
    topic: 'Vibe Coding Movement',
    description: 'Developers embracing "vibe coding" - letting AI handle implementation while focusing on architecture and prompts.',
    source: 'Twitter/X Trending',
    relevance: 75
  },
  {
    topic: 'MCP Protocol Adoption',
    description: 'Model Context Protocol becoming standard for AI tool integration. Major IDEs adding native support.',
    source: 'GitHub Trends',
    relevance: 85
  }
];

trends.forEach(t => insertTrend.run(t.topic, t.description, t.source, t.relevance));

// ===========================================
// RESEARCH (from Research Agent)
// ===========================================
const insertResearch = db.prepare(`
  INSERT INTO research (title, summary, key_findings, data_points, sources, category, status)
  VALUES (?, ?, ?, ?, ?, ?, 'available')
`);

const research = [
  {
    title: 'Developer Productivity with AI Coding Assistants',
    summary: 'Comprehensive study on how AI coding tools impact developer productivity, code quality, and job satisfaction.',
    key_findings: JSON.stringify([
      'Developers using AI assistants complete tasks 55% faster',
      'Code review time reduced by 40%',
      'Junior developers see largest productivity gains',
      'Test coverage improved by 25% when AI suggests tests'
    ]),
    data_points: JSON.stringify([
      { metric: 'Task completion speed', value: '+55%' },
      { metric: 'Code review time', value: '-40%' },
      { metric: 'Bug reduction', value: '-30%' },
      { metric: 'Developer satisfaction', value: '4.2/5' }
    ]),
    sources: JSON.stringify(['GitHub Survey 2024', 'Stack Overflow Developer Survey']),
    category: 'productivity'
  },
  {
    title: 'SaaS Content Marketing Benchmarks 2024',
    summary: 'Analysis of content marketing performance across 500 B2B SaaS companies.',
    key_findings: JSON.stringify([
      'Long-form content (2000+ words) generates 3x more leads',
      'Technical tutorials have highest conversion rate',
      'Email newsletters still deliver best ROI',
      'Video content growing but blogs remain #1 for SEO'
    ]),
    data_points: JSON.stringify([
      { metric: 'Avg blog post length', value: '1,847 words' },
      { metric: 'Email open rate', value: '24.3%' },
      { metric: 'Blog-to-lead conversion', value: '2.8%' },
      { metric: 'Content pieces/month', value: '12' }
    ]),
    sources: JSON.stringify(['HubSpot Research', 'Content Marketing Institute']),
    category: 'marketing'
  },
  {
    title: 'Enterprise AI Adoption Barriers',
    summary: 'Survey of 200 enterprise tech leaders on challenges implementing AI solutions.',
    key_findings: JSON.stringify([
      'Security concerns are #1 barrier (67%)',
      'Lack of AI expertise second biggest challenge',
      'Integration with existing tools is critical',
      'ROI measurement remains difficult'
    ]),
    data_points: JSON.stringify([
      { metric: 'Security concerns', value: '67%' },
      { metric: 'Skill gaps', value: '54%' },
      { metric: 'Integration issues', value: '48%' },
      { metric: 'Budget constraints', value: '41%' }
    ]),
    sources: JSON.stringify(['McKinsey AI Report', 'Deloitte Tech Trends']),
    category: 'enterprise'
  }
];

research.forEach(r => insertResearch.run(
  r.title, r.summary, r.key_findings, r.data_points, r.sources, r.category
));

// ===========================================
// COMMUNICATIONS (from Product/Marketing Team)
// ===========================================
const insertComm = db.prepare(`
  INSERT INTO communications (type, title, details, key_messages, target_audience, priority, status)
  VALUES (?, ?, ?, ?, ?, ?, 'pending')
`);

const communications = [
  {
    type: 'product_update',
    title: 'Launch: AI Writing Assistant 2.0',
    details: 'Major update to our AI writing assistant. New features: tone adjustment, brand voice learning, multi-language support, SEO optimization suggestions.',
    key_messages: JSON.stringify([
      'Write content 10x faster with AI that learns your brand voice',
      'Now supports 12 languages',
      'Built-in SEO optimizer increases organic traffic',
      'Enterprise-grade security with SOC2 compliance'
    ]),
    target_audience: 'Content marketers, SaaS companies, Marketing teams',
    priority: 1
  },
  {
    type: 'case_study',
    title: 'Customer Success: TechCorp Increased Output 400%',
    details: 'TechCorp, a B2B SaaS company, used our platform to scale content production from 5 to 25 pieces per month while maintaining quality.',
    key_messages: JSON.stringify([
      '400% increase in content output',
      'Reduced content production costs by 60%',
      'Improved SEO rankings for 50+ keywords',
      'Team of 2 now produces what took team of 8'
    ]),
    target_audience: 'Marketing leaders, Content teams, CMOs',
    priority: 2
  },
  {
    type: 'milestone',
    title: '10,000 Customers Milestone',
    details: 'We have reached 10,000 paying customers! This milestone represents incredible growth and trust from the market.',
    key_messages: JSON.stringify([
      '10,000 customers trust us with their content',
      'Grown 300% year-over-year',
      'Customers in 45 countries',
      'Processing 1M+ content pieces monthly'
    ]),
    target_audience: 'Prospects, Industry analysts, Press',
    priority: 3
  },
  {
    type: 'feature',
    title: 'New Integration: Connect with Notion, Confluence, Google Docs',
    details: 'Seamless integration with popular documentation tools. Write in our platform, publish anywhere.',
    key_messages: JSON.stringify([
      'Write once, publish everywhere',
      'Bi-directional sync keeps content updated',
      'No more copy-paste workflows',
      'Works with your existing tools'
    ]),
    target_audience: 'Product teams, Technical writers, Developers',
    priority: 2
  },
  {
    type: 'announcement',
    title: 'Series B Funding: $50M to Accelerate AI Innovation',
    details: 'Raised $50M Series B led by Acme Ventures. Funds will be used for R&D, expanding the team, and international growth.',
    key_messages: JSON.stringify([
      '$50M to build the future of AI content',
      'Expanding engineering team by 3x',
      'Opening offices in Europe and Asia',
      'Investing heavily in AI research'
    ]),
    target_audience: 'Press, Investors, Enterprise prospects',
    priority: 1
  }
];

communications.forEach(c => insertComm.run(
  c.type, c.title, c.details, c.key_messages, c.target_audience, c.priority
));

// Log the seeding
db.prepare(`INSERT INTO agent_log (action, details) VALUES (?, ?)`).run(
  'database_seeded',
  JSON.stringify({ trends: trends.length, research: research.length, communications: communications.length })
);

console.log('✅ Database seeded with sample data:');
console.log(`   - ${trends.length} trends`);
console.log(`   - ${research.length} research items`);
console.log(`   - ${communications.length} communications`);

db.close();
