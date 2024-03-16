// Exporta a classe Minigame2 que representa a cena do segundo minigame
export default class Minigame2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'minigame2' // Define a chave da cena
        });
    }

    // Carrega as imagens necessárias para o jogo durante a fase de pré-carregamento
    preload() {
        this.load.image('fundo', 'assets/elementosJogo/fundo.png'); // Carrega a imagem de fundo
        this.load.image('celeste', 'assets/Perfis/perfil_celeste.png'); // Carrega a imagem do perfil "celeste"
        this.load.image('gizmo', 'assets/Perfis/perfil_gizmo.png'); // Carrega a imagem do perfil "gizmo"
        this.load.image('morgana', 'assets/Perfis/perfil_morgana.png'); // Carrega a imagem do perfil "morgana"
        this.load.image('romeo', 'assets/Perfis/perfil_romeo.png'); // Carrega a imagem do perfil "romeo"
        this.load.image('ruivo', 'assets/Perfis/perfil_ruivo.png'); // Carrega a imagem do perfil "ruivo"
        this.load.image('aysla', 'assets/Perfis/perfil_aysla.png'); // Carrega a imagem do perfil "aysla"
        this.load.image('botao', 'assets/Perfis/aprovado.png'); // Carrega a imagem do botão de verdadeiro
        this.load.image('botaox', 'assets/Perfis/errado.png'); // Carrega a imagem do botão de falso
    }
    
    // Cria os elementos visuais e interativos do jogo
    create() {
        // Cria a imagem de fundo
        this.add.image(0, 0, 'fundo').setOrigin(0).setScale(2);
        // Define e posiciona os sprites dos perfis dos personagens
        var celeste = this.add.image(550, 340, 'celeste').setScale(0.4).setVisible(true);
        var gizmo = this.add.image(550, 340, 'gizmo').setScale(0.4).setVisible(false);
        var morgana = this.add.image(560, 330, 'morgana').setScale(0.4).setVisible(false);
        var romeo = this.add.image(560, 330, 'romeo').setScale(0.4).setVisible(false);
        var ruivo = this.add.image(560, 330, 'ruivo').setScale(0.4).setVisible(false);
        var aysla = this.add.image(560, 330, 'aysla').setScale(0.4).setVisible(false);

        // Define e posiciona os botões de verdadeiro e falso
        var verdadeiro = this.add.image(470, 590, 'botao').setScale(3.8);
        var falso = this.add.image(680, 590, 'botaox').setScale(3.8);
        
        // Torna os botões interativos
        verdadeiro.setInteractive();
        let i = 0; // Inicializa a variável de controle 'i' com 0
        verdadeiro.on('pointerdown', () => { // Evento de clique para o botão verdadeiro
            switch (i) { // Avalia o valor de 'i'
                case 0:
                    gizmo.setVisible(true); // Mostra o perfil "gizmo"
                    celeste.destroy(); // Remove o perfil "celeste"
                    i++; // Incrementa 'i' para o próximo caso
                    break;
                case 1:
                    morgana.setVisible(true); // Mostra o perfil "morgana"
                    gizmo.destroy(); // Remove o perfil "gizmo"
                    i++; // Incrementa 'i' para o próximo caso
                    break;
                case 2:
                    console.log("voce errou"); // Exibe mensagem de erro no console
                    break; // Sai do switch
                case 3:
                    ruivo.setVisible(true); // Mostra o perfil "ruivo"
                    romeo.destroy(); // Remove o perfil "romeo"
                    i++; // Incrementa 'i' para o próximo caso
                    break;
                case 4: 
                    console.log("voce errou"); // Exibe mensagem de erro no console
                    break; // Sai do switch
                case 5: 
                    this.scene.start('cena_castelo'); // Inicia a cena "cena_castelo"
            }
        });

        // Torna o botão de falso interativo
        falso.setInteractive();
        falso.on('pointerdown', () => { // Evento de clique para o botão falso
            switch (i) { // Avalia o valor de 'i'
                case 0:
                case 1:
                case 3:
                    console.log("voce errou"); // Exibe mensagem de erro no console
                    break; // Sai do switch
                case 2:
                    romeo.setVisible(true); // Mostra o perfil "romeo"
                    morgana.destroy(); // Remove o perfil "morgana"
                    i++; // Incrementa 'i' para o próximo caso
                    break;
                case 4:
                    aysla.setVisible(true); // Mostra o perfil "aysla"
                    ruivo.destroy(); // Remove o perfil "ruivo"
                    i++; // Incrementa 'i' para o próximo caso
                    break;
            }
        });
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
