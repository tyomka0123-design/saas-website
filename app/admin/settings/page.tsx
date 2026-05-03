import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Shield, Database, Bell, Lock } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure admin panel settings
        </p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <Shield className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Admin Access</CardTitle>
                <CardDescription>
                  Manage admin permissions and roles
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              To grant admin access to a user, update their role in the Supabase dashboard
              by changing the role field to &quot;admin&quot; in the profiles table.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Database className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Database</CardTitle>
                <CardDescription>
                  Supabase database configuration
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Database is managed through Supabase. Access the Supabase dashboard
              for direct database management, backups, and advanced configurations.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <Bell className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>
                  Email and notification settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure email notifications for new orders and status updates
              through your email service provider integration.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <Lock className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Security</CardTitle>
                <CardDescription>
                  Security and authentication settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Authentication is handled by Supabase Auth with Row Level Security (RLS)
              policies to ensure data protection and access control.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
