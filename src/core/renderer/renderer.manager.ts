import {Inject, Singleton} from 'typescript-ioc';
import {RendererComponent} from './renderer.component';
import {TimerComponent} from '../timer/timer.component';
import {BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene} from "three";

@Singleton
export class RendererManager {

   private readonly scene = new Scene();
   private readonly camera = new PerspectiveCamera(70, 1, 0.01, 10);

   constructor(
      @Inject private readonly component: RendererComponent,
      @Inject private readonly timer: TimerComponent,
   ) {
      this.camera.position.z = 1;

      const geometry = new BoxGeometry(0.2, 0.2, 0.2);
      const material = new MeshNormalMaterial();
      const mesh = new Mesh(geometry, material);
      this.scene.add(mesh);

      timer.step$.subscribe((delta) => {
         mesh.rotateX(0.01 * delta);
         mesh.rotateY(0.01 * delta);
      });
      timer.step$.subscribe(() => component.render(this.scene, this.camera));
   }
}
