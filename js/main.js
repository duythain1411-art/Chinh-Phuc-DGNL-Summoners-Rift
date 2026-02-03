const questionEl = document.getElementById("question");
const answersEl  = document.getElementById("answers");
const scoreEl    = document.getElementById("score");
const hpFill     = document.getElementById("hp-fill");
const tagEl      = document.getElementById("question-tag");

let score = 0;
let hp = 100;

let questions = [];
let current = null;

// ===== LOAD JSON =====
async function loadQuestions(){
  const res = await fetch("data/questions.json");
  questions = await res.json();
  nextQuestion();
}

// ===== RANDOM CÂU =====
function nextQuestion(){
  if(questions.length === 0){
    endGame(true);
    return;
  }
  const idx = Math.floor(Math.random() * questions.length);
  current = questions.splice(idx,1)[0];
  render(current);
}

// ===== HIỂN THỊ =====
function render(q){
  tagEl.textContent = q.tag;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((a,i)=>{
    const btn = document.createElement("button");
    btn.className = "option p-3 rounded text-left";
    btn.textContent = a;
    btn.onclick = ()=> checkAnswer(i);
    answersEl.appendChild(btn);
  });
}

// ===== KIỂM TRA =====
function checkAnswer(i){
  if(i === current.correct){
    score += 10;
    scoreEl.textContent = `Điểm: ${score}`;
    flash("✔ ĐÚNG", "#00ff99");
  }else{
    hp -= 20;
    hpFill.style.width = hp + "%";
    flash("✖ SAI", "#ff4d4d");
    if(hp <= 0){
      endGame(false);
      return;
    }
  }
  setTimeout(nextQuestion, 700);
}

// ===== HIỆU ỨNG =====
function flash(text,color){
  questionEl.textContent = text;
  questionEl.style.color = color;
  setTimeout(()=> questionEl.style.color="",500);
}

// ===== KẾT THÚC =====
function endGame(win){
  const overlay = document.getElementById("overlay");
  const box = document.getElementById("result-box");
  const title = document.getElementById("result-title");
  const detail = document.getElementById("result-detail");

  overlay.classList.add("show");
  box.classList.add(win ? "victory" : "defeat");

  title.textContent = win ? "CHIẾN THẮNG" : "THẤT BẠI";
  detail.textContent = `Điểm đạt được: ${score}`;
}

// ===== START =====
loadQuestions();
