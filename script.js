var cx;

$(document).ready( function () {
    populate_switches();
    cx = $('#canvas')[0].getContext('2d');
    draw_board();
});

function populate_switches() {
    for (var i = 2; i <= 15; i++) {
        $('<div class="switch low active">')
            .attr('id', 'switchLo' + i)
            .data('pin', i)
            .text(i.toString() + ' LOW')
            .click(toggle_switch_low)
            .appendTo('#switches');
        $('<div class="switch high">')
            .attr('id', 'switchHi' + i)
            .data('pin', i)
            .text(i.toString() + ' HIGH')
            .click(toggle_switch_high)
            .appendTo('#switches');
    }
}

function toggle_switch_low() {
    var me = $(this);
    if (me.hasClass('active')) return;
    var pin = me.data('pin');
    me.addClass('active');
    $('#switchHi' + pin).removeClass('active');
    draw_led(pin, false);
}

function toggle_switch_high() {
    var me = $(this);
    if (me.hasClass('active')) return;
    var pin = me.data('pin');
    me.addClass('active');
    $('#switchLo' + pin).removeClass('active');
    draw_led(pin, true);
}

function draw_board() {
    cx.canvas.width = 500;
    cx.canvas.height = 700;
    var img = $('#boardoff')[0];
    if (!img.complete) {
        setTimeout(draw_board, 1000);
        return;
    }
    cx.drawImage(img, 0, 0, 
        img.width, img.width*1.4,
        0, 0, cx.canvas.width, cx.canvas.height);
}

var BIG_X = 300,
    BIG_Y = 950,
    BIG_WIDTH = 300,
    BIG_HEIGHT = 108;

function draw_led(pin, which) {
    var img = $(which ? '#boardon' : '#boardoff')[0];
    var pini = pin-2;
    var xi = pini > 6 ? 0 : 1;
    var yi = 6 - (pini % 7);
    var sx = BIG_X + BIG_WIDTH * xi;
    var sy = BIG_Y + BIG_HEIGHT * yi;
    var ratio = img.width / cx.canvas.width;
    cx.drawImage(img, sx, sy, BIG_WIDTH, BIG_HEIGHT,
        sx / ratio, sy / ratio, BIG_WIDTH / ratio, BIG_HEIGHT / ratio);
}
