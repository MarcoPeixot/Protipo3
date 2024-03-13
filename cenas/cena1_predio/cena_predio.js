// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js';          // Importa o módulo de texto



var falas = ["Olá, seja bem-vindo Metaverso\n isto é uma simulação para \n contratar fornecedores! \n Para começar entre no prédio. "];

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({
            key: "cena_predio"
        })
    }

    preload() {
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
    }

    create() {
        this.passosConcreto = this.sound.add("passosConcreto", { loop: true }).setVolume(0.6);
        this.predioAudio = this.sound.add("predioAudio", { loop: true }).setVolume(2);
        this.predioAudio.play()
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.criarPersonagem();

        this.control.create();

        this.passar = 10;
        
        this.texto = this.add.text(300,600,  { fontFamily: 'Arial', fontSize: 32, color: '#000000' })
    
        Texto.showTextLetterByLetter(this, falas[0],this.texto)

        this.tecla_E = this.add.sprite(this.tyler.x + 90, this.tyler.y - 60, "movimentacao").setOrigin(0.5, 0.5).setVisible(true).setScale(2);


    }



    criarMapa() {
        this.map = this.make.tilemap({ key: 'map_predio' });
        this.tilesetPredio = this.map.addTilesetImage('predio', 'tile_predio');
        this.tilesetCalcada = this.map.addTilesetImage('calçada', 'tile_calcada');
        this.tilesetArvores = this.map.addTilesetImage('arvores', 'tile_arvores');
        this.tilesetEstrada = this.map.addTilesetImage('estrada', 'tile_estrada');
        this.tilesetCarro = this.map.addTilesetImage('carros', 'tile_cars');
        this.tilesetPlantas = this.map.addTilesetImage('plantas', 'tile_plantas');
        this.tilesetDecoracao = this.map.addTilesetImage('decoracao', 'tile_hotdog');

        this.estrada = this.map.createLayer('estrada', this.tilesetEstrada, 0, 0);
        this.calcada = this.map.createLayer('calcada', this.tilesetCalcada, 0, 0);
        this.barreira = this.map.createLayer('barreira', this.tilesetEstrada, 0, 0);
        this.carros = this.map.createLayer('carros', this.tilesetCarro, 0, 0);
        this.arvTras = this.map.createLayer('arvtras', this.tilesetArvores, 0, 0);
        this.arvores = this.map.createLayer('arvores', this.tilesetArvores, 0, 0);
        this.plantas = this.map.createLayer('plantas', this.tilesetPlantas, 0, 0);
        this.decoracao = this.map.createLayer('decoracao', this.tilesetDecoracao, 0, 0);
        this.carinha = this.map.createLayer('caraCachorro', this.tilesetDecoracao, 0, 0);
        this.predio = this.map.createLayer('predio', this.tilesetPredio, 0, 0);

        this.calcada.setCollisionByProperty({ collider: true });
        this.predio.setCollisionByProperty({ collider: true });
        this.carros.setCollisionByProperty({ collider: true });
        this.barreira.setCollisionByProperty({ collider: true });
        this.arvores.setCollisionByProperty({ collider: true });
        this.plantas.setCollisionByProperty({ collider: true });
        this.decoracao.setCollisionByProperty({ collider: true });
        this.carinha.setCollisionByProperty({ collider: true });

        this.carros.setDepth(10);
        this.decoracao.setDepth(10);
        this.carinha.setDepth(10);
        this.plantas.setDepth(10);

    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point"
        );

        // Cria o jogador, câmera e controles
        this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler', 1.5);
        this.camera = new Camera(this, this.tyler, this.map);
        this.camera.createZoom_1()
        this.camera.createMiniMap();
        this.control = new Controls(this, this.tyler);

        this.physics.add.collider(this.tyler, this.calcada);
        this.physics.add.collider(this.tyler, this.predio);
        this.physics.add.collider(this.tyler, this.carros);
        this.physics.add.collider(this.tyler, this.barreira);
        this.physics.add.collider(this.tyler, this.arvores);
        this.physics.add.collider(this.tyler, this.plantas);
        this.physics.add.collider(this.tyler, this.decoracao);
        this.physics.add.collider(this.tyler, this.carinha);

        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this, 'tyler');




    }

    update() {
        this.control.update();
        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) && !this.passosConcreto.isPlaying) {
            this.passosConcreto.play(); // Reproduz o som dos passos
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0 && this.passosConcreto.isPlaying) {
            this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
        }

        
        if (this.tyler.x >= 800 && this.tyler.y <= 450) {
            this.transitionToMainScene('SceneOffice');
            this.passosConcreto.stop();
            this.predioAudio.stop();
        }
    }

    transitionToMainScene(cena) {
        this.scene.start(cena); // Inicia a cena 1
        this.passosConcreto.stop();
        this.predioAudio.stop();
    }
}