// ===== BIẾN GIAO DIỆN =====
const questionEl = document.getElementById("question");
const answersEl  = document.getElementById("answers");
const scoreEl    = document.getElementById("score");
const hpFill     = document.getElementById("hp-fill");
const tagEl      = document.getElementById("question-tag");

// ===== TRẠNG THÁI GAME =====
let score = 0;
let hp = 100;

// ===== CÂU HỎI MẪU =====
const question = {
  tag: "Toán | Easy | ĐGNL",
  text: "Đạo hàm của hàm số y = x² là:",
  answers: ["x", "2x", "x²", "2"],
  correct: 1
};

// ===== HIỂN THỊ CÂU HỎI =====
function renderQuestion(q){
  tagEl.textContent = q.tag;
  questionEl.textContent = q.text;
  answersEl.innerHTML = "";

  q.answers.forEach((ans, idx)=>{
    const btn = document.createElement("button");
    btn.className = "option p-3 rounded text-left";
    btn.textContent = ans;
    btn.onclick = ()=> checkAnswer(idx);
    answersEl.appendChild(btn);
  });
}

// ===== KIỂM TRA ĐÁP ÁN =====
function checkAnswer(i){
  if(i === question.correct){
    score += 10;
    scoreEl.textContent = `Điểm: ${score}`;
    flash("ĐÚNG!", "#00ff99");
  }else{
    hp -= 20;
    hpFill.style.width = hp + "%";
    flash("SAI!", "#ff4d4d");
  }
}

// ===== HIỆU ỨNG =====
function flash(text, color){
  questionEl.textContent = text;
  questionEl.style.color = color;
  setTimeout(()=>{
    questionEl.style.color = "";
    renderQuestion(question);
  }, 700);
}

// ===== KHỞI ĐỘNG =====
renderQuestion(question);
