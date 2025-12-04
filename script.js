/****************************
 * Basic check
 ****************************/
console.log("script.js loaded");

/****************************
 * Teachable Machine model
 ****************************/
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/SCrCm4nRI/";

/****************************
 * DOM: 화면 전환 (메뉴/모드들)
 ****************************/
const mainMenu = document.getElementById("main-menu");

const foodMode = document.getElementById("food-mode");
const touristMode = document.getElementById("tourist-mode");
const restaurantMode = document.getElementById("restaurant-mode");

// 메인 메뉴 버튼
const btnFood = document.getElementById("btn-food");
const btnTravel = document.getElementById("btn-travel");
const btnRestaurant = document.getElementById("btn-restaurant");

// 뒤로가기 버튼
const backToMainFood = document.getElementById("back-to-travel-main");
const backToMain1 = document.getElementById("back-to-main-1");
const backToMain2 = document.getElementById("back-to-main-2");

/****************************
 * DOM: 음식 판별
 ****************************/
const fileInput = document.getElementById("image-input");
const previewImage = document.getElementById("preview-image");
const statusEl = document.getElementById("status");
const resultCountry = document.getElementById("result-country");
const recommendationBox = document.getElementById("recommendation-box");
const resultList = document.getElementById("result-list");
const foodRestaurantBtn = document.getElementById("food-restaurant-btn");

/****************************
 * DOM: 관광지 모드
 ****************************/
const btnCurrentLocation = document.getElementById("btn-current-location");
const touristList = document.getElementById("tourist-list");
const touristMap = document.getElementById("tourist-map");

/****************************
 * DOM: 맛집 모드
 ****************************/
const travelCountry = document.getElementById("travel-country");
const travelLocation = document.getElementById("travel-location");
const travelSearchBtn = document.getElementById("travel-search-btn");
const restaurantResultText = document.getElementById("restaurant-result-text");

/****************************
 * 화면 전환 유틸
 ****************************/
function hideAllSections() {
  mainMenu.classList.add("hidden");
  foodMode.classList.add("hidden");
  touristMode.classList.add("hidden");
  restaurantMode.classList.add("hidden");
}

function showMainMenu() {
  hideAllSections();
  mainMenu.classList.remove("hidden");
}

function showSection(sectionElement) {
  hideAllSections();
  sectionElement.classList.remove("hidden");
}

// 메인 메뉴 → 각 모드로 이동
btnFood.addEventListener("click", () => showSection(foodMode));
btnTravel.addEventListener("click", () => showSection(touristMode));
btnRestaurant.addEventListener("click", () => showSection(restaurantMode));

// 각 모드에서 메인 메뉴로 되돌아가기
backToMainFood.addEventListener("click", showMainMenu);
backToMain1.addEventListener("click", showMainMenu);
backToMain2.addEventListener("click", showMainMenu);

