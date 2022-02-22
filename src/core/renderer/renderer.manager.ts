import {Inject, Singleton} from 'typescript-ioc';
import {RendererComponent} from './renderer.component';
import {TimerComponent} from '../timer/timer.component';
import {CoreThreadComponent} from "../core-thread.component";
import {CoreControllerComponent} from "../controller/core-controller.component";
import {CameraComponent} from "../camera/camera.component";
import {SceneComponent} from "../scene/scene.component";

@Singleton
export class RendererManager {
   constructor(
      @Inject private readonly component: RendererComponent,
      @Inject private readonly coreThread: CoreThreadComponent,
      @Inject private readonly timer: TimerComponent,
      @Inject private readonly controller: CoreControllerComponent,
      @Inject private readonly camera: CameraComponent,
      @Inject private readonly scene: SceneComponent,
   ) {
      coreThread.canvasLoaded$.subscribe((canvas) => component.init(canvas));
      timer.step$.subscribe(() => component.render(scene.getScene(), camera.getCamera()));
      controller.windowResized$.subscribe(size => component.setSize(size.x, size.y));
   }
}
