// JavaScript Document
$(document).ready(function(){
	//set globalID
	"use strict";
	let globalID = null;

	//set current space var
	let currentSpace;

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


	function Door(name, description, newSpace, doorKeyID){
		//public attributes
		//get the vars that are setup in the parent class
		StaticItem.call(this, name, description);


		this.doorKeyID = doorKeyID;
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
				console.log("you enter another room/place");
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




		/*here has to come handler to get to next room (see vars that are set in this constructor)*/


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
	let doorLivingroomToKitchen;
	let doorLivingroomToHallway;
	//keys
	let keyLivingroomToKitchen;
	//spaces
	let livingRoom;
	let kitchen;
	let hallway;
	let outside;

	//test classes with making objects
	
	doorLivingroomToKitchen = new Door("Wooden door", 
	"You can go from the livinging room to the kitchen and back",
	kitchen);
	
	doorLivingroomToHallway = new Door("Wooden door painted green", 
	"You can go from the livinging room to the hallway and back",
	hallway,
	123);


	keyLivingroomToKitchen = new Key("rusty key", "This is the key that opens the door to the kitchen", 123);

	livingRoom = new Room("living room", 
	"It's a well lite room and there are two doors.",
	[doorLivingroomToKitchen, doorLivingroomToHallway, keyLivingroomToKitchen]);
	
	kitchen = new Room("kitchen", 
	"The kitchen... Only one door.",
	[doorLivingroomToKitchen]);
	
	hallway = new Room("hallway", 
	"This is the hallway. You see light comming in through the glass window next to the front door. And there is the door to the living room.",
	[doorLivingroomToHallway]);
	
	outside = new StaticItem("outside", 
	"It's a forrest and it's a sunny day");

	//set current space to room
	currentSpace = livingRoom;



	console.log("description of first object in room: "+ currentSpace.objects[0].getName());
	currentSpace.getObjects();




});

