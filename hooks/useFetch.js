import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy } from '@firebase/firestore';
import { db } from '../firebase';
import Post from './Post';

export default function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [url]);
  return data;
}

// export function useFirebase(url) {
//   useEffect(
//     () =>
//       onSnapshot(
//         query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
//         (snapshot) => {
//           setPosts(snapshot.docs);
//         }
//       ),
//     [db]
//   );
// }
