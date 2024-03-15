// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js';

var i = 0;
var falas = ["Ola tyler", "Vá até o oculos \ne o coloque!"]

export default class SceneOffice extends Phaser.Scene {
    constructor() {
        super({
            key: "SceneOffice"
        })
    }
    preload() {

        this.load.image('tile_escritorio_final', './assets/mapas/mapa_escritorio/mapaEscritórioFinal.png');
        this.load.image('escritorio_ground', './assets/mapas/mapa_escritorio/escritorio base(ground).png');
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
        this.load.tilemapTiledJSON('map_escritorio', './assets/mapas/mapa_escritorio/escritorio.json');
        this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("vanessa", "./assets/sprites_personagens/assets_vanessa/vanessa_lado.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("tecla_e", "./assets/tecla_e_pixel.png");

    }

    create() {

        

        this.passosConcreto = this.sound.add("passosConcreto", { loop: true }).setVolume(0.6);
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.criarPersonagem();
        this.criarNpc()
        this.control.createUnico();

        this.tecla_E = this.add.sprite(this.tyler.x, this.tyler.y - 20, "tecla_e").setOrigin(0.5, 0.5).setVisible(false).setScale(1);
        this.tecla_E.setInteractive();
        this.tecla_E.on('pointerup', () => {
            // Iniciar a cena principal quando o botão "play" é clicado
            this.scene.start('cena_floresta')
        });

        this.caixaDialogo = this.add.image(350, 600, "caixaDialogo").setScale(0.2)
        this.caixaDialogo.setVisible(false);
        this.textoVanessa = this.add.text(this.vanessa.x + 80, this.vanessa.y + 80, '', { fontFamily: 'Arial', fontSize: 12, color: 'black' }).setOrigin(0.5).setScale(0.5);

        this.tecla_sinalizcao = this.add.sprite(this.vanessa.x, this.vanessa.y - 30, "tecla_sinalizacao").setOrigin(0.5, 0.5).setVisible(true).setScale(1.5);

        this.vanessa.setInteractive();
        this.vanessa.on('pointerup', () => {
            // Iniciar a cena principal quando o botão "play" é clicado
            this.caixaDialogo.setVisible(true)
            this.textoVanessa.setVisible(true)
            Texto.showTextLetterByLetter(this, falas[i], this.textoVanessa);
            i++
            if (i === falas.length) {
                i = 0;
            }
        });
    }

    criarMapa() {
        this.map = this.make.tilemap({ key: 'map_escritorio' });
        this.tilesetEscritorio = this.map.addTilesetImage('mapaEscritórioFinal', 'tile_escritorio_final');
        this.tilesetParedes = this.map.addTilesetImage('escritorio base(ground)', 'escritorio_ground');

        this.ground = this.map.createLayer('ground', this.tilesetEscritorio, 0, 0);
        this.oculos = this.map.createLayer('oculos', this.tilesetEscritorio, 0, 0);
        this.paredes = this.map.createLayer('paredes', this.tilesetParedes, 0, 0);
        this.ground.setCollisionByProperty({ collider: true })
        this.paredes.setCollisionByProperty({ collider: true })

    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point player"
        );

        // Cria o jogador, câmera e controles
        this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler', 0.65);
        this.camera = new Camera(this, this.tyler, this.map);
        this.camera.createZoom_2()
        this.control = new Controls(this, this.tyler);

        this.physics.add.collider(this.tyler, this.ground);
        this.physics.add.collider(this.tyler, this.paredes);

        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this, 'tyler');

    }

    criarNpc() {
        // Configuração inicial do NPC
        const spawnPointNpc = this.map.findObject(
            "npc",
            (objects) => objects.name === "spawning point npc"
        );

        // Criação do NPC Vanessa
        this.vanessa = this.physics.add.sprite(spawnPointNpc.x, spawnPointNpc.y, "vanessa").setScale(0.65).setFlipX(true)

        // Configuração do texto associado ao NPC Vanessa
        this.textoVanessa = this.add.text(this.vanessa.x, this.vanessa.y - 40, '', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' }).setOrigin(0.5);
    }

    update() {

        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
        this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 55);
        this.textoVanessa.setPosition(this.tyler.x, this.tyler.y + 55);

        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) && !this.passosConcreto.isPlaying) {
            this.passosConcreto.play(); // Reproduz o som dos passos
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0 && this.passosConcreto.isPlaying) {
            this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
        }
        this.control.updateUnico();
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 30);

        if (this.oculos.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.tecla_E.setVisible(true);
            this.tecla_E.setInteractive();

            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.control.interacao)) {
                this.scene.start('cena_floresta')
            }
        } else {
            this.tecla_E.setVisible(false);
        }

        const overlapping = this.physics.overlap(this.tyler, this.vanessa);

        if (overlapping) {
            this.tecla_E.setVisible(true);
            this.tecla_E.disableInteractive();

            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.control.interacao)) {
                this.caixaDialogo.setVisible(true)
                this.textoVanessa.setVisible(true)
                Texto.showTextLetterByLetter(this, falas[i], this.textoVanessa);
                i++
                if (i === falas.length) {
                    i = 0;
                }
            }
        }
        else {
            this.caixaDialogo.setVisible(false);
            this.textoVanessa.setVisible(false);
        }

    }

}