// JavaScript Document
 $(document).ready(function(){
	/////////////////
	//set variables
	/////////////////

	let mainStory1_01; 
	let whatIsTyped;
	 
	//set the main story here 
	mainStory1_01 = "You wake up in a room";
	
	
	$("#mainStory").text(mainStory1_01);
	
	//Checks on keydown if "enter" is pressed 
	$( "#typeHere" ).on( "keydown", function( event ) {
		if(event.which === 13){
			//set variable with the value of the input field
			whatIsTyped = $("#typeHere").val();
			//check the switch function is there is something that is typed right
			checkWhatIsTyped(whatIsTyped);
		}
	});
	 
	 function setAnswer(placeholder,answer, cursor){
		//make the input field empty
		$( "#typeHere" ).val("");
		 
		//make the response div empty 
		$(placeholder).empty();
		
		//remove all .typed-cursor that is set bij the Typed script 
		$( ".typed-cursor" ).remove();
		
		//execute Typed function in the #response div with the $answer
		let typed = new Typed(placeholder, {
			strings: [answer],
			typeSpeed:20,
			backSpeed: 0,
			showCursor:cursor
		});
	 }
	 
	 function checkWhatIsTyped(typed){
		 
		 let convertType = typed.toLowerCase();
		
		 switch(convertType){
			case "look around":
			case "look space":
				//give description of the space.
				setAnswer("#response","You see a room with two doors.\nOne door at the left and one at the right.\nAnd there is a table in the room.", true);
				break;
			case "open door":
				setAnswer("#response","Which door? ", true);
				break;
			case "look at table":
			case "see table":
			case "check table":
				setAnswer("#response","You see a key at the table", true);
				break;
			case "take key":
			case "get key":
			case "grab key":
			case "pick up key":
				setAnswer("#response","You pick up the key from the table", true);
				break;		
			case "open door with key": 
			case "use key on door": 
				setAnswer("#response","Which door?", true);
				break;
			case "open left door":
			case "open right door":
				setAnswer("#response","This door is locked", true);
				break;
			case "use key on left door": 
			case "open left door with key": 
				setAnswer("#response","You opened the left door", true);
				break;
			case "use key on right door": 
			case "open right door with key": 
				setAnswer("#response","Key doesn't fit in this door", true);
				break;
			case "use key on right door": 
				setAnswer("#response","Key doesn't fit in this door", true);
				break;
			default:
				setAnswer("#response","be more specific. Don't understand: "+ convertType, true);
		 }
	 }
	 
 });