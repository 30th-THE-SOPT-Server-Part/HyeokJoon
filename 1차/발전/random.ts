// 과제 조건
// 1. Member, Dinner interface 만들고 타입 지정하기
// 2. organize 내부 로직 채우기

import { Dinner } from './interfaces/dinner';

const dinner: Dinner = {
  member: [
    {
      name: '채정아',
      group: 'ob',
    },
    {
      name: '김동재',
      group: 'yb',
    },
    {
      name: '강민재',
      group: 'yb',
    },
    {
      name: '김루희',
      group: 'ob',
    },
    {
      name: '남지윤',
      group: 'ob',
    },
    {
      name: '공혁준',
      group: 'yb',
    },
  ],
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);

    return array;
  },
  organize(array) {
    this.shuffle(array);

    let ob = array.find((x) => x.group === 'ob');
    let yb = array.find((x) => x.group === 'yb');

    console.log(`오늘의 저녁 식사 멤버는 ${ob!.name}, ${yb!.name}`);
  },
};

dinner.organize(dinner.member);
