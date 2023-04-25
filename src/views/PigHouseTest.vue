<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>小猪造房子</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" class="ion-padding">
      <div class="top-box">
        <div class="bg-container">
          <draggable
              class="result-box"
              :list="listResult"
              group="people"
              @change="log"
              @add="onAdd"
              itemKey="name"
          >
            <template #item="{ element, index }">
              <div class="list-group-item">
                <img alt="" :src="element.icon">
              </div>
            </template>
          </draggable>
          <div class="bg">
            <img :src="house" alt=" /">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-3 pigs">
          <img alt="" :src="pigBg"/>
        </div>
        <div class="col-3">
          <draggable
              class="list-group"
              :list="originData"
              @add="onAddOrigin"
              group="people"
              itemKey="id"
          >
            <template #item="{ element, index }">
              <div class="list-group-item">
                <img :src="element.icon" alt="">
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
import {useRouter} from 'vue-router';
import {ref, reactive, onMounted, watch} from "vue";
import {
  IonBackButton,
  IonTitle,
  IonButtons,
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
import {LocalItems, DropItems} from "@/data/localData.interface";
import {getLocalData, setItems} from '@/common/utils';
import pigBg from '@/assets/images/pig-bg.png';
import pigs from '@/assets/images/pig-house-1.png'
import house from '@/assets/images/pig-house.png'

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
let teacherDidFlag = false;
const pigsType = ref(4);
onMounted(() => {
  initData();
});
watch(pigsType, (newV, oldV) => {
  if (newV) {
    initData();
  }
})
const getCurrentData = (count: number) => {
  const current = localStorage.getItem('currentUser');
  const localData = getLocalData();
  const currentData = localData.find(item => item.name === current) as LocalItems;
  currentData.data.push({
    itemName: '小猪造房子',
    itemNameEn: 'pig',
    itemType: pigsType.value,
    count: count
  })
  setItems('localData', JSON.stringify(localData))
}

const originData: any = ref();
const listResult = ref([]) as any;
const log = () => {
  // console.log(e)
}
const onAdd = () => {
  if (listResult.value.length === pigsType.value && !teacherDidFlag) {
    // console.log(e)
    setTimeout(() => {
      initData();
      teacherDidFlag = true;
    }, 2000)
  }
}
const onAddOrigin = () => {
  originData.value.map((item: any) => item.icon = pigs)
}
const initData = () => {
  originData.value = [
    {name: "pigs", id: 1, icon: pigs},
    {name: "pigs", id: 2, icon: pigs},
    {name: "pigs", id: 3, icon: pigs},
    {name: "pigs", id: 4, icon: pigs},
    {name: "pigs", id: 5, icon: pigs},
    {name: "pigs", id: 6, icon: pigs},
    {name: "pigs", id: 7, icon: pigs},
    {name: "pigs", id: 8, icon: pigs},
  ]
  listResult.value = [];
}
const toNextTest = () => {
  if (!listResult.value.length) return;
  teacherDidFlag = false;
  switch (pigsType.value) {
    case 4:
      getCurrentData(listResult.value.length);
      pigsType.value = 2;
      break
    case 2:
      getCurrentData(listResult.value.length);
      pigsType.value = 3;
      break;
    case 3:
      getCurrentData(listResult.value.length);
      console.log('go to new test page......')
      routeCtrl.back()
      break;
  }
}
</script>

<style scoped>

.top-box, .row {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.row {
  justify-content: center;
}

.bg-container {
  position: relative;
}

.bg {
  width: 300px;
  height: 310px;
  border-radius: 8px;
  position: absolute;
  top: -140px;
  left: -55px;
  z-index: -1;
  /*background-color: #9ac28e;*/
}

.bg img {
  width: 100%;
  height: 100%;
}

.pigs {
  width: 150px;
  height: 180px;
  margin-right: 200px;
}

.top-box {
  margin-top: 130px;
}

.list-group {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 200px;
}

.result-box {
  width: 200px;
  height: 145px;
  /*width: 150px;*/
  /*padding-bottom: 30px;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: flex-end;*/
  /*background-color: #6a64ff;*/
}

.result-box img {
  width: 100%;
  height: 100%;
}
.row {
  margin-top: 50px;
}
.row .list-group {
  width: 360px;
}
.row .list-group-item {
  /*transform: rotateX(75deg);*/
  margin: 0 10px;
}

.list-group-item {
  width: 100px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.result-box .list-group-item {
  width: 65px;
  height: 45px;
  display: inline-block;
  /*height: 30px;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: center;*/
}

.list-group-item img {
  width: 100%;
  height: 100%;
}
</style>
