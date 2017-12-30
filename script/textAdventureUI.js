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
	
	
	$("#mainstoryText").html(mainStory1_01);
	
	//Checks on keydown if "enter" is pressed 
	$( "#typeHere" ).on( "keydown", function( keyPressed ) {
		if(keyPressed.which === 13){
			//set variable with the value of the input field
			whatIsTyped = $("#typeHere").val();
			//make the input field empty
			$( "#typeHere" ).val("");
			//check the switch function is there is something that is typed right
			checkWhatIsTyped(whatIsTyped);
		}
	});
	
	function setAnswer(placeholder,answer, cursor){
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

	//setup all the objects names

	//doors
	var doorLivingroomToKitchen;
	var doorLivingroomToHallway;
	var doorHallwayToOutside;
	
	//other Items
	var coffeeTable;
	 
	//keys
	let keyLivingroomToHallway;
	let keyHallwaytoOutside;
	 
	let ball;
	let apple; 
	//spaces
	let livingRoom;
	let kitchen;
	let hallway;
	let outside;

	//test classes with making objects
	
	doorLivingroomToKitchen = new Door("Wooden door", 
										"You can go from the livinging room to the kitchen and back");
	
	doorLivingroomToHallway = new Door("Wooden green door", 
										"You can go from the livinging room to the hallway and back",
										123);
	doorHallwayToOutside = new Door("Front door",
								   "You can go outside the house and back",
								   213);
	
	keyLivingroomToHallway = new Key("rusty key",
									 "This is the key that opens the door to the hallway", 
									 123);
	keyHallwaytoOutside = new Key("blue key",
								 "This is the key that opens the front door",
								 213);
	ball = new PortableItem("ball",
						    "A small rubber ball");
	apple = new PortableItem("apple",
						"A tasty red apple");
	 
	coffeeTable = new StaticItem("coffee table",
						  "A small coffee table",
						  [keyLivingroomToHallway,keyHallwaytoOutside, ball, apple]);

	livingRoom = new Room("living room", 
							"It's a well lite room and there are two doors opposite of eachother. One wooden door and a green wooden door. and there is a coffee table.",
							[doorLivingroomToKitchen, doorLivingroomToHallway, coffeeTable]);
	
	kitchen = new Room("kitchen", 
						"The kitchen... Only one door. the wooden one.",
						[doorLivingroomToKitchen]);
	
	hallway = new Room("hallway", 
						"This is the hallway. You see light comming in through the glass window next to the front door. And there is the green woodendoor to the living room.",
						[doorLivingroomToHallway, doorHallwayToOutside]);
	
	outside = new StaticItem("outside", 
							"It's a forrest and it's a sunny day",
							[doorHallwayToOutside]);
	
	//set the rooms that are connected to this door. First room where you in then the room that goes to.
	doorLivingroomToKitchen.setSpaces(livingRoom, kitchen);
	doorLivingroomToHallway.setSpaces(livingRoom, hallway);
	doorHallwayToOutside.setSpaces(hallway, outside);

	//set current space to room
	currentSpace = livingRoom;

	
/*
//	//Functions that are triggered by certain phrases
//
*/
	 function lookAround(){
		 let answer;
		 answer = currentSpace.getDescription();
		 return answer; 
	 }
	 
	 function checkContainer(container){
		 let answer;
		 
		 if(container.length <= 0 || container.length == undefined){
			 answer = "You don't carry anything with you."
		 }else{
			answer = "You see: ";
			for(let i= 0; i<container.length; i++){
				if(i===0){
					answer = answer+container[i].getName();
				}else if(i<container.length-1){
					answer = answer + ", " + container[i].getName();
				}else{
					let name = container[i].getName();
					let firstLetter = name[0].toLowerCase();
					if(firstLetter === "a" || firstLetter === "o" || firstLetter === "u" || firstLetter === "i" || firstLetter === "e"){
						answer = answer + " and an " + name;
					}else{
						answer = answer + " and a " + name;
					}
				}
				
			} 
		 }
		 return answer;
	 }
	 
	 
	 function getItem(nameItem, container){
		 let answer;
		 for(let i=0; i < container.objects.length; i++){
			
			 if(container.objects[i].getName() === nameItem){
				 container.objects[i].pickUp();
				 container.objects.splice(container.objects.indexOf(container.objects[i]),1);
				 answer = "You pick up the " + nameItem + " from the " + container.getName();
				 return answer;
			 }
		 }
	 }
	 
	 function checkItemInventory(nameItem){
		 for(let i=0; i<currentInventory.length; i++){
			 if(currentInventory[i].getName() === nameItem){
				 return currentInventory[i];
			 }else{
				 return false;
			 }
		 }
	 }
	 
	 function checkItemInCurrentRoom(nameItem){
		 for(let i=0; i<currentSpace.length; i++){
			 if(currentSpace.objects[i].getName() === nameItem){
				 return currentSpace.objects[i].getDescription();
			 }else{
				 return "There is no " + nameItem + " in this room";
			 }
		 }
	 }
	 
	 
	 function checkWhatIsTyped(typed){
		 
		 let convertType = typed.toLowerCase();
		
		 switch(convertType){
			case "look around":
			case "look space":
				//give description of the space.
				setAnswer("#response",lookAround(), true);
				break;
			case "walk to wooden door":
			case "go to wooden door":
				setAnswer("#response",checkItemInCurrentRoom("wooden door"), true);
				break;
			case "walk to wooden green door":
			case "go to wooden green door":
			case "walk to green door":
			case "go to green door":
				setAnswer("#response",checkItemInCurrentRoom("wooden green door"), true);
				break;
			case "open door":
				setAnswer("#response","Which door? ", true);
				break;
			case "look at coffee table":
			case "see coffee table":
			case "check coffee table":
				setAnswer("#response",checkContainer(coffeeTable.objects), true);
				break;
			case "take rusty key":
			case "get rusty key":
			case "grab rusty key":
			case "pick up rusty key":
				setAnswer("#response",getItem("rusty key", coffeeTable), true);
				break;		
			case "take blue key":
			case "get blue key":
			case "grab blue key":
			case "pick up blue key":
				setAnswer("#response",getItem("blue key", coffeeTable), true);
				break;		
			case "take ball":
			case "get ball":
			case "grab ball":
			case "pick up ball":
				setAnswer("#response",getItem("ball", coffeeTable), true);
				break;		
			case "take apple":
			case "get apple":
			case "grab apple":
			case "pick up appple":
				setAnswer("#response",getItem("apple", coffeeTable), true);
				break;		
			case "open door with key": 
			case "use key on door": 
				setAnswer("#response","Which door?", true);
				break;
			case "open green wooden door":
			case "open green door":
				setAnswer("#response",doorLivingroomToHallway.openDoor(), true);
				break;
			case "open wooden door":
				setAnswer("#response",doorLivingroomToKitchen.openDoor(), true);
				break;
			
			case "use rusty key on green door": 
			case "open green door with rusty key":
				 let key = checkItemInventory("rusty key");
				 if(key !== undefined){
					 doorLivingroomToHallway.setItemKeyID(key.unLock());
					 doorLivingroomToHallway.toggleLock();
				 }
				setAnswer("#response",doorLivingroomToHallway.openDoor(), true);
				break;
			case "use key on right door": 
			case "open right door with key": 
				setAnswer("#response","Key doesn't fit in this door", true);
				break;
			case "use key on right door": 
				setAnswer("#response","Key doesn't fit in this door", true);
				break;
			case "check my inventory": 
			case "check inventory": 
				setAnswer("#response",checkContainer(currentInventory), true);
				break;
			default:
				setAnswer("#response","be more specific. Don't understand: "+ convertType, true);
		 }
	 } 
	 
 });