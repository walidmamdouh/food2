
$("document").ready(function () {
  $(".lds-roller").fadeOut(700, function () {
    $("#loading").fadeOut(300);
    $("body").css("overflow", "auto");
  });
});

async function getDataByArea(area) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let meals = await meal.json();
 
  $(".search").addClass("d-none");
  $(".sections").removeClass("d-none");
  $(".area-details").siblings().addClass("d-none");
  $(".area-details").removeClass("d-none");
  var Meal = "";
  var size=20;
  if(meals.meals.length<20){size=meals.meals.length}
  for (let i = 0; i < size; i++) {
    Meal += `<div class="col-md-6 col-lg-3 my-3">
        <div  class="meal-box position-relative pointer" onclick="getMealData(${meals.meals[i].idMeal})">
            <div class="meal">
                <img src="${meals.meals[i].strMealThumb}" class="w-100 rounded ">
                <div class="overlay d-flex align-items-center text-center">
                    <h2 class="px-2 meal-name fs-3 fw-normal">${meals.meals[i].strMeal}</h2>
        
                </div>

            </div>
        </div>

    </div>
     `;
  }
  $(".area-details").html(Meal);
}
async function getArea() {
  let area = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let areas = await area.json();
  console.log(areas);
  $(".contact").addClass("d-none")
  $(".search").addClass("d-none");
  $(".sections").removeClass("d-none");
  $(".row-area").siblings().addClass("d-none");
  $(".row-area").removeClass("d-none");
  var x = "";
  for (let i = 0; i < 20; i++) {
    x += `<div class="col-md-6 col-lg-3 my-3 ">
      <div class="rounded position-relative">
          <div onclick="getDataByArea('${areas.meals[i].strArea}')" class="pointer text-danger">
              <i class="fa-solid fa-city fa-3x"></i>
              <h2 class="text-white">${areas.meals[i].strArea}</h2>
          </div>
      </div>
  </div>`;
  }

  $(".row-area").html(x);
}
$("#area").click(function () {
  getArea();
});

async function getCategoryMeals(category) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let meals = await meal.json();
  console.log(meals);
  $(".search").addClass("d-none");
  $(".sections").removeClass("d-none");
  $(".category-details").siblings().addClass("d-none");
  $(".category-details").removeClass("d-none");
  var Meal = "";
  var size=20;
  if(meals.meals.length<20){size=meals.meals.length}
  for (let i = 0; i < size; i++) {
    Meal += `<div class="col-md-6 col-lg-3 my-3">
        <div  class="meal-box position-relative pointer" onclick="getMealData(${meals.meals[i].idMeal})">
            <div class="meal" >
                <img src="${meals.meals[i].strMealThumb}" class="w-100 rounded ">
                <div class="overlay d-flex align-items-center text-center">
                    <h2 class="px-2 meal-name fs-3 fw-normal">${meals.meals[i].strMeal}</h2>
                </div>

            </div>
        </div>

    </div>
     `;
  }

  $(".category-details").html(Meal);
}

async function getMealData(id) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let meals = await meal.json();
  console.log(id);
  $(".search").addClass("d-none");
  $(".sections").removeClass("d-none");
  $(".lookup-meal").siblings().addClass("d-none");
  $(".lookup-meal").removeClass("d-none");
  $(".meal-names").html(meals.meals[0].strMeal);
  $(".meal-img").attr("src", `${meals.meals[0].strMealThumb}`);
  $(".inst").html(`${meals.meals[0].strInstructions}`);
  $(".area").html(`${meals.meals[0].strArea}`);
  $(".category").html(`${meals.meals[0].strCategory}`);
  $(".source").attr("href", `${meals.meals[0].strSource}`);
  $(".youtube").attr("href", `${meals.meals[0].strYoutube}`);
  let myMeal = meals.meals[0];
  let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients)
        let recipe = "";
        for (var i = 0; i < ingredients.length; i++) {
          recipe += `<li class="my-3 mx-1 p-1 green rounded w-auto">${ingredients[i]}</li>`;
        }
        $("#recipes").html(recipe);
      


  var tags = meals.meals[0].strTags;
  if (tags !== null) {
    var tagsArr = tags.split(",");
    let tag = "";
    for (var i = 0; i < tagsArr.length; i++) {
      tag += `<li class="my-3 mx-1 p-1 bg-pink rounded w-auto">${tagsArr[i]}</li>`;
    }
    $("#tags").html(tag);
  }       
}

