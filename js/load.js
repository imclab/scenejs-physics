var settings = {
    gravity: [0.0,-1.0,0.0],
    floorLevel: -10,
    floorBounce: 0.5
};

$(window).ready(function() {
    var objects = generateSpheresCube(4,4,4,2,true);
    initScene(settings);

    for(var i = 0; i < objects.length; i+=1) {
        SceneJS.createNode(objects[i]);
    }

    var frameTime = 1000/30,
        time = Date.now(),
        prevTime,
        renderLoop =  function () {
            prevTime = time;
            time = Date.now();

            for(i=0;i < objects.length; i+=1) {
                objects[i].calculateNextPosition(1.0 * (time-prevTime) / 1000.0);
                for(j=i+1;j < objects.length; j+=1) {
                    detectCollision(objects[i], objects[j]);
                }
                objects[i].updatePosition();
            }

        window.setTimeout(renderLoop, frameTime);
    };
    renderLoop();

    $('#camera_perspective').click(function () {
        SceneJS.withNode('camera').set({ eye : { x: 0.0, y: 10.0, z: 15 } });
    });
    $('#camera_top').click(function () {
        SceneJS.withNode('camera').set({ eye : { x: 0.0, y: 50.0, z: 1.0 } });
    });
    $('#camera_left').click(function () {
        SceneJS.withNode('camera').set({ eye : { x: 70.0, y: 1.0, z: 0.0 } });
    });
});

