'use client';
import Synonyms from '@/components/synonyms/synonyms';

export default function Home() {
  return (
    <main className="
      flex min-h-screen flex-col items-center
      justify-between p-24
      ">
      <div className="
        max-w-5xl w-full items-center justify-between">
        <Synonyms />
      </div>


    </main>
  )
}
