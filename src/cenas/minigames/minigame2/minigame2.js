import idioma from "../../menu/tela.js";

// Exporta a classe Minigame2 que representa a cena do segundo minigame
export default class Minigame2 extends Phaser.Scene {
	constructor() {
		super({
			key: 'minigame2', // Define a chave da cena
		});
	}

	// Carrega as imagens necessárias para o jogo durante a fase de pré-carregamento
	preload() {
		this.load.image('fundo', 'assets/elementosJogo/fundo.png'); // Carrega a imagem de fundo
		this.load.image('celeste', 'assets/Perfis/perfil_celeste.png'); // Carrega a imagem do perfil "celeste"
		this.load.image('franchesco', 'assets/Perfis/perfil_franchesco.png'); // Carrega a imagem do perfil "celeste"
		this.load.image('gizmo', 'assets/Perfis/perfil_guizmo.png'); // Carrega a imagem do perfil "gizmo"
		this.load.image('morgana', 'assets/Perfis/perfil_morgana.png'); // Carrega a imagem do perfil "morgana"
		this.load.image('romeo', 'assets/Perfis/perfil_romeo.png'); // Carrega a imagem do perfil "romeo"
		this.load.image('orion', 'assets/Perfis/perfil_orion.png'); // Carrega a imagem do perfil "orion"
		this.load.image('aysla', 'assets/Perfis/perfil_aysla.png'); // Carrega a imagem do perfil "aysla"
		this.load.image('celeste_en', 'assets/Perfis/perfil_celeste_ingles.png'); // Carrega a imagem do perfil "celeste"
		this.load.image('franchesco_en', 'assets/Perfis/perfil_franchesco_ingles.png'); // Carrega a imagem do perfil "celeste"
		this.load.image('gizmo_en', 'assets/Perfis/perfil_guizmo_ingles.png'); // Carrega a imagem do perfil "gizmo"
		this.load.image('morgana_en', 'assets/Perfis/perfil_morgana_ingles.png'); // Carrega a imagem do perfil "morgana"
		this.load.image('romeo_en', 'assets/Perfis/perfil_romeo_ingles.png'); // Carrega a imagem do perfil "romeo"
		this.load.image('orion_en', 'assets/Perfis/perfil_orion_ingles.png'); // Carrega a imagem do perfil "orion"
		this.load.image('aysla_en', 'assets/Perfis/perfil_aysla_ingles.png'); // Carrega a imagem do perfil "aysla"
		this.load.image('botao', 'assets/Perfis/aprovado.png'); // Carrega a imagem do botão de verdadeiro
		this.load.image('botaox', 'assets/Perfis/errado.png'); // Carrega a imagem do botão de falso
		this.load.image('confirmar', 'assets/elementosJogo/confirmar.png');//Carrega a imagem do botão de confirmar
	}

