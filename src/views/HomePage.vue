<template>
  <ion-page>
<!--    <ion-header :translucent="true">-->
<!--      <ion-toolbar>-->
<!--        <ion-title>Inbox</ion-title>-->
<!--      </ion-toolbar>-->
<!--    </ion-header>-->

    <ion-content color="light" class="ion-padding">
      <div class="page-content">
        <ion-text class="page-header" color="primary">
          <h1>儿童自发数量聚焦（SFON）发展测试</h1>
        </ion-text>
        <div class="homePage">

          <div class="container">
            <!--          <span class="title"></span>-->
            <ion-input class="input" placeholder="请输入姓名"
                       label="姓名" inputmode="text"
                       clear-input v-model="userName">
            </ion-input>
            <ion-button class="button ion-activatable ripple-parent rounded-rectangle" @click="startTest">开始测试</ion-button>
            <ion-button @click="toResultPage">查看测试数据>></ion-button>
          </div>
          <!--        <div class="result-box">-->
          <!--          <ion-button @click="toResultPage">查看测试数据>></ion-button>-->
          <!--        </div>-->
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonText,
  IonPage,
  IonInput,
  IonButton
} from '@ionic/vue';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import {ItemData, LocalItems} from "@/data/localData.interface";
import {getLocalData, setItems, showCustomToast} from '@/common/utils';

const router = useRouter();
const userName = ref('');
const currentUser = localStorage.getItem('currentUser');
onBeforeMount(() => {
  console.log('onBeforeMount.....')
})
onMounted(() => {
  if (!currentUser) return
  console.log('正在清除上一个用户信息...', currentUser)
  localStorage.removeItem('currentUser');
  userName.value = '';

});
const storageTestData = (name: string) => {
  const testData: ItemData[] = []
  const data = getLocalData() || [];
  console.log('...', data)
  if (!data.length) {
    return JSON.stringify([
      {
        name: name,
        testDate: new Date().getTime(),
        data: testData
      }
    ])
  } else {
    data.push({
      name: name,
      testDate: new Date().getTime(),
      data: testData
    })
    return JSON.stringify(data)
  }
}
const startTest = () => {
  if (!userName.value) {
    showCustomToast('请输入姓名', 2000, 'danger')
  } else {
    const localData = JSON.parse(localStorage.getItem('localData') as string) as LocalItems[];
    if (localData) {
      const dataIndex = localData.findIndex(item => item.name === userName.value)
      console.log(dataIndex)
      if (dataIndex <= -1) {
        setItems('localData', storageTestData(userName.value))
      }
      // else {
      //   if (!localData[dataIndex].data.length) {
      //     localData[dataIndex].testDate = 'new test date';
      //     console.log('not complete', localData[dataIndex])
      //   }
      // }
    } else {
      setItems('localData', storageTestData(userName.value))
    }
    setItems('currentUser', userName.value);
    userName.value = '';
    router.push('/list')
  }
}
const toResultPage = () => {
  const localData = JSON.parse(localStorage.getItem('localData') as string) as LocalItems[];
  const index = localData?.findIndex(item => item.data.length);
  console.log(index)
  if (index > -1) {
    router.push('/resultPage')
  } else {
    console.log('暂无数据')
    showCustomToast('暂无测试数据', 2000, 'danger')
  }
}

const onKeyUp = (e: any) => {
  console.log('show key code here>>>>>>', e.code, e.keyCode)
}

</script>
<style scoped>
.page-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*justify-content: center;*/
}
.page-header{
  margin: 80px 0;
}
.homePage {
  width: 70%;
  margin: 0 auto;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: center;*/
}
.homePage h1{
  text-align: center;
}
.container{
  margin-top: 100px;
  padding: 0 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.container .title{
  font-size: 16px;
}
:deep(.container .input .native-wrapper) {
  border: 1px solid rgba(10, 10, 11, 0.5);
  border-radius: 8px;
  padding-left: 10px;
}
:deep(.input-label-placement-start.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios) {
  margin-right: 20px;
}

.container .button{
  margin-left: 30px;
}
.result-box {
  display: flex;
  align-items: flex-end;
  /*width: 100%;*/
  flex-direction: row;
  margin: 30px 0;
  justify-content: flex-end;
}
</style>
