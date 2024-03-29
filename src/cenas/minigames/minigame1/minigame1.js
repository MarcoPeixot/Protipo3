import pergunt from "./perguntas.js"

//definindo váriaveis para saber se o pergaminho está selecionado ou não.
var selecionado1 = 0;
var selecionado2 = 0;
var selecionado3 = 0;
var selecionado4 = 0;
var selecionado5 = 0;
var selecionado6 = 0;
//definindo váriaveis para quando o pergaminho for clicado.
var clicou1 = true;
var clicou2 = true;
var clicou3 = true;
var clicou4 = true;
var clicou5 = true;
var clicou6 = true;

//criando a classe "minigame1" que é uma extensão da classe "Phaser.Scene".
export default class Minigame1 extends Phaser.Scene {
	constructor() {
		super({
			key: 'minigame1',
		});
	}

	// carregando imagens.
	preload() {
		this.load.image('fundo', 'assets/elementosJogo/fundo.png');
		this.load.image('pergaminho', 'assets/pergaminhos/pergaminho.png');
		this.load.image('confirmar', 'assets/elementosJogo/confirmar.png');
	}
	// criando imagens no jogo.
	create() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		this.add.image(400, 300, 'fundo').setScale(3);
		var pergaminho1 = this.add
			.image(300, 180, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho2 = this.add
			.image(640, 180, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho3 = this.add
			.image(980, 180, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho4 = this.add
			.image(300, 550, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho5 = this.add
			.image(640, 550, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho6 = this.add
			.image(980, 550, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);

		this.textoPergaminho1 = this.add.text(
			560, 130,
			pergunt[idioma]['pergunta1'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center' }
		)

		this.textoPergaminho2 = this.add.text(
			220, 140,
			pergunt[idioma]['pergunta2'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center' }
		)

		this.textoPergaminho3 = this.add.text(
			910, 170,
			pergunt[idioma]['pergunta3'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center' }
		)

		this.textoPergaminho4 = this.add.text(
			210, 540,
			pergunt[idioma]['pergunta4'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center' }
		)

		this.textoPergaminho5 = this.add.text(
			573, 550,
			pergunt[idioma]['pergunta5'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center' }
		)

		this.textoPergaminho6 = this.add.text(
			870, 550,
			pergunt[idioma]['pergunta6'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center' }
		)
		
		this.caixaDialogo = this.add.image(600, 650, 'caixaDialogo').setScale(2);
		this.caixaDialogo.setVisible(false);
		

		this.textoAjuda = this.add.text(
			220, 630,
			'Ops, acho existem perguntas melhores. Que tal tentar novamente?',
			{ fontFamily: 'Arial', fontSize: 24, color: 'black' }
		);
		this.textoAjuda.setVisible(false);

		this.confirmar = this.add.image(1200, 630, 'confirmar').setScale(0.5);
		this.confirmar2 = this.add
			.image(900, 700, 'confirmar')
			.setScale(0.5)
			.setVisible(false);

		this.caixaDialogo.setDepth(10)
		this.textoAjuda.setDepth(10)
		this.confirmar2.setDepth(10)
		

		//adicionando interação ao clicar nos pergaminhos.
		pergaminho1.setInteractive();
		pergaminho1.on('pointerdown', () => {
			this.clicado(pergaminho1, 1);
		});

		pergaminho2.setInteractive();
		pergaminho2.on('pointerdown', () => {
			this.clicado(pergaminho2, 2);
		});

		pergaminho3.setInteractive();
		pergaminho3.on('pointerdown', () => {
			this.clicado(pergaminho3, 3);
		});

		pergaminho4.setInteractive();
		pergaminho4.on('pointerdown', () => {
			this.clicado(pergaminho4, 4);
		});

		pergaminho5.setInteractive();
		pergaminho5.on('pointerdown', () => {
			this.clicado(pergaminho5, 5);
		});

		pergaminho6.setInteractive();
		pergaminho6.on('pointerdown', () => {
			this.clicado(pergaminho6, 6);
		});


		// adicionando interação ao clicar no botão de confirmar.
		this.confirmar.setInteractive();
		this.confirmar.on('pointerdown', () => {
			// condição que verifica se a soma das variáveis selecionado1, selecionado2, etc. é igual a 47.
			if (
				selecionado1 +
				selecionado2 +
				selecionado3 +
				selecionado4 +
				selecionado5 +
				selecionado6 ===
				43
			) {
				// se a soma for igual a 15, avança para a cena "minigame2"
				this.transitionToScene('cena_escriba');
				
			}
			// se a soma for diferente de 15, nada acontece (por enquanto)
			else {
				this.caixaDialogo.setVisible(true);
				this.textoAjuda.setVisible(true);
				this.confirmar2.setVisible(true);
				this.confirmar2.setInteractive();
			}
		});
		this.confirmar2.on('pointerdown', () => {
			this.caixaDialogo.setVisible(false);
			this.textoAjuda.setVisible(false);
			this.confirmar2.setVisible(false);
		});
		
	}

	update() { }
	// função para mudar de cena.
	transitionToScene(cena) {
		this.scene.start(cena);
	}
	// função para restaurar a cor original do pergaminho quando ele é desselecionado)
	clicado(pergaminho, num) {
		if (pergaminho.originalTint === undefined) {
			pergaminho.originalTint = pergaminho.tintTopLeft;
		}
		// verifica qual pergaminho foi clicado e altera seu estado de seleção
		if (num === 1) {
			if (clicou1) {
				pergaminho.setTint(0xffffff);
				selecionado1 = 1;
				clicou1 = false;
				 
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado1 = 0;
				clicou1 = true;
			}
		} else if (num === 2) {
			if (clicou2) {
				pergaminho.setTint(0xffffff);
				selecionado2 = 2;
				clicou2 = false;
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado2 = 0;
				clicou2 = true;
			}
		} else if (num === 3) {
			if (clicou3) {
				pergaminho.setTint(0xffffff);
				selecionado3 = 4;
				clicou3 = false;
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado3 = 0;
				clicou3 = true;
			}
		} else if (num === 4) {
			if (clicou4) {
				pergaminho.setTint(0xffffff);
				selecionado4 = 8;
				console.log(selecionado4)
				clicou4 = false;
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado4 = 0;
				clicou4 = true;
			}
		} else if (num === 5) {
			if (clicou5) {
				pergaminho.setTint(0xffffff);
				selecionado5 = 16;
				clicou5 = false;
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado5 = 0;
				clicou5 = true;
			}
		} else if (num === 6) {
			if (clicou6) {
				pergaminho.setTint(0xffffff);
				selecionado6 = 32;
				clicou6 = false;
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado6 = 0;
				clicou6 = true;
			}
		}
	}
}
