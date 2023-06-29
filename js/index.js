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
                        </div>
                    </div>
                </div>
            </div>
        `;
        displayMealDiv.appendChild(mealDiv);
    }
}

const processSearch = (dataLimit) =>{
    const searchField = document.getElementById('search-field');
    const searchFiedValue = searchField.value;
    loadMeal(searchFiedValue, dataLimit);
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


// loadMeal('fish');