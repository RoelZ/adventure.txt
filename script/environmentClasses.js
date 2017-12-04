// JavaScript Document
 $(document).ready(function(){
	 //set globalID
	 "use strict";
	 let globalID = null;
	 
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
			console.log("Objects in the room:")
			for(let i = 0; i<this.objects.length; i++){
				console.log(i+". "+objects[i].getName());
			}
		};
		
	}
	
	//Room is child of StaticItem
	Room.prototype = new StaticItem();
	Room.prototype.constructor = Room; 
	 
	 
	 
	//test classes with making objects
	let outside = new StaticItem("outside", 
								 "It's a forrest and it's raining");
	let doorLivingroomToKitchen = new Door("door from livingroom to kitchen", 
										   "You can go from the livinging room to the kitchen and back", 
										   123);
	let doorLivingroomToHallway = new Door("door from livingroom to hallway", 
										   "You can go from the livinging room to the hallway and back");
	
	let keyLivingroomToKitchen = new Key("rusty key", "This is the key that opens the door to the kitchen", 123);
	
	let room = new Room("living room", 
						"It's a well lite room and there are two doors.",
				   		[doorLivingroomToKitchen, doorLivingroomToHallway, keyLivingroomToKitchen]);

	/*
	Testing scripts
	console.log("description of "+ room.getName() +": \n" + room.getDescription() + "\n Unique ID: " + room.getID());
	console.log("description of "+ outside.getName() +": \n" + outside.getDescription() + "\n Unique ID: " + outside.getID());
	
	console.log("description of "+ doorLivingroomToKitchen.getName() +": \n" + doorLivingroomToKitchen.getDescription() + "\n Unique ID: " + doorLivingroomToKitchen.getID());
	
	 console.log("description of "+ doorLivingroomToHallway.getName() +": \n" + doorLivingroomToHallway.getDescription() + "\n Unique ID: " + doorLivingroomToHallway.getID());
	 
	 console.log("description of "+ keyLivingroomToKitchen.getName() +": \n" + keyLivingroomToKitchen.getDescription() + "\n Unique ID: " + keyLivingroomToKitchen.getID());
 	*/
	 
	 console.log("description of first object in room: "+ room.objects[0].getName());
	 room.getObjects();
	 
	 //door is set to locked in the creation of the object
	 doorLivingroomToKitchen.openDoor();
	 
	 doorLivingroomToKitchen.setItemKeyID(keyLivingroomToKitchen.unLock());
	 doorLivingroomToKitchen.toggleLock();
	 doorLivingroomToKitchen.openDoor();
	 
	 doorLivingroomToHallway.openDoor();
	 
 });

