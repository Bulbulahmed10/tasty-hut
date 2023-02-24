
const loadData = async() => {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayData(data.meals)
    } catch (error) {
        console.log(error);
    }

}

loadData()

const displayData = (meals) => {
    const foodContainer = document.getElementById("food-container")
    meals.forEach(meal => {
        const div = document.createElement("div")
        console.log(meal);
        div.classList.add("item-card")
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
              <button class="mt-4 text-yellow-400 capitalize underline">
                view details
              </button>
            </div>
          </div>
        
        
        `

        foodContainer.appendChild(div)
    });
}