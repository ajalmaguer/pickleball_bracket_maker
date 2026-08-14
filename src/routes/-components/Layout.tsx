import { Outlet } from '@tanstack/react-router';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
      <footer className="site-footer">© 2026 AJ Almaguer</footer>
    </>
  );
}
