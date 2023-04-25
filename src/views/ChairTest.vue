<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>放椅子</ion-title>
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
          <div class="bg-tree">
            <img alt="" :src="chairBg" />
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
          <div class="bg-tree">
            <img alt="" :src="chairBg" />
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
import { caretForwardCircle } from 'ionicons/icons';
import draggable from "vuedraggable";
import {DropItems, LocalItems} from "@/data/localData.interface";
import {getLocalData, setItems} from '@/common/utils';
import chairs from '@/assets/images/chair1.png'
import chairBg from '@/assets/images/chair.png'

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
const chairsType = ref(4);
onMounted(() => {
  initData();
  // getCurrentData(0);
});
watch(chairsType, (newV, oldV) => {
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
    itemName: '放椅子',
    itemNameEn: 'chair',
    itemType: chairsType.value,
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
    { name: "chairs", id: 1, icon: chairs },
    { name: "chairs", id: 2, icon: chairs },
    { name: "chairs", id: 3, icon: chairs },
    { name: "chairs", id: 4, icon: chairs },
    { name: "chairs", id: 5, icon: chairs },
    { name: "chairs", id: 6, icon: chairs },
    { name: "chairs", id: 7, icon: chairs },
    { name: "chairs", id: 8, icon: chairs },
    { name: "chairs", id: 9, icon: chairs },
  ]
  listLeft.value = [];
  listRight.value = [];
}
const toNextTest = () => {
  if (!listLeft.value.length) return;
  switch (chairsType.value) {
    case 4:
      getCurrentData(listRight.value.length);
      chairsType.value = 2;
      break
    case 2:
      getCurrentData(listRight.value.length);
      chairsType.value = 3;
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
.top-box, .row{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.top-box{
  margin-top: 120px;
}
.row{
  margin-top: 50px;
  align-items: center;
}
.bg-container{
  position: relative;
}
.bg-tree{
  width: 320px;
  height: 150px;
  position: absolute;
  top: -120px;
  left: 0;
  z-index: -1;
}
.top-box .list-group {
  height: 160px;
  margin-top: 30px;
}
.list-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 350px;
  height: 200px;
  /*background-color: #fff;*/
  justify-content: flex-start;
  align-items: flex-start;
}
.row .list-group{
  width: 450px;
  height: 180px;
}

.list-group-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.row .list-group-item {
  width: 80px;
  height: 100px;
  margin: 5px;
}
.top-box .list-group .list-group-item {
  width: 60px;
  height: 80px;
}
.list-group-item img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
