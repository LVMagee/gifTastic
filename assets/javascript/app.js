$(document).ready(function() {

// Array place holder var
var superHeroes = ["IronMan", "DeadPool", "Hulk", "WonderWoman", "SuperMan", "AntMan", "TheFlash", "SpiderMan", "AquaMan", "Thor"];

//Functions to create buttons and display gifs
function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < superHeroes.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("hero");
        gifButton.addClass("btn")
        gifButton.attr("data-name", superHeroes[i]);
        gifButton.text(superHeroes[i]);
        $("#gifButtonsView").append(gifButton);
    }
}

function addNewButton(){
    $("#addGif").on("click", function(){
        var hero = $("#hero-input").val().trim();
        if (hero == ""){
           return false; 
       }
       superHeroes.push(hero);
       displayGifButtons();
       return false;
   });
}

function displayGifs(){
    var hero = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=10";
    // console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        // console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            
            $("#gifsView").prepend(gifDiv);
        }
    });
}

//Call functions and run click functions
displayGifButtons(); 
addNewButton();

$(document).on("click", ".hero", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});