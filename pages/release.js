import Head from 'next/head';

import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { getProviders, getSession, useSession } from 'next-auth/react';
import Login from '../components/Login';
import Modal from '../components/Modal';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import CreateTodo from '../components/CreateTodo';

export default function Release({ providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  // 세션이 없으면 로그인 페이지로 간다 !
  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>Home / 출고 등록 🌼</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <CreateTodo />

        {/* <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        /> */}

        {isOpen && <Modal />}
      </main>
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
