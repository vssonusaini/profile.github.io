var checkLogin = JSON.parse(localStorage.getItem('checkLogin'));
if (checkLogin === null) {
          checkLogin = [];
          var checkLogin = -1;
          localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
}
if (checkLogin == -1) {
} else if (account[checkLogin].level == 1) {

          document.getElementById("admin").style.display = 'block';
          document.getElementById('login_btn').style.display = 'none';
          document.getElementById('user_profile_btn').style.display = 'block';
          document.getElementById("user_profile_btn").innerHTML = account[checkLogin].username;
          document.getElementById("user_profile_usernamea").innerHTML = account[checkLogin].username;
} else if (account[checkLogin].level == 0) {
          document.getElementById("admin").style.display = 'none';
          document.getElementById('login_btn').style.display = 'none';
          document.getElementById('user_profile_btn').style.display = 'block';
          document.getElementById("user_profile_btn").innerHTML = account[checkLogin].username;
          document.getElementById("user_profile_usernamea").innerHTML = account[checkLogin].username;

}

document.getElementById('login').addEventListener('click', Login);
function Login() {

          for (i = 0; i < account.length; i++) {
                    if ((document.getElementById("username").value == account[i].username) && (document.getElementById("password").value == account[i].password)) {
                              checkLogin = account[i].id;
                              localStorage.setItem("checkLogin", JSON.stringify(checkLogin));

                              if (account[i].level == 0) {
                                        document.getElementById("statusLogin").innerHTML = "Logged in successfully";
                                        document.getElementById("user_profile_btn").innerHTML = account[i].username;
                                        location.reload();

                              } else if (account[i].level == 1) {
                                        document.getElementById("statusLogin").innerHTML = "Logged in successfully";
                                        document.getElementById("user_profile_btn").innerHTML = account[i].username;

                                        location.reload();
                              }
                    }
          }
          if (checkLogin == -1) {
                    document.getElementById("statusLogin").innerHTML = "Wrong password";
          }
}

var idup = JSON.parse(localStorage.getItem('idup'));
if (idup === null) {
          idup = [];
          var idup = 2;
          localStorage.setItem("idup", JSON.stringify(idup));
}


document.getElementById('sign_in').addEventListener('click', sign_in);
function sign_in() {
          var checkUsername = 0;
          var id = idup;
          var level = 0;
          var username = document.getElementById('usernameSignup').value;
          var password = document.getElementById('passwordSignup').value;
          var Repassword = document.getElementById('RepasswordSignup').value;
          if (username != '' && password != '' && Repassword != '' && password == Repassword) {
                    for (let i = 0; i < account.length; i++) {
                              if (account[i].username == username) {
                                        checkUsername = 1;
                                        break;
                              }
                    }
                    if (checkUsername == 0) {
                              accountSignup = { id, username, password, level };
                              account.push(accountSignup);

                              localStorage.setItem("account", JSON.stringify(account));

                              checkLogin = id;
                              localStorage.setItem("checkLogin", JSON.stringify(checkLogin));

                              var id = idup++;
                              localStorage.setItem("idup", JSON.stringify(idup));
                              console.log(account);
                              document.getElementById("statusSignup").innerHTML = "Sign Up Success";
                              location.reload();
                    } else {
                              document.getElementById("statusSignup").innerHTML = "This account has already existed";
                    }
          } else {
                    document.getElementById("statusSignup").innerHTML = "Please enter full information";
          }
}

document.getElementById('log_out_btn').addEventListener('click', log_out);
function log_out() {
          checkLogin = -1;
          localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
          location.reload();
};