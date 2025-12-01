const userInput = document.getElementById('text-input');
const checkPalindromeBtn = document.getElementById('check-btn');
const resultDiv = document.getElementById('result');

// Normalize text by removing non-alphanumeric characters and lowercasing
const normalizeText = str =>
  str.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();

// Return true if the given text is a palindrome
const isPalindrome = str => {
  const normalized = normalizeText(str);
  return normalized === [...normalized].reverse().join('');
};

const showResultMessage = message => {
  // Remove the previous result
  resultDiv.replaceChildren();

  const pTag = document.createElement('p');
  pTag.className = 'user-input';
  pTag.textContent = message;
  resultDiv.appendChild(pTag);

  // Show the result
  resultDiv.classList.remove('hidden');
};

const checkForPalindrome = rawInput => {
  const originalInput = rawInput; // Preserve for output
  const input = rawInput.trim();

  if (!input) {
    showResultMessage('Please input a value.');
    return;
  }

  const resultMsg = `${originalInput} ${
    isPalindrome(input) ? 'is' : 'is not'
  } a palindrome.`;

  showResultMessage(resultMsg);
};

const handleCheck = () => {
  checkForPalindrome(userInput.value);
  userInput.value = '';
};

checkPalindromeBtn.addEventListener('click', handleCheck);

userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    handleCheck();
  }
});