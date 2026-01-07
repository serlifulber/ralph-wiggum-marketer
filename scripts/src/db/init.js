import Database from 'better-sqlite3';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

const DB_PATH = './data/content.db';

// Ensure data directory exists
mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  -- Trends: What's trending in the industry (fed by TrendScout agent)
  CREATE TABLE IF NOT EXISTS trends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT NOT NULL,
    description TEXT,
    source TEXT,
    relevance_score INTEGER DEFAULT 50,
    discovered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'used', 'expired'))
  );

  -- Research: Deep insights and data (fed by Research agent)
  CREATE TABLE IF NOT EXISTS research (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT,
    key_findings TEXT, -- JSON array of findings
    data_points TEXT,  -- JSON array of stats/numbers
    sources TEXT,      -- JSON array of source URLs
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'available' CHECK(status IN ('available', 'used', 'archived'))
  );

  -- Communications: Company news, product updates, announcements
  CREATE TABLE IF NOT EXISTS communications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('product_update', 'announcement', 'milestone', 'feature', 'case_study', 'partnership')),
    title TEXT NOT NULL,
    details TEXT,
    key_messages TEXT,  -- JSON array
    target_audience TEXT,
    priority INTEGER DEFAULT 5,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deadline DATETIME,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'assigned', 'completed'))
  );

  -- Content Plan: The copywriter's planned content
  CREATE TABLE IF NOT EXISTS content_plan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL CHECK(content_type IN ('blog', 'social', 'newsletter', 'case_study', 'landing_page', 'email_sequence')),
    title TEXT NOT NULL,
    brief TEXT,
    target_keywords TEXT,  -- JSON array
    based_on_trend_id INTEGER,
    based_on_research_id INTEGER,
    based_on_comm_id INTEGER,
    priority INTEGER DEFAULT 5,
    planned_date DATE,
    status TEXT DEFAULT 'planned' CHECK(status IN ('planned', 'writing', 'review', 'published', 'cancelled')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (based_on_trend_id) REFERENCES trends(id),
    FOREIGN KEY (based_on_research_id) REFERENCES research(id),
    FOREIGN KEY (based_on_comm_id) REFERENCES communications(id)
  );

  -- Drafts: Work in progress content
  CREATE TABLE IF NOT EXISTS drafts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER NOT NULL,
    version INTEGER DEFAULT 1,
    content TEXT,
    word_count INTEGER DEFAULT 0,
    feedback TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plan_id) REFERENCES content_plan(id)
  );

  -- Published: Final published content
  CREATE TABLE IF NOT EXISTS published (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER NOT NULL,
    draft_id INTEGER NOT NULL,
    final_content TEXT NOT NULL,
    meta_description TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    performance_notes TEXT,
    FOREIGN KEY (plan_id) REFERENCES content_plan(id),
    FOREIGN KEY (draft_id) REFERENCES drafts(id)
  );

  -- Agent Activity Log: Track what Ralph does
  CREATE TABLE IF NOT EXISTS agent_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log('✅ Database initialized at', DB_PATH);
db.close();
