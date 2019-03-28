$ = function (x) {
  return document.getElementById(x);
}

// ビンゴ用数字配列
const numListUnder37 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
const numListOver37 = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];

let isStop = true;

function startBingo() {
  // ボタンの表示切り替え
  $("start").style.display = "none";
  $("stop").style.display = "inline";
  isStop = false;
  roulette();
}

function stopBingo() {
  // ボタンの表示切り替え
  $("start").style.display = "inline";
  $("stop").style.display = "none";
  isStop = true;
}

function roulette() {
  let id = "";
  let underRnd = Math.floor(Math.random() * numListUnder37.length);
  let overRnd = Math.floor(Math.random() * numListOver37.length);

  // ストップボタンが押された
  if (isStop) {
    // 遅延呼び出しを解除
    clearTimeout(id);

    $("viewUnder").innerText = numListUnder37[underRnd];
    if (!$("outUnder").innerText) {
      $("outUnder").innerText = $("outUnder").innerText + numListUnder37[underRnd];
    } else {
      $("outUnder").innerText = $("outUnder").innerText + "　" + numListUnder37[underRnd];
    }

    $("viewOver").innerText = numListOver37[overRnd];
    if (!$("outOver").innerText) {
      $("outOver").innerText = $("outOver").innerText + numListOver37[overRnd];
    } else {
      $("outOver").innerText = $("outOver").innerText + "　" + numListOver37[overRnd];
    }

    //決定した数字をリストから削除する
    numListUnder37.splice(underRnd, 1);
    numListOver37.splice(overRnd, 1);
    // リストが空になったら終了
    if (numListOver37.length == 0) {
      alert("最後です。");
      $("start").disabled = true;
    }
    return false;
  }

  // 乱数を画面に表示
  $("viewUnder").innerText = numListUnder37[underRnd];
  $("viewOver").innerText = numListOver37[overRnd];
  // 100ms後に再帰的に実行するよう登録する
  id = setTimeout("roulette()", 100);

}