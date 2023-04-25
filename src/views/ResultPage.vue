<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()"></ion-back-button>
        </ion-buttons>
        <ion-title>测试结果</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" :scroll-y="true" class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="3">测试者</ion-col>
          <ion-col size="3">测试时间</ion-col>
          <ion-col size="3">项目名称</ion-col>
          <ion-col size="3">测试成绩</ion-col>
        </ion-row>
        <ion-row v-for="(item, i) in resultData" :key="i">
          <ion-col size="3">{{ item.name }}</ion-col>
          <ion-col size="3">{{ item.testDate }}</ion-col>
          <ion-grid v-if="item.data.length">
            <ion-row v-for="(value, index) in item.data" :key="index">
              <ion-col>{{ value.itemName }}</ion-col>
              <ion-col>
                <span>{{ value.count || 0 }}</span>
                <span v-if="value?.comments">
                  ({{value?.comments}})
                </span>
              </ion-col>
            </ion-row>
          </ion-grid>
          <ion-grid v-else>
            <ion-row>
              <ion-col>-</ion-col>
              <ion-col>-</ion-col>
            </ion-row>
          </ion-grid>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/vue";
import {cloudDownload} from "ionicons/icons";
import {useRouter} from "vue-router";
import {reactive, onMounted} from "vue";
import {LocalItems} from "@/data/localData.interface";
import {formatDate, getLocalData} from "@/common/utils";

const router = useRouter();
let resultData = reactive<LocalItems[]>([])
const getBackButtonText = () => {
  // const win = window as any;
  // const mode = win && win.Ionic && win.Ionic.mode;
  return  '';
};
onMounted(() => {
  resultData = getLocalData()
  console.log('resultData', resultData)
  resultData.map(item => {
    return item.testDate = formatDate(item.testDate, 'yyyy-M-d');
  })
});
const toResultPage = () => {
  router.push('/resultPage')
}
</script>

<style scoped>
:deep(ion-icon) {
  font-size: 30px;
  color: blue;
}

:deep(ion-grid) {
  padding: 0;
}

:deep(ion-col) {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(193, 196, 203, 0.82);
  /*margin: 1px;*/
  border: 1px solid #ffffff;
}

</style>
