import { CreateSimpleLineupCard, CreateAdvancedLineupCard } from '@/app/components';

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-8">
      <CreateSimpleLineupCard />
      <CreateAdvancedLineupCard />
    </div>
  );
}
