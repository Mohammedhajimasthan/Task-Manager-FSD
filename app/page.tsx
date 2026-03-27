import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 px-6 py-12">
      <div className="glass p-10 max-w-4xl w-full text-center">
        <p className="inline-flex px-4 py-2 rounded-full text-xs font-medium bg-green-100 text-green-700 mb-6">SaaS 2.0 • Scalable • Secure</p>
        <h1 className="glow-text text-5xl md:text-6xl font-black mb-6">TaskMaster Pro</h1>
        <p className="text-slate-700 text-lg md:text-xl max-w-3xl mx-auto mb-8">Build a productive team workflow with workflow automation, real-time collaboration, and 360° task analytics.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register" className="btn-primary px-8 py-3 w-full sm:w-auto">Start Free Trial</Link>
          <Link href="/login" className="btn-secondary px-8 py-3 w-full sm:w-auto">Sign In</Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5 text-left">
            <h3 className="font-bold mb-2">Secure Auth</h3>
            <p className="text-sm text-slate-600">Password hashing, JWT sessions, and role-based access.</p>
          </div>
          <div className="card p-5 text-left">
            <h3 className="font-bold mb-2">Smart Analytics</h3>
            <p className="text-sm text-slate-600">Task completion analytics, charts, and KPI dashboards.</p>
          </div>
          <div className="card p-5 text-left">
            <h3 className="font-bold mb-2">Team Productivity</h3>
            <p className="text-sm text-slate-600">Real-time collaboraton with comments and notifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}