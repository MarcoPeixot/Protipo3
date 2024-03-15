//definindo váriaveis para saber se o pergaminho está selecionado ou não.
var selecionado1 = 0;
var selecionado2 = 0;
var selecionado3 = 0;
var selecionado4 = 0;
var selecionado5 = 0;
var selecionado6 = 0;
//definindo váriaveis para quando o pergaminho for clicado.
var clicou1 = false;
var clicou2 = false;
var clicou3 = false;
var clicou4 = false;
var clicou5 = false;
var clicou9 = false;

//criando a classe "minigame1" que é uma extensão da classe "Phaser.Scene".
export default class Minigame1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'minigame1'
        });
    }

    // carregando imagens.
    preload() {
        
        this.load.image('fundo', 'assets/fundo.png');
        this.load.image('pergaminho1', 'assets/pergaminho1.png');
        this.load.image('pergaminho2', 'assets/pergaminho2.png');
        this.load.image('pergaminho3', 'assets/pergaminho3.png');
        this.load.image('pergaminho4', 'assets/pergaminho4.png');
        this.load.image('pergaminho5', 'assets/pergaminho5.png');
        this.load.image('pergaminho6', 'assets/pergaminho6.png');
        this.load.image('pergaminho7', 'assets/pergaminho7.png');
        this.load.image('pergaminho8', 'assets/pergaminho8.png');
        this.load.image('pergaminho9', 'assets/pergaminho9.png');
        this.load.image('confirmar', 'assets/confirmar.png');
    
    }
    // criando imagens no jogo.
    create() {
        this.add.image(400, 300, 'fundo').setScale(3);
        var pergaminho1 = this.add.image(320, 115, 'pergaminho1').setScale(0.25).setTint(0x808080);
        var pergaminho2 = this.add.image(640, 115, 'pergaminho2').setScale(0.25).setTint(0x808080);
        var pergaminho3 = this.add.image(960, 115, 'pergaminho3').setScale(0.25).setTint(0x808080);
        var pergaminho4 = this.add.image(320, 360, 'pergaminho4').setScale(0.25).setTint(0x808080);
        var pergaminho5 = this.add.image(640, 360, 'pergaminho5').setScale(0.25).setTint(0x808080);
        var pergaminho6 = this.add.image(960, 360, 'pergaminho6').setScale(0.25).setTint(0x808080);
        var pergaminho7 = this.add.image(320, 605, 'pergaminho7').setScale(0.25).setTint(0x808080);
        var pergaminho8 = this.add.image(640, 605, 'pergaminho8').setScale(0.25).setTint(0x808080);
        var pergaminho9 = this.add.image(960, 605, 'pergaminho9').setScale(0.25).setTint(0x808080);
        this.caixaDialogo = this.add.image(600, 650, "caixaDialogo").setScale(2)
        this.caixaDialogo.setVisible(false)
        this.textoAjuda = this.add.text(400, 650, 'Talvez você tenha feito más escolhas', { fontFamily: 'Arial', fontSize: 24, color: 'black' });
        this.textoAjuda.setVisible(false)
        var confirmar = this.add.image(1180, 670, 'confirmar').setScale(0.7);
        var confirmar2 = this.add.image(900, 670, 'confirmar').setScale(0.5).setVisible(false);

        //adicionando interação ao clicar nos pergaminhos.
        pergaminho1.setInteractive();
        pergaminho1.on('pointerdown', () => {
            this.clicado(pergaminho1, 1);
        });

        pergaminho2.setInteractive();
        pergaminho2.on('pointerdown', () => {
            this.clicado(pergaminho2, 2);
        });

        pergaminho3.setInteractive();
        pergaminho3.on('pointerdown', () => {
            this.clicado(pergaminho3, 3);
        });

        pergaminho4.setInteractive();
        pergaminho4.on('pointerdown', () => {
            this.clicado(pergaminho4, 4);
        });

        pergaminho5.setInteractive();
        pergaminho5.on('pointerdown', () => {
            this.clicado(pergaminho5, 5);
        });

        pergaminho6.setInteractive();
        pergaminho6.on('pointerdown', () => {
            this.clicado(pergaminho6, 6);
        });

        pergaminho7.setInteractive();
        pergaminho7.on('pointerdown', () => {
            this.clicado(pergaminho7, 7);
        });

        pergaminho8.setInteractive();
        pergaminho8.on('pointerdown', () => {
            this.clicado(pergaminho8, 8);
        });

        pergaminho9.setInteractive();
        pergaminho9.on('pointerdown', () => {
            this.clicado(pergaminho9, 9);
        });


        // adicionando interação ao clicar no botão de confirmar.
        confirmar.setInteractive();
        confirmar.on('pointerdown', () => {
            
        // condição que verifica se a soma das variáveis selecionado1, selecionado2, etc. é igual a 47.
            if((selecionado1 + selecionado2 + selecionado3 + selecionado4 + selecionado5 + selecionado6) === 47){
            // se a soma for igual a 47, avança para a cena "minigame2"
              this.transitionToScene("cena_castelo")
            }
            // se a soma for diferente de 47, nada acontece (por enquanto)
            else{
                this.caixaDialogo.setVisible(true)
                this.textoAjuda.setVisible(true)
                confirmar2.setVisible(true)
                confirmar2.setInteractive();
            }
        });
        confirmar2.on('pointerdown', () => {
            this.caixaDialogo.setVisible(false)
            this.textoAjuda.setVisible(false)
            confirmar2.setVisible(false)
        });

    }

    update() {
    
    }
    // função para mudar de cena.
    transitionToScene(cena) {
        this.scene.start(cena); 
    }
    // função para restaurar a cor original do pergaminho quando ele é desselecionado)
    clicado(pergaminho, num) {
        if (pergaminho.originalTint === undefined) {
    
            pergaminho.originalTint = pergaminho.tintTopLeft;
        }
        // verifica qual pergaminho foi clicado e altera seu estado de seleção
        if (num === 1) {
            if (clicou1) {
                pergaminho.setTint(0xFFFFFF); 
                selecionado1 = 1;
                clicou1 = false;
            } else {
                pergaminho.setTint(pergaminho.originalTint);
                selecionado1 = 0;
                clicou1 = true;
            }
        } else if (num === 2) {
            if (clicou2) {
                pergaminho.setTint(0xFFFFFF);
                selecionado2 = 2;
                clicou2 = false;
            } else {
                pergaminho.setTint(pergaminho.originalTint);
                selecionado2 = 0;
                clicou2 = true;
            }
        } else if (num === 3) {
            if (clicou3) {
                pergaminho.setTint(0xFFFFFF);
                selecionado3 = 4;
                clicou3 = false;
            } else {
                pergaminho.setTint(pergaminho.originalTint);
                selecionado3 = 0;
                clicou3 = true;
            }
        } else if (num === 4) {
                if (clicou4) {
                    pergaminho.setTint(0xFFFFFF);
                    selecionado4 = 8;
                    clicou4 = false;
                } else {
                    pergaminho.setTint(pergaminho.originalTint);
                    selecionado4 = 0;
                    clicou4 = true;
                }
        } else if (num >=5 && num <= 8) {
            if (clicou5) {
                pergaminho.setTint(0xFFFFFF);
                selecionado5 = 16;
                clicou5 = false;
            } else {
                pergaminho.setTint(pergaminho.originalTint);
                selecionado5 = 0;
                clicou5 = true;
            }
        } else if (num === 9) {
            if (clicou9) {
                pergaminho.setTint(0xFFFFFF);
                selecionado6 = 32;
                clicou9 = false;
            } else {
                pergaminho.setTint(pergaminho.originalTint);
                selecionado6 = 0;
                clicou9 = true;
            }
        }
}
}