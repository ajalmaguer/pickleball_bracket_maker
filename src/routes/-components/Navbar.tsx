import { Link } from '@tanstack/react-router';
import { House } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="navbar-container" aria-label="Main navigation">
      <Link to="/" className="navbar-home" aria-label="Home">
        <House size={20} strokeWidth={2.25} aria-hidden="true" />
      </Link>
      <ul className="navbar-links">
        <li>
          <Link to="/8-players">8 players</Link>
        </li>
        <li>
          <Link to="/8-players-mixed">8 players mixed</Link>
        </li>
        <li>
          <Link to="/9-players">9 players</Link>
        </li>
        <li>
          <Link to="/12-players">12 players</Link>
        </li>
        <li>
          <Link to="/12-players-mixed">12 players mixed</Link>
        </li>
      </ul>
    </nav>
  );
}
