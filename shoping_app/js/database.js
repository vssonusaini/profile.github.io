var account = JSON.parse(localStorage.getItem('account'));
if (account === null) {
          account = [];
          var account = [{
                    id: 0,
                    username: "admin",
                    password: "123456",
                    level: 1
          }, {
                    id: 1,
                    username: "b",
                    password: "b",
                    level: 0
          }];
          localStorage.setItem("account", JSON.stringify(account));
}

var food = JSON.parse(localStorage.getItem('food'));
if (food === null) {
          food = [];
          food = [{
                    id: 0,
                    name: "Home Led 1 Set",
                    price: "99",
                    note: "7 wati one set led bulb made in india",
                    image: "image/foody-upload-api-foody-mobile-suon-10-jpg-181121104208.jpg"
          }, {
                    id: 1,
                    name: "Home Led 1 Set",
                    price: "299",
                    note: "7 wati one set led bulb made in india",
                    image: "image/foody-upload-api-foody-mobile-pizza1-190513160013.jpg"
          }, {
                    id: 2,
                    name: "Home Led 1 Set",
                    price: "249",
                    note: "7 wati one set led bulb made in india",
                    image: "image/foody-upload-api-foody-mobile-vqy-jpg-180827105031.jpg"
          }, {
                    id: 3,
                    name: "Home Led 1 Set",
                    price: "49",
                    note: "7 wati one set led bulb made in india",
                    image: "image/foody-mobile-10399619_81147453229-527-635863817212109582.jpg"
          }];
          localStorage.setItem("food", JSON.stringify(food));
}

