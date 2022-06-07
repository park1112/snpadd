import { useEffect, useMemo, useReducer, useState } from 'react';
import ProductSelect from './ProductSelect';
import SelectItem from './SelectItem';
import React from 'react';

const ACTION_TYPES = {
  deposit: 'ddd',
  addItem: '품명을 선택합니다',
  endItemSelect: '모든아이템선택끝 새로운 아이템 추가 !',
};

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
      return {
        selectProduct: {
          count: 1,
          selects: [...state.selectProduct.selects, action.payload],
        },
      };

    default:
      return state;
  }
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

export default function AddProduct(selectProduct) {
  const [selectItem, dispatch] = useReducer(reducer, selectProduct);

  return (
    <>
      <ProductSelect
        product={product}
        dispatch={dispatch}
        ACTION_TYPES={ACTION_TYPES}
        selectItem={selectItem.selectProduct}
      />
      {selectItem.selectProduct ? (
        <SelectItem selectItems={selectItem} />
      ) : null}
    </>
  );
}
