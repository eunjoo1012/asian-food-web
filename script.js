// Simple console check
console.log("script.js loaded");

// Teachable Machine model URL
const URL = "https://teachablemachine.withgoogle.com/models/SCrCm4nRI/";

// Food info: country, flag, calories, description
const foodInfo = {
  // China
  "Dim Sum": {
    country: "China",
    flag: "🇨🇳",
    calories: 360,
    description:
      "A variety of small Chinese dishes served in steamer baskets or plates, often enjoyed as brunch with tea."
  },
  "Chinese Eight Treasure Stir-fry": {
    country: "China",
    flag: "🇨🇳",
    calories: 293,
    description:
      "A sweet dessert pudding made with glutinous rice and assorted dried fruits and nuts."
  },
  "Dongpo Pork": {
    country: "China",
    flag: "🇨🇳",
    calories: 603,
    description:
      "Braised pork belly cooked with soy sauce, sugar, and wine, resulting in rich and tender flavors."
  },
  "Jjamppong": {
    country: "China",
    flag: "🇨🇳",
    calories: 713,
    description:
      "Spicy mixed seafood noodle soup with vegetables, originally from China but popular in Korea too."
  },
  "Kkanpunggi": {
    country: "China",
    flag: "🇨🇳",
    calories: 865,
    description:
      "Spicy, garlicky fried chicken or shrimp, stir-fried with vegetables in Chinese-Korean cuisine."
  },
  "Hot Pot": {
    country: "China",
    flag: "🇨🇳",
    calories: 485,
    description:
      "A communal dish where diners cook meats and vegetables in a simmering pot of broth at the table."
  },
  "Mapo Tofu": {
    country: "China",
    flag: "🇨🇳",
    calories: 420,
    description:
      "Spicy Sichuan dish featuring tofu and ground meat in chili and bean-based sauce."
  },
  "Peking Duck": {
    country: "China",
    flag: "🇨🇳",
    calories: 465,
    description:
      "Famous Beijing dish with crispy duck skin and tender meat, typically served with pancakes and sweet sauce."
  },

  // Japan
  "Sushi": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 350,
    description:
      "Vinegared rice combined with seafood, vegetables, or egg; the most iconic dish of Japanese cuisine."
  },
  "Miso_Soup": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 50,
    description:
      "Classic Japanese soup made with fermented soybean paste, seaweed, tofu, and green onion."
  },
  "Ramen": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 500,
    description:
      "Noodle soup served in meat or fish-based broth with toppings like pork, egg, and vegetables."
  },
  "Takoyaki": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 400,
    description:
      "Ball-shaped snacks with diced octopus, fried in wheat batter and topped with sauce and bonito flakes."
  },
  "Tempura": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 400,
    description:
      "Seafood or vegetables battered and deep-fried until light and crispy."
  },
  "Katsu Don": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 540,
    description:
      "Rice bowl topped with breaded pork cutlet and egg simmered in savory sauce."
  },
  "Okonomiyaki": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 410,
    description:
      "Savory pancake with cabbage, meat or seafood, and sweet sauce plus mayonnaise."
  },
  "Sukiyaki": {
    country: "Japan",
    flag: "🇯🇵",
    calories: 630,
    description:
      "Hot pot dish of beef, tofu, and vegetables simmered in sweet soy-based broth."
  },

  // Korea
  "Bibimbap": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 460,
    description:
      "Rice dish topped with assorted vegetables, egg, and chili paste, served in a hot bowl."
  },
  "Bulgogi": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 250,
    description:
      "Grilled marinated beef or pork, sweet and savory."
  },
  "Kimchi Jjigae": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 400,
    description:
      "Spicy stew made from kimchi, pork, and vegetables."
  },
  "Samgyeopsal": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 180,
    description:
      "Unseasoned pork belly slices grilled at the table and eaten with dipping sauces."
  },
  "Kimbap": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 125,
    description:
      "Seaweed rice roll filled with vegetables, egg, and meat; a popular Korean picnic snack."
  },
  "Doenjang Jjigae": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 280,
    description:
      "Hearty stew with soybean paste, tofu, and a mix of vegetables."
  },
  "Japchae": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 220,
    description:
      "Stir-fried sweet potato glass noodles with vegetables and beef in soy sauce-based glaze."
  },
  "Tteokbokki": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 480,
    description:
      "Chewy rice cakes cooked in spicy gochujang sauce, often with fish cake and boiled egg."
  },

  // Thailand
  "Pad Thai": {
    country: "Thailand",
    flag: "🇹🇭",
    calories: 357,
    description:
      "Stir-fried rice noodles with egg, shrimp or chicken, peanuts, and tamarind sauce."
  },
  "Tom Yum Goong": {
    country: "Thailand",
    flag: "🇹🇭",
    calories: 196,
    description:
      "Spicy and sour shrimp soup flavored with lemongrass, kaffir lime, and chili."
  },
  "Khao Pad": {
    country: "Thailand",
    flag: "🇹🇭",
    calories: 555,
    description:
      "Thai fried rice with meat or seafood, egg, and vegetables."
  },
  "Som Tam": {
    country: "Thailand",
    flag: "🇹🇭",
    calories: 122,
    description:
      "Spicy green papaya salad mixed with chili, lime, fish sauce, and peanuts."
  },
  "Green Curry": {
    country: "Thailand",
    flag: "🇹🇭",
    calories: 620,
    description:
      "Thai curry in coconut milk, with green chili, meat, and assorted vegetables."
  },
  "Massaman Curry": {
    country: "Thailand",
    flag: "🇹🇭",
    calories: 530,
    description:
      "Rich and mild curry with coconut milk, potato, peanuts, influenced by Indian spices."
  },
  "Pad kra phao": {
    country: "Thailand",
    flag: "🇹🇭",
    calories: 410,
    description:
      "Stir-fried meat with garlic, chili, and holy basil, topped with fried egg."
  },
  "Mango Sticky Rice": {
    country: "Thailand",
    flag: "🇹🇭",
    calories: 350,
    description:
      "Sweet glutinous rice topped with coconut milk and slices of ripe mango."
  }
};

