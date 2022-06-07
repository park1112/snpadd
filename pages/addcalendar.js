import Head from 'next/head';

import Sidebar from '../components/Sidebar';

import { getProviders, getSession, useSession } from 'next-auth/react';
import Login from '../components/Login';
import Modal from '../components/Modal';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import AddProduct from '../components/productSelect/AddProduct';

import useTime from '../hooks/useTime';
import TodoList from '../components/TodoList';
import { useRouter } from 'next/router';
import AddCalender from '../components/AddCalender';

const people = [
  {
    name: '개인',
    place: '합천유통2공장',
    title: '하양상회',
    email: '중500개',
    role: '중짜리만 담아서 보내주세요',
  },
  {
    name: '시장',
    place: '합천유통1공장',
    title: '구리 인터넷청과',
    email: '15키로 7바렛',
    role: '6줄7줄 보내주세요',
  },
  // More people...
];

//

export default function Addcalender({ providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();
  const time = useTime();
  // 세션이 없으면 로그인 페이지로 간다 !
  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>Home / 일정추가🌼🧅🧄🥦☕🔥⚡💊❗❓🇰🇷</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[370px]">
          <div className="m-5">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-white">{time}</h1>
                <p className="mt-2 text-sm text-gray-700">
                  하루 일정을 등록하여 주세요 .
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => router.push('/addcalender')}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  일정 추가
                </button>
              </div>
            </div>
            <TodoList people={people} />
            <AddCalender />
          </div>
        </div>

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
