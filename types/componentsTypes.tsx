export interface ButtonProps{
    props:string,
    isActive:boolean
    className:string
    onClick:()=>void
}
export interface Types {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;
  }

export interface ErrorTypes{
    [key: string]: string;
    name: string
    email:string
    // phone: string
    subject:string
    message: string
}