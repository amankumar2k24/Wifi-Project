import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">WiFi Operator Dashboard</h1>
      <div className="space-x-4">
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="outline">Register</Button>
        </Link>
      </div>
    </div>
  );
}