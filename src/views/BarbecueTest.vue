<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>做烤串</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" class="ion-padding">
      <div class="top-box">
        <div class="bg-children">
          <img alt="" :src="children"/>
        </div>
        <div class="bg-container">
          <draggable
              class="list-group result-box"
              :list="listResult"
              group="people"
              @change="log"
              @add="onAdd"
              itemKey="name"
          >
            <template #item="{ element, index }">
              <div class="list-group-item">
                <img alt="" :src="element.icon" class="result-icon">
              </div>
            </template>
          </draggable>
          <div class="bg">
            <img :src="bg" alt="" />
          </div>
        </div>
        <div class="row">
          <draggable
              class="list-group"
              :list="originData"
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
<!--      <div class="next-btn">-->
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
import {ref, onMounted, watch } from "vue";
import {
  IonBackButton,
  IonButtons,
  IonTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import { caretForwardCircle } from 'ionicons/icons';
import draggable from "vuedraggable";
import {DropItems, LocalItems} from "@/data/localData.interface";
import {getLocalData, setItems} from '@/common/utils';
import children from '@/assets/images/children1.png';
import bg from '../assets/images/bangzi.png';
import barbecue from '../assets/images/kaochuan.png'

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
let teacherDidFlag = false;
const barbecueType= ref(2);
onMounted(() => {
  initData();
});
watch(barbecueType, (newV, oldV) => {
  if (newV) {
    initData();
  }
})
const getCurrentData = (count: number) => {
  const current = localStorage.getItem('currentUser');
  const localData = getLocalData();
  const currentData = localData.find(item => item.name === current) as LocalItems;
  currentData.data.push({
    itemName: '做烤串',
    itemNameEn: 'barbecue',
    itemType: barbecueType.value,
    count: count
  })
  setItems('localData', JSON.stringify(localData))
}

const originData: any = ref();
const listResult = ref([])
const log = (e: any) => {
  // console.log(e)
}
const onAdd = () => {
  // console.log(barbecueType.value)

  // if (!teacherDidFlag && barbecueType.value === listResult.value.length) {
  //   resetData()
  // } else if (!teacherDidFlag && barbecueType.value === 3 && listResult.value.length === 2) {
  //   resetData()
  // }
  if (!teacherDidFlag) {
    if (barbecueType.value === 3 && listResult.value.length === 2) {
      resetData()
    } else if (listResult.value.length === barbecueType.value) {
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
    { name: "barbecue", id: 1, icon: barbecue },
    { name: "barbecue", id: 2, icon: barbecue },
    { name: "barbecue", id: 3, icon: barbecue },
    { name: "barbecue", id: 4, icon: barbecue },
    { name: "barbecue", id: 5, icon: barbecue },
    { name: "barbecue", id: 6, icon: barbecue },
  ]
  listResult.value = [];
}
const toNextTest = () => {
  if (!listResult.value.length) return;
  teacherDidFlag = false;
  switch (barbecueType.value) {
    case 2:
      getCurrentData(listResult.value.length);
      barbecueType.value = 1;
      break
    case 1:
      getCurrentData(listResult.value.length);
      barbecueType.value = 3;
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

.top-box{
  width: 100%;
  /*height: 100%;*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.bg-children{
  width: 300px;
  height: 300px;
}
.bg-container{
  position: relative;
}
.bg{
  width: 80px;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 40px;
  z-index: -1;
}
.bg img {
  /*width: 100%;*/
  height: 100%;
}
.top-box .list-group {

}
.row{
  /*margin-top: 30px;*/
}
.list-group {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  height: 300px;
  /*background-color: #3dc2ff;*/
}
.row .list-group {
  width: 300px;
  height: 300px;
}
.result-box{
  width: 150px;
  height: 400px;
  padding-bottom: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  /*background-color: #6a64ff;*/
}
.result-box .list-group-item .result-icon{
  transform: rotateX(130deg);
}
.list-group-item{
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.result-box .list-group-item {
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.row .list-group-item{
  width: 100px;
  height: 100px;
}
.list-group-item img{
  flex: 1;
}
.next-btn {
  display: flex;
  margin-top: 30px;
  margin-left: 30px;
}
</style>
