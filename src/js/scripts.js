function start() {
    
    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2' ></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    // Principais variáveis do game
    var jogo = {};
    var TECLA = {
        W: 87,
        S: 83,
        D: 68,
    };

    jogo.pressionou = [];

    // Verificar se o jogador pressionou alguma tecla
    $(document).keydown(function(e) {
        jogo.pressionou[e.which] = true;
    });  

    $(document).keyup(function(e) {
        jogo.pressionou[e.which] = false;
    });
    

    // Game Loop
    jogo.timer = setInterval(loop, 30);

    function loop() {
        moveFundo();
        moveJogador();
    };

    // Função que move o cenário
    function moveFundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 1);
    };
}

