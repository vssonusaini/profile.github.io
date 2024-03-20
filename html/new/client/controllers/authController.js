// Auth controller for handling user authentication

document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const email = formData.get('email');
  const password = formData.get('password');
  try {
    const token = await loginUser(email, password);
    fetchDevices(token);
    // document.getElementById('loginForm').style.display = 'none';
    // document.getElementById('signupForm').style.display = 'none';
  } catch (error) {
    console.error('Login failed:', error.message);
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
  }
});

async function loginUser(email, password) {
  const response = await fetch('http://localhost:3000/api/login', {
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
  const response = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  console.log(await response.text());
}

document.getElementById('logOut').addEventListener('click', () => {
  localStorage.setItem('token', null);
  location.reload();
});
