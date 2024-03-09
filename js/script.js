
const loadMeals = async(getSearchValue) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${getSearchValue}`
    try{
        const res = await fetch(url)
        const data = await res.json()
        displayMeals(data.meals)
    }
    catch(error){
        console.log(error)
    }
}


const displayMeals = meals =>{
    const mealsContainer = document.getElementById('card-container')
        // clear previous meals
        mealsContainer.innerText = '';

        // showing limited meals
        meals = meals.slice(0, 8)

        // no meals found
    

    meals.forEach(meal => {
        console.log(meal.idMeal)

        const mealDive = document.createElement('div')
        // mealDive.classList.add = 
        mealDive.innerHTML = `
            <div class="card mt-4" style="max-width: 600px;" >
                <div class="row">
                <div class="col-md-5">
                    <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                    <h4 class="card-title">${meal.strMeal}</h4>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <a onclick="loadMealsDetails(${meal.idMeal})" href="" data-bs-toggle="modal" data-bs-target="#mealModal">View Details</a>
                    
                    </div>
                </div>
                </div>
            </div>
        
        `
        mealsContainer.appendChild(mealDive)
    });

}




const loadSearchMeals = search =>{
    const searchText = document.getElementById('search-input')
    const searchValue = searchText.value;
    console.log(searchValue)

    loadMeals(searchValue)
    searchText.value = '';
}



const loadMealsDetails = async(idMeal) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    const res = await fetch(url)
    const data = await res.json()
    displayMealDetails(data.meals[0])
}


const displayMealDetails = details =>{
    console.log(details)
    document.getElementById('mealModalLabel').innerText = details.strMeal

    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
        <img src="${details.strMealThumb}" alt="">
        <p><span class="modal-body-item">Category: </span>${details.strCategory} </p>
        <p><span class="modal-body-item">Area: </span>${details.strArea} </p>
        <p><span class="modal-body-item">Instructions: </span>${details.strInstructions} </p>
        <span class="modal-body-item">YouTube: <a href="${details.strYoutube}" target="_blank" >${details.strYoutube}</a></span>

    `
}


loadMeals('')