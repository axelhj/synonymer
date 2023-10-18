import Image from 'next/image'
import AddSynonym from '@/components/synonyms/add-synonym';
import FindSynonym from '@/components/synonyms/find-synonym';

export default function Home() {
  return (
    <main className="
      flex min-h-screen flex-col items-center
      justify-between p-24
      ">
      <div className="
        max-w-5xl w-full items-center justify-between
        font-mono text-sm lg:flex">
        <p className="
          fixed left-0 top-0 flex w-full justify-center
          border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6
          pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30
          dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border
          lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30
        ">
          Kolla upp dina synonymer här!
        </p>
        <AddSynonym />
        <FindSynonym />
      </div>


    </main>
  )
}
