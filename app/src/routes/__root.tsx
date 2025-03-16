import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider
      defaultTheme="light"
      storageKey="vite-ui-theme">
      <Toaster />
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
});
