"use strict";
var Snake3D;
(function (Snake3D) {
    let SnakeEvents;
    (function (SnakeEvents) {
        SnakeEvents[SnakeEvents["FRUIT"] = 0] = "FRUIT";
        SnakeEvents[SnakeEvents["FRUITSPAWN"] = 1] = "FRUITSPAWN";
        SnakeEvents[SnakeEvents["WALL"] = 2] = "WALL";
        SnakeEvents[SnakeEvents["CLIMB"] = 3] = "CLIMB";
        SnakeEvents[SnakeEvents["GROUND"] = 4] = "GROUND";
        SnakeEvents[SnakeEvents["RAMP"] = 5] = "RAMP";
    })(SnakeEvents = Snake3D.SnakeEvents || (Snake3D.SnakeEvents = {}));
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=CollisionEvents.js.map