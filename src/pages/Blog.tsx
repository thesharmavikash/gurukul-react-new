import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Tag, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "announcement" | "exam-tips" | "updates" | "success-stories";
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "jee-main-2025-preparation-strategy",
    title: "JEE Main 2025: Complete Preparation Strategy for Last 3 Months",
    excerpt: "With JEE Main 2025 approaching, here's a comprehensive guide to maximize your preparation in the final stretch.",
    content: `
## Introduction
With JEE Main 2025 just around the corner, it's crucial to have a well-structured preparation strategy. This guide will help you make the most of your remaining time.

## Month-wise Breakdown

### Month 1: Revision & Weak Areas
- Complete revision of all three subjects
- Focus on weak chapters identified from mock tests
- Practice numerical problems daily

### Month 2: Mock Tests & Analysis
- Take at least 3 full-length mock tests per week
- Analyze each test thoroughly
- Maintain an error log and review it weekly

### Month 3: Final Polish
- Focus on high-weightage topics
- Quick revision through formula sheets
- Maintain exam temperament through regular timed practice

## Key Tips
1. **Time Management**: Practice solving papers in 2.5 hours instead of 3
2. **Health**: Maintain proper sleep schedule and exercise
3. **Revision**: Use flashcards for quick formula revision
4. **Stay Calm**: Anxiety can affect performance, practice meditation

## Conclusion
Remember, consistency is key. Trust your preparation and stay confident!
    `,
    category: "exam-tips",
    author: "Mr. Chandan Kumar",
    date: "December 22, 2024",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    slug: "neet-2025-biology-important-topics",
    title: "NEET 2025: Most Important Topics in Biology You Must Master",
    excerpt: "Biology carries 360 marks in NEET. Here are the must-know topics that appear repeatedly in examinations.",
    content: `
## High Weightage Topics in Biology

### Botany
1. **Plant Physiology** - Photosynthesis, Respiration, Plant Growth
2. **Genetics** - Mendel's Laws, Chromosomal Theory
3. **Ecology** - Ecosystems, Biodiversity, Environmental Issues
4. **Cell Biology** - Cell Structure, Cell Cycle

### Zoology
1. **Human Physiology** - All systems (Digestive, Respiratory, Circulatory)
2. **Genetics & Evolution** - Molecular Basis of Inheritance
3. **Reproductive Health** - Human Reproduction
4. **Biotechnology** - Principles and Processes

## Study Strategy
- Read NCERT thoroughly - 90% questions come from it
- Make diagrams and flowcharts
- Practice MCQs chapter-wise
- Take topic-wise tests regularly

## Common Mistakes to Avoid
- Ignoring NCERT examples and diagrams
- Not practicing enough MCQs
- Leaving any topic for later
    `,
    category: "exam-tips",
    author: "Mr. Ritu Raj",
    date: "December 20, 2024",
    readTime: "6 min read"
  },
  {
    id: 3,
    slug: "gurukul-classes-new-batch-january-2025",
    title: "Admissions Open: New Batch Starting January 2025",
    excerpt: "Register now for our Foundation, Target, and Board Exam courses. Early bird discounts available!",
    content: `
## New Session 2025 - Admissions Open!

Gurukul Classes is excited to announce the commencement of new batches for the academic session 2025-26.

## Available Courses

### Two Year Foundation Course (Class XI-XII)
- Comprehensive preparation for JEE Main, JEE Advanced, NEET
- Board exam preparation included
- **Batch Start Date**: January 15, 2025

### One Year Target Course (Class XII)
- Intensive preparation for entrance exams
- Complete syllabus coverage by October
- **Batch Start Date**: January 10, 2025

### Foundation Course (Class VIII-X)
- NTSE, Olympiad preparation
- Strong foundation for future competitive exams
- **Batch Start Date**: January 20, 2025

## Early Bird Offer
- **10% discount** on fees for registrations before December 31, 2024
- **Free study material** worth ₹5000

## How to Register
1. Visit our campus at Anjanpeer Chowk, Hajipur
2. Call: 7673076349 / 6206355817
3. Online registration available on our website

Don't miss this opportunity to shape your future with Gurukul Classes!
    `,
    category: "announcement",
    author: "Admin",
    date: "December 18, 2024",
    readTime: "4 min read",
    featured: true
  },
  {
    id: 4,
    slug: "prachi-kumari-aiims-success-story",
    title: "Success Story: Prachi Kumari's Journey to AIIMS Delhi",
    excerpt: "Read how Prachi Kumari cracked NEET 2024 with AIR 1245 and secured admission in AIIMS Delhi.",
    content: `
## From Hajipur to AIIMS Delhi

Prachi Kumari, a student of Gurukul Classes batch 2022-24, has achieved what many dream of - admission to AIIMS Delhi.

## Her Journey

"When I joined Gurukul Classes in 2022, I had a dream but no clear path. The faculty here not only taught me subjects but also showed me how to dream bigger."

### Preparation Strategy
- **Daily Routine**: 12 hours of focused study
- **NCERT**: Read each chapter at least 5 times
- **Mock Tests**: Took 50+ full-length tests
- **Revision**: Maintained concise notes for quick revision

### Role of Gurukul Classes
"The biology faculty, especially Mr. Ritu Raj sir, made complex topics simple. The doubt sessions were incredibly helpful. The test series prepared me for the actual exam pressure."

### Message to Aspirants
"Believe in yourself and your preparation. Don't compare your journey with others. Stay consistent, and success will follow."

## Results
- **NEET 2024 Score**: 705/720
- **All India Rank**: 1245
- **College**: AIIMS Delhi (MBBS)

Congratulations Prachi! You've made Gurukul Classes proud!
    `,
    category: "success-stories",
    author: "Editorial Team",
    date: "December 15, 2024",
    readTime: "5 min read"
  },
  {
    id: 5,
    slug: "holiday-notice-december-2024",
    title: "Holiday Notice: Institute Closed on December 25, 2024",
    excerpt: "Gurukul Classes will remain closed on December 25, 2024 on account of Christmas.",
    content: `
## Holiday Announcement

Dear Students and Parents,

This is to inform you that Gurukul Classes will remain **closed on Wednesday, December 25, 2024** on account of Christmas.

## Important Notes
- Regular classes will resume from **December 26, 2024**
- Online doubt sessions will be available via WhatsApp groups
- Study materials can be accessed through the student portal

## Upcoming Schedule
- December 26: Weekly Physics Test (as scheduled)
- December 28: Chemistry Unit Test
- January 2: JEE Main Mock Test 5

We wish all our students and their families a Merry Christmas!

Best regards,
Gurukul Classes Administration
    `,
    category: "announcement",
    author: "Admin",
    date: "December 12, 2024",
    readTime: "2 min read"
  },
  {
    id: 6,
    slug: "chemistry-organic-reactions-guide",
    title: "Master Organic Chemistry: Complete Reaction Mechanisms Guide",
    excerpt: "Struggling with organic reactions? This comprehensive guide covers all important mechanisms for JEE and NEET.",
    content: `
## Organic Chemistry Reaction Mechanisms

Organic Chemistry is often considered the most challenging part of Chemistry. Here's a structured approach to master it.

## Types of Reactions

### 1. Substitution Reactions
- **SN1 Mechanism**: Carbocation intermediate, racemization
- **SN2 Mechanism**: One-step, inversion of configuration

### 2. Elimination Reactions
- **E1 Mechanism**: Two-step, carbocation intermediate
- **E2 Mechanism**: One-step, anti-periplanar geometry

### 3. Addition Reactions
- Electrophilic addition to alkenes
- Nucleophilic addition to carbonyl compounds

## Tips for Learning Reactions
1. Understand the mechanism, don't just memorize
2. Practice writing reactions daily
3. Group similar reactions together
4. Use color coding for different reagents

## Practice Problems
Start with NCERT examples, then move to previous year questions.

Remember: Organic Chemistry is like a language - the more you practice, the more fluent you become!
    `,
    category: "exam-tips",
    author: "Mr. Sumit Jha",
    date: "December 10, 2024",
    readTime: "7 min read"
  }
];

