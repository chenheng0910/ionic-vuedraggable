import pumpkin from '@/assets/images/pumpkin.png'
import ferrule from '@/assets/images/children.png'
import bbq from '@/assets/images/children1.png'
import rabbit from '@/assets/images/rabbit-bg.png'
import bird from '@/assets/images/bird.png'
import egg from '@/assets/images/egg.png'
import busCover from '@/assets/images/bus-cover1.png'
import chair from '@/assets/images/chair.png'
import honey from '@/assets/images/honey-bg.png'
import bear from '@/assets/images/bear.png'
import pig from '@/assets/images/pig-bg.png'
import flower from '@/assets/images/flower1.png'
import yumi from '@/assets/images/yumi.png'
import moneyPig from '@/assets/images/money-pig-box.png'
export interface Item {
  name: string;
  itemName: string;
  itemNameEn: string;
  icon: string;
  id: number;
  path: string;
}

const items: Item[] = [
  {
    name: '收南瓜',
    itemName: '收南瓜',
    itemNameEn: 'pumpkin',
    icon: pumpkin,
    id: 1,
    path: '/pumpkin'
  },
  {
    name: '套圈圈',
    itemName: '套圈圈',
    itemNameEn: 'ferrule',
    icon: ferrule,
    id: 2,
    path: '/ferrule'
  },
  {
    name: '做烤串',
    itemName: '做烤串',
    itemNameEn: 'barbecue',
    icon: bbq,
    id: 3,
    path: '/barbecue'
  },
  {
    name: '喂兔子',
    itemName: '喂兔子',
    itemNameEn: 'rabbit',
    icon: rabbit,
    id: 4,
    path: '/rabbit'
  },
  {
    name: '蛋宝宝找妈妈',
    itemName: '蛋宝宝找妈妈',
    itemNameEn: 'egg',
    icon: egg,
    id: 5,
    path: '/egg'
  },
  {
    name: '买蔬菜',
    itemName: '买蔬菜',
    itemNameEn: 'shopping',
    icon: yumi,
    id: 6,
    path: '/shopping'
  },
  {
    name: '停公交车',
    itemName: '停公交车',
    itemNameEn: 'bus',
    icon: busCover,
    id: 7,
    path: '/bus'
  },
  {
    name: '小鸟回家',
    itemName: '小鸟回家',
    itemNameEn: 'bird',
    icon: bird,
    id: 8,
    path: '/bird'
  },
  {
    name: '放椅子',
    itemName: '放椅子',
    itemNameEn: 'chair',
    icon: chair,
    id: 9,
    path: '/chair'
  },
  {
    name: '蜜蜂采蜜',
    itemName: '蜜蜂采蜜',
    itemNameEn: 'honey',
    icon: honey,
    id: 10,
    path: '/honey'
  },
  {
    name: '小熊投壶',
    itemName: '小熊投壶',
    itemNameEn: 'bears',
    icon: bear,
    id: 11,
    path: '/bear'
  },
  {
    name: '小猪造房子',
    itemName: '小猪造房子',
    itemNameEn: 'pig',
    icon: pig,
    id: 12,
    path: '/pig'
  },
  {
    name: '买花',
    itemName: '买花',
    itemNameEn: 'flower',
    icon: flower,
    id: 13,
    path: '/flower'
  },
  {
    name: '存钱罐',
    itemName: '存钱罐',
    itemNameEn: 'coins',
    icon: moneyPig,
    id: 14,
    path: '/money'
  },
];

export const getItems = () => items;

export const getItem = (id: number) => items.find(m => m.id === id);
