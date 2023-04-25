<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>收南瓜</ion-title>
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
              <div class="list-group-item" :style="{left: element.left, bottom: element.bottom}">
                <img :src="element.icon">
                <!--              <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
          <div class="bg-tree">
            <img alt="" :src="pumpkinBox"/>
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
              <div class="list-group-item" :style="{left: element.left, bottom: element.bottom}">
                <img :src="element.icon">
                <!--              <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
          <div class="bg-tree">
            <img alt="" :src="pumpkinBox"/>
          </div>
        </div>
      </div>

      <div class="row">
        <!--        <div class="next-btn" >-->
        <!--          <ion-button shape="round" @click="toNextTest">-->
        <!--            <span>下一个</span>-->
        <!--            <ion-icon :icon="caretForwardCircle" size="large"></ion-icon>-->
        <!--          </ion-button>-->
        <!--        </div>-->
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

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
const pumpkinType = ref(2);
onMounted(() => {
  initData();
  // getCurrentData(0);
});
watch(pumpkinType, (newV, oldV) => {
  if (newV) {
    initData();
  }
})
const getCurrentData = (count: number) => {
  const current = localStorage.getItem('currentUser');
  const localData = getLocalData();
  const currentData = localData.find(item => item.name === current) as LocalItems;
  currentData.data.push({
    itemName: '收南瓜',
    itemNameEn: 'pumpkin',
    itemType: pumpkinType.value,
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
    {name: "pumpkin", id: 1, icon: pumpkin},
    {name: "pumpkin", id: 2, icon: pumpkin},
    {name: "pumpkin", id: 3, icon: pumpkin},
    {name: "pumpkin", id: 4, icon: pumpkin},
    {name: "pumpkin", id: 5, icon: pumpkin},
    {name: "pumpkin", id: 6, icon: pumpkin},
    {name: "pumpkin", id: 7, icon: pumpkin},
    {name: "pumpkin", id: 8, icon: pumpkin},
    {name: "pumpkin", id: 9, icon: pumpkin},
    {name: "pumpkin", id: 10, icon: pumpkin},
    {name: "pumpkin", id: 11, icon: pumpkin},
    {name: "pumpkin", id: 12, icon: pumpkin},
  ]
  listLeft.value = [];
  listRight.value = [];
  originData.value.forEach((item: any) => {
    item.left = (Math.floor(Math.random() * (100 - 5)) + 5) + 'px'
    item.bottom = (Math.floor(Math.random() * (50 - 1)) + 1) + 'px'
  })
}
const toNextTest = () => {
  if (!listLeft.value.length) return
  switch (pumpkinType.value) {
    case 2:
      getCurrentData(listRight.value.length);
      pumpkinType.value = 4;
      break
    case 4:
      getCurrentData(listRight.value.length);
      pumpkinType.value = 1;
      break;
    case 1:
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
  height: 280px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.row {
  height: 240px;
}

.bg-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-tree {
  width: 400px;
  height: 300px;
  position: absolute;
  top: -4px;
  left: -80px;
  z-index: -1;
}

.list-group {
  display: block;
  width: 400px;
  /*height: 300px;*/
}

.row .list-group {
  width: 500px;
  /*width: 320px;*/
  /*height: 240px;*/
}
.row .list-group .list-group-item {
  margin: 10px;
}
.list-group-item {
  width: 100px;
  height: 100px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.top-box .list-group {
  width: 240px;
  height: 200px;
  position: relative;
}

.top-box .list-group .list-group-item {
  width: 60px;
  height: 60px;
}
 img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.next-btn {
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
}
</style>
