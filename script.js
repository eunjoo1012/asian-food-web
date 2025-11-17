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

// Model / state
let model;
let isModelReady = false;

// HTML elements
const fileInput = document.getElementById("image-input");
const previewImage = document.getElementById("preview-image");
const resultCountry = document.getElementById("result-country");
const resultList = document.getElementById("result-list");
const statusEl = document.getElementById("status");

// Calorie emoji & message
function calorieEmoji(cal) {
  if (cal < 500) return "🟡";
  if (cal <= 700) return "🔵";
  return "🔴";
}

function calorieMessage(cal) {
  if (cal < 500)
    return "Calories are a bit low. You could eat a little more in your next meal.";
  if (cal <= 700)
    return "This is within the recommended range for one meal. Nice choice!";
  return "This meal is quite high in calories. A lighter option next time might be a good idea.";
}

// Status text + calorie guide
function setStatus(mainText) {
  statusEl.innerHTML = `
    ${mainText}<br>
    <span class="calorie-guide">
      Calorie guide — 🟡: &lt; 500 kcal (low), 🔵: 500–700 kcal (recommended for one meal), 🔴: &gt; 700 kcal (high)
    </span>
  `;
}

// Model loading
window.addEventListener("load", async () => {
  console.log("window loaded, starting model load");
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
  const info = foodInfo[top1.className];

  if (top1.probability < 0.5) {
    // No clear match
    resultCountry.innerHTML = `
      <div class="main-result-line" style="color:#ff6b6b; font-size:26px; font-weight:800;">
        ❌ No clear match
      </div>
      <div class="sub-info">
        The model is only ${(top1.probability * 100).toFixed(
          1
        )}% confident. Try another photo or angle.
      </div>
    `;
  } else if (info) {
    // Normal case
    const emoji = calorieEmoji(info.calories);
    const msg = calorieMessage(info.calories);

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
        ${msg}
      </div>
    `;
  } else {
    // Label not found in foodInfo
    resultCountry.innerHTML = `
      <div class="main-result-line">
        🌏 Unknown cuisine — ${top1.className}
        <span class="prob"> (${(top1.probability * 100).toFixed(1)}%)</span>
      </div>
    `;
  }

  // Top-3 visualization (ASCII bar style)
  resultList.innerHTML = "";
  const maxProb = prediction[0].probability || 1;

  function makeAsciiBar(prob) {
    const totalBlocks = 20; // 20칸짜리 막대
    const filled = Math.max(1, Math.round((prob / maxProb) * totalBlocks));
    const empty = totalBlocks - filled;
    return "█".repeat(filled) + "░".repeat(empty);
  }

  prediction.slice(0, 3).forEach((p) => {
    const item = foodInfo[p.className];
    const prefix = item ? `${item.flag} ${item.country}` : "🌏";
    const extra = item ? ` · ${item.calories} kcal` : "";
    const percent = (p.probability * 100).toFixed(1);
    const bar = makeAsciiBar(p.probability);

    const row = document.createElement("div");
    row.className = "ascii-row";
    row.innerHTML = `
      <div class="ascii-text">
        ${prefix} — ${p.className}: ${percent}%${extra}
      </div>
      <div class="ascii-bar">${bar}</div>
    `;
    resultList.appendChild(row);
  });


  setStatus("Prediction complete!");
}

















