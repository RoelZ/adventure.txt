// JavaScript Document
$(document).ready(function(){
	//set globalID
	"use strict";
	let globalID = null;

	//set current space var
	let currentSpace;
	
	//current inventory
	let currentInventory;
	

	function GiveUniqueID(){
		if(globalID === null){
			globalID = 0;
		}else{
			globalID++;
		}
		return globalID;
	}

	//parent class voor all objects that are static
	function StaticItem(name, description){
		//public attributes
		this.name = name;
		this.description = description;
		this.id = GiveUniqueID();

		//operations
		this.getName = function(){
			return this.name;
		};

		this.getDescription = function(){
			return this.description;
		};

		this.getID = function(){
			return this.id;
		};
	}

	function PortableItem(name, description){
		//public attributes
		//get the vars that are setup in the parent class
		StaticItem.call(this, name, description);
		this.pickedUp = false;

		this.setPickedUp = function(){
			if(!this.pickedUp){
				this.pickedUp = true;
			}else{
				this.pickedUp = false;
			}
		};

	}
	//PortableItem is child of StaticItem
	PortableItem.prototype = new StaticItem();
	PortableItem.prototype.constructor = PortableItem;


	function Door(name, description, doorKeyID){
		//public attributes
		//get the vars that are setup in the parent class
		StaticItem.call(this, name, description);
		
		this.doorKeyID = doorKeyID;
		
		this.newSpace = undefined;
		this.tempSpace = undefined;
		
		
		//if Door object doesn't have doorKeyID it can't be locked and is open
		if(doorKeyID === undefined){
			this.locked = false;
		}else{
			this.locked = true;
		}

		//private attributes
		var itemKeyID = '';

		//operations
		this.openDoor = function(){
			if(!this.locked){
				
				//set global current space to the new space (you enterd a new room);
				currentSpace = this.newSpace;
				console.log("---------------------------------");
				console.log(currentSpace);
				//set the door new space to old place where you come from
				this.newSpace = this.tempSpace;
				console.log(this.newSpace);
				this.tempSpace = currentSpace;
				console.log(this.tempSpace);
				console.log("---------------------------------");
			}else{
				console.log("This door is locked. You need to find a key.");
			}
		};
		
		this.toggleLock = function(){
			if(itemKeyID ===  doorKeyID){
				this.locked = false;
			}else{
				this.locked = true;
			}
		};

		this.setItemKeyID = function(numberID){
			itemKeyID = numberID || ''; 
		};
		
		
		//set the two spaces where the door is the gateway to/from
		this.setSpaces = function(currentSpace, goToSpace){
			this.newSpace = goToSpace ;
			this.tempSpace = currentSpace;
		};

	}

	//Door is child of StaticItem
	Door.prototype = new StaticItem();
	Door.prototype.constructor = Door;


	function Key(name, description, itemKeyID){
		PortableItem.call(this, name, description);
		this.itemKeyID = itemKeyID;

		this.unLock = function(){
			return this.itemKeyID;
		};
	}
	//Key is child of PortableItem
	Key.prototype = new PortableItem();
	Key.prototype.constructor = Key; 


	//Room 
	function Room(name, description, objects){ 
		//public attributes
		//get the vars that are setup in the parent class
		StaticItem.call(this, name, description);

		//Here is an array to store all the objects that are in the room
		this.objects = objects;

		this.getObjects = function(){
			console.log("Objects in the room:");
			for(let i = 0; i<this.objects.length; i++){
				console.log(i+". "+objects[i].getName());
			}
		};
	}

	//Room is child of StaticItem
	Room.prototype = new StaticItem();
	Room.prototype.constructor = Room; 


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
	
	//set the rooms that are connected to this door. First door where you in then the door that goes to.
	doorLivingroomToKitchen.setSpaces(livingRoom, kitchen);
	doorLivingroomToHallway.setSpaces(livingRoom, hallway);
	doorHallwayToOutside.setSpaces(hallway, outside);

	//set current space to room
	currentSpace = livingRoom;


	console.log(currentSpace.getName());
	currentSpace.objects[1].openDoor();
	currentSpace.objects[1].setItemKeyID(keyLivingroomToHallway.unLock());
	currentSpace.objects[1].toggleLock();
	currentSpace.objects[1].openDoor();
	console.log("You entered: " + currentSpace.getName());
	currentSpace.objects[0].openDoor();
	console.log("You entered: " + currentSpace.getName());


});

