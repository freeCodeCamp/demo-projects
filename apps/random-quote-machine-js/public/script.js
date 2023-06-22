const quotesURL =
  'https://raw.githubusercontent.com/freeCodeCamp/freeCodeCamp/73e5c4d935578e76c01e0248a7e6d042c99fb52b/client/i18n/locales/english/motivation.json';
let motivationalQuotes;
const quoteTextEl = document.getElementById('quote-text');
const quoteAuthorEl = document.getElementById('quote-author');
const tweetQuoteLink = document.getElementById('tweet-quote');
const newQuoteButton = document.getElementById('new-quote');

const fetchQuotes = async url => {
  const res = await fetch(url);
  const json = await res.json();

  return json.motivationalQuotes;
};

const getRandomQuote = () =>
  motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

const updateTweetLink = () => {
  const tweetText = `"${quoteTextEl.innerText}" ${quoteAuthorEl.innerText} #quotes`;

  if (tweetText.length <= 280) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;

    tweetQuoteLink.setAttribute('href', url);
    tweetQuoteLink.setAttribute('aria-disabled', 'false');
    tweetQuoteLink.classList.remove('disabled');
  } else {
    tweetQuoteLink.removeAttribute('href');
    tweetQuoteLink.setAttribute('aria-disabled', 'true');
    tweetQuoteLink.classList.add('disabled');
  }
};

const displayNewQuote = () => {
  const { quote, author } = getRandomQuote(motivationalQuotes);

  quoteTextEl.innerText = quote;
  quoteAuthorEl.innerText = author;

  updateTweetLink();
};

newQuoteButton.addEventListener('click', () => displayNewQuote());

document.addEventListener('DOMContentLoaded', async () => {
  motivationalQuotes = await fetchQuotes(quotesURL);

  displayNewQuote();
});
