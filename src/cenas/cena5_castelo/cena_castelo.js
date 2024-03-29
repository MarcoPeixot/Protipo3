// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../player/dialogos.js';

//Inicia a classe Scene3, ou a cena da sala do rei
export default class Scene3 extends Phaser.Scene {
	constructor() {
		super({
			key: 'cena_castelo',
		});

		this.textoEmAndamento = false;
		this.falasRei = 0;
		this.falasRei2 = 0;
		this.falasRei3 = 0;
		this.falasRei4 = 0;
		this.falasRei5 = 0;
		this.falasRei6 = 0;
		this.falasRei7 = 0;
		this.falasRei8 = 0;
		this.falasRei9 = 0;
	}

	//Carrega os arquivos necessários
	preload() {
		this.load.image('fundoPreto', './assets/elementosJogo/fundopreto.jpg')
		this.load.tilemapTiledJSON(
			'map_castle',
			'./assets/mapas/castelo/sala_rei.json'
		);
		this.load.image('tile_castelo', './assets/mapas/castelo/salarei.png');
		this.load.image('caixaDialogo', './assets/caixaDialogo.png');
		this.load.spritesheet(
			'rei',
			'./assets/sprites_personagens/assets_rei/rei.png',
			{ frameWidth: 32, frameHeight: 32 }
		);
		this.load.image('tecla_e', './assets/tecla_e_pixel.png');
		this.load.image('etapa1', './assets/elementosJogo/etapa1.png');
		this.load.audio('musicaRei', './assets/audios/entrance.mp3');
	}

