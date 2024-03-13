// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js';          // Importa o módulo de texto

var i = 0
var falas = ["Olá, seja bem vindo", "vou precisar da sua ajuda","é crucial que você esteja comigo nesse momento", "preciso que selecione apenas os melhores guerreiros", "vamos nessa", " "]

var mudarCena = 0;

export default class Scene3 extends Phaser.Scene {
    constructor() {
        super({
            key: "cena_castelo"
        })
    }

    preload(){
        this.load.tilemapTiledJSON('map_castle', './assets/mapas/castelo/sala_rei.json');
        this.load.image('tile_castelo', './assets/mapas/castelo/salarei.png');
        this.load.image('caixaDialogo', './assets/caixaDialogo.jpg');
        this.load.spritesheet("rei", "./assets/sprites_personagens/assets_rei/rei.png", { frameWidth: 32, frameHeight: 32 });
        //this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("tecla_e", "./assets/tecla_e_pixel.png");
        this.load.audio("musicaRei", "./assets/audios/entrance.mp3")
        //this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create() {

        this.passosConcreto = this.sound.add("passosConcreto", { loop: true }).setVolume(0.7);
        this.musicaRei = this.sound.add("musicaRei", { loop: true }).setVolume(0.2);
        this.musicaRei.play();
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.caixaDialogo = this.add.image(400, 400, "caixaDialogo").setScale(0.6)
        this.caixaDialogo.setVisible(false)
        this.criarPersonagem();
        this.controls.create();
        this.tecla_E = this.add.sprite(this.tyler.x, this.tyler.y - 40, "tecla_e").setOrigin(0.5, 0.5).setVisible(false).setScale(2);
        this.criarNpc();
    }

    criarMapa() {
        this.map = this.make.tilemap({ key: 'map_castle' });
        this.tilesetCast = this.map.addTilesetImage('salarei', 'tile_castelo')

        this.ground = this.map.createLayer('ground', this.tilesetCast, 0, 0);
        this.passar = this.map.createLayer("passar_fase", this.tilesetCast, 0, 0);
        this.voltar = this.map.createLayer("voltar_fase", this.tilesetCast, 0, 0);

        this.ground.setCollisionByProperty({collider: true})

    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point player"
        );

        // Cria o jogador, câmera e controles
        this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler', 1.2);
        this.camera = new Camera(this, this.tyler, this.map);
        this.camera.createZoom_1()
        this.controls = new Controls(this, this.tyler);

        // Adiciona colisor entre o jogador e o chão
        this.physics.add.collider(this.tyler, this.ground);

        // Cria as animações utilizand  o o Animacao
        Animacao.createAnimations(this, 'tyler');


    }
    criarNpc() {
        // Configuração inicial do NPC
        const spawnPointNpc = this.map.findObject(
            "rei",
            (objects) => objects.name === "spawning point rei"
        );

        // Criação do NPC Vanessa
        this.rei = this.physics.add.sprite(spawnPointNpc.x, spawnPointNpc.y, "rei").setScale(1.2)

        // Configuração do texto associado ao NPC Vanessa
        this.textoRei = this.add.text(400, 400, '', { fontFamily: 'Arial', fontSize: 16, color: 'black' }).setOrigin(0.5);
    }

    update() {
        this.controls.update();
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) && !this.passosConcreto.isPlaying) {
            this.passosConcreto.play(); // Reproduz o som dos passos
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0 && this.passosConcreto.isPlaying) {
            this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
        }

        if (this.tyler.x < this.voltar) {
            this.passosConcreto.stop();
            this.transitionToScene2('scene2');
        }
        // console.log(this.tyler.x < this.voltar);
        const overlapping = this.physics.overlap(this.tyler, this.rei);

        if (overlapping) {
            this.tecla_E.setVisible(true);

            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
                this.caixaDialogo.setVisible(true)
                Texto.showTextLetterByLetter(this, falas[i], this.textoRei);
                i++
                if (i === falas.length) {
                    this.transitionToScene2("minigame1")
                }
            }
        } else {
            this.tecla_E.setVisible(false);
        }

        if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transitionToScene2("cena_castelo")
            mudarCena = 1;
        }

        if (this.voltar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transitionToScene2("cena_corredor");
        }
    }

    transitionToScene2(cena) {
        this.scene.start(cena); // Inicia a cena 1
        this.musicaRei.stop();
        this.passosConcreto.stop()
    }
}