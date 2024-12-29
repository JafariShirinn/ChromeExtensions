document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('quote', (data) => {
      document.getElementById('quote').textContent = data.quote;
    });
  });
  