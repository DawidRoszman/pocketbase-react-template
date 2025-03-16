import Navbar from '@/components/navbar';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';

export const Route = createRootRoute({
  component: () => (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
