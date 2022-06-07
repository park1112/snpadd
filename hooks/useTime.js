import { useState } from 'react';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

export default function useTime() {
  // format에 맞게 출력된다.
  //   const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  //   console.log(nowTime);
  // 출력 결과: 2020-08-23 12:54:30
  const nowTime = moment().format('YYYY년 MM월 DD일');
  const one = moment().add(1, 'days');
  const two = moment().add(2, 'days');
  const tomorrow = one.format('YYYY년 MM월 DD일');
  const twodays = two.format('YYYY년 MM월 DD일');

  const list = [nowTime, tomorrow, twodays];

  return list;
}
