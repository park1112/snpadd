import { useEffect, useState } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import { signOut, useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import AddProduct from './productSelect/AddProduct';

const people = [
  { name: '하양상회', username: '@개인상회' },
  { name: '하양상회2', username: '@개인상회' },
  // More users...
];

const selectProduct = {
  items: [],
  weight: [],
  selects: [],
};

export default function AddCalender() {
  //여기서부터 파이어베이스 데이터 불러오기
  const [posts, setPosts] = useState([]);

  //   여기 폼 내용 추가
  const [name, setName] = useState('');
  const [idnumber, setIdNumber] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [bank, setBank] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [price, setPrice] = useState('');
  const [farAddress, setFarAddress] = useState('');
  //추가완료

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'product'), orderBy('구분')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  function data() {
    posts.forEach((doc) => {
      //   console.log(doc.data());
    });
  }
  data();

  //데이터 불러오기

  //데이터 저장하기
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    // 파이어베스 포스트에 추가 한다 !
    const docRef = await addDoc(collection(db, 'client'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      name: name,
      idnumber: idnumber,
      address: address,
      phone: phone,
      bank: bank,
      bankNumber: bankNumber,
      price: price,
      farAddress: farAddress,

      timestamp: serverTimestamp(),
    });

    // 이미지가 포스트에 바로 저장되니까 이거 날자별로 저장되게 하면된다 !
    // 그럼 저장하는것도 날자
    // const imageRef = ref(storage, `${lists.lists}/${docRef.id}/image`);
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

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
    setName('');
    setIdNumber('');
    setAddress('');
    setPhone('');
    setBank('');
    setBankNumber('');
    setPrice('');
    setFarAddress('');
    //폼테그
    setSelectedFile(null);
  };
  //데이터 저장하기

  return (
    <div className="col-span-12 sm:col-span-12">
      <div
        className={`border-b border-gray-700  space-x-3 overflow-y-scroll scrollbar-hide ${
          loading && 'opacity-60'
        }`}
      >
        <div className="mt-8 flex flex-col">
          <div className=" ">
            <div className="inline-block min-w-full py-2 align-middle ">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-white ">
                      일정등록 🌼
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      하루 일정을 등록해주세요
                    </p>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                      <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-300"
                      >
                        날짜
                      </label>
                      <input
                        type="text"
                        name="farAddress"
                        id="farAddress"
                        value={farAddress}
                        onChange={(e) => setFarAddress(e.target.value)}
                        className=" w-4/12 mt-1 block  border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-300"
                      >
                        입출고 구분
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>입고</option>
                        <option>출고</option>
                        <option>이고</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-300"
                      >
                        위치
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>합천유통</option>
                        <option>합천유통2공장</option>
                        <option>무안</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-300"
                      >
                        거래처 구분
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>개인농가</option>
                        <option>개인상회</option>
                        <option>도매시장</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-white"
                      >
                        이름(상호명)
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    {/* <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-300"
                >
                  상차지 주소
                </label>
                <input
                  type="text"
                  name="farAddress"
                  id="farAddress"
                  value={farAddress}
                  onChange={(e) => setFarAddress(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div> */}
                  </div>

                  <AddProduct
                    setFarAddress={setFarAddress}
                    selectProduct={selectProduct}
                  />
                  <div className="px-4 py-3  text-right sm:px-6">
                    <button
                      type="submit"
                      disabled={!name && !selectedFile}
                      onClick={sendPost}
                      className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
