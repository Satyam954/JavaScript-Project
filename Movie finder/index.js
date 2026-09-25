

const movieform = document.querySelector("#movieform")
const movieinput = document.querySelector("#movieinput")
const moviehub = document.querySelector("#moviehub")

movieform.addEventListener("submit", (e) => {
    e.preventDefault()
    let qurey = movieinput.value.trim()


    // starter loader
    moviehub.innerHTML = `<div class="col-span-full flex justify-center py-16">

            <div class="flex items-center gap-3 text-slate-400">

                <div
                    class="h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-red-500"
                ></div>

                <span>
                    Searching movies...
                </span>

            </div>

        </div>`   


    if (!qurey) {
        // if qurey is empty
        moviehub.innerHTML = `
            <div class="col-span-full py-16 text-center">

                <div class="mb-4 text-5xl">
                    🔍
                </div>

                <p class="text-xl font-semibold text-white">
                    Enter a movie name
                </p>

                <p class="mt-2 text-slate-400">
                    Try searching for Batman, Avengers, Titanic...
                </p>

            </div>
        `
        return
    }
    console.log(qurey)
    searchMovies(qurey)

}
)


async function searchMovies(movieName) {
    let responce = await fetch(` https://www.omdbapi.com/?apikey=27e5ed85&s=${movieName}`)
    let data = await responce.json()

    if (data.Response === "True") {
        displayMovies(data.Search)
        console.log(data);
    } else {
        console.log(data.Error)
        // moviehub.innerHTML = `<p>${data.Error}</p>`
      moviehub.innerHTML = `
                <div class="col-span-full py-16 text-center">

                    <div class="mb-4 text-5xl">
                        😕
                    </div>

                    <p class="text-xl font-semibold text-white">
                        No Movies Found
                    </p>

                    <p class="mt-2 text-slate-400">
                        ${data.Error}
                    </p>

                </div>
            `
    }



}



function displayMovies(movies) {
    moviehub.innerHTML = ""

    movies.forEach(movie => {

        let div = document.createElement("div")

        div.dataset.imdbID = movie.imdbID
        // div.setAttribute("class", "movie-card")

 div.setAttribute(
            "class",
            `
            movie-card
            group
            cursor-pointer
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-slate-900
            shadow-lg
            shadow-black/20
            transition
            duration-300
            hover:-translate-y-2
            hover:border-red-500/50
            hover:shadow-2xl
            hover:shadow-red-950/30
            `)

        // div.innerHTML = ` <div>
        //         <img src=${movie.Poster} alt="">
        //     </div>
        //     <div>
        //         <p>${movie.Title}</p>
        //         <p>${movie.Year}</p>
        //     </div>`

        div.innerHTML = `
    <!-- Poster -->
    <div class="relative aspect-[2/3] overflow-hidden">

        <img
            src="${movie.Poster}"
            alt="${movie.Title}"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        >

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

    </div>


    <!-- Movie Info -->
    <div class="p-4">

        <p
            class="line-clamp-2 min-h-[3rem] text-sm font-bold text-white transition group-hover:text-red-400"
        >
            ${movie.Title}
        </p>

        <div class="mt-2 flex items-center justify-between">

            <p class="text-sm text-slate-400">
                📅 ${movie.Year}
            </p>

            <span
                class="text-xs font-medium text-red-400 opacity-0 transition duration-300 group-hover:opacity-100"
            >
                View →
            </span>

        </div>

    </div>
`



        moviehub.append(div)
    });
}

// for open the detains in new tab

moviehub.addEventListener("click", (e) => {
    e.stopPropagation()
    console.log(e)
    let movieCard =e.target.closest(".movie-card")
    console.log(movieCard)
    const imdbID = movieCard.dataset.imdbID
    console.log(imdbID);
    location.href=`movie-details.html?id=${imdbID}`
}
)

