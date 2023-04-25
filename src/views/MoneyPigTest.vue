<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>存钱罐</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" class="ion-padding">
      <div class="top-box">
        <div class="bg-container">
          <draggable class="list-group" :list="listResult" @add="onAdd" group="vegetable" itemKey="id">
            <template #item="{ element }">
              <div class="list-group-item" :style="{ left: element.left, bottom: element.bottom }">
                <img :src="element.icon" alt="">
              </div>
            </template>
          </draggable>
          <div class="bg">
            <img alt="" :src="boxBg" />
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-3">
          <draggable class="list-group result-box" :list="originData" group="vegetable" itemKey="id">
            <template #item="{ element }">
              <div class="list-group-item">
                <img alt="" :src="element.icon">
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <!--      <div class="next-btn" v-if="listResult.length">-->
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
import { useRouter } from 'vue-router';
import { ref, onMounted, watch, reactive, onBeforeMount } from "vue";
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
import { caretForwardCircle } from 'ionicons/icons';
import draggable from "vuedraggable";
import { DropItems, LocalItems } from "@/data/localData.interface";
import { getLocalData, setItems } from '@/common/utils';
import boxBg from '@/assets/images/money-pig-box.png';
import coins from '@/assets/images/coin.png';

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
let teacherDidFlag = false;
const coinsType = ref(3);
onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(() => {
  initData();
});
watch(coinsType, (newV, oldV) => {
  if (newV) {
    initData();
  }
})
const getCurrentData = (count: number) => {
  const current = localStorage.getItem('currentUser');
  const localData = getLocalData();
  const currentData = localData.find(item => item.name === current) as LocalItems;
  currentData.data.push({
    itemName: '存钱罐',
    itemNameEn: 'coins',
    itemType: coinsType.value,
    count: count,
  })
  setItems('localData', JSON.stringify(localData))
}

const originData: any = ref();
const listResult = ref([]);
const onAdd = () => {
  if (!teacherDidFlag) {

    if (listResult.value.length === coinsType.value) {
      resetData()
    }
  }
}
const resetData = () => {
  setTimeout(() => {
    initData();
    teacherDidFlag = true;
  }, 2000)
}
const initData = () => {
  originData.value = [
    { name: "coins", id: 1, icon: coins },
    { name: "coins", id: 2, icon: coins},
    { name: "coins", id: 3, icon: coins},
    { name: "coins", id: 4, icon: coins},
    { name: "coins", id: 5, icon: coins},
    { name: "coins", id: 6, icon: coins},
    { name: "coins", id: 7, icon: coins},
    { name: "coins", id: 8, icon: coins},
    { name: "coins", id: 9, icon: coins},
    { name: "coins", id: 10, icon: coins},
    { name: "coins", id: 11, icon: coins},
  ]
  listResult.value = [];
  originData.value.forEach((item: any) => {
    item.left = (Math.floor(Math.random() * (160 - 50)) + 50) + 'px'
    item.bottom = (Math.floor(Math.random() * (35 - 1)) + 1) + 'px'
  })
}
const toNextTest = () => {
  if (!listResult.value.length) return;
  teacherDidFlag = false;
  switch (coinsType.value) {
    case 3:
      getCurrentData(listResult.value.length);
      coinsType.value = 5;
      break
    case 5:
      getCurrentData(listResult.value.length);
      coinsType.value = 2;
      break;
    case 2:
      getCurrentData(listResult.value.length);
      console.log('go to new test page......')
      routeCtrl.back()
      break;
  }
}
</script>

<style scoped>
.top-box,
.row {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.row {
  margin-top: 80px;
}

.bg-container {
  position: relative;
}

.bg {
  width: 450px;
  height: 310px;
  position: absolute;
  top: -65px;
  left: -150px;
  z-index: -1;
}

.bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.top-box {
  margin-top: 60px;
  min-height: 200px;
}

.row .list-group {
  position: relative;
}

.top-box .list-group {
  width: 260px;
  height: 160px;
  display: block;
  position: relative;
  margin-top: 10px;
}

.top-box .list-group .list-group-item {
  width: 60px;
  height: 60px;
  display: inline-block;
  /* position: absolute; */
  transform: rotateX(45deg);
}

.list-group {
  display: block;
  width: 400px;
  height: 300px;
  /*background-color: #3dc2ff;*/
}

.result-box {
  width: 400px;
  height: 260px;
}

.row .list-group .list-group-item {
  /*position: absolute;*/
  margin: 0 10px;
  width: 80px;
  height: 80px;
}

.list-group-item {
  width: 60px;
  height: 60px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.list-group-item img {
  flex: 1;
}
</style>
