const directions = ["R3", "L5", "R2", "L1", "L2", "R5", "L2", "R2", "L2", "L2", "L1", "R2", "L2", "R4", "R4", "R1", "L2", "L3", "R3", "L1", "R2", "L2", "L4", "R4", "R5", "L3", "R3", "L3", "L3", "R4", "R5", "L3", "R3", "L5", "L1", "L2", "R2", "L1", "R3", "R1", "L1", "R187", "L1", "R2", "R47", "L5", "L1", "L2", "R4", "R3", "L3", "R3", "R4", "R1", "R3", "L1", "L4", "L1", "R2", "L1", "R4", "R5", "L1", "R77", "L5", "L4", "R3", "L2", "R4", "R5", "R5", "L2", "L2", "R2", "R5", "L2", "R194", "R5", "L2", "R4", "L5", "L4", "L2", "R5", "L3", "L2", "L5", "R5", "R2", "L3", "R3", "R1", "L4", "R2", "L1", "R5", "L1", "R5", "L1", "L1", "R3", "L1", "R5", "R2", "R5", "R5", "L4", "L5", "L5", "L5", "R3", "L2", "L5", "L4", "R3", "R1", "R1", "R4", "L2", "L4", "R5", "R5", "R4", "L2", "L2", "R5", "R5", "L5", "L2", "R4", "R4", "L4", "R1", "L3", "R1", "L1", "L1", "L1", "L4", "R5", "R4", "L4", "L4", "R5", "R3", "L2", "L2", "R3", "R1", "R4", "L3", "R1", "L4", "R3", "L3", "L2", "R2", "R2", "R2", "L1", "L4", "R3", "R2", "R2", "L3", "R2", "L3", "L2", "R4", "L2", "R3", "L4", "R5", "R4", "R1", "R5", "R3"];

// initialize location
let location = {
    "facing": "north",
    "x": 0,
    "y": 0,
    "visitedLocations": [],
    "isLocationVisited": function(location) {
        return this.visitedLocations.indexOf(location) > -1;
    },
    "turnRight": function() {
        switch(this.facing) {
            case "north":
                this.facing = "east";
                break;
            case "east":
                this.facing = "south";
                break;
            case "south":
                this.facing = "west";
                break;
            case "west":
                this.facing = "north";
                break;
        }
    },
    "turnLeft": function() {
        switch(this.facing) {
            case "north":
                this.facing = "west";
                break;
            case "east":
                this.facing = "north";
                break;
            case "south":
                this.facing = "east";
                break;
            case "west":
                this.facing = "south";
                break;
        }
    },
    "move": function(steps) {
        for (let i=0; i < steps; i++) {
            switch(this.facing) {
                case "north":
                    this.y++;
                    break;
                case "east":
                    this.x++;
                    break;
                case "south":
                    this.y--;
                    break;
                case "west":
                    this.x--;
                    break;
            }

            if (this.isLocationVisited(this.x + "," + this.y)) {
                console.log("Blocks from visited location twice: " + (Math.abs(location.x) + Math.abs(location.y)))
            }

            this.visitedLocations.push(this.x + "," + this.y);
        }
    }
};

// loop through directions
for (step of directions) {

    // turn left or right
    switch (step.substring(0,1)) {
        case "R":
            location.turnRight();
            break;
        case "L":
            location.turnLeft();
            break;
    }

    location.move(step.substring(1));

}

console.log("Blocks away: " + (Math.abs(location.x) + Math.abs(location.y)));