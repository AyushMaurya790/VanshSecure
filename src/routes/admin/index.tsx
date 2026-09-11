import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, LogOut, Mail, Phone, User, Calendar, MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ADMIN_CREDENTIALS } from "@/lib/admin-credentials";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  timestamp: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    // Check if already logged in
    const authStatus = sessionStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadLeads();
    }
  }, []);

  const loadLeads = () => {
    const storedLeads = localStorage.getItem("contact_leads");
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      loadLeads();
      toast.success("Welcome to Admin Panel");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
    setUsername("");
    setPassword("");
    toast.success("Logged out successfully");
  };

  const handleDeleteLead = (id: string) => {
    const updatedLeads = leads.filter((lead) => lead.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem("contact_leads", JSON.stringify(updatedLeads));
    toast.success("Lead deleted successfully");
  };

  const handleDeleteAll = () => {
    if (confirm("Are you sure you want to delete all leads? This cannot be undone.")) {
      setLeads([]);
      localStorage.removeItem("contact_leads");
      toast.success("All leads deleted");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-deep via-navy to-navy-deep flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/10 mb-4">
              <Lock className="size-6 text-gold-deep" />
            </div>
            <CardTitle className="text-2xl font-display">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="username">
                  Username
                </label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-gold-deep"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="password">
                  Password
                </label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-gold-deep"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-gold-deep hover:bg-gold text-navy font-semibold">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-deep">
      <div className="border-b border-navy/10 bg-card shadow-sm">
        <div className="container-page flex items-center justify-between py-4">
          <div>
            <h1 className="font-display text-2xl text-navy">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Contact Form Leads</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2"
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </div>

      <Section>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contact Form Submissions</CardTitle>
                  <CardDescription>
                    Total leads: {leads.length}
                  </CardDescription>
                </div>
                {leads.length > 0 && (
                  <Button
                    onClick={handleDeleteAll}
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                  >
                    <Trash2 className="size-4" />
                    Delete All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {leads.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="size-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No leads yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Contact form submissions will appear here
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="size-3" />
                              {new Date(lead.timestamp).toLocaleString("en-IN", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-2 text-sm hover:text-gold-deep transition-colors"
                            >
                              <Phone className="size-3" />
                              {lead.phone}
                            </a>
                          </TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${lead.email}`}
                              className="flex items-center gap-2 text-sm hover:text-gold-deep transition-colors"
                            >
                              <Mail className="size-3" />
                              {lead.email}
                            </a>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold-deep">
                              {lead.interest}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            {lead.message ? (
                              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MessageSquare className="size-3 mt-0.5 shrink-0" />
                                <span className="line-clamp-2">{lead.message}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground italic">No message</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => handleDeleteLead(lead.id)}
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
