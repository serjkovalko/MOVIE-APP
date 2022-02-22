const API_KEY = 'api_key=e10fa06bf3d5aab242a6642b998f3ccf';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const galleryContainer = document.querySelector('.gallery-container');
const buttonSearch = document.querySelector('.button-search');
const form = document.getElementById('form')
const search = document.getElementById('search')
const searchURL = BASE_URL + 'search/movie?' + API_KEY

// Изменение иконки поиска при навендении
function chengeColorHover() {
  buttonSearch.classList.add('hover');
  buttonSearch.classList.remove('current');
}

function chengeColorBack() {
  buttonSearch.classList.remove('hover');
  buttonSearch.classList.add('current');
}

buttonSearch.addEventListener('mouseover', chengeColorHover);
buttonSearch.addEventListener('mouseout', chengeColorBack);

//API
getMovies(API_URL);

function getMovies(url) {
    fetch(url).then((res) => res.json()).then((data) => {

       showMovies(data.results);
    })
}

function showMovies(data) {
  galleryContainer.innerHTML = '';
  data.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie;
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
     <img src="${IMG_URL+poster_path}" alt="${title}">
     <div class="movie-info">
     <h3>${title}</h3>
     <span class="${getColor(vote_average)}">${vote_average}</span>
     </div>
     <div class="overview"
     <h3>Overview:</h3>
     ${overview}
     </div>
     `
     galleryContainer.appendChild(movieEl);
  })
}


function getColor(vote) {
  if (vote >= 8) {
    return 'green'
  }else if(vote >= 5) {
    return 'orange'
  }else{
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm)
  }
})

// Подключение bg of header
VANTA.CELLS({
  el: '#header',
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 100.0,
  minWidth: 200.0,
  scale: 1.0,
  color1: 0x0,
  color2: 0xd4a75,
  size: 1.7,
  speed: 2.7,
});
