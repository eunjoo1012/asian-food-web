// Simple console check
console.log("script.js loaded");

// Teachable Machine model URL
const URL = "https://teachablemachine.withgoogle.com/models/SCrCm4nRI/";

// Food info
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

// Model / state
let model;
let isModelReady = false;

// HTML elements (food classifier)
const fileInput = document.getElementById("image-input");
const previewImage = document.getElementById("preview-image");
const resultCountry = document.getElementById("result-country");
const resultList = document.getElementById("result-list");
const recommendationBox = document.getElementById("recommendation-box");
const statusEl = document.getElementById("status");

// Travel elements
const travelCountry = document.getElementById("travel-country");
const travelLocation = document.getElementById("travel-location");
const mapServiceSelect = document.getElementById("map-service");
const travelBtn = document.getElementById("travel-search-btn");
const mapLinks = document.getElementById("map-links");

// Search mode radios
const modeAreaRadio = document.getElementById("mode-area");
const modeCurrentRadio = document.getElementById("mode-current");

// Back to main screen button
const viewMainBtn = document.getElementById("view-main-btn");

// Calorie indicator
function calorieEmoji(cal) {
  if (cal < 500) return "🟡";
  if (cal <= 700) return "🔵";
  return "🔴";
}

// Status text update
function setStatus(mainText) {
  statusEl.innerHTML = `
    ${mainText}<br>
    <span class="calorie-guide">
      Calorie guide — 🟡: &lt; 500 kcal, 🔵: 500–700 kcal, 🔴: &gt; 700 kcal.
    </span>`;
}

// 🔹 검색 모드에 따라 travel-location 입력창 상태 업데이트
function updateTravelInputState() {
  const isAreaMode = modeAreaRadio.checked;

  travelLocation.disabled = !isAreaMode;
  travelLocation.placeholder = isAreaMode
    ? "e.g. Myeongdong, Seoul / Shibuya, Tokyo"
    : "Using your current GPS location";
}

// Model loading + 초기 상태 설정
window.addEventListener("load", async () => {
  // search mode UI 초기화
  updateTravelInputState();

  try {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    isModelReady = true;
    setStatus("Model loaded! Upload a food image.");
  } catch (err) {
    console.error(err);
    setStatus("Model failed to load. Please refresh and try again.");
  }
});

// search mode 라디오 변경 시 input 상태 변경
modeAreaRadio.addEventListener("change", updateTravelInputState);
modeCurrentRadio.addEventListener("change", updateTravelInputState);

// File upload
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

// Prediction
async function predict(image) {
  setStatus("Predicting...");

  const prediction = await model.predict(image);
  prediction.sort((a, b) => b.probability - a.probability);

  const top1 = prediction[0];

  // 50% 이하 → 일치 없음 (그래도 음식 화면 풀사이즈)
  if (top1.probability < 0.5) {
    document.body.classList.add("view-food-only");
    document.body.classList.remove("view-travel-only");

    resultCountry.innerHTML = `
      <div class="main-result-line">
        🌏 No matching food (below 50%)
      </div>
      <p class="calorie-message">Try another photo or clearer image.</p>
    `;
    resultList.innerHTML = "";
    recommendationBox.innerHTML = "";
    setStatus("Prediction complete!");
    return;
  }

  const info = foodInfo[top1.className];

  // Unknown 라벨 (역시 음식 화면 풀사이즈)
  if (!info) {
    document.body.classList.add("view-food-only");
    document.body.classList.remove("view-travel-only");

    resultCountry.innerHTML = `
      <div class="main-result-line">
        🌏 Unknown food — ${top1.className}
        <span class="prob">(${(top1.probability * 100).toFixed(1)}%)</span>
      </div>
      <p>This food is not in our database yet.</p>
    `;
    resultList.innerHTML = "";
    recommendationBox.innerHTML = "";
    setStatus("Prediction complete!");
    return;
  }

  // 추천 음식 렌더링 (간단 설명용)
  renderRecommendations(top1.className);

  // 정상 예측 → 음식 풀사이즈 모드
  document.body.classList.add("view-food-only");
  document.body.classList.remove("view-travel-only");

  // Main result
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

  // Top-3 list (ASCII bar)
  resultList.innerHTML = "";
  const maxBlocks = 20;

  prediction.slice(0, 3).forEach((p) => {
    const item = foodInfo[p.className];
    const prefix = item ? `${item.flag} ${item.country}` : "🌏";
    const extra = item ? ` · ${item.calories} kcal` : "";
    const percentage = p.probability * 100;

  const filledBlocks = Math.round((percentage / 100) * maxBlocks);
  const emptyBlocks = maxBlocks - filledBlocks;
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

// 추천 음식 표시 (간단 버전 – 필요하면 리스트로 확장 가능)
function renderRecommendations(foodName) {
  recommendationBox.innerHTML = `
    <h3>✨ Next, you might also like...</h3>
    <p>These are similar or popular dishes from the same region.</p>
  `;
}

// 여행 검색 버튼 클릭
travelBtn.addEventListener("click", handleTravelSearch);

function handleTravelSearch(e) {
  e.preventDefault();

  const country = travelCountry.value;
  const service = mapServiceSelect.value;
  const searchMode = document.querySelector(
    'input[name="search-mode"]:checked'
  ).value;

  // 여행 모드 → 오른쪽만 풀사이즈
  document.body.classList.add("view-travel-only");
  document.body.classList.remove("view-food-only");

  // 1) 현재 위치 기반 모드
  if (searchMode === "current") {
    if (!navigator.geolocation) {
      alert(
        "Your browser does not support location services. Please use the travel area mode."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // 위치 모드는 Google Maps만 사용
        const url = `https://www.google.com/maps/search/restaurants/@${lat},${lng},15z`;
        window.open(url, "_blank", "noopener,noreferrer");

        mapLinks.innerHTML = `
          <p>Opened <strong>Google Maps</strong> search near your current location.</p>
        `;
      },
      (err) => {
        console.error(err);
        alert(
          "We could not get your location. Please allow location access or use the travel area mode."
        );
      }
    );

    return;
  }

  // 2) 여행지 이름 기반 모드
  const location = travelLocation.value.trim();

  if (!location) {
    alert("Please enter your travel area.");
    return;
  }

  let keywordText = "";

  // Google Maps → 영어 검색어
  if (service === "google") {
    keywordText = `${location} ${country} best restaurants`;
  } else {
    // Kakao / Naver → 현지 언어로 변환
    if (country === "Korea") {
      keywordText = `${location} 맛집`;
    } else if (country === "Japan") {
      keywordText = `${location} 美味しい店`;
    } else if (country === "China") {
      keywordText = `${location} 美食`;
    } else if (country === "Thailand") {
      keywordText = `${location} ร้านอาหาร`;
    } else {
      keywordText = `${location} restaurants`;
    }
  }

  const keyword = encodeURIComponent(keywordText);
  let url = "";

  if (service === "kakao") {
    url = `https://map.kakao.com/?q=${keyword}`;
  } else if (service === "google") {
    url = `https://www.google.com/maps/search/?api=1&query=${keyword}`;
  } else if (service === "naver") {
    url = `https://map.naver.com/p/search/${keyword}`;
  }

  window.open(url, "_blank", "noopener,noreferrer");

  mapLinks.innerHTML = `
    <p>Opened <strong>${service}</strong> search for:<br>
    <span class="map-keyword">${keywordText}</span></p>
  `;
}

// 🔙 메인 화면으로 돌아가기
viewMainBtn.addEventListener("click", () => {
  document.body.classList.remove("view-food-only", "view-travel-only");
});