async function getIngrediants() {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let meals = await meal.json();
  console.log(meals);
  $(".contact").addClass("d-none")
  $(".search").addClass("d-none");
  $(".sections").removeClass("d-none");
  $(".row-ingrediants").siblings().addClass("d-none");
  $(".row-ingrediants").removeClass("d-none");
  var Meal = "";
  var size=20;
  if(meals.meals.length<20){size=meals.meals.length}
  for (let i = 0; i < size; i++) {
    Meal += `
    <div class="col-md-6 col-lg-3 my-3">
            <div class="rounded position-relative overflow-hidden">
              <div class="overflow-hidden pointer" onclick=" getMealsByIngrediants('${
                meals.meals[i].strIngredient
              }')">
                <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
                <h2 class="text-white">${meals.meals[i].strIngredient}</h2>
                <p class="text-white overflow-hidden fs-6 mt-1 px-0 fw-lighter">
                 ${meals.meals[i].strDescription
                   .split(" ")
                   .splice(0, 20)
                   .join(" ")}</p>
              </div>
            </div>
            </div>`;
  }
  $(".row-ingrediants").html(Meal);
}
$("#ingredients").click(function () {
  getIngrediants();
});
async function getMealsByIngrediants(ingrediant) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`
  );
  let meals = await meal.json();
  console.log(meals);
  $(".search").addClass("d-none");
  $(".sections").removeClass("d-none");
  $(".ingrediants-details").siblings().addClass("d-none");
  $(".ingrediants-details").removeClass("d-none");
  var Meal = "";
  for (let i = 0; i < meals.meals.length; i++) {
    Meal += `<div class="col-md-6 col-lg-3 my-3">
        <div  class="meal-box position-relative pointer" onclick="getMealData(${meals.meals[i].idMeal})">
            <div class="meal">
                <img src="${meals.meals[i].strMealThumb}" class="w-100 rounded ">
                <div class="overlay d-flex align-items-center text-center">
                    <h2 class="px-2 meal-name fs-3 fw-normal">${meals.meals[i].strMeal}</h2>
        
                </div>

            </div>
        </div>

    </div>
     `;
  }
  $(".ingrediants-details").html(Meal);
}


$(".open-menu").click(function () {
  let openMenu = $(".open-menu");
  let openOffset = openMenu.offset().left;
  if (openOffset < 20) {
    $(".header-icons").animate({ left: 230 }, 200);
 
    $(".header-body").animate({ left: 0 }, 200, function () {
     
      $("#search").animate(
        { opacity: "1", paddingTop: "25px" },
        { duration: 300, function() {} }
      );
      $("#categories").animate(
        { opacity: "1", paddingTop: "25px" },
        { duration: 500, function() {} }
      );
      $("#area").animate(
        { opacity: "1", paddingTop: "25px" },
        { duration: 700, function() {} }
      );
      $("#ingredients").animate(
        { opacity: "1", paddingTop: "25px" },
        { duration: 900, function() {} }
      );
      $("#contact").animate(
        { opacity: "1", paddingTop: "25px" },
        { duration: 1100, function() {} }
      );
    });
    $(".close").addClass("fa-xmark");
  }
  if (openOffset > 249) {
    $("#search").animate(
      { opacity: "0", paddingTop: "100px" },
      { duration: 100, function() {} }
    );
    $("#categories").animate(
      { opacity: "0", paddingTop: "100px" },
      { duration: 100, function() {} }
    );
    $("#area").animate(
      { opacity: "0", paddingTop: "100px" },
      { duration: 100, function() {} }
    );
    $("#ingredients").animate(
      { opacity: "0", paddingTop: "100px" },
      { duration: 100, function() {} }
    );
    $("#contact").animate(
      { opacity: "0", paddingTop: "100px" },
      { duration: 100, function() {} }
    );
    $(".header-body").animate({ left: -250 }, 150);
    $(".header-icons").animate({ left: 0 }, 200);
    $(".close").removeClass("fa-xmark");
  }
});
$(".item").click(function () {
  $(".header-body").animate({ left: -250 }, 150);
  $(".header-icons").animate({ left: 0 }, 200);
  $(".close").removeClass("fa-xmark");
});

async function getData() {
  let mealRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  let meal = await mealRes.json();
  let categoriesD = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let categories = await categoriesD.json();
  displayMeals(meal.meals);
  async function displayMeals(arr) {
    var Meal = "";
    var size=20;
  if(meal.meals.length<20){size=meal.meals.length}
    for (let i = 0; i < arr.length; i++) {
      Meal += `<div class="col-md-6 col-lg-3 my-3">
        <div  class="meal-box position-relative pointer" onclick="getMealData(${meal.meals[i].idMeal})">
            <div class="meal">
                <img src="${meal.meals[i].strMealThumb}" class="w-100 rounded ">
                <div class="overlay d-flex align-items-center text-center">
                    <h2 class="px-2 meal-name fs-3 fw-normal">${meal.meals[i].strMeal}</h2>
        
                </div>

            </div>
        </div>

    </div>
     `;
    }
    $(".row-meals").html(Meal);
  }

  async function displayCategories(arr) {
    $(".contact").addClass("d-none")
    $(".search").addClass("d-none");
    $(".sections").removeClass("d-none");
    $(".row-categories").siblings().addClass("d-none");
    $(".row-categories").removeClass("d-none");
    var categoryBox = "";
    for (let i = 0; i < arr.length; i++) {
      categoryBox += `<div class="col-md-6 col-lg-3 my-3 x">
        <div class="category-box pointer position-relative overflow-hidden">
            <div class="category-data" onclick="getCategoryMeals('${categories.categories[i].strCategory}')">
                <img src="${categories.categories[i].strCategoryThumb}" class="w-100 rounded">
                <div class="overlay d-flex flex-column align-items-center text-center justify-content-center">
                    <h2 class="px-2  fs-3 fw-normal categoryN">${categories.categories[i].strCategory}</h2>
                    <p class="overflow-hidden fs-6 fw-lighter px-2">${categories.categories[i].strCategoryDescription}</p>

        
                </div>
            </div>
        </div>

    </div>`;
    }
    $(".row-categories").html(categoryBox);
 
  }
  $(".row-meals>div").click(function () {
    let index = $(this).index();
    $(".meal-names").html(meal.meals[index].strMeal);
    $(".meal-img").attr("src", `${meal.meals[index].strMealThumb}`);
    $(".inst").html(`${meal.meals[index].strInstructions}`);
    $(".area").html(`${meal.meals[index].strArea}`);
    $(".category").html(`${meal.meals[index].strCategory}`);
    $(".source").attr("href", `${meal.meals[index].strSource}`);
    $(".youtube").attr("href", `${meal.meals[index].strYoutube}`);

    var tags = meal.meals[index].strTags;
    if (tags !== null) {
      var tagsArr = tags.split(",");
      let tag = "";
      for (var i = 0; i < tagsArr.length; i++) {
        tag += `<li class="my-3 mx-1 p-1 bg-pink rounded w-auto">${tagsArr[i]}</li>`;
      }
      $(".tags").html(tag);
    }
    if (index !== null) {
      $(".row-meals").addClass("d-none");
    }
    $(".meal-details").removeClass("d-none");
  });
  $("#categories").click(function () {
    displayCategories(categories.categories);
  });
}
getData();

$("#search").click(function () {
  $(".search").siblings().addClass("d-none");
  $(".search").removeClass("d-none");

});

function search() {
  var mealName = $("searchName").value;
  searchName(mealName);
}
$("#searchName").keyup(function (e) {
  searchName(e.target.value);
});

async function searchName(mealName) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let meals = await meal.json();
  var Meal = "";
  for (let i = 0; i < meals.meals.length; i++) {
    Meal += `<div class="col-md-6 col-lg-3 my-3">
        <div  class="meal-box position-relative pointer" onclick="getMealData(${meals.meals[i].idMeal})">
            <div class="meal">
                <img src="${meals.meals[i].strMealThumb}" class="w-100 rounded ">
                <div class="overlay d-flex align-items-center text-center">
                    <h2 class="px-2 meal-name fs-3 fw-normal">${meals.meals[i].strMeal}</h2>
        
                </div>

            </div>
        </div>

    </div>
     `;
  }
  $(".search-meals").html(Meal);
}
$("#searchLetter").keyup(function (e) {
  searchLetter(e.target.value);
});
async function searchLetter(mealLetter) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`
  );
  let meals = await meal.json();
  var Meal = "";
  for (let i = 0; i < meals.meals.length; i++) {
    Meal += `<div class="col-md-6 col-lg-3 my-3">
        <div  class="meal-box position-relative pointer" onclick="getMealData(${meals.meals[i].idMeal})">
            <div class="meal">
                <img src="${meals.meals[i].strMealThumb}" class="w-100 rounded ">
                <div class="overlay d-flex align-items-center text-center">
                    <h2 class="px-2 meal-name fs-3 fw-normal">${meals.meals[i].strMeal}</h2>
        
                </div>

            </div>
        </div>

    </div>
     `;
  }
  $(".search-meals").html(Meal);
}

