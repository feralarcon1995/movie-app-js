
const sectionMovie = document.querySelector('#movies');
const sectionSeries = document.querySelector('#series');

function getData() {
    fetch('./js/movie.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Hubo un problema al obtener los datos.');
            }
            return res.json()
        })
        .then(data => {
            //ORDENAR POR NOMBRE
            data.entries.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
            let movieFilter = data.entries.filter(movie => movie.programType === 'movie');
            showMedia(movieFilter, 'movie');
            //ORDENAR POR AÑO
            let seriesFilter = data.entries.filter(movie => movie.programType === 'series');
            seriesFilter.sort((a, b) => b.releaseYear - a.releaseYear);
            showMedia(seriesFilter, 'serie');
            console.log(movieFilter)
        })
        .catch(error => console.log('Hubo un error: ', error));
}

// function showMovies(data) {

//     data.forEach(m => {
//         let article = document.createElement('article');
//         article.setAttribute('class', 'container');
//         article.innerHTML += 
//         `<img src=${m.images['Poster Art'].url} alt="Flyer of ${m.title}">
//         <div class="body-info"> 
//         <h2>${m.title} (${m.releaseYear})</h2>
//         </div>`;
//         sectionMovie.append(article);
//     });

// }

// function showSeries(data) {

// data.forEach(m => {
//     let article = document.createElement('article');
//     article.setAttribute('class', 'container');
//     article.innerHTML += 
//     `<img src=${m.images['Poster Art'].url} alt="Flyer of ${m.title}">
//     <div class="body-info"> 
//     <h2>${m.title} (${m.releaseYear})</h2>
//     </div>`;
//     sectionSeries.append(article);

// });

// }

function showMedia(data, mediaType) {

    let section = mediaType === 'movie' ? sectionMovie : sectionSeries;

    data.slice(0, 16).forEach(m => {
        let article = document.createElement('article');
        article.setAttribute('class', 'container');
        article.innerHTML +=
            `<img src=${m.images['Poster Art'].url} alt="Flyer of ${m.title}">
        <div class="body-info"> 
        <h2>${m.title} (${m.releaseYear})</h2>
        </div>`;
        section.append(article);
    });
}

getData();