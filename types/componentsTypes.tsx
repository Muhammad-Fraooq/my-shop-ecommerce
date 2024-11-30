export interface ButtonProps {
  props: string;
  isActive: boolean;
  className: string;
  onClick: () => void;
}
export interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
  tempId?: string;
}

export interface ErrorTypes {
  [key: string]: string;
  name: string;
  email: string;
  // phone: string
  subject: string;
  message: string;
}
