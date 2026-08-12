import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/4-players')({
  component: FourPlayers,
});

function FourPlayers() {
  return <div>4 players page works</div>;
}
