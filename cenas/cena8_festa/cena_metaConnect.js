// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../player/dialogos.js';

//Criando variáveis da cena
var mudarCena = 0;

export default class Festa extends Phaser.Scene {
	constructor() {
		super({
			key: 'cena_festa',
		});

		this.textoEmAndamento = false;
		this.falas = 0;
		this.falas2 = 0
	}

	preload() {
		this.load.tilemapTiledJSON(
			'map_festa',
			'./assets/mapas/mapa_metaConnect/metaConnect.json'
		);
		this.load.image(
            'objetos_assets',
            './assets/mapas/mapa_metaConnect/objetos.png'
        );
		this.load.image(
			'samplemap_assets',
			'./assets/mapas/mapa_metaConnect/samplemap.png'
		);
		this.load.spritesheet(
			'npc1',
			'./assets/sprites_personagens/assets_npc1/npc1.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

        this.load.spritesheet(
			'rei',
			'./assets/sprites_personagens/assets_rei/rei.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

        this.load.spritesheet(
            'donoLoja',
            './assets/sprites_personagens/assets_donoLoja/donoloja1.png',
            { frameWidth: 32, frameHeight: 32 }
        );
	}

	create() {
		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.criarMapa();
		this.criarPersonagem();
        this.criarNpc();
		this.controls.create();

		this.caixaDialogo = this.add
			.image(this.tyler.x, this.tyler.y + 50, 'caixaDialogo')
			.setScale(0.5);
		this.caixaDialogo.setVisible(false);

		this.textoNpc = this.add
			.text(this.tyler.x, this.tyler.y + 50, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
			})
			.setOrigin(0.5);

		this.textoCaixa = this.add
			.text(this.tyler.x, this.tyler.y + 50, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
			})
			.setOrigin(0.5);
		
		this.tecla_E = this.add
			.sprite(this.tyler.x, this.tyler.y - 40, 'tecla_e')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
			.setScale(2);
		this.tecla_E.setInteractive();
		this.tecla_E.on('pointerup', () => {
			this.caixaDialogo.setVisible(true);
			this.textoCaixa.setVisible(true);
			// Iniciar a cena principal quando o botão "play" é clicado
			Texto.letraPorLetra(this, falas[falas], this.textoCaixa);
			falas++;
			if (falas === falas.length) {
				falas = 0;
			}
		});
		
	}

