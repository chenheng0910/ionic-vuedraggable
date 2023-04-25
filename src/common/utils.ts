import {LocalItems} from "@/data/localData.interface";
import {toastController, ToastOptions} from "@ionic/vue";

export const getLocalData = () => {
    return JSON.parse(localStorage.getItem('localData') as string) as LocalItems[];
};
export const setItems = (key: string, data: string) => {
    localStorage.setItem(key, data)
};
export const formatDate = (date: any, type: string) => {
    const dt = new Date(date);
    if (type == 'yyyy-M-d') {// yyyy-M-d
        const year = dt.getFullYear();
        const month = dt.getMonth() + 1;
        const date = dt.getDate();
        return `${year}-${month}-${date}`;
    } else if (type == 'yyyy-M-d H:m:s') {// yyyy-M-d H:m:s
        const year = dt.getFullYear();
        const month = dt.getMonth() + 1;
        const date = dt.getDate();
        const hour = dt.getHours();
        const minute = dt.getMinutes();
        const second = dt.getSeconds();
        return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    } else if (type == 'yyyy-MM-dd') {// yyyy-MM-dd
        const year = dt.getFullYear();
        const month = (dt.getMonth() + 1).toString().padStart(2, '0');
        const date = dt.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${date}`;
    } else {// yyyy-MM-dd HH:mm:ss
        const year = dt.getFullYear();
        const month = (dt.getMonth() + 1).toString().padStart(2, '0');
        const date = dt.getDate().toString().padStart(2, '0');
        const hour = dt.getHours().toString().padStart(2, '0');
        const minute = dt.getMinutes().toString().padStart(2, '0');
        const second = dt.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    }
}

export const showCustomToast = async (
    message: string,
    durations?: number,
    colors?: string,
    positions?: 'top' | 'bottom' | 'middle') => {
    const toast = await toastController.create({
        message: message,
        duration: durations || 2000,
        position: positions || 'top',
        color: colors || 'light'
    })
    await toast.present()
}
