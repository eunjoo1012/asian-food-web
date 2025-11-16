// @ts-nocheck

// 1. Teachable Machine 모델 URL
const URL = "https://teachablemachine.withgoogle.com/models/SCrCm4nRI/";

// 2. 전역 변수
let model;
let isModelReady = false;

// HTML 요소
const fileInput = document.getElementById("image-input");
const previewImage = document.getElementById("preview-image");
const resultCountry = document.getElementById("result-country");
const resultList = document.getElementById("result-list");
const statusEl = document.getElementById("status");

// 3. 페이지 로드 시 모델 불러오기
window.addEventListener("load", init);

async function init() {
  try {
    statusEl.textContent = "Loading model...";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    isModelReady = true;
    statusEl.textContent = "Model loaded! Upload a food image.";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Failed to load model. Please refresh the page.";
  }
}

// 4. 파일 업로드 이벤트
fileInput.addEventListener("change", handleUpload);

function handleUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!isModelReady) {
    statusEl.textContent = "Model is still loading. Please wait...";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    previewImage.onload = () => {
      predict(previewImage);
    };
  };
  reader.readAsDataURL(file);
}

// 5. 예측 함수 (일단 top1만 표시하는 심플 버전)
async function predict(imageElement) {
  try {
    statusEl.textContent = "Predicting...";

    const prediction = await model.predict(imageElement);

    // 확률 순 정렬
    prediction.sort((a, b) => b.probability - a.probability);

    const top1 = prediction[0];

    // 결과 표시
    resultList.innerHTML = "";
    prediction.slice(0, 3).forEach((p) => {
      const div = document.createElement("div");
      div.textContent = `${p.className}: ${(p.probability * 100).toFixed(1)}%`;
      resultList.appendChild(div);
    });

    resultCountry.textContent =
      "Top prediction: " +
      top1.className +
      " (" +
      (top1.probability * 100).toFixed(1) +
      "%)";

    if (top1.probability < 0.6) {
      statusEl.textContent =
        "Low confidence (<0.6). Try another angle or better lighting.";
    } else {
      statusEl.textContent = "Prediction complete!";
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error during prediction. Please try again.";
  }
}


