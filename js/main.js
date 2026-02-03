// ====== LẤY PHẦN TỬ HTML ======
const questionEl = document.getElementById("question");
const answersEl  = document.getElementById("answers");
const scoreEl    = document.getElementById("score");
const hpFill     = document.getElementById("hp-fill");
const tagEl      = document.getElementById("question-tag");
const retryBtn   = document.getElementById("retry-btn");

// ====== BIẾN TRẠNG THÁI ======
let score = 0;
let hp = 100;
let current = null;

// ====== NGÂN HÀNG CÂU HỎI (DEMO – SAU NÀY TĂNG LÊN 1000+) ======
let questions = [
  {
    tag: "TOÁN | EASY | ĐGNL",
    question: "Đạo hàm của hàm số y = x² là:",
    answers: ["x", "2x", "x²", "2"],
    correct: 1
  },
  {
    tag: "LOGIC | EASY | ĐGNL",
    question: "Số tiếp theo của dãy: 2, 4, 8, 16, ?",
    answers: ["18", "24", "32", "20"],
    correct: 2
  },
  {
    tag: "TOÁN | MEDIUM | ĐGNL",
    question: "Giá trị của √49 là:",
    answers: ["6", "8", "7", "9"],
    correct: 2
  },
  {
    tag: "LOGIC | MEDIUM | LOL",
    question: "Nếu 1 tướng gây 50 sát thương mỗi đòn, đánh 4 lần thì tổng sát thương là:",
    answers: ["150", "180", "200", "250"],
    correct: 2
  },
  {
    tag: "TƯ DUY | HARD | ĐGNL",
    question: "Nếu A > B và B > C thì:",
    answers: [
      "A = C",
      "A < C",
      "A > C",
      "Không xác định"
    ],
    correct: 2
  }
];

// ====== TRỘN CÂU HỎI ======
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
questions = shuffle(questions);

// ====== CÂU HỎI TIẾP THEO ======
function nextQuestion() {
  if (questions.length === 0) {
    endGame(true);
    return;
  }
  current = questions.shift();
  render(current);
}

// ====== HIỂN THỊ ======
function render(q) {
  tagEl.textContent = q.tag;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.className =
      "option w-full text-left p-3 rounded bg-[#0b1d35] hover:bg-[#12335c] transition";
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(i);
    answersEl.appendChild(btn);
  });
}

// ====== KIỂM TRA ĐÁP ÁN ======
function checkAnswer(i) {
  const buttons = document.querySelectorAll(".option");
  buttons.forEach(b => (b.disabled = true));

  if (i === current.correct) {
    score += 10;
    scoreEl.textContent = "Điểm: " + score;
    flash("✔ ĐÚNG!", "#22c55e");
  } else {
    hp -= 20;
    hpFill.style.width = hp + "%";
    flash("✖ SAI!", "#ef4444");

    if (hp <= 0) {
      endGame(false);
      return;
    }
  }

  setTimeout(nextQuestion, 800);
}

// ====== HIỆU ỨNG ======
function flash(text, color) {
  const old = questionEl.textContent;
  questionEl.textContent = text;
  questionEl.style.color = color;

  setTimeout(() => {
    questionEl.textContent = old;
    questionEl.style.color = "";
  }, 500);
}

// ====== KẾT THÚC ======
function endGame(win) {
  questionEl.textContent = win
    ? "🎉 CHIẾN THẮNG!"
    : "💀 THẤT BẠI!";
  answersEl.innerHTML = `
    <div class="text-center text-lg mt-4">
      Điểm đạt được: <b>${score}</b>
    </div>
  `;
}

// ====== CHƠI LẠI ======
if (retryBtn) {
  retryBtn.onclick = () => location.reload();
}

// ====== START ======
nextQuestion();
