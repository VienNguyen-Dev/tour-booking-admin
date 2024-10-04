export const LinkSideBar = [
  {
    icon: "/assets/icons/Partners.svg",
    label: "Partners",
    link: "/admin/partners",
  },
  {
    icon: "/assets/icons/Orders.svg",
    label: "Orders",
    link: "/admin/orders",
  },
  {
    icon: "/assets/icons/Products.svg",
    label: "Products",
    link: "/admin/products",
  },
  {
    icon: "/assets/icons/Redeems-Exchanges.svg",
    label: "Redeems & Exchanges",
    link: "/admin/redeems-exchanges",
  },
  {
    icon: "/assets/icons/Customers.svg",
    label: "Customers",
    link: "/admin/customers",
  },
  {
    icon: "/assets/icons/Users.svg",
    label: "Users",
    link: "/admin/users",
  },
];

export const TypesData = [
  {
    title: "board",
    icon: "/assets/icons/board.svg",
  },
  {
    title: "table",
    icon: "/assets/icons/table.svg",
  },
];

export const Items = (pageType: string) => {
  switch (pageType) {
    case "redeem":
      return [
        { title: "total orders", icon: "/assets/icons/bag.png" },
        { title: "total redeems", icon: "/assets/icons/gift.png" },
        { title: "email", icon: "/assets/icons/email.png" },
        { title: "contact no", icon: "/assets/icons/contact.png" },
      ];
    case "partner":
      return [
        { title: "total orders", icon: "/assets/icons/bag.png" },
        { title: "total redeems", icon: "/assets/icons/gift.png" },
        { title: "email", icon: "/assets/icons/email.png" },
        { title: "contact no", icon: "/assets/icons/contact.png" },
        { title: "fee", icon: "/assets/icons/fee.png" },
        { title: "poc contact", icon: "/assets/icons/poc-contact.png" },
        { title: "website", icon: "/assets/icons/link.png" },
      ];

    default:
      return [];
  }
};

export const menuItems = (type: string) => {
  switch (type) {
    case "action":
      return [
        { label: "View Details", icon: "/assets/icons/file-pen.svg" },
        { label: "Delete", icon: "/assets/icons/delete.png" },
      ];
    case "avatar":
      return [
        {
          label: "Setting",
          icon: "/assets/icons/Settings.png",
        },
        {
          label: "Rating & Review",
          icon: "/assets/icons/rating.png",
        },
        {
          label: "Logout",
          icon: "/assets/icons/logout-icon.png",
        },
      ];
    case "user":
      return [
        { label: "Add", icon: "/assets/icons/plus.png" },
        { label: "Edit", icon: "/assets/icons/edit.png" },
        { label: "Block", icon: "/assets/icons/lock.svg" },
        { label: "Delete", icon: "/assets/icons/delete.png" },
      ];
    case "partner":
      return [
        { label: "Add", icon: "/assets/icons/plus.png" },
        { label: "Edit", icon: "/assets/icons/edit.png" },
        { label: "Block", icon: "/assets/icons/lock.svg" },
        { label: "Delete", icon: "/assets/icons/delete.png" },
      ];
    default:
      return [];
  }
};
