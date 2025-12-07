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
// 나라별 대표 도시 2개씩 추천
const areaTagsContainer = document.querySelector(".area-tags");

const areaSuggestions = {
  Korea: ["Myeongdong, Seoul", "Seongsu, Seoul"],
  Japan: ["Shibuya, Tokyo", "Akihabara, Tokyo"],
  China: ["Wangfujing, Beijing", "The Bund, Shanghai"],
  Thailand: ["Siam, Bangkok", "Old Town, Chiang Mai"]
};

function renderAreaTags(country) {
  const cities = areaSuggestions[country] || [];

  // 버튼 HTML 생성
  areaTagsContainer.innerHTML = cities
    .map(
      (city) =>
        `<button type="button" class="area-tag">${city}</button>`
    )
    .join("");

  // 클릭 시 입력창에 넣기
  const tags = areaTagsContainer.querySelectorAll(".area-tag");
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      travelLocation.value = tag.textContent;
      travelLocation.focus();
    });
  });
}

// 처음 로드될 때 현재 선택된 나라 기준으로 태그 보여주기
renderAreaTags(travelCountry.value);

// 나라 선택 바뀔 때마다 태그 다시 렌더링
travelCountry.addEventListener("change", () => {
  renderAreaTags(travelCountry.value);
});


// Travel menu buttons
const mainMenu = document.getElementById("travel-main-menu");
const touristMode = document.getElementById("tourist-mode");
const restaurantMode = document.getElementById("restaurant-mode");

const btnTourist = document.getElementById("btn-tourist-mode");
const btnFood = document.getElementById("btn-food-mode");

// Tourist mode elements
const touristList = document.getElementById("tourist-list");
const touristMap = document.getElementById("tourist-map");
// Tourist course form elements
const tourAreaInput = document.getElementById("tour-area-input");
const tourCourseBtn = document.getElementById("tour-course-btn");
const tourStyleButtons = document.querySelectorAll(".tour-style-btn");
// 코스용 지역 예시 태그 (4나라 × 2개)
const tourAreaTags = document.querySelectorAll(".tour-area-tag");
tourAreaTags.forEach(tag => {
  tag.addEventListener("click", () => {
    tourAreaInput.value = tag.textContent;
    tourAreaInput.focus();
  });
});

/**********************
/**********************
 * TOURIST COURSE DATABASE
 * (태그로 보여주는 8개 지역)
 **********************/
