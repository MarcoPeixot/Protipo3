export default class Minigame2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'minigame2'
        });
    }

    //Carrega as imagens do jogo
    preload() {
        this.load.image('floresta', 'assets/fundo.png');
        this.load.image('papel_celeste', 'assets/Perfis/PERFIL_CELESTEsemfundo.png');
        this.load.image('botao', 'assets/Play.png')
    }
    
    create() {
        //cria a imagem de fundo
        this.add.image(0, 0, 'floresta').setOrigin(0).setScale(1.5);
        var pedra1 = this.add.image(550, 340, 'papel_celeste').setScale(0.4).setVisible(true);
        var pedra2 = this.add.image(400, 400, 'papel').setScale(0.6).setVisible(false);
        var pedra3 = this.add.image(400, 400, 'papel').setScale(0.5).setVisible(false);
        var verdadeiro = this.add.image(500, 500, 'botao').setScale(0.2);
        var falso = this.add.image(600, 500, 'botao').setScale(0.2);

        // Adiciona a colisão entre o personagem e as plataforma
        // Cria o cursor de teclado
        this.cursor = this.input.keyboard.createCursorKeys();
        
        verdadeiro.setInteractive();
        let i = 0; // Declare a variável 'i' e inicialize-a com 0
        verdadeiro.on('pointerdown', () => {
            switch (i) {
                case 0:
                    pedra2.setVisible(true);
                    pedra1.destroy();
                    i++
                    break;
                case 1:
                    console.log("você errou")
                    break;
                case 2:
                    console.log("voce errou")
                    break;
            }
        });

        falso.setInteractive();
        falso.on('pointerdown', () => {
            switch (i) {
                case 0:
                    console.log("voce errou")
                    break;
                case 1:
                    pedra3.setVisible(true);
                    pedra2.destroy();
                    i++
                    break;
                case 2:
                    pedra3.destroy();
                    i++
                    break;
            }
        });

    }

    update() {
    
    }

    //função que troca de cena
    transitionToScene(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }
}
