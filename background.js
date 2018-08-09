chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  const data = request.content;
  console.log(data);
  fetch('https://wt-863e332a77d038d29fa50d15961b5367-0.run.webtask.io/browser-data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      console.log('SENT');
      sendResponse({ content: 'SENT' });
    })
    .catch(error => {
      console.log(error);
      sendResponse({ content: 'ERROR' });
    });
  if (data) {
    return true;
  }
});
