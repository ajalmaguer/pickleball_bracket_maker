import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div>
      <ul
        className="navbar-links"
        style={{ justifyContent: 'start', padding: 10 }}
      >
        <li>
          <Link to="/8-players">8 players</Link>
        </li>
        <li>
          <Link to="/8-players-mixed">8 players mixed</Link>
        </li>
        <li>
          <Link to="/12-players">12 players</Link>
        </li>
        <li>
          <Link to="/12-players-mixed">12 players mixed</Link>
        </li>
      </ul>
    </div>
  );
}