$("#contact").click(function(){
  $(".contact").removeClass("d-none");
  $(".sections").addClass("d-none")
  $(".search").addClass("d-none")

})

function validName() {
  let regexName = /^[a-zA-Z ]+$/;
  let nameValue = document.getElementById("nameInput").value;
  if (regexName.test(nameValue)) {
    $("#nameInput").addClass("border-green");
    $("#nameInput").addClass("right");
    $("#nameInput").removeClass("border-red");
    $("#nameInput").removeClass("wrong");
    $(".name-error").addClass("d-none");
    return true;
  }
  if (regexName.test(nameValue) == false) {
    $("#nameInput").addClass("border-red");
    $("#nameInput").addClass("wrong");
    $("#nameInput").removeClass("border-green");
    $("#nameInput").removeClass("right");
    $(".name-error").removeClass("d-none");
    return false;
  }
}
document.getElementById("nameInput").addEventListener("input", function () {
  validName();
  validateContact()
});

function validEmail() {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailValue = document.getElementById("email").value;
  if (regexEmail.test(emailValue)) {
    $("#email").addClass("border-green");
    $("#email").addClass("right");
    $("#email").removeClass("border-red");
    $("#email").removeClass("wrong");
    $(".email-error").addClass("d-none");
    return true;
  }
  if (regexEmail.test(emailValue) == false) {
    $("#email").addClass("border-red");
    $("#email").addClass("wrong");
    $("#email").removeClass("border-green");
    $("#email").removeClass("right");
    $(".email-error").removeClass("d-none");
    return false;
  }
}
document.getElementById("email").addEventListener("input", function () {
  validEmail();
  validateContact()
});
function validPhone() {
  let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  let phoneValue = document.getElementById("phone").value;
  if (regexPhone.test(phoneValue)) {
    $("#phone").addClass("border-green");
    $("#phone").addClass("right");
    $("#phone").removeClass("border-red");
    $("#phone").removeClass("wrong");
    $(".phone-error").addClass("d-none");
    return true;
  }
  if (regexPhone.test(phoneValue) == false) {
    $("#phone").addClass("border-red");
    $("#phone").addClass("wrong");
    $("#phone").removeClass("border-green");
    $("#phone").removeClass("right");
    $(".phone-error").removeClass("d-none");
    return false;
  }
}
document.getElementById("phone").addEventListener("input", function () {
  validPhone();
  validateContact()
});
function validAge() {
  let regexAge = /^[0-9]{0,2}$/;
  let ageValue = document.getElementById("age").value;
  if ((regexAge.test(ageValue)&& ageValue!==0)||ageValue==100) {
    $("#age").addClass("border-green");
    $("#age").addClass("right");
    $("#age").removeClass("border-red");
    $("#age").removeClass("wrong");
    $(".age-error").addClass("d-none");
    return true;
  }
  if (regexAge.test(ageValue) == false || ageValue!==100 || ageValue==0) {
    $("#age").addClass("border-red");
    $("#age").addClass("wrong");
    $("#age").removeClass("border-green");
    $("#age").removeClass("right");
    $(".age-error").removeClass("d-none");
    return false;
  }
}
document.getElementById("age").addEventListener("input", function () {
  validAge();
  validateContact()
});
function validPassword() {
  let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  let checkValue = document.getElementById("passwordCheck").value;
  let passwordValue = document.getElementById("password").value;
  if (regexPassword.test(passwordValue)) {
    $("#password").addClass("border-green");
    $("#password").addClass("right");
    $("#password").removeClass("border-red");
    $("#password").removeClass("wrong");
    $(".password-error").addClass("d-none");
    return true;
  }
  if (regexPassword.test(passwordValue) == false) {
    $("#password").addClass("border-red");
    $("#password").addClass("wrong");
    $("#password").removeClass("border-green");
    $("#password").removeClass("right");
    $(".password-error").removeClass("d-none");
    return false;
  }
}
document.getElementById("password").addEventListener("input", function () {
  validPassword()
  checkPassword()
  validateContact()
});
function checkPassword() {
  let passwordValue = document.getElementById("password").value;
  let checkValue = document.getElementById("passwordCheck").value;
  if (passwordValue==checkValue) {
    $("#passwordCheck").addClass("border-green");
    $("#passwordCheck").addClass("right");
    $("#passwordCheck").removeClass("border-red");
    $("#passwordCheck").removeClass("wrong");
    $(".passwordCheck-error").addClass("d-none");
    return true;
  }
  if (passwordValue!==checkValue) {
    $("#passwordCheck").addClass("border-red");
    $("#passwordCheck").addClass("wrong");
    $("#passwordCheck").removeClass("border-green");
    $("#passwordCheck").removeClass("right");
    $(".passwordCheck-error").removeClass("d-none");
    return false;
  }
}
document.getElementById("passwordCheck").addEventListener("input", function () {
  checkPassword()
  validateContact()
});
function validateContact(){
  if(validName()==true && validEmail()==true && validPhone()==true &&  validAge()==true &&  validPassword()==true && checkPassword()==true ){
    document.getElementById("submit").removeAttribute("disabled");
    console.log("hi")
  }else{
    document.getElementById("submit").setAttribute("disabled","true");
  }
}
