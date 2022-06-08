import { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { signOut, useSession } from 'next-auth/react';
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

export default function useFirebase(collect, division) {
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
        query(collection(db, collect), orderBy(division, 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return posts;
}
