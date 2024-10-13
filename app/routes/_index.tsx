import type { MetaFunction } from '@remix-run/node';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to Language Tutor 🐘</h1>
      <Button>Get Started</Button>
    </div>
  );
}
