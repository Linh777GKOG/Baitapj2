// Load plaintext from file
function loadPlaintext() {
  const file = document.getElementById('plaintextFile').files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('plaintext').value = e.target.result;
  };
  reader.readAsText(file);
}

// Load ciphertext from file
function loadCiphertext() {
  const file = document.getElementById('ciphertextFile').files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('ciphertext').value = e.target.result;
  };
  reader.readAsText(file);
}

// Update input fields based on cipher type
function updateKeyInputs() {
  const cipherType = document.getElementById('cipherType').value;

  // Hide all key inputs by default
  document.getElementById('caesarKey').style.display = 'none';
  document.getElementById('affineKeys').style.display = 'none';
  document.getElementById('vigenereKey').style.display = 'none';

  if (cipherType === 'caesar') {
    document.getElementById('caesarKey').style.display = 'block';
  } else if (cipherType === 'affine') {
    document.getElementById('affineKeys').style.display = 'block';
  } else if (cipherType === 'vigenere') {
    document.getElementById('vigenereKey').style.display = 'block';
  }
}

// Process the cipher based on selected type
function processCipher() {
  const cipherType = document.getElementById('cipherType').value;
  const operation = document.getElementById('operation').value;
  let result = '';

  if (cipherType === 'caesar') {
    const shift = parseInt(document.getElementById('caesarShift').value);
    const text =
      operation === 'encode'
        ? document.getElementById('plaintext').value
        : document.getElementById('ciphertext').value;
    result = caesarCipher(text, shift, operation);
  } else if (cipherType === 'affine') {
    const a = parseInt(document.getElementById('affineA').value);
    const b = parseInt(document.getElementById('affineB').value);
    const text =
      operation === 'encode'
        ? document.getElementById('plaintext').value
        : document.getElementById('ciphertext').value;
    result = affineCipher(text, a, b, operation);
  } else if (cipherType === 'vigenere') {
    const key = document.getElementById('vigenere').value;
    const text =
      operation === 'encode'
        ? document.getElementById('plaintext').value
        : document.getElementById('ciphertext').value;
    result = vigenereCipher(text, key, operation);
  }

  if (operation === 'encode') {
    document.getElementById('ciphertext').value = result;
  } else {
    document.getElementById('plaintext').value = result;
  }
}

// Caesar Cipher encryption and decryption
function caesarCipher(text, shift, operation) {
  const m = 256; // ASCII 256 characters
  let result = '';

  if (operation === 'encode') {
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      result += String.fromCharCode((charCode + shift) % m);
    }
  } else if (operation === 'decode') {
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      result += String.fromCharCode((charCode - shift + m) % m);
    }
  }

  return result;
}

// Affine Cipher encryption and decryption
function affineCipher(text, a, b, operation) {
  const m = 256; // ASCII 256 characters
  let result = '';

  if (operation === 'encode') {
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      result += String.fromCharCode((a * charCode + b) % m);
    }
  } else if (operation === 'decode') {
    const aInverse = modInverse(a, m);
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      result += String.fromCharCode((aInverse * (charCode - b + m)) % m);
    }
  }

  return result;
}

// Vigenere Cipher encryption and decryption
function vigenereCipher(text, key, operation) {
  const m = 256; // ASCII 256 characters
  let result = '';
  key = key.split('').map((char) => char.charCodeAt(0));

  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    let keyCode = key[i % key.length];

    if (operation === 'encode') {
      result += String.fromCharCode((charCode + keyCode) % m);
    } else if (operation === 'decode') {
      result += String.fromCharCode((charCode - keyCode + m) % m);
    }
  }

  return result;
}

// Function to find modular inverse of a under modulo m
function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return 1;
}
