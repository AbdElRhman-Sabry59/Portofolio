// Select Landing Page Element
let land = document.querySelector(".landing-page");
// Get Arrat of Images
let arr = ["1.png", "2.png", "3.png", "4.jpg", "5.jpg", "7.jpg", "8.jpg"];

// Random Background Option
let backgroundOption = true;
// Variable To Control background interval
let backgorunInterval;

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background localsotrage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove Active Calss From All span
  document.querySelectorAll(".random-backgrounds span").forEach((e) => {
    e.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Function To Randomize  Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgorunInterval = setInterval(() => {
      // Get Random Number
      let randomNum = Math.floor(Math.random() * arr.length);
      // Change BackGround Image Url
      land.style.backgroundImage = 'url("images/' + arr[randomNum] + '")';
      // land.style.backgroundImage = `url("images/${arr[randomNum]}")`;
    }, 10000);
  }
}

let setting = document.querySelector(".settings-box .icon-settings");
let settingsBox = document.querySelector(".settings-box");
setting.addEventListener("click", () => {
  settingsBox.classList.toggle("opned");
});

// Check If There is Local Storage Color Option
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  // Remove Active Class From All Children
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local Sorage Item
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// Switch Colors
let colorsli = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsli.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    //  Set Color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
// Switch Random Backgrond option
let randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All spans
randomBackEl.forEach((span) => {
  // Click On Every span
  span.addEventListener("click", (e) => {
    handleActive(e);
    // To Control background by Yse & No
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgorunInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffSetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = window.innerHeight;

  // Window ScrollTop
  let windowScrollTop = window.pageYOffset;

  if (windowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

/* Start Our Gallery */
// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To overlay
    overlay.className = "popup-overlay";
    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create Popup Box
    let popupBox = document.createElement("div");
    // Add Class To Popup Box
    popupBox.className = "popup-box";

    // Create Close Button
    let closeButton = document.createElement("span");
    // Add Class To Close Button
    closeButton.className = "close-button";
    // Set Close Button Text
    closeButton.textContent = "×"; // علامة الإغلاق

    // Create The Heading
    let heading = document.createElement("h2");
    // Set Heading Text
    heading.textContent = img.alt; // يمكنك تغيير النص إلى أي عنوان ترغب به

    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.src;

    // Append The Close Button To The Popup Box
    popupBox.appendChild(closeButton);

    // Append The Heading To The Popup Box
    popupBox.appendChild(heading);

    // Append The Image To The Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To The Overlay
    overlay.appendChild(popupBox);
    // Close Popup When Clicked On Close Button
    closeButton.addEventListener("click", () => {
      overlay.remove();
    });
  });
});

/* End Our Gallery */

// Select All Boullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

function scrollToAnyWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        // document.querySelector(bullet.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToAnyWhere(allBullets);
scrollToAnyWhere(allLinks);
// Function remove and add class
function handleActive(event) {
  // Remove Active Class From All Children
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Active Class To Selected Item
  event.target.classList.add("active");
}
// Bullets Show & Hide
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContanier = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContanier.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContanier.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContanier.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContanier.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});
// Reset Button
document.querySelector(".reset-option").onclick = function () {
  // localStorage.clear();
  // or
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};

// EmailJs
const btn = document.getElementById("button");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Sending...";

  const serviceID = "service_ql897pj";
  const templateID = "template_m4b3ztb";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Send Email";
      alert("Sent!");
      this.reset(); // تفريغ الحقول بعد الإرسال بنجاح
    },
    (err) => {
      btn.value = "Send Email";
      alert(JSON.stringify(err));
    }
  );
});
// Show and hide Burgger-icon
// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu i");
let links = document.querySelector(".links");
toggleBtn.addEventListener("click", (e) => {
  e.preventDefault()
  links.classList.toggle("open");
});

// video 34 it is very important
