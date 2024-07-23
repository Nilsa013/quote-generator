const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("add-quote");
const loader = document.getElementById("loader")


function loading(){
  loader.hidden = false
  quoteContainer.hidden = true
}

function complete(){
  if (!loader.hidden){
    quoteContainer.hidden = false
    loader.hidden = false
  }
}

async function getQuote(){
  loading()
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    const url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
      try {
        const res = await fetch(proxyUrl + url);
        const data = await res.json();

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
      complete();
}catch(error){
    console.log("no quote found",error)
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

