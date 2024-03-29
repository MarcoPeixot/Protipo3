// Importa os módulos necessários
import Animacao from '../../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../../player/player.js'; // Importa a classe Player
import Camera from '../../../player/camera.js'; // Importa a classe Camera
import Controls from '../../../player/controles.js'; // Importa a classe Controls
import Texto from '../../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../../player/dialogos.js'; // Importa a classe dialogs
import pergunt from '../minigame1/perguntas.js'; // Importa a classe pergunt

//Inicia a classe Scene3, ou a cena da sala do rei
export default class Minigame3 extends Phaser.Scene {
	constructor() {
		super({
			key: 'minigame3'
		});
		//Define se o texto está em andamento antes de começar o próximo
		this.textoEmAndamento = false;
		//Define a posição do dialogo na lista de falas para controlar quando cada uma aparecerá
		this.posicaoDialogo = 0
	}

	//Carrega os arquivos necessários
	preload() {
		//carrega o mapa do Tiled
		this.load.tilemapTiledJSON(
			'map_castle_minigame3',
			'./assets/mapas/castelo/sala_rei_minigame3.JSON'
		);
		//carrega o png do castelo
		this.load.image('tile_castelo', './assets/mapas/castelo/salarei.png');
		//carrega a caixa diálogo
		this.load.image('caixaDialogo', './assets/caixaDialogo.png');
		//carrega o sprite do rei
		this.load.spritesheet(
			'rei',
			'./assets/sprites_personagens/assets_rei/rei.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega o sprite do Gizmo
		this.load.spritesheet(
			'gizmoPersonagem',
			'./assets/sprites_personagens/Gizmo.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega o sprite da Aysla
		this.load.spritesheet(
			'ayslaPersonagem',
			'./assets/sprites_personagens/aysla.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega o sprite do mago
		this.load.spritesheet(
			'mago',
			'./assets/sprites_personagens/mago.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega o sprite da elfa
		this.load.spritesheet(
			'elfa',
			'./assets/sprites_personagens/elfa.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega a imagem de interação da letra E
		this.load.image('tecla_e', './assets/tecla_e_pixel.png');
		//carrega o aúdio de fundo (não implementado ainda)
		this.load.audio('musicaRei', './assets/audios/entrance.mp3');
		//carrega os botões de aceitar ou negociar
		this.load.image('botaoAceitar', 'assets/elementosJogo/botaoAceitar.png'); // Carrega a imagem do botão de aceitar
		this.load.image('botaoNegociar', 'assets/elementosJogo/botaoNegociar.png'); // Carrega a imagem do botão de recusar
	}

	//Cria os arquivos necessários
	create() {
		//O som de passos é iniciado
		const idioma = this.registry.get('idioma');
		this.passosConcreto = this.sound
			.add('passosConcreto', { loop: true })
			.setVolume(0.7);
		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		//Chama as funções que criam o mapa e o personagem
		this.criarMapa();
		this.criarPersonagem();
		//Chama as funções que criam os controles e o npc
		this.controls.create();
		this.criarNpc();
		//Adicione o icone da tecla E e a deixa invisível
		this.tecla_E = this.add
			.sprite(this.tyler.x, this.tyler.y - 40, 'tecla_e')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(2);
		//Torna o rei interativo para ativar os dialogos com o clique

		//Tecla de sinalização do rei
		this.tecla_sinalizcao = this.add
			.sprite(this.rei.x, this.rei.y - 50, 'tecla_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(2);
		this.botaoAceitar = this.add.image(470, 570, 'botaoAceitar').setScale(0.3).setVisible(false);
		this.botaoNegociar = this.add.image(570, 570, 'botaoNegociar').setScale(0.3).setVisible(false);
		//Implementa a caixa de diálogo e a deixa invisivel
		this.caixaDialogo = this.add
			.image(this.tyler.x, this.tyler.y + 40, 'caixaDialogo')
			.setScale(0.6)
			.setVisible(false);

			//implementa a variável que imprime o texto
			this.textoNovo = this.add
			.text(this.tyler.x + 80, this.tyler.y + 80, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
			})
			.setOrigin(0.5);

			//Define a palavra aceitar para o botão, isso mudará a depender do idioma escolhido
			this.dialogoAceitar = this.add.text(
				435, 560,
				pergunt[idioma]['aceitar'],
				{ fontFamily: 'Arial', fontSize: 16, color: 'black', fontStyle: 'bold', align: 'center' }
			)
			//dialogoAceitar se torna invisível		
			this.dialogoAceitar.setVisible(false)

			//Define a palavra negociar para o botão, isso mudará a depender do idioma escolhido
			this.dialogoNegociar = this.add.text(
				528, 560,
				pergunt[idioma]['negociar'],
				{ fontFamily: 'Arial', fontSize: 16, color: 'black', fontStyle: 'bold', align: 'center' }
			)
			//dialogoNegociar se torna invisível	
			this.dialogoNegociar.setVisible(false)
	}

//função responsável por mostrar o diálogo na tela
	mostrarProximoDialogo() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
	
		const falas = dialogs[idioma]['dialogo_minigame3']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.posicaoDialogo < falas.length) { //se o texto estiver em andamento e o número da variável dialogos for menor que o tamanho da lista de falas, ele faz isso:
			Texto.letraPorLetra(this, falas[this.posicaoDialogo], this.textoNovo); //imprime o texto letra por letra
		} 
	}
	

	//Cria o mapa
	criarMapa() {
		this.map = this.make.tilemap({ key: 'map_castle_minigame3' });
		this.tilesetCast = this.map.addTilesetImage('salarei', 'tile_castelo');

		this.ground = this.map.createLayer('ground', this.tilesetCast, 0, 0);
		this.passar = this.map.createLayer('passar_fase', this.tilesetCast, 0, 0);
		this.voltar = this.map.createLayer('voltar_fase', this.tilesetCast, 0, 0);

		this.ground.setCollisionByProperty({ collider: true });
	}

	//Cria os personagens
	criarPersonagem() {

		const spawnPointMinigame = this.map.findObject(
			'spawnMinigame',
			(objects) => objects.name === 'spawning point outra'
		);

			this.tyler = new Player(
				this,
				spawnPointMinigame.x,
				spawnPointMinigame.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em outra posição
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador

		// Cria o jogador, câmera e controles

		this.camera = new Camera(this, this.tyler, this.map);
		this.camera.createZoom_1();

		// Adiciona colisor entre o jogador e o chão
		this.physics.add.collider(this.tyler, this.ground);

		// Cria as animações utilizand  o o Animacao
		Animacao.TylerArmorcreateAnimations(this);
	}
	criarNpc() {
		// Configuração inicial do NPC
		const spawnPointNpc = this.map.findObject(
			'rei',
			(objects) => objects.name === 'spawning point rei'
		);

		// Configuração inicial da Aysla
		const spawnpointAysla = this.map.findObject(
			'aysla',
			(objects) => objects.name === 'spawnpointAysla'
		);

		// Configuração inicial do mago
		const spawnpointMago = this.map.findObject(
			'mago',
			(objects) => objects.name === 'spawnpointMago'
		);

		// Configuração inicial da elfa
		const spawnpointElfa = this.map.findObject(
			'Elfa',
			(objects) => objects.name === 'spawnpointElfa'
		);

		// Configuração inicial do Gizmo
		const spawnpointGizmo = this.map.findObject(
			'gizmo',
			(objects) => objects.name === 'spawnpointGizmo'
		);

		// Criação do NPC rei
		this.rei = this.physics.add
			.sprite(spawnPointNpc.x, spawnPointNpc.y, 'rei')
			.setScale(1.2);

		// Criação do NPC Gizmo
		this.gizmoPersonagem = this.physics.add
		.sprite(spawnpointGizmo.x, spawnpointGizmo.y, 'gizmoPersonagem')
		.setScale(1.2);

		// Criação da NPC Aysla
		this.ayslaPersonagem = this.physics.add
		.sprite(spawnpointAysla.x, spawnpointAysla.y, 'ayslaPersonagem')
		.setScale(1.2);

		// Criação do NPC mago
		this.mago = this.physics.add
		.sprite(spawnpointMago.x, spawnpointMago.y, 'mago')
		.setScale(1.2);

		// Criação da NPC elfa
		this.elfa = this.physics.add
		.sprite(spawnpointElfa.x, spawnpointElfa.y, 'elfa')
		.setScale(1.2);
	}

	//função que controla os dialogos do rei
	dialogoRei(){
		//Torna a caixaDialogo visível
		this.caixaDialogo.setVisible(true)
		//define a posição da caixaDialogo e do texto
		this.caixaDialogo.setPosition(this.rei.x, this.rei.y + 60);
		this.textoNovo.setPosition(this.rei.x, this.rei.y + 60);
		//chama a função que vai mostrar o diálogo
		this.mostrarProximoDialogo()
		console.log(this.posicaoDialogo)
	}
	//função que controla os dialogos do Tyler
	dialogoTyler(){
		//Torna a caixaDialogo visível
		this.caixaDialogo.setVisible(true).setScale(0.6)
		//define a posição da caixaDialogo e do texto
		this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 60);
		this.textoNovo.setPosition(this.tyler.x, this.tyler.y + 60);
		//chama a função que vai mostrar o diálogo
		this.mostrarProximoDialogo()
		console.log(this.posicaoDialogo)
	}
	//função que controla os dialogos de todos ao mesmo tempo
	dialogoTodos(){
		//define a posição da caixaDialogo e do texto
		this.caixaDialogo.setPosition(this.elfa.x, this.elfa.y + 60).setScale(0.5)
		this.textoNovo.setPosition(this.elfa.x, this.elfa.y + 60)
		//chama a função que vai mostrar o diálogo
		this.mostrarProximoDialogo()
		console.log(this.posicaoDialogo)
	}
	//função que controla os dialogos do Gizmo
	dialogoGizmo(passoFrente){
		//determina a posição em que o Gizmo fala pela primeira vez para ele dar um passo a frente
		if(this.posicaoDialogo === 8){
		//movimenta o Gizmo de acordo com o parametro passado
		this.gizmoPersonagem.x += passoFrente
		}
		//define a posição da caixaDialogo e do texto
			this.caixaDialogo.setPosition(this.gizmoPersonagem.x, this.gizmoPersonagem.y + 60).setScale(0.5).setVisible(true)
			this.textoNovo.setPosition(this.gizmoPersonagem.x, this.gizmoPersonagem.y + 60)
			//chama a função que vai mostrar o diálogo
			this.mostrarProximoDialogo()
			console.log(this.posicaoDialogo)
	}
	//função que controla os dialogos da Aysla
	dialogoAysla(passoFrente){
		//determina a posição em que o Gizmo fala pela primeira vez para ele dar um passo a frente
		if(this.posicaoDialogo === 15){
			this.ayslaPersonagem.x += passoFrente
		}
		//define a posição da caixaDialogo e do texto
		this.caixaDialogo.setPosition(this.ayslaPersonagem.x, this.ayslaPersonagem.y + 60).setScale(0.5)
		this.textoNovo.setPosition(this.ayslaPersonagem.x, this.ayslaPersonagem.y + 60)
		//chama a função mostrar dialogo
		this.mostrarProximoDialogo()
	}
	//função que controla os dialogos do Mago
	dialogoMago(passoFrente){
		//determina a posição em que o mago fala pela primeira vez para ele dar um passo a frente
		if(this.posicaoDialogo === 31){
			this.mago.x += passoFrente
		}
		//define a posição da caixaDialogo e do texto
		this.caixaDialogo.setPosition(this.mago.x, this.mago.y + 60).setScale(0.5)
		this.textoNovo.setPosition(this.mago.x, this.mago.y + 60)
		//chama a função mostrar dialogo
		this.mostrarProximoDialogo()
	}

	dialogoElfa(passoFrente){
		//determina a posição em que a elfa fala pela primeira vez para ele dar um passo a frente
		if(this.posicaoDialogo === 38){
		this.elfa.x += passoFrente
		}
		//define a posição da caixaDialogo e do texto
		this.caixaDialogo.setPosition(this.elfa.x, this.elfa.y + 60).setScale(0.5)
		this.textoNovo.setPosition(this.elfa.x, this.elfa.y + 60)
		//chama a função mostrar dialogo
		this.mostrarProximoDialogo()
	}

	//Função chamada quando o jogador precisa negociar valores
	negociar(verificaPosicao){
		//define os assets usados como visíveis
		this.caixaDialogo.setVisible(true)
		this.dialogoNegociar.setVisible(true)
		this.dialogoAceitar.setVisible(true)
		this.botaoAceitar.setVisible(true).setInteractive()
		this.botaoNegociar.setVisible(true).setInteractive()
		//se o botão de aceitar for clicado:
		this.botaoAceitar.on('pointerdown', () => {
			//verifica se a posição do dialogo é a mesma passada pelo parâmetro para não acrescer o posicaoDialogo mais de uma vez
			if(this.posicaoDialogo === verificaPosicao){
				//torna os assets de volta para invisiveis
				this.botaoAceitar.setVisible(false)
				this.botaoNegociar.setVisible(false)
				this.dialogoAceitar.setVisible(false)
				this.dialogoNegociar.setVisible(false)
				//a posicao do dialogo soma um a si mesmo, assim, ele vai para o próximo diálogo
				this.posicaoDialogo += 1
				//verifica se a negociação é da Aysla, se for, quando o personagem apertar aceitar, o dialogo pula para o acordo final
				if(verificaPosicao === 16 || verificaPosicao === 20 || verificaPosicao === 24){
					//posicao de dialogo final
					this.posicaoDialogo = 29
				}
				//verifica se a negociação é do mago, se for, quando o personagem apertar aceitar, o dialogo pula para o acordo final
				if(verificaPosicao === 32){
					//posicao de dialogo final
					this.posicaoDialogo = 36
				}
				//verifica se a negociação é da elfa, se for, quando o personagem apertar aceitar, o dialogo pula para o acordo final
				if(this.posicaoDialogo === 39){
					//posicao de dialogo final
					this.posicaoDialogo = 52
				}
				//verifica se a negociação é da elfa, se for, quando o personagem apertar aceitar, o dialogo pula para o acordo final
				if(verificaPosicao === 47){
					//posicao de dialogo final
					this.posicaoDialogo = 51
				}
				this.dialogoTyler()
				}
			});
			//se o botão negociar for pressionado
				this.botaoNegociar.on('pointerdown', () => {
					//verifica se a posição do dialogo é a mesma passada pelo parâmetro para não acrescer o posicaoDialogo mais de uma vez
					if(this.posicaoDialogo === verificaPosicao){
					//torna os assets de volta para invisiveis
						this.botaoAceitar.setVisible(false)
						this.botaoNegociar.setVisible(false)
						this.dialogoAceitar.setVisible(false)
						this.dialogoNegociar.setVisible(false)
						//posicaoDialogo soma 2, assim, ele vai para o diálogo depois do próximo
						this.posicaoDialogo+=2
						//define se a recusa já aconteceu várias vezes, havendo intervenção do rei
						if(this.posicaoDialogo === 49) {
							//chama a função que controla o diálogo rei
							this.dialogoRei()
							this.dialogoAceitar.setVisible(true)
						}
						//se a recusa ainda não aconteceu várias vezes, o Tyler que vai falar
						else{
							//chama a função que controla o diálogo do Tyler
							this.dialogoTyler()
						}
						//É somado um a posição dialogo para permitir que os diálogos certos sejam chamados
						this.posicaoDialogo+=1
					}
			});
	}
	//define todas as posições de diálogos necessárias para o Tyler se comunicar
	numerosTyler = [2, 4, 6, 7, 13, 14, 17, 18, 21, 22, 25, 26, 28, 29, 30, 34, 36, 37, 41, 45, 48, 51, 52];
	numerosNegociar = [9, 16, 20, 24, 32, 39, 43, 47]

	update() {
		// Verifica se o texto não está em andamento
		if (!this.textoEmAndamento) {
			// Os diálogos 0 e 1 são do rei, por isso, se o diálogo for do rei, essa condição é verdadeira
			if (this.posicaoDialogo < 2) {
				// Se o jogador apertar E ou tocar na tela
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao) || this.input.activePointer.isDown) {
					// Chama a função que controla o diálogo do rei
					this.dialogoRei();
					// A posicaoDialogo recebe ela mesma mais um
					this.posicaoDialogo++;
				}
			}
	
			// Verifica se a posição diálogo indica uma fala de todos
			if (this.posicaoDialogo === 3 || this.posicaoDialogo === 5) {
				// Se a tecla E foi pressionada ou a tela foi tocada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao) || this.input.activePointer.isDown) {
					// Se sim, função que controla os diálogos de todos é chamada
					this.dialogoTodos();
					// A posicaoDialogo recebe ela mesma mais um
					this.posicaoDialogo++;
				}
			}
	
			// Verifica se a posição do dialogo equivale a fala do Gizmo
			if (this.posicaoDialogo === 8 || this.posicaoDialogo === 12) {
				// Se a tecla E foi pressionada ou a tela foi tocada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao) || this.input.activePointer.isDown) {
					// A função dialogoGizmo é chamada e é passado o -50 como parâmetro, o -50 serve para o personagem dar um passo a frente
					this.dialogoGizmo(-50);
					this.posicaoDialogo++;
				}
			}
	
			// Verifica se a posicaoDialogo está dentro de numerosTyler
			if (this.numerosTyler.includes(this.posicaoDialogo)) {
				// Se a tecla E foi pressionada ou a tela foi tocada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao) || this.input.activePointer.isDown) {
					// Chama a função que controla o diálogo do Tyler
					this.dialogoTyler();
					// Incrementa a posicaoDialogo em 1
					this.posicaoDialogo++;
				}
			}
	
