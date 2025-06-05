const plans = {
  nature: [
    { station: "等々力", spot: "等々力渓谷", walk: "2.5km", tip: "古民家カフェでひと休み" },
    { station: "高尾", spot: "高尾山ハイキング", walk: "3.8km", tip: "薬王院の草団子が名物" },
    { station: "井の頭", spot: "井の頭公園", walk: "2km", tip: "池のボートもおすすめ" }
  ],
  town: [
    { station: "谷中", spot: "谷中銀座商店街", walk: "1.8km", tip: "猫雑貨とたい焼きやさん" },
    { station: "自由が丘", spot: "路地裏スイーツめぐり", walk: "2.2km", tip: "カフェでのんびり" },
    { station: "蔵前", spot: "クラフト雑貨散歩", walk: "2km", tip: "隅田川沿いで小休憩" }
  ]
};

function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
}

function showSaved() {
  const saved = document.getElementById("saved");
  const savedPlans = JSON.parse(localStorage.getItem("savedPlans")) || [];

  if (savedPlans.length === 0) {
    saved.innerHTML = `<p>まだ保存されたプランはありません。</p>`;
    return;
  }

  saved.innerHTML = savedPlans
    .map((p, i) => `
      <div style="border-bottom: 1px solid #ccc; padding: 6px 0;">
        <p><strong>${i + 1}. ${p.text}</strong><br>
        🕒 ${p.timestamp}</p>
        <button onclick="deletePlan(${i})">削除</button>
      </div>
    `)
    .join("");
}

function deletePlan(index) {
  const savedPlans = JSON.parse(localStorage.getItem("savedPlans")) || [];
  savedPlans.splice(index, 1);
  localStorage.setItem("savedPlans", JSON.stringify(savedPlans));
  showSaved();
}

document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  showSaved();

  document.querySelectorAll(".mood").forEach(btn => {
    btn.addEventListener("click", () => {
      const mood = btn.dataset.mood;
      const list = plans[mood];
      const plan = list[Math.floor(Math.random() * list.length)];

      output.innerHTML = `
        <h3>🚉 行き先：${plan.station}駅</h3>
        <p>🌿 スポット：${plan.spot}</p>
        <p>👟 歩く距離：約 ${plan.walk}</p>
        <p>🍵 よりみちポイント：${plan.tip}</p>
        <button id="savePlan">このプランを保存</button>
      `;

      document.getElementById("savePlan").addEventListener("click", () => {
        const savedPlans = JSON.parse(localStorage.getItem("savedPlans")) || [];

        const newPlan = {
          text: `🚉 ${plan.station} - ${plan.spot}（${plan.walk}）｜${plan.tip}`,
          timestamp: formatDate(new Date())
        };

        savedPlans.push(newPlan);
        localStorage.setItem("savedPlans", JSON.stringify(savedPlans));
        showSaved();
        alert("プランを保存しました！");
      });
    });
  });

  document.getElementById("clearPlans").addEventListener("click", () => {
    if (confirm("本当にすべての履歴を削除しますか？")) {
      localStorage.removeItem("savedPlans");
      showSaved();
      alert("履歴を削除しました！");
    }
  });
});
