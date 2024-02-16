const btn = document.getElementById("btn");
const search = document.getElementById("search");
const popularbtn = document.getElementById("popular");
const imgUrl = "https://images.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const upcomingMovies = document.getElementById("upcoming");
const apiKey = "82852eff9923affa42136eb1e81e3ffd";
const tag = document.getElementById("tag");

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  trendingMovie();
});

btn.addEventListener("click", () => {
  main.innerHTML = "";
  const url = `https://api.themoviedb.org/3/search/movie?query=${search.value}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Mjg1MmVmZjk5MjNhZmZhNDIxMzZlYjFlODFlM2ZmZCIsInN1YiI6IjY1Y2RkNmU5YjA0NjA1MDE4M2RhYjk0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bwdP5nw2Mhimz_wkql8DWsgnNf1hluW2gqV514K7GsM",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      data = json.results;

      data
        .forEach((movie) => {
          const movieDiv = document.createElement("div");
          const { title, poster_path, vote_average, overview } = movie;
          movieDiv.classList.add("movie");
          movieDiv.innerHTML = `<img src="${
            imgUrl + poster_path
          }" alt="${title}" />

                            <div class="movie-info">
                            <h3>${title}</h3>
                            <span class="${getColor(
                              vote_average
                            )}">${vote_average}</span>
                            </div>
                            <div class="overview">
                            <h3>${title}</h3>
                            ${overview}
                            </div>`;
          main.appendChild(movieDiv);
        })
        .catch((err) => console.error("error:" + err));
    });
});

popularbtn.addEventListener("click", () => {
  trendingMovie();
});

function getColor(vote) {
  if (vote > 8) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

upcomingMovies.addEventListener("click", () => {
  main.innerHTML = "";
  const url = `https://api.themoviedb.org/3/trending/tv/week`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Mjg1MmVmZjk5MjNhZmZhNDIxMzZlYjFlODFlM2ZmZCIsInN1YiI6IjY1Y2RkNmU5YjA0NjA1MDE4M2RhYjk0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bwdP5nw2Mhimz_wkql8DWsgnNf1hluW2gqV514K7GsM",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json.results);
      data = json.results;

      data.forEach((series) => {
        const movieDiv = document.createElement("div");
        const { name, poster_path, vote_average, overview } = series;
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `<img src="${
          imgUrl + poster_path
        }" alt="${name}" />
                              <div class="movie-info">
                              <h3>${name}</h3>
                              <span class="${getColor(
                                vote_average
                              )}">${vote_average}</span>
                              </div>
                              <div class="overview">
                              <h3>${name}</h3>
                              ${overview}
                              </div>`;
        main.appendChild(movieDiv);
      });
    })
    .catch((err) => console.error("error:" + err));
});

let selectedGenre = [];
setGenre();

function setGenre() {
  tag.innerHTML = "";
  genres.forEach((genre) => {
    const tags = document.createElement("div");
    tags.classList.add("tags");
    tags.id = genre.id;
    tags.value = genre.name;
    tags.innerText = `${genre.name}`;
    tag.appendChild(tags);
    tags.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenre.splice(index, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
    });
  });
}

function trendingMovie() {
  main.innerHTML = "";
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Mjg1MmVmZjk5MjNhZmZhNDIxMzZlYjFlODFlM2ZmZCIsInN1YiI6IjY1Y2RkNmU5YjA0NjA1MDE4M2RhYjk0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bwdP5nw2Mhimz_wkql8DWsgnNf1hluW2gqV514K7GsM",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json.results);
      data = json.results;

      data.forEach((movies) => {
        const movieDiv = document.createElement("div");
        const { title, poster_path, vote_average, overview } = movies;
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `<img src="${
          imgUrl + poster_path
        }" alt="${title}" />

                            <div class="movie-info">
                            <h3>${title}</h3>
                            <span class="${getColor(
                              vote_average
                            )}">${vote_average}</span>
                            </div>
                            <div class="overview">
                            <h3>${title}</h3>
                            ${overview}
                            </div>`;
        main.appendChild(movieDiv);
      });
    })
    .catch((err) => console.error("error:" + err));
}
