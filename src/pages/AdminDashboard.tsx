import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Trophy,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  LogOut,
  Menu,
  X,
  Save,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StudentResult {
  id: string;
  roll_number: string;
  student_name: string;
  father_name: string | null;
  exam_type: string;
  year: number;
  rank: number | null;
  score: string | null;
  percentile: number | null;
  college: string | null;
  photo_url: string | null;
  is_published: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("results");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<StudentResult | null>(null);
  const [saving, setSaving] = useState(false);

  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    roll_number: "",
    student_name: "",
    father_name: "",
    exam_type: "NEET",
    year: new Date().getFullYear(),
    rank: "",
    score: "",
    percentile: "",
    college: "",
    photo_url: "",
    is_published: false,
  });

  const fetchResults = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("student_results")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch results",
        variant: "destructive",
      });
    } else {
      setResults(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const resetForm = () => {
    setFormData({
      roll_number: "",
      student_name: "",
      father_name: "",
      exam_type: "NEET",
      year: new Date().getFullYear(),
      rank: "",
      score: "",
      percentile: "",
      college: "",
      photo_url: "",
      is_published: false,
    });
    setEditingResult(null);
  };

  const openEditDialog = (result: StudentResult) => {
    setEditingResult(result);
    setFormData({
      roll_number: result.roll_number,
      student_name: result.student_name,
      father_name: result.father_name || "",
      exam_type: result.exam_type,
      year: result.year,
      rank: result.rank?.toString() || "",
      score: result.score || "",
      percentile: result.percentile?.toString() || "",
      college: result.college || "",
      photo_url: result.photo_url || "",
      is_published: result.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      roll_number: formData.roll_number.trim(),
      student_name: formData.student_name.trim(),
      father_name: formData.father_name.trim() || null,
      exam_type: formData.exam_type,
      year: formData.year,
      rank: formData.rank ? parseInt(formData.rank) : null,
      score: formData.score.trim() || null,
      percentile: formData.percentile ? parseFloat(formData.percentile) : null,
      college: formData.college.trim() || null,
      photo_url: formData.photo_url.trim() || null,
      is_published: formData.is_published,
      created_by: user?.id,
    };

    if (editingResult) {
      const { error } = await supabase
        .from("student_results")
        .update(payload)
        .eq("id", editingResult.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update result",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Result updated successfully",
        });
        setIsDialogOpen(false);
        resetForm();
        fetchResults();
      }
    } else {
      const { error } = await supabase.from("student_results").insert([payload]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add result",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Result added successfully",
        });
        setIsDialogOpen(false);
        resetForm();
        fetchResults();
      }
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this result?")) return;

    const { error } = await supabase.from("student_results").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete result",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Result deleted successfully",
      });
      fetchResults();
    }
  };

  const togglePublish = async (result: StudentResult) => {
    const { error } = await supabase
      .from("student_results")
      .update({ is_published: !result.is_published })
      .eq("id", result.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: result.is_published ? "Result unpublished" : "Result published",
      });
      fetchResults();
    }
  };

  const filteredResults = results.filter(
    (r) =>
      r.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.roll_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "results", label: "Manage Results", icon: Trophy },
    { id: "users", label: "Users", icon: Users },
  ];

  // Stats
  const stats = {
    total: results.length,
    published: results.filter((r) => r.is_published).length,
    neet: results.filter((r) => r.exam_type === "NEET").length,
    jee: results.filter((r) => r.exam_type.includes("JEE")).length,
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Gurukul Classes Hajipur</title>
        <meta name="description" content="Admin dashboard for managing Gurukul Classes" />
      </Helmet>

      <div className="min-h-screen bg-muted flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="font-serif font-bold">Admin Panel</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
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
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-40">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-serif text-xl font-semibold">
              {menuItems.find((m) => m.id === activeTab)?.label}
            </h1>
            <div className="flex items-center gap-4">
              <a href="/" target="_blank" className="text-sm text-muted-foreground hover:text-primary">
                View Site →
              </a>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6">
            {activeTab === "overview" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.total}</p>
                      <p className="text-sm text-muted-foreground">Total Results</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.published}</p>
                      <p className="text-sm text-muted-foreground">Published</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.neet}</p>
                      <p className="text-sm text-muted-foreground">NEET Results</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.jee}</p>
                      <p className="text-sm text-muted-foreground">JEE Results</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "results" && (
              <div className="space-y-6">
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or roll number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) resetForm();
                  }}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Result
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingResult ? "Edit Result" : "Add New Result"}
                        </DialogTitle>
                        <DialogDescription>
                          Fill in the student's result details below.
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="roll_number">Roll Number *</Label>
                            <Input
                              id="roll_number"
                              value={formData.roll_number}
                              onChange={(e) =>
                                setFormData({ ...formData, roll_number: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="student_name">Student Name *</Label>
                            <Input
                              id="student_name"
                              value={formData.student_name}
                              onChange={(e) =>
                                setFormData({ ...formData, student_name: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="father_name">Father's Name</Label>
                            <Input
                              id="father_name"
                              value={formData.father_name}
                              onChange={(e) =>
                                setFormData({ ...formData, father_name: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="exam_type">Exam Type *</Label>
                            <Select
                              value={formData.exam_type}
                              onValueChange={(value) =>
                                setFormData({ ...formData, exam_type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="NEET">NEET</SelectItem>
                                <SelectItem value="JEE Main">JEE Main</SelectItem>
                                <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="year">Year *</Label>
                            <Input
                              id="year"
                              type="number"
                              value={formData.year}
                              onChange={(e) =>
                                setFormData({ ...formData, year: parseInt(e.target.value) })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rank">Rank (AIR)</Label>
                            <Input
                              id="rank"
                              type="number"
                              value={formData.rank}
                              onChange={(e) =>
                                setFormData({ ...formData, rank: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="score">Score</Label>
                            <Input
                              id="score"
                              value={formData.score}
                              onChange={(e) =>
                                setFormData({ ...formData, score: e.target.value })
                              }
                              placeholder="e.g., 705/720 or 98.5%ile"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="percentile">Percentile</Label>
                            <Input
                              id="percentile"
                              type="number"
                              step="0.01"
                              value={formData.percentile}
                              onChange={(e) =>
                                setFormData({ ...formData, percentile: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="college">College</Label>
                            <Input
                              id="college"
                              value={formData.college}
                              onChange={(e) =>
                                setFormData({ ...formData, college: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="photo_url">Photo URL</Label>
                          <Input
                            id="photo_url"
                            value={formData.photo_url}
                            onChange={(e) =>
                              setFormData({ ...formData, photo_url: e.target.value })
                            }
                            placeholder="https://..."
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="is_published"
                            checked={formData.is_published}
                            onChange={(e) =>
                              setFormData({ ...formData, is_published: e.target.checked })
                            }
                            className="w-4 h-4 rounded border-input"
                          />
                          <Label htmlFor="is_published" className="font-normal">
                            Publish immediately
                          </Label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={saving}>
                            {saving ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4 mr-2" />
                            )}
                            {editingResult ? "Update" : "Save"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Results Table */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  {loading ? (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : filteredResults.length === 0 ? (
                    <div className="text-center p-12">
                      <Trophy className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">No results found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Roll No.</TableHead>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Exam</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Rank</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredResults.map((result) => (
                            <TableRow key={result.id}>
                              <TableCell className="font-mono">
                                {result.roll_number}
                              </TableCell>
                              <TableCell className="font-medium">
                                {result.student_name}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                    result.exam_type === "NEET"
                                      ? "bg-green-500/10 text-green-600"
                                      : result.exam_type === "JEE Main"
                                      ? "bg-blue-500/10 text-blue-600"
                                      : "bg-amber-500/10 text-amber-600"
                                  }`}
                                >
                                  {result.exam_type}
                                </span>
                              </TableCell>
                              <TableCell>{result.year}</TableCell>
                              <TableCell>
                                {result.rank ? `AIR ${result.rank}` : "-"}
                              </TableCell>
                              <TableCell>
                                <button
                                  onClick={() => togglePublish(result)}
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                                    result.is_published
                                      ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                                  }`}
                                >
                                  {result.is_published ? (
                                    <>
                                      <Eye className="w-3 h-3" /> Published
                                    </>
                                  ) : (
                                    <>
                                      <EyeOff className="w-3 h-3" /> Draft
                                    </>
                                  )}
                                </button>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => openEditDialog(result)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(result.id)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="bg-card rounded-xl p-8 border border-border text-center">
                <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Management</h3>
                <p className="text-muted-foreground mb-4">
                  Coming soon. You'll be able to manage users and assign admin roles here.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
