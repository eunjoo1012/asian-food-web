// Teachable Machine model URL
const URL = "https://teachablemachine.withgoogle.com/models/SCrCm4nRI/";

// 음식별 국가/깃발/칼로리/설명 정보
const foodInfo = {
  // ---------- China ----------
  "Dim sum": { country: "China", flag: "🇨🇳", calories: 360, description: "A variety of small Chinese dishes served in steamer baskets or plates, often enjoyed as brunch with tea." },
  "Chinese Eight Treasures": { country: "China", flag: "🇨🇳", calories: 293, description: "A sweet dessert pudding made with glutinous rice and assorted dried fruits and nuts." },
  "Dongpo Pork": { country: "China", flag: "🇨🇳", calories: 603, description: "Braised pork belly cooked with soy sauce, sugar, and wine, resulting in rich and tender flavors." },
  "Jjamppong": { country: "China", flag: "🇨🇳", calories: 713, description: "Spicy mixed seafood noodle soup with vegetables, originally from China but popular in Korea too." },
  "Kkanpunggi": { country: "China", flag: "🇨🇳", calories: 865, description: "Spicy, garlicky fried chicken or shrimp, stir-fried with vegetables in Chinese-Korean cuisine." },
  "Hot Pot": { country: "China", flag: "🇨🇳", calories: 485, description: "A communal dish where diners cook meats and vegetables in a simmering pot of broth at the table." },
  "Mapo tofu": { country: "China", flag: "🇨🇳", calories: 420, description: "Spicy Sichuan dish featuring tofu and ground meat in chili and bean-based sauce." },
  "Peking duck": { country: "China", flag: "🇨🇳", calories: 465, description: "Famous Beijing dish with crispy duck skin and tender meat, served with pancakes and sweet sauce." },

  // ---------- Japan ----------
  "sushi": { country: "Japan", flag: "🇯🇵", calories: 350, description: "Vinegared rice combined with seafood, vegetables, or egg." },
  "Miso_soup": { country: "Japan", flag: "🇯🇵", calories: 50, description: "Classic Japanese soup made with fermented soybean paste." },
  "Ramen": { country: "Japan", flag: "🇯🇵", calories: 500, description: "Noodle soup served in meat or fish-based broth." },
  "Takoyaki": { country: "Japan", flag: "🇯🇵", calories: 400, description: "Ball-shaped snacks with diced octopus." },
  "tempura": { country: "Japan", flag: "🇯🇵", calories: 400, description: "Deep-fried battered seafood or vegetables." },
  "Katsu don": { country: "Japan", flag: "🇯🇵", calories: 540, description: "Rice bowl topped with breaded pork cutlet." },
  "Okonomiyaki": { country: "Japan", flag: "🇯🇵", calories: 410, description: "Savory pancake with cabbage and meat." },
  "Sukiyaki": { country: "Japan", flag: "🇯🇵", calories: 630, description: "Hot pot dish of beef, tofu, and vegetables." },

  // ---------- Korea ----------
  "Bibimbap": { country: "Korea", flag: "🇰🇷", calories: 460, description: "Rice dish topped with assorted vegetables and egg." },
  "Bulgogi": { country: "Korea", flag: "🇰🇷", calories: 250, description: "Grilled marinated beef or pork." },
  "Kimchi Jjigae": { country: "Korea", flag: "🇰🇷", calories: 400, description: "Spicy stew made from kimchi and pork." },
  "Samgyeopsal": { country: "Korea", flag: "🇰🇷", calories: 180, description: "Grilled pork belly slices." },
  "Kimbap": { country: "Korea", flag: "🇰🇷", calories: 125, description: "Rice and vegetables rolled in seaweed." },
  "Doenjang jjigae": { country: "Korea", flag: "🇰🇷", calories: 280, description: "Hearty soybean paste stew." },
  "Japchae": { country: "Korea", flag: "🇰🇷", calories: 220, description: "Stir-fried sweet potato noodles with vegetables." },
  "Tteokbokki": { country: "Korea", flag: "🇰🇷", calories: 480, description: "Spicy stir-fried rice cakes." },

  // ---------- Thailand ----------
  "Pad Thai": { country: "Thailand", flag: "🇹🇭", calories: 357, description: "Stir-fried rice noodles with tamarind sauce." },
  "Tom Yum Goong": { country: "Thailand", flag: "🇹🇭", calories: 196, description: "Spicy and sour shrimp soup." },
  "Khao Pad": { country: "Thailand", flag: "🇹🇭", calories: 555, description: "Thai fried rice with meat or seafood." },
  "Som Tam": { country: "Thailand", flag: "🇹🇭", calories: 122, description: "Spicy green papaya salad." },
  "Green Curry": { country: "Thailand", flag: "🇹🇭", calories: 620, description: "Thai green curry with coconut milk." },
  "Massaman Curry": { country: "Thailand", flag: "🇹🇭", calories: 530, description: "Mild coconut milk curry with spices." },
  "Pad kra phao": { country: "Thailand", flag: "🇹🇭", calories: 410, description: "Basil stir-fry with chili and meat." },
  "Mango Sticky Rice": { country: "Thailand", flag: "🇹🇭", calories: 350, description: "Sticky rice with coconut milk and mango." }
};

