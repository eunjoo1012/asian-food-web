/**********************
 * BASIC CHECK
 **********************/
console.log("script.js loaded");

/**********************
 * TEACHABLE MACHINE MODEL
 **********************/
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/SCrCm4nRI/";

// HTML Elements – Food Classifier
const fileInput = document.getElementById("image-input");
const previewImage = document.getElementById("preview-image");
const statusEl = document.getElementById("status");
const resultCountry = document.getElementById("result-country");
const resultList = document.getElementById("result-list");
const recommendationBox = document.getElementById("recommendation-box");
const foodRestaurantBtn = document.getElementById("food-restaurant-btn");

// HTML Elements – Travel
const travelCountry = document.getElementById("travel-country");
const travelLocation = document.getElementById("travel-location");
const travelSearchBtn = document.getElementById("travel-search-btn");
const mapLinks = document.getElementById("map-links");

// Travel menu buttons
const mainMenu = document.getElementById("travel-main-menu");
const touristMode = document.getElementById("tourist-mode");
const restaurantMode = document.getElementById("restaurant-mode");

const btnTourist = document.getElementById("btn-tourist-mode");
const btnFood = document.getElementById("btn-food-mode");

// Tourist mode elements
const touristLocationBtn = document.getElementById("tourist-location-btn");
const touristList = document.getElementById("tourist-list");
const touristMap = document.getElementById("tourist-map");

/**********************
 * FOOD INFO DATABASE
 **********************/
const foodInfo = {
  // 중국
  "Dim Sum": {
    country: "China",
    flag: "🇨🇳",
    calories: 360,
    description: "A variety of small Chinese dishes served with tea."
  },
  "Dongpo Pork": {
    country: "China",
    flag: "🇨🇳",
    calories: 603,
    description: "Classic Chinese braised pork belly."
  },
  "Mapo Tofu": {
    country: "China",
    flag: "🇨🇳",
    calories: 420,
    description: "Spicy tofu dish from Sichuan cuisine."
  },

  // 일본
  "Sushi": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 350,
    description: "The most iconic Japanese food; vinegared rice with seafood."
  },
  "Ramen": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 500,
    description: "Noodle soup with pork, egg, and rich broth."
  },

  // 한국
  "Bibimbap": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 460,
    description: "Mixed rice bowl with vegetables and chili paste."
  },
  "Tteokbokki": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 480,
    description: "Spicy rice cake dish."
  },

  // 태국
  "Pad Thai": {
    country: "Thailand",
    flag: "🇹🇭",
    calories: 357,
    description: "Stir-fried noodles with egg, meat, and peanuts."
  }
};

/**********************
 * LANGUAGE TRANSLATION FOR RESTAURANT SEARCH
 **********************/
function translateWord(country, word) {
  const dict = {
    Korea: "맛집",
    Japan: "美味しい店",
    China: "好吃的餐厅",
    Thailand: "ร้านอาหารอร่อย"
  };
  return dict[country] || word;
}

/**********************
 * CALORIE EMOJI
 **********************/
function calorieEmoji(cal) {
  if (cal < 500) return "🟡";
  if (cal <= 700) return "🔵";
  return "🔴";
}

/**********************
 * STATUS UPDATE
 **********************/
function setStatus(text) {
  statusEl.innerHTML = `
    ${text}<br>
    <span class="calorie-guide">
      Calorie guide — 🟡: < 500 kcal, 🔵: 500–700 kcal, 🔴: > 700 kcal.
    </span>`;
}

/**********************
 * LOAD MODEL
 **********************/
let model;
let isModelReady = false;

window.addEventListener("load", async () => {
  try {
    model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
    isModelReady = true;
    setStatus("Model loaded! Upload a food image.");
  } catch (e) {
    console.error(e);
    setStatus("Model failed to load.");
  }
});

/**********************
 * FILE UPLOAD
 **********************/
fileInput.addEventListener("change", handleUpload);

function handleUpload(e) {
  const file = e.target.files[0];
  if (!file || !isModelReady) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    previewImage.src = ev.target.result;
    previewImage.onload = () => predict(previewImage);
  };
  reader.readAsDataURL(file);
}

