window.onload = function() {
    function draw(x, y, width, height) {
        var leftToRight = Math.random() >= 0.5;

        if (leftToRight) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + width, y + height);
        } else {
            ctx.moveTo(x, y + height);
            ctx.lineTo(x + width, y);
        }
        ctx.stroke();
    }

    function drawLines(step, width, height) {
        for (x=0; x<width; x+= step) {
            for (y=0; y<height; y+= step) {
                draw(x, y, step, step);
            }
        }
    }

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const STEP = 40;
    const canvas = document.querySelector("#canv");
    const ctx = canvas.getContext("2d");
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    ctx.lineCap = 'square';
    ctx.lineWidth = 2;

    drawLines(STEP, WIDTH, HEIGHT);
}
