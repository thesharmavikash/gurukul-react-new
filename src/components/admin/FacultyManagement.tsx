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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Faculty {
  id: string;
  name: string;
  photo_url: string | null;
  qualification: string | null;
  experience: string | null;
  subjects: string[] | null;
  about: string | null;
  is_published: boolean;
  created_at: string;
}

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    photo_url: "",
    qualification: "",
    experience: "",
    subjects: "",
    about: "",
    is_published: false,
  });

  const fetchFaculty = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("faculty")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch faculty",
        variant: "destructive",
      });
    } else {
      setFaculty(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      photo_url: "",
      qualification: "",
      experience: "",
      subjects: "",
      about: "",
      is_published: false,
    });
    setEditingFaculty(null);
  };

  const openEditDialog = (item: Faculty) => {
    setEditingFaculty(item);
    setFormData({
      name: item.name,
      photo_url: item.photo_url || "",
      qualification: item.qualification || "",
      experience: item.experience || "",
      subjects: item.subjects?.join(", ") || "",
      about: item.about || "",
      is_published: item.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `faculty/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(fileName, file);

    if (uploadError) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } else {
      const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);
      setFormData({ ...formData, photo_url: data.publicUrl });
      toast({ title: "Success", description: "Image uploaded" });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: formData.name.trim(),
      photo_url: formData.photo_url.trim() || null,
      qualification: formData.qualification.trim() || null,
      experience: formData.experience.trim() || null,
      subjects: formData.subjects.trim()
        ? formData.subjects.split(",").map((s) => s.trim())
        : null,
      about: formData.about.trim() || null,
      is_published: formData.is_published,
      created_by: user?.id,
    };

    if (editingFaculty) {
      const { error } = await supabase
        .from("faculty")
        .update(payload)
        .eq("id", editingFaculty.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Faculty updated" });
        setIsDialogOpen(false);
        resetForm();
        fetchFaculty();
      }
    } else {
      const { error } = await supabase.from("faculty").insert([payload]);

      if (error) {
        toast({ title: "Error", description: "Failed to add", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Faculty added" });
        setIsDialogOpen(false);
        resetForm();
        fetchFaculty();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete?")) return;

    const { error } = await supabase.from("faculty").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Faculty removed" });
      fetchFaculty();
    }
  };

  const togglePublish = async (item: Faculty) => {
    const { error } = await supabase
      .from("faculty")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" });
    } else {
      toast({ title: "Success", description: item.is_published ? "Unpublished" : "Published" });
      fetchFaculty();
    }
  };

  const filteredFaculty = faculty.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search faculty..."
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
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingFaculty ? "Edit Faculty" : "Add New Faculty"}</DialogTitle>
              <DialogDescription>Enter faculty details below.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Photo</Label>
                <div className="flex gap-4 items-center">
                  {formData.photo_url && (
                    <img src={formData.photo_url} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                  )}
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted">
                      <Upload className="w-4 h-4" />
                      {uploading ? "Uploading..." : "Upload Photo"}
                    </div>
                  </Label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g., M.Sc. Physics, B.Ed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 10+ years"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects (comma separated)</Label>
                <Input
                  id="subjects"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  placeholder="e.g., Physics, Mathematics"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  rows={4}
                  placeholder="Brief description about the faculty..."
                />
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
                  {editingFaculty ? "Update" : "Add"} Faculty
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
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Qualification</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredFaculty.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No faculty found
                </TableCell>
              </TableRow>
            ) : (
              filteredFaculty.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.photo_url ? (
                      <img src={item.photo_url} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.qualification || "-"}</TableCell>
                  <TableCell>{item.subjects?.join(", ") || "-"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {item.is_published ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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

export default FacultyManagement;
