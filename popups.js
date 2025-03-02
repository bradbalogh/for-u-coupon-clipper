document.getElementById("click-button").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: clipCoupons
    });
  });
});

function clipCoupons() {

  function clickLoadMoreButtons() {
    const button = document.querySelector('button[class^="btn load-more"]');
    if (button) {
      button.click();
      setTimeout(clickLoadMoreButtons, 10);
    } else {
      clipAllCoupons();
    }
  }

  function clipAllCoupons() {
    const clipButtons = document.querySelectorAll('button[id^="couponAddBtn"]');
    clipButtons.forEach(button => button.click());
  }

  clickLoadMoreButtons();
}