import { CreateSimpleLineupCard, CreateAdvancedLineupCard } from '@/app/components';

export default function Home() {
  return (
    <div className="flex justify-center gap-8">
      <CreateSimpleLineupCard />
      <CreateAdvancedLineupCard />
    </div>
  );
}
