import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/9-12-players')({
  component: NineToTwelvePlayers,
});

function NineToTwelvePlayers() {
  return <div>9 - 12 players page works</div>;
}
