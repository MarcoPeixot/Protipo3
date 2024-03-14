// mainScene.js
import Animacoes from '../../player/animation.js';  // Importa o módulo de animações
import Player from '../../player/player.js';        // Importa o módulo do jogador
import Camera from '../../player/camera.js';        // Importa o módulo da câmera
import Controls from '../../player/controles.js';   // Importa o módulo de controles
import Texto from '../../player/texto.js';          // Importa o módulo de texto

var mudarCena = 0;  // Variável global para controlar a mudança de cena
var i = 0;
var falas = ["Ache o caminho para o castelo!"];

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena_floresta'
        });
    }

    preload() {
        //carrega os novos assets da floresta
        this.load.image('tiles_floresta', "./assets/mapas/nova_floresta/cena_floresta.png")
        this.load.tilemapTiledJSON("map_florestar", "./assets/mapas/nova_floresta/floresta.json");
        this.load.image("tecla_e", "./assets/tecla_e_pixel.png");
        // Carrega os assets necessários para a cena

        //this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        //this.load.spritesheet("vanessa", "./assets/sprites_personagens/assets_vanessa/vanessa_lado.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("tecla_e", "./assets/tecla_e_pixel.png");
        //this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);  
    }

    create() {
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // Inicializa a cena
        this.criarMapa();       // Configuração e criação do mapa
        this.criarPersonagem();  // Criação do jogador e controles

        this.controls.create();

        this.tecla_E = this.add.sprite(this.tyler.x, this.tyler.y - 40, "tecla_e").setOrigin(0.5, 0.5).setVisible(false).setScale(2);
        this.tecla_E.setInteractive();
        this.tecla_E.on('pointerup', () => {
            // Iniciar a cena principal quando o botão "play" é clicado
            Texto.showTextLetterByLetter(this, falas[i], this.textoVanessa);
            i++;
            if (i === falas.length) {
                i = 0;
            }
        });

        this.passos = this.sound.add("passos", { loop: true }).setVolume(0.5);
        this.passaros = this.sound.add("passaros", { loop: true }).setVolume(0.2);
        this.passaros.play();

        this.caixaDialogo = this.add.image(this.tyler.x, this.tyler.y + 50, "caixaDialogo").setScale(0.5)
        this.caixaDialogo.setVisible(false)

        this.texto = this.add.text(this.tyler.x, this.tyler.y + 50, '', { fontFamily: 'Arial', fontSize: 13, color: 'black' }).setOrigin(0.5);

    }

    criarMapa() {
        // Criação do mapa
        this.map = this.make.tilemap({ key: "map_florestar" });
        this.tilesetGround = this.map.addTilesetImage("cena_floresta", "tiles_floresta");

        // Adição das camadas do mapa
        this.ground = this.map.createLayer("ground", this.tilesetGround, 0, 0);
        this.informacao = this.map.createLayer("informacao", this.tilesetGround, 0, 0);
        this.passar = this.map.createLayer("passar", this.tilesetGround, 0, 0);
        this.ground.setCollisionByProperty({ collider: true })
    }

    criarPersonagem() {
        // Criação do jogador
        if (mudarCena === 0) {
            this.tyler = new Player(this, 100, 400, 'tyler', 1.2);  // Criação do jogador em uma posição específica
            this.controls = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador

        }
        if (mudarCena === 1) {
            this.tyler = new Player(this, 900, 400, 'tyler', 1.2);  // Criação do jogador em outra posição
            this.controls = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }

        // Configuração de colisões do jogador com elementos do mapa
        this.physics.add.collider(this.tyler, this.ground)

        // Inicialização das animações do jogador
        Animacoes.createAnimations(this, 'tyler');

        // Criação da câmera seguindo o jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);
        this.playerCamera.createZoom_1();
        this.playerCamera.createMiniMap();
    }

    update() {
        // Atualização da cena a cada quadro
        this.controls.update();  // Atualiza os controles
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
        this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 50);
        this.texto.setPosition(this.tyler.x, this.tyler.y + 50)

        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) && !this.passos.isPlaying) {
            this.passos.play(); // Reproduz o som dos passos
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0 && this.passos.isPlaying) {
            this.passos.stop(); // Para o som dos passos se o jogador não estiver se movendo
        }


        if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transicaoCena2("cena_exterior")
            mudarCena = 1;
        }

        if (this.informacao.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.tecla_E.setVisible(true);

            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
                this.caixaDialogo.setVisible(true);
                this.texto.setVisible(true)
                Texto.showTextLetterByLetter(this, falas[i], this.texto);
                i++;
                if (i === falas.length) {
                    i = 0;
                }
            }
        }
        else {
            this.tecla_E.setVisible(false);
            this.caixaDialogo.setVisible(false);
            this.texto.setVisible(false)
        }

    }

    transicaoCena2(cena) {
        this.passos.stop();
        this.passaros.stop();
        this.scene.start(cena);  // Inicia a transição para a próxima cena
    }
}
