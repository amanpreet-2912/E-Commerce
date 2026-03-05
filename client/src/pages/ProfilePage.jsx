import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, User, Calendar, Award,FileCheck } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="h-40 bg-linear-to-r from-indigo-100 via-white to-amber-100" />

      <div className="max-w-4xl mx-auto px-6">
        <Card className="-mt-20 rounded-2xl shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-28 w-28 ring-4 ring-background shadow-md">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-3xl">
                    {user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-3xl font-bold">{user.name}</h2>

                  <p className="text-muted-foreground flex items-center gap-2 mt-2">
                    <Mail size={16} />
                    {user.email}
                  </p>

                  <span className="inline-block mt-3 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full capitalize font-medium">
                    {user.role}
                  </span>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg mb-5">
                Personal Information
              </h3>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <User size={16} />
                  Name
                </span>
                <span>{user.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </span>
                <span>{user.email}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg mb-5">
                Account Information
              </h3>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar size={16} />
                  Joined
                </span>

                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Award size={16} />
                  Role
                </span>
                <span className="capitalize">{user.role}</span>
              </div>
              {user.role=="seller" &&
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <FileCheck size={16} />
                 GSTIN
                </span>
                <span className="capitalize">{user.gstin}</span>
              </div>
              }
              {user.role=="transporter" &&
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <FileCheck size={16} />
                 Vehicle No.
                </span>
                <span className="capitalize">{user.gstin}</span>
              </div>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
