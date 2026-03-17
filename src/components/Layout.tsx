import { useState } from 'react';
import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#fafafa' }}>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className="flex-1 flex flex-col min-w-0 transition-[margin-left] duration-300 ease-in-out"
        style={{ marginLeft: sidebarOpen ? '240px' : '0' }}
      >
        <Header
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#fafafa' }}>
          <div className="px-4 sm:px-8 py-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