// === Food recommendations based on main dish ===
const foodRecommendations = {
  Bibimbap: ["Bulgogi", "Japchae", "Tteokbokki"],
  Bulgogi: ["Bibimbap", "Kimbap", "Japchae"],
  "Kimchi Jjigae": ["Doenjang Jjigae", "Samgyeopsal"],
  Samgyeopsal: ["Kimchi Jjigae", "Tteokbokki"],
  Kimbap: ["Tteokbokki", "Bibimbap"],

  Sushi: ["Ramen", "Tempura", "Takoyaki"],
  Ramen: ["Sushi", "Katsu Don", "Takoyaki"],
  Tempura: ["Sushi", "Okonomiyaki"],
  Miso_Soup: ["Sushi", "Ramen"],

  "Dim Sum": ["Hot Pot", "Mapo Tofu", "Peking Duck"],
  "Hot Pot": ["Dim Sum", "Mapo Tofu"],
  "Mapo Tofu": ["Dim Sum", "Dongpo Pork"],

  "Pad Thai": ["Tom Yum Goong", "Som Tam", "Mango Sticky Rice"],
  "Tom Yum Goong": ["Pad Thai", "Som Tam"],
  "Mango Sticky Rice": ["Pad Thai", "Khao Pad"]
};

// Model / state
let model;
let isModelReady = false;

// HTML elements (classifier)
const fileInput = document.getElementById("image-input");
const previewImage = document.getElementById("preview-image");
const resultCountry = document.getElementById("result-country");
const resultList = document.getElementById("result-list");
const statusEl = document.getElementById("status");
const recommendationBox = document.getElementById("recommendation-box");

// HTML elements (travel section)
const travelCountry = document.getElementById("travel-country");
const travelLocation = document.getElementById("travel-location");
const mapServiceSelect = document.getElementById("map-service");
const travelBtn = document.getElementById("travel-search-btn");
const mapLinks = document.getElementById("map-links");

// Calorie emoji
function calorieEmoji(cal) {
  if (cal < 500) return "🟡";
  if (cal <= 700) return "🔵";
  return "🔴";
}

// Status text + calorie guide
function setStatus(mainText) {
  statusEl.innerHTML = `
    ${mainText}<br>
    <span class="calorie-guide">
      Calorie guide — 🟡: &lt; 500 kcal, 🔵: 500–700 kcal (typical one meal range), 🔴: &gt; 700 kcal.
    </span>
  `;
}

// Global error catch
window.onerror = function (msg, url, line, col, error) {
  console.error("JS ERROR:", msg, "at", line + ":" + col);
  setStatus("Something went wrong in the script. Please refresh the page.");
};

// Model loading
window.addEventListener("load", async () => {
  console.log("window loaded, starting model load");
  try {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // tmImage는 Teachable Machine 이미지 라이브러리 전역 객체
    model = await tmImage.load(modelURL, metadataURL);
    isModelReady = true;
    setStatus("Model loaded! Upload a food image.");
    fileInput.disabled = false;
  } catch (err) {
    console.error(err);
    setStatus("Model failed to load. Please refresh and try again.");
  }
});

// File upload event
fileInput.addEventListener("change", handleUpload);