	// Cria os elementos visuais e interativos do jogo
	create() {
		// Cria a imagem de fundo
		this.add.image(0, 0, 'fundo').setOrigin(0).setScale(2);
		// Define e posiciona os sprites dos perfis dos personagens
		var celeste = this.add
			.image(580, 330, 'celeste')
			.setVisible(false);
		var gizmo = this.add
			.image(550, 350, 'gizmo')
			.setVisible(false);
		var morgana = this.add
			.image(540, 330, 'morgana')
			.setVisible(false);
		var romeo = this.add
			.image(550, 350, 'romeo')
			.setVisible(false);
		var orion = this.add
			.image(550, 380, 'orion')
			.setVisible(false);
		var aysla = this.add
			.image(550, 340, 'aysla')
			.setVisible(false);
		var franchesco = this.add
			.image(550, 380, 'franchesco')
			.setVisible(false);
		var celeste_en = this.add
			.image(580, 330, 'celeste_en')
			.setVisible(false);
		var gizmo_en = this.add
			.image(550, 350, 'gizmo_en')
			.setVisible(false);
		var morgana_en = this.add
			.image(540, 330, 'morgana_en')
			.setVisible(false);
		var romeo_en = this.add
			.image(550, 350, 'romeo_en')
			.setVisible(false);
		var orion_en = this.add
			.image(550, 380, 'orion_en')
			.setVisible(false);
		var aysla_en = this.add
			.image(550, 340, 'aysla_en')
			.setVisible(false);
		var franchesco_en = this.add
			.image(550, 380, 'franchesco_en')
			.setVisible(false);

		// Define e posiciona os botões de verdadeiro e falso
		var verdadeiro = this.add.image(470, 630, 'botao').setScale(3.8);
		var falso = this.add.image(680, 630, 'botaox').setScale(3.8);

		this.caixaDialogo = this.add.image(1030, 580, 'caixaDialogo').setScale(1);
		this.caixaDialogo.setVisible(false);
		this.textoAjuda = this.add.text(
			850,
			580,
			'Reveja o perfil para qualquer indicação, \nesteja atento a diversidade e o histórico.',
			{ fontFamily: 'Arial', fontSize: 16, color: 'black' }
		);
		this.textoAjuda.setVisible(false);
		var confirmar = this.add
			.image(1200, 620, 'confirmar')
			.setScale(0.3)
			.setVisible(false);


		confirmar.on('pointerdown', () => {
			this.caixaDialogo.setVisible(false);
			this.textoAjuda.setVisible(false);
			confirmar.setVisible(false);
			});
		// Torna os botões interativos
		const idioma = this.registry.get('idioma');
		verdadeiro.setInteractive();
		let i = 0; // Inicializa a variável de controle 'i' com 0
		if (idioma == 'en') {
			celeste_en.setVisible(true)
			verdadeiro.on('pointerdown', () => {
			// Evento de clique para o botão verdadeiro
			
			switch (
				i // Avalia o valor de 'i'
			) {
				case 0:
					franchesco_en.setVisible(true); // Mostra o perfil "gizmo"
					celeste_en.destroy(); // Remove o perfil "celeste"
					i++; // Incrementa 'i' para o próximo caso
					break;
				case 1:
					this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
					this.textoAjuda.setVisible(true);
					confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
					confirmar.setInteractive();						
					break; //sai do switch
				case 2:
					this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
					this.textoAjuda.setVisible(true);
					confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
					confirmar.setInteractive();						
					break; //sai do switch
				case 3:
					romeo_en.setVisible(true); // Mostra o perfil "orion"
					gizmo_en.destroy(); // Remove o perfil "romeo"
					i++; // Incrementa 'i' para o próximo caso
					break;
				case 4:
					morgana_en.setVisible(true); // Mostra o perfil "aysla"
					romeo_en.destroy(); // Remove o perfil "orion"
					i++; // Incrementa 'i' para o próximo caso
					break;
				case 5:
					this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
					this.textoAjuda.setVisible(true);
					confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
					confirmar.setInteractive();						
					break; //sai do switch
				case 6:
					this.scene.start('cena_escriba'); // Inicia a cena "cena_castelo"
					this.registry.set('mudarCenaEscriba', 3);
			}
		});
	

		// Torna o botão de falso interativo
		falso.setInteractive();
		falso.on('pointerdown', () => {
			// Evento de clique para o botão falso
			switch (
				i // Avalia o valor de 'i'
			) {
				case 0:
					this.caixaDialogo.setVisible(true); //deixa visivel o texto quando o player erra 
					this.textoAjuda.setVisible(true);
					confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
					confirmar.setInteractive();
					
					break;
				case 1:
					orion_en.setVisible(true); // Mostra o perfil "morgana"
					franchesco_en.destroy(); // Remove o perfil "gizmo"
					i++; // Incrementa 'i' para o próximo caso
					break;
				case 2:
					gizmo_en.setVisible(true); // Mostra o perfil "romeo"
					orion_en.destroy(); // Remove o perfil "morgana"
					i++; // Incrementa 'i' para o próximo caso
					break;
				case 3:
					this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
					this.textoAjuda.setVisible(true);
					confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
					confirmar.setInteractive();						
					break; //sai do switch
				case 4:
					this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
					this.textoAjuda.setVisible(true);
					confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
					confirmar.setInteractive();						
					break; //sai do switch
				case 5:
					aysla_en.setVisible(true); // Mostra o perfil "aysla"
					morgana_en.destroy(); // Remove o perfil "orion"
					i++; // Incrementa 'i' para o próximo caso
					break;
			}
		});	
		} else {
			celeste.setVisible(true)
			verdadeiro.on('pointerdown', () => {
				// Evento de clique para o botão verdadeiro
				
				switch (
					i // Avalia o valor de 'i'
				) {
					case 0:
						franchesco.setVisible(true); // Mostra o perfil "gizmo"
						celeste.destroy(); // Remove o perfil "celeste"
						i++; // Incrementa 'i' para o próximo caso
						break;
					case 1:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();						
						break; //sai do switch
					case 2:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();						
						break; //sai do switch
					case 3:
						romeo.setVisible(true); // Mostra o perfil "orion"
						gizmo.destroy(); // Remove o perfil "romeo"
						i++; // Incrementa 'i' para o próximo caso
						break;
					case 4:
						morgana.setVisible(true); // Mostra o perfil "aysla"
						romeo.destroy(); // Remove o perfil "orion"
						i++; // Incrementa 'i' para o próximo caso
						break;
					case 5:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();						
						break; //sai do switch
					case 6:
						this.scene.start('cena_escriba'); // Inicia a cena "cena_castelo"
						this.registry.set('mudarCenaEscriba', 3);
				}
			});
		
	
			// Torna o botão de falso interativo
			falso.setInteractive();
			falso.on('pointerdown', () => {
				// Evento de clique para o botão falso
				switch (
					i // Avalia o valor de 'i'
				) {
					case 0:
						this.caixaDialogo.setVisible(true); //deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						
						break;
					case 1:
						orion.setVisible(true); // Mostra o perfil "morgana"
						franchesco.destroy(); // Remove o perfil "gizmo"
						i++; // Incrementa 'i' para o próximo caso
						break;
					case 2:
						gizmo.setVisible(true); // Mostra o perfil "romeo"
						orion.destroy(); // Remove o perfil "morgana"
						i++; // Incrementa 'i' para o próximo caso
						break;
					case 3:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();						
						break; //sai do switch
					case 4:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();						
						break; //sai do switch
					case 5:
						aysla.setVisible(true); // Mostra o perfil "aysla"
						morgana.destroy(); // Remove o perfil "orion"
						i++; // Incrementa 'i' para o próximo caso
						break;
				}
			});	
		}
			
	}

	// Método de atualização do jogo
	update() {
		// Não há lógica de atualização neste jogo, então este método está vazio
	}

	// Método para transição para outra cena
	transitionToScene(cena) {
		this.scene.start(cena); // Inicia a cena especificada
	}
}
