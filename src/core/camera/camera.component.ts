import {Singleton} from "typescript-ioc";
import {Camera, PerspectiveCamera} from "three";
import {Vector2} from "../../common/event.model";

@Singleton
export class CameraComponent {
   private readonly camera: PerspectiveCamera;

   constructor() {
      this.camera = new PerspectiveCamera(70, 1, 0.01, 10);
      this.camera.position.z = 1;
      this.camera.position.y = .2;
      this.camera.position.x = .2;
      this.camera.lookAt(0, 0, 0);
   }

   getCamera(): Camera {
      return this.camera;
   }

   updateSize(size: Vector2) {
      this.camera.aspect = size.x / size.y;
      this.camera.updateProjectionMatrix();
   }
}
