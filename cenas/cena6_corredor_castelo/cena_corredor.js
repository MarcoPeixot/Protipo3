// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js';          // Importa o módulo de texto

var mudarCena = 0;

export default class Corredor extends Phaser.Scene {
    constructor() {
        super({
            key: "cena_corredor"
        })
    }

    preload() {
        this.load.tilemapTiledJSON('map_corredor', './assets/mapas/mapa_castelo_corredor/castelo_corredor.json');
        this.load.image('assets', './assets/mapas/mapa_castelo_corredor/mapa_final_castelo.png');
        //this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("tecla_E", "./assets/tecla.png");
        //this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create() {
        this.passosConcreto = this.sound.add("passosConcreto", { loop: true }).setVolume(0.7);
        this.musicaRei = this.sound.add("musicaRei", { loop: true }).setVolume(0.2);
        if(mudarCena === 0){
            this.musicaRei.play();
        }

        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.criarPersonagem();
        this.controls.create();
        this.tecla_E = this.add.sprite(this.tyler.x, this.tyler.y - 40, "tecla_E").setOrigin(0.5, 0.5).setVisible(false).setScale(0.1);
        this.criarNpc();
    }

    criarMapa() {
        this.map = this.make.tilemap({ key: 'map_corredor' });
        this.tilesetObject = this.map.addTilesetImage('mapa_final_castelo', 'assets')

        this.ground = this.map.createLayer('ground', this.tilesetObject, 0, 0);
        this.passar = this.map.createLayer("passar_fase", this.tilesetObject, 0, 0);
        this.voltar = this.map.createLayer("voltar_fase", this.tilesetObject, 0, 0);

        this.ground.setCollisionByProperty({ collider: true })

    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point player"
        );

        const spawnPointVoltar = this.map.findObject(
            "voltar",
            (objects) => objects.name === "spawning point voltar"
        );

        if (mudarCena === 0) {
            this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler', 1.2);
            this.controls = new Controls(this, this.tyler);
        }

        if (mudarCena === 1) {
            this.tyler = new Player(this, spawnPointVoltar.x, spawnPointVoltar.y, 'tyler', 1.2);
            this.controls = new Controls(this, this.tyler);
        }

        // Cria o jogador, câmera e controles

        this.camera = new Camera(this, this.tyler, this.map);
        this.camera.createZoom_1()


        // Adiciona colisor entre o jogador e o chão
        this.physics.add.collider(this.tyler, this.ground);

        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this, 'tyler');


    }
    criarNpc() {
        // Configuração inicial do NPC
        // const spawnPointNpc = this.map.findObject(
        //     "npc1",
        //     (objects) => objects.name === "spawning point npc"
        // );

        // Criação do NPC Vanessa
        //this.rei = this.physics.add.sprite(800, 200, "rei").setScale(1.2)

        // Configuração do texto associado ao NPC Vanessa
        //this.textoRei = this.add.text(this.rei.x, this.rei.y - 40, '', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' }).setOrigin(0.5);
    }

    update() {
        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) && !this.passosConcreto.isPlaying) {
            this.passosConcreto.play(); // Reproduz o som dos passos
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0 && this.passosConcreto.isPlaying) {
            this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
        }
        this.controls.update();
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);



        if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            mudarCena = 1;
            this.transitionToScene2("cena_castelo")
        }

        if (this.voltar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            mudarCena = 0
            this.transitionToScene2("cena_exterior");
            this.musicaRei.stop()
        }


    }

    transitionToScene2(cena) {
        //this.entrada.stop();
        this.scene.start(cena); // Inicia a cena 1
        this.passosConcreto.stop();
    }
}