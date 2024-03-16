// mainScene.js
// Importa os módulos necessários
import Animacoes from '../../player/animation.js';  // Importa o módulo de animações
import Player from '../../player/player.js';        // Importa o módulo do jogador
import Camera from '../../player/camera.js';        // Importa o módulo da câmera
import Controls from '../../player/controles.js';   // Importa o módulo de controles
import Texto from '../../player/texto.js';          // Importa o módulo de texto

// Variável global para controlar a mudança de cena
var mudarCena = 0;  // Inicialmente a cena a ser carregada é a cena da floresta
var i = 0;  // Variável para controlar o índice das falas
var falas = ["Ache o caminho para o castelo!", "Siga em frente!"];  // Array de falas para diálogos

// Classe representando a cena principal
export default class Floresta extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena_floresta'  // Chave da cena
        });
    }

    // Pré-carregamento de recursos
    preload() {
        // Carrega os novos assets da floresta
        this.load.image('tiles_floresta', "./assets/mapas/nova_floresta/cena_floresta.png")
        this.load.tilemapTiledJSON("map_florestar", "./assets/mapas/nova_floresta/floresta.json");
    }

    // Criação dos elementos da cena
    create() {
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // Inicializa a cena
        this.criarMapa();       // Configuração e criação do mapa
        this.criarPersonagem();  // Criação do jogador e controles

        this.controls.create();  // Criação dos controles para o jogador

        // Criação do elemento interativo "E" e configuração de diálogos
        this.tecla_E = this.add.sprite(this.tyler.x, this.tyler.y - 40, "tecla_e").setOrigin(0.5, 0.5).setVisible(false).setScale(2);
        this.tecla_E.setInteractive();  // Torna o elemento interativo
        this.tecla_E.on('pointerup', () => {
            this.caixaDialogo.setVisible(true)
            this.texto.setVisible(true)
            // Iniciar o diálogo quando o botão "E" é clicado
            Texto.showTextLetterByLetter(this, falas[i], this.texto);
            i++;
            if (i === falas.length) {
                i = 0;  // Reinicia o índice das falas
            }
        });

        // Adição de sons à cena
        this.passos = this.sound.add("passos", { loop: true }).setVolume(0.5);
        this.passaros = this.sound.add("passaros", { loop: true }).setVolume(0.2);
        this.passaros.play();

        // Elementos visuais para diálogos
        this.caixaDialogo = this.add.image(this.tyler.x, this.tyler.y + 50, "caixaDialogo").setScale(0.5)
        this.caixaDialogo.setVisible(false)

        this.texto = this.add.text(this.tyler.x, this.tyler.y + 50, '', { fontFamily: 'Arial', fontSize: 13, color: 'black' }).setOrigin(0.5);
    }

    // Criação do mapa da cena
    criarMapa() {
        // Criação do mapa e das camadas
        this.map = this.make.tilemap({ key: "map_florestar" });
        this.tilesetGround = this.map.addTilesetImage("cena_floresta", "tiles_floresta");

        this.ground = this.map.createLayer("ground", this.tilesetGround, 0, 0);
        this.informacao = this.map.createLayer("informacao", this.tilesetGround, 0, 0);
        this.passar = this.map.createLayer("passar", this.tilesetGround, 0, 0);
        this.ground.setCollisionByProperty({ collider: true })
    }

    // Criação do personagem principal
    criarPersonagem() {
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point player"
        );

        // Criação do jogador e controles associados
        if (mudarCena === 0) {
            this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler_armor', 1.2);  // Criação do jogador em uma posição específica
            this.controls = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador

        }
        if (mudarCena === 1) {
            this.tyler = new Player(this, 900, 400, 'tyler_armor', 1.2);  // Criação do jogador em outra posição
            this.controls = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }

        // Configuração de colisões do jogador com elementos do mapa
        this.physics.add.collider(this.tyler, this.ground)

        // Inicialização das animações do jogador
        Animacoes.TylerArmorcreateAnimations(this);    

        // Criação da câmera seguindo o jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);
        this.playerCamera.createZoom_1();
        this.playerCamera.createMiniMap();
    }

    // Atualização da cena a cada quadro
    update() {
        this.controls.update();  // Atualiza os controles do jogador
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
        this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 50);
        this.texto.setPosition(this.tyler.x, this.tyler.y + 50)

        // Reprodução dos sons de passos
        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) && !this.passos.isPlaying) {
            this.passos.play();
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0 && this.passos.isPlaying) {
            this.passos.stop();
        }

        // Verificação de interação com elementos do mapa
        if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transicaoCena2("cena_exterior")
            mudarCena = 1;  // Atualiza a variável global para mudar a cena
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

    // Função para transição para outra cena
    transicaoCena2(cena) {
        this.passos.stop();
        this.passaros.stop();
        this.scene.start(cena);  // Inicia a transição para a próxima cena
    }
}