const courseDB = {
  // ===== 한국 =====
  "Seongsu, Seoul": {
    chill: [
      {
        time: "13:00",
        name: "Cafe Onion Seongsu",
        desc: "Industrial mood cafe with great bread.",
        mapsQuery: "Cafe Onion Seongsu"
      },
      {
        time: "15:00",
        name: "Seongsu Handmade Shoe Street",
        desc: "Walk around local select shops and galleries.",
        mapsQuery: "성수 수제화 거리"
      },
      {
        time: "18:30",
        name: "Seongsu Bridge Night View",
        desc: "Han river and city night view.",
        mapsQuery: "성수대교 전망"
      }
    ],
    shopping: [
      {
        time: "13:00",
        name: "Seongsu Select Shops",
        desc: "Explore trendy fashion and lifestyle stores.",
        mapsQuery: "성수 편집샵"
      },
      {
        time: "16:00",
        name: "Common Ground",
        desc: "Container pop-up mall & photo spots.",
        mapsQuery: "커먼그라운드"
      },
      {
        time: "18:30",
        name: "Local Restaurant Street",
        desc: "End the day with dinner at a famous restaurant street.",
        mapsQuery: "성수 맛집 거리"
      }
    ],
    night: [
      {
        time: "18:00",
        name: "Cafe with Sunset View",
        desc: "Relax with coffee before night falls.",
        mapsQuery: "성수 카페 뷰 좋은 곳"
      },
      {
        time: "19:30",
        name: "Seongsu Bridge Night View",
        desc: "Walk along the bridge and enjoy night scenery.",
        mapsQuery: "성수대교 전망"
      },
      {
        time: "21:00",
        name: "Riverside Walk",
        desc: "Slow walk along the Han river.",
        mapsQuery: "뚝섬 한강공원"
      }
    ]
  },

  "Myeongdong, Seoul": {
    chill: [
      {
        time: "13:00",
        name: "Myeongdong Cathedral",
        desc: "Quiet time at a historic cathedral.",
        mapsQuery: "Myeongdong Cathedral"
      },
      {
        time: "15:00",
        name: "Cafe Street in Myeongdong",
        desc: "Relax in a dessert cafe after shopping.",
        mapsQuery: "명동 카페 거리"
      },
      {
        time: "17:30",
        name: "Namsan Park Entrance",
        desc: "Walk slowly toward Namsan tower.",
        mapsQuery: "남산공원 입구"
      }
    ],
    shopping: [
      {
        time: "13:00",
        name: "Myeongdong Shopping Street",
        desc: "Cosmetics, fashion, and souvenir street.",
        mapsQuery: "Myeongdong Shopping Street"
      },
      {
        time: "15:30",
        name: "Lotte Department Store (Myeongdong)",
        desc: "Department store and duty free.",
        mapsQuery: "Lotte Department Store Myeongdong"
      },
      {
        time: "18:00",
        name: "Street Food Alley",
        desc: "Try Korean street snacks for dinner.",
        mapsQuery: "명동 길거리 음식"
      }
    ],
    night: [
      {
        time: "18:00",
        name: "Myeongdong Street Lights",
        desc: "Enjoy night lights and buskers.",
        mapsQuery: "Myeongdong night"
      },
      {
        time: "19:30",
        name: "N Seoul Tower",
        desc: "Night view of Seoul from the tower.",
        mapsQuery: "N Seoul Tower"
      },
      {
        time: "21:00",
        name: "View from Namsan",
        desc: "Slow walk and photos at the observatory.",
        mapsQuery: "Namsan Observatory"
      }
    ]
  },

  // ===== 일본 =====
  "Shibuya, Tokyo": {
    chill: [
      {
        time: "13:00",
        name: "Shibuya Cafe Street",
        desc: "Visit a cozy cafe around Shibuya.",
        mapsQuery: "Shibuya cafe"
      },
      {
        time: "15:00",
        name: "Hachiko Statue & Scramble Crossing",
        desc: "Take photos and watch the crossing.",
        mapsQuery: "Hachiko Statue"
      },
      {
        time: "18:30",
        name: "Shibuya Sky",
        desc: "Night view from rooftop observatory.",
        mapsQuery: "Shibuya Sky"
      }
    ],
    shopping: [
      {
        time: "13:00",
        name: "Shibuya 109",
        desc: "Iconic fashion shopping mall.",
        mapsQuery: "Shibuya 109"
      },
      {
        time: "15:30",
        name: "Center Gai Street",
        desc: "Street full of shops and food.",
        mapsQuery: "Shibuya Center Gai"
      },
      {
        time: "18:00",
        name: "PARCO Shibuya",
        desc: "Modern shopping complex with anime & art.",
        mapsQuery: "Shibuya PARCO"
      }
    ],
    night: [
      {
        time: "18:00",
        name: "Shibuya Crossing Night View",
        desc: "See the lights and crowds at night.",
        mapsQuery: "Shibuya Crossing night"
      },
      {
        time: "19:30",
        name: "Izakaya Street",
        desc: "Experience Japanese bar food and drinks.",
        mapsQuery: "Shibuya Izakaya"
      },
      {
        time: "21:00",
        name: "Shibuya Night Walk",
        desc: "Walk around side streets and neon signs.",
        mapsQuery: "Shibuya nightlife"
      }
    ]
  },

  "Akihabara, Tokyo": {
    chill: [
      {
        time: "13:00",
        name: "Akihabara Cafe",
        desc: "Relax in a themed or anime-style cafe.",
        mapsQuery: "Akihabara cafe"
      },
      {
        time: "15:00",
        name: "Kanda River Walk",
        desc: "Quiet walk near the river around Akihabara.",
        mapsQuery: "Kanda River Akihabara"
      },
      {
        time: "17:30",
        name: "Akihabara Park",
        desc: "Short break before evening lights.",
        mapsQuery: "Akihabara Park"
      }
    ],
    shopping: [
      {
        time: "13:00",
        name: "Akihabara Electric Town",
        desc: "Explore electronics and games.",
        mapsQuery: "Akihabara Electric Town"
      },
      {
        time: "15:30",
        name: "Anime & Figure Shops",
        desc: "Character goods and anime items.",
        mapsQuery: "Akihabara anime shop"
      },
      {
        time: "18:00",
        name: "Retro Game Stores",
        desc: "Old consoles and games hunting.",
        mapsQuery: "Akihabara retro game shop"
      }
    ],
    night: [
      {
        time: "18:00",
        name: "Akihabara Neon Streets",
        desc: "Take photos of neon signs at night.",
        mapsQuery: "Akihabara night"
      },
      {
        time: "19:30",
        name: "Game Center & Arcade",
        desc: "Enjoy arcade games with friends.",
        mapsQuery: "Akihabara game center"
      },
      {
        time: "21:00",
        name: "Late-night Ramen",
        desc: "Finish the day with a ramen shop.",
        mapsQuery: "Akihabara ramen"
      }
    ]
  },

  // ===== 중국 =====
  "The Bund, Shanghai": {
    chill: [
      {
        time: "13:00",
        name: "Bund Riverside Walk",
        desc: "Walk along the Huangpu River.",
        mapsQuery: "The Bund Shanghai"
      },
      {
        time: "15:00",
        name: "Historic Buildings",
        desc: "See old European-style architecture.",
        mapsQuery: "Bund historic buildings"
      },
      {
        time: "17:30",
        name: "Riverside Cafe",
        desc: "Relax with coffee and river view.",
        mapsQuery: "Bund cafe"
      }
    ],
    shopping: [
      {
        time: "13:00",
        name: "Nanjing Road Pedestrian Street",
        desc: "One of the most famous shopping streets.",
        mapsQuery: "Nanjing Road Pedestrian Street"
      },
      {
        time: "15:30",
        name: "IFC Mall",
        desc: "Modern shopping mall near the Bund.",
        mapsQuery: "Shanghai IFC Mall"
      },
      {
        time: "18:00",
        name: "Souvenir Shops",
        desc: "Look for Shanghai-style gifts.",
        mapsQuery: "Nanjing Road souvenir shop"
      }
    ],
    night: [
      {
        time: "18:00",
        name: "Bund Night View",
        desc: "See the famous skyline with lights.",
        mapsQuery: "The Bund night view"
      },
      {
        time: "19:30",
        name: "Huangpu River Cruise",
        desc: "Enjoy the night scenery from a boat.",
        mapsQuery: "Huangpu River night cruise"
      },
      {
        time: "21:00",
        name: "Rooftop Bar",
        desc: "Relax with a drink and view.",
        mapsQuery: "Bund rooftop bar"
      }
    ]
  },

  "Wangfujing, Beijing": {
    chill: [
      {
        time: "13:00",
        name: "Wangfujing Bookstore & Cafe",
        desc: "Quiet time with books and coffee.",
        mapsQuery: "Wangfujing bookstore"
      },
      {
        time: "15:00",
        name: "Nearby Hutong Walk",
        desc: "Walk through traditional alleys.",
        mapsQuery: "Beijing Hutong near Wangfujing"
      },
      {
        time: "17:30",
        name: "Small Park Rest",
        desc: "Short break before evening market.",
        mapsQuery: "Wangfujing park"
      }
    ],
    shopping: [
      {
        time: "13:00",
        name: "Wangfujing Shopping Street",
        desc: "Department stores and local shops.",
        mapsQuery: "Wangfujing Shopping Street"
      },
      {
        time: "15:30",
        name: "Beijing Department Store",
        desc: "Classic department store of Beijing.",
        mapsQuery: "Beijing Department Store Wangfujing"
      },
      {
        time: "18:00",
        name: "Snack Street",
        desc: "Try Beijing street food and snacks.",
        mapsQuery: "Wangfujing Snack Street"
      }
    ],
    night: [
      {
        time: "18:00",
        name: "Night Market",
        desc: "Explore local snacks and lights.",
        mapsQuery: "Wangfujing night market"
      },
      {
        time: "19:30",
        name: "Night Walk on Shopping Street",
        desc: "See neon signs and crowds.",
        mapsQuery: "Wangfujing night"
      },
      {
        time: "21:00",
        name: "Late Dessert Cafe",
        desc: "Finish with dessert or tea.",
        mapsQuery: "Wangfujing dessert cafe"
      }
    ]
  },

  // ===== 태국 =====
  "Siam, Bangkok": {
    chill: [
      {
        time: "13:00",
        name: "Siam Square Cafe",
        desc: "Relax in a cafe around Siam Square.",
        mapsQuery: "Siam Square cafe"
      },
      {
        time: "15:00",
        name: "Lumpini Park",
        desc: "Take a break in a big city park.",
        mapsQuery: "Lumpini Park"
      },
      {
        time: "17:30",
        name: "Skywalk Around Siam",
        desc: "Walk and watch the city from above.",
        mapsQuery: "Siam BTS Skywalk"
      }
    ],
    shopping: [
      {
        time: "13:00",
        name: "Siam Paragon",
        desc: "Luxury mall with many brands.",
        mapsQuery: "Siam Paragon"
      },
      {
        time: "15:30",
        name: "Siam Center & Siam Discovery",
        desc: "Trendy fashion and lifestyle shops.",
        mapsQuery: "Siam Center"
      },
      {
        time: "18:00",
        name: "MBK Center",
        desc: "Local-style shopping mall with good prices.",
        mapsQuery: "MBK Center"
      }
    ],
    night: [
      {
        time: "18:00",
        name: "Siam Night Lights",
        desc: "Enjoy the lights around the malls.",
        mapsQuery: "Siam Bangkok night"
      },
      {
        time: "19:30",
        name: "Rooftop Bar near Siam",
        desc: "City view with a drink.",
        mapsQuery: "Bangkok rooftop bar near Siam"
      },
      {
        time: "21:00",
        name: "Night Street Food",
        desc: "End with street food near Siam.",
        mapsQuery: "Bangkok street food Siam"
      }
    ]
  },

  "Old Town, Chiang Mai": {
    chill: [
      {
        time: "13:00",
        name: "Cafe in Old Town",
        desc: "Relax in a calm local cafe.",
        mapsQuery: "Chiang Mai Old Town cafe"
      },
      {
        time: "15:00",
        name: "Wat Phra Singh Temple",
        desc: "Visit one of the most famous temples.",
        mapsQuery: "Wat Phra Singh"
      },
      {
        time: "17:30",
        name: "City Walls & Moat Walk",
        desc: "Walk along the old city walls.",
        mapsQuery: "Chiang Mai old city wall"
      }
    ],
    shopping: [
      {
        time: "13:00",
        name: "Local Craft Shops",
        desc: "Look for handmade goods and souvenirs.",
        mapsQuery: "Chiang Mai Old Town craft shop"
      },
      {
        time: "15:30",
        name: "Warorot Market",
        desc: "Traditional market with local products.",
        mapsQuery: "Warorot Market"
      },
      {
        time: "18:00",
        name: "Sunday Walking Street (if weekend)",
        desc: "Street market with food and crafts.",
        mapsQuery: "Chiang Mai Sunday Walking Street"
      }
    ],
    night: [
      {
        time: "18:00",
        name: "Night Market in Old Town",
        desc: "Explore small night markets around the old city.",
        mapsQuery: "Chiang Mai Old Town night market"
      },
      {
        time: "19:30",
        name: "Riverside Dinner",
        desc: "Have dinner at a riverside restaurant.",
        mapsQuery: "Chiang Mai riverside restaurant"
      },
      {
        time: "21:00",
        name: "Chill Bar or Cafe",
        desc: "Finish with a relaxed drink or dessert.",
        mapsQuery: "Chiang Mai Old Town bar"
      }
    ]
  }
};

