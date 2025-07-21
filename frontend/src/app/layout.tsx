import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { Sidebar } from '@/components/Sidebar';
import { authOptions } from '@/lib/auth';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from '@/components/ReactQueryProvider'; // ✅ new import

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WiFi Operator Dashboard',
  description: 'Manage your WiFi services efficiently',
  manifest: '/manifest.json',
  openGraph: {
    title: 'WiFi Operator Dashboard',
    description: 'Manage your WiFi services efficiently',
    url: 'https://your-domain.com',
    type: 'website',
  },
};

export function generateViewport() {
  return {
    themeColor: '#ffffff',
    width: 'device-width',
    initialScale: 1,
  };
}

type User = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
};

type Session = {
  user: User | null;
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as Session;
  const userRole = session?.user?.role ?? 'ADMIN';

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          {session?.user ? <Sidebar role={userRole} /> : null}
          <main className={session?.user ? 'ml-64 p-6' : 'p-6'}>
            {children}
          </main>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
