$(document).ready(function () {
  $(window).scroll(function () {
    if (this.scrollY > 20) $(".navbar").addClass("sticky");
    else $(".navbar").removeClass("sticky");
  });

  $(".menu-toggler").click(function () {
    $(this).toggleClass("active");
    $(".navbar-menu").toggleClass("active");
  });
});

/*   ============================ */
(function () {
  var movies = [];

  function createNode(element) {
    return document.createElement(element);
  }
  function append(parent, el) {
    return parent.appendChild(el);
  }

  const ul = document.getElementById("favMovies");
  const url = `https://api.themoviedb.org/4/account/58742e83c3a368174c015edc/movie/favorites?
                &page=1
                &language=en-US
                &sort_by=release_date.asc
                `;
  fetch(url, {
    method: "get",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1MTYyMzE5NDcsInN1YiI6IjU4NzQyZTgzYzNhMzY4MTc0YzAxNWVkYyIsImp0aSI6IjY0MTA4NCIsImF1ZCI6IjUxNmFkZjFlMTU2NzA1OGY4ZWNiZjMwYmYyZWI5Mzc4Iiwic2NvcGVzIjpbImFwaV9yZWFkIiwiYXBpX3dyaXRlIl0sInZlcnNpb24iOjF9.LJ1zRyHicf-7xQhZVGRbYmCSA26Rdt7Vvk6jsEB9rmA",
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let total_pages = data.total_pages;
      var j = 1;
      for (let i = 1; i <= total_pages; i++) {
        let url2 = `https://api.themoviedb.org/4/account/58742e83c3a368174c015edc/movie/favorites?
                &page=${i}
                &language=en-US
                &sort_by=release_date.asc`;
        fetch(url2, {
          method: "get",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1MTYyMzE5NDcsInN1YiI6IjU4NzQyZTgzYzNhMzY4MTc0YzAxNWVkYyIsImp0aSI6IjY0MTA4NCIsImF1ZCI6IjUxNmFkZjFlMTU2NzA1OGY4ZWNiZjMwYmYyZWI5Mzc4Iiwic2NvcGVzIjpbImFwaV9yZWFkIiwiYXBpX3dyaXRlIl0sInZlcnNpb24iOjF9.LJ1zRyHicf-7xQhZVGRbYmCSA26Rdt7Vvk6jsEB9rmA",
            "Content-Type": "application/json;charset=utf-8",
          },
        })
          .then((resp) => resp.json())
          .then(function (data) {
            let favMovies = data.results;
            movies = [...movies, ...favMovies];
            if (i == total_pages) {
              passArrMovies(movies);
            }
          });
      }
    })

    .catch(function (error) {
      console.log(JSON.stringify(error));
    });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function minToHourMin(min) {
    var hours = Math.trunc(min / 60);
    var minutes = min % 60;
    var runtime = hours + "hrs " + minutes + "m";
    return runtime;
  }
  function passArr(FavsList, tag, cast, nrMovie) {
    let urlv3MovieDetails = `https://api.themoviedb.org/3/movie/${FavsList[nrMovie].id}?api_key=516adf1e1567058f8ecbf30bf2eb9378&language=en-US`;
    fetch(urlv3MovieDetails)
      .then((resp) => resp.json())
      .then(function (data) {
        var runtime = minToHourMin(data.runtime);

        document.getElementById("title").innerHTML = FavsList[
          nrMovie
        ].title.toUpperCase();


        document.getElementById("year").innerHTML =
          FavsList[nrMovie].release_date;

        // document.getElementById("duration").innerHTML = "Duration:" + runtime;

        document.getElementById("text").innerHTML =
          FavsList[nrMovie].overview.split(".").slice(0, 3).join(".") +
          (FavsList[nrMovie].overview.slice(-1) == "." ? ".." : "...");

        // const starring = document.getElementById("starring").innerHTML;
        // document.getElementById("starring").innerHTML = starring + cast;

        const directedBy = document.getElementById("author").innerHTML;
        document.getElementById("author").innerHTML = tag;

        // document.getElementById("body").style.backgroundImage =
        //   "url('https://image.tmdb.org/t/p/original" +
        //   FavsList[nrMovie].backdrop_path +
        //   "')";
        document.body.style.backgroundImage =
          "url('https://image.tmdb.org/t/p/original" +
          FavsList[nrMovie].backdrop_path +
          "')";

        document.getElementById("poster").style.background =
          "url('https://image.tmdb.org/t/p/original" +
          FavsList[nrMovie].poster_path +
          "')";
        // "https://image.tmdb.org/t/p/original" + FavsList[nrMovie].poster_path;

        // document.getElementById("playMovie").href =
        //   "https://www.themoviedb.org/movie/" + FavsList[nrMovie].id;
      });
  }
  function passArrMovies(FavsList) {
    let nrMovie = getRandomInt(1, FavsList.length - 1);

    let urlv3MovieDetails = `https://api.themoviedb.org/3/movie/${FavsList[nrMovie].id}/credits?api_key=516adf1e1567058f8ecbf30bf2eb9378&language=en-US`;
    fetch(urlv3MovieDetails)
      .then((resp) => resp.json())
      .then(function (data) {
        var cant = FavsList[nrMovie].overview.split(" ").length;
        console.log("overview: " + cant);
        var cast = "";
        for (var gen of data.cast.slice(0, 3)) {
          cast += gen.name + ", ";
        }
        cast = cast.slice(0, -2) + " ...";

        passArr(FavsList, data.crew[0].name, cast, nrMovie);
      });
  }
})();
