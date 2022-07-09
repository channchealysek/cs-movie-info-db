
$("form").submit(function (event) {
    event.preventDefault();
    var movie = $("input").val();
    if (movie) {
        getInfoMovie(movie)
        $('input').val("");
    }
});

// API call
function getInfoMovie(movie) {
    var apiUrl = `https://www.omdbapi.com/?apikey=1050cada&t=${movie}&plot=full`

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.Response === "True") {
                    if (data.Director !== "N/A") {
                        movieApi = data;
                        displayMovieInfo(data);
                        genres = data.Genre.split(", ");
                        $('#errorMessageEl').addClass("hidden");
                        $('#poster__card').removeClass("hidden");


                    }
                    else {
                        // return "Sorry that's (probably) a TV show not a movie"
                        $('#poster__card').addClass("hidden");
                        $('#errorMessageEl').removeClass("hidden");
                        $('#errorMessageEl').html("Sorry, we couldn't find that movie, please double check your spelling and try again.");
                    }
                }
                else {
                    // return data.Error somewhere
                    $('#poster__card').addClass("hidden");
                    $('#errorMessageEl').removeClass("hidden");
                    $('#errorMessageEl').html(data.Error);
                }
            });
        }
        else {

        }
    });
}

function displayActors(actorString) {
    let actors = actorString.split(", ");
    var poster_actor = "";
    $('#poster__actors').val("");

    for (var i = 0; i < actors.length; i++) {
        var jli = "- ";
        if (poster_actor === "") {
            poster_actor = "<br />&#8195" + jli + actors[i];
        } else {
            poster_actor += "<br />&#8195" + jli + actors[i];
        }
    }

    $('#poster__actors').html(poster_actor);

}

// Display Movie Info
function displayMovieInfo(movieData) {
    // Poster
    $('#poster__img').attr("src", movieData.Poster);
    // Title
    $('#poster__title').html(movieData.Title);
    // // Plot
    $('#poster__plot').html(movieData.Plot);
    // Director
    $('#poster__director').html(movieData.Director);
    // MPAA
    $('#poster_rated').html(movieData.Rated);
    // Actors
    displayActors(movieData.Actors);
    // Ratings
    if (movieData.Ratings.length != 0) {
        $('#poster_rating').html(movieData.Ratings[0].Value);
    } else {
        $('#poster_rating').html("N/A");
    }

}

function getGIPHY() {
    let urlGIPHY = "https://api.giphy.com/v1/stickers/packs?api_key=MEJ76RCs9ETc1LP00uDgOw1O0rPkU0ah";

    fetch(urlGIPHY)
        .then(response => response.json())
        .then(data => {
            for (var i = 1; i <= 3; i++) {
                let gifTotal = data.data.length;
                var j = Math.floor(Math.random() * gifTotal);
                $('#giphy__img-col-' + i).attr("src", "https://i.giphy.com/" + data.data[j].featured_gif.id + ".gif ");
                $('#giphy__title-' + i).html(data.data[j].featured_gif.title)
            }
        });
}

// call GIPHY api function.
$(document).ready(function () {
    getInfoMovie("Guardians of the Galaxy Vol. 2");
    getGIPHY();
});
