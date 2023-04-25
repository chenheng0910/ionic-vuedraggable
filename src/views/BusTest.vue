<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>停公交车</ion-title>
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
                <img :src="element.icon" :style="{rotate: element.roate}">
                <!--              <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
          <div class="bg">
            <span v-for="item in 12" :key="item"></span>
            <h3>停车场</h3>
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
                <img :src="element.icon" :style="{rotate: element.roate}">
                <!--              <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
          <div class="bg">
            <span v-for="item in 12" :key="item"></span>
            <h3>停车场</h3>
          </div>
        </div>
      </div>

      <div class="row">
        <!--        <div class="next-btn">-->
        <!--          <ion-button shape="round" @click="toNextTest" v-if="listLeft.length">-->
        <!--            <span>下一个</span>-->
        <!--            <ion-icon :icon="caretForwardCircle" size="large"></ion-icon>-->
        <!--          </ion-button>-->
        <!--        </div>-->
        <div class="col-3">
          <draggable
              class="list-group"
              :list="originData"
              group="people"
              @change="log"
              itemKey="id"
          >
            <template #item="{ element, index }">
              <div class="list-group-item">
                <img :src="element.icon" :style="{rotate: element.roate}">
                <!--                <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
        </div>
      </div>
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
  IonFab,
  IonFabButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonPage,
  IonToolbar,
} from '@ionic/vue';
import {caretForwardCircle} from 'ionicons/icons';
import draggable from "vuedraggable";
import {DropItems, LocalItems} from "@/data/localData.interface";
import {getLocalData, setItems} from '@/common/utils';
import pumpkin from '../assets/images/pumpkin.png'
import pumpkinBox from '../assets/images/pumkin-box.png'
import bus from '@/assets/images/bus.png';

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
const busType = ref(2);
onMounted(() => {
  initData();
  // getCurrentData(0);
});
watch(busType, (newV, oldV) => {
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
    itemName: '停公交车',
    itemNameEn: 'bus',
    itemType: busType.value,
    count: count
  })
  setItems('localData', JSON.stringify(localData))
}

const originData: any = ref();
const listLeft = ref([]);
const listRight = ref([]);
const log = (e: any) => {
  // console.log(e)
}
const initData = () => {
  originData.value = [
    {name: "bus", id: 1, icon: bus},
    {name: "bus", id: 2, icon: bus},
    {name: "bus", id: 3, icon: bus},
    {name: "bus", id: 4, icon: bus},
    {name: "bus", id: 5, icon: bus},
    {name: "bus", id: 6, icon: bus},
    {name: "bus", id: 7, icon: bus},
    {name: "bus", id: 8, icon: bus},
    {name: "bus", id: 9, icon: bus},
    {name: "bus", id: 10, icon: bus},
  ]
  listLeft.value = [];
  listRight.value = [];
  // originData.forEach((item: any) => {
  //   item.roate = (Math.floor(Math.random() * (360 - 1)) + 1 ) + 'deg'
  // })
}
const toNextTest = () => {
  if (!listLeft.value.length) return;
  switch (busType.value) {
    case 2:
      getCurrentData(listRight.value.length);
      busType.value = 5;
      break
    case 5:
      getCurrentData(listRight.value.length);
      busType.value = 3;
      break;
    case 3:
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
  /*height: 300px;*/
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.top-box {
  margin-top: 10px;
}

.row {
  margin-top: 30px;
  align-items: flex-end;
}

.bg-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background-color: #7aa27f;*/
  /*z-index: -2;*/
}

.bg {
  width: 420px;
  height: 320px;
  padding: 10px;
  background-color: #7aa27f;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.bg span {
  display: inline-block;
  width: 100px;
  height: 90px;
  border: 2px solid #cbc7c6;
}

.top-box .list-group {
  width: 450px;
  height: 320px;
  padding: 10px;
}

.list-group {
  width: 450px;
  height: 320px;
  display: block;
}

.row .list-group {
  width: 450px;
  height: 320px;
}

.list-group-item {
  width: 100px;
  height: 90px;
  margin: 0 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.top-box .list-group .list-group-item {
  width: 90px;
  height: 90px;
}

.list-group-item img {
  flex: 1;
}

h3 {
  margin: 0;
  text-align: right;
  color: #ffffff;
  font-size: 16px;
}
</style>
