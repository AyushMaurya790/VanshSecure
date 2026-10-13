import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Plus,
  Search,
  Trash2,
  User,
  FilePlus2,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import consultation from "@/assets/consultation.jpg";
import family from "@/assets/family.jpg";
import heroOffice from "@/assets/hero-office.jpg";
import { Section } from "@/components/site/section";
import { SiteImage } from "@/components/site/site-image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ADMIN_CREDENTIALS } from "@/lib/admin-credentials";
import {
  getDefaultSiteContent,
  getStoredSiteContent,
  saveSiteContent,
  type BlogPost,
  type ManagedPage,
  type SiteContent,
} from "@/lib/site-content";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Dashboard | Vansh Secure Avenue LLP" }],
  }),
  component: AdminPage,
});

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  timestamp: string;
};

type ContentTab = "home" | "about" | "services" | "blog";
type AdminSection = "overview" | "leads" | "posts" | "pages" | "content" | "seo";

const CONTENT_TABS: ContentTab[] = ["home", "about", "services", "blog"];
const RESERVED_PAGE_SLUGS = new Set([
  "about",
  "admin",
  "blog",
  "contact",
  "corporate-fixed-deposits",
  "gift-city",
  "insurance",
  "loan-against-securities",
  "mutual-funds",
  "services",
  "sif",
  "tax-saving-bonds",
  "unlisted-shares",
  "why-choose-us",
]);
const createEmptyPost = (): BlogPost => ({
  id: "",
  slug: "",
  title: "",
  category: "",
  date: new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }),
  readTime: "5 min read",
  summary: "",
  body: "",
  image: "",
  status: "draft",
});

async function optimizeBlogImage(file: File): Promise<string> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Choose a JPG, PNG, or WebP image.");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image must be smaller than 10 MB.");
  }

  const imageUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    const loaded = new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("The selected image could not be opened."));
    });
    image.src = imageUrl;
    await loaded;

    const longestSide = Math.max(image.naturalWidth, image.naturalHeight);
    let scale = Math.min(1, 1200 / longestSide);
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Image processing is unavailable in this browser.");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      for (const quality of [0.82, 0.68, 0.54, 0.42]) {
        const compressed = canvas.toDataURL("image/jpeg", quality);
        if (compressed.length <= 480_000) return compressed;
      }
      scale *= 0.75;
    }
    throw new Error("Image could not be compressed enough. Choose a smaller image.");
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

const ADMIN_SECTIONS: { id: AdminSection; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "leads", label: "Leads", icon: Mail },
  { id: "posts", label: "Blog posts", icon: BookOpen },
  { id: "pages", label: "Website pages", icon: FilePlus2 },
  { id: "content", label: "Page content", icon: FileText },
  { id: "seo", label: "SEO settings", icon: Search },
];

function isSeoReady(page: SiteContent["seo"][ContentTab]) {
  return (
    page.title.trim().length >= 30 &&
    page.title.trim().length <= 60 &&
    page.description.trim().length >= 120 &&
    page.description.trim().length <= 160 &&
    page.canonicalUrl.trim().startsWith("https://")
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatFieldLabel(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function toPostSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const createEmptyPage = (): ManagedPage => ({
  id: "",
  slug: "",
  title: "",
  description: "",
  image: "",
  body: "",
});

function blankLike(value: unknown): unknown {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, blankLike(item)]));
  }
  return "";
}

