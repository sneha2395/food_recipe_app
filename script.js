const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

//get meal list that matches the ingreadients

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            let html = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html +=`
                        <div class="meal-item">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="" />
                            </div>
                            <div class="meal-name" data-id="${meal.idmeal}">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get recipe</a>
                            </div>
                        </div>
                     ` ;  
                });
                mealList.classList.remove('notFound');   
            }
            else{
                html= "Sorry,  we did'nt find any meal";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });
}

