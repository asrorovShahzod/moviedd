const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=07f9a167dce6fdef5d0f09dd14658e14&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=07f9a167dce6fdef5d0f09dd14658e14&query="'



const main = document.getElementById('main')
const form = document.getElementById('form');
const search = document.getElementById('search')
const wrapper = document.querySelector('.wrapper')




// get initial movies
getMovies(API_URL)



async function getMovies(url) {

    const response = await fetch(url)
    const data = await response.json()

    console.log(data.results)  

    showMovies(data.results)
}


function showMovies(movies) {
    wrapper.innerHTML = ''

    movies.forEach( (movie)=>{
        const {title, poster_path, vote_average, overview} = movie

         const movieEl = document.createElement('div')
         movieEl.classList.add('movie')

         movieEl.innerHTML = `
         <img src="${IMG_PATH + poster_path}" alt="${title}">
     
         <div class="movie-info">
             <h2 class="card-title">${title}</h2>
             <span class="${getClassByRate(vote_average)}">${vote_average}</span>
         </div>

         <div class="overview">
             <h3 class="hover-title">Overview</h3>
             ${overview}
         </div>
         `

         wrapper.appendChild(movieEl) 
    })
}

function getClassByRate(vote){
    if( vote>= 8){
        return 'green'
    }else if ( vote>= 5){
        return 'orange'
    }else {
        return 'red'
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const searchTerm = search.value 

    if (searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }

})

