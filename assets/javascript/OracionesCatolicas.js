$(function () {

	//begin the array topics
	var atopics = ["Mickey Mouse", "Donald Duck", "Minnie Mouse", "Winnie the Pooh", "Stitch",
					"Aladdin", "Lumiere", "Dumbo"
					];

	var vnewbut = "";

	createbuttons();


	function listenclick() {
	// Event listener for all button elements created dinamically
    $(".topicbtns").on("click", function() {

    	$("#VarGifContent").empty();
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).attr("data-name");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          console.log(response)

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "gallery"
              var gifDiv = $("<div />");
              gifDiv.addClass("gallery");
              // Storing the result item's rating
              var rating = results[i].rating;
              // Creating an image tag
              var personImage = $("<img>");
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height_still.url);
              // give a data still value
              personImage.attr("data-still",results[i].images.fixed_height_still.url);
              // give a data animate value
              personImage.attr("data-animate",results[i].images.fixed_height.url);
              // give the data state value
              personImage.attr("data-state","still");
              // give the image a data class
              personImage.addClass("gif");
              //giving the images a specific size
              personImage.addClass("imagesize");
              //creating a div for displaying the rating
              var gifcap = $("<div />").text("Rating: " + rating);
              //adding color and centering the text
              gifcap.addClass("wcolor atcenter");
              //appending the image and the text
              gifDiv.append(personImage);
              gifDiv.append(gifcap);
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#VarGifContent").append(gifDiv);
            }
          }
			$(".gif").on("click", function() {
      			// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      			var state = $(this).attr("data-state");
    	  		// If the clicked image's state is still, update its src attribute to what its data-animate value is.
      			// Then, set the image's data-state to animate
      			// Else set src to the data-still value
      			if (state === "still") {
        			$(this).attr("src", $(this).attr("data-animate"));
        			$(this).attr("data-state", "animate");
      			} else {
        			$(this).attr("src", $(this).attr("data-still"));
        			$(this).attr("data-state", "still");
      			}
    		});
        });
    });

		$("#dgobut").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        $("#VarGifContent").empty();

        // This line will grab the text from the input box
        var vnchar = $("#dinput").val().trim();
        // The movie from the textbox is then added to our array
        atopics.push(vnchar);

        // calling renderButtons which handles the processing of our movie array
        createbuttons();
      });
      
   };

    function createbuttons() {
    	//Let's create the buttons
    	$("#VarButtons").empty();
      $("#dinput").val();
		for ( var i = 0; i < atopics.length; i++ ) {
			vnewbut = $("<button />").text(atopics[i]);
			vnewbut.addClass("btn btn-info btn-lg firstcap");
			vnewbut.addClass("topicbtns");
			vnewbut.attr("data-name",atopics[i]);
			$("#VarButtons").append(vnewbut);
		}
		listenclick();
    };

});