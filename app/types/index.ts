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
  name: string;
  email: string;
  orderTotal: number;
  contact?: string;
  shippingInfo: ShippingInfo;
  customerType: "Royal Customer" | "Repeat Customer" | "New Customer";
  loyaltyPoints: number;
};
declare type Partner = {
  name: string;
  email: string;
  phone: string;
  website?: string;
  pocEmail?: string;
  pocPhone?: string;
};

declare type BadgeTypeProps = {
  type: string;
};
declare type Product = {
  name: string;
  status: "live" | "close";
  categories: "SPA" | "Adventure Tourism" | "Family Tour";
  partner: Partner[];
  type: "staycation" | "collection" | "default";
  price: number;
  url?: string;
  eVoucher?: string;
  variant?: Variant[];
};

declare type Variant = {
  name?: "Tour type" | "Duration" | "Accommodation type" | "Meal plan" | "Transport type" | "Group size";
  price?: number;
  description?: string;
};

declare type Order = {
  $id: string;
  date: string;
  customer: Customer;
  product: Product;
  status: "received" | "processing" | "booking" | "canceled" | "Voucher Sent" | "refunded";
  type: "E-Voucher" | "Physical";
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
};

declare interface UserUpdateParams {
  user?: User;
  formData: FormData;
}

declare type BlockUserParams = {
  userId: string;
  action: string;
};
