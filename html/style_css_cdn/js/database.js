var product = JSON.parse(localStorage.getItem("product"));
if (product === null) {
  product = [];
  product = [
    {
      id: 0,
      name: "vivo T1 5G (Rainbow Fantasy, 128 GB)  (6 GB RAM)",
      price: "₹16,990",
      note: `Be ready to encounter a thrilling user experience, improved mobile performance, and smooth gaming with the powerful Vivo T1 5G mobile phone. This mobile phone comes with a 16.72 cm (6.58) FHD in-cell display so that you can take delight in stunning visuals. Also, this mobile phone is equipped with a 50 MP Main Camera that enables you to capture stunning photos of everything around you. Lastly, courtesy of the 5000 mAh battery, you can keep running your phone, even during busy working schedules or while you are on a business trip.      `,
      image: "https://rukminim2.flixcart.com/image/416/416/kzd147k0/mobile/m/c/f/-original-imagbe5qknarjywp.jpeg?q=70",
    },
    {
      id: 1,
      name: "APPLE iPhone 12 (Purple, 64 GB)",
      price: "₹59,999",
      note: `Dive into a world of crystal-clear visuals with the Super Retina XDR Display of this Apple iPhone 12. This beast of a smartphone packs the A14 Bionic chip to make for blazing-fast performance speeds. On top of that, its Dual-camera System, along with Night Mode, helps you click amazing pictures and selfies even when the lighting isn’t as good as you’d want it to be.`,
      image: "https://rukminim2.flixcart.com/image/416/416/ko0d6kw0/mobile/6/h/y/iphone-12-mjnm3hn-a-apple-original-imag2k2v6ehvnzfd.jpeg?q=70",
    },
    {
      id: 2,
      name: "APPLE iPhone 11 (White, 64 GB)",
      price: "₹47,990",
      note: `Mangoes are known as the King of Fruits.
                    A mango tree doesn’t produce fruit until .`,
      image: "https://rukminim2.flixcart.com/image/416/416/kgiaykw0/mobile/3/x/e/apple-iphone-11-mhdc3hn-a-original-imafwqepx5yxwctc.jpeg?q=70",
    },
    {
      id: 3,
      name: "Grapes",
      price: "60",
      note: `Dive into a world of crystal-clear visuals with the Super Retina XDR Display of this Apple iPhone 12. This beast of ’.`,
      image: "https://staticfanpage.akamaized.net/wp-content/uploads/sites/22/2021/07/Chicken-samosa-16-1200x675.jpg",
    },
  ];
  localStorage.setItem("product", JSON.stringify(product));
}
