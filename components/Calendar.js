import useTime from '../hooks/useTime';
import TodoList from './TodoList';
import { useRouter } from 'next/router';
import AddProduct from './productSelect/AddProduct';

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

export default function Calendar() {
  const router = useRouter();
  const time = useTime();
  console.log(time[0]);
  return (
    <div className="px-4 mt-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{time[0]}</h1>
          <p className="mt-2 text-sm text-gray-700">
            하루 일정을 등록하여 주세요 .
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => router.push('/addcalendar')}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            일정 추가
          </button>
        </div>
      </div>
      <TodoList people={people} />
      <div className="sm:flex-auto mt-5">
        <h1 className="text-xl font-semibold text-gray-900">{time[1]}</h1>
        <p className="mt-2 text-sm text-gray-700">
          하루 일정을 등록하여 주세요 .
        </p>
      </div>
      <TodoList people={people} />
      <div className="sm:flex-auto mt-5">
        <h1 className="text-xl font-semibold text-gray-900">{time[2]}</h1>
        <p className="mt-2 text-sm text-gray-700">
          하루 일정을 등록하여 주세요 .
        </p>
      </div>
      <TodoList people={people} />
    </div>
  );
}
