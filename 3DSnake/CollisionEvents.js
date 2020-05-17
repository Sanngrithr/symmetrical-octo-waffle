"use strict";
var Snake3D;
(function (Snake3D) {
    let CollisionEvents;
    (function (CollisionEvents) {
        CollisionEvents[CollisionEvents["FRUIT"] = 0] = "FRUIT";
        CollisionEvents[CollisionEvents["WALL"] = 1] = "WALL";
        CollisionEvents[CollisionEvents["CLIMB"] = 2] = "CLIMB";
        CollisionEvents[CollisionEvents["GROUND"] = 3] = "GROUND";
        CollisionEvents[CollisionEvents["RAMP"] = 4] = "RAMP";
    })(CollisionEvents = Snake3D.CollisionEvents || (Snake3D.CollisionEvents = {}));
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=CollisionEvents.js.map