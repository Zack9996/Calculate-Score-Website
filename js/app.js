let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();
// parameter1 是要控制的對象
// parameter2 是duration
// parameter3 是控制對象的原始狀態
// parameter4 是控制對象的動畫結束後的狀態
// parameter5 是控制動畫提早、晚一點播放
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(hero, 1.2, { width: "0%" }, { width: "80%", ease: Power2.easeInOut })
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

// 上方動畫跑完之後不能點擊任何HTNL Elements，所以要透過下方setTimeout()將動畫結束。
setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

// 讓整個網站的ENTER KEY都無法使用
addEventListener("keypress", (e) => {
  //   console.log(e.key); // 顯示key
  if (e.key == "Enter") {
    e.preventDefault(); // 預防Enter鍵預設的行為。例如：將form Post出去。
  }
});

// 防止FORM内部ABUTTON交出表單
let allButton = document.querySelectorAll("button"); // 將所有button 撈出來，這是Nodelist
allButton.forEach((button) => {
  //   console.log(button);
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// 選擇select的option後，要改變其相對應的顏色
let allSelect = document.querySelectorAll("select");
allSelect.forEach((select) => {
  select.addEventListener("change", (e) => {
    // console.log(e.target); // e.target就是<select>
    setGPA();
    changeColor(e.target);
  });
});

// 改變credit之後，GPA也要更新
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

function changeColor(target) {
  switch (target.value) {
    case "A":
      target.style.backgroundColor = "lightgreen";
      target.style.color = "black";
      break;
    case "A-":
      target.style.backgroundColor = "lightgreen";
      target.style.color = "black";
      break;
    case "B+":
      target.style.backgroundColor = "yellow";
      target.style.color = "black";
      break;
    case "B":
      target.style.backgroundColor = "yellow";
      target.style.color = "black";
      break;
    case "B-":
      target.style.backgroundColor = "yellow";
      target.style.color = "black";
      break;
    case "C+":
      target.style.backgroundColor = "orange";
      target.style.color = "black";
      break;
    case "C":
      target.style.backgroundColor = "orange";
      target.style.color = "black";
      break;
    case "C-":
      target.style.backgroundColor = "orange";
      target.style.color = "black";
      break;
    case "D+":
      target.style.backgroundColor = "red";
      target.style.color = "black";
      break;
    case "D":
      target.style.backgroundColor = "red";
      target.style.color = "black";
      break;
    case "D-":
      target.style.backgroundColor = "red";
      target.style.color = "black";
      break;
    case "F":
      target.style.backgroundColor = "gray";
      target.style.color = "white";
      break;
    default:
      target.style.backgroundColor = "white";
      break;
  }
}

function setGPA() {
  let formlength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0; // 計算分子用
  let creditSum = 0; // 計算分母用
  for (let i = 0; i < credits.length; i++) {
    // console.log(credits[i].valueAsNumber);
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }
  for (let i = 0; i < formlength; i++) {
    // if (isNaN(credits[i].valueAsNumber)) {
    //   credits[i].valueAsNumber = 0;
    // }
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }
  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2); // 取值到小數點第二位。
  }
  document.getElementById("result-gpa").innerText = result;
}
function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  // 下面製作五個小元素
  let newInput1 = document.createElement("input");
  newInput1.classList.add("class-type");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "options");
  newInput1.setAttribute("placeholder", "class category");

  let newInput2 = document.createElement("input");
  newInput2.classList.add("class-number");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class numbers");

  let newInput3 = document.createElement("input");
  newInput3.classList.add("class-credit");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("placeholder", "credits ");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newI = document.createElement("i");
  newI.classList.add("fas", "fa-trash");
  newButton.appendChild(newI);
  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);
  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm);

  // 下面是form動畫
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove"); // 動畫
  });
});
allTrash.forEach((trash) => {
  let forms = trash.parentElement.parentElement;
  forms.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
  });
});

// 以下為排序演算法
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSorting("descending"); // 由大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); // 由小到大
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];
  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; // class category
    let class_number = graders[i].children[1].value; // class numbers
    let class_credit = graders[i].children[2].value; // credits
    let class_grade = graders[i].children[3].value; // select
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
        // 下面是正常寫法，但因大多數都是這麼使用的，所以直接省略下面的寫法直接用上面的寫法就可以了。
        // class_name:class_name,
        // class_number:class_number,
        // class_credit:class_credit,
        // class_grade:class_grade
      };
      objectArray.push(class_object);
    }
  }

  // 取得objectArray後，我們可以把成績String換成數字
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
    objectArray = mergeSort(objectArray);
    if (direction == "descending") {
      objectArray = objectArray.reverse();
    }
  }
  // 根據objectArray的內容，來更新網頁
  let allInput = document.querySelector(".all-inputs");
  allInput.innerHTML = "";
  for (let i = 0; i < objectArray.length; i++) {
    allInput.innerHTML += `<form>
    <div class="grader">
      <input
      type="text"
      placeholder="class category"
      class="class-type"
      list="opt"
      value=${objectArray[i].class_name}
      /><!--
      --><input
      type="text"
      placeholder="class number"
      class="class-number"
      value=${objectArray[i].class_number}
      /><!--
      --><input
      type="number"
      placeholder="credits"
      min="0"
      max="6"
      class="class-credit"
      value=${objectArray[i].class_credit}
      /><!--
      --><select name="select" class="select">
      <option value=""></option>
      <option value="A">A</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B">B</option>
      <option value="B-">B-</option>
      <option value="C+">C+</option>
      <option value="C">C</option>
      <option value="C-">C-</option>
      <option value="D+">D+</option>
      <option value="D">D</option>
      <option value="D-">D-</option>
      <option value="F">F</option></select
      ><!--
      --><button class="trash-button">
      <i class="fas fa-trash"></i>
      </button>
    </div>
    </form>;`;
  }
  // select可直接用JS來改
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  // select事件監聽
  allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    // 將改變排序後select顏色
    changeColor(select);
    // 將select加入事件監聽
    select.addEventListener("change", (e) => {
      changeColor(e.target);
    });
  });

  // credit事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change",(e)=>{
      setGPA(); 
    })
  });

  // 垃圾桶
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}
function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
