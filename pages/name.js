import { useReducer, useState } from 'react';
import React from 'react';

const ACTION_TYPES = {
  deposit: 'ddd',
  addItem: '품명을 선택합니다',
  endItemSelect: '모든아이템선택끝 새로운 아이템 추가 !',
};

const reducer = (state, action) => {
  console.log('리듀서실행!', state, action);
  switch (action.type) {
    case ACTION_TYPES.deposit:
      return state + action.payload;
    case ACTION_TYPES.wihdraw:
      return state - action.payload;
    //품명을 선택합니다.
    case ACTION_TYPES.addItem:
      const itemss = product.filter((num) => num.품명 == action.payload); //품명을 필터해서
      const objectItem = Object.assign({}, itemss); //품명을 새로 만든다
      return { items: objectItem }; //아이템에 추가한다 .

    //무게를 선택합니다.
    case ACTION_TYPES.endItemSelect:
      return { count: 1, selects: [...state.selects, action.payload] };

    default:
      return state;
  }
};

export default function name() {
  const selectProduct = {
    count: 0,
    items: [],
    weight: [],
    selects: [],
  };
  const [stu, dispatch] = useReducer(reducer, selectProduct);
  const [name, setName] = useState('');

  return (
    <>
      <div>
        <h1>출석부</h1>
        <p> 총 학생수 : {stu.count}</p>
        <input
          type="text"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch({ type: ACTION_TYPES.deposit, payload: { name } });
          }}
        >
          추가!!
        </button>
      </div>
    </>
  );
}
