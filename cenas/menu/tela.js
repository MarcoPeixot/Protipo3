export default class Tela extends Phaser.Scene {
	constructor() {
		super({
			key: 'Tela',
		});
	}

	preload() {
		// Carrega os recursos necessários
		this.load.image('tela', 'assets/elementosJogo/tela_inicial_2.png');
		this.load.image('play', 'assets/elementosJogo/play_btn.png');
		this.load.image('brasil', 'assets/elementosJogo/brasil.jpg');
		this.load.image('credits', 'assets/elementosJogo/Credits.png');
		this.load.image('EUA', 'assets/elementosJogo/EUA.png');

		//Carregando recursos para todas as cenas
		this.load.image('tecla_e', './assets/elementosJogo/tecla_e_pixel.png');
		this.load.image('etapas', './assets/elementosJogo/etapas.png');
		this.load.image(
			'tecla_sinalizacao',
			'./assets/elementosJogo/tecla_sinalizacao.png'
		);
		this.load.image('caixaDialogo', './assets/elementosJogo/caixaDialogo.png');
		this.load.plugin(
			'rexvirtualjoystickplugin',
			'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js',
			true
		);
		this.load.spritesheet(
			'tyler_armor',
			'./assets/sprites_personagens/assets_tyler/tyler_armor.png',
			{ frameWidth: 32, frameHeight: 32 }
		);
		this.load.spritesheet(
			'vanessa',
			'./assets/sprites_personagens/assets_vanessa/vanessa_lado.png',
			{ frameWidth: 32, frameHeight: 32 }
		);
		this.load.spritesheet(
			'tyler_normal',
			'./assets/sprites_personagens/assets_tyler/novo_persona.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//Carregando recursos da cena predio
		this.load.image('tile_predio', './assets/mapas/predio/Tileset_3_MV.png');
		this.load.image('tile_calcada', './assets/mapas/predio/Tileset_10_MV.png');
		this.load.image('tile_arvores', './assets/mapas/predio/Tileset_21_MV.png');
		this.load.image('tile_estrada', './assets/mapas/predio/Tileset_16_MV.png');
		this.load.image('tile_cars', './assets/mapas/predio/Tileset_Cars_MV.png');
		this.load.image('tile_plantas', './assets/mapas/predio/Tileset_8_MV.png');
		this.load.image('tile_hotdog', './assets/mapas/predio/Tileset_31_MV.png');
		this.load.tilemapTiledJSON(
			'map_predio',
			'./assets/mapas/predio/map_meta.json'
		);
		this.load.audio('passosConcreto', './assets/audios/concreteFootsteps.mp3');
		this.load.audio('predioAudio', './assets/audios/Metro.mp3');
		this.load.audio('entrada', './assets/audios/entrance.mp3');
		this.load.audio('passos', './assets/audios/footstep.mp3');
		this.load.audio('passaros', './assets/audios/birds.mp3');
		this.load.audio('oceano', './assets/audios/ocean.mp3');
		this.load.audio('musicaRei', './assets/audios/entrance.mp3');
		this.load.image('movimentacao', './assets/elementosJogo/teclas_movimentacao.png');
	}

	create() {
		this.registry.set('mudarCenaEscriba', 1);
		this.registry.set('idioma', 'en');
		this.registry.set('mudarCenaCastelo', 0)
		// Tamanho fixo da tela
		const screenWidth = 1280;
		const screenHeight = 720;

		// Cria o mapa e as camadas
		const background = this.add
			.image(screenWidth / 2, screenHeight / 2, 'tela')
			.setScale(12);

		// Adiciona os botões verticalmente
		const buttonSpacing = 20; // Espaçamento entre os botões
		const buttonScale = 0.7; // Escala dos botões

		const play = this.add
			.image(screenWidth / 2, screenHeight / 2, 'play')
			.setOrigin(0.5)
			.setScale(buttonScale * 2);
		const brasil = this.add
			.image(
				screenWidth / 1.63,
				play.y + play.height * play.scaleY + buttonSpacing * 4,
				'brasil'
			)
			.setOrigin(0.5)
			.setScale(buttonScale / 4);
		const credits = this.add
			.image(
				screenWidth / 2.85,
				play.y + play.height * play.scaleY + buttonSpacing * 4,
				'credits'
			)
			.setOrigin(0.5)
			.setScale(buttonScale);
		const EUA = this.add
			.image(
				screenWidth / 1.4,
				play.y + play.height * play.scaleY + buttonSpacing * 4,
				'EUA'
			)
			.setOrigin(0.5)
			.setScale(buttonScale / 6);

		// Habilitar interatividade e adicionar evento de clique ao botão "play"
		play.setInteractive();
		play.on('pointerdown', () => {
			// Iniciar a cena principal quando o botão "play" é clicado
			this.scene.start('minigame3');
		});

		// Adicionar eventos de hover
		play.on('pointerover', () => {
			play.setScale(1.6);
		});

		play.on('pointerout', () => {
			play.setScale(buttonScale * 2);
		});

		brasil.setInteractive();
		brasil.on('pointerover', () => {
			
		});

		brasil.on('pointerout', () => {
			
		});

		credits.setInteractive();
		credits.on('pointerover', () => {
			credits.setScale(0.8);
		});

		credits.on('pointerout', () => {
			credits.setScale(buttonScale);
		});

		EUA.setInteractive();
		EUA.on('pointerover', () => {
			
		});

		EUA.on('pointerout', () => {
			
		});

		brasil.setInteractive();
        brasil.on('pointerdown', () => {
            // Definir o idioma como Português (Brasil)
            this.registry.set('idioma', 'pt');
			brasil.setScale(buttonScale / 2.5);
			EUA.setScale(buttonScale / 6);
        });

        EUA.setInteractive();
        EUA.on('pointerdown', () => {
            // Definir o idioma como Inglês (EUA)
            this.registry.set('idioma', 'en');
			brasil.setScale(buttonScale / 4);
			EUA.setScale(buttonScale / 4.3);
        });
	}
}
