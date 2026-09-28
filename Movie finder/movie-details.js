const movieDetail=document.querySelector("#movie-detail")
const params = new URLSearchParams(location.search)
const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim())
}
async function searchMovie(imdbID) {
    let response = await fetch(` https://www.omdbapi.com/?apikey=27e5ed85&i=${encodeURIComponent(imdbID)}&plot=full`)
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
                 View on IMDb
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
                     ${data.Released}
                </p>

                <p class="rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-300">
                     ${data.Rated}
                </p>

                <p class="rounded-lg border flex gap-1 border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-300">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg> ${data.Runtime}
                </p>

                <p class="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                     ${data.Genre}
                </p>

            </section>


            <!-- IMDb Rating -->
            <div class="mt-6 rounded-2xl border border-white/10 bg-slate-800/60 p-5">

                <p class="text-sm text-slate-400">
                    IMDb Rating
                </p>

                <p class="mt-1 text-3xl flex gap-2 font-bold text-yellow-400">
                    <svg class="w-5 h-10  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>${data.imdbRating}/10
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