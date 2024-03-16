export default class Minigame2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'minigame2'
        });
    }

    //Carrega as imagens do jogo
    preload() {
        this.load.image('fundo', 'assets/fundo.png');
        this.load.image('celeste', 'assets/Perfis/perfil_celeste.png');
        this.load.image('gizmo', 'assets/Perfis/perfil_gizmo.png');
        this.load.image('morgana', 'assets/Perfis/perfil_morgana.png');
        this.load.image('romeo', 'assets/Perfis/perfil_romeo.png');
        this.load.image('ruivo', 'assets/Perfis/perfil_ruivo.png');
        this.load.image('aysla', 'assets/Perfis/perfil_aysla.png');

        this.load.image('botao', 'assets/Perfis/aprovado.png');
        this.load.image('botaox', 'assets/Perfis/errado.png');
    }
    
    create() {
        //cria a imagem de fundo
        this.add.image(0, 0, 'fundo').setOrigin(0).setScale(1.5);
        var celeste = this.add.image(550, 340, 'celeste').setScale(0.4).setVisible(true);
        var gizmo = this.add.image(550, 340, 'gizmo').setScale(0.4).setVisible(false);
        var morgana = this.add.image(560, 330, 'morgana').setScale(0.4).setVisible(false);
        var romeo = this.add.image(560, 330, 'romeo').setScale(0.4).setVisible(false);
        var ruivo = this.add.image(560, 330, 'ruivo').setScale(0.4).setVisible(false);
        var aysla = this.add.image(560, 330, 'aysla').setScale(0.4).setVisible(false);


        var verdadeiro = this.add.image(470, 590, 'botao').setScale(3.8)
        var falso = this.add.image(680, 590, 'botaox').setScale(3.8)

        // Adiciona a colisão entre o personagem e as plataforma
        // Cria o cursor de teclado
        this.cursor = this.input.keyboard.createCursorKeys();
        
        verdadeiro.setInteractive();
        let i = 0; // Declare a variável 'i' e inicialize-a com 0
        verdadeiro.on('pointerdown', () => {
            switch (i) {
                case 0:
                    gizmo.setVisible(true);
                    celeste.destroy();
                    i++
                    break;
                case 1:
                    morgana.setVisible(true);
                    gizmo.destroy();
                    i++
                    break;
                    
                case 2:
                    console.log("voce errou")
                    break;
                    
                    
                case 3:
                    ruivo.setVisible(true);
                    romeo.destroy();
                    i++
                    break;
                    
                case 4: 
                console.log("voce errou")
                break;
                case 5: 
                this.scene.start('cena_castelo')
        
                
                    
                    



            }
        });

        falso.setInteractive();
        falso.on('pointerdown', () => {
            switch (i) {
                case 0:
                    console.log("voce errou")
                    break;
                case 1:
                    console.log("voce errou")
                    break;
                case 2:
                    romeo.setVisible(true);
                    morgana.destroy();
                    i++
                    break;
                case 3:
                    console.log("voce errou")
                    break;
                     
                case 4:
                    aysla.setVisible(true);
                    ruivo.destroy();
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
