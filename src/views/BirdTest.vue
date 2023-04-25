<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>小鸟回家</ion-title>
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
            <img alt="" :src="tree" />
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
            <img alt="" :src="tree" />
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
              <div class="list-group-item">
                <img :src="element.icon" :style="{rotate: element.roate}">
                <!--                <span>{{ element.name }} {{ element.id }}</span>-->
              </div>
            </template>
          </draggable>
        </div>
      </div>
<!--      <div class="next-btn" v-if="listLeft.length">-->
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
  IonFabButton,
} from '@ionic/vue';
import { caretForwardCircle } from 'ionicons/icons';
import draggable from "vuedraggable";
import {DropItems, LocalItems} from "@/data/localData.interface";
import {getLocalData, setItems} from '@/common/utils';
import bird from '@/assets/images/bird.png'
import tree from '@/assets/images/tree.png'

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
const birdType = ref(4);
onMounted(() => {
  initData();
  // getCurrentData(0);
});
watch(birdType, (newV, oldV) => {
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
    itemName: '小鸟回家',
    itemNameEn: 'bird',
    itemType: birdType.value,
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
    { name: "bird", id: 1, icon: bird },
    { name: "bird", id: 2, icon: bird },
    { name: "bird", id: 3, icon: bird },
    { name: "bird", id: 4, icon: bird },
    { name: "bird", id: 5, icon: bird },
    { name: "bird", id: 6, icon: bird },
    { name: "bird", id: 7, icon: bird },
    { name: "bird", id: 8, icon: bird },
    { name: "bird", id: 9, icon: bird },
  ]
  listLeft.value = [];
  listRight.value = [];
  // originData.value.forEach((item: any) => {
  //   item.roate = (Math.floor(Math.random() * (360 - 1)) + 1 ) + 'deg'
  // })
}
const toNextTest = () => {
  if (!listLeft.value.length) return;
  switch (birdType.value) {
    case 4:
      getCurrentData(listRight.value.length);
      birdType.value = 2;
      break
    case 2:
      getCurrentData(listRight.value.length);
      birdType.value = 3;
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
  justify-content: space-around;
}
.row{
  margin-top: 80px;
}
.bg-container{
  position: relative;
}
.bg-tree{
  width: 300px;
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.top-box .list-group {
  background-color: transparent;
  /*padding: 40px;*/
  width: 300px;
  height: 280px;
  padding: 10px 30px 50px 30px;
}
.list-group {
  display: block;
  /*flex-direction: row;*/
  /*flex-wrap: wrap;*/
  width: 400px;
  height: 300px;
  /*background-color: #fff;*/
  /*justify-content: flex-start;*/
  /*align-items: flex-start;*/
}
.row .list-group{
  width: 500px;
  height: 200px;
}
.list-group-item{
  width: 90px;
  height: 90px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.top-box .list-group .list-group-item {
  width: 60px;
  height: 60px;
}
.list-group-item img{
  flex: 1;
}
.row .list-group-item {
  margin: 3px;
}
img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
