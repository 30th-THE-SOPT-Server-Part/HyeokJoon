// 과제 조건
// 1. Member, Dinner interface 만들고 타입 지정하기
// 2. organize 내부 로직 채우기

interface Member {
  name: string;
  group: string;
}

interface Dinner {
  member: Member[];
  shuffle(array: Member[]): Member[];
  organize(array: Member[]): void;
}

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
      name: '박진수',
      group: 'ob',
    },
    {
      name: '공혁준',
      group: 'yb',
    },
  ],
  shuffle(array: Member[]): Member[] {
    array.sort(() => Math.random() - 0.5);

    return array;
  },
  organize(array: Member[]): void {
    this.shuffle(array);
    let ob, yb;
    let obFlag = false,
      ybFlag = false;
    for (let member of array) {
      if (!obFlag) {
        if (member.group === 'ob') {
          ob = member.name;
          obFlag = true;
        }
      }
      if (!ybFlag) {
        if (member.group === 'yb') {
          yb = member.name;
          ybFlag = true;
        }
      }
      if (obFlag && ybFlag) break;
    }

    console.log(`오늘의 저녁 식사 멤버는 ${ob}, ${yb}`);
  },
};

dinner.organize(dinner.member);
