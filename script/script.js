// JavaScript Document
 $(document).ready(function(){
	/////////////////
	//set variables
	/////////////////

	var mainStory1_01; 
	var whatIsTyped;
	 
	//set the main story here 
	mainStory1_01 = "You wake up in a room";
	
	
	$('#mainStory').html(mainStory1_01);
	
	//Checks on keydown if 'enter' is pressed 
	$( "#typeHere" ).on( "keydown", function( event ) {
		if(event.which === 13){
			//set variable with the value of the input field
			whatIsTyped = $("#typeHere").val();
			//check the switch function is there is something that is typed right
			checkWhatIsTyped(whatIsTyped);
		}
	});
	 
	 function checkWhatIsTyped(typed){
		 switch(typed){
			case 'look around': 
				setAnswer('#response','There is a door', true);
				break;
			case 'open door':
				setAnswer('#response','the door is locked', true);
				break;
			case 'find key': 
				setAnswer('#response','You find a key in your pocket', true);
				break;		
			case 'open door with key': 
				//setAnswer('#response','you opend the door', true);
				setAnswer('#mainStory','you are in a new room', false);
				break;
			default:
				setAnswer('#response',"Can't "+typed, true);
		 }
	 }
	 
	 function setAnswer(placeholder,answer, cursor){
		//make the input field empty
		$( "#typeHere" ).val("");
		 
		//make the response div empty 
		$(placeholder).empty();
		
		//remove all .typed-cursor that is set bij the Typed script 
		$( ".typed-cursor" ).remove();
		
		//execute Typed function in the #response div with the $answer
		var typed = new Typed(placeholder, {
			strings: [answer],
			typeSpeed:20,
			backSpeed: 0,
			showCursor:cursor
		});
	 }
	 
 });