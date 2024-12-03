export interface expenses{
    userId:number;
    categoryId:number;
    amount:number;
    description:string;
    date:string;
}

export interface categorydata{
    userid:number;
    categoryid:number;
    name:string;
    type:string;
}
export interface expensecategory{
    expense:expenses;
    category:categorydata;
}