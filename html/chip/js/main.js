$(function () {
  $('#auth').tabs();
  $('#home-tab').tabs();
});

async function check(token) {
  try {
    const response = await fetch('http://localhost:3000/api/devices', {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {

    console.log('sadas');
    console.error('Failed to fetch devices:', error.message);
  }
}

check(localStorage.getItem('token'));
