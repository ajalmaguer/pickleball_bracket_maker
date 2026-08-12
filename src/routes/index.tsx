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
          <Link to="/5-8-players">5 - 8 players</Link>
        </li>
        <li>
          <Link to="/5-8-players-mixed">5 - 8 players mixed</Link>
        </li>
      </ul>
    </div>
  );
}
