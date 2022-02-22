import {Inject, Singleton} from "typescript-ioc";
import {SceneComponent} from "./scene.component";
import {TimerComponent} from "../timer/timer.component";

@Singleton
export class SceneManager {
   constructor(
      @Inject private readonly component: SceneComponent,
      @Inject private readonly timer: TimerComponent,
   ) {
      // TODO: Separate Scenes
      component.createDefaultScene();
      timer.step$.subscribe((delta) => {
         component.getScene().rotateX(0.01 * delta);
         component.getScene().rotateY(0.01 * delta);
      });
   }
}
