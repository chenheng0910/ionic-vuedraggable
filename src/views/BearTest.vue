<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>小熊投壶</ion-title>
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
              <div class="list-group-item rotate-ele"
                   :style="{top: element.top, left: element.left}">
                <img :src="element.icon">
                <!--              <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
          <div class="bg-tree">
            <img alt="" :src="bearBox"/>
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
              <div class="list-group-item rotate-ele"
                   :style="{top: element.top, left: element.left}">
                <img :src="element.icon">
                <!--              <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
          <div class="bg-tree">
            <img alt="" :src="bearBox"/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-3">
          <!--          <h3>Draggable 1</h3>-->
          <div class="bearImg">
            <img alt="" :src="bear" />
          </div>
          <draggable
              class="list-group"
              :list="originData"
              group="people"
              @change="log"
              itemKey="id"
          >
            <template #item="{ element, index }">
              <div class="list-group-item">
                <img :src="element.icon">
                <!--                <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
        </div>
<!--        <div class="next-btn" v-if="listLeft.length">-->
<!--          <ion-button shape="round" @click="toNextTest">-->
<!--            <span>下一个</span>-->
<!--            <ion-icon :icon="caretForwardCircle" size="large"></ion-icon>-->
<!--          </ion-button>-->
<!--        </div>-->
        <ion-fab vertical="bottom" @click="toNextTest">
          <ion-fab-button>
            <ion-icon :icon="caretForwardCircle" size="large"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>
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
import bear from '@/assets/images/bear.png'
import bears from '@/assets/images/bear1.png'
import bearBox from '@/assets/images/bear-box.png'

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
const bearsType = ref(6);
onMounted(() => {
  initData();
  // getCurrentData(0);
});
watch(bearsType, (newV, oldV) => {
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
    itemName: '小熊投壶',
    itemNameEn: 'bears',
    itemType: bearsType.value,
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
    {name: "bears", id: 1, icon: bears, left: '42px', top: '9px'},
    {name: "bears", id: 2, icon: bears, left: '66px', top: '3px'},
    {name: "bears", id: 5, icon: bears, left: '90px', top: '0px'},
    {name: "bears", id: 6, icon: bears, left: '116px', top: '0px'},
    {name: "bears", id: 3, icon: bears, left: '20px', top: '27px'},
    {name: "bears", id: 10, icon: bears, left: '140px', top: '20px'},
    {name: "bears", id: 8, icon: bears, left: '162px', top: '4px'},
    {name: "bears", id: 9, icon: bears, left: '186px', top: '32px'},
    {name: "bears", id: 12, icon: bears, left: '210px', top: '5px'},
    {name: "bears", id: 11, icon: bears, left: '235px', top: '30px'},
    {name: "bears", id: 4, icon: bears, left: '-6px', top: '23px'},
    {name: "bears", id: 7, icon: bears, left: '260px', top: '12px'},
  ]
  listLeft.value = [];
  listRight.value = [];
  // originData.value.forEach((item: any) => {
  //   item.left = (Math.floor(Math.random() * (120 - 40)) + 40) + 'px'
  //   item.top = (Math.floor(Math.random() * (20 - 1)) + 1) + 'px'
  // })
}
const toNextTest = () => {
  if (!listLeft.value.length) return;
  switch (bearsType.value) {
    case 6:
      getCurrentData(listRight.value.length);
      bearsType.value = 4;
      break
    case 4:
      getCurrentData(listRight.value.length);
      bearsType.value = 5;
      break;
    case 5:
      getCurrentData(listRight.value.length);
      console.log('go to new test page......')
      routeCtrl.back()
      break;
  }
}
</script>

<style scoped>
.top-box{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.top-box{
  margin-top: 20px;
}
.row {
  margin-top: 180px;
}
.col-3 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.bearImg {
  width: 150px;
  margin-right: 100px;
  /*height: 300px;*/
}
.bg-container {
  position: relative;
}

.bg-tree {
  width: 350px;
  height: 220px;
  position: absolute;
  top: -35px;
  left: -50px;
  z-index: -1;
}

.top-box .list-group {
  background-color: transparent;
  width: 260px;
  height: 200px;
  position: relative;
  /*padding: 40px;*/
  /*width: 300px;*/
  /*height: 200px;*/
}

.list-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 400px;
  height: 300px;
  /*background-color: #fff;*/
  justify-content: flex-start;
  align-items: flex-start;
}

.row .list-group {
  /*width: 500px;*/
  height: 120px;
}

.list-group-item {
  width: 30px;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.top-box .list-group .list-group-item {
  /*width: 80px;*/
  /*height: 80px;*/
}

img {
  /* width: 100%; */
  /* height: 100%; */
  /* object-fit: contain; */
}

.rotate-ele {
  transform: rotateX(145deg);
  position: absolute;
}
</style>