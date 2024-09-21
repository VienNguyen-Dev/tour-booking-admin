"use server";

export async function getData() {
  const data = [
    {
      orderId: "728ed52f1",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "default",
        price: 123,
      },

      status: "received",
    },
    {
      orderId: "728ed52f2",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "staycation",
        price: 123,
      },

      status: "booking",
    },
    {
      orderId: "728ed52f3",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "collection",
        price: 123,
      },

      status: "canceled",
    },
    {
      orderId: "728ed52f4",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Private Helicopter Tour Dubai",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "default",
        price: 123,
      },

      status: "processing",
    },
    {
      orderId: "728ed52f5",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "default",
        price: 123,
      },

      status: "received",
    },
    {
      orderId: "728ed52f6",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "staycation",
        price: 123,
      },

      status: "booking",
    },
    {
      orderId: "728ed52f7",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "collection",
        price: 123,
      },

      status: "canceled",
    },
    {
      orderId: "728ed52f8",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "default",
        price: 123,
      },

      status: "processing",
    },
    // ...
  ];
  return data;
}
