import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, MapPin, Calendar, Edit3, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardNavbar from "@/components/DashboardNavbar";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  apartment_number: string | null;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    apartment_number: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive"
        });
        return;
      }

      if (profileData) {
        setProfile(profileData);
        setFormData({
          full_name: profileData.full_name || "",
          phone: profileData.phone || "",
          apartment_number: profileData.apartment_number || ""
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        apartment_number: profile.apartment_number || ""
      });
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name || null,
          phone: formData.phone || null,
          apartment_number: formData.apartment_number || null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Error",
          description: "Failed to update profile.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });

      setIsEditing(false);
      fetchProfile(); // Refresh the data
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (name: string | null) => {
    if (!name) return "JD";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information and account settings
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={handleEdit} className="shrink-0">
                    <Edit3 className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Edit Profile</span>
                    <span className="sm:hidden">Edit</span>
                  </Button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="w-full sm:w-auto order-2 sm:order-1"
                      size="sm"
                    >
                      <X className="w-4 h-4 mr-1 sm:mr-2" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave} 
                      disabled={saving}
                      className="w-full sm:w-auto order-1 sm:order-2"
                      size="sm"
                    >
                      <Save className="w-4 h-4 mr-1 sm:mr-2" />
                      {saving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="text-lg">
                    {getInitials(profile?.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {profile?.full_name || "No name set"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Member since {profile ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Profile Details */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-md">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{profile?.full_name || "Not specified"}</span>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      type="tel"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-md">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{profile?.phone || "Not specified"}</span>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="apartment_number">Apartment Number</Label>
                  {isEditing ? (
                    <Input
                      id="apartment_number"
                      value={formData.apartment_number}
                      onChange={(e) => handleInputChange("apartment_number", e.target.value)}
                      placeholder="Enter your apartment number"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-md">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{profile?.apartment_number || "Not specified"}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Account Info */}
              <div className="grid gap-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Account Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-medium">
                      {profile ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-medium">
                      {profile ? new Date(profile.updated_at).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;