/**********************
 * PREDICT IMAGE
 **********************/
async function predict(img) {
  setStatus("Predicting…");

  const prediction = await model.predict(img);
  prediction.sort((a, b) => b.probability - a.probability);

  const top = prediction[0];

  if (top.probability < 0.5) {
    resultCountry.innerHTML = `
      <h3>🌏 No matching food (below 50%)</h3>
      <p>Try a clearer photo.</p>
    `;
    resultList.innerHTML = "";
    recommendationBox.innerHTML = "";
    foodRestaurantBtn.classList.remove("show");
    document.body.classList.add("view-food-only");
    return;
  }

  const info = foodInfo[top.className];
  document.body.classList.add("view-food-only");

  if (!info) {
    resultCountry.innerHTML = `
      <h3>Unknown Food: ${top.className}</h3>
    `;
    return;
  }

  // Main result
  resultCountry.innerHTML = `
    <div class="main-result-line">
      ${info.flag} <strong>${info.country}</strong> — ${top.className}
      <span class="prob">(${(top.probability * 100).toFixed(1)}%)</span>
    </div>
    <div class="sub-info">
      ${calorieEmoji(info.calories)} ${info.calories} kcal · ${info.description}
    </div>
  `;

  // Top-3 List
  resultList.innerHTML = "";
  prediction.slice(0, 3).forEach(p => {
    resultList.innerHTML += `
      <div class="ascii-row">
        <div>${p.className} — ${(p.probability * 100).toFixed(1)}%</div>
      </div>
    `;
  });

  // Show “find restaurants button”
  foodRestaurantBtn.dataset.food = top.className;
  foodRestaurantBtn.dataset.country = info.country;
  foodRestaurantBtn.classList.add("show");

  setStatus("Prediction complete!");
}

/**********************
 * FOOD → RESTAURANT SEARCH
 **********************/
foodRestaurantBtn.addEventListener("click", () => {
  const food = foodRestaurantBtn.dataset.food;
  const country = foodRestaurantBtn.dataset.country;

  const queryTranslated = translateWord(country, "restaurant");
  const query = `${food} ${queryTranslated}`;

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    "_blank"
  );
});

/**********************
 * MAIN TRAVEL MENU SWITCH
 **********************/
function showMenu() {
  mainMenu.classList.remove("hidden");
  touristMode.classList.add("hidden");
  restaurantMode.classList.add("hidden");
  document.body.classList.remove("view-travel-only");
}

btnTourist.addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  touristMode.classList.remove("hidden");
  document.body.classList.add("view-travel-only");
});

btnFood.addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  restaurantMode.classList.remove("hidden");
  document.body.classList.add("view-travel-only");
});

document.querySelectorAll(".back-btn").forEach(btn => {
  btn.addEventListener("click", showMenu);
});

/**********************
 * TOURIST MODE — USE USER LOCATION
 **********************/
touristLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Location not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    // Set Google Map iframe
touristMap.src =
  `https://www.google.com/maps?q=tourist+attractions+near+${lat},${lng}&hl=en&z=14&output=embed`;


    // Recommend 4 tourist spots (static sample)
    touristList.innerHTML = `
      <h3>Recommended attractions</h3>
      <ul>
        <li>🌄 City Tower</li>
        <li>🏛 History Museum</li>
        <li>🌳 Central Park</li>
        <li>🛍 Popular Shopping Street</li>
      </ul>
    `;
  });
});

/**********************
 * RESTAURANT MODE — SEARCH
 **********************/
travelSearchBtn.addEventListener("click", () => {
  const country = travelCountry.value;
  const location = travelLocation.value.trim();

  if (!location) {
    alert("Please enter a location.");
    return;
  }

  const word = translateWord(country, "restaurant");
  const query = `${location} ${word}`;

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    "_blank"
  );

  mapLinks.innerHTML = `
    <p>Opened Google Maps search for:<br>
    <strong>${query}</strong></p>
  `;
});







