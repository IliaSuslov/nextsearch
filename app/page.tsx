import { Search } from './components/Search';
import { ImagesBlock } from './components/ImagesBlock';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Производство И Внедрение Инновационных',
  description: 'Описание страницы для seo оптимизации',
}

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col px-4 md:px-[80px] ">
      <Search />
      <ImagesBlock />
    </main >
  )
}
