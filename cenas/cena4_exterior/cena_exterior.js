// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js';

// Variáveis globais para controle de mudança de cena e diálogos
var mudarCena = 0;  
var i = 0;
var falas = ["Seja Bem-Vindo ao Reino"];
var falasNpc = ["O rei te espera dentro do castelo, \ndepois do corredor!"];

// Define e exporta a classe Exterior
export default class Exterior extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena_exterior'
        });
    }

    // Pré-carrega os recursos necessários
    preload() {
        this.load.image("tiles", "./assets/mapas/exterior/exteriorcastelo.png");
        this.load.tilemapTiledJSON("map_exterior", "./assets/mapas/exterior/exterior.json");
        this.load.spritesheet("donoLoja", "./assets/sprites_personagens/assets_donoLoja/donoloja1.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("npc2", "./assets/sprites_personagens/assets_npc2/npccastelo2.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("npcVitiligo", "./assets/sprites_personagens/assets_npcVitiligo/npcvitiligo.png", { frameWidth: 32, frameHeight: 32 });
    }

    // Cria os elementos do jogo
    create() {
        // Adiciona sons à cena
        this.passos = this.sound.add("passos", { loop: true }).setVolume(0.7);
        this.oceano = this.sound.add("oceano", { loop: true }).setVolume(0.1);
        this.oceano.play();

        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        // Cria o mapa e os elementos do jogo
        this.criarMapa();
        this.criarPersonagem();
        this.criarNpc();
        this.criarNpc2();
        this.control.create();

        // Cria elementos interativos para diálogos
        this.tecla_E = this.add.sprite(this.tyler.x + 90, this.tyler.y - 50, "tecla_e").setOrigin(0.5, 0.5).setVisible(false).setScale(2);
        this.donoLoja.setInteractive(); // Torna o NPC interativo
        this.donoLoja.on('pointerdown', () => {
            this.caixaDialogo.setVisible(true);
            this.textoLoja.setVisible(true);
            Texto.showTextLetterByLetter(this, falas[i], this.textoLoja);
            i++;
            if (i === falas.length) {
                i = 0;
            }
        });

        // Evento para o segundo NPC
        this.npc2.setInteractive(); // Torna o segundo NPC interativo
        this.npc2.on('pointerdown', () => {
            this.caixaDialogo.setVisible(true);
            this.textoNpc.setVisible(true);
            Texto.showTextLetterByLetter(this, falasNpc[i], this.textoNpc);
            i++;
            if (i === falasNpc.length) {
                i = 0;
            }
        });

        // Elementos visuais para diálogos
        this.caixaDialogo = this.add.image(350, 600, "caixaDialogo").setScale(0.4)
        this.caixaDialogo.setVisible(false)
        this.textoLoja = this.add.text(this.donoLoja.x + 80, this.donoLoja.y + 80, '', { fontFamily: 'Arial', fontSize: 12, color: 'black' }).setOrigin(0.5);
        this.textoNpc = this.add.text(this.npc2.x + 80, this.npc2.y + 80, '', { fontFamily: 'Arial', fontSize: 10, color: 'black' }).setOrigin(0.5);

        // Elementos visuais para sinalização de interação
        this.tecla_sinalizcao = this.add.sprite(this.donoLoja.x, this.donoLoja.y - 50, "tecla_sinalizacao").setOrigin(0.5, 0.5).setVisible(true).setScale(2);
        this.tecla_sinalizcao2 = this.add.sprite(this.npc2.x, this.npc2.y - 50, "tecla_sinalizacao").setOrigin(0.5, 0.5).setVisible(true).setScale(2);
    }

    // Cria o mapa da cena
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

    // Cria o personagem principal
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
            this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler_armor', 1.2);  // Criação do jogador em uma posição específica
            this.control = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }
        if (mudarCena === 1) {
            this.tyler = new Player(this, spawnPointVolta.x, spawnPointVolta.y, 'tyler_armor', 1.2);  // Criação do jogador em outra posição
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

    // Cria o NPC
    criarNpc() {
        // Configuração inicial do NPC
        const spawnPointNpc = this.map.findObject(
            "npc",
            (objects) => objects.name === "spawning point npc"
        );

        // Criação do NPC 
        this.donoLoja = this.physics.add.sprite(spawnPointNpc.x, spawnPointNpc.y, "donoLoja", 1).setScale(1.2)
    }

    // Cria o segundo NPC
    criarNpc2() {
        // Configuração inicial do NPC
        const spawnPointNpc = this.map.findObject(
            "npc2",
            (objects) => objects.name === "spawning point npc2"
        );

        // Criação do NPC
        this.npc2 = this.physics.add.sprite(spawnPointNpc.x, spawnPointNpc.y, "npcVitiligo", 1).setScale(1.2);
    }

    // Atualiza o jogo a cada quadro
    update() {
        // Define a posição dos elementos visuais
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
        this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 55);
        this.textoLoja.setPosition(this.tyler.x, this.tyler.y + 55);
        this.textoNpc.setPosition(this.tyler.x, this.tyler.y + 55);

        // Reproduz o som dos passos
        if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) && !this.passos.isPlaying) {
            this.passos.play(); 
            this.tecla_E.setVisible(false);
            this.caixaDialogo.setVisible(false)
            this.textoNpc.setVisible(false)
            this.textoLoja.setVisible(false)
        } else if (this.tyler.body.velocity.x === 0 && this.tyler.body.velocity.y === 0 && this.passos.isPlaying) {
            this.passos.stop(); 
        }
        
        // Atualiza os controles do jogador
        this.control.update();

        // Verifica se o jogador atingiu a posição de transição de cena
        if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transitionToScene1("cena_corredor")
            mudarCena = 1;
        }

        // Verifica se o jogador atingiu a posição de retorno à cena anterior
        if (this.voltar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transitionToScene1("cena_floresta");
            mudarCena = 0;
        }

        // Verifica interação com o NPC dono da loja
        const overlapping = this.physics.overlap(this.tyler, this.donoLoja);
        if (overlapping) {
            this.tecla_E.setVisible(true);

            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.control.interacao)) {
                this.caixaDialogo.setVisible(true)
                this.textoLoja.setVisible(true)
                Texto.showTextLetterByLetter(this, falas[i], this.textoLoja);
                i++
                if (i === falas.length) {
                    i = 0;
                }
            }
        }
        else {
            this.tecla_E.setVisible(false);
        }

        // Verifica interação com o segundo NPC
        const overlapping2 = this.physics.overlap(this.tyler, this.npc2);
        if (overlapping2) {
            this.tecla_E.setVisible(true);

            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.control.interacao)) {
                this.caixaDialogo.setVisible(true)
                this.textoNpc.setVisible(true)
                Texto.showTextLetterByLetter(this, falasNpc[i], this.textoNpc);
                i++
                if (i === falas.length) {
                    i = 0;
                }
            }
        }
    }

    // Método para transição para a cena 
    transitionToScene1(cena) {
        this.passos.stop();
        this.oceano.stop();
        this.scene.start(cena); 
    }
}
