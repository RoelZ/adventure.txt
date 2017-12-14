// JavaScript Document
 $(document).ready(function(){
	/////////////////
	//set variables
	/////////////////
	"use strict";
	let mainStory1_01; 
	let whatIsTyped;
	 
	
	//set the main story here 
	mainStory1_01 = "You wake up in a room on the floor.<br>And you don't know where you are...";
	
	
	$("#mainStory").html(mainStory1_01);
	
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

	//setup all the objects names

	//doors
	var doorLivingroomToKitchen;
	var doorLivingroomToHallway;
	var doorHallwayToOutside;
	
	//keys
	let keyLivingroomToHallway;
	let keyHallwaytoOutside;
	//spaces
	let livingRoom;
	let kitchen;
	let hallway;
	let outside;

	//test classes with making objects
	
	doorLivingroomToKitchen = new Door("Wooden door", 
										"You can go from the livinging room to the kitchen and back");
	
	doorLivingroomToHallway = new Door("Wooden door painted green", 
										"You can go from the livinging room to the hallway and back",
										123);
	doorHallwayToOutside = new Door("Front door",
								   "You can go outside the house and back",
								   213);


	keyLivingroomToHallway = new Key("rusty key",
									 "This is the key that opens the door to the kitchen", 
									 123);
	keyHallwaytoOutside = new Key("blue key",
								 "This is the key that opens the front door",
								 213);

	livingRoom = new Room("living room", 
							"It's a well lite room and there are two doors.",
							[doorLivingroomToKitchen, doorLivingroomToHallway, keyLivingroomToHallway]);
	
	kitchen = new Room("kitchen", 
						"The kitchen... Only one door.",
						[doorLivingroomToKitchen]);
	
	hallway = new Room("hallway", 
						"This is the hallway. You see light comming in through the glass window next to the front door. And there is the door to the living room.",
						[doorLivingroomToHallway, doorHallwayToOutside, keyHallwaytoOutside]);
	
	outside = new StaticItem("outside", 
							"It's a forrest and it's a sunny day",
							[doorHallwayToOutside]);
	
	//set the rooms that are connected to this door. First room where you in then the room that goes to.
	doorLivingroomToKitchen.setSpaces(livingRoom, kitchen);
	doorLivingroomToHallway.setSpaces(livingRoom, hallway);
	doorHallwayToOutside.setSpaces(hallway, outside);

	//set current space to room
	currentSpace = livingRoom;

	
	//pick up the key and store it in your inventory
	keyLivingroomToHallway.pickUp();
	//get name current space
	console.log(currentSpace.getName());
	currentSpace.objects[1].openDoor();
	currentSpace.objects[1].setItemKeyID(currentInventory[0].unLock());
	currentSpace.objects[1].toggleLock();
	currentSpace.objects[1].openDoor();
	console.log("You entered: " + currentSpace.getName());
	currentSpace.objects[0].openDoor();
	console.log("You entered: " + currentSpace.getName());

	 
	 
 });