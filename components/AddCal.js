import { Fragment, useEffect, useReducer, useState } from 'react';
import { ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { Popover, Transition } from '@headlessui/react';
import AddProduct from './productSelect/AddProduct';
import ProductSelect from './productSelect/ProductSelect';
import SelectItem from './productSelect/SelectItem';
import useFirebase from '../hooks/useFirebase';
import { useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import { modalState } from '../atoms/modalAtom';
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  getDocs,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
} from '@firebase/firestore';
import { db } from '../firebase';
import Post from './Post';
import { useRouter } from 'next/router';

const steps = [
  { name: '에스엔피 일정', href: '#', status: 'complete' },
  { name: '일정등록', href: '#', status: 'current' },
  { name: '일정확인', href: '#', status: 'upcoming' },
];

const selectProduct = {
  selectProduct: {
    items: [],
    weight: [],
    selects: [],
  },
};

const product = [
  {
    이미지: '/onion.jpg',
    품명: '양파',
    weight: [
      {
        weight: '12kg',
        division: ['4줄', '5줄', '6줄', '7줄', '8줄'],
        부자제: ['바렛트', '원망', '유통철바렛트'],
        수량: [70, 80, 85],
      },
      {
        weight: '15kg',
        division: ['4줄', '5줄', '6줄', '7줄', '8줄'],
        부자제: ['바렛트', '원망', '유통철바렛트'],
        수량: [70, 75, 80],
      },
      {
        weight: '20kg',
        division: ['4줄', '5줄', '6줄', '7줄', '8줄'],
        부자제: ['바렛트', '원망', '유통철바렛트'],
        수량: [40, 45, 50],
      },
    ],

    부자제: ['바렛트', '원망', '유통철바렛트'],
  },
  {
    이미지: '/garlic.jpg',
    품명: '마늘',
    weight: [
      { weight: '12222kg', division: ['4줄', '5줄', '6줄', '7줄', '8줄'] },
      { weight: '11115kg', division: ['4줄', '5줄', '6줄', '7줄', '8줄'] },
      { weight: '20kg', division: ['4줄', '5줄', '6줄', '7줄', '8줄'] },
    ],

    부자제: ['바렛트', '원망', '유통철바렛트'],
  },
  {
    이미지: '/potato.jpg',
    품명: '감자',
    weight: [
      { weight: '123kg', 구분: ['4줄', '5줄', '6줄', '7줄', '8줄'] },
      { weight: '154kg', 구분: ['4줄', '5줄', '6줄', '7줄', '8줄'] },
      { weight: '20kg', 구분: ['4줄', '5줄', '6줄', '7줄', '8줄'] },
    ],
    구분: ['5줄', '6줄', '7줄', '8줄'],
    부자제: ['바렛트', '원망', '유통철바렛트'],
  },
  {
    이미지: '/potato.jpg',
    품명: '감자 마늘',
    weight: [
      { weight: '152kg', division: ['4줄', '5줄', '6줄', '7줄', '8줄'] },
      { weight: '15kg', division: ['4줄', '5줄', '6줄', '7줄', '8줄'] },
      { weight: '20kg', division: ['4줄', '5줄', '6줄', '7줄', '8줄'] },
    ],

    부자제: ['바렛트', '원망', '유통철바렛트'],
  },
];
//추가
const ACTION_TYPES = {
  deposit: 'ddd',
  addItem: '품명을 선택합니다',
  endItemSelect: '모든아이템선택끝 새로운 아이템 추가 !',
  clean: '모든 품목을 삭제한다.',
};

// const inAndOut = {
//   inAndOut: ['입고', '출고', '이고'],
//   storageAddress: ['합천유통1공장', '합천유통2공장', '무안평화농산'],
//   client: ['작업팀', '개인상회', '법인', '유통시장'],
// };

const reducer = (state, action) => {
  switch (action.type) {
    // case ACTION_TYPES.deposit:
    //   return state + action.payload;
    // case ACTION_TYPES.wihdraw:
    //   return state - action.payload;
    //품명을 선택합니다.
    case ACTION_TYPES.addItem:
      const itemss = product.filter((num) => num.품명 == action.payload); //품명을 필터해서
      const objectItem = Object.assign({}, itemss); //품명을 새로 만든다
      return {
        selectProduct: {
          selects: [...state.selectProduct.selects],
          items: objectItem,
        },
      };

    //무게를 선택합니다.
    case ACTION_TYPES.endItemSelect:
      console.log(action);
      return {
        selectProduct: {
          count: 1,
          selects: [...state.selectProduct.selects, action.payload],
        },
      };

    case ACTION_TYPES.clean:
      return {
        selectProduct: action.payload.selectProduct,
      };

    default:
      return state;
  }
};

//추가 끝

export default function AddCal(datadb, clientdb) {
  const router = useRouter();
  const [selectItem, dispatch] = useReducer(reducer, selectProduct);
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  const [bgimage, setBgimage] = useState('');
  const [fitmentCount, setFitmentCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  // 불러오는 선택창
  const [inAndOut, setInAndOut] = useState([]);
  const [useclient, setUseClient] = useState([]);

  // 작성글 입력
  const [inand, setInand] = useState('');
  const [cli, setCli] = useState('');
  const [stora, setStora] = useState('');
  const [cliName, setCliName] = useState('');

  console.log(selectItem);
  console.log(cli);
  console.log(stora);
  // console.log(selectItem.selectProduct.select);

  useEffect(() => {
    const fetch = fetchUsers();
    const client = getMyPosts();
    fetch.then(
      (result) => setInAndOut(result[0]),
      (error) => console.log(error)
    );
    client.then(
      (result) => setUseClient(result[0]),
      (error) => console.log(error)
    );
  }, [db]);

  // 데이터 받아오기
  const fetchUsers = async () => {
    // ... try, catch 생략
    const usersCollectionRef = collection(db, 'inandout'); // 참조
    const userSnap = await getDocs(usersCollectionRef); // 데이터 스냅 받아오기 - 비동기처리
    const data = userSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  };

  // 작업팀 받아오기
  const getMyPosts = async () => {
    const posts = await db
      .collection('client')
      .where('name', '==', '작업팀')
      .get();
    console.log(posts.docs.map((doc) => doc.data()));
  };

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    // 파이어베스 포스트에 추가 한다 !
    const docRef = await addDoc(collection(db, 'calendar'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      inAndOut: inand,
      storageAddress: stora,
      client: cli,
      selects: [...selectItem.selectProduct.selects],
      timestamp: serverTimestamp(),
    });

    // 이미지가 포스트에 바로 저장되니까 이거 날자별로 저장되게 하면된다 !
    // 그럼 저장하는것도 날자
    // const imageRef = ref(storage, `${lists.lists}/${docRef.id}/image`);
    // const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // 이미지 저장
    // 선택한 파일이 있으면 ?
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        // 업로드 한다 포스트에 image를 추가한다 !
        await updateDoc(doc(db, `${lists.lists}`, docRef.id), {
          image: downloadURL,
        });
      });
    }

    // 모든것은 완료후 모두 초기화 해서 다음글을 작성할수 있게 한다 .
    setLoading(false);
    //초기화 폼테그
    setInand('');
    setCli('');
    setStora('');
    setCliName('');
    setFitmentCount(0);
    setTotalCount(0);
    setBgimage('');

    //폼테그
    setSelectedFile(null);
    dispatch({
      type: ACTION_TYPES.clean,
      payload: selectProduct,
    });
    router.push('/addcalendar');
  };

  // 여기 이상한것이다 !

  // const countAdd = () => {
  //   selectItem.selectProduct.selects.map((product) => (

  //       <img
  //         src={bgimage}
  //         className="flex-none w-20 h-20 rounded-md object-center object-cover"
  //       />
  //       <div className="flex-auto space-y-1">
  //         <h3>{product.name}</h3>
  //         <p className="text-gray-500">{product.weight}</p>
  //         <p className="text-gray-500">{product.division}</p>
  //       </div>
  //       <p className="flex-none text-base font-medium">
  //         {product.fitment}:{product.count}
  //       </p>
  //       <p className="flex-none text-base font-medium">
  //         {product.fitment === '바렛트' ||
  //         product.fitment === '유통철바렛트'
  //           ? `X ${product.fitmentCount} P `

  //   setFitmentCount();
  //   setTotalCount();
  // };

  return (
    <div className="bg-white ">
      {/* Background color split screen for large screens */}

      <div
        className="hidden lg:block  top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-gray-50 -mr-10 "
        aria-hidden="true"
      />

      <header className="relative bg-white border-b border-gray-200 text-sm font-medium text-gray-700">
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-end sm:justify-center">
            <nav aria-label="Progress" className="hidden sm:block">
              <ol role="list" className="flex space-x-4">
                {steps.map((step, stepIdx) => (
                  <li key={step.name} className="flex items-center">
                    {step.status === 'current' ? (
                      <a
                        href={step.href}
                        aria-current="page"
                        className="text-indigo-600"
                      >
                        {step.name}
                      </a>
                    ) : (
                      <a href={step.href}>{step.name}</a>
                    )}

                    {stepIdx !== steps.length - 1 ? (
                      <ChevronRightIcon
                        className="w-5 h-5 text-gray-300 ml-4"
                        aria-hidden="true"
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="sm:hidden">Step 2 of 4</p>
          </div>
        </div>
      </header>

      <main className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48">
        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 pt-4 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2"
        >
          <div className="max-w-lg mx-auto lg:max-w-none">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              추가된 품목
            </h2>

            <ul
              role="list"
              className="text-sm font-medium text-gray-900 divide-y divide-gray-200"
            >
              {selectItem.selectProduct
                ? selectItem.selectProduct.selects.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-start py-3 space-x-4"
                    >
                      <img
                        src={bgimage}
                        className="flex-none w-20 h-20 rounded-md object-center object-cover"
                      />
                      <div className="flex-auto space-y-1">
                        <h3>{product.name}</h3>
                        <p className="text-gray-500">{product.weight}</p>
                        <p className="text-gray-500">{product.division}</p>
                      </div>
                      <p className="flex-none text-base font-medium">
                        {product.fitment}:{product.count}
                      </p>
                      <p className="flex-none text-base font-medium">
                        {product.fitment === '바렛트' ||
                        product.fitment === '유통철바렛트'
                          ? `X ${product.fitmentCount} P `
                          : null}
                      </p>
                    </li>
                  ))
                : null}
            </ul>

            <dl className="hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">바렛트수량</dt>
                <dd>{fitmentCount}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">총 수량</dt>
                <dd className="text-base">{totalCount}</dd>
              </div>
            </dl>
            <div className="mt- pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
              <button
                onClick={sendPost}
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:ml-6 sm:order-last sm:w-auto"
              >
                입고완료
              </button>
              <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                추가된 품목을 확인해주세요.
              </p>
            </div>

            <Popover className="fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
              <div className="relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6">
                <div className="max-w-lg mx-auto">
                  <Popover.Button className="w-full flex items-center py-6 font-medium">
                    <span className="text-base mr-auto">Total 수량</span>
                    <span className="text-base mr-2">{totalCount}</span>
                    <ChevronUpIcon
                      className="w-5 h-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  >
                    <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                      <dl className="max-w-lg mx-auto space-y-6">
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Subtotal</dt>
                          <dd>$320.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Shipping</dt>
                          <dd>$15.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Taxes</dt>
                          <dd>$26.80</dd>
                        </div>
                      </dl>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </Popover>
          </div>
        </section>

        <form className="pt-4 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1">
          <div className="max-w-4lg mx-auto lg:max-w-none ">
            <section aria-labelledby="contact-info-heading">
              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900 mb-4"
              >
                입출고 등록 💊 🇰🇷
              </h2>
              <div className="mt-6 grid grid-cols-4 sm:grid-cols-4 gap-y-6 gap-x-4">
                <div className="col-span-2 sm:col-span-2 lg:col-span-2 mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    입출고 구분
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={
                      inAndOut.inAndOut ? inAndOut.inAndOut[0] : null
                    }
                    onChange={(e) => setInand(e.target.value)}
                  >
                    {inAndOut.inAndOut
                      ? inAndOut.inAndOut.map((inAndOut) => {
                          return <option>{inAndOut}</option>;
                        })
                      : null}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    창고 위치
                  </label>
                  <select
                    id="location"
                    name="location"
                    onChange={(e) => setCli(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={
                      inAndOut.storageAddress
                        ? inAndOut.storageAddress[0]
                        : null
                    }
                  >
                    {inAndOut.storageAddress
                      ? inAndOut.storageAddress.map((inAndOut) => {
                          return <option>{inAndOut}</option>;
                        })
                      : null}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-2 lg:col-span-2 mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    거래처 구분
                  </label>
                  <select
                    id="location"
                    name="location"
                    onChange={(e) => setStora(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={
                      inAndOut.inAndOut ? inAndOut.inAndOut[0] : null
                    }
                  >
                    {inAndOut.client
                      ? inAndOut.client.map((inAndOut) => {
                          return <option>{inAndOut}</option>;
                        })
                      : null}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    이름(상호명)
                  </label>
                  <input
                    onChange={(e) => setCliName(e.target.value)}
                    value={cliName}
                    type="text"
                    name="phone"
                    id="phone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </section>

            <section aria-labelledby="billing-heading" className="mt-10">
              <h2
                id="billing-heading"
                className="text-lg font-medium text-gray-900"
              >
                Billing information
              </h2>

              <ProductSelect
                product={product}
                dispatch={dispatch}
                ACTION_TYPES={ACTION_TYPES}
                selectItem={selectItem.selectProduct}
                bgimage={bgimage}
                setBgimage={setBgimage}
                // countAdd={countAdd}
              />
              {selectItem.selectProduct ? (
                <SelectItem selectItems={selectItem} />
              ) : null}
            </section>
          </div>
        </form>
      </main>
    </div>
  );
}
