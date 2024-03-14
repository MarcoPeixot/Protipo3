export default class Tela extends Phaser.Scene {
    constructor() {
        super({
            key: 'Tela'
        });

        this.buttonClicked = null;
    }

    preload() {
        // Carrega os recursos necessários
        this.load.image('tela', 'assets/tela_inicial.png');
        this.load.image('play', 'assets/play_btn.png');
        this.load.image('brasil', 'assets/brasil.jpg');
        this.load.image('credits', 'assets/Credits.png');
        this.load.image('EUA', 'assets/EUA.png')
        //this.load.audio("audio", './assets/AudioFundo.mp3');

        //Carregando recursos da cena predio
        this.load.image('tile_predio', './assets/mapas/predio/Tileset_3_MV.png');
        this.load.image('tile_calcada', './assets/mapas/predio/Tileset_10_MV.png');
        this.load.image('tile_arvores', './assets/mapas/predio/Tileset_21_MV.png');
        this.load.image('tile_estrada', './assets/mapas/predio/Tileset_16_MV.png');
        this.load.image('tile_cars', './assets/mapas/predio/Tileset_Cars_MV.png');
        this.load.image('tile_plantas', './assets/mapas/predio/Tileset_8_MV.png');
        this.load.image('tile_hotdog', './assets/mapas/predio/Tileset_31_MV.png');
        this.load.tilemapTiledJSON('map_predio', './assets/mapas/predio/map_meta.json');
        this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("tecla_E", "./assets/tecla.png");
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
        this.load.audio('passosConcreto', './assets/audios/concreteFootsteps.mp3');
        this.load.audio('predioAudio', './assets/audios/Metro.mp3')
        this.load.audio('entrada', './assets/audios/entrance.mp3');
        this.load.audio("passos", "./assets/audios/footstep.mp3")
        this.load.audio("passaros", "./assets/audios/birds.mp3")
        this.load.audio("oceano", "./assets/audios/ocean.mp3")
        this.load.audio("musicaRei", "./assets/audios/entrance.mp3")
        this.load.image("movimentacao", "./assets/teclas_wasd.png");

        //Carregando recursos de outras cenas
    }

    create() {
        // Tamanho fixo da tela
        const screenWidth = 1280;
        const screenHeight = 720;

        // Cria o mapa e as camadas
        const background = this.add.image(screenWidth / 2, screenHeight / 2, 'tela').setScale(12);

        // Adiciona os botões verticalmente
        const buttonSpacing = 20; // Espaçamento entre os botões
        const buttonScale = 0.7; // Escala dos botões

        const play = this.add.image(screenWidth / 2, screenHeight / 2, 'play').setOrigin(0.5).setScale(buttonScale * 2);
        const brasil = this.add.image(screenWidth / 1.63, play.y + play.height * play.scaleY + buttonSpacing * 4, 'brasil').setOrigin(0.5).setScale(buttonScale / 4);
        const credits = this.add.image(screenWidth / 2.85, play.y + play.height * play.scaleY + buttonSpacing * 4, 'credits').setOrigin(0.5).setScale(buttonScale);
        const EUA = this.add.image(screenWidth / 1.4, play.y + play.height * play.scaleY + buttonSpacing * 4, 'EUA').setOrigin(0.5).setScale(buttonScale / 6);

        // Habilitar interatividade e adicionar evento de clique ao botão "play"
        play.setInteractive();
        play.on('pointerdown', () => {
            // Iniciar a cena principal quando o botão "play" é clicado
            this.scene.start('cena_predio');
        });

        // Adicionar eventos de hover
        play.on('pointerover', () => {
            play.setScale(1.6);
        });

        play.on('pointerout', () => {
            play.setScale(buttonScale * 2);
        });

        
        brasil.setInteractive();
        brasil.on('pointerover', () => {
            brasil.setScale(buttonScale / 3.5);
        });

        brasil.on('pointerout', () => {
            brasil.setScale(buttonScale / 4);
        });

        credits.setInteractive();
        credits.on('pointerover', () => {
            credits.setScale(0.8);
        });

        credits.on('pointerout', () => {
            credits.setScale(buttonScale);
        });

        EUA.setInteractive();
        EUA.on('pointerover', () => {
            EUA.setScale(buttonScale / 5.3);
        });

        EUA.on('pointerout', () => {
            EUA.setScale(buttonScale / 6);
        });

        // Configuração do áudio
        //this.audio = this.sound.add("audio", { loop: true });
        //this.audio.play();
        //this.audio.setVolume(0.3)
        
    }
}
