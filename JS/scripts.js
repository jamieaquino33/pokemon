//JQuery function to make sure no code is run until the HTML is fully loaded
$(function () {
    //When the page loads, the Pokemon info card should be hidden by default
    $("#pokemonInfoCard").hide();

    //Set up the event handler for when the search button is clicked
    $("#search").click(function() {
        //Get the input from the search bar
        let pokemonNameOrID = $("#pokemonInput").val().toLowerCase();

        //Clear the input from the search bar
        $("#pokemonInput").val("");

        //Remove old info from the Pokemon information list
        $("#pokemonInformationList").html("");

        getPokemonInfo(pokemonNameOrID);
    });

    function determineBackgroundColor(type) {
        switch (type) {
            case "bug":
                return "#A6B51D";
            case "dark":
                return "#4D392C";
            case "dragon":
                return "#735CDB";
            case "electric":
                return "#FCBB17";
            case "fairy":
                return "#EFA8EF";
            case "fighting":
                return "#7E321B";
            case "fire":
                return "#EA3E0D";
            case "flying":
                return "#9DAEF7";
            case "ghost":
                return "#5F5FB2";
            case "grass":
                return "#72C235";
            case "ground":
                return "#D1B055";
            case "ice":
                return "#6DD3F5";
            case "normal":
                return "#B8B1A6";
            case "poison":
                return "#924593";
            case "psychic":
                return "#EA457E";
            case "rock":
                return "#A68E44";
            case "steel":
                return "#B3B3C2";
            case "water":
                return "#2079D2";
            default:
                return "#000";
        }
    }

    //Function to retrieve information about a Pokemon from the API
    function getPokemonInfo(nameOrID) {
        //We need a way to asynchronously handle making the API call and doing stuff when we get a response since we don't know how long it will take to get a response.

        //If we tried to write synchronous code (code that runs one line after another) this could cause problems if we try to pull information from the API response before we get it back.

        $.ajax({
            //The URL we're making the request to
            url: "https://pokeapi.co/api/v2/pokemon/" + nameOrID,
            //The type of our request
            type: "GET",
            //The function we pass in here will be called if our request is successful
            success: function(result) {
                //Pulling the Pokemon's name from the JSON result we get
                let name = result.name;

                //Get the sprite link for the Pokemon
                let spriteLink = result.sprites.front_default;

                //Get the Pokemon's ID
                let id = result.id;

                //Get the Pokemon's weight
                let weight = result.weight;

                //Get the types that the Pokemon has
                let types = result.types;

                $("#pokemonName").html(name.toUpperCase());
                $("#pokemonImage").attr("src", spriteLink);
                $("#pokemonInformationList").append("<li class='list-group-item'>ID: " + id + "</li>");
                $("#pokemonInformationList").append("<li class='list-group-item'>Weight: " + weight + "</li>");

                for (type of types) {
                    //For each type, we need to create a new list item, configure it, and append it to our list of Pokemon information
                    let li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.classList.add("text-capitalize");
                    li.innerHTML = type.type.name;
                    li.style.backgroundColor = determineBackgroundColor(type.type.name);

                    $("#pokemonInformationList").append(li);
                }

                //Make the card reappear once we're done setting it up
                $("#pokemonInfoCard").show();
            },
            //The function we pass in here will be called if our request fails
            error: function(error) {
                console.log(error);
            }
        });
    }
});