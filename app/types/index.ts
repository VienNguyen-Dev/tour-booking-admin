declare type CustomButtonProps = {
  title: string;
  otherStyles?: string;
  isLoading?: boolean;
};

declare type CreateNewAccountParams = {
  username?: string;
  password?: string;
  phoneNumber?: string;
  email: string;
  avatar?: string;
  status?: "active" | "block";
  role: string;
};

declare type User = {
  $id: string;
  username: string;
  phoneNumber?: string;
  email: string;
  avatar: string;
  status: "active" | "block";
  role: string;
};

declare type PasswordRecoveryParams = {
  secret: string;
  userId: string;
  password: string;
};

declare type SignInParams = {
  email: string;
  password: string;
  remember?: boolean;
};
declare type NotificationAdmin = {
  name: string;
  title: string;
  content: string;
  time: string;
};

declare interface SvgIconProps {
  width: number;
  height: number;
  color?: string;
  path: string;
  fit?: boolean;
}
declare type ShippingInfo = {
  address: string;
  city: string;
  country: string;
  packageType: string;
  shippingOption: "standard" | "express" | "same-day" | "overnight";
};

declare type Customer = {
  $id: string;
  name: string;
  email: string;
  quantityOrder: number;
  contact?: string;
  address: string;
  country: string;
  city: string;
  customerType: "Royalty" | "Repeated" | "First-Time";
  loyaltyPoints: number;
  orderId: Order[];
  avatar: string;
  totalSpent: number;
};
declare interface CreateNewCustomerParams {
  name: string;
  avatar: string;
  email: string;
  quantityOrder: number;
  contact?: string;
  address: string;
  city: string;
  country: string;
  type: string;
  shippingOption: string;
  customerType: string;
  loyaltyPoints: number;
  totalSpent: number;
}
declare type Partner = {
  $id: string;
  avatar?: string;
  tags: string[];
  type: string;
  payment: string;
  redeemInfo?: string;
  hasAPI?: boolean;
  rating: number;
  name: string;
  email: string;
  phone: string;
  website?: string;
  pocEmail?: string;
  pocPhone?: string;
  address?: string;
  city?: string;
  country?: string;
  packageType?: string;
  shippingOption?: string;
  notes: string;
  fee: number;
  partnerProduct: string;
};

declare type NewPartnerParams = {
  avatar?: string;
  tags: string[];
  type: string;
  payment: string;
  redeemInfo?: string;
  hasAPI?: boolean;
  rating: number;
  name: string;
  email: string;
  phone: string;
  website?: string;
  pocEmail?: string;
  pocPhone?: string;
  address?: string;
  city?: string;
  country?: string;
  packageType?: string;
  shippingOption?: string;
  bookingType?: string;
  notes?: string;
  fee?: number;
};

declare type UpdateDataParams = {
  tags: string[];
  type: string;
  payment: string;
  redeemInfo?: string;
  email: string;
  phone: string;
  website?: string;
  pocEmail?: string;
  pocPhone?: string;
  address?: string;
  city?: string;
  country?: string;
  packageType?: string;
  shippingOption?: string;
  bookingType?: string;
  notes: string;
  fee: number;
};
declare type UpdatePartnerParams = {
  partner?: Partner;
  formData: FormData;
};
declare type ProductDataParams = {
  name: string;
  status: "live" | "close";
  categories: "SPA" | "Adventure Tourism" | "Family Tour";
  type: "staycation" | "collection" | "default";
  price: number;
  url?: string;
  eVoucher?: string;
  variantPrice?: string;
  variantDescription?: string;
  avatar?: string;
  bookingType?: string;
};
declare type NewProductParams = {
  productData: ProductDataParams;
  partnerId: string;
};

declare type EditProductParams = {
  type: "staycation" | "collection" | "default";
  variantPrice?: string;
  variantDescription?: string;
  avatar?: string;
  bookingType?: string;
  status: string;
  partnerProduct: string;
};

declare type EditProductDataParams = {
  product?: Product;
  formData: FormData;
  productId: string;
};

declare type BadgeTypeProps = {
  type: string;
};
declare type Product = {
  $id: string;
  name: string;
  avatar: string | File;
  status: "live" | "close";
  categories: "SPA" | "Adventure Tourism" | "Family Tour";
  partnerId: Partner;
  type: "staycation" | "collection" | "default";
  price: number;
  url?: string;
  eVoucher?: string;
  variantPrice?: string;
  description?: string;
  bookingType: string;
};

declare type Order = {
  $id: string;
  date: string;
  customer: Customer;
  partner?: Partner;
  product: Product;
  status: "received" | "processing" | "booking" | "canceled" | "Voucher Sent" | "refunded";
  type: "E-Voucher" | "Physical";
};

declare type CreateNewOrderParams = {
  date: string;
  totalOrder: number;
  type: string;
  status: string;
  bookingStatus: string;
  product: string;
  customer: string;
  partner: string;
};
declare interface SvgIconProps {
  width: number;
  height: number;
  path: string;
  color?: string;
  fit?: boolean;
}

declare interface NotificationProps {
  notifications: NotificationAdmin[];
}

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare type HeaderProps = {
  title: string;
  subtitle: string;
};

declare type AuthHeaderProps = {
  title?: string;
  subtitle: string;
};

declare type TriggerTableProps = {
  title: string;
  triggerValue: string;
  icon: string;
};

declare type CardItemProps = {
  title: string;
  icon: string;
  subtitle: string;
  pageType?: string;
};

declare interface UserUpdateParams {
  user?: User;
  formData: FormData;
}

declare type BlockUserParams = {
  userId: string;
  action: string;
};
