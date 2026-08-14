import { Link } from '@tanstack/react-router';

export function NotFoundPage() {
  return (
    <div>
      <div className="header">
        <h1 className="title">Page not found</h1>
      </div>
      <p className="description">
        The page you’re looking for doesn’t exist.
      </p>
      <Link to="/8-players">Go to the 8-player bracket</Link>
    </div>
  );
}
