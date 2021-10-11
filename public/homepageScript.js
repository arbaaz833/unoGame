function getScoreValue(e) {
  e.preventDefault();

  let radio = false,
    selectedScore,
    radioValue;
  let radioEle = document.querySelector("#radioContainer").children;
  let inputValue = document.querySelector("#customScore").value;
  let smallTag = document.getElementsByTagName("small")[0];

  for (let i = 0; i <= radioEle.length - 1; i++) {
    if (radioEle[i].nodeName == "INPUT") {
      if (radioEle[i].checked) {
        radio = true;
        radioValue = radioEle[i].value;
      }
    }
  }

  if (inputValue && radio) {
    smallTag.innerHTML = `you can only select option or give custom value`;
    return;
  } else if (!inputValue && !radio) {
    smallTag.innerHTML = `please provide score value`;
    return;
  } else {
    if (radio) {
      selectedScore = radioValue;
    } else {
      selectedScore = inputValue;
      if (inputValue <= 0) {
        smallTag.innerHTML = "please give score greater than 0.";
        return;
      }
    }
  }
  window.location.replace(`./index.html?score=${selectedScore}`);
}

if (window.location.search) {
  let scoreCard = document.querySelector(".shadow");
  scoreCard.style.display = "block";
}
