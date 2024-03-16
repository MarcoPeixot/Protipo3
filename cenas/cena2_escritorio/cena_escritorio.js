// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js'; // Importa o módulo de texto

// Variável para controlar o índice das falas
var i = 0;

// Array de diálogos para a cena
var falas = ["Ola tyler", "Vá até o oculos \ne o coloque!"]

// Classe representando a cena do escritório
export default class SceneOffice extends Phaser.Scene {
    constructor() {
        super({
            key: "cena_escritorio"
        })
    }

    // Pré-carregamento de recursos
    preload() {
        this.load.image('tile_escritorio_final', './assets/mapas/mapa_escritorio/mapaEscritórioFinal.png');
        this.load.image('escritorio_ground', './assets/mapas/mapa_escritorio/escritorio base(ground).png');
        this.load.tilemapTiledJSON('map_escritorio', './assets/mapas/mapa_escritorio/escritorio.json');
    }

    // Criação dos elementos da cena
    create() {
        // Adiciona sons à cena
        this.passosConcreto = this.sound.add("passosConcreto", { loop: true }).setVolume(0.6);

        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Cria o mapa, personagem, NPC e controles
        this.criarMapa();
        this.criarPersonagem();
        this.control.createUnico();
        this.criarNpc();

        // Adiciona um sprite para a tecla "E" e configura interação
        this.tecla_E = this.add.sprite(this.tyler.x, this.tyler.y - 20, "tecla_e").setOrigin(0.5, 0.5).setVisible(false).setScale(1);
        this.tecla_E.setInteractive();
        this.tecla_E.on('pointerup', () => {
            // Iniciar a próxima cena quando o botão "E" é clicado
            this.scene.start('cena_floresta')
        });

        // Adiciona elementos para diálogo com o NPC
        this.caixaDialogo = this.add.image(350, 600, "caixaDialogo").setScale(0.2)
        this.caixaDialogo.setVisible(false);
        this.textoVanessa = this.add.text(this.vanessa.x + 80, this.vanessa.y + 80, '', { fontFamily: 'Arial', fontSize: 12, color: 'black' }).setOrigin(0.5).setScale(0.5);

        // Adiciona um sprite para sinalizar interação com o NPC
        this.tecla_sinalizcao = this.add.sprite(this.vanessa.x, this.vanessa.y - 30, "tecla_sinalizacao").setOrigin(0.5, 0.5).setVisible(true).setScale(1.5);

        // Configura interação com o NPC
        this.vanessa.setInteractive();
        this.vanessa.on('pointerup', () => {
            this.caixaDialogo.setVisible(true)
            this.textoVanessa.setVisible(true)
            Texto.showTextLetterByLetter(this, falas[i], this.textoVanessa);
            i++
            if (i === falas.length) {
                i = 0;
            }
        });
    }

    // Cria o mapa da cena
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

    // Cria o personagem principal
    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point player"
        );

        // Cria o jogador, câmera e controles
        this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler_normal', 0.65);
        this.camera = new Camera(this, this.tyler, this.map);
        this.camera.createZoom_2()
        this.control = new Controls(this, this.tyler);

        // Adiciona colisões do jogador com o chão e paredes
        this.physics.add.collider(this.tyler, this.ground);
        this.physics.add.collider(this.tyler, this.paredes);

        // Cria as animações do jogador
        Animacao.TylerNormalcreateAnimations(this);
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

    // Atualizações por frame
    update() {
        // Atualiza a posição dos elementos na cena
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
        this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 55);
        this.textoVanessa.setPosition(this.tyler.x, this.tyler.y + 55);

        // Reproduz o som de passos do jogador se estiver se movendo
        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) && !this.passosConcreto.isPlaying) {
            this.passosConcreto.play();
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0 && this.passosConcreto.isPlaying) {
            this.passosConcreto.stop();
        }

        // Atualiza os controles do jogador
        this.control.updateUnico();
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 30);

        // Verifica interação com o objeto "oculos"
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

        // Verifica interação com o NPC "Vanessa"
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
        } else {
            this.caixaDialogo.setVisible(false);
            this.textoVanessa.setVisible(false);
        }
    }
}
