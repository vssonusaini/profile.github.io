// Auth controller for handling user authentication

document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const email = formData.get('email');
  const password = formData.get('password');
  try {
    const token = await loginUser(email, password);
    window.location.href = '/';
    fetchDevices(token);
    // document.getElementById('loginForm').style.display = 'none';
    // document.getElementById('signupForm').style.display = 'none';
  } catch (error) {
    console.error('Login failed:', error.message);
    document.getElementById('login_status').innerHTML = error.message;
  }
});

document.getElementById('signupForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');
  try {
    await signupUser(username, email, password);
  } catch (error) {
    console.error('Signup failed:', error.message);
    document.getElementById('signup_status').innerHTML = error.message;
  }
});

async function loginUser(email, password) {
  const response = await fetch('https://finalnode-production.up.railway.app/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const token = await response.text();
  localStorage.setItem('token', token);
  return token;
}

async function signupUser(username, email, password) {
  const response = await fetch('https://finalnode-production.up.railway.app/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  console.log(await response.text());
}

// document.getElementById('logOut').addEventListener('click', () => {
//   localStorage.setItem('token', null);
//   location.reload();
// });
