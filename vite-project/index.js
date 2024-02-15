const btn = document.getElementById("btn");
const search = document.getElementById("search");
const popularbtn = document.getElementById("popular");
const imgUrl = "https://images.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const upcomingMovies = document.getElementById("upcoming");

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
