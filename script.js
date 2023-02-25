const loadData = async (searchFoodName) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFoodName}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.meals);
  } catch (error) {
    console.log(error);
  }
};

//! display meals
const displayData = (meals) => {
  const foodContainer = document.getElementById("food-container");
  const showAllBtn = document.getElementById("show-all-btn");
  let firstTen = meals.slice(0, 9);

  if (meals.length > firstTen.length) {
    showAllBtn.style.display = "block";
    showAllBtn.addEventListener("click", () => {
      foodContainer.innerHTML = "";

      meals.forEach((meal) => {
        const div = document.createElement("div");
        div.classList.add("item-card");
        div.innerHTML = `
             <div class="card card-side bg-base-100 shadow-xl h-[200px]">
                 <figure class="w-[50%]">
                   <img
                     class="h-full object-cover"
                     src=${meal.strMealThumb}
                     alt="Movie"
                   />
                 </figure>
                 <div class="w-[50%] p-2 flex flex-col items-start">
                   <h4 class="capitalize font-bold mt-2">
                     ${meal.strMeal}
                   </h4>
                   <p class="mt-2 h-[54%] overflow-hidden">
                     ${meal.strInstructions}
                   </p>
                   <label for="my-modal-3" id="meal-details" onclick="mealDetails(${meal.idMeal})" class="mt-4 text-yellow-400 capitalize underline cursor-pointer">
                     view details
                   </label>
                 </div>
               </div>
             `;
        foodContainer.appendChild(div);
      });
      showAllBtn.style.display = "none";
    });
  } else {
    showAllBtn.style.display = "none";
  }
  foodContainer.innerHTML = "";

  firstTen.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("item-card");

    div.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl h-[200px]">
            <figure class="w-[50%]">
              <img
                class="h-full object-cover"
                src=${meal.strMealThumb}
                alt="Movie"
              />
            </figure>
            <div class="w-[50%] p-2 flex flex-col items-start">
              <h4 class="capitalize font-bold mt-2">
                ${meal.strMeal}
              </h4>
              <p class="mt-2 h-[54%] overflow-hidden">
                ${meal.strInstructions}
              </p>
              <label for="my-modal-3" id="meal-details" onclick="mealDetails(${meal.idMeal})" class="mt-4 text-yellow-400 capitalize underline cursor-pointer">
                view details
              </label>
            </div>
          </div>
        `;
    foodContainer.appendChild(div);
  });
};

//! meal search functionality
document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  loadData(searchInput.value);
  searchInput.value = "";
});

//! meal details functionality
const mealDetails = async (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
};

//! display meal information
const displayMealDetails = (meal) => {
  document.getElementById("meal-name").innerText = meal.strMeal;
  document.getElementById("meal-img").src = meal.strMealThumb;
  document.getElementById("meal-category").innerText = meal.strCategory;
  document.getElementById("meal-area-name").innerText = meal.strArea;
  document.getElementById("meal-instructions").innerText = meal.strInstructions;
  document.getElementById("meal-youtube-link").href = meal.strYoutube;
  document.getElementById("meal-youtube-link").innerText = meal.strYoutube;
};

loadData("chicken");