let selectedStyle = "chill";

tourStyleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tourStyleButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedStyle = btn.dataset.style;
  });
});
function renderCourse(area, style) {
  const areaData = courseDB[area];
  if (!areaData) {
    touristList.innerHTML = `
      <h3>No course data for "${area}"</h3>
      <p>Try "Seongsu, Seoul" or "Shibuya, Tokyo".</p>
    `;
    return;
  }

  const course = areaData[style];
  if (!course) {
    touristList.innerHTML = `
      <h3>No "${style}" style course for "${area}"</h3>
    `;
    return;
  }

  // 스타일 이름 변환
  const styleName =
    style === "chill" ? "Chill & Cafe" :
    style === "shopping" ? "Shopping" :
    "Night View";

  // 왼쪽 리스트 HTML 생성
  let html = `
    <h3>${area} — ${styleName} Course</h3>
    <ol class="course-list">
  `;

  course.forEach(stop => {
    html += `
      <li>
        <div class="course-time">${stop.time}</div>
        <div class="course-body">
          <div class="course-name">${stop.name}</div>
          <div class="course-desc">${stop.desc}</div>
          <button type="button" class="course-map-btn" data-query="${stop.mapsQuery}">
            📍 Open on Google Maps
          </button>
        </div>
      </li>
    `;
  });

  html += `</ol>`;
  touristList.innerHTML = html;

// 오른쪽 지도는 "지역 전체"가 보이도록 세팅
touristMap.src =
  `https://www.google.com/maps?q=${encodeURIComponent(area)}&output=embed`;


  // 리스트 내부 지도 버튼들 이벤트 연결
  const mapButtons = touristList.querySelectorAll(".course-map-btn");
  mapButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.query;
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
        "_blank"
      );
    });
  });
}
tourCourseBtn.addEventListener("click", () => {
  const area = tourAreaInput.value.trim();
  if (!area) {
    alert("Please enter a travel area for the course.");
    return;
  }

  renderCourse(area, selectedStyle);
});

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











