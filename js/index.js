const loadMeal = async(searchText, dataLimit) => {
    try{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        const res = await fetch(url)
        const data = await res.json();
        displayMeals(data.meals, dataLimit);
    }
    catch(error){
        console.log(error);
    }
}

const displayMeals = (meals, dataLimit) =>{
    const displayMealDiv = document.getElementById('display-meal-div');
    displayMealDiv.innerHTML = ''; 
    
    const noMessageFound = document.getElementById('no-phone-message');
    if(meals === null){
        noMessageFound.classList.remove('d-none');
        loadToggler(false);
        return 0;
    }
    else{
        noMessageFound.classList.add('d-none');
    }

    const showAllDiv = document.getElementById('show-all-div');
    if(dataLimit && meals.length > 6){
        meals = meals.slice(0, 6);
        showAllDiv.classList.remove('d-none');
    }
    else{
        showAllDiv.classList.add('d-none');
    }
    for(const meal of meals){
        // console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col')
        mealDiv.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title fw-semibold">${meal.strMeal}</h5>
                            <p class="card-text">There are many variations of passages of available, but the majority have suffered</p>
                            <button onclick="showMealDetails('${meal.idMeal}')" type="button" class="text-warning text-decoration-underline bg-white border-0" data-bs-toggle="modal" data-bs-target="#viewMealDetails">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        displayMealDiv.appendChild(mealDiv);
    }
    loadToggler(false);
}

const processSearch = (dataLimit) =>{
    const searchField = document.getElementById('search-field');
    const searchFiedValue = searchField.value;
    loadMeal(searchFiedValue, dataLimit);
    loadToggler(true);
}

document.getElementById('btn-search').addEventListener('click', function(){
    try{
        processSearch(6);
    }
    catch(error){
        console.log(error);
    }
})

document.getElementById('btn-showAll').addEventListener('click', function(){
    processSearch()
})

const loadToggler = (isLoading) => {
    const loadTogglerElement = document.getElementById('loadToggler');
    if(isLoading === true){
        loadTogglerElement.classList.remove('d-none');
    }
    else{
        loadTogglerElement.classList.add('d-none');

    }
}

const showMealDetails = async(id) => {
    // const mealDetailsModal = document.getElementById('mealDetailsModal');
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);

}

const displayMealDetail = (meal) => {
    console.log(meal);
    const viewMealTilte = document.getElementById('viewMealTilte');
    viewMealTilte.innerText = meal.strMeal;
    const mealDetailsModal = document.getElementById('mealDetailsModal');
    mealDetailsModal.innerHTML = `
    <div class="card mb-3">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title"><strong>Category: </strong>${meal.strCategory}</h5>
            <p class="card-text"> <strong>Instructions: </strong>AThere are many variations of passages of Lorem Ipsum available, but the majority have suffered
             alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            <p class="card-text"><strong>Youtube: </strong>https://www.youtube.com/watch?v=WnpbKoYhTEY</p>
        </div>
    </div>`;
}

loadMeal('fish', 6);