const movieDetail=document.querySelector("#movie-detail")
const params = new URLSearchParams(location.search)
const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim())
}
async function searchMovie(imdbID) {
    let response = await fetch(` http://www.omdbapi.com/?apikey=27e5ed85&i=${imdbID}&plot=full`)
    let data = await response.json()

    if (data.Response === "True") {
        displaydata(data)
        console.log(data)
     
    } else {
        console.log(data.Error)
      
    }
    


}


function displaydata(data) {
    
    // movieDetail.innerHTML=` <div>
    //         <img src=${data.Poster} alt="">
    //     </div>

    //     <div>
    //         <h2>${data.Title}</h2>
    //         <section>
    //             <p>${data.Released}</p>
    //             <p>${data.Rated}</p>
    //             <p>${data.Runtime}</p>
    //             <p>${data.Genre}</p>
    //             <p>IMBD: ${data.imbdRating}/10</p>
    //         </section>

    //         <div>
    //             <p>Plot Overview</p>
    //             <p>${data.Plot}</p>
    //         </div>


    //         <div>
    //             <section>
    //                 <p>Director</p>
    //                 <p>${data.Director}</p>
    //             </section>
    //             <section>
    //                 <p>Writer</p>
    //                 <p>${data.Writer}</p>
    //             </section>
    //         </div>

    //         <div>
    //             <p>Actors</p>
    //             <p>${data.Actors}</p>
    //         </div>


    //          <div>
    //             <section>
    //                 <p>Language</p>
    //                 <p>${data.Language}</p>
    //             </section>
    //             <section>
    //                 <p>Country</p>
    //                 <p>${data.Country}</p>
    //             </section>
    //         </div>

    //     </div>

    //     <button>
    //         <a href=https://www.imdb.com/title/${data.imdbID} target="_blank">View on IMBD</a>
    //     </button>`

    movieDetail.innerHTML = `
    <div class="grid gap-8 md:grid-cols-[280px_1fr]">

        <!-- Poster -->
        <div>
            <img
                src="${data.Poster}"
                alt="${data.Title}"
                class="w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
            >

            <!-- IMDb Button -->
            <a
                href="https://www.imdb.com/title/${data.imdbID}"
                target="_blank"
                class="mt-4 block rounded-xl bg-yellow-500 px-5 py-3 text-center font-bold text-black transition hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 active:scale-95"
            >
                ⭐ View on IMDb
            </a>
        </div>


        <!-- Movie Details -->
        <div>

            <!-- Title -->
            <h2 class="text-3xl font-extrabold sm:text-4xl">
                ${data.Title}
            </h2>


            <!-- Basic Info -->
            <section class="mt-5 flex flex-wrap gap-2">

                <p class="rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-300">
                    📅 ${data.Released}
                </p>

                <p class="rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-300">
                    🔞 ${data.Rated}
                </p>

                <p class="rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-300">
                    ⏱️ ${data.Runtime}
                </p>

                <p class="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                    🎬 ${data.Genre}
                </p>

            </section>


            <!-- IMDb Rating -->
            <div class="mt-6 rounded-2xl border border-white/10 bg-slate-800/60 p-5">

                <p class="text-sm text-slate-400">
                    IMDb Rating
                </p>

                <p class="mt-1 text-3xl font-bold text-yellow-400">
                    ⭐ ${data.imdbRating}/10
                </p>

            </div>


            <!-- Plot -->
            <div class="mt-7">

                <h3 class="mb-2 border-l-4 border-red-500 pl-3 text-xl font-bold">
                    Plot Overview
                </h3>

                <p class="leading-7 text-slate-400">
                    ${data.Plot}
                </p>

            </div>


            <!-- Director & Writer -->
            <div class="mt-7 grid gap-4 sm:grid-cols-2">

                <section class="rounded-xl border border-white/10 bg-slate-800/50 p-4 transition hover:border-red-500/30">

                    <p class="text-sm text-slate-500">
                        Director
                    </p>

                    <p class="mt-1 font-semibold text-white">
                        ${data.Director}
                    </p>

                </section>


                <section class="rounded-xl border border-white/10 bg-slate-800/50 p-4 transition hover:border-red-500/30">

                    <p class="text-sm text-slate-500">
                        Writer
                    </p>

                    <p class="mt-1 font-semibold text-white">
                        ${data.Writer}
                    </p>

                </section>

            </div>


            <!-- Actors -->
            <div class="mt-4 rounded-xl border border-white/10 bg-slate-800/50 p-4 transition hover:border-red-500/30">

                <p class="text-sm text-slate-500">
                    Actors
                </p>

                <p class="mt-1 font-semibold text-white">
                    ${data.Actors}
                </p>

            </div>


            <!-- Language & Country -->
            <div class="mt-4 grid gap-4 sm:grid-cols-2">

                <section class="rounded-xl border border-white/10 bg-slate-800/50 p-4 transition hover:border-red-500/30">

                    <p class="text-sm text-slate-500">
                        Language
                    </p>

                    <p class="mt-1 font-semibold text-white">
                        ${data.Language}
                    </p>

                </section>


                <section class="rounded-xl border border-white/10 bg-slate-800/50 p-4 transition hover:border-red-500/30">

                    <p class="text-sm text-slate-500">
                        Country
                    </p>

                    <p class="mt-1 font-semibold text-white">
                        ${data.Country}
                    </p>

                </section>

            </div>

        </div>

    </div>
`
}