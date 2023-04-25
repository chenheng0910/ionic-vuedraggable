<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>买花</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" class="ion-padding">
      <div class="top-box">
        <draggable
            class="list-group result-box"
            :list="originData"
            group="vegetable"
            itemKey="id"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              <img alt="" :src="element.icon">
            </div>
          </template>
        </draggable>
      </div>

      <div class="row">
        <div class="col-3">
          <div class="bg-container">
            <draggable
                class="list-group"
                :list="leftList"
                @add="onAdd"
                group="vegetable"
                itemKey="id"
            >
              <template #item="{ element }">
                <div class="list-group-item" :style="{left: element.left, bottom: element.bottom}">
                  <img :src="element.icon" alt="">
                </div>
              </template>
            </draggable>
            <div class="bg">
              <img alt="" :src="boxBg"/>
            </div>
          </div>
          <div class="bg-container">
            <draggable
                class="list-group"
                :list="rightList"
                @add="onAdd"
                group="vegetable"
                itemKey="id"
            >
              <template #item="{ element }">
                <div class="list-group-item" :style="{left: element.left, bottom: element.bottom}">
                  <img :src="element.icon" alt="">
                </div>
              </template>
            </draggable>
            <div class="bg">
              <img alt="" :src="boxBg"/>
            </div>
          </div>
        </div>
      </div>
      <!--      <div class="next-btn" v-if="leftList.length">-->
      <!--        <ion-button shape="round" @click="toNextTest">-->
      <!--          <span>下一个</span>-->
      <!--          <ion-icon :icon="caretForwardCircle" size="large"></ion-icon>-->
      <!--        </ion-button>-->
      <!--      </div>-->
      <ion-fab vertical="bottom" @click="toNextTest">
        <ion-fab-button>
          <ion-icon :icon="caretForwardCircle" size="large"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {ref, onMounted, watch, reactive, onBeforeMount} from "vue";
import {
  IonBackButton,
  IonButtons,
  IonTitle,
  IonFab,
  IonFabButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/vue';
import {caretForwardCircle} from 'ionicons/icons';
import draggable from "vuedraggable";
import {DropItems, LocalItems} from "@/data/localData.interface";
import {getLocalData, setItems} from '@/common/utils';
import boxBg from '@/assets/images/lanzi.png';
import flower1 from '@/assets/images/flower1.png';
import flower2 from '@/assets/images/flower2.png';
import flower3 from '@/assets/images/flower3.png'

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
// let teacherDidFlag = false;
const flowerType = ref(2);
onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(() => {
  initData(flowerType.value);
});
watch(flowerType, (newV, oldV) => {
  if (newV) {
    console.log(newV)
    initData(newV);
  }
})
const getCurrentData = (count: number) => {
  const current = localStorage.getItem('currentUser');
  const localData = getLocalData();
  const currentData = localData.find(item => item.name === current) as LocalItems;
  currentData.data.push({
    itemName: '买花',
    itemNameEn: 'flower',
    itemType: flowerType.value,
    count: count,
    comments: flowerType.value === 1 ? '红玫瑰' : flowerType.value === 2 ? '康乃馨' : '粉玫瑰'
  })
  setItems('localData', JSON.stringify(localData))
}

const originData: any = ref();
const leftList = ref([]);
const rightList = ref([]);
const onAdd = () => {
  // TODO
}
const initData = (type: number) => {
  switch (type) {
    case 2: //红玫瑰
      resetOriginData(flower1);
      break;
    case 1:  // 康乃馨
      resetOriginData(flower2);
      break
    case 3: // 粉玫瑰
      resetOriginData(flower3);
      break;
  }
}
const resetOriginData = (icon: string) => {

  originData.value = [
    {name: "flower", id: 1, icon: icon, left: '30px', bottom: '0px'},
    {name: "flower", id: 2, icon: icon, left: '90px', bottom: '0px'},
    {name: "flower", id: 3, icon: icon, left: '150px', bottom: '0px'},
    {name: "flower", id: 4, icon: icon, left: '210px', bottom: '0px'},
    {name: "flower", id: 5, icon: icon, left: '260px', bottom: '0px'},
    {name: "flower", id: 6, icon: icon, left: '320px', bottom: '0px'},
  ]
  leftList.value = [];
  rightList.value = []
  originData.value.forEach((item: any, index: number) => {
    // item.left = (Math.floor(Math.random() * (200 - 20)) + 20) + 'px';
    // item.left = index === 0 ? '30px' : index * 60 + 'px';
    item.bottom = '-20px';
  })
  console.log(originData)
}
const toNextTest = () => {
  if (!leftList.value.length) return;
  switch (flowerType.value) {
    case 2:
      getCurrentData(leftList.value.length);
      flowerType.value = 1;
      break
    case 1:
      getCurrentData(leftList.value.length);
      flowerType.value = 3;
      break;
    case 3:
      getCurrentData(leftList.value.length);
      console.log('go to new test page......')
      routeCtrl.back()
      break;
  }
}
</script>

<style scoped>

.top-box, .row {
  /*margin-top: 10px;*/
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.row {
  width: 100%;
  margin-top: 110px;
}

.col-3 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.bg-container {
  position: relative;
}

.bg {
  width: 400px;
  height: 260px;
  position: absolute;
  top: -120px;
  left: 0;
  z-index: -1;
}

.row .list-group {
  position: relative;
  width: 400px;
  height: 180px;
  margin-left: -20px;
}

.list-group {
  display: flex;
  flex-wrap: wrap;
  /*background-color: #3dc2ff;*/
}

.result-box {
  min-width: 300px;
  height: 200px;
}

.row .list-group .list-group-item {
  position: absolute;
  width: 80px;
  /* height: 120px; */
}

.list-group-item {
  width: 100px;
  height: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.result-box .list-group-item {
  /*height: 30px;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: center;*/
}

.list-group-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