	mostrarProximoDialogo() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_cena_metaConnect_rei']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.falas < falas.length) {
			Texto.letraPorLetra(this, falas[this.falas], this.textoNpc);
			this.falas++; // Incrementa o índice para o próximo diálogo
		}
        else if(this.falas === falas.length){
            this.fazerTransicaoDiaSeguinte()
            this.scene.start('cena_castelo')
        }
	}

	mostrarProximoDialogo2() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_cena_metaConnect_donoLoja']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.falas2 < falas.length) {
			Texto.letraPorLetra(this, falas[this.falas2], this.textoNpc);
			this.falas2++; // Incrementa o índice para o próximo diálogo
		}
	}

    fazerTransicaoDiaSeguinte() {
		// Escurece a tela
		this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
			if (progress === 1) {
				// Após o desvanecimento completo, mostra o texto "1 dia depois"
				let textoDiaDepois = this.add.text(this.tyler.body.x, this.tyler.body.y, '1 dia depois', {
					fontFamily: 'Arial',
					fontSize: '32px',
					color: '#FFFFFF'
				}).setOrigin(0.5);

				// Configura o tempo para remover o texto e restaurar a visão da cena após 2 segundos
				this.time.delayedCall(2000, () => {
					// Remove o texto
					textoDiaDepois.destroy();
					this.scene.restart();
					// Restaura a visão da cena
					this.cameras.main.fadeIn(1000, 0, 0, 0);
				});
			}
		});
	}

	criarMapa() {
		this.map = this.make.tilemap({ key: 'map_festa' });

		this.objectTiles = this.map.addTilesetImage(
			'samplemap',
			'samplemap_assets'
		);
		this.assetsObject = this.map.addTilesetImage(
			'objetos',
			'objetos_assets'
		);

		this.groundFesta = this.map.createLayer('ground', this.assetsObject, 0, 0);
		this.ponteFesta = this.map.createLayer('ponte', this.objectTiles, 0, 0);
        this.chaoFesta= this.map.createLayer('chao', this.assetsObject, 0, 0);
        this.decoracaoFesta = this.map.createLayer('decoracao', this.assetsObject, 0, 0);
        this.estatuasFesta = this.map.createLayer('estatuas', this.assetsObject, 0, 0);
        this.tendasFesta = this.map.createLayer('tendas', this.assetsObject, 0, 0);
        this.objetosFesta = this.map.createLayer('objetos', this.assetsObject, 0, 0);
        this.comidasFesta = this.map.createLayer('comidas', this.assetsObject, 0, 0);

        this.ponteFesta.setCollisionByProperty({collider: true})
        this.tendasFesta.setCollisionByProperty({collider: true})
        this.objetosFesta.setCollisionByProperty({collider: true})
        this.decoracaoFesta.setCollisionByProperty({collider: true})
        this.estatuasFesta.setCollisionByProperty({collider: true})

        this.objetosFesta.setDepth(1)
        this.comidasFesta.setDepth(1)
	}

	criarPersonagem() {
		// Encontra o ponto de spawn do jogador no mapa
		const spawnPoint = this.map.findObject(
			'player',
			(objects) => objects.name === 'spawning point player'
		);

		

		if (mudarCena === 0) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			);
			this.controls = new Controls(this, this.tyler);
		}

		// Cria o jogador, câmera e controles

		this.camera = new Camera(this, this.tyler, this.map);
		this.camera.createZoom_1();

		// Adiciona colisor entre o jogador e o chão
		this.physics.add.collider(this.tyler, this.ponteFesta);
		this.physics.add.collider(this.tyler, this.tendasFesta);
		this.physics.add.collider(this.tyler, this.objetosFesta);
        this.physics.add.collider(this.tyler, this.decoracaoFesta);
        this.physics.add.collider(this.tyler, this.estatuasFesta);

		// Cria as animações utilizando o Animacao
		Animacao.TylerArmorcreateAnimations(this);
	}
	criarNpc() {
		// Configuração inicial do NPC
		const spawnPointRei = this.map.findObject(
			'rei',
			(objects) => objects.name === 'spawning point rei'
		);

        const spawnPointLoja = this.map.findObject(
			'donoLoja',
			(objects) => objects.name === 'spawning point donoLoja'
		);

		// Criação do NPC
		this.reiFesta = this.physics.add
			.sprite(spawnPointRei.x, spawnPointRei.y, 'rei')
			.setScale(1.2).setSize(50, 60);

        this.lojaFesta = this.physics.add
			.sprite(spawnPointLoja.x, spawnPointLoja.y, 'donoLoja')
			.setScale(1.2).setSize(50, 60);
	}

	update() {
		this.controls.update();
		this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
		this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 50);
		this.textoNpc.setPosition(this.tyler.x, this.tyler.y + 50);

		if (
			(this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) 

		) {
			this.caixaDialogo.setVisible(false);
			this.textoCaixa.setVisible(false);
			this.tecla_E.setVisible(false);
			this.textoNpc.setVisible(false);
		} else if (
			this.tyler.body.velocity.x === 0 &&
			this.tyler.body.velocity.y === 0 
		) {
			
		}

		const overlapping = this.physics.overlap(this.tyler, this.reiFesta);

		if (overlapping) {
			this.tecla_E.setVisible(true);
			this.tecla_E.disableInteractive();

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.caixaDialogo.setVisible(true);
				this.textoNpc.setVisible(true);
				this.mostrarProximoDialogo()
			}
            
		}else{
            this.tecla_E.setVisible(false);
        }

        const overlapping2 = this.physics.overlap(this.tyler, this.lojaFesta);

		if (overlapping2) {
			this.tecla_E.setVisible(true);
			this.tecla_E.disableInteractive();

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.caixaDialogo.setVisible(true);
				this.textoNpc.setVisible(true);
				this.mostrarProximoDialogo2()
			}
		}
	}

	transitionToScene2(cena) {
		//this.entrada.stop();
		this.scene.start(cena); // Inicia a cena 1
		this.passosConcreto.stop();
		this.musicaRei.stop();
	}
}
