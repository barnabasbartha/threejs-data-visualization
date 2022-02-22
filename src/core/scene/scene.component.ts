import {Singleton} from "typescript-ioc";
import {BoxGeometry, Mesh, MeshNormalMaterial, Scene} from "three";

@Singleton
export class SceneComponent {
   private scene: Scene;

   constructor() {
      this.scene = new Scene();
   }

   getScene(): Scene {
      return this.scene;
   }

   createDefaultScene() {
      this.scene = new Scene();
      const geometry = new BoxGeometry(0.2, 0.2, 0.2);
      const material = new MeshNormalMaterial();
      const mesh = new Mesh(geometry, material);
      this.scene.add(mesh);
   }
}
