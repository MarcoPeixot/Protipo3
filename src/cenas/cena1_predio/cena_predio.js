// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js';          // Importa o módulo de texto



var falas = ["Olá, seja bem-vindo ao nosso jogo. \nEntre no prédio para  \ncontratar fornecedores! \nPara começar entre no prédio. "];

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({
            key: "cena_predio"
        })
    }

    preload() {
        
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

        this.tecla_E = this.add.sprite(this.tyler.x + 90, this.tyler.y - 50, "movimentacao").setOrigin(0.5, 0.5).setVisible(true).setScale(2);

        this.caixaDialogo = this.add.image(this.tyler.body.x + 30, this.tyler.body.y + 120, "caixaDialogo").setScale(0.9)
        this.caixaDialogo.setVisible(true);
        this.caixaDialogo.setDepth(1)

        this.textoInicio = this.add.text(this.tyler.x - 150, this.tyler.y + 70, { fontFamily: 'Arial', fontSize: 12, color: 'black' })
        this.textoInicio.setDepth(1);
        Texto.showTextLetterByLetter(this, falas[0], this.textoInicio)

        this.tyler.setDepth(2);

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

        //this.carros.setDepth(10);
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
        //this.caixaDialogo.setPosition(this.tyler.body.x + 30, this.tyler.body.y + 120);
        //this.textoInicio.setPosition(this.tyler.x - 150, this.tyler.y + 70);
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