var x = 0
var y = 0
var z = 0
var clicou1 = false;
var clicou2 = false;
var clicou3 = false;

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
        this.load.image('pergaminho1', 'assets/folha.png');
        this.load.image('pergaminho2', 'assets/folha2.png');
        this.load.image('pergaminho3', 'assets/folha3.png');
        this.load.image('confirmar', 'assets/confirmar.png');
        //this.load.spritesheet('tyler', 'assets/Persona-principal.png', { frameWidth: 32, frameHeight: 32 });
    }
    
    create() {
        //cria a imagem de fundo
       // this.add.image(0, 0, 'fundo').setScale(1);
        this.add.image(400, 300, 'fundo').setScale(3);
        var pergaminho1 = this.add.image(333, 110, 'pergaminho1').setScale(0.2);
        var pergaminho2 = this.add.image(633, 110, 'pergaminho2').setScale(0.2);
        var pergaminho3 = this.add.image(933, 110, 'pergaminho3').setScale(0.2);
        var pergaminho4 = this.add.image(400, 400, 'pergaminho').setScale(0.1);
        var confirmar = this.add.image(400, 400, 'confirmar').setScale(0.2);

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

        confirmar.setInteractive();
        confirmar.on('pointerdown', () => {
            confirmar.setScale(0.4)
            if((x + y + z) === 3){
              //  this.scene.start('Scene');
              console.log("deu certo");
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
                pergaminho.setScale(0.23);
                x = 4;
                clicou1 = false;
            } else {
                pergaminho.setScale(0.2);
                x = 0;
                clicou1 = true;
            }
        } else if (num === 2) {
            if (clicou2) {
                pergaminho.setScale(0.23);
                y = 2;
                clicou2 = false;
            } else {
                pergaminho.setScale(0.2);
                y = 0;
                clicou2 = true;
            }
        } else if (num === 3) {
            if (clicou3) {
                pergaminho.setScale(0.23);
                z = 1;
                clicou3 = false;
            } else {
                pergaminho.setScale(0.2);
                z = 0;
                clicou3 = true;
            }
        }
    }
}