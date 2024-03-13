// PlayerCamera.js
export default class Camera {
    // Construtor que recebe a cena, o personagem e o mapa como parâmetros
    constructor(scene, person, map) {
        this.scene = scene;
        this.person = person;
        this.map = map;

        // Chama o método para criar a câmera
        this.createCamera();
    }

    // Método para criar a câmera
    createCamera() {
        // Configura a câmera principal para seguir o personagem
        this.camera = this.scene.cameras.main;
        this.camera.startFollow(this.person);

        // Define os limites da câmera com base nas dimensões do mapa
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Define o zoom da câmera principal
        

        // Cria uma câmera de minimapa
        // Posição fixa na tela, considerando uma tela de 1024x600
        //this.minimap = this.scene.cameras.add(564, 315, 1000, 300).setZoom(0.2).setName('mini');
    }

    createZoom_1(){
        this.camera.setZoom(2, 2);
    }

    createZoom_2(){
        this.camera.setZoom(3.7,3.7);
    }


    createMiniMap(){
        this.minimap = this.scene.cameras.add(564, 315, 1200, 500).setZoom(0.2).setName('mini');
    }
}
