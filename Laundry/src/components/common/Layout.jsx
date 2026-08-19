export default function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 text-white font-bold rounded-lg px-3 py-1.5 text-sm tracking-wide">
            DLR
          </div>
          <h1 className="font-semibold text-lg text-slate-900">Digital Laundry Register</h1>
        </div>

        {user && (
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-slate-600">
              {user.name} <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 ml-1 font-mono">{user.role}</span>
            </span>
            <button 
              onClick={onLogout}
              className="text-slate-500 hover:text-red-600 font-medium transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}