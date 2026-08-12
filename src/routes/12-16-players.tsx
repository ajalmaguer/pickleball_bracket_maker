import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/12-16-players')({
  component: TwelveToSixteenPlayers,
});

function TwelveToSixteenPlayers() {
  return <div>12 - 16 players page works</div>;
}
