// btn
const CartPositionBTN = document.getElementById('CTPO');
const BarcodeBTN = document.getElementById('BR');
const QRCodeBTN = document.getElementById('QR');

// div
const CartPositionblock = document.getElementById('CartPosition-block');
const BarcodeBlock = document.getElementById('barcode-block');
const SectionTitle = document.getElementById('section-title');

// loacl host
var DB = JSON.parse(localStorage.getItem('Database'));
if (DB === null) {
  var DB = {
    ActiveTab: 'QR',
  };
  localStorage.setItem('Database', JSON.stringify(DB));
}

CartPositionBTN.addEventListener('click', () => {
  let host_setting = JSON.parse(localStorage.getItem('Database'));
  host_setting.ActiveTab = 'CTPO';
  localStorage.setItem('Database', JSON.stringify(host_setting));
  CheckActive();
});

BarcodeBTN.addEventListener('click', () => {
  let host_setting = JSON.parse(localStorage.getItem('Database'));
  host_setting.ActiveTab = 'BR';
  localStorage.setItem('Database', JSON.stringify(host_setting));
  CheckActive();
});

QRCodeBTN.addEventListener('click', () => {
  let host_setting = JSON.parse(localStorage.getItem('Database'));
  host_setting.ActiveTab = 'QR';
  localStorage.setItem('Database', JSON.stringify(host_setting));
  CheckActive();
});

const CheckActive = () => {
  let host_setting = JSON.parse(localStorage.getItem('Database'));

  if (host_setting.ActiveTab == 'CTPO') {
    CartPositionBTN.className = 'active';
    BarcodeBTN.classList.remove('active');
    QRCodeBTN.classList.remove('active');
    CartPositionblock.style.display = 'block';
    BarcodeBlock.style.display = 'none';
    SectionTitle.innerHTML = 'Cart Position';
  }
  if (host_setting.ActiveTab == 'BR') {
    BarcodeBTN.className = 'active';
    QRCodeBTN.classList.remove('active');
    CartPositionBTN.classList.remove('active');
    CartPositionblock.style.display = 'none';
    BarcodeBlock.style.display = 'block';
    SectionTitle.innerHTML = 'Barcode';
  }
  if (host_setting.ActiveTab == 'QR') {
    QRCodeBTN.className = 'active';
    BarcodeBTN.classList.remove('active');
    CartPositionBTN.classList.remove('active');
    CartPositionblock.style.display = 'none';
    BarcodeBlock.style.display = 'none';
    SectionTitle.innerHTML = 'Qr Code';
  }
};

CheckActive();
