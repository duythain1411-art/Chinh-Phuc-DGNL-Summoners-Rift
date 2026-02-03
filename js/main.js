// ===== STEP 1: KIỂM TRA CLICK ĐƯỢC CHƯA =====

let hp = 100;
let score = 0;

const hpBar = document.getElementById("hp-bar");
const scoreEl = document.getElementById("score");

// lấy đáp án
const options = document.querySelectorAll(".option");

// giả sử đáp án đúng là cái thứ 3
const correctIndex = 2;

options.forEach((opt, index) => {
  opt.addEventListener("click", () => {

    // khóa click
    options.forEach(o => o.style.pointerEvents = "none");

    if (index === correctIndex) {
      opt.style.background = "#22c55e";
      score += 10;
      scoreEl.textContent = "Điểm: " + score;
    } else {
      opt.style.background = "#ef4444";
      hp -= 20;
      if (hp < 0) hp = 0;
      hpBar.style.width = hp + "%";
    }
  });
});
