let link = 'https://pokeapi.co/api/v2/pokemon?limit=151';
let container = document.querySelector('.allpokemon');
let body = document.querySelector('body');

function pokemon(){
    fetch(link)
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            let link = pokemon.url
            fetch(link)
            .then(response => response.json())
            .then(function(pokemondata){
                // console.log(pokemondata);

                PokeName = pokemondata.name;
                PokeSprite = pokemondata.sprites.front_default;
                PokeId = pokemondata.id;
                PokeType = pokemondata.types.map((type) => type.type.name)

                let card = document.createElement("div");
                card.className = "card";
                container.appendChild(card);

                let divPokeName = document.createElement('h2');
                divPokeName.className = "PokeName";
                divPokeName.innerText = PokeName;
                card.appendChild(divPokeName);

                let divPokeSprite = document.createElement('img');
                divPokeSprite.className = "PokeSprite";
                divPokeSprite.setAttribute("src", PokeSprite);
                card.appendChild(divPokeSprite);

                let checkShiny = false;
                let shiny = document.querySelector('.btn-shiny');
                shiny.addEventListener('click', function(){
                    checkShiny = !checkShiny;
                    if(checkShiny){
                        shiny.classList.add('active');
                        PokeSprite = pokemondata.sprites.front_shiny;
                        divPokeSprite.setAttribute("src", PokeSprite);
                    }else{
                        shiny.classList.remove('active');
                        PokeSprite = pokemondata.sprites.front_default;
                        divPokeSprite.setAttribute("src", PokeSprite);
                    }
                })

                let divPokeId = document.createElement("p");
                divPokeId.className = "PokeId";
                divPokeId.innerText = "ID :" + PokeId;
                card.appendChild(divPokeId);

                let divPokeType = document.createElement("p");
                // divPokeType.className = "PokeType"
                divPokeType.innerText = PokeType;
                // card.appendChild(divPokeType);

                let grass = document.querySelector('.btn-grass');
                let fire = document.querySelector('.btn-fire');
                let water = document.querySelector('.btn-water');
                let poison = document.querySelector('.btn-poison');
                let all = document.querySelector('.btn-all');
                let electric = document.querySelector('.btn-electric');
                let psychic = document.querySelector('.btn-psychic');
                let select = document.querySelectorAll('.card');
                let btn = document.getElementsByClassName('btn');
                let search = document.getElementById("search");
                // console.log(select)

                grass.addEventListener("click", e=>{
                    filter("grass");
                })

                fire.addEventListener("click", e=>{
                    // body.className = "";
                    filter("fire");
                })

                water.addEventListener("click", e=>{
                    filter("water");
                })

                poison.addEventListener("click", e=>{
                    filter("poison");
                })

                electric.addEventListener("click", e=>{
                    filter("electric");
                })

                psychic.addEventListener("click", e=>{
                    filter("psychic");
                })

                all.addEventListener("click", e=>{
                    select.forEach(function(){
                        card.style.display = "block";
                    })
                    body.className = "";
                })

                search.addEventListener('click', e=>{
                    select.forEach(function(){
                        card.style.display = "block";
                    })
                    body.className = "";
                })

                function filter(choice){
                    select.forEach(function(){
                        if(pokemondata.types.map((type) => type.type.name).includes(choice)){  
                            card.style.display = 'block';
                        }else{
                            card.style.display = 'none';
                        }
                    })
                    
                    body.className = "";
                    body.classList.add(choice);
                    
                }

                
                search.addEventListener("keyup", function(){
                    
                    let pokename = search.value.toUpperCase();
                    let h2 = document.getElementsByTagName("h2");
                    let card = document.getElementsByClassName('card');

                    for (i = 0; i < h2.length; i++) {
                        let txtValue = h2[i].textContent || h2[i].innerText;
                        if (txtValue.toUpperCase().indexOf(pokename) > -1) {
                            card[i].style.display = "";
                        } else {
                            card[i].style.display = "none";
                        }
                    }
                })                
            })
        }
    )})
}

pokemon();