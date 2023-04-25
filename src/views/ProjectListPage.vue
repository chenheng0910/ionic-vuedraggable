<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>项目列表</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" class="ion-padding" :scroll-y="true">

      <!--      <ion-list>-->
      <!--        <MessageListItem v-for="message in messages" :key="message.id" :message="message" />-->
      <!--      </ion-list>-->
      <ion-grid>
        <ion-row class="list-row">
          <ion-col size="3" v-for="item in items" :key="item.id">
            <div class="item" @click="toTestItem(item)">
              <div class="icon">
                <img :src="item.icon" alt="" />
              </div>
              <span>{{ item.name }}</span>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
    IonImg,
  IonToolbar, IonCol, IonGrid, IonRow, alertController
} from '@ionic/vue';
import {getItems, Item} from '@/data/messages';
import {ref, onMounted} from 'vue';
import {useRouter} from "vue-router";
import {LocalItems} from "@/data/localData.interface";
import {getLocalData, setItems} from '@/common/utils';

const router = useRouter();
const items = ref<Item[]>(getItems());
const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return '';
};
onMounted(() => {
  console.log('onMounted >>>>>>>>')
})

const switchNavigate = (path: string) => {
  console.log(path)
  router.push(path)
}
const toTestItem = (data: Item) => {
  const localData = getLocalData();
  console.log('init list page>>>', localData)
  const user = localStorage.getItem('currentUser') as string;
  const currentData = localData.find(item => item.name === user) as LocalItems;
  console.log(123456, currentData);
  if (currentData.data.length) {
    const index = currentData.data.findIndex(item => item.itemNameEn === data.itemNameEn)
    console.log(index)
    if (index > -1) {
      presentAlert(data, currentData, user)
    } else {
      switchNavigate(data.path)
    }
  } else {
    switchNavigate(data.path)
  }
}
const presentAlert = async (item: Item, data: LocalItems, user: string) => {
  const localData = getLocalData();
  const alert = await alertController.create({
    header: '提示',
    message: '已经做过该项目的测试了，是否需要重新测试',
    buttons: [{
      text: '取消',
      role: 'cancel'
    }, {
      text: '确定',
      role: 'confirm'
    }],
  });
  await alert.present();
  alert.onDidDismiss().then((res) => {
    if (res.role === 'confirm') {
      data.data = data.data.filter(value => {
        return value.itemNameEn !== item.itemNameEn
      })
      console.log('重新测试' + item.itemName, data)
      console.log(111, localData)
      localData.forEach(value => {
        if (value.name === user) {
          value.testDate = new Date().getTime();
          value.data = data.data
        }
      })
      setItems('localData', JSON.stringify(localData))
      switchNavigate(item.path)
    }
  })
};

</script>
<style scoped>
:deep(ion-icon) {
  font-size: 30px;
  color: blue;
}

ion-col {
  /*background-color: #135d54;*/
  /*border: solid 1px #fff;*/
  /*color: #fff;*/
  /*text-align: center;*/
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px #135d54;
  padding: 5px;
}

.item .icon {
  width: 140px;
  height: 140px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item .icon img{
  /*flex: 1;*/
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.list-row{
  /*justify-content: space-evenly;*/
}
</style>
