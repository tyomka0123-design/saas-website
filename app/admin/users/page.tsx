import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Mail, Calendar, FileText } from 'lucide-react'

export default async function AdminUsersPage() {
  const supabase = await createClient()
  
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  
  // Get order counts for each user
  const userOrderCounts: Record<string, number> = {}
  if (users) {
    for (const user of users) {
      const { count } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      userOrderCounts[user.id] = count || 0
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Users</h1>
        <p className="text-muted-foreground mt-1">
          View and manage registered users
        </p>
      </div>

      {/* Users List */}
      {users && users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user.id} className="bg-card border-border hover:border-accent/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border ${
                    user.role === 'admin'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-accent/10 border-accent/30'
                  }`}>
                    <span className={`text-lg font-semibold ${
                      user.role === 'admin' ? 'text-red-400' : 'text-accent'
                    }`}>
                      {user.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">
                        {user.full_name || 'No name'}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.role === 'admin'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{userOrderCounts[user.id]} orders</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="py-16 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No users yet</h3>
            <p className="text-muted-foreground">
              Registered users will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
