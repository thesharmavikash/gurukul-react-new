import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Loader2,
  Upload,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

interface SyllabusItem {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  exam_type: string;
  is_published: boolean;
  created_at: string;
}

const examTypes = ["NEET", "JEE Main", "JEE Advanced", "Board Exam", "Foundation", "Other"];

const SyllabusManagement = () => {
  const [syllabus, setSyllabus] = useState<SyllabusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SyllabusItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file_url: "",
    exam_type: "NEET",
    is_published: false,
  });

  const fetchSyllabus = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("syllabus")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch syllabus", variant: "destructive" });
    } else {
      setSyllabus(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const resetForm = () => {
    setFormData({ title: "", description: "", file_url: "", exam_type: "NEET", is_published: false });
    setEditingItem(null);
  };

  const openEditDialog = (item: SyllabusItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      file_url: item.file_url,
      exam_type: item.exam_type,
      is_published: item.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `syllabus/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(fileName, file);

    if (uploadError) {
      toast({ title: "Error", description: "Failed to upload file", variant: "destructive" });
    } else {
      const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);
      setFormData({ ...formData, file_url: data.publicUrl });
      toast({ title: "Success", description: "File uploaded" });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      file_url: formData.file_url.trim(),
      exam_type: formData.exam_type,
      is_published: formData.is_published,
      created_by: user?.id,
    };

    if (editingItem) {
      const { error } = await supabase.from("syllabus").update(payload).eq("id", editingItem.id);
      if (error) {
        toast({ title: "Error", description: "Failed to update", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Syllabus updated" });
        setIsDialogOpen(false);
        resetForm();
        fetchSyllabus();
      }
    } else {
      const { error } = await supabase.from("syllabus").insert([payload]);
      if (error) {
        toast({ title: "Error", description: "Failed to add", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Syllabus added" });
        setIsDialogOpen(false);
        resetForm();
        fetchSyllabus();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("syllabus").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Syllabus removed" });
      fetchSyllabus();
    }
  };

  const togglePublish = async (item: SyllabusItem) => {
    const { error } = await supabase
      .from("syllabus")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    if (error) {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" });
    } else {
      toast({ title: "Success", description: item.is_published ? "Unpublished" : "Published" });
      fetchSyllabus();
    }
  };

  const filteredSyllabus = syllabus.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search syllabus..."
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
              Add Syllabus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Syllabus" : "Add New Syllabus"}</DialogTitle>
              <DialogDescription>Upload a syllabus document.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g., NEET 2025 Physics Syllabus"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>File *</Label>
                <div className="space-y-2">
                  {formData.file_url && (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm truncate flex-1">{formData.file_url.split("/").pop()}</span>
                      <a href={formData.file_url} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                  <Label htmlFor="syllabus-upload" className="cursor-pointer block">
                    <div className="flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed rounded-lg hover:bg-muted">
                      {uploading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          <span>Click to upload file</span>
                        </>
                      )}
                    </div>
                  </Label>
                  <input
                    id="syllabus-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Exam Type *</Label>
                <Select
                  value={formData.exam_type}
                  onValueChange={(value) => setFormData({ ...formData, exam_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Button type="submit" disabled={saving || !formData.file_url}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingItem ? "Update" : "Add"} Syllabus
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
              <TableHead>Title</TableHead>
              <TableHead>Exam Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredSyllabus.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No syllabus found
                </TableCell>
              </TableRow>
            ) : (
              filteredSyllabus.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {item.exam_type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {item.is_published ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" asChild>
                        <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => togglePublish(item)}>
                        {item.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openEditDialog(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)}>
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

export default SyllabusManagement;
