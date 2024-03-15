// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js';          // Importa o módulo de texto

var i = 0
var falas = ["Tyler, você chegou! Que maraviha!", " Lhe chamei aqui pois preciso de sua ajuda...", 
"Um grande mal que trará muita dor e destruição\nse aproxima do reino..", "Por isso preciso de ajuda para criar\nalianças com exércitos das terras próximas. ",
"É muito importante que, idependente do\nexército que lute ao nosso lado,\nele esteja de acordo com os principios deste reino.", 
"Assim, não podemos lutar junto a generais que\nescravizem ou usem a força para subjulgar outros\nreinos e povoados.", "Precisamos de aliados capazes de respeitar direitos\nbásicos de todos os seres inocentes que achemos\npelo caminho.", 
"Também não podemos manter relações com tropas\nque destruam as florestas e bosques da região", 
"Também temo que o inimigo saiba que nos\n preparamos para enfrentá-lo", "por isso peço que envie um pacto de silêncio\na todos os exércitos que você entre em contato.", 
"Assim podemos nos proteger e proteger essas\ninformações tão cruciais para a batalha\n que teremos.", "Agora vá, escreva uma carta para os \ngenerais dos exércitos mais fortes da região.", "Escolha as melhores perguntas\n e não se esqueça dos valores do nosso reino...", " "]
var falas2 = ["Obrigado, Tyler!", "Pedirei que sejam feitas cópias desta\ncarta e as enviarei para os generais da região.", "Venha amanhã para analisar\no que obtivermos de resposta. ", " "]

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
        this.load.image('caixaDialogo', './assets/caixaDialogo.png');
        this.load.spritesheet("rei", "./assets/sprites_personagens/assets_rei/rei.png", { frameWidth: 32, frameHeight: 32 });
        //this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("tecla_e", "./assets/tecla_e_pixel.png");
        this.load.audio("musicaRei", "./assets/audios/entrance.mp3")
        //this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create() {

        this.passosConcreto = this.sound.add("passosConcreto", { loop: true }).setVolume(0.7);
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.criarPersonagem();
        this.caixaDialogo = this.add.image(this.tyler.x, this.tyler.y + 40, "caixaDialogo").setScale(0.6)
        this.caixaDialogo.setVisible(false)
        this.controls.create();
        this.criarNpc();
        this.tecla_E = this.add.sprite(this.tyler.x, this.tyler.y - 40, "tecla_e").setOrigin(0.5, 0.5).setVisible(false).setScale(2);
        this.rei.setInteractive();
        this.rei.on('pointerup', () => {
            // Iniciar a cena principal quando o botão "play" é clicado
            if(mudarCena == 0){
            this.caixaDialogo.setVisible(true)
            this.textoRei.setVisible(true)
            Texto.showTextLetterByLetter(this, falas[i], this.textoRei);
            i++
            if (i === falas.length) {
                this.transitionToScene2("minigame1")
                i = 0;
                mudarCena = 1
            }
        }
        else {
            this.caixaDialogo.setVisible(true)
            this.textoRei.setVisible(true)
            Texto.showTextLetterByLetter(this, falas2[i], this.textoRei);
            i++
            if (i === falas2.length) {
                this.transitionToScene2("minigame2")
                i = 0;
            }
        }
        });
        
        
        this.tecla_sinalizcao = this.add.sprite(this.rei.x, this.rei.y - 50, "tecla_sinalizacao").setOrigin(0.5, 0.5).setVisible(true).setScale(2);
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

        const spawnPointVolta = this.map.findObject(
            "voltar",
            (objects) => objects.name === "spawning point voltar"
        );

        if (mudarCena === 0) {
            this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler', 1.2);  // Criação do jogador em uma posição específica
            this.controls = new Controls(this, this.tyler);   // Criação dos controles associados ao jogador
        }
        if (mudarCena === 1) {
            this.tyler = new Player(this, spawnPointVolta.x, spawnPointVolta.y, 'tyler', 1.2);  // Criação do jogador em outra posição
            this.controls = new Controls(this, this.tyler);    // Criação dos controles associados ao jogador
        }

        // Cria o jogador, câmera e controles

        this.camera = new Camera(this, this.tyler, this.map);
        this.camera.createZoom_1()
        

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
        this.textoRei = this.add.text(this.tyler.x + 80, this.tyler.y + 80, '', { fontFamily: 'Arial', fontSize: 10, color: 'black' }).setOrigin(0.5);
    }

    update() {
        this.controls.update();
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
        this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 110);
        this.textoRei.setPosition(this.tyler.x, this.tyler.y + 110);
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
            if(mudarCena === 0){
            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
                this.caixaDialogo.setVisible(true)
                Texto.showTextLetterByLetter(this, falas[i], this.textoRei);
                i++
                if (i === falas.length) {
                    i = 0
                    mudarCena = 1
                    this.transitionToScene2("minigame1")
                }
            }
    }
    else{
    if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
        this.caixaDialogo.setVisible(true)
        Texto.showTextLetterByLetter(this, falas2[i], this.textoRei);
        i++
        if (i === falas2.length) {
            this.transitionToScene2("minigame2")
        }
    }
    }
    }
    else {
        this.tecla_E.setVisible(false);
    }

        if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transitionToScene2("cena_escriba")
            mudarCena = 1;
        }

        if (this.voltar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transitionToScene2("cena_corredor");
            mudarCena = 0;
        }
    }

    transitionToScene2(cena) {
        this.scene.start(cena); // Inicia a cena 1
        this.passosConcreto.stop()
    }
}