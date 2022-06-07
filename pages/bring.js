import Head from 'next/head';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { getProviders, getSession, useSession } from 'next-auth/react';
import Login from '../components/Login';
import Modal from '../components/Modal';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import Search from '../components/Search';
import BringAdd from '../components/BringAdd';

export default function Bring({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  // 세션이 없으면 로그인 페이지로 간다 !
  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>에스엔피 / 🔥입출고 등록⚡💊</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-full flex">
        {/* Sidebar 추가 */}
        <Sidebar />

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search 추가 */}
          <Search />
          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <BringAdd />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  );
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
