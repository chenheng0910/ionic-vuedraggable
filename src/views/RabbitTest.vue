<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>喂兔子</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" class="ion-padding">
      <div class="top-box">
        <div class="bg-container">
          <draggable
              class="list-group"
              :list="listLeft"
              @sort="false"
              group="people"
              @drop="false"
              @change="log"
              itemKey="name"
          >
            <template #item="{ element, index }">
              <div class="list-group-item">
                <img :src="element.icon">
                <!--              <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
          <div class="bg">
            <img alt="" :src="boxBg" />
          </div>
        </div>
        <div class="bg-container">
          <draggable
              class="list-group"
              :list="listRight"
              @sort="false"
              group="people"
              @drop="false"
              @change="log"
              itemKey="id"
          >
            <template #item="{ element, index }">
              <div class="list-group-item">
                <img :src="element.icon">
                <!--              <span>{{ element.name }} {{ element.id }}</span>-->
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
          <!--          <h3>Draggable 1</h3>-->
          <draggable
              class="list-group"
              :list="originData"
              group="people"
              @change="log"
              itemKey="id"
          >
            <template #item="{ element, index }">
              <div class="list-group-item" >
                <img alt="" :src="element.icon">
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
import {useRoute, useRouter} from 'vue-router';
import {ref, onMounted, watch, reactive} from "vue";
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonPage,
  IonToolbar,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import {caretForwardCircle} from 'ionicons/icons';
import draggable from "vuedraggable";
import {DropItems, LocalItems} from "@/data/localData.interface";
import {getLocalData, setItems} from '@/common/utils';
import boxBg from '../assets/images/rabbit-bg.png'
import carrot from '@/assets/images/huluobu1.png'

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
const rabbitType = ref(5);
onMounted(() => {
  initData();
  // getCurrentData(0);
});
watch(rabbitType, (newV, oldV) => {
  if (newV) {
    initData();
  }
})
const getCurrentData = (count: number) => {
  const current = localStorage.getItem('currentUser');
  const localData = getLocalData();
  const currentData = localData.find(item => item.name === current) as LocalItems;
  console.log('999999', currentData)
  currentData.data.push({
    itemName: '喂兔子',
    itemNameEn: 'rabbit',
    itemType: rabbitType.value,
    count: count
  })
  setItems('localData', JSON.stringify(localData))
}

const originData: any = ref([]);
const listLeft = ref([]);
const listRight = ref([]);
const log = (e: any) => {
  // console.log(e)
}
const initData = () => {
  originData.value = [
    {name: "rabbit", id: 1, icon: carrot},
    {name: "rabbit", id: 2, icon: carrot},
    {name: "rabbit", id: 3, icon: carrot},
    {name: "rabbit", id: 4, icon: carrot},
    {name: "rabbit", id: 5, icon: carrot},
    {name: "rabbit", id: 6, icon: carrot},
    {name: "rabbit", id: 7, icon: carrot},
    {name: "rabbit", id: 8, icon: carrot},
    {name: "rabbit", id: 9, icon: carrot},
    {name: "rabbit", id: 10, icon: carrot},
    {name: "rabbit", id: 11, icon: carrot},
    {name: "rabbit", id: 12, icon: carrot},
    {name: "rabbit", id: 13, icon: carrot},
  ]
  listLeft.value = [];
  listRight.value = [];
  originData.value.forEach((item: any) => {
    item.roate = (Math.floor(Math.random() * (360 - 1)) + 1) + 'deg'
    item.left = (Math.floor(Math.random() * (300 - 1)) + 1) + 'px'
    item.top = (Math.floor(Math.random() * (300 - 1)) + 1) + 'px'
  })
}
const toNextTest = () => {
  if (!listLeft.value.length) return;
  switch (rabbitType.value) {
    case 5:
      getCurrentData(listRight.value.length);
      rabbitType.value = 6;
      break
    case 6:
      getCurrentData(listRight.value.length);
      rabbitType.value = 4;
      break;
    case 4:
      getCurrentData(listRight.value.length);
      console.log('go to new test page......')
      routeCtrl.back()
      break;
  }
}
</script>

<style scoped>
.top-box, .row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.top-box {
  margin-top: 150px;
}
.bg-container{
  position: relative;
}
.bg{
  width: 100px;
  height: 150px;
  position: absolute;
  top: -150px;
  left: 180px;
  z-index: -1;
}
.bg img{
  width: 100%;
  height: 100%;
}

.top-box .list-group {
  border: 1px solid #2a2a2a;
  border-radius: 5px;
  height: 150px;
}

.list-group {
  display: flex;
  flex-wrap: wrap;
  width: 430px;
  height: 170px;
  padding: 5px;
}

.row .list-group {
  position: relative;
  margin-top: 50px;
}

.list-group-item {
  width: 60px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.row .list-group .list-group-item {
  /*position: absolute;*/
}

.top-box .list-group .list-group-item {
  width: 40px;
  height: 70px;
}

.list-group-item img {
  width: 100%;
  height: 100%;
}
.next-btn {
  display: flex;
  margin-left: 30px;
}
</style>
