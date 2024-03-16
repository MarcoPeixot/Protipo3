// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js';

//Variáveis para o jogo
var mudarCena = 0;  // Variável global para controlar a mudança de cena
var i = 0; // Variável para controlar o index
var falas = ["bom dia!"] //Array para as falas

// Define e exporta a classe Scene2
export default class Escriba extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena_escriba'
        });
    }

    // Pré-carrega os recursos necessários
    preload() {
        this.load.image("tiles_escriba", "./assets/mapas/escriba/cena_escriba.png");
        this.load.tilemapTiledJSON("map_escriba", "./assets/mapas/escriba/escriba.json");
        this.load.spritesheet("escriba", "./assets/sprites_personagens/assets_escriba/escriba.png", { frameWidth: 32, frameHeight: 32 });
    }

    // Cria os elementos do jogo
    create() {
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.criarPersonagem();
        this.control.create();
        this.criarNpc()

        this.tecla_E = this.add.sprite(this.tyler.x + 90, this.tyler.y - 50, "tecla_e").setOrigin(0.5, 0.5).setVisible(false).setScale(2);
        this.escriba.setInteractive();
        this.escriba.on('pointerup', () => {
            // Iniciar a cena principal quando o botão "play" é clicado
            this.caixaDialogo.setVisible(true)
            this.textoEscriba.setVisible(true)
            Texto.showTextLetterByLetter(this, falas[i], this.textoEscriba);
            i++
            if (i === falas.length) {
                i = 0;
            }
        });
        this.caixaDialogo = this.add.image(350, 600, "caixaDialogo").setScale(0.4)
        this.caixaDialogo.setVisible(false)
        this.textoEscriba = this.add.text(this.escriba.x + 80, this.escriba.y + 80, '', { fontFamily: 'Arial', fontSize: 16, color: 'black' }).setOrigin(0.5);

        this.tecla_sinalizcao = this.add.sprite(this.escriba.x, this.escriba.y - 50, "tecla_sinalizacao").setOrigin(0.5, 0.5).setVisible(true).setScale(2);
    }

    criarMapa() {
        // Cria o mapa e define o tileset
        this.map = this.make.tilemap({ key: "map_escriba" });
        this.tilesetEscriba = this.map.addTilesetImage("cena_escriba", "tiles_escriba");
        // Cria as camadas do mapa
        this.ground = this.map.createLayer("ground", this.tilesetEscriba, 0, 0);
        this.entrada = this.map.createLayer("entrada", this.tilesetEscriba, 0, 0);
        // Define colisões com base nas propriedades do mapa
        this.ground.setCollisionByProperty({ collider: true })
    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point player"
        );

        if (mudarCena === 0) {
            this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler_armor', 1.2);  // Criação do jogador em uma posição específica
            this.control = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }

        // Adiciona colisor entre o jogador e o chão
        this.physics.add.collider(this.tyler, this.ground);


        // Cria as animações utilizando o Animacao
        Animacao.TylerArmorcreateAnimations(this);

        // Cria o jogador, câmera e controles
        this.camera = new Camera(this, this.tyler, this.map);
        this.camera.createZoom_1();

    }

    criarNpc() {
        // Configuração inicial do NPC
        const spawnPointNpc = this.map.findObject(
            "escriba",
            (objects) => objects.name === "spawning point escriba"
        );

        // Criação do NPC Escriba
        this.escriba = this.physics.add.sprite(spawnPointNpc.x, spawnPointNpc.y, "escriba", 1).setScale(1.2)
    }


    // Atualiza o jogo
    update() {
        //Setando as posições dos elementos
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
        this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 55);
        this.textoEscriba.setPosition(this.tyler.x, this.tyler.y + 55);

        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0)) {
            //this.passos.play(); // Reproduz o som dos passos
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0) {
            //this.passos.stop(); // Para o som dos passos se o jogador não estiver se movendo
        }
        // Atualiza os controles do jogador
        this.control.update();
        // Verifica se o jogador atingiu a posição de transição de cena
        if (this.entrada.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transitionToScene1("cena_castelo")
        }

        //Constante para se há sobreposição do tyler no escriba
        const overlapping = this.physics.overlap(this.tyler, this.escriba);

        if (overlapping) {
            this.tecla_E.setVisible(true);

            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.control.interacao)) {
                this.caixaDialogo.setVisible(true)
                this.textoEscriba.setVisible(true)
                Texto.showTextLetterByLetter(this, falas[i], this.textoEscriba);
                i++
                if (i === falas.length) {
                    i = 0;
                }
            }
        }
        else {
            this.tecla_E.setVisible(false);
            this.caixaDialogo.setVisible(false)
            this.textoEscriba.setVisible(false)
        }
    }

    // Método para transição para a cena 
    transitionToScene1(cena) {
        this.scene.start(cena); 
    }
}
