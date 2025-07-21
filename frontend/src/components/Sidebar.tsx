'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const adminLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'All Users', href: '/dashboard/all-users' },
    { name: 'Payments', href: '/dashboard/payments' },
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'Notifications', href: '/dashboard/notifications' },
];

const userLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Payment History', href: '/dashboard/payment-history' },
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'Next Payments', href: '/dashboard/next-payments' },
    { name: 'Notifications', href: '/dashboard/notifications' },
];

export function Sidebar({ role }: { role: 'ADMIN' | 'USER' }) {
    const pathname = usePathname();
    const links = role === 'ADMIN' ? adminLinks : userLinks;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white">
            <div className="p-4">
                <h1 className="text-2xl font-bold">WiFi Dashboard</h1>
                <nav className="mt-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'block py-2 px-4 rounded',
                                pathname === link.href ? 'bg-gray-700' : 'hover:bg-gray-700'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
}