/****************************
 * 음식 정보 DB
 ****************************/
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
    description: "Grilled marinated beef or pork, sweet and savory."
  },
  "Kimchi Jjigae": {
    country: "Korea",
    flag: "🇰🇷",
    calories: 400,
    description: "Spicy stew made from kimchi, pork, and vegetables."
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

/****************************
 * Helper: 칼로리 이모티콘
 ****************************/
function calorieEmoji(cal) {
  if (cal < 500) return "🟡";
  if (cal <= 700) return "🔵";
  return "🔴";
}

/****************************
 * Helper: 상태 표시
 ****************************/
function setStatus(text) {
  if (!statusEl) return;
  statusEl.innerHTML = `
    ${text}<br>
    <span class="calorie-guide">
      Calorie guide — 🟡: &lt; 500 kcal, 🔵: 500–700 kcal, 🔴: &gt; 700 kcal.
    </span>
  `;
}

/****************************
 * Teachable Machine 모델 로딩
 ****************************/
let model;
let isModelReady = false;

window.addEventListener("load", async () => {
  try {
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    isModelReady = true;
    setStatus("Model loaded! Upload a food image.");
  } catch (err) {
    console.error(err);
    setStatus("Model failed to load. Please refresh and try again.");
  }
});

/****************************
 * 파일 업로드
 ****************************/
if (fileInput) {
  fileInput.addEventListener("change", handleUpload);
}

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

/****************************
 * Prediction
 ****************************/
async function predict(image) {
  setStatus("Predicting...");

  const prediction = await model.predict(image);
  prediction.sort((a, b) => b.probability - a.probability);

  const top1 = prediction[0];

  // 50% 이하 → 일치 없음
  if (top1.probability < 0.5) {
    resultCountry.innerHTML = `
      <div class="main-result-line">
        🌏 No matching food (below 50%)
      </div>
      <p class="calorie-message">Try a clearer photo.</p>
    `;
    resultList.innerHTML = "";
    recommendationBox.innerHTML = "";
    foodRestaurantBtn.classList.remove("show");
    setStatus("Prediction complete!");
    return;
  }

  const info = foodInfo[top1.className];

  if (!info) {
    resultCountry.innerHTML = `
      <div class="main-result-line">
        🌏 Unknown food — ${top1.className}
        <span class="prob">(${(top1.probability * 100).toFixed(1)}%)</span>
      </div>
      <p>This food is not in our database yet.</p>
    `;
    resultList.innerHTML = "";
    recommendationBox.innerHTML = "";
    foodRestaurantBtn.classList.remove("show");
    setStatus("Prediction complete!");
    return;
  }

  // 메인 결과
  const emoji = calorieEmoji(info.calories);
  resultCountry.innerHTML = `
    <div class="main-result-line">
      <span>${info.flag}</span>
      <strong>${info.country}</strong> — 
      <span class="food">${top1.className}</span>
      <span class="prob">(${(top1.probability * 100).toFixed(1)}%)</span>
    </div>
    <div class="sub-info">
      ${emoji} ${info.calories} kcal · ${info.description}
    </div>
    <p class="calorie-message">
      This calorie value is based on a typical serving size.
    </p>
  `;

  // Top-3 리스트 (텍스트)
  resultList.innerHTML = "";
  prediction.slice(0, 3).forEach((p) => {
    const item = foodInfo[p.className];
    const prefix = item ? `${item.flag} ${item.country}` : "🌏";
    const extra = item ? ` · ${item.calories} kcal` : "";
    const percentage = (p.probability * 100).toFixed(1);

    const row = document.createElement("div");
    row.className = "ascii-row";
    row.innerHTML = `
      <div>${prefix} — ${p.className}: ${percentage}%${extra}</div>
    `;
    resultList.appendChild(row);
  });

  // 추천 텍스트 (심플하게)
  recommendationBox.innerHTML = `
    <h3>✨ Next, you might also like...</h3>
    <p>Try other famous dishes from ${info.country} on your next trip!</p>
  `;

  // 이 음식으로 맛집 찾기 버튼 세팅
  foodRestaurantBtn.dataset.foodName = top1.className;
  foodRestaurantBtn.dataset.country = info.country;
  foodRestaurantBtn.classList.add("show");

  setStatus("Prediction complete!");
}

/****************************
 * Helper: 나라별 '맛집' 번역
 ****************************/
function restaurantWordByCountry(country) {
  switch (country) {
    case "Korea":
      return "맛집";
    case "Japan":
      return "美味しい店";
    case "China":
      return "好吃的餐厅";
    case "Thailand":
      return "ร้านอาหารอร่อย";
    default:
      return "restaurants";
  }
}

/****************************
 * 음식 → 해당 음식 맛집 검색
 ****************************/
foodRestaurantBtn.addEventListener("click", () => {
  const foodName = foodRestaurantBtn.dataset.foodName;
  const country = foodRestaurantBtn.dataset.country;

  if (!foodName || !country) return;

  const word = restaurantWordByCountry(country);
  const query = `${foodName} ${word}`;

  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

/****************************
 * 관광지 모드: 현재 위치 사용
 ****************************/
btnCurrentLocation.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported in this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // API key 없이 embed
      touristMap.src = `https://www.google.com/maps?q=tourist+attractions+near+${lat},${lng}&hl=en&z=14&output=embed`;

      touristList.innerHTML = `
        <h3>Recommended attractions</h3>
        <ul>
          <li>🏙️ City Tower</li>
          <li>🏛️ History Museum</li>
          <li>🌳 Central Park</li>
          <li>🛍️ Popular Shopping Street</li>
        </ul>
        <p style="margin-top:8px;font-size:0.85rem;opacity:0.8;">
          These are example spots. On Google Maps, you can zoom in and explore real places around you.
        </p>
      `;
    },
    (err) => {
      console.error(err);
      alert("Failed to get your location. Please check browser permissions.");
    }
  );
});

/****************************
 * 맛집 모드: 여행지 + 나라 언어로 검색
 ****************************/
travelSearchBtn.addEventListener("click", () => {
  const country = travelCountry.value;
  const location = travelLocation.value.trim();

  if (!location) {
    alert("Please enter your travel area.");
    return;
  }

  const word = restaurantWordByCountry(country);
  const query = `${location} ${word}`;

  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
  window.open(url, "_blank", "noopener,noreferrer");

  restaurantResultText.textContent = `Opened Google Maps search for: ${query}`;
});

/****************************
 * 처음에는 메인 메뉴만 보이도록
 ****************************/
showMainMenu();







