function makeLines(step, size) {
    var lines = [];

    for (i = 2*step; i <= size - (2*step); i += 5) {

        var line = [];
        for (j = (4*step); j <= size - (4*step); j += step) {
            var distanceToCenter = Math.abs(j - (size / 2));
            var variance = Math.max((size / 2) - 150 - distanceToCenter, 0);
            var random = Math.random() * Math.random() * Math.random() * variance * -1;
            var point = {x: j, y: i + random};
            line.push(point);
        }
        lines.push(line);
    }
    return lines;
}

function drawLines(lines, context) {
    for (i = 8; i < lines.length; i++) {

        context.strokeStyle = 'white';
        context.fillStyle = 'black';
        context.beginPath();
        context.moveTo(lines[i][0].x, lines[i][0].y);

        for (j = 0; j < lines[i].length - 1; j++) {
            var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
            var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
            context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
        }

        context.save();
        context.globalCompositeOperation = 'source-atop';
        context.fill();
        context.restore();
        context.stroke();
    }
}


window.onload = function() {
    var canvas = document.querySelector("#canv");
    var c = canvas.getContext("2d");
    var size = 600;
    var dpr = window.devicePixelRatio;

    canvas.height = size * dpr;
    canvas.width = size * dpr;
    c.scale(dpr, dpr);

    c.lineCap = 'square';
    c.lineWidth = 1;
    c.fillStyle = 'black';

    var step = 20;

    const animate = () => {
        if (stop) {
            return;
        }

        requestAnimationFrame(animate);

        now = Date.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            var lines = makeLines(step, size);
            c.fillRect(0, 0, size, size);
            drawLines(lines, c);
        }
    }

    const startAnimating = (fps) => {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        console.log(startTime);
        animate();
    }


    var stop = false;
    var frameCount = 0;
    var fps, fpsInterval, startTime, now, then, elapsed;

    startAnimating(8);
    //Comment out the above line and uncomment the following lines to get a static image.
    //c.fillRect(0, 0, size, size);
    //var lines = makeLines(step, size);
    //drawLines(lines, c)



}
