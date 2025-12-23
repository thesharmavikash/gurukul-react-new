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
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string | null;
  is_published: boolean;
  created_at: string;
}

const categories = ["Events", "Classroom", "Lab", "Library", "Awards", "Celebrations", "Other"];

const GalleryManagement = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    category: "",
    is_published: false,
  });

  const fetchGallery = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch gallery", variant: "destructive" });
    } else {
      setGallery(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const resetForm = () => {
    setFormData({ title: "", image_url: "", category: "", is_published: false });
    setEditingItem(null);
  };

  const openEditDialog = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image_url: item.image_url,
      category: item.category || "",
      is_published: item.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `gallery/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(fileName, file);

    if (uploadError) {
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
    } else {
      const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);
      setFormData({ ...formData, image_url: data.publicUrl });
      toast({ title: "Success", description: "Image uploaded" });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: formData.title.trim(),
      image_url: formData.image_url.trim(),
      category: formData.category || null,
      is_published: formData.is_published,
      created_by: user?.id,
    };

    if (editingItem) {
      const { error } = await supabase.from("gallery").update(payload).eq("id", editingItem.id);
      if (error) {
        toast({ title: "Error", description: "Failed to update", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Gallery item updated" });
        setIsDialogOpen(false);
        resetForm();
        fetchGallery();
      }
    } else {
      const { error } = await supabase.from("gallery").insert([payload]);
      if (error) {
        toast({ title: "Error", description: "Failed to add", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Gallery item added" });
        setIsDialogOpen(false);
        resetForm();
        fetchGallery();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Gallery item removed" });
      fetchGallery();
    }
  };

  const togglePublish = async (item: GalleryItem) => {
    const { error } = await supabase
      .from("gallery")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    if (error) {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" });
    } else {
      toast({ title: "Success", description: item.is_published ? "Unpublished" : "Published" });
      fetchGallery();
    }
  };

  const filteredGallery = gallery.filter((g) =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search gallery..."
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
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Image" : "Add New Image"}</DialogTitle>
              <DialogDescription>Upload an image to the gallery.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Image *</Label>
                <div className="space-y-4">
                  {formData.image_url && (
                    <img src={formData.image_url} alt="Preview" className="w-full h-48 rounded-lg object-cover" />
                  )}
                  <Label htmlFor="gallery-upload" className="cursor-pointer block">
                    <div className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed rounded-lg hover:bg-muted">
                      {uploading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <ImageIcon className="w-6 h-6" />
                          <span>Click to upload image</span>
                        </>
                      )}
                    </div>
                  </Label>
                  <input
                    id="gallery-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
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
                <Button type="submit" disabled={saving || !formData.image_url}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingItem ? "Update" : "Add"} Image
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : filteredGallery.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No images found</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredGallery.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden group">
              <div className="relative aspect-video">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" onClick={() => togglePublish(item)}>
                    {item.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button size="icon" variant="secondary" onClick={() => openEditDialog(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs ${
                  item.is_published ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                }`}>
                  {item.is_published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-medium truncate">{item.title}</h3>
                {item.category && <p className="text-xs text-muted-foreground">{item.category}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
