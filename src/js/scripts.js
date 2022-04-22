// Função que inicia o jogo
function start() {
    
    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2' ></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    // Principais variáveis do game
    var jogo = {};
    var fimdejogo = false;
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);
    var podeAtirar = true;
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
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
        colisao();
    };

    // Função que move o cenário
    function moveFundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 1);
    };

    // Função que move o jogador
    function moveJogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);

            if (topo <= 0) {
                $("#jogador").css("top", topo + 10);
            }
        }
        
        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);

            if (topo >= 434) {
                $("#jogador").css("top", topo - 10);
            };
        }
        
        if (jogo.pressionou[TECLA.D]) {
            disparo();
        }
    } // Fechamento da função moveJogador()

    // Função que move o inimigo1
    function moveInimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if (posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    } // Fechamento da função moveInimigo1()

    // Função que move o inimigo2
    function moveInimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 3);

        if (posicaoX <= 0) {
            $("#inimigo2").css("left", 775);
        }
    } // Fechamento da função moveInimigo2()

    // Função que move o amigo
    function moveAmigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);

        if (posicaoX > 906) {
            $("#amigo").css("left", 0);
        }
    } // Fechamento da função moveAmigo()

    // Função de disparo
    function disparo() {
        if (podeAtirar == true) {
            podeAtirar = false;

            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"));
            tiroX = posicaoX + 190;
            topoTiro = topo + 42;
            $("#fundoGame").append("<div id='disparo'></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30);
        } // Fecha "if" podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);

            if (posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        } // Fechamento da função executaDisparo()
    } // Fechamento da função disparo()

    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        // Jogador colide com inimigo1
        if (colisao1.length > 0) {
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        } // Fechamento colide com inimigo1

        // Jogador colide com inimigo2
        if (colisao2.length > 0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);

            $("#inimigo2").css("left", 775);
            $("#inimigo2").css("top", 70);
        } // Fechamento colide com inimigo2
    } // Fechamento da função colisao()
 
    // Função de explosão1
    function explosao1(inimigo1X, inimigo1Y) {
        $("#fundoGame").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(src/imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity: 0}, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        // Função de remover div de Explosão após animação
        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    } // Fechamento da função explosao1

    // Função de explosão1
    function explosao2(inimigo2X, inimigo2Y) {
        $("#fundoGame").append("<div id='explosao2'></div>");
        $("#explosao2").css("background-image", "url(src/imgs/explosao.png)");
        var div = $("#explosao2");
        div.css("top", inimigo2Y);
        div.css("left", inimigo2X);
        div.animate({width:200, opacity: 0}, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        // Função de remover div de Explosão após animação
        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    } // Fechamento da função explosao1

    
}

