const userInput = document.getElementById('text-input');
const checkPalindromeBtn = document.getElementById('btn');
const resultDiv = document.getElementById('result');

const checkForPalindrome = input => {
  const hasSpecialCharactersOrDigits = /[\W\d]/.test(input);

  if (input === '') {
    alert('Please input a value');
    return;
  }

  if (hasSpecialCharactersOrDigits === true) {
    alert('Input should not include numbers and special characters');
    return;
  }
  // Remove the previous result.
  resultDiv.replaceChildren();

  const lowerCaseStr = input.replace(/[^A-Z0-9]/gi, '').toLowerCase();
  let resultMsg = `${input} ${
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
