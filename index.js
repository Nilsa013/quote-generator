const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("add-quote");

async function getQuote(){
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    const url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
      try {
        const res = await fetch(proxyUrl + url);
        const data = await res.json();
    console.log(data)

    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
        authorText.innerText = "Unknown";
      } else {
        authorText.innerText = data.quoteAuthor;
      }
    //   Reduce font size for long quotes
      if (data.quoteText.length > 120) {
        quoteText.classList.add("long-quote");
      } else {
        quoteText.classList.remove("long-quote");
      }
      quoteText.innerText = data.quoteText;
}catch(error){
    console.log(error)
}
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
  }

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();