const categories = [
  { id: "all", label: "All Posts" },
  { id: "announcement", label: "Announcements" },
  { id: "exam-tips", label: "Exam Tips" },
  { id: "updates", label: "Updates" },
  { id: "success-stories", label: "Success Stories" }
];

// Blog Listing Component
const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "exam-tips": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "success-stories": return "bg-green-500/10 text-green-600 border-green-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog & News | Gurukul Classes Hajipur</title>
        <meta name="description" content="Latest news, announcements, exam tips, and success stories from Gurukul Classes Hajipur." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-secondary text-secondary-foreground py-20 pt-28">
          <div className="container-narrow px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Blog & News</h1>
            <p className="text-secondary-foreground/70 text-lg max-w-2xl">
              Stay updated with the latest announcements, exam preparation tips, and success stories from our achievers.
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="sticky top-0 z-40 bg-card border-b border-border py-4 shadow-soft">
          <div className="container-narrow px-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </div>

        <main className="section-padding">
          <div className="container-narrow px-4">
            {/* Featured Posts */}
            {selectedCategory === "all" && searchQuery === "" && (
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Featured</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-large transition-all"
                    >
                      <div className="h-48 hero-gradient flex items-center justify-center">
                        <span className="text-6xl font-serif font-bold text-primary-foreground/20">GC</span>
                      </div>
                      <div className="p-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)} capitalize mb-3`}>
                          {post.category.replace("-", " ")}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" /> {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                {selectedCategory === "all" ? "All Articles" : categories.find(c => c.id === selectedCategory)?.label}
              </h2>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group flex gap-6 p-6 bg-card rounded-xl shadow-card hover:shadow-large transition-all"
                    >
                      <div className="w-20 h-20 rounded-xl hero-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-serif font-bold text-primary-foreground/30">GC</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getCategoryColor(post.category)} capitalize`}>
                            {post.category.replace("-", " ")}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" /> {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 self-center" />
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

// Single Blog Post Component
const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "exam-tips": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "success-stories": return "bg-green-500/10 text-green-600 border-green-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} | Gurukul Classes Hajipur</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-secondary text-secondary-foreground py-16 pt-28">
          <div className="container-narrow px-4 max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)} capitalize mb-4`}>
              {post.category.replace("-", " ")}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-foreground/70">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <article className="section-padding">
          <div className="container-narrow px-4 max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="font-serif text-2xl font-bold text-foreground mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="font-serif text-xl font-bold text-foreground mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- **')) {
                  const text = paragraph.replace('- **', '').replace('**:', ':');
                  const parts = text.split(':');
                  return (
                    <div key={index} className="flex gap-2 mb-2">
                      <span className="text-primary">•</span>
                      <span><strong className="text-foreground">{parts[0]}:</strong> <span className="text-muted-foreground">{parts.slice(1).join(':')}</span></span>
                    </div>
                  );
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                  const num = paragraph.charAt(0);
                  const text = paragraph.slice(3);
                  return (
                    <div key={index} className="flex gap-3 mb-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0">{num}</span>
                      <span className="text-muted-foreground">{text.replace(/\*\*/g, '')}</span>
                    </div>
                  );
                }
                if (paragraph.trim() === '') return null;
                return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>

            {/* Share & Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tags:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getCategoryColor(post.category)} capitalize`}>
                  {post.category.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section-padding bg-muted/50">
            <div className="container-narrow px-4 max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Related Articles</h2>
              <div className="space-y-4">
                {relatedPosts.map((relPost) => (
                  <Link
                    key={relPost.id}
                    to={`/blog/${relPost.slug}`}
                    className="block p-4 bg-card rounded-xl hover:shadow-medium transition-all"
                  >
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{relPost.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{relPost.date} • {relPost.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export { BlogList, BlogPost };
