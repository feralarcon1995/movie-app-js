
# AFTER CONSUMIENDO API USANDO FETCH

Curso Javascript Comision 47085

Abordamos como trabajar con un archivo .json local usando el metodo fetch()
## Uso & Ejemplo
** La funcion getData() tiene la url local del archivo.json, con la data recibida , ordenamos por nombre y por año, filtramos para mostrar en 2 componentes separados ambos tipos de programas. **
```javascript
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
```


**En este ejemplo, usamos showMovies(data) que recibe la informacion filtrada de la promesa, para renderizar todas las peliculas**
```javascript
function showMovies(data) {

    data.forEach(m => {
        let article = document.createElement('article');
        article.setAttribute('class', 'container');
        article.innerHTML += 
        `<img src=${m.images['Poster Art'].url} alt="Flyer of ${m.title}">
        <div class="body-info"> 
        <h2>${m.title} (${m.releaseYear})</h2>
        </div>`;
        sectionMovie.append(article);
    });

}

```

**En este ejemplo, usamos showSeries(data) que recibe la informacion filtrada de la promesa, para renderizar todas las series**
```javascript
function showSeries(data) {

data.forEach(m => {
    let article = document.createElement('article');
    article.setAttribute('class', 'container');
    article.innerHTML += 
    `<img src=${m.images['Poster Art'].url} alt="Flyer of ${m.title}">
    <div class="body-info"> 
    <h2>${m.title} (${m.releaseYear})</h2>
    </div>`;
    sectionSeries.append(article);

});

```

**Finalmente, transformamos las dos funciones que estaban separadas en una sola haciendola reutilizable para ambos tipos de programas.**
```javascript
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

```
