$( document ).ready(function() {

    // create An array of static action to show on the page load
    // new search will be pushed and added to this array later on
    var gifArr = ["metallica", "simpsons", "family guy", "ufc", "freestyle", "speedracer", "Sky Diving", "Skiing", "Hiking","Beach", "Laughing", "snooping"];
    
    // Function that displays all gif buttons
    function allBtns(){

        // empty div to allow for new content
        $("#gifsBtns").empty(); 
        // create a for loop to go through the gifs
        for (var i = 0; i < gifArr.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("search");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", gifArr[i]);
            gifButton.text(gifArr[i]);
            $("#gifsBtns").append(gifButton);
        }
    }
    // Function to dynamically add a new giphy search button to the gifArr array
    function addBtn(){
        
        $("#addGif").on("click", function(){
        var search = $("#search-input").val().trim();
    // prevent user from adding blank buttons
        if (search == ""){
          return false; 
        }
        gifArr.push(search);
    
        allBtns();
        return false;
        });
    }
     console.log(addBtn); // check added button functionality

    


    // create an ajax call to retreive all the gif buttons
    // assign it a for loop to display all the buttons
    // wrap it all in a callback function 
    // wil need to use this since the active element is dynamically changed 
    function displayGifs(){

        var action = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=EqafGIOM5YVRLUuvprPivbXuOd4EOUs1&limit=10";
        console.log(queryURL); 

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);  // check ajax call is being made properly
    
            // clear gifsView div everytime the button click is triggred to make space for new content
            $("#gifsView").empty();
    
            // return results into a variable called results
            var results = response.data; 
            if (results == ""){
              console.log("No Content Here!");
              location.reload(true); // reload page incase search doesnt exist
                
            }
            for (var i=0; i<results.length; i++){

                // create dynamic divs to hold the results from the search 
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");

                // assign image tag to the gif pulled
                var gifImage = $("<img class='imgTag'>");

                // pull the gifs from the source 
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);

                // still gifs
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 


                // animated gifs
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 

                // set the default state of the image
                gifImage.attr("data-state", "still"); 

                // add a class of image for css
                gifImage.addClass("image");

                //disply the gif on the page
                gifDiv.append(gifImage);

                // get rating of gif in the result var
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                // display rating on the page
                gifDiv.append(gifRating);
                
                // adding div of gifs to display on the page
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    allBtns(); 
    addBtn();
    

    // add eventlistner on image click to either animate or still
    $(document).on("click", ".search", displayGifs);

    $(document).on("click", ".image", function(){

        var state = $(this).attr('data-state');
        if ( state === 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    