// 모델 / 상태
let model;
let isModelReady = false;

// HTML elements
const fileInput = document.getElementById("image-input");
const previewImage = document.getElementById("preview-image");
const resultCountry = document.getElementById("result-country");
const resultList = document.getElementById("result-list");
const statusEl = document.getElementById("status");

// 칼로리 이모지 반환 함수
function calorieEmoji(cal) {
  if (cal < 500) return "🟡";
  if (cal <= 700) return "🔵";
  return "🔴";
}

// 모델 로딩
window.addEventListener("load", async () => {
  try {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    isModelReady = true;
    statusEl.textContent = "Model loaded! Upload a food image.";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Model failed to load. Refresh and try again.";
  }
});

// 파일 업로드
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

// 예측
async function predict(image) {
  statusEl.textContent = "Predicting...";

  const prediction = await model.predict(image);
  prediction.sort((a, b) => b.probability - a.probability);

  const top1 = prediction[0];
  const info = foodInfo[top1.className];

  // 1️⃣ 최고 확률 < 50% → 없음
  if (top1.probability < 0.5) {
    resultCountry.innerHTML = `
      <div class="main-result-line" style="color:#ff6b6b; font-size:26px; font-weight:800;">
        ❌ 없음 — No matching food
      </div>
      <div class="sub-info">
        Model confidence only ${(top1.probability * 100).toFixed(1)}%.
      </div>
    `;
  }

  // 2️⃣ 정상 출력
  else if (info) {
    resultCountry.innerHTML = `
      <div class="main-result-line">
        ${calorieEmoji(info.calories)} <span class="flag">${info.flag}</span>
        <span class="country">${info.country}</span>
        — <span class="food">${top1.className}</span>
        <span class="prob"> (${(top1.probability * 100).toFixed(1)}%)</span>
      </div>
      <div class="sub-info">${info.calories} kcal · ${info.description}</div>
    `;
  } else {
    resultCountry.innerHTML = `
      <div class="main-result-line">
        🌏 Unknown — ${top1.className} (${(top1.probability * 100).toFixed(1)}%)
      </div>
    `;
  }

  // 3️⃣ Top-3 + 막대그래프
  resultList.innerHTML = "";

  const maxProb = prediction[0].probability;

  prediction.slice(0, 3).forEach((p) => {
    const item = foodInfo[p.className];
    const prefix = item ? `${item.flag} ${item.country}` : "🌏";
    const extra = item ? ` · ${item.calories} kcal` : "";
    const barWidth = Math.round((p.probability / maxProb) * 100);

    const div = document.createElement("div");
    div.innerHTML = `
      ${prefix} — ${p.className}: ${(p.probability * 100).toFixed(1)}%${extra}
      <div style="height:8px; width:100%; background:#333; border-radius:4px; margin-top:4px;">
        <div style="
          height:100%;
          width:${barWidth}%;
          background:#4fa3ff;
          border-radius:4px;
        "></div>
      </div>
    `;

    resultList.appendChild(div);
  });

  statusEl.textContent = "Prediction complete!";
}