			// Verifica se a posição do diálogo equivale aos dialogos da Aysla
			if (this.posicaoDialogo === 15 || this.posicaoDialogo === 19 || this.posicaoDialogo === 23 || this.posicaoDialogo === 27) {
				// Se a tecla E foi pressionada ou a tela foi tocada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao) || this.input.activePointer.isDown) {
					// A função dialogoAysla é chamada e é passado o -50 como parâmetro, o -50 serve para o personagem dar um passo a frente
					this.dialogoAysla(-50);
					// PosicaoDialogo é incrementado em um
					this.posicaoDialogo++;
				}
			}
	
			// Verifica se a posicaoDialogo equivale aos dialogos do mago
			if (this.posicaoDialogo === 31 || this.posicaoDialogo === 35) {
				// Se o jogador apertou E ou tocou na tela
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao) || this.input.activePointer.isDown) {
					// A função dialogoMago é chamada e é passado o -50 como parâmetro, o -50 serve para o personagem dar um passo a frente
					this.dialogoMago(-50);
					// PosicaoDialogo é incrementado em um
					this.posicaoDialogo++;
				}
			}
	
			// Verifica se a posição do dialogo é igual a 10 (Tyler aceita a proposta do Gizmo), se sim, automaticamente a posicaoDialogo recebe 14 (finalização do diálogo com o Gizmo), para garantir a fluidez dos diálogos
			if (this.posicaoDialogo === 10) {
				// Chama o a função que controla o dialogo do Tyler
				this.dialogoTyler();
				// A posição do dialogo recebe a posição do dialogo final
				this.posicaoDialogo = 14;
			}
	
			// Se a posição do dialogo for 29, ela se torna 30, assim uma das falas é pulada e o diálogo flui
			if (this.posicaoDialogo === 29) {
				this.posicaoDialogo = 30;
			}
	
			// Se a posição do dialogo for 36, ela se torna 37, assim uma das falas é pulada e o diálogo flui
			if (this.posicaoDialogo === 36) {
				this.posicaoDialogo = 37;
			}
	
			// Verifica se a posicao do diálogo equivale aos dialogos da elfa
			if (this.posicaoDialogo === 38 || this.posicaoDialogo === 42 || this.posicaoDialogo === 46) {
				// Se a tecla E foi pressionada ou a tela foi tocada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao) || this.input.activePointer.isDown) {
					// A função dialogoElfa é chamada e é passado o -50 como parâmetro, o -50 serve para o personagem dar um passo a frente
					this.dialogoElfa(-50);
					// Incremento de 1 na posicaoDialogo
					this.posicaoDialogo++;
				}
			}
	
			// Verifica se a posicao do diálogo é igual a alguma posição referente às negociações
			if (this.numerosNegociar.includes(this.posicaoDialogo)) {
				// Chama a função negociar e passa a posicaoDialogo como parâmetro, o parâmetro serve para impedir o crescimento do valor da variável dialogo mais do que o necessário
				this.negociar(this.posicaoDialogo);
			}
	
			// Verifica se o acordo com a elfa foi firmado, se sim, pula para a posição que finaliza o diálogo
			if (this.posicaoDialogo === 40 || this.posicaoDialogo === 44 || this.posicaoDialogo === 51) {
				// PosicaoDialogo recebe a posição que finaliza o diálogo
				this.posicaoDialogo = 52;
				this.fazerTransicaoDiaSeguinte();
				// Muda para a próxima cena
			}
	
			// Verifica se o Tyler atingiu o limite de cliques em "negociar" para o rei interver
			if (this.posicaoDialogo === 49) {
				// Se a tecla E foi apertada ou a tela foi tocada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao) || this.input.activePointer.isDown) {
					// Chama a função dialogoRei
					this.dialogoRei();
					// É incrementado um na posicaoDialogo
					this.posicaoDialogo++;
				}
			}
	
			// Cria um único botão de aceitar para o jogador não conseguir recusar
			if (this.posicaoDialogo === 50) {
				// Deixa os assets necessários visíveis
				this.caixaDialogo.setVisible(true);
				this.botaoAceitar.setVisible(true);
				this.botaoAceitar.setInteractive();
				this.botaoAceitar.on('pointerdown', () => {
					// Deixa os assets necessários invisíveis
					this.botaoAceitar.setVisible(false);
					this.botaoNegociar.setVisible(false);
					this.dialogoAceitar.setVisible(false);
					// PosicaoDialogo recebe a última posição da negociação
					this.posicaoDialogo = 51;
				});
			}
		}
	
		// Os controles são atualizados
		this.controls.update();
		// Os ícones acompanham o Tyler
		this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
		// Verifica se a velocidade do tyler é maior q 0 ou não
		if ((this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) &&
			!this.passosConcreto.isPlaying
		) {
			this.passosConcreto.play(); // Reproduz o som dos passos
		} else if (
			this.tyler.body.velocity.x === 0 &&
			this.tyler.body.velocity.y === 0 &&
			this.passosConcreto.isPlaying
		) {
			this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
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
					this.registry.set('mudarCenaCastelo', 7);
					this.scene.start('cena_castelo')
					// Restaura a visão da cena
					this.cameras.main.fadeIn(1000, 0, 0, 0);
				});
			}
		});
	}
	

	//função que muda a cena e cancela o áudio que estava passando
	transitionToScene2(cena) {
		this.scene.start(cena); // Inicia a cena 1
		this.passosConcreto.stop();
	}
}