// Travel search button
travelBtn.addEventListener("click", handleTravelSearch);

function handleUpload(e) {
  const file = e.target.files[0];

  if (!file) return;

  if (!isModelReady) {
    setStatus("Model is still loading. Please wait a moment.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (ev) => {
    previewImage.src = ev.target.result;
    previewImage.onload = () => predict(previewImage);
  };
  reader.readAsDataURL(file);
}

// Prediction
async function predict(image) {
  setStatus("Predicting...");

  const prediction = await model.predict(image);
  prediction.sort((a, b) => b.probability - a.probability);

  const top1 = prediction[0];
  const info = foodInfo[top1.className];

  // Unknown class
  if (!info) {
    resultCountry.innerHTML = `
      <div class="main-result-line">
        🌏 Unknown cuisine — ${top1.className}
        <span class="prob"> (${(top1.probability * 100).toFixed(1)}%)</span>
      </div>
      <div class="calorie-message">
        This food is not in our database yet. The model is still learning!
      </div>
    `;
    resultList.innerHTML = "";
    recommendationBox.innerHTML = "";
    setStatus("Prediction complete!");
    return;
  }

  // Show recommendations for this dish
  renderRecommendations(top1.className);

  const emoji = calorieEmoji(info.calories);
  const neutralCalorieNote =
    "This calorie value is based on a typical serving size. Your actual intake can be higher or lower depending on how much you eat.";

  // Main result
  resultCountry.innerHTML = `
    <div class="main-result-line">
      <span class="flag">${info.flag}</span>
      <span class="country">${info.country}</span>
      <span class="dash"> — </span>
      <span class="food">${top1.className}</span>
      <span class="prob"> (${(top1.probability * 100).toFixed(1)}%)</span>
    </div>
    <div class="sub-info">
      ${emoji} ${info.calories} kcal · ${info.description}
    </div>
    <div class="calorie-message">
      ${neutralCalorieNote}
    </div>
  `;

  // Top-3 ASCII bar
  resultList.innerHTML = "";
  const maxBlocks = 20;

  prediction.slice(0, 3).forEach((p) => {
    const item = foodInfo[p.className];
    const prefix = item ? `${item.flag} ${item.country}` : "🌏";
    const extra = item ? ` · ${item.calories} kcal` : "";
    const percentage = p.probability * 100;

    const filledBlocks = Math.round((percentage / 100) * maxBlocks);
    const emptyBlocks = Math.max(0, maxBlocks - filledBlocks);
    const bar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

    const row = document.createElement("div");
    row.className = "ascii-row";
    row.innerHTML = `
      <div class="ascii-text">
        ${prefix} — ${p.className}: ${percentage.toFixed(1)}%${extra}
      </div>
      <div class="ascii-bar">${bar}</div>
    `;
    resultList.appendChild(row);
  });

  setStatus("Prediction complete!");
}

// Recommendation box
function renderRecommendations(mainClassName) {
  const recList = foodRecommendations[mainClassName];

  if (!recList || recList.length === 0) {
    recommendationBox.innerHTML = "";
    return;
  }

  const itemsHtml = recList
    .map((name) => {
      const item = foodInfo[name];
      if (!item) return `<li>${name}</li>`;
      return `
        <li>
          <span class="flag">${item.flag}</span>
          <strong>${name}</strong> · ${item.country} · ${item.calories} kcal
        </li>
      `;
    })
    .join("");

  recommendationBox.innerHTML = `
    <div class="recommend-box-inner">
      <h3>✨ Next, you might also like...</h3>
      <ul>
        ${itemsHtml}
      </ul>
      <p class="recommend-note">
        These are similar or popular dishes from the same region.
        You can try them on your next trip!
      </p>
    </div>
  `;
}

// Travel & map search
function handleTravelSearch(e) {
  e.preventDefault();

  const country = travelCountry.value;
  const location = travelLocation.value.trim();
  const service = mapServiceSelect.value;

  if (!location) {
    mapLinks.innerHTML = "<p>Please enter your travel area.</p>";
    return;
  }

  const keyword = encodeURIComponent(`${location} ${country} 맛집`);
  let url = "";

  if (service === "kakao") {
    url = `https://map.kakao.com/?q=${keyword}`;
  } else if (service === "google") {
    url = `https://www.google.com/maps/search/?api=1&query=${keyword}`;
  } else if (service === "naver") {
    url = `https://map.naver.com/p/search/${keyword}`;
  }

  mapLinks.innerHTML = `
    <p>
      Open restaurant search in <strong>${service}</strong>:<br>
      <a href="${url}" target="_blank" rel="noopener noreferrer">
        View restaurants on map
      </a>
    </p>
  `;
}









