// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls

var mudarCena = 0;  // Variável global para controlar a mudança de cena

// Define e exporta a classe Scene2
export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene2'
        });
    }

    // Pré-carrega os recursos necessários
    preload() {
        this.load.image("tiles", "./assets/mapas/exterior/exteriorcastelo.png");
        this.load.tilemapTiledJSON("map_exterior", "./assets/mapas/exterior/exterior.json");
        //this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        //this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }



    // Cria os elementos do jogo
    create() {
        this.passosConcreto = this.sound.add("passosConcreto", { loop: true }).setVolume(0.7);
        this.oceano = this.sound.add("oceano", { loop: true }).setVolume(0.1);
        this.oceano.play();
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.criarPersonagem();
        this.control.create();

    }

    criarMapa() {
        // Cria o mapa e define o tileset
        this.map = this.make.tilemap({ key: "map_exterior" });
        this.tileset = this.map.addTilesetImage("exteriorcastelo", "tiles");
        // Cria as camadas do mapa
        this.ground = this.map.createLayer("ground", this.tileset, 0, 0);
        this.passar = this.map.createLayer("passar_fase", this.tileset, 0, 0);
        this.voltar = this.map.createLayer("voltar_fase", this.tileset, 0, 0);
        // Define colisões com base nas propriedades do mapa
        this.ground.setCollisionByProperty({ collider: true })
    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point player"
        );

        const spawnPointVolta = this.map.findObject(
            "voltar",
            (objects) => objects.name === "spawning point voltar"
        );

        if (mudarCena === 0) {
            this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler', 1.2);  // Criação do jogador em uma posição específica
            this.control = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }
        if (mudarCena === 1) {
            this.tyler = new Player(this, spawnPointVolta.x, spawnPointVolta.y, 'tyler', 1.2);  // Criação do jogador em outra posição
            this.control = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }
        
        // Adiciona colisor entre o jogador e o chão
        this.physics.add.collider(this.tyler, this.ground);


        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this, 'tyler');

        // Cria o jogador, câmera e controles
        this.camera = new Camera(this, this.tyler, this.map);
        this.camera.createZoom_1();
        

        this.passarPonte = 950;
        this.passarPonteY = 205;
    }


    // Atualiza o jogo
    update() {

        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) && !this.passosConcreto.isPlaying) {
            this.passosConcreto.play(); // Reproduz o som dos passos
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0 && this.passosConcreto.isPlaying) {
            this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
        }
        // Atualiza os controles do jogador
        this.control.update();
        // Verifica se o jogador atingiu a posição de transição de cena
        if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transitionToScene1("cena_corredor")
            mudarCena = 1;
        }

        if (this.voltar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transitionToScene1("cena_floresta");
            mudarCena = 0;
        }
    }

    // Método para transição para a cena 1
    transitionToScene1(cena) {
        this.passosConcreto.stop();
        this.oceano.stop();
        this.scene.start(cena); // Inicia a cena 1
    }
}
