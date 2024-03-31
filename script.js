const wrapper = document.querySelector(".wrapper"),
toast = wrapper.querySelector(".toast"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");

let isOnlineShown = false; // Flag to track if "You're online now" has been displayed
let isOnline = navigator.onLine; // Get initial online state from browser

window.onload = () => {
  function ajax() {
    let xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); // Send a GET request

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) { // Check for successful response (2xx)
        if (!isOnlineShown) { // Only show "You're online now" once
          toast.classList.remove("offline");
          title.innerText = "You're online now";
          subTitle.innerText = "Hurray! Internet is connected.";
          wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
          isOnlineShown = true; // Mark online message as shown
        }
      } else {
        offline(); // Call offline function if request fails
      }
    };

    xhr.onerror = () => {
      offline(); // Call offline function on network error
    };

    xhr.send();
  }

  function offline() {
    wrapper.classList.remove("hide");
    toast.classList.add("offline");
    title.innerText = "You're offline now";
    subTitle.innerText = "Opps! Internet is disconnected.";
    wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
  }

  // Event listener for online/offline events
  window.addEventListener("online", () => {
    isOnline = true;
    ajax(); // Optionally perform XHR request when online
    toast.classList.remove("offline");
    title.innerText = "You're online now";
    subTitle.innerText = "Hurray! Internet is connected.";
    wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
  });

  window.addEventListener("offline", () => {
    isOnline = false;
    offline(); // Call offline function
  });

  // Your existing code (ensure it doesn't interfere with online/offline logic)
  // ... your code ...

  // **Event listener for close icon (guaranteed to exist now)**
  closeIcon.addEventListener("click", () => {
    wrapper.classList.add("hide");
  });

  if (isOnline) {
    ajax(); // Optionally perform XHR request on initial load if online
  } else {
    offline(); // Display offline message if initially offline
  }
};

setInterval(() => {
  // Update based on online/offline state (optional)
}, 1000); // Check every second (adjust interval as needed)
