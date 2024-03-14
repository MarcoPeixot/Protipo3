var xa = 0
var ya = 0
var za = 0
var wa = 0
var va = 0
var qa = 0
var clicou1 = false;
var clicou2 = false;
var clicou3 = false;
var clicou4 = false;
var clicou5 = false;
var clicou9 = false;

export default class Minigame1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'minigame1'
        });
    }

    //Carrega as imagens do jogo
    preload() {
        //this.load.image('fundo', 'assets/fundominigame.png');
        this.load.image('fundo', 'assets/fundo.png');
        this.load.image('pergaminho1', 'assets/pergaminho1.png');
        this.load.image('pergaminho2', 'assets/pergaminho2.png');
        this.load.image('pergaminho3', 'assets/pergaminho3.png');
        this.load.image('pergaminho4', 'assets/pergaminho4.png');
        this.load.image('pergaminho5', 'assets/pergaminho5.png')
        this.load.image('pergaminho6', 'assets/pergaminho6.png')
        this.load.image('pergaminho7', 'assets/pergaminho7.png')
        this.load.image('pergaminho8', 'assets/pergaminho8.png')
        this.load.image('pergaminho9', 'assets/pergaminho9.png')
        this.load.image('confirmar', 'assets/confirmar.png');
        //this.load.spritesheet('tyler', 'assets/Persona-principal.png', { frameWidth: 32, frameHeight: 32 });
    }
    
    create() {
        //cria a imagem de fundo
       // this.add.image(0, 0, 'fundo').setScale(1);
        this.add.image(400, 300, 'fundo').setScale(3);
        var pergaminho1 = this.add.image(300, 110, 'pergaminho1').setScale(0.25);
        var pergaminho2 = this.add.image(700, 110, 'pergaminho2').setScale(0.25);
        var pergaminho3 = this.add.image(1000, 110, 'pergaminho3').setScale(0.25);
        var pergaminho4 = this.add.image(300, 350, 'pergaminho4').setScale(0.25);
        var pergaminho5 = this.add.image(700, 350, 'pergaminho5').setScale(0.25);
        var pergaminho6 = this.add.image(1000, 350, 'pergaminho6').setScale(0.25);
        var pergaminho7 = this.add.image(300, 580, 'pergaminho7').setScale(0.25);
        var pergaminho8 = this.add.image(700, 580, 'pergaminho8').setScale(0.25);
        var pergaminho9 = this.add.image(1000, 580, 'pergaminho9').setScale(0.25);
        
        var confirmar = this.add.image(1200, 700, 'confirmar').setScale(0.3);

        // Adiciona a colisão entre o personagem e as plataforma
        // Cria o cursor de teclado
        //this.cursor = this.input.keyboard.createCursorKeys();
        
        // Adiciona interatividade para as pedras
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

        confirmar.setInteractive();
        confirmar.on('pointerdown', () => {
            console.log(xa + ya + za + wa + va + qa)
            confirmar.setScale(0.4)
            if((xa + ya + za + wa + va + qa) === 47){
              //  this.scene.start('Scene');
              this.transitionToScene("minigame2")
            }
            else{
                console.log('deu errado');
            }
        });

    }

    update() {
    
    }

    //função que troca de cena
    transitionToScene(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }

    clicado(pergaminho, num) {
        if (num === 1) {
            if (clicou1) {
                pergaminho.setScale(0.29);
                xa = 1;
                clicou1 = false;
            } else {
                pergaminho.setScale(0.25);
                xa = 0;
                clicou1 = true;
            }
        } else if (num === 2) {
            if (clicou2) {
                pergaminho.setScale(0.29);
                ya = 2;
                clicou2 = false;
            } else {
                pergaminho.setScale(0.25);
                ya = 0;
                clicou2 = true;
            }
        } else if (num === 3) {
            if (clicou3) {
                pergaminho.setScale(0.29);
                za = 4;
                clicou3 = false;
            } else {
                pergaminho.setScale(0.25);
                za = 0;
                clicou3 = true;
            }
        } else if (num === 4) {
                if (clicou4) {
                    pergaminho.setScale(0.29);
                    wa = 8;
                    clicou4 = false;
                } else {
                    pergaminho.setScale(0.25);
                    wa = 0;
                    clicou4 = true;
                }
        } else if (num >=5 && num <= 8) {
            if (clicou5) {
                pergaminho.setScale(0.29);
                va = 16;
                clicou5 = false;
            } else {
                pergaminho.setScale(0.25);
                va = 0;
                clicou5 = true;
            }
        } else if (num === 9) {
            if (clicou9) {
                pergaminho.setScale(0.29);
                qa = 32;
                clicou9 = false;
            } else {
                pergaminho.setScale(0.25);
                qa = 0;
                clicou9 = true;
            }
        }
}
}