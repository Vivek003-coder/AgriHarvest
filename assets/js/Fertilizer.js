/* ================= AI FILE ANALYSIS ================= */
function analyzeFile() {

    const fileInput = document.getElementById("fileInput");
    const preview = document.getElementById("preview");
    const result = document.getElementById("aiResult");

    if (!fileInput.files.length) {
        showToast("⚠️ Please upload a file first!");
        return;
    }

    const file = fileInput.files[0];

    /* ===== PREVIEW ===== */
    if (file.type.startsWith("image")) {

        const reader = new FileReader();

        reader.onload = function (e) {
            preview.innerHTML = `
        <p>🖼 Preview:</p>
        <img src="${e.target.result}" />
      `;
        };

        reader.readAsDataURL(file);

    } else {
        preview.innerHTML = `
      <p>📄 File: ${file.name}</p>
    `;
    }

    /* ===== AI PROCESS (SIMULATION) ===== */
    result.innerHTML = `<p>⏳ AI is analyzing your file...</p>`;

    setTimeout(() => {

        // fake intelligent output
        const crops = ["Wheat 🌾", "Rice 🌿", "Maize 🌽", "Potato 🥔"];
        const soil = ["Good ✅", "Moderate ⚠️", "Low Nutrients ❌"];
        const tips = [
            "Add organic compost",
            "Use drip irrigation",
            "Apply fertilizer in split doses",
            "Avoid overwatering"
        ];

        const crop = crops[Math.floor(Math.random() * crops.length)];
        const soilQuality = soil[Math.floor(Math.random() * soil.length)];
        const tip = tips[Math.floor(Math.random() * tips.length)];

        result.innerHTML = `
      <div class="ai-card">
        <h3>🤖 AI Analysis Result</h3>

        <p><b>🌾 Detected Crop:</b> ${crop}</p>
        <p><b>🧪 Soil Quality:</b> ${soilQuality}</p>
        <p><b>💊 Recommended Fertilizer:</b> NPK (120:60:40)</p>

        <div class="ai-tip">
          💡 <b>Tip:</b> ${tip}
        </div>
      </div>
    `;

        showToast("✅ Analysis Complete!");

    }, 2000);
}


/* ================= TOAST NOTIFICATION ================= */
function showToast(message) {

    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}