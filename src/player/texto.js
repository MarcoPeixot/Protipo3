export default class TextManager {
    // Método estático para exibir texto letra por letra
    static letraPorLetra(scene, text, textObject) {
        if (scene.textoEmAndamento === true) {
            return; // Se o texto já estiver em andamento, saia do método
        }

        scene.textoEmAndamento = true; // Define o flag de texto em andamento como verdadeiro
        let index = 0;
        textObject.text = '';

        // Adiciona um evento de tempo para exibir cada letra do texto
        scene.time.addEvent({
            callback: () => {
                textObject.text += text[index]; // Adiciona a próxima letra ao objeto de texto
                index++;

                // Verifica se todas as letras foram exibidas
                if (index === text.length) {
                    scene.time.removeAllEvents(); // Remove todos os eventos de tempo após exibir todas as letras
                    scene.textoEmAndamento = false; // Define o flag de texto em andamento como falso
                }
            },
            repeat: text.length - 1, // Configura o número de repetições com base no comprimento do texto
            delay: 10, // Atraso entre cada letra (em milissegundos)
            callbackScope: scene, // Define o escopo do callback como a cena
        });
    }
}
