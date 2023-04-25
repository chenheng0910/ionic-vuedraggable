<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>套圈圈</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" class="ion-padding">
      <div class="top-box">
        <div class="bg-container">
          <draggable
              class="list-group result-box"
              :list="listResult"
              group="people"
              @add="onAdd"
              itemKey="name"
          >
            <template #item="{ element, index }">
              <div class="list-group-item">
                <img alt="" :src="element.icon" class="result-icon">
              </div>
            </template>
          </draggable>
          <div class="bg"></div>
        </div>
      </div>

      <div class="row">
        <!--        <div class="next-btn" >-->
        <!--          <ion-button shape="round" @click="toNextTest">-->
        <!--            <span>下一个</span>-->
        <!--            <ion-icon :icon="caretForwardCircle" size="large"></ion-icon>-->
        <!--          </ion-button>-->
        <!--        </div>-->
        <div class="col-3-bg">
          <img alt="" :src="childrenImg"/>
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
import childrenImg from '@/assets/images/children.png';
import ferrule from '@/assets/images/tqq.png'
import tqq1 from '@/assets/images/tqq1.png'

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
let teacherDidFlag = false;
const ferruleType = ref(3);
onMounted(() => {
  initData();
});
watch(ferruleType, (newV, oldV) => {
  if (newV) {
    initData();
  }
})
const getCurrentData = (count: number) => {
  const current = localStorage.getItem('currentUser');
  const localData = getLocalData();
  const currentData = localData.find(item => item.name === current) as LocalItems;
  currentData.data.push({
    itemName: '套圈圈',
    itemNameEn: 'ferrule',
    itemType: ferruleType.value,
    count: count
  })
  setItems('localData', JSON.stringify(localData))
}

const originData: any = ref();
const listResult = ref([]) as any;
const onAdd = (e: any) => {
  listResult.value.map((item: any) => item.icon = tqq1)
  if (!teacherDidFlag && listResult.value.length === ferruleType.value) {
    setTimeout(() => {
      initData();
      teacherDidFlag = true;
    }, 2000)
  }
}
const onAddOrigin = () => {
  originData.value.map((item: any) => item.icon = ferrule)
}
const initData = () => {
  originData.value = [
    {name: "ferrule", id: 1, icon: ferrule},
    {name: "ferrule", id: 2, icon: ferrule},
    {name: "ferrule", id: 3, icon: ferrule},
    {name: "ferrule", id: 4, icon: ferrule},
    {name: "ferrule", id: 5, icon: ferrule},
    {name: "ferrule", id: 6, icon: ferrule},
    {name: "ferrule", id: 7, icon: ferrule},
  ]
  listResult.value = [];
}
const toNextTest = () => {
  if (!listResult.value.length) return;
  teacherDidFlag = false;
  switch (ferruleType.value) {
    case 3:
      getCurrentData(listResult.value.length);
      ferruleType.value = 1;
      break
    case 1:
      getCurrentData(listResult.value.length);
      ferruleType.value = 2;
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
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.row {
  /*justify-content: center;*/
  margin-top: 10px;
  align-items: center;
  height: 200px;
}

.row .col-3-bg {
  width: 290px;
  height: 180px;
  /*background-color: red;*/
}

.bg-container {
  position: relative;
}

.bg {
  width: 20px;
  height: 380px;
  border-radius: 8px;
  position: absolute;
  top: -20px;
  left: 65px;
  z-index: -1;
  background-color: #9ac28e;
}

.row .list-group {
  width: 340px;
  height: 120px;
}

.list-group {
  display: block;
  /*flex-wrap: wrap;*/
  width: 400px;
  height: 300px;
  /*background-color: #3dc2ff;*/
}

.top-box .result-box {
  width: 150px;
  height: 360px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  /*background-color: #6a64ff;*/
}

.result-box .list-group-item .result-icon {
  /*transform: rotateX(75deg);*/
}

.list-group-item {
  width: 80px;
  height: 80px;
  display: inline-flex;
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

.list-group-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
