import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Tag, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPost {
  id: string;
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

// Helper to parse frontmatter and content
const parseMarkdown = (fileContent: string, slug: string): BlogPost => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = fileContent.match(frontmatterRegex);
  const frontmatter: any = {};
  
  if (match) {
    const lines = match[1].split('\n');
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        let value = valueParts.join(':').trim();
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        frontmatter[key.trim()] = value;
      }
    });
  }

  const content = fileContent.replace(frontmatterRegex, "").trim();
  
  // Estimate read time
  const wordsPerMinute = 200;
  const noOfWords = content.split(/\s+/g).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  const readTime = `${minutes} min read`;

  return {
    id: slug,
    slug,
    title: frontmatter.title || "Untitled",
    excerpt: frontmatter.excerpt || "",
    content,
    category: (frontmatter.category as any) || "updates",
    author: frontmatter.author || "Admin",
    date: frontmatter.date || "",
    readTime: frontmatter.readTime || readTime,
    featured: frontmatter.featured === "true" || frontmatter.featured === true,
  };
};

// Load all markdown files
const rawPosts = import.meta.glob("/src/content/blog/*.md", { as: "raw", eager: true });
const blogPosts: BlogPost[] = Object.entries(rawPosts).map(([path, content]) => {
  const slug = path.split("/").pop()?.replace(".md", "") || "";
  return parseMarkdown(content as string, slug);
});

const categories = [
  { id: "all", label: "All Posts" },
  { id: "announcement", label: "Announcements" },
  { id: "exam-tips", label: "Exam Tips" },
  { id: "updates", label: "Updates" },
  { id: "success-stories", label: "Success Stories" }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "announcement": return "bg-red-500/10 text-red-600 border-red-500/20";
    case "exam-tips": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "success-stories": return "bg-green-500/10 text-green-600 border-green-500/20";
    default: return "bg-primary/10 text-primary border-primary/20";
  }
};

// Blog Listing Component
const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, searchQuery]);

  const featuredPosts = useMemo(() => blogPosts.filter(post => post.featured), []);

  return (
    <>
      <Helmet>
        <title>Blog & News | Gurukul Classes Hajipur</title>
        <meta name="description" content="Latest news, announcements, exam tips, and success stories from Gurukul Classes Hajipur." />
      </Helmet>

      <div className="min-h-screen bg-background">
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
            {selectedCategory === "all" && searchQuery === "" && featuredPosts.length > 0 && (
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
const BlogPostPage = () => {
  const { slug } = useParams();
  const post = useMemo(() => blogPosts.find(p => p.slug === slug), [slug]);

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

  const relatedPosts = useMemo(() => 
    blogPosts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)
  , [post]);

  return (
    <>
      <Helmet>
        <title>{post.title} | Gurukul Classes Hajipur</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="min-h-screen bg-background">
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

        <article className="section-padding">
          <div className="container-narrow px-4 max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-primary">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

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

const Blog = () => {
  const { slug } = useParams();
  return slug ? <BlogPostPage /> : <BlogList />;
};

export default Blog;
