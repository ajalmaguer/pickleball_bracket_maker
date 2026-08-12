import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/4-players">4 players</Link>
        </li>
        <li>
          <Link to="/5-8-players">5 - 8 players</Link>
        </li>
        <li>
          <Link to="/5-8-players-mixed">5 - 8 players mixed</Link>
        </li>
        <li>
          <Link to="/9-12-players">9 - 12 players</Link>
        </li>
        <li>
          <Link to="/12-16-players">12 - 16 players</Link>
        </li>
      </ul>
    </div>
  );
}
