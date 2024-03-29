// Importe os módulos necessários

// Classe representando a cena para exibir a imagem com base no idioma selecionado
export default class IdiomaImageScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'idioma_image_scene',
        });
    }

    // Método de criação da cena
    create() {
        const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

        // Carregue as imagens para inglês e português
        const imagemIngles = 'imagem_ingles';
        const imagemPortugues = 'imagem_portugues';

        // Defina a imagem com base no idioma selecionado
        let imagem;
        if (idioma === 'ingles') {
            imagem = imagemIngles;
        } else if (idioma === 'portugues') {
            imagem = imagemPortugues;
        }

        // Adicione a imagem à cena
        this.add.image(x, y, imagem).setOrigin(0.5);

        // Restante do seu código...
    }
}
