chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({quoteIndex: 0}, () => console.log('Initial quote index set.'));
    setDailyQuote();
  });
  
chrome.alarms.create('dailyQuote', {
    delayInMinutes: 1,
    periodInMinutes: 1440
  });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'dailyQuote') {
      setDailyQuote();
    }
  });
  
  function setDailyQuote() {
    fetch(chrome.runtime.getURL('quotes/quotes.json'))
      .then(response => response.json())
      .then(quotes => {
        const index = Math.floor(Math.random() * quotes.length);
        chrome.storage.sync.set({quote: quotes[index]}, () => console.log('Quote set for the day.'));
      });
  }  