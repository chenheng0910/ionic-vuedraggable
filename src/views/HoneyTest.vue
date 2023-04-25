<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>蜜蜂采蜜</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" class="ion-padding">
      <div class="top-box">
        <div class="bg-container">
          <draggable
              class="list-group"
              :list="listResult"
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
            <img alt="" :src="boxBg" />
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-3">
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
import boxBg from '@/assets/images/honey-bg.png';
import honeys from '@/assets/images/honeys.png';

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
let teacherDidFlag = false;
const honeysType = ref(3);
onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(() => {
  initData();
});
watch(honeysType, (newV, oldV) => {
  if (newV) {
    initData();
  }
})
const getCurrentData = (count: number) => {
  const current = localStorage.getItem('currentUser');
  const localData = getLocalData();
  const currentData = localData.find(item => item.name === current) as LocalItems;
  currentData.data.push({
    itemName: '蜜蜂采蜜',
    itemNameEn: 'honey',
    itemType: honeysType.value,
    count: count,
  })
  setItems('localData', JSON.stringify(localData))
}

const originData: any = ref();
const listResult = ref([]);
const log = (e: any) => {
  // console.log(e)
}
const onAdd = () => {
  if (!teacherDidFlag) {
    if (listResult.value.length === honeysType.value) {
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
    { name: "honeys", id: 1, icon: honeys },
    { name: "honeys", id: 2, icon: honeys },
    { name: "honeys", id: 3, icon: honeys },
    { name: "honeys", id: 4, icon: honeys },
    { name: "honeys", id: 5, icon: honeys },
  ]
  listResult.value = [];
}
const toNextTest = () => {
  if (!listResult.value.length) return;
  teacherDidFlag = false;
  switch (honeysType.value) {
    case 3:
      getCurrentData(listResult.value.length);
      honeysType.value = 1;
      break
    case 1:
      getCurrentData(listResult.value.length);
      honeysType.value = 2;
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

.top-box, .row {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.row{
  margin-top: 130px;
}
.bg-container{
  position: relative;
}
.bg{
  width: 400px;
  height: 360px;
  position: absolute;
  top: -60px;
  left: -80px;
  z-index: -1;
}
.top-box {
  margin-top: 50px;
}
.row .list-group {
  position: relative;
}
.top-box .list-group {
  width: 240px;
  height: 200px;
  display: block;
}
.top-box .list-group .list-group-item {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.list-group {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  height: 300px;
  /*background-color: #3dc2ff;*/
}

.result-box {
  width: auto;
  height: 120px;
  /*width: 150px;*/
  /*padding-bottom: 30px;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: flex-end;*/
  /*background-color: #6a64ff;*/
}
.row .list-group .list-group-item {
  /*position: absolute;*/
}

.list-group-item {
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.result-box .list-group-item {
  width: 100px;
  height: 100px;
  margin: 0 10px;
  /*height: 30px;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: center;*/
}

img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
