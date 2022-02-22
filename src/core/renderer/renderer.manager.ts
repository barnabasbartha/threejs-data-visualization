import {Inject, Singleton} from 'typescript-ioc';
import {RendererComponent} from './renderer.component';
import {TimerComponent} from '../timer/timer.component';
import {BoxGeometry, Mesh, MeshNormalMaterial, Scene} from "three";
import {CoreThreadComponent} from "../core-thread.component";
import {CoreControllerComponent} from "../controller/core-controller.component";
import {CameraComponent} from "../camera/camera.component";

@Singleton
export class RendererManager {

   private readonly scene = new Scene();

   constructor(
      @Inject private readonly component: RendererComponent,
      @Inject private readonly coreThread: CoreThreadComponent,
      @Inject private readonly timer: TimerComponent,
      @Inject private readonly controller: CoreControllerComponent,
      @Inject private readonly camera: CameraComponent,
   ) {
      coreThread.canvasLoaded$.subscribe((canvas) => component.init(canvas));
      timer.step$.subscribe(() => component.render(this.scene, camera.getCamera()));
      controller.windowResized$.subscribe(size => component.setSize(size.x, size.y));

      // TODO
      const geometry = new BoxGeometry(0.2, 0.2, 0.2);
      const material = new MeshNormalMaterial();
      const mesh = new Mesh(geometry, material);
      this.scene.add(mesh);

      timer.step$.subscribe((delta) => {
         mesh.rotateX(0.01 * delta);
         mesh.rotateY(0.01 * delta);
      });
   }
}
