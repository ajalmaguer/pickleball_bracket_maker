import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/5-8-players')({
  component: FiveToEightPlayers,
});

function FiveToEightPlayers() {
  return <div>hello world</div>;
}
