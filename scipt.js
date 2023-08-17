const main = document.getElementById('main');
let pokemonsFiltrados = [];
let imgPokemonsFiltrados = [];
let typesPokemons = [];
const section = document.getElementById('section');
const pokeModal = document.getElementById('pokeModal_BG');

fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
  .then(response => response.json())
  .then(data => {   
    section.classList.add('section')    

    data.results.map((item) => {
      pokemonsFiltrados.push(item)     
      
      fetch(item.url)
        .then(res => res.json())
        .then(pokemon => {
          imgPokemonsFiltrados.push(pokemon.sprites.front_default) 
          typesPokemons.push(pokemon.types[0].type.name)  
          // console.log(typesPokemons);       

          const div = document.createElement('div')
          div.classList.add('card')
          div.setAttribute('style', 'width: 18rem')
          div.setAttribute('id', item.name)
          div.setAttribute('onclick', 'pokeinfo(this.id)')

          div.innerHTML = `<img src="${pokemon.sprites.front_default}" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>             
            </div>`
          section.appendChild(div)
        });
    });
    main.appendChild(section)
  });

function buscarPokemon() {
  section.innerHTML = ''

  let inputBusca = document.getElementById('busca').value; 

  for (let i in pokemonsFiltrados) {
    if (pokemonsFiltrados[i].name.includes(inputBusca)) {
      
      const div = document.createElement('div')
      div.classList.add('card')
      div.setAttribute('style', 'width: 18rem')
      div.setAttribute('id', pokemonsFiltrados[i].name)
      div.setAttribute('onclick', 'pokeinfo(this.id)')      

      div.innerHTML = `<img src="${imgPokemonsFiltrados[i]}" class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">${pokemonsFiltrados[i].name}</h5>             
                </div>`

      section.appendChild(div)

    };
  };
  main.appendChild(section)  
};

function recarregarPag() {
  window.location.reload()
}

function pokeinfo(cardId) {
   toggleModal()
   for (let i in pokemonsFiltrados) {
    if (pokemonsFiltrados[i].name.includes(cardId)) {
        
        const imgpokedex = document.getElementById('pokeModal_IMG');
        imgpokedex.setAttribute('src', `${imgPokemonsFiltrados[i]}`)

        const nomepokedex = document.getElementById('pokeModal_NAME');
        nomepokedex.innerText = `NOME: ${pokemonsFiltrados[i].name}`

        const tipopokedex = document.getElementById('pokeModal_TYPE');
        tipopokedex.innerText = `TIPO: ${typesPokemons[i]}`
     };
  };
}

function toggleModal() {
   pokeModal.classList.toggle('active')
}