function ContentFieldEditor({
  label,
  value,
  onChange,
  root = false,
  fieldPath = label,
}: {
  label: string;
  value: unknown;
  onChange: (value: unknown) => void;
  root?: boolean;
  fieldPath?: string;
}) {
  if (Array.isArray(value)) {
    const content = (
      <div className="space-y-3 pt-3">
        {value.map((item, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">
                {formatFieldLabel(label)} {index + 1}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                disabled={value.length <= 1}
                onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
              >
                Remove
              </Button>
            </div>
            <ContentFieldEditor
              label={`${label} ${index + 1}`}
              fieldPath={`${fieldPath}.${index}`}
              value={item}
              onChange={(next) =>
                onChange(value.map((current, itemIndex) => (itemIndex === index ? next : current)))
              }
              root
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => onChange([...value, blankLike(value[0])])}
        >
          <Plus className="size-4" />
          Add {formatFieldLabel(label).replace(/s$/, "")}
        </Button>
      </div>
    );

    return (
      <details className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800">
          {formatFieldLabel(label)}
          <span className="ml-2 text-xs font-normal text-slate-500">{value.length} items</span>
        </summary>
        {content}
      </details>
    );
  }

  if (isRecord(value)) {
    const fields = Object.entries(value).map(([key, item]) => (
      <ContentFieldEditor
        key={key}
        label={key}
        fieldPath={`${fieldPath}.${key}`}
        value={item}
        onChange={(next) => onChange({ ...value, [key]: next })}
      />
    ));
    if (root) return <div className="grid gap-4 md:grid-cols-2">{fields}</div>;
    return (
      <details className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800">
          {formatFieldLabel(label)}
        </summary>
        <div className="mt-3 grid gap-4 md:grid-cols-2">{fields}</div>
      </details>
    );
  }

  const fieldId = `content-${fieldPath.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
        />
        {formatFieldLabel(label)}
      </label>
    );
  }
  if (typeof value === "number") {
    return (
      <label className="block text-sm font-medium text-slate-700" htmlFor={fieldId}>
        {formatFieldLabel(label)}
        <input
          id={fieldId}
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
        />
      </label>
    );
  }

  const text = typeof value === "string" ? value : "";
  const multiline =
    text.length > 110 || /body|description|lede|summary|content|message|paragraph/i.test(label);
  return (
    <label className="block text-sm font-medium text-slate-700" htmlFor={fieldId}>
      {formatFieldLabel(label)}
      {multiline ? (
        <textarea
          id={fieldId}
          value={text}
          onChange={(event) => onChange(event.target.value)}
          rows={3}
          className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-gold-deep"
        />
      ) : (
        <>
          <input
            id={fieldId}
            type="text"
            value={text}
            onChange={(event) => onChange(event.target.value)}
            className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
          />
          {/image/i.test(label) && (
            <SiteImage
              src={text}
              fallbackSrc={heroOffice}
              alt={`${formatFieldLabel(label)} preview`}
              className="mt-3 h-32 w-full rounded-lg object-cover"
            />
          )}
        </>
      )}
    </label>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [content, setContent] = useState<SiteContent>(() => getStoredSiteContent());
  const [activeTab, setActiveTab] = useState<ContentTab>("home");
  const [seoPage, setSeoPage] = useState<ContentTab>("home");
  const [postDraft, setPostDraft] = useState<BlogPost>(createEmptyPost);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isUploadingPostImage, setIsUploadingPostImage] = useState(false);
  const [managedPageDraft, setManagedPageDraft] = useState<ManagedPage>(createEmptyPage);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [seoDraft, setSeoDraft] = useState(() => getStoredSiteContent().seo.home);
  const [pageDraft, setPageDraft] = useState<SiteContent[ContentTab]>(
    () => getStoredSiteContent().home,
  );

  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadLeads();
    }
  }, []);

  useEffect(() => {
    setPageDraft(content[activeTab]);
  }, [activeTab, content]);

  useEffect(() => {
    setSeoDraft(content.seo[seoPage]);
  }, [seoPage, content.seo]);

  const loadLeads = () => {
    const storedLeads = localStorage.getItem("contact_leads");
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      loadLeads();
      toast.success("Welcome to Admin Panel");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
    setUsername("");
    setPassword("");
    toast.success("Logged out successfully");
  };

  const handleDeleteLead = (id: string) => {
    const updatedLeads = leads.filter((lead) => lead.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem("contact_leads", JSON.stringify(updatedLeads));
    toast.success("Lead deleted successfully");
  };

  const handleDeleteAll = () => {
    if (confirm("Are you sure you want to delete all leads? This cannot be undone.")) {
      setLeads([]);
      localStorage.removeItem("contact_leads");
      toast.success("All leads deleted");
    }
  };

  const handleSaveContent = () => {
    try {
      const updated = { ...content, [activeTab]: pageDraft };
      saveSiteContent(updated);
      setContent(updated);
      toast.success("Page content saved successfully");
    } catch (error) {
      console.error("Unable to save page content", error);
      toast.error("Page content could not be saved. Check browser storage and try again.");
    }
  };

  const handleReset = () => {
    const defaults = getDefaultSiteContent();
    const updated = { ...content, [activeTab]: defaults[activeTab] };
    try {
      saveSiteContent(updated);
      setContent(updated);
      setPageDraft(defaults[activeTab]);
      toast.success(
        `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} page reset to defaults`,
      );
    } catch (error) {
      console.error("Unable to reset page content", error);
      toast.error("Page content could not be reset. Check browser storage and try again.");
    }
  };

  const handleSaveSeo = () => {
    const updated = {
      ...content,
      seo: {
        ...content.seo,
        [seoPage]: seoDraft,
      },
    };
    try {
      saveSiteContent(updated);
      setContent(updated);
      toast.success(`${seoPage.charAt(0).toUpperCase() + seoPage.slice(1)} SEO settings saved`);
    } catch (error) {
      console.error("Unable to save SEO settings", error);
      toast.error("SEO settings could not be saved. Check browser storage and try again.");
    }
  };

  const handleSavePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const slug = toPostSlug(postDraft.slug || postDraft.title);
    if (
      !postDraft.title.trim() ||
      !postDraft.category.trim() ||
      !postDraft.summary.trim() ||
      !postDraft.body.trim()
    ) {
      toast.error("Add a title, category, summary, and post content before saving.");
      return;
    }
    if (!slug) {
      toast.error("Add a title with letters or numbers to create a post URL.");
      return;
    }
    if (content.blog.articles.some((post) => post.slug === slug && post.id !== editingPostId)) {
      toast.error("That post URL is already in use. Choose a different slug.");
      return;
    }

    const savedPost: BlogPost = {
      ...postDraft,
      id: editingPostId ?? `post-${Date.now()}`,
      slug,
      title: postDraft.title.trim(),
      category: postDraft.category.trim(),
      date: postDraft.date.trim(),
      readTime: postDraft.readTime.trim() || "5 min read",
      summary: postDraft.summary.trim(),
      body: postDraft.body.trim(),
      image: postDraft.image.trim(),
    };
    const articles = editingPostId
      ? content.blog.articles.map((post) => (post.id === editingPostId ? savedPost : post))
      : [savedPost, ...content.blog.articles];
    const updated = { ...content, blog: { ...content.blog, articles } };

    try {
      saveSiteContent(updated);
      setContent(updated);
      setEditingPostId(null);
      setPostDraft(createEmptyPost());
      toast.success(savedPost.status === "published" ? "Blog post published" : "Draft saved");
    } catch (error) {
      console.error("Unable to save blog post", error);
      toast.error(
        "Blog post could not be saved. Browser storage may be full; use a smaller image or an image URL and try again.",
      );
    }
  };

  const handlePostImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsUploadingPostImage(true);
    try {
      const image = await optimizeBlogImage(file);
      setPostDraft((current) => ({ ...current, image }));
      toast.success("Blog image selected");
    } catch (error) {
      console.error("Unable to process blog image", error);
      toast.error(
        error instanceof Error ? error.message : "Image could not be processed. Try another image.",
      );
    } finally {
      setIsUploadingPostImage(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setPostDraft({ ...post });
    setEditingPostId(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeletePost = (id: string) => {
    const post = content.blog.articles.find((item) => item.id === id);
    if (!post || !confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const updated = {
      ...content,
      blog: {
        ...content.blog,
        articles: content.blog.articles.filter((item) => item.id !== id),
      },
    };
    try {
      saveSiteContent(updated);
      setContent(updated);
      if (editingPostId === id) {
        setEditingPostId(null);
        setPostDraft(createEmptyPost());
      }
      toast.success("Blog post deleted");
    } catch (error) {
      console.error("Unable to delete blog post", error);
      toast.error("Blog post could not be deleted. Check browser storage and try again.");
    }
  };

  const handleCancelPostEdit = () => {
    setEditingPostId(null);
    setPostDraft(createEmptyPost());
  };

  const handleSaveManagedPage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const slug = toPostSlug(managedPageDraft.slug || managedPageDraft.title);
    if (
      !managedPageDraft.title.trim() ||
      !managedPageDraft.description.trim() ||
      !managedPageDraft.body.trim()
    ) {
      toast.error("Add a page title, description, and content before saving.");
      return;
    }
    if (!slug) {
      toast.error("Add a page title with letters or numbers to create a URL.");
      return;
    }
    if (RESERVED_PAGE_SLUGS.has(slug)) {
      toast.error("That URL is reserved for an existing website page.");
      return;
    }
    if (content.pages.some((page) => page.slug === slug && page.id !== editingPageId)) {
      toast.error("That page URL is already in use.");
      return;
    }

    const savedPage: ManagedPage = {
      ...managedPageDraft,
      id: editingPageId ?? `page-${Date.now()}`,
      slug,
      title: managedPageDraft.title.trim(),
      description: managedPageDraft.description.trim(),
      image: managedPageDraft.image.trim(),
      body: managedPageDraft.body.trim(),
    };
    const pages = editingPageId
      ? content.pages.map((page) => (page.id === editingPageId ? savedPage : page))
      : [savedPage, ...content.pages];
    const updated = { ...content, pages };
    try {
      saveSiteContent(updated);
      setContent(updated);
      setEditingPageId(null);
      setManagedPageDraft(createEmptyPage());
      toast.success(editingPageId ? "Page updated" : "Page created");
    } catch (error) {
      console.error("Unable to save page", error);
      toast.error("Page could not be saved. Check browser storage and try again.");
    }
  };

  const handleDeleteManagedPage = (id: string) => {
    const page = content.pages.find((item) => item.id === id);
    if (!page || !confirm(`Delete "${page.title}"? This cannot be undone.`)) return;
    const updated = { ...content, pages: content.pages.filter((item) => item.id !== id) };
    try {
      saveSiteContent(updated);
      setContent(updated);
      if (editingPageId === id) {
        setEditingPageId(null);
        setManagedPageDraft(createEmptyPage());
      }
      toast.success("Page deleted");
    } catch (error) {
      console.error("Unable to delete page", error);
      toast.error("Page could not be deleted. Check browser storage and try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-deep via-navy to-navy-deep flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/10 mb-4">
              <Lock className="size-6 text-gold-deep" />
            </div>
            <CardTitle className="text-2xl font-display">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="username">
                  Username
                </label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-gold-deep"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="password">
                  Password
                </label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-gold-deep"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gold-deep hover:bg-gold text-navy font-semibold"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
              Vansh Secure
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">Website Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate({ to: "/" })}
              variant="outline"
              className="hidden gap-2 sm:inline-flex"
            >
              View website
            </Button>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <Section className="py-0 sm:py-0">
        <div className="container-page grid min-h-[calc(100vh-76px)] gap-6 py-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:py-8">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-24">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Workspace
            </p>
            <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1" aria-label="Admin sections">
              {ADMIN_SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  aria-current={activeSection === id ? "page" : undefined}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors",
                    activeSection === id
                      ? "bg-navy text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")}
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
            <div className="mt-4 hidden rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-500 lg:block">
              Content and SEO updates are saved in this browser.
            </div>
          </aside>

          <main className="min-w-0 space-y-6">
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gold-deep">Dashboard</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                    Good to see you
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    A quick view of your website content, leads, and SEO health.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Managed pages", value: CONTENT_TABS.length, icon: FileText },
                    { label: "Contact leads", value: leads.length, icon: Mail },
                    {
                      label: "Published posts",
                      value: content.blog.articles.filter((post) => post.status === "published")
                        .length,
                      icon: BookOpen,
                    },
                    {
                      label: "SEO ready",
                      value: `${CONTENT_TABS.filter((page) => isSeoReady(content.seo[page])).length}/${CONTENT_TABS.length}`,
                      icon: Search,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <Card key={label} className="border-slate-200 shadow-sm">
                      <CardContent className="flex items-center justify-between p-5">
                        <div>
                          <p className="text-sm text-slate-500">{label}</p>
                          <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
                        </div>
                        <div className="flex size-11 items-center justify-center rounded-xl bg-gold/15 text-gold-deep">
                          <Icon className="size-5" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="grid gap-6 xl:grid-cols-2">
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>Quick actions</CardTitle>
                      <CardDescription>Go straight to the task you need.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                      <Button
                        onClick={() => setActiveSection("content")}
                        variant="outline"
                        className="justify-start gap-2"
                      >
                        <FileText className="size-4" /> Edit page content
                      </Button>
                      <Button
                        onClick={() => setActiveSection("seo")}
                        variant="outline"
                        className="justify-start gap-2"
                      >
                        <Search className="size-4" /> Improve SEO
                      </Button>
                      <Button
                        onClick={() => setActiveSection("leads")}
                        variant="outline"
                        className="justify-start gap-2"
                      >
                        <Mail className="size-4" /> View contact leads
                      </Button>
                      <Button
                        onClick={() => {
                          handleCancelPostEdit();
                          setActiveSection("posts");
                        }}
                        variant="outline"
                        className="justify-start gap-2"
                      >
                        <Plus className="size-4" /> Create blog post
                      </Button>
                      <Button
                        onClick={() => navigate({ to: "/" })}
                        variant="outline"
                        className="justify-start gap-2"
                      >
                        View live website
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>SEO health by page</CardTitle>
                      <CardDescription>
                        Title, description, and canonical URL checks.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {CONTENT_TABS.map((page) => {
                        const ready = isSeoReady(content.seo[page]);
                        return (
                          <button
                            key={page}
                            type="button"
                            onClick={() => {
                              setSeoPage(page);
                              setActiveSection("seo");
                            }}
                            className="flex w-full items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 text-left hover:bg-slate-50"
                          >
                            <span className="text-sm font-medium capitalize text-slate-700">
                              {page}
                            </span>
                            <span
                              className={`flex items-center gap-1.5 text-xs font-medium ${ready ? "text-emerald-700" : "text-amber-700"}`}
                            >
                              {ready ? (
                                <CheckCircle2 className="size-4" />
                              ) : (
                                <AlertCircle className="size-4" />
                              )}
                              {ready ? "Ready" : "Needs attention"}
                            </span>
                          </button>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === "seo" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-gold/10 text-gold-deep">
                      <Search className="size-5" />
                    </div>
                    <div>
                      <CardTitle>SEO Dashboard</CardTitle>
                      <CardDescription>
                        Review and manage search appearance for your editable pages.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {CONTENT_TABS.map((page) => {
                      const pageSeo = content.seo[page];
                      const ready = isSeoReady(pageSeo);
                      return (
                        <div
                          key={page}
                          className="rounded-xl border border-border bg-background p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold capitalize text-navy">{page}</p>
                            {ready ? (
                              <CheckCircle2
                                className="size-4 text-emerald-600"
                                aria-label="SEO fields look good"
                              />
                            ) : (
                              <AlertCircle
                                className="size-4 text-amber-600"
                                aria-label="SEO fields need attention"
                              />
                            )}
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Title {pageSeo.title.trim().length}/60 · Description{" "}
                            {pageSeo.description.trim().length}/160
                          </p>
                          <p
                            className={`mt-2 text-xs font-medium ${ready ? "text-emerald-700" : "text-amber-700"}`}
                          >
                            {ready ? "Ready for search" : "Needs optimization"}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid gap-6 border-t border-border pt-6 lg:grid-cols-[220px_1fr]">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-navy">Edit page SEO</p>
                      {CONTENT_TABS.map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setSeoPage(page)}
                          className={[
                            "w-full rounded-md border px-4 py-3 text-left text-sm font-medium capitalize transition-colors",
                            seoPage === page
                              ? "border-gold-deep bg-gold/10 text-navy"
                              : "border-border bg-card text-muted-foreground hover:border-gold/40",
                          ].join(" ")}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="seo-title" className="text-sm font-medium text-navy">
                          SEO title
                        </label>
                        <input
                          id="seo-title"
                          value={seoDraft.title}
                          onChange={(event) =>
                            setSeoDraft({ ...seoDraft, title: event.target.value })
                          }
                          maxLength={70}
                          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold-deep"
                        />
                        <p
                          className={`mt-1 text-xs ${seoDraft.title.trim().length >= 30 && seoDraft.title.trim().length <= 60 ? "text-emerald-700" : "text-amber-700"}`}
                        >
                          {seoDraft.title.trim().length}/60 characters recommended
                        </p>
                      </div>
                      <div>
                        <label htmlFor="seo-description" className="text-sm font-medium text-navy">
                          Meta description
                        </label>
                        <textarea
                          id="seo-description"
                          value={seoDraft.description}
                          onChange={(event) =>
                            setSeoDraft({ ...seoDraft, description: event.target.value })
                          }
                          rows={3}
                          maxLength={200}
                          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold-deep"
                        />
                        <p
                          className={`mt-1 text-xs ${seoDraft.description.trim().length >= 120 && seoDraft.description.trim().length <= 160 ? "text-emerald-700" : "text-amber-700"}`}
                        >
                          {seoDraft.description.trim().length}/160 characters recommended
                        </p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="seo-canonical" className="text-sm font-medium text-navy">
                            Canonical URL
                          </label>
                          <input
                            id="seo-canonical"
                            type="url"
                            value={seoDraft.canonicalUrl}
                            onChange={(event) =>
                              setSeoDraft({ ...seoDraft, canonicalUrl: event.target.value })
                            }
                            placeholder="https://example.com/page"
                            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold-deep"
                          />
                        </div>
                        <div>
                          <label htmlFor="seo-robots" className="text-sm font-medium text-navy">
                            Search indexing
                          </label>
                          <select
                            id="seo-robots"
                            value={seoDraft.robots}
                            onChange={(event) =>
                              setSeoDraft({
                                ...seoDraft,
                                robots: event.target.value as typeof seoDraft.robots,
                              })
                            }
                            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold-deep"
                          >
                            <option value="index,follow">Allow indexing</option>
                            <option value="noindex,follow">Hide from search results</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="seo-og-image" className="text-sm font-medium text-navy">
                          Social sharing image URL (Open Graph)
                        </label>
                        <input
                          id="seo-og-image"
                          type="url"
                          value={seoDraft.ogImage}
                          onChange={(event) =>
                            setSeoDraft({ ...seoDraft, ogImage: event.target.value })
                          }
                          placeholder="https://example.com/social-image.jpg"
                          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold-deep"
                        />
                      </div>
                      <div className="rounded-lg border border-border bg-muted/30 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Search preview
                        </p>
                        <p className="mt-2 truncate text-lg text-blue-800">
                          {seoDraft.title || "Your page title"}
                        </p>
                        <p className="truncate text-xs text-emerald-800">
                          {seoDraft.canonicalUrl || "Canonical URL not set"}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {seoDraft.description || "Your meta description will appear here."}
                        </p>
                      </div>
                      <Button
                        onClick={handleSaveSeo}
                        className="bg-gold-deep font-semibold text-navy hover:bg-gold"
                      >
                        Save SEO Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "leads" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Contact Form Submissions</CardTitle>
                      <CardDescription>Total leads: {leads.length}</CardDescription>
                    </div>
                    {leads.length > 0 && (
                      <Button
                        onClick={handleDeleteAll}
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                      >
                        <Trash2 className="size-4" />
                        Delete All
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {leads.length === 0 ? (
                    <div className="text-center py-12">
                      <Mail className="size-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No leads yet</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Contact form submissions will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leads.map((lead) => (
                            <TableRow key={lead.id}>
                              <TableCell className="whitespace-nowrap">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Calendar className="size-3" />
                                  {new Date(lead.timestamp).toLocaleString()}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{lead.name}</TableCell>
                              <TableCell>{lead.phone}</TableCell>
                              <TableCell>{lead.email}</TableCell>
                              <TableCell>{lead.interest}</TableCell>
                              <TableCell className="max-w-xs whitespace-pre-wrap">
                                {lead.message}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeSection === "posts" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gold-deep">Blog manager</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                      Blog posts
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Create drafts, publish posts, or update and remove existing articles.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelPostEdit}
                    className="gap-2"
                  >
                    <Plus className="size-4" /> New post
                  </Button>
                </div>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>{editingPostId ? "Edit blog post" : "Create a blog post"}</CardTitle>
                    <CardDescription>
                      Add article details and choose whether to save as a draft or publish it now.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSavePost} className="space-y-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                          Post title *
                          <input
                            required
                            value={postDraft.title}
                            onChange={(event) =>
                              setPostDraft((current) => ({
                                ...current,
                                title: event.target.value,
                                slug:
                                  !editingPostId || current.slug === toPostSlug(current.title)
                                    ? toPostSlug(event.target.value)
                                    : current.slug,
                              }))
                            }
                            placeholder="Write a clear article title"
                            className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                          />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                          URL slug *
                          <input
                            required
                            value={postDraft.slug}
                            onChange={(event) =>
                              setPostDraft((current) => ({
                                ...current,
                                slug: toPostSlug(event.target.value),
                              }))
                            }
                            placeholder="article-url-slug"
                            className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                          />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                          Category *
                          <input
                            required
                            value={postDraft.category}
                            onChange={(event) =>
                              setPostDraft((current) => ({
                                ...current,
                                category: event.target.value,
                              }))
                            }
                            placeholder="Mutual Funds"
                            className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                          />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                          Publish date
                          <input
                            value={postDraft.date}
                            onChange={(event) =>
                              setPostDraft((current) => ({ ...current, date: event.target.value }))
                            }
                            placeholder="13 October 2026"
                            className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                          />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                          Reading time
                          <input
                            value={postDraft.readTime}
                            onChange={(event) =>
                              setPostDraft((current) => ({
                                ...current,
                                readTime: event.target.value,
                              }))
                            }
                            placeholder="5 min read"
                            className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                          />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                          Article image URL or path
                          <input
                            type="text"
                            value={postDraft.image}
                            onChange={(event) =>
                              setPostDraft((current) => ({ ...current, image: event.target.value }))
                            }
                            placeholder="Image URL or local path (optional)"
                            className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                          />
                        </label>
                      </div>
                      <div className="flex flex-wrap items-end gap-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Or choose an image from your device
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handlePostImageUpload}
                            disabled={isUploadingPostImage}
                            className="mt-2 block w-full max-w-md cursor-pointer rounded-lg border border-input bg-white text-sm file:mr-4 file:rounded-l-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2.5 file:font-medium file:text-slate-700 hover:file:bg-slate-200 disabled:cursor-wait disabled:opacity-60"
                          />
                        </label>
                        {isUploadingPostImage && (
                          <span className="pb-2 text-sm text-slate-500">Preparing image…</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <SiteImage
                          src={postDraft.image}
                          fallbackSrc={
                            postDraft.category.toLowerCase().includes("insurance")
                              ? family
                              : consultation
                          }
                          alt={postDraft.title || "Blog post image preview"}
                          className="size-20 rounded-lg object-cover"
                        />
                        <p className="text-sm text-slate-500">
                          Image preview shown on the public blog and in this post list.
                        </p>
                      </div>
                      <label className="block text-sm font-medium text-slate-700">
                        Card summary *
                        <textarea
                          required
                          rows={3}
                          value={postDraft.summary}
                          onChange={(event) =>
                            setPostDraft((current) => ({ ...current, summary: event.target.value }))
                          }
                          placeholder="A short summary shown on the blog card"
                          className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-gold-deep"
                        />
                      </label>
                      <label className="block text-sm font-medium text-slate-700">
                        Full post *
                        <textarea
                          required
                          rows={10}
                          value={postDraft.body}
                          onChange={(event) =>
                            setPostDraft((current) => ({ ...current, body: event.target.value }))
                          }
                          placeholder="Write the complete article here. Separate paragraphs with a blank line."
                          className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-gold-deep"
                        />
                      </label>
                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                        <label className="text-sm font-medium text-slate-700">
                          Publication status
                          <select
                            value={postDraft.status}
                            onChange={(event) =>
                              setPostDraft((current) => ({
                                ...current,
                                status: event.target.value as BlogPost["status"],
                              }))
                            }
                            className="ml-3 rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none focus:border-gold-deep"
                          >
                            <option value="draft">Draft (not public)</option>
                            <option value="published">Published (visible on blog)</option>
                          </select>
                        </label>
                        <div className="flex gap-2">
                          {editingPostId && (
                            <Button type="button" variant="outline" onClick={handleCancelPostEdit}>
                              Cancel
                            </Button>
                          )}
                          <Button
                            type="submit"
                            className="bg-navy font-semibold text-white hover:bg-navy/90"
                          >
                            {postDraft.status === "published" ? "Save and publish" : "Save draft"}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>All posts</CardTitle>
                    <CardDescription>
                      {content.blog.articles.filter((post) => post.status === "published").length}{" "}
                      published ·{" "}
                      {content.blog.articles.filter((post) => post.status === "draft").length}{" "}
                      drafts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {content.blog.articles.length === 0 ? (
                      <p className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
                        No posts yet. Create your first post using the form above.
                      </p>
                    ) : (
                      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {content.blog.articles.map((post) => (
                          <article
                            key={post.id}
                            className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                          >
                            <SiteImage
                              src={post.image}
                              fallbackSrc={
                                post.category.toLowerCase().includes("insurance")
                                  ? family
                                  : consultation
                              }
                              alt={post.title}
                              loading="lazy"
                              className="h-48 w-full object-cover"
                            />
                            <div className="flex flex-1 flex-col p-4">
                              <div className="flex items-center justify-between gap-3">
                                <span className="truncate text-xs font-semibold uppercase tracking-wide text-gold-deep">
                                  {post.category}
                                </span>
                                <span
                                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                                    post.status === "published"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-amber-50 text-amber-700"
                                  }`}
                                >
                                  {post.status}
                                </span>
                              </div>
                              <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-slate-900">
                                {post.title}
                              </h3>
                              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">
                                {post.summary}
                              </p>
                              <p className="mt-3 text-xs text-slate-400">
                                {post.date} · {post.readTime}
                              </p>
                              <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                <span className="min-w-0 truncate text-xs text-slate-400">
                                  /blog/{post.slug}
                                </span>
                                <div className="flex shrink-0 gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditPost(post)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeletePost(post.id)}
                                    className="gap-1.5 border-red-200 text-destructive hover:bg-red-50 hover:text-destructive"
                                    aria-label={`Delete ${post.title}`}
                                  >
                                    <Trash2 className="size-4" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "pages" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingPageId ? "Edit website page" : "Create website page"}
                    </CardTitle>
                    <CardDescription>
                      Create, edit, and delete custom website pages. Built-in pages are protected;
                      edit Home, About, Services, and Blog from Page content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveManagedPage} className="space-y-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                          Page title *
                          <input
                            required
                            value={managedPageDraft.title}
                            onChange={(event) =>
                              setManagedPageDraft((current) => ({
                                ...current,
                                title: event.target.value,
                                slug:
                                  !editingPageId || current.slug === toPostSlug(current.title)
                                    ? toPostSlug(event.target.value)
                                    : current.slug,
                              }))
                            }
                            className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                          />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                          URL slug *
                          <input
                            required
                            value={managedPageDraft.slug}
                            onChange={(event) =>
                              setManagedPageDraft((current) => ({
                                ...current,
                                slug: toPostSlug(event.target.value),
                              }))
                            }
                            placeholder="your-page-url"
                            className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                          />
                        </label>
                      </div>
                      <label className="block text-sm font-medium text-slate-700">
                        Page description *
                        <textarea
                          required
                          rows={2}
                          value={managedPageDraft.description}
                          onChange={(event) =>
                            setManagedPageDraft((current) => ({
                              ...current,
                              description: event.target.value,
                            }))
                          }
                          className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                        />
                      </label>
                      <label className="block text-sm font-medium text-slate-700">
                        Hero image URL or path
                        <input
                          type="text"
                          value={managedPageDraft.image}
                          onChange={(event) =>
                            setManagedPageDraft((current) => ({
                              ...current,
                              image: event.target.value,
                            }))
                          }
                          placeholder="Optional image URL"
                          className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-deep"
                        />
                      </label>
                      <label className="block text-sm font-medium text-slate-700">
                        Page content *
                        <textarea
                          required
                          rows={8}
                          value={managedPageDraft.body}
                          onChange={(event) =>
                            setManagedPageDraft((current) => ({
                              ...current,
                              body: event.target.value,
                            }))
                          }
                          className="mt-2 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-gold-deep"
                        />
                      </label>
                      <div className="flex gap-2">
                        {editingPageId && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setEditingPageId(null);
                              setManagedPageDraft(createEmptyPage());
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className="bg-navy font-semibold text-white hover:bg-navy/90"
                        >
                          {editingPageId ? "Save page" : "Create page"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Website pages</CardTitle>
                    <CardDescription>
                      {content.pages.length} custom {content.pages.length === 1 ? "page" : "pages"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {content.pages.length === 0 ? (
                      <p className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
                        No custom pages yet. Create one above.
                      </p>
                    ) : (
                      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {content.pages.map((page) => (
                          <article
                            key={page.id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                          >
                            {page.image ? (
                              <SiteImage
                                src={page.image}
                                fallbackSrc={consultation}
                                alt={page.title}
                                className="h-40 w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-40 items-center justify-center bg-slate-100 text-slate-400">
                                <FileText className="size-10" />
                              </div>
                            )}
                            <div className="p-4">
                              <h3 className="font-semibold text-slate-900">{page.title}</h3>
                              <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                                {page.description}
                              </p>
                              <a
                                href={`/${page.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 inline-block text-xs font-medium text-gold-deep hover:underline"
                              >
                                View page
                              </a>
                              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                                <span className="truncate text-xs text-slate-400">
                                  /{page.slug}
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setManagedPageDraft({ ...page });
                                      setEditingPageId(page.id);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    aria-label={`Delete ${page.title}`}
                                    onClick={() => handleDeleteManagedPage(page.id)}
                                  >
                                    <Trash2 className="size-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "content" && (
              <Card>
                <CardHeader>
                  <CardTitle>Full Page Content Editor</CardTitle>
                  <CardDescription>
                    Choose a page, expand a section, then edit its text, images, cards, and calls to
                    action.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 xl:grid-cols-[180px_minmax(0,1fr)]">
                    <div className="grid h-fit grid-cols-2 gap-2 xl:grid-cols-1">
                      {CONTENT_TABS.map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTab(tab)}
                          className={[
                            "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium capitalize transition-colors",
                            activeTab === tab
                              ? "border-gold-deep bg-gold/10 text-navy"
                              : "border-border bg-card text-muted-foreground hover:border-gold/40",
                          ].join(" ")}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div className="min-w-0 space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold capitalize text-slate-900">
                            {activeTab} page
                          </h3>
                          <p className="text-sm text-slate-500">
                            Changes become visible on the website after saving.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button onClick={handleReset} variant="outline">
                            Reset this page
                          </Button>
                          <Button
                            onClick={handleSaveContent}
                            className="bg-navy font-semibold text-white hover:bg-navy/90"
                          >
                            Save page changes
                          </Button>
                        </div>
                      </div>
                      <ContentFieldEditor
                        label={activeTab}
                        value={pageDraft}
                        onChange={(value) => setPageDraft(value as SiteContent[ContentTab])}
                        root
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </Section>
    </div>
  );
}
