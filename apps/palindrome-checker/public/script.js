const userInput = document.getElementById('text-input');
const checkPalindromeBtn = document.getElementById('check-btn');
const resultDiv = document.getElementById('result');

const checkForPalindrome = input => {
  const originalInput = input; // Store for later output
  const hasSpecialCharactersOrDigits = /[\W\d_]/.test(input.replace(/\s/g, '')); // Remove whitespace before checking for special characters and digits

  if (input === '') {
    alert('Please input a value');
    return;
  }

  if (hasSpecialCharactersOrDigits) {
    alert('Input should not include numbers and special characters');
    return;
  }
  // Remove the previous result.
  resultDiv.replaceChildren();

  const lowerCaseStr = input.replace(/[^A-Z0-9]/gi, '').toLowerCase();
  let resultMsg = `${originalInput} ${
    lowerCaseStr === [...lowerCaseStr].reverse().join('') ? 'is' : 'is not'
  } a palindrome.`;

  const pTag = document.createElement('p');
  pTag.className = 'user-input';
  pTag.appendChild(document.createTextNode(resultMsg));
  resultDiv.appendChild(pTag);

  // Show the result.
  resultDiv.classList.remove('hidden');
};

checkPalindromeBtn.addEventListener('click', () => {
  checkForPalindrome(userInput.value);
  userInput.value = '';
});

userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkForPalindrome(userInput.value);
    userInput.value = '';
  }
});
