import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Trophy,
  Image,
  Download,
  BookOpen,
  LogOut,
  Menu,
  X,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

import FacultyManagement from "@/components/admin/FacultyManagement";
import GalleryManagement from "@/components/admin/GalleryManagement";
import DownloadsManagement from "@/components/admin/DownloadsManagement";
import SyllabusManagement from "@/components/admin/SyllabusManagement";
import ResultsManagement from "@/components/admin/ResultsManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ results: 0, faculty: 0, gallery: 0, downloads: 0, syllabus: 0 });

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const [resultsRes, facultyRes, galleryRes, downloadsRes, syllabusRes] = await Promise.all([
        supabase.from("student_results").select("id", { count: "exact", head: true }),
        supabase.from("faculty").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
        supabase.from("downloads").select("id", { count: "exact", head: true }),
        supabase.from("syllabus").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        results: resultsRes.count || 0,
        faculty: facultyRes.count || 0,
        gallery: galleryRes.count || 0,
        downloads: downloadsRes.count || 0,
        syllabus: syllabusRes.count || 0,
      });
    };
    fetchStats();
  }, [activeTab]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "results", label: "Results (JEE/NEET)", icon: Trophy },
    { id: "faculty", label: "Faculty", icon: Users },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "syllabus", label: "Syllabus", icon: BookOpen },
  ];

  const statCards = [
    { label: "Results", value: stats.results, icon: Trophy, color: "text-primary" },
    { label: "Faculty", value: stats.faculty, icon: Users, color: "text-blue-500" },
    { label: "Gallery", value: stats.gallery, icon: Image, color: "text-green-500" },
    { label: "Downloads", value: stats.downloads, icon: Download, color: "text-amber-500" },
    { label: "Syllabus", value: stats.syllabus, icon: BookOpen, color: "text-purple-500" },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Gurukul Classes Hajipur</title>
      </Helmet>

      <div className="min-h-screen bg-muted flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="font-serif font-bold">Admin Panel</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-40">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu className="w-6 h-6" /></button>
            <h1 className="font-serif text-xl font-semibold">{menuItems.find((m) => m.id === activeTab)?.label}</h1>
            <a href="/" target="_blank" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
              <Eye className="w-4 h-4" /> View Site
            </a>
          </header>

          <main className="flex-1 p-6">
            {activeTab === "overview" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {statCards.map((stat) => (
                  <div key={stat.label} className="bg-card rounded-xl p-6 border border-border">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "results" && <ResultsManagement />}
            {activeTab === "faculty" && <FacultyManagement />}
            {activeTab === "gallery" && <GalleryManagement />}
            {activeTab === "downloads" && <DownloadsManagement />}
            {activeTab === "syllabus" && <SyllabusManagement />}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
