// const searchBox = document.querySelector(".searchBox");
// const searchBtn = document.querySelector(".searchBtn");
// const recipeContainer = document.querySelector(".recipe-container");
// const recipeDetailsContent = document.querySelector(".recipe-details-content");
// const recipeCloseBtn = document.querySelector(".recipe-close-btn");

// const fetchRecipes = async (query) => {

//     recipeContainer.innerHTML = "<h2>Loading Recipes...</h2>";

//     const data = await fetch(
//         `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
//     );

//     const response = await data.json();

//     recipeContainer.innerHTML = "";

//     if (!response.meals) {
//         recipeContainer.innerHTML = "<h2>No recipes found</h2>";
//         return;
//     }

//     response.meals.forEach((meal) => {

//         const recipeDiv = document.createElement("div");
//         recipeDiv.classList.add("recipe");

//         recipeDiv.innerHTML = `
//             <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//             <h2>${meal.strMeal}</h2>
//             <p>Origin: <span>${meal.strArea}</span></p>
//             <p>Category: <span>${meal.strCategory}</span></p>
//         `;

//         const button = document.createElement("button");
//         button.textContent = "View Recipe";

//         button.addEventListener("click", () => {
//             openRecipePopup(meal);
//         });

//         recipeDiv.appendChild(button);

//         recipeContainer.appendChild(recipeDiv);
//     });
// };

// function fetchIngredients(meal){

//     let ingredientList = "";

//     for(let i = 1; i <= 20; i++){

//         const ingredient = meal[`strIngredient${i}`];

//         if(ingredient && ingredient.trim() !== ""){

//             const measure = meal[`strMeasure${i}`];

//             ingredientList += `
//                 <li>${ingredient} - ${measure}</li>
//             `;
//         }
//     }

//     return ingredientList;
// }

// function openRecipePopup(meal){

//     recipeDetailsContent.innerHTML = `
//         <h2 class="recipeName">${meal.strMeal}</h2>

//         <h3>Ingredients</h3>
//         <ul>
//             ${fetchIngredients(meal)}
//         </ul>

//         <br>

//         <h3>Instructions</h3>
//         <p class="instructions">
//             ${meal.strInstructions}
//         </p>
//     `;

//     document.querySelector(".recipe-details").style.display = "block";
// }

// recipeCloseBtn.addEventListener("click", () => {
//     document.querySelector(".recipe-details").style.display = "none";
// });

// searchBtn.addEventListener("click", (e) => {

//     e.preventDefault();

//     const input = searchBox.value.trim();

//     if(input){
//         fetchRecipes(input);
//     }
// });


/* =========================
   RESET
========================= */

const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");

const fetchRecipes = async (query) => {

    try {

        recipeContainer.innerHTML = "<h2>Loading Recipes...</h2>";

        const data = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );

        const response = await data.json();

        recipeContainer.innerHTML = "";

        if (!response.meals) {
            recipeContainer.innerHTML =
                "<h2>No recipes found. Try another recipe.</h2>";
            return;
        }

        response.meals.forEach((meal) => {

            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");

            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                <div class="recipe-content">

                    <h2>${meal.strMeal}</h2>

                    <p>
                        Origin:
                        <span>${meal.strArea}</span>
                    </p>

                    <p>
                        Category:
                        <span>${meal.strCategory}</span>
                    </p>

                    <h3>Ingredients</h3>

                    <ul>
                        ${fetchIngredients(meal)}
                    </ul>

                    <h3>Instructions</h3>

                    <p class="instructions">
                        ${meal.strInstructions}
                    </p>

                </div>
            `;

            recipeContainer.appendChild(recipeDiv);
        });

    } catch (error) {

        console.error(error);

        recipeContainer.innerHTML =
            "<h2>Something went wrong. Please try again.</h2>";
    }
};

function fetchIngredients(meal) {

    let ingredientList = "";

    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];

        if (ingredient && ingredient.trim() !== "") {

            const measure = meal[`strMeasure${i}`];

            ingredientList += `
                <li>${ingredient} - ${measure}</li>
            `;
        }
    }

    return ingredientList;
}

searchBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const input = searchBox.value.trim();

    if (input) {
        fetchRecipes(input);
    }
});

searchBox.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        const input = searchBox.value.trim();

        if (input) {
            fetchRecipes(input);
        }
    }
});

recipeContainer.innerHTML =
    "<h2>Search your favourite recipe above 🍲</h2>";