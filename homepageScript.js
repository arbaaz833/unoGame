function getScoreValue(e) {
  e.preventDefault();
  let radio = false,
    selectedScore,
    radioValue;
  let radioEle = document.querySelector("#radioContainer").children;
  for (let i = 0; i <= radioEle.length - 1; i++) {
    if (radioEle[i].nodeName == "INPUT") {
      if (radioEle[i].checked) {
        radio = true;
        radioValue = radioEle[i].value;
      }
    }
  }
  if (document.querySelector("#customScore").value && radio) {
    document.getElementsByTagName(
      "small"
    )[0].innerHTML = `you can only select option or give custom value`;
  } else if (!document.querySelector("#customScore").value && !radio) {
    document.getElementsByTagName(
      "small"
    )[0].innerHTML = `please provide score value`;
  } else {
    if (radio) {
      selectedScore = radioValue;
    } else {
      if (typeof (document.querySelector("#customScore").value !== "number")) {
        document.getElementsByTagName(
          "small"
        )[0].innerHTML = `please enter a number!`;
      }
      selectedScore = document.querySelector("#customScore").value;
    }
    window.location.replace(`./index.html?score=${selectedScore}`);
  }
}
