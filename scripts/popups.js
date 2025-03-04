document.getElementById("click-button").addEventListener("click", () => {

  const button = document.getElementById("click-button");
  const spinner = document.getElementById("loading-spinner");

  button.disabled = true;
  spinner.style.display = "inline-block";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: clipCoupons
    }).then(() => {
      button.disabled = false;
      spinner.style.display = "none";
    }).catch(error => {
      console.error("Error executing script:", error);
      button.disabled = false;
      spinner.style.display = "none";
    });
  });

});

function clipCoupons() {

  function clickLoadMoreButtons(callback) {
    const button = document.querySelector('button[class^="btn load-more"]');
    if (button) {
      button.click();
      setTimeout(() => clickLoadMoreButtons(callback), 10);
    } else {
      callback();
    }
  }

  function clipAllCoupons() {
    const clipButtons = document.querySelectorAll('button[id^="couponAddBtn"]');
    clipButtons.forEach(button => button.click());
  }

  return new Promise(resolve => {
    clickLoadMoreButtons(() => {
      clipAllCoupons();
      resolve();
    });
  });

}
