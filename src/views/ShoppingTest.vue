<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>买蔬菜</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" class="ion-padding">
      <div class="top-box">
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

      <div class="row">
        <div class="col-3">
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
              <img alt="" :src="boxBg"/>
            </div>
          </div>
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
import {getLocalData, setItems, showCustomToast} from '@/common/utils';
import boxBg from '@/assets/images/lanzi.png';
import huanggua from '@/assets/images/huanggua.png';
import yumi from '@/assets/images/yumi.png';
import huluobu from '@/assets/images/huluobu.png'

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};

const routeCtrl = useRouter();
let teacherDidFlag = false;
const shoppingType = ref(1);
onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(() => {
  initData(shoppingType.value);
});
watch(shoppingType, (newV, oldV) => {
  if (newV) {
    console.log(newV)
    initData(newV);
  }
})
const getCurrentData = (count: number) => {
  const current = localStorage.getItem('currentUser');
  const localData = getLocalData();
  const currentData = localData.find(item => item.name === current) as LocalItems;
  currentData.data.push({
    itemName: '买蔬菜',
    itemNameEn: 'shopping',
    itemType: shoppingType.value,
    count: count,
    comments: shoppingType.value === 1 ? '黄瓜' : shoppingType.value === 2 ? '玉米' : '胡萝卜'
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
    if (shoppingType.value === 3) {
      if (listResult.value.length === 2) {
        resetData(shoppingType.value)
      }
    } else {
      if (listResult.value.length === shoppingType.value) {
        resetData(shoppingType.value)
      }
    }

    // if (shoppingType.value === 1 && listResult.value.length === shoppingType.value) {
    //   resetData(shoppingType.value)
    // } else if (shoppingType.value === 2 && listResult.value.length === shoppingType.value) {
    //   resetData(shoppingType.value)
    // } else if (shoppingType.value === 3 && listResult.value.length === 2) {
    //   resetData(shoppingType.value)
    // }
  }
}
const resetData = (type: number) => {
  setTimeout(() => {
    initData(type);
    teacherDidFlag = true;
  }, 2000)
}
const initData = (type: number) => {
  switch (type) {
    case 1: //黄瓜
      resetOriginData(huanggua);
      break;
    case 2:  // 玉米
      resetOriginData(yumi);
      break
    case 3: // 胡萝卜
      resetOriginData(huluobu);
      break;
  }
}
const resetOriginData = (icon: string) => {

  originData.value = [
    {name: "shopping", id: 1, icon: icon},
    {name: "shopping", id: 2, icon: icon},
    {name: "shopping", id: 3, icon: icon},
    {name: "shopping", id: 4, icon: icon},
    {name: "shopping", id: 5, icon: icon},
  ]
  listResult.value = [];
  originData.value.forEach((item: any, index: number) => {
    item.left = index === 0 ? '20px' : (index * 70) + 'px'
    item.bottom = -80 + 'px'
  })
  console.log(originData)
}
const toNextTest = () => {
  if (!listResult.value.length) return;
  teacherDidFlag = false;
  switch (shoppingType.value) {
    case 1:
      getCurrentData(listResult.value.length);
      shoppingType.value = 2;
      break
    case 2:
      getCurrentData(listResult.value.length);
      shoppingType.value = 3;
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
  /*margin-top: 30px;*/
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.row {
  margin-top: 100px;
}

.bg-container {
  position: relative;
}

.bg {
  width: 400px;
  height: 360px;
  position: absolute;
  top: -50px;
  left: 0;
  z-index: -1;
}

.bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.row .list-group {
  position: relative;
  width: 400px;
}

.list-group {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  height: 200px;
  /*background-color: #3dc2ff;*/
}

.result-box {
  height: 180px;
  width: auto;
  /*height: 200px;*/
  /*width: 150px;*/
  /*padding-bottom: 30px;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: flex-end;*/
  /*background-color: #6a64ff;*/
}

.row .list-group .list-group-item {
  position: absolute;
}

.list-group-item {
  width: 100px;
  height: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.result-box .list-group-item {
  width: 100px;
  height: 140px;
}

.list-group-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
