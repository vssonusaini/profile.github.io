var echo_database = JSON.parse(localStorage.getItem("echo_database"));
if (echo_database === null) {
  echo_database = {
    product: [
      {
        id: 0,
        name: "vivo T1 5G (Rainbow Fantasy, 128 GB)  (6 GB RAM)",
        price: "10",
        note: `Be ready to encounter a thrilling user experience, improved mobile performance, and smooth gaming with the powerful Vivo T1 5G mobile phone. This mobile phone comes with a 16.72 cm (6.58) FHD in-cell display so that you can take delight in stunning visuals. Also, this mobile phone is equipped with a 50 MP Main Camera that enables you to capture stunning photos of everything around you. Lastly, courtesy of the 5000 mAh battery, you can keep running your phone, even during busy working schedules or while you are on a business trip.      `,
        image: "https://rukminim2.flixcart.com/image/416/416/kzd147k0/mobile/m/c/f/-original-imagbe5qknarjywp.jpeg?q=70",
        categories: "phones",
      },
      {
        id: 1,
        name: "APPLE iPhone 12 (Purple, 64 GB)",
        price: "59.999",
        note: `Dive into a world of crystal-clear visuals with the Super Retina XDR Display of this Apple iPhone 12. This beast of a smartphone packs the A14 Bionic chip to make for blazing-fast performance speeds. On top of that, its Dual-camera System, along with Night Mode, helps you click amazing pictures and selfies even when the lighting isn’t as good as you’d want it to be.`,
        image: "https://rukminim2.flixcart.com/image/416/416/ko0d6kw0/mobile/6/h/y/iphone-12-mjnm3hn-a-apple-original-imag2k2v6ehvnzfd.jpeg?q=70",
        categories: "phones",
      },
      {
        id: 2,
        name: "APPLE iPhone 11 (White, 64 GB)",
        price: "47.990",
        note: `Mangoes are known as the King of Fruits.
                          A mango tree doesn’t produce fruit until .`,
        image: "https://rukminim2.flixcart.com/image/416/416/kgiaykw0/mobile/3/x/e/apple-iphone-11-mhdc3hn-a-original-imafwqepx5yxwctc.jpeg?q=70",
        categories: "phones",
      },
      {
        id: 3,
        name: "Soundcore by Anker Life Q10 with Fast Charging Bluetooth Headset  (Black, On the Ear)",
        price: "2.499",
        note: `By using this Soundcore wireless headphone you can listen to music, and also answer calls and do other stuff while on-call, without having to hold your phone to your ear. It comes with Bluetooth 5.0 technology, so you can enjoy a disruption-free connection between your device and the headset. Also, the quality of the sound delivered is CD-like. So, your favourite songs will sound more power-packed. What’s more, it offers multiple hours of playback time.
            .`,
        image: "https://rukminim2.flixcart.com/image/416/416/k5fn3ww0/headphone/x/b/f/soundcore-life-q10-original-imafz48w6gwap3rg.jpeg?q=70",
        categories: "headset",
      },
      {
        id: 4,
        name: "Lenovo IdeaPad 3 Core i3 10th Gen ",
        price: "34.990",
        note: `Equipped with smart and user-friendly features, the Lenovo IdeaPad laptop caters to your work as well as entertainment needs. The lightweight design makes it hassle-free for you to carry it when you’re travelling. And, its sleek and stylish looks are sure to grab everyone's attention wherever you go. Featuring an Intel Core 10th Gen processor, this laptop lets you experience lag-free performance. And thanks to its 8 GB RAM and 256 GB SSD storage, this fast laptop helps you achieve your productivity goals.
            `,
        categories: "laptop",
        image: "https://rukminim2.flixcart.com/image/416/416/keaaavk0/computer/x/m/y/lenovo-na-laptop-original-imafuzt8r5jqppfn.jpeg?q=70",
      },
      {
        id: 5,
        name: "ASUS ROG Zephyrus G14 Ryzen 7 ",
        price: "76.990",
        note: `ASUS ROG Zephyrus G14 Ryzen 7 Octa Core Ryzen 7-4800HS 4th Gen - (8 GB/1 TB SSD/Windows 10 Home/4 GB Graphics/NVIDIA GeForce GTX 1650/144 Hz) GA401IHR-HZ070TS Gaming Laptop  (14 inch, Grey, 1.6 Kg, With MS Office)`,
        image: "https://rukminim2.flixcart.com/image/416/416/kvba7bk0/computer/b/g/m/ga401ihr-hz070ts-gaming-laptop-asus-original-imag88s2xhgmuuzk.jpeg?q=70",
        categories: "laptop",
      },
      {
        id: 6,
        name: "SAMSUNG 80 cm (32 inch) HD Ready LED Smart TV  (UA32T4340AKXXL / UA32T4340BKXXL)   ",
        price: "16.499",
        note: `Take your entertainment to the next level with this Samsung TV. With the Content Guide on this TV, you now have access to content from the top-rated TV shows. The HD picture quality, in combination with PurColor, will ensure that you never have a dull moment throughout your TV-viewing experience. Moreover, with the Screen Mirroring feature, you can connect your compatible devices and watch your favourite TV shows on the big screen. `,
        image: "https://rukminim1.flixcart.com/image/416/416/kbs9k7k0/television/c/j/3/samsung-ua32t4340akxxl-original-imaft25qdysfsq7k.jpeg?q=70",
        categories: "laptop",
      },
    ],
    my_cart: [],
    categories: [
      {
        categorie: "all",
      },
      {
        categorie: "phones",
      },
      {
        categorie: "laptop",
      },
      {
        categorie: "headset",
      },
    ],

    site_settings: {
      hero: {
        logo: "echo",
        site_banner_text: "Delivery </br> Within 30 Minutes",
        banner_image: "https://bazar-furniture-shop.s3.ap-south-1.amazonaws.com/furniture-shop-header-1648992658016.jpg",
      },
      service: [
        {
          service_title: "Fast Delivery",
          service_spen: "Start from $10",
        },
        {
          service_title: "Money Guarantee",
          service_spen: "7 Days Back",
        },
        {
          service_title: "365 Days ",
          service_spen: "For free return",
        },
        {
          service_title: "Payment",
          service_spen: "Secure system",
        },
      ],

      footer: {
        logo: "sonu",
        footer_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.",
        links: [
          {
            link_name: "Help center",
            link_href: "/sonusaini",
          },
          {
            link_name: "Track Your Order",
            link_href: "/sonusaini",
          },
          {
            link_name: "Return & Refunds",
            link_href: "/sonusaini",
          },
          {
            link_name: "Corporate & Bulk Purchasing",
            link_href: "/sonusaini",
          },
        ],
      },
    },
  };
  localStorage.setItem("echo_database", JSON.stringify(echo_database));
}

var settings = JSON.parse(localStorage.getItem("echo_settings"));
if (settings === null) {
  settings = [];
  settings = [
    {
      select_categories: "all",
      product_detiels_categories: "phones",
    },
  ];
  localStorage.setItem("echo_settings", JSON.stringify(settings));
}
