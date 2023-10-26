async function getData() {
    try {
        const response = await fetch('http://127.0.0.1:8000/omeka/api/items')
        if (!response.ok) {
            throw new Error('La réponse n\'a pas pu être retourné')
        }

        return response.json()
    } catch (error) {
        console.error('Un problème serveur est survenu :', error)
        return null
    }
}
  
document.addEventListener('DOMContentLoaded', function () {
    setData()
})

async function setData() {
    const items = await getData()

    if (items) {
        removeLoader()
        createHtmlContentCards(items)
    }
}

async function createHtmlContentCards(items) {
    const container = d3.select('.container')
    const row = container.append('div').attr('class', 'row')
  
    const cards = getCards(row, items)
  
    cards.append('div')
        .attr('class', 'card')
        .each(function () {
        d3.select(this)
            .append('div')
            .attr('class', 'card-body')
            .append('h5')
            .attr('class', 'card-title')
            .text((item) => item['dcterms:title'][0]['@value'])
  
        d3.select(this)
            .select('.card-body')
            .append('p')
            .attr('class', 'card-text')
            .text((item) => item['dcterms:description'][0]['@value'])
  
        d3.select(this)
            .select('.card-body')
            .append('p')
            .attr('class', 'class="font-monospace"')
            .text((item) => 'Réalisateur:' + ' ' + item['dcterms:creator'][0]['@value'])
      })
}

function getCards(row, items) {
    return row
        .selectAll('.col-sm-6')
        .data(items)
        .enter()
        .append('div')
        .attr('class', 'col-sm-6 mb-3 mb-sm-0 shadow p-3 mb-5 bg-body-tertiary rounded')
}

function removeLoader() {
    d3.select('.spinner-grow').style('display', 'none')
}