	//Cria os arquivos necessários
	create() {
		const idioma = this.registry.get('idioma');
		const mudarCena = this.registry.get('mudarCenaCastelo');
		this.fundoPreto = this.add
			.image(500, 400, 'fundoPreto')
			.setScale(7)
			.setVisible(false);
		
		//O som de passos é iniciado
		this.passosConcreto = this.sound
			.add('passosConcreto', { loop: true })
			.setVolume(0.7);
		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		//Chama as funções que criam o mapa e o personagem
		this.criarMapa();
		this.criarPersonagem();
		//Implementa a caixa de diálogo e a deixa invisivel
		this.caixaDialogo = this.add
			.image(this.tyler.x, this.tyler.y + 40, 'caixaDialogo')
			.setScale(0.88)
			.setVisible(false);
		//Chama as funções que criam os controles e o npc
		this.controls.create();
		this.criarNpc();
		//Adicione o icone da tecla E e a deixa invisível
		this.tecla_E = this.add
			.sprite(this.tyler.x, this.tyler.y - 40, 'tecla_e')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
			.setScale(2);
		this.etapa = this.add
			.sprite(110, 320, 'etapas')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(0.15);
		//Torna o rei interativo para ativar os dialogos com o clique
		this.rei.setInteractive();
		//quando clicar no rei, isso acontece
		this.rei.on('pointerup', () => {
			//Se a cena estiver acontecendo pela primeira vez, isso acontece
			if (mudarCena === 0) {
				//torna a caixa de dialogo e o textoRei visíveis
				this.caixaDialogo.setVisible(true);
				this.textoRei.setVisible(true);
				//é chamado arquivo texto para pegar a função que exibe as falas letra por letra
				Texto.letraPorLetra(this, falas[contadorFalas], this.textoRei);
				//As falas passam uma a uma até a última, onde começa o minigame1
				contadorFalas++;
				if (contadorFalas === falas.length) {
					this.transitionToScene2('minigame1');
					contadorFalas = 0;
					this.registry.set('mudarCena', 1);
				}
			} else {
				//se a cena estiver acontecendo pela segunda vez, a fala2 do rei é impressa
				this.caixaDialogo.setVisible(true);
				this.textoRei.setVisible(true);
				Texto.letraPorLetra(this, falas2[contadorFalas], this.textoRei);
				i++;
				console.log(222222)
				if (contadorFalas === falas2.length) {
					this.transitionToScene2('minigame2');
					contadorFalas = 0;
				}
			}
		});

		//Tecla de sinalização do rei
		this.tecla_sinalizcao = this.add
			.sprite(this.rei.x, this.rei.y - 50, 'tecla_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(2);

		const text = this.add.text(18, 340, dialogs[idioma]['texto_boasvindas_castelo'], {
			fontSize: '23px',
			fill: '#ffffff'
		}).setAlpha(0);

		const textEtapa = this.add.text(18, 315, dialogs[idioma]['texto_etapa1'], {
			fontSize: '16px',
			fill: '#ffffff',
			fontStyle: 'bold'
		}).setAlpha(0);

		if(mudarCena === 0){
			// Fazendo o texto aparecer (fade in) e depois desaparecer (fade out)
		this.tweens.add({
			targets: textEtapa,
			alpha: 1,
			ease: 'Linear', // Tipo de transição
			duration: 2000, // Duração do fade in
			hold: 1000, // Quanto tempo o texto fica visível antes do fade out
			yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
			repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
		});

		// Fazendo o texto aparecer (fade in) e depois desaparecer (fade out)
		this.tweens.add({
			targets: text,
			alpha: 1,
			ease: 'Linear', // Tipo de transição
			duration: 2000, // Duração do fade in
			hold: 1000, // Quanto tempo o texto fica visível antes do fade out
			yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
			repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
		});

		this.time.delayedCall(4000, () => {
            this.tweens.add({
                targets: this.etapa,
                alpha: 0,
                duration: 1000, // Duração da transição de fade out
                onComplete: () => {
                    this.etapa.setVisible(false); // Oculta a imagem após o fade out
                }
            });
        });
		}
		else{
			this.etapa.setVisible(false)
		}
	}

	//Cria o mapa
	criarMapa() {
		this.map = this.make.tilemap({ key: 'map_castle' });
		this.tilesetCast = this.map.addTilesetImage('salarei', 'tile_castelo');

		this.ground = this.map.createLayer('ground', this.tilesetCast, 0, 0);
		this.passar = this.map.createLayer('passar_fase', this.tilesetCast, 0, 0);
		this.voltar = this.map.createLayer('voltar_fase', this.tilesetCast, 0, 0);

		this.ground.setCollisionByProperty({ collider: true });
		this.ground.setDepth(-1)
	}

	mostrarProximoDialogo() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_cena_castelo']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.falasRei < falas.length) {
			Texto.letraPorLetra(this, falas[this.falasRei], this.textoRei);
			this.falasRei++;
		}
	}

	mostrarProximoDialogo2() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo2']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei2 < falas.length) {
			Texto.letraPorLetra(this, falas[this.falasRei2], this.textoRei);
			this.falasRei2++;
		} else if (this.falasRei2 === falas.length) {


			this.fazerTransicaoDiaSeguinte(); // Chama a função para fazer a transição para o próximo dia
			this.registry.set('mudarCenaCastelo', 3);
		}
	}

	mostrarProximoDialogo3() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo3']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei3 < falas.length) {
			Texto.letraPorLetra(this, falas[this.falasRei3], this.textoRei);
			this.falasRei3++;
		} else if (this.falasRei3 === falas.length) {
			this.registry.set('mudarCenaEscriba', 2);

		}
	}

	mostrarProximoDialogo4() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo4']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei4 < falas.length) {
			Texto.letraPorLetra(this, falas[this.falasRei4], this.textoRei);
			this.falasRei4++;
		} else if (this.falasRei4 === falas.length) {
			this.fazerTransicaoDiaSeguinte()
			this.registry.set('mudarCenaCastelo', 5);
		}
	}

	mostrarProximoDialogo5() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo6']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei5 < falas.length) {
			Texto.letraPorLetra(this, falas[this.falasRei5], this.textoRei);
			this.falasRei5++;
		} else if (this.falasRei5 === falas.length) {
			this.fazerTransicaoDiaSeguinte()
			this.registry.set('mudarCenaCastelo', 6);
		}
	}

	mostrarProximoDialogo6() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo7']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei6 < falas.length) {
			Texto.letraPorLetra(this, falas[this.falasRei6], this.textoRei);
			this.falasRei6++;
		} else if (this.falasRei6 === falas.length) {
			this.fazerTransicaoDiaSeguinte()
			this.scene.start('minigame3')
		}
	}

	mostrarProximoDialogo7() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo8']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei7 < falas.length) {
			Texto.letraPorLetra(this, falas[this.falasRei7], this.textoRei);
			this.falasRei7++;
		} else if (this.falasRei7 === falas.length) {
			this.fazerTransicaoDiaSeguinte()
			this.registry.set('mudarCenaCastelo', 8)
		}
	}

	mostrarProximoDialogo8() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo9']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei8 < falas.length) {
			Texto.letraPorLetra(this, falas[this.falasRei8], this.textoRei);
			this.falasRei8++;
		} else if (this.falasRei8 === falas.length) {
			this.fazerTransicaoDiaSeguinte()
			this.registry.set('mudarCenaCastelo', 9)
			this.scene.start('cena_festa')
		}
	}

	mostrarProximoDialogo9() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo10']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei9 < falas.length) {
			Texto.letraPorLetra(this, falas[this.falasRei9], this.textoRei);
			this.falasRei9++;
		} else if (this.falasRei9 === falas.length) {
			this.fazerTransicaoDiaSeguinte()
			this.scene.start('cena_escritorio')
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



	//Cria os personagens
	criarPersonagem() {
		const mudarCena = this.registry.get('mudarCenaCastelo');
		// Encontra o ponto de spawn do jogador no mapa
		const spawnPoint = this.map.findObject(
			'player',
			(objects) => objects.name === 'spawning point player'
		);

		const spawnPointVolta = this.map.findObject(
			'voltar',
			(objects) => objects.name === 'spawning point voltar'
		);

		const spawnPointOutra = this.map.findObject(
			'outra',
			(objects) => objects.name === 'spawning point outra'
		);

		//define os diferentes spawns se a cena estiver acontecendo pela primeira vez ou não
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
			this.tyler = new Player(
				this,
				spawnPointVolta.x,
				spawnPointVolta.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em outra posição
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}
		if (mudarCena === 2) {
			this.tyler = new Player(
				this,
				spawnPointOutra.x,
				spawnPointOutra.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em outra posição
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 3) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 4) {
			this.tyler = new Player(
				this,
				spawnPointVolta.x,
				spawnPointVolta.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 5) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 6) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 7) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 8) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 9) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}


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

		// Criação do NPC Vanessa
		this.rei = this.physics.add
			.sprite(spawnPointNpc.x, spawnPointNpc.y, 'rei')
			.setScale(1.2).setDepth(-1).setSize(50, 70);

		// Configuração do texto associado ao NPC Vanessa
		this.textoRei = this.add
			.text(this.tyler.x + 80, this.tyler.y + 80, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
			})
			.setOrigin(0.5);
	}

	update() {

		const mudarCena = this.registry.get('mudarCenaCastelo');

		console.log(mudarCena)
		//os controles são atualizados
		this.controls.update();
		//os icones acompanham o Tyler
		this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
		this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 110);
		this.textoRei.setPosition(this.tyler.x, this.tyler.y + 110);
		//verifica se a velocidade do tyler é maior q 0 ou não
		if (
			(this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) &&
			!this.passosConcreto.isPlaying
		) {
			this.passosConcreto.play(); // Reproduz o som dos passos
			this.caixaDialogo.setVisible(false);
			this.textoRei.setVisible(false)
		} else if (
			this.tyler.body.velocity.x === 0 &&
			this.tyler.body.velocity.y === 0 &&
			this.passosConcreto.isPlaying
		) {
			this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
		}

		//Habilita a função de overlap do Tyler e rei
		const overlapping = this.physics.overlap(this.tyler, this.rei);

		//Verifica se o Tyler está passando por cima do rei
		if (overlapping) {
			this.tecla_E.setVisible(true);
			//Controla as falas que serão exibidas a depender de quantas vezes a cena foi exibida
			if (mudarCena === 0 || mudarCena === 1) {
				// Verifica se a tecla "E" foi pressionada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//As falas passam uma a uma
					this.mostrarProximoDialogo();
				}
			} else if (mudarCena === 2) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo2()
				}
			}

			else if (mudarCena === 3) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo3()
				}
			}

			else if (mudarCena === 4) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo4()
				}
			}

			else if (mudarCena === 5) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo5()
				}
			}

			else if (mudarCena === 6) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo6()
				}
			}

			else if (mudarCena === 7) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo7()
				}
			}

			else if (mudarCena === 8) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo8()
				}
			}

			else if (mudarCena === 9) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo9()
				}
			}
		} else {
			//Icone da tecla E fica invisivel
			this.tecla_E.setVisible(false);
		}

		//Verifica as posições do Tyler para realizar as mudanças de cena
		if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
			this.transitionToScene2('cena_escriba');
			this.registry.set('mudarCenaCastelo', 1);
		}

		if (this.voltar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
			this.transitionToScene2('cena_corredor');
			this.registry.set('mudarCenaCastelo', 0);
		}
	}

	//função que muda a cena e cancela o áudio que estava passando
	transitionToScene2(cena) {
		this.scene.start(cena); // Inicia a cena 1
		this.passosConcreto.stop();
	}
}
