import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Loader2,
  Upload,
  Link,
  Clipboard,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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

const ResultsManagement = () => {
  const [results, setResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<StudentResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoTab, setPhotoTab] = useState<string>("upload");
  const pasteAreaRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const { toast } = useToast();

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

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please select an image file", variant: "destructive" });
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `results/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(fileName, file);

    if (uploadError) {
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
    } else {
      const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);
      setFormData({ ...formData, photo_url: data.publicUrl });
      toast({ title: "Success", description: "Image uploaded" });
    }
    setUploading(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          await handleImageUpload(file);
          break;
        }
      }
    }
  };

  const clearPhoto = () => {
    setFormData({ ...formData, photo_url: "" });
  };

  const fetchResults = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("student_results")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch results", variant: "destructive" });
    } else {
      setResults(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

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
        toast({ title: "Error", description: "Failed to update result", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Result updated successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchResults();
      }
    } else {
      const { error } = await supabase.from("student_results").insert([payload]);

      if (error) {
        toast({ title: "Error", description: "Failed to add result", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Result added successfully" });
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
      toast({ title: "Error", description: "Failed to delete result", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Result deleted successfully" });
      fetchResults();
    }
  };

  const togglePublish = async (result: StudentResult) => {
    const { error } = await supabase
      .from("student_results")
      .update({ is_published: !result.is_published })
      .eq("id", result.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      toast({ title: "Success", description: result.is_published ? "Result unpublished" : "Result published" });
      fetchResults();
    }
  };

  const filteredResults = results.filter(
    (r) =>
      r.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.roll_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
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
              <DialogTitle>{editingResult ? "Edit Result" : "Add New Result"}</DialogTitle>
              <DialogDescription>Fill in the student's result details below.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roll_number">Roll Number *</Label>
                  <Input
                    id="roll_number"
                    value={formData.roll_number}
                    onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student_name">Student Name *</Label>
                  <Input
                    id="student_name"
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exam_type">Exam Type *</Label>
                  <Select
                    value={formData.exam_type}
                    onValueChange={(value) => setFormData({ ...formData, exam_type: value })}
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
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rank">Rank</Label>
                  <Input
                    id="rank"
                    type="number"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="score">Score</Label>
                  <Input
                    id="score"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    placeholder="e.g., 650/720"
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
                    onChange={(e) => setFormData({ ...formData, percentile: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College Admitted</Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Student Photo</Label>
                
                {formData.photo_url && (
                  <div className="relative inline-block mb-3">
                    <img 
                      src={formData.photo_url} 
                      alt="Student preview" 
                      className="w-24 h-24 rounded-lg object-cover border border-border"
                    />
                    <button
                      type="button"
                      onClick={clearPhoto}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <Tabs value={photoTab} onValueChange={setPhotoTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upload" className="text-xs">
                      <Upload className="w-3 h-3 mr-1" /> Upload
                    </TabsTrigger>
                    <TabsTrigger value="url" className="text-xs">
                      <Link className="w-3 h-3 mr-1" /> URL
                    </TabsTrigger>
                    <TabsTrigger value="paste" className="text-xs">
                      <Clipboard className="w-3 h-3 mr-1" /> Paste
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="mt-3">
                    <Label htmlFor="photo-upload" className="cursor-pointer block">
                      <div className="flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed rounded-lg hover:bg-muted transition-colors">
                        {uploading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Click to upload photo</span>
                          </>
                        )}
                      </div>
                    </Label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInputChange}
                      disabled={uploading}
                    />
                  </TabsContent>
                  
                  <TabsContent value="url" className="mt-3">
                    <Input
                      placeholder="Enter image URL (https://...)"
                      value={formData.photo_url}
                      onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    />
                  </TabsContent>
                  
                  <TabsContent value="paste" className="mt-3">
                    <div
                      ref={pasteAreaRef}
                      onPaste={handlePaste}
                      tabIndex={0}
                      className="flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed rounded-lg hover:bg-muted transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                      onClick={() => pasteAreaRef.current?.focus()}
                    >
                      {uploading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Clipboard className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Click here and paste image (Ctrl+V)</span>
                        </>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Publish immediately</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingResult ? "Update" : "Add"} Result
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredResults.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-mono">{result.roll_number}</TableCell>
                  <TableCell className="font-medium">{result.student_name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {result.exam_type}
                    </span>
                  </TableCell>
                  <TableCell>{result.year}</TableCell>
                  <TableCell>{result.rank || "-"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      result.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {result.is_published ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => togglePublish(result)}>
                        {result.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openEditDialog(result)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(result.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResultsManagement;
