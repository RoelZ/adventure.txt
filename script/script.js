// JavaScript Document
 $(document).ready(function(){
	/////////////////
	//set variables
	/////////////////

	let mainStory1_01; 
	let whatIsTyped;
	 
	//set the main story here 
	mainStory1_01 = "You wake up in a room";
	
	
	$('#mainStory').text(mainStory1_01);
	
	//Checks on keydown if 'enter' is pressed 
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
		
		 //check with different synonyms
		 if(convertType.indexOf("look around") !== -1 ||
		   	convertType.indexOf("look space") !== -1
		   ){
			 //give description of the space.
			 setAnswer("#response","You see a room with two doors. One at the left and one at the right. And there is a table in the room.", true);
		 	}
		 else if(convertType.indexOf("look at table") !== -1 || 
				 convertType.indexOf("see table ") !== -1 
	   			){
			setAnswer("#response","You see a key at the table", true);
		 }
		 else if(convertType.indexOf("open left door") !== -1){
			setAnswer("#response","This door is locked", true);
		 }
		 else if(convertType.indexOf("open right door") !== -1){
			setAnswer("#response","This door is locked", true);
		 }
		 else if(convertType.indexOf("open door") !== -1){
			setAnswer("#response","Which door? ", true);
		 }
		 else if(convertType.indexOf("get key") !== -1 ||
				 convertType.indexOf("grab key") !== -1 ||
				 convertType.indexOf("take key") !== -1||
				 convertType.indexOf("pick up key") !== -1
				){
			setAnswer("#response","You pick up the key from the table", true);
		 }
		 else if(convertType.indexOf("use key on left door") !== -1 
				){
			setAnswer("#response","You opened the left door", true);
		 }
		 else if(convertType.indexOf("use key on right door") !== -1 
				){
			setAnswer("#response","Key doesn't fit in this door", true);
		 }
		 else if(convertType.indexOf("open door with key") !== -1 ||
				 convertType.indexOf("use key on door") !== -1 
				){
			setAnswer("#response","Which door?", true);
		 }
		 else{
			setAnswer("#response","be more specific. Don't understand: "+ convertType, true); 
		 }
		 
		 /* Old code
		 
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
		 }*/
	 
 });