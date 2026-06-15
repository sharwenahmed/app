import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Download,
  RefreshCcw,
  Search,
  LogOut,
  Trash2,
  ExternalLink,
  Mail,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import api, { API, formatApiError } from "@/lib/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ADMIN } from "@/constants/testIds";

const STATUS_OPTIONS = [
  { v: "new", label: "New" },
  { v: "contacted", label: "Contacted" },
  { v: "qualified", label: "Qualified" },
  { v: "archived", label: "Archived" },
];

const INDUSTRY_OPTIONS = [
  "Restaurant / Cafe",
  "Barbershop",
  "Hair Salon",
  "Roofing Company",
  "Cleaning Company",
  "Other Service Business",
];

function StatusBadge({ status }) {
  const map = {
    new: "bg-purple-500/15 text-purple-200 ring-purple-400/30",
    contacted: "bg-sky-500/15 text-sky-200 ring-sky-400/30",
    qualified: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
    archived: "bg-white/10 text-white/55 ring-white/15",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] tracking-wide uppercase ring-1 ${
        map[status] || map.new
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, recent_7d: 0, by_status: {}, by_industry: {} });
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("all");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("adesigns_admin_user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("adesigns_admin_token");
    localStorage.removeItem("adesigns_admin_user");
    navigate("/admin/login", { replace: true });
  };

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = { limit: 500 };
      if (q) params.q = q;
      if (industry && industry !== "all") params.industry = industry;
      if (status && status !== "all") params.status = status;
      const [{ data: leadsData }, { data: statsData }] = await Promise.all([
        api.get("/admin/leads", { params }),
        api.get("/admin/leads/stats"),
      ]);
      setLeads(leadsData.leads || []);
      setStats(statsData);
    } catch (e) {
      if (e.response?.status === 401) {
        logout();
        return;
      }
      toast.error(formatApiError(e.response?.data?.detail) || "Failed to load leads.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, industry, status]);

  useEffect(() => {
    if (!localStorage.getItem("adesigns_admin_token")) {
      navigate("/admin/login", { replace: true });
      return;
    }
    fetchLeads();
  }, [fetchLeads, navigate]);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/admin/leads/${id}`, { status: newStatus });
      toast.success("Status updated.");
      fetchLeads();
    } catch (e) {
      toast.error(formatApiError(e.response?.data?.detail) || "Couldn't update status.");
    }
  };

  const removeLead = async (id) => {
    if (!window.confirm("Delete this lead permanently?")) return;
    try {
      await api.delete(`/admin/leads/${id}`);
      toast.success("Lead deleted.");
      setSelected(null);
      fetchLeads();
    } catch (e) {
      toast.error(formatApiError(e.response?.data?.detail) || "Couldn't delete.");
    }
  };

  const exportCsv = async () => {
    try {
      const token = localStorage.getItem("adesigns_admin_token");
      const res = await fetch(`${API}/admin/leads/export`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `a-designs-leads-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("CSV downloaded.");
    } catch {
      toast.error("Couldn't export. Please try again.");
    }
  };

  return (
    <div data-testid={ADMIN.dashboard} className="min-h-screen bg-[#06030f] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#06030f]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/55 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Site
            </Link>
            <span className="hidden sm:inline-block w-px h-4 bg-white/10" />
            <div className="font-display text-lg sm:text-xl font-medium truncate">
              A-Designs · Lead Center
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              data-testid={ADMIN.refresh}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs bg-white/5 hover:bg-white/10"
              aria-label="Refresh"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button
              onClick={exportCsv}
              data-testid={ADMIN.exportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-95"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button
              onClick={logout}
              data-testid={ADMIN.logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs bg-white/5 hover:bg-white/10"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Welcome row */}
        <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
          <div>
            <div className="text-xs tracking-eyebrow text-purple-300">Dashboard</div>
            <h1 className="font-display text-2xl sm:text-3xl font-medium">
              Hello{user?.name ? `, ${user.name.split(" ")[0]}` : ""} —{" "}
              <span className="text-white/55">here are the latest leads.</span>
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="rounded-2xl bg-[#0e0820] ring-1 ring-white/5 p-5">
            <div className="text-[10px] tracking-eyebrow text-white/45">Total Leads</div>
            <div data-testid={ADMIN.statTotal} className="mt-2 font-display text-3xl font-medium">
              {stats.total}
            </div>
          </div>
          <div className="rounded-2xl bg-[#0e0820] ring-1 ring-white/5 p-5">
            <div className="text-[10px] tracking-eyebrow text-white/45">Last 7 days</div>
            <div
              data-testid={ADMIN.statRecent}
              className="mt-2 font-display text-3xl font-medium text-purple-200"
            >
              {stats.recent_7d}
            </div>
          </div>
          <div className="rounded-2xl bg-[#0e0820] ring-1 ring-white/5 p-5">
            <div className="text-[10px] tracking-eyebrow text-white/45">New</div>
            <div className="mt-2 font-display text-3xl font-medium">
              {stats.by_status?.new || 0}
            </div>
          </div>
          <div className="rounded-2xl bg-[#0e0820] ring-1 ring-white/5 p-5">
            <div className="text-[10px] tracking-eyebrow text-white/45">Qualified</div>
            <div className="mt-2 font-display text-3xl font-medium text-emerald-200">
              {stats.by_status?.qualified || 0}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div className="relative sm:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              data-testid={ADMIN.searchInput}
              placeholder="Search name, business, email, message…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9 bg-[#0e0820] border-white/10 text-white placeholder:text-white/35 focus-visible:ring-purple-400"
            />
          </div>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger
              data-testid={ADMIN.filterIndustry}
              className="bg-[#0e0820] border-white/10 text-white focus:ring-purple-400"
            >
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent className="bg-[#120524] text-white border-white/10">
              <SelectItem value="all">All industries</SelectItem>
              {INDUSTRY_OPTIONS.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger
              data-testid={ADMIN.filterStatus}
              className="bg-[#0e0820] border-white/10 text-white focus:ring-purple-400"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#120524] text-white border-white/10">
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.v} value={s.v}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-[#0e0820] ring-1 ring-white/5 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-white/55">When</TableHead>
                <TableHead className="text-white/55">Lead</TableHead>
                <TableHead className="text-white/55">Industry</TableHead>
                <TableHead className="text-white/55">Status</TableHead>
                <TableHead className="text-white/55 w-[80px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-white/50">
                    Loading leads…
                  </TableCell>
                </TableRow>
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-white/55">
                    No leads yet. New submissions from the contact form will appear here.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((l) => (
                  <TableRow
                    key={l.id}
                    data-testid={ADMIN.leadRow(l.id)}
                    onClick={() => setSelected(l)}
                    className="border-white/5 hover:bg-white/[0.03] cursor-pointer"
                  >
                    <TableCell className="text-white/65 text-xs whitespace-nowrap">
                      {new Date(l.created_at).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{l.business_name}</div>
                      <div className="text-xs text-white/55">
                        {l.name} · {l.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-white/75">{l.industry}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          data-testid={ADMIN.leadStatus(l.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="outline-none"
                        >
                          <StatusBadge status={l.status} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#120524] text-white border-white/10">
                          {STATUS_OPTIONS.map((s) => (
                            <DropdownMenuItem
                              key={s.v}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(l.id, s.v);
                              }}
                            >
                              {s.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        data-testid={ADMIN.leadDelete(l.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLead(l.id);
                        }}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white/45 hover:text-red-300 hover:bg-red-500/10"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm grid place-items-end sm:place-items-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-[#0e0820] ring-1 ring-white/10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs tracking-eyebrow text-purple-300">
                  {selected.industry}
                </div>
                <h3 className="mt-1 font-display text-2xl font-medium">
                  {selected.business_name}
                </h3>
                <div className="text-sm text-white/65">{selected.name}</div>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              <a
                href={`mailto:${selected.email}`}
                className="rounded-2xl bg-white/5 p-4 flex items-center gap-3 hover:bg-white/10"
              >
                <Mail className="w-4 h-4 text-purple-200" />
                <span className="break-all">{selected.email}</span>
              </a>
              <a
                href={`tel:${selected.phone}`}
                className="rounded-2xl bg-white/5 p-4 flex items-center gap-3 hover:bg-white/10"
              >
                <Phone className="w-4 h-4 text-purple-200" />
                <span>{selected.phone}</span>
              </a>
              {selected.website_url && (
                <a
                  href={selected.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:col-span-2 rounded-2xl bg-white/5 p-4 flex items-center gap-3 hover:bg-white/10"
                >
                  <ExternalLink className="w-4 h-4 text-purple-200" />
                  <span className="truncate">{selected.website_url}</span>
                </a>
              )}
            </div>

            <div className="mt-5">
              <div className="text-[10px] tracking-eyebrow text-white/45 mb-1">Subject</div>
              <div className="text-sm text-white/80">{selected.subject}</div>
            </div>

            <div className="mt-4">
              <div className="text-[10px] tracking-eyebrow text-white/45 mb-1">Message</div>
              <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
                {selected.message}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => removeLead(selected.id)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs bg-red-500/10 ring-1 ring-red-400/30 text-red-200 hover:bg-red-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
              <button
                onClick={() => setSelected(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs bg-white/10 hover:bg-white/15"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
