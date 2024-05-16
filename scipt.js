const main = document.getElementById('main');
let pokemonsFiltrados = [];
let imgPokemonsFiltrados = [];
let typesPokemons = [];
const section = document.getElementById('section');
const pokeModal = document.getElementById('pokeModal_BG');

async function fetchAPI() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data = await response.json();
  
  // Armazenar todas as requisições de detalhes de Pokémon em um array
  const pokemonPromises = data.results.map(item => fetch(item.url).then(res => res.json()));
  
  // Aguardar todas as requisições serem resolvidas
  const pokemons = await Promise.all(pokemonPromises);

  // Adicionar a classe à seção
  section.classList.add('section');

  // Criar os cards para cada Pokémon
  pokemons.forEach((pokemon, index) => {
    const item = data.results[index]; // Garantir a associação correta entre item e pokemon

    // Armazenar os dados do Pokémon em arrays
    pokemonsFiltrados.push(item);
    imgPokemonsFiltrados.push(pokemon.sprites.front_default);
    typesPokemons.push(pokemon.types[0].type.name);

    // Criar o card
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('style', 'width: 18rem');
    div.setAttribute('id', item.name);
    div.setAttribute('onclick', `pokeinfo('${item.name}')`);

    div.innerHTML = `
      <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${item.name}"/>
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
      </div>`;

    // Adicionar o card à seção
    section.appendChild(div);
  });

  // Adicionar a seção ao main
  main.appendChild(section);
} 

fetchAPI()

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