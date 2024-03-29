// Importa os módulos necessários
import Animacoes from '../../player/animation.js'; // Importa o módulo de animações
import Player from '../../player/player.js'; // Importa o módulo do jogador
import Camera from '../../player/camera.js'; // Importa o módulo da câmera
import Controls from '../../player/controles.js'; // Importa o módulo de controles
import Texto from '../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../player/dialogos.js';
// Variável global para controlar a mudança de cena
var mudarCena = 0; // Inicialmente a cena a ser carregada é a cena da floresta


// Classe representando a cena principal
export default class Floresta extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena_exterior', // Chave da cena
        });

        this.textoEmAndamento = false;
		this.falas1 = 0;
        this.falas2 = 0
        this.falas3 = 0;
    }

    // Pré-carregamento de recursos
    preload() {
        // Carrega os novos assets da floresta
        this.load.image(
            'tiles_grass',
            './assets/mapas/mapa_fora_castelo/grass.png'
        );
        this.load.image(
            'tiles_water',
            './assets/mapas/mapa_fora_castelo/water.png'
        );
        this.load.image(
            'tiles_objetos',
            './assets/mapas/mapa_fora_castelo/objetos.png'
        );
        this.load.image(
            'tiles_samplemap',
            './assets/mapas/mapa_fora_castelo/samplemap.png'
        );
        this.load.tilemapTiledJSON(
            'map_exterior2',
            './assets/mapas/mapa_fora_castelo/fora_castelo.json'
        );
        this.load.spritesheet(
            'npc1',
            './assets/sprites_personagens/assets_npc2/npccastelo2.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet(
            'donoLoja',
            './assets/sprites_personagens/assets_donoLoja/donoloja1.png',
            { frameWidth: 32, frameHeight: 32 }
        );
    }

    // Criação dos elementos da cena
    create() {
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // Inicializa a cena
        this.criarMapa(); // Configuração e criação do mapa
        this.criarPersonagem(); // Criação do jogador e controles
        this.criarNpcs();
        this.controls.create(); // Criação dos controles para o jogador

        // Criação do elemento interativo "E" e configuração de diálogos
        this.tecla_E = this.add
            .sprite(this.tyler.x, this.tyler.y - 40, 'tecla_e')
            .setOrigin(0.5, 0.5)
            .setVisible(false)
            .setScale(2);
        this.tecla_E.setInteractive(); // Torna o elemento interativo
        this.tecla_E.on('pointerup', () => {
            this.caixaDialogo.setVisible(true);
            this.texto.setVisible(true);
            // Iniciar o diálogo quando o botão "E" é clicado
            Texto.letraPorLetra(this, falas[falas1], this.texto);
            falas1++;
            if (falas1 === falas.length) {
                falas1 = 0; // Reinicia o índice das falas
            }
        });

        this.tecla_sinalizcao3 = this.add
			.sprite(128, 265, 'tecla_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(3);
        
            this.tecla_sinalizcao3.setDepth(10)

        // Adição de sons à cena
        this.passos = this.sound.add('passos', { loop: true }).setVolume(0.5);
        this.passaros = this.sound.add('passaros', { loop: true }).setVolume(0.2);
        this.passaros.play();

        // Elementos visuais para diálogos
        this.caixaDialogo = this.add
            .image(this.tyler.x, this.tyler.y + 50, 'caixaDialogo')
            .setScale(0.5);
        this.caixaDialogo.setVisible(false);

        this.textoNpc1 = this.add
            .text(this.tyler.x, this.tyler.y + 50, '', {
                fontFamily: 'Arial',
                fontSize: 13,
                color: 'black',
            })
            .setOrigin(0.5);

        this.textoNpc2 = this.add
            .text(this.tyler.x, this.tyler.y + 50, '', {
                fontFamily: 'Arial',
                fontSize: 13,
                color: 'black',
            })
            .setOrigin(0.5);

        this.textoInformacao = this.add
            .text(this.tyler.x, this.tyler.y + 50, '', {
                fontFamily: 'Arial',
                fontSize: 13,
                color: 'black',
            })
            .setOrigin(0.5);
    }

    // Criação do mapa da cena
    criarMapa() {
        // Criação do mapa e das camadas
        this.map = this.make.tilemap({ key: 'map_exterior2' });
        this.tilesetGrass = this.map.addTilesetImage(
            'grass',
            'tiles_grass'
        );
        this.tilesetObj = this.map.addTilesetImage(
            'objetos',
            'tiles_objetos'
        );
        this.tilesetWater = this.map.addTilesetImage(
            'water',
            'tiles_water'
        );
        this.tilesetGround = this.map.addTilesetImage(
            'samplemap',
            'tiles_samplemap'
        );

        this.ground = this.map.createLayer('ground', this.tilesetGrass, 0, 0);
        this.water = this.map.createLayer('water', this.tilesetWater, 0, 0);
        this.arv = this.map.createLayer('arvores', this.tilesetObj, 0, 0);
        this.barr = this.map.createLayer('barraca', this.tilesetObj, 0, 0);
        this.decoracao = this.map.createLayer('decoracoes', this.tilesetObj, 0, 0);
        this.obj = this.map.createLayer('obj', this.tilesetObj, 0, 0);
        this.pontes = this.map.createLayer('pontes', this.tilesetObj, 0, 0);
        this.informacao = this.map.createLayer('informacao', this.tilesetObj, 0,0);
        this.passar = this.map.createLayer('passar', this.tilesetObj, 0, 0);
        
        this.water.setCollisionByProperty({collider: true});
        this.decoracao.setCollisionByProperty({collider: true});
        this.obj.setCollisionByProperty({collider: true});
        this.arv.setCollisionByProperty({collider: true});
        this.pontes.setCollisionByProperty({collider: true});
        this.barr.setCollisionByProperty({collider: true});

        this.arv.setDepth(10);
        this.obj.setDepth(10);
        this.ground.setDepth(-1)
        
    }

    mostrarProximoDialogoNpc1() {
        const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
    
        const falas = dialogs[idioma]['dialogo_cena_exterior_npc1']; // Carregue as falas de acordo com o idioma
        if (!this.textoEmAndamento && this.falas1 < falas.length) {
            Texto.letraPorLetra(this, falas[this.falas1], this.textoNpc1);
            this.falas1++; // Incrementa o índice para o próximo diálogo
        } 
        console.log("texto passando")
    }

    mostrarProximoDialogoNpc2() {
        const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
    
        const falas = dialogs[idioma]['dialogo_cena_exterior_npc2']; // Carregue as falas de acordo com o idioma
        if (!this.textoEmAndamento && this.falas2 < falas.length) {
            Texto.letraPorLetra(this, falas[this.falas2], this.textoNpc2);
            this.falas2++; // Incrementa o índice para o próximo diálogo
        } 
    }

    mostrarProximoDialogoNpcInformacao() {
        const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
    
        const falas = dialogs[idioma]['dialogo_cena_exterior_informacao']; // Carregue as falas de acordo com o idioma
        if (!this.textoEmAndamento && this.falas3 < falas.length) {
            Texto.letraPorLetra(this, falas[this.falas3], this.textoInformacao);
            this.falas3++; // Incrementa o índice para o próximo diálogo
        } 
    }

    // Criação do personagem principal
    criarPersonagem() {
        const spawnPoint = this.map.findObject(
            'player',
            (objects) => objects.name === 'spawning point player'
        );

        const spawnPointVoltar = this.map.findObject(
            'voltar',
            (objects) => objects.name === 'spawning point voltar'
        );

        // Criação do jogador e controles associados
        if (mudarCena === 0) {
            this.tyler = new Player(
                this,
                spawnPoint.x,
                spawnPoint.y,
                'tyler_armor',
                1.2
            ); // Criação do jogador em uma posição específica
            this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
        }
        if (mudarCena === 1) {
            this.tyler = new Player(this, spawnPointVoltar.x,
                spawnPointVoltar.y, 'tyler_armor', 1.2); // Criação do jogador em outra posição
            this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
        }

        // Configuração de colisões do jogador com elementos do mapa
        this.physics.add.collider(this.tyler, this.water);
        this.physics.add.collider(this.tyler, this.decoracao);
        this.physics.add.collider(this.tyler, this.obj);
        this.physics.add.collider(this.tyler, this.arv);
        this.physics.add.collider(this.tyler, this.pontes);
        this.physics.add.collider(this.tyler, this.barr);
        // Inicialização das animações do jogador
        Animacoes.TylerArmorcreateAnimations(this);

        // Criação da câmera seguindo o jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);
        this.playerCamera.createZoom_1();
        this.playerCamera.createMiniMap();

        
    }

    // Cria o NPC
    criarNpcs() {
        // Configuração inicial do NPC
        const spawnPointNpc = this.map.findObject(
            'npc1',
            (objects) => objects.name === 'spawning point npc'
        );

        // Criação do NPC
        this.npc1 = this.physics.add
            .sprite(spawnPointNpc.x, spawnPointNpc.y, 'npc1', 10)
            .setScale(1.2)
            .setSize(50, 60).setDepth(1);
            

        // Configuração inicial do NPC
        const spawnPointNpc2 = this.map.findObject(
            'npc2',
            (objects) => objects.name === 'spawning point npc2'
        );

        // Criação do NPC
        this.donoLoja = this.physics.add
            .sprite(spawnPointNpc2.x, spawnPointNpc2.y, 'donoLoja', 1)
            .setScale(1.2)
            .setSize(50, 60).setDepth(-1);
    }

    // Atualização da cena a cada quadro
    update() {
        this.controls.update(); // Atualiza os controles do jogador
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
        this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 50);
        this.textoNpc1.setPosition(this.tyler.x, this.tyler.y + 50);
        this.textoNpc2.setPosition(this.tyler.x, this.tyler.y + 50);
        this.textoInformacao.setPosition(this.tyler.x, this.tyler.y + 50);

        // Reprodução dos sons de passos
        if (
            (this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) &&
            !this.passos.isPlaying
        ) {
            this.passos.play();
            this.tecla_E.setVisible(false);
            this.caixaDialogo.setVisible(false);
            this.textoNpc1.setVisible(false);
            this.textoNpc2.setVisible(false);
            this.textoInformacao.setVisible(false);
        } else if (
            this.tyler.body.velocity.x === 0 &&
            this.tyler.body.velocity.y === 0 &&
            this.passos.isPlaying
        ) {
            this.passos.stop();
        }

        // Verificação de interação com elementos do mapa
        if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
            this.transicaoCena2('cena_corredor');
            mudarCena = 1; // Atualiza a variável global para mudar a cena
        }

        // Verifica interação com o NPC dono da loja
		const overlapping = this.physics.overlap(this.tyler, this.donoLoja);
		if (overlapping) {
			this.tecla_E.setVisible(true);

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.caixaDialogo.setVisible(true);
				this.textoNpc1.setVisible(true);
				this.mostrarProximoDialogoNpc1()
			}
		} else {
			this.tecla_E.setVisible(false);
		}

		// Verifica interação com o segundo NPC
		const overlapping2 = this.physics.overlap(this.tyler, this.npc1);
		if (overlapping2) {
			this.tecla_E.setVisible(true);

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.caixaDialogo.setVisible(true);
				this.textoNpc2.setVisible(true);
				this.mostrarProximoDialogoNpc2()
			}
		}

        if (
            this.informacao.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)
        ) {
            this.tecla_E.setVisible(true);

            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
                this.caixaDialogo.setVisible(true);
                this.textoInformacao.setVisible(true);
                this.mostrarProximoDialogoNpcInformacao()
            }
        } 
    }

    // Função para transição para outra cena
    transicaoCena2(cena) {
        this.passos.stop();
        this.passaros.stop();
        this.scene.start(cena); // Inicia a transição para a próxima cena
    }
}
