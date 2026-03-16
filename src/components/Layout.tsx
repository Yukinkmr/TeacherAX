import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#fafafa' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '240px' }}>
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#fafafa' }}>
          <div className="px-8 py-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
