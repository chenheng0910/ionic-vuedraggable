export interface ItemData {
    itemName: string;
    itemNameEn: string;
    itemType: number;
    count: number;
    comments?: string;
}
export interface LocalItems {
    name: string;
    testDate: number | string;
    data: ItemData[];
}
export interface DropItems {
    name: string;
    id: number;
    icon: string;
}
