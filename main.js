// HTML要素の取得
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");

const textList = [/*複数のテキストを格納する配列 */
  "Hello World",
  "This is my App",
  "How are you?"
];
let checkTexts = [];
let score = 0;

const createText = () => {
  /*ランダムなテキストを画面に表示する*/
  const p = document.getElementById("text");
  const rnd = Math.floor(Math.random() * textList.length);
  // p.textContent = textList[rnd];
  p.textContent = "";
  checkTexts = textList[rnd].split("").map((value) => {
    const span = document.createElement("span");
    span.textContent = value;
    // p.appendChild(value);
    p.appendChild(span);
    return span;
  });
};
const keyDown = (e) => {
  /*キーイベント＆入力判定の処理 */
  wrap.style.backgroundColor = '#666';
  if(e.key === checkTexts[0].textContent) {
    score ++;
    checkTexts[0].className = 'add-color';
    checkTexts.shift();
    if(!checkTexts.length) createText();
    }else if (e.key === 'Shift') {
    wrap.style.backgroundColor ='#666';
  } else {
    wrap.style.backgroundColor ='red';
  }
};


const rankCheck = (score) => {
  /*ランク判定とメッセージ生成処理 */
  let text = '';

  if(score < 100) {
      text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
      text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if(score < 300) {
      text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if(score >= 300) {
      text = `あなたのランクはSです。\nおめでとうございます！`;
    }
  return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;;
};
const gameOver = (id) => {
  /*ゲーム終了処理 */
  clearInterval(id);
  const result = confirm(rankCheck(score));
  if ((result)) window.location.reload();
};
const timer = () => {
  /*タイマー処理 */
  let time = 60;
  const count = document.getElementById('count');
  const id = setInterval(() => {
    if(time <=0) gameOver(id);
  count.textContent = time--;
  }, 1000);
};

start.addEventListener("click", () => {
  /*ゲームスタート時の処理 */
  createText();
  timer();

  start.style.display = 'none';
  document.addEventListener('keydown',keyDown);
});
