import {Inject, Singleton} from "typescript-ioc";
import {CoreControllerComponent} from "../controller/core-controller.component";
import {CameraComponent} from "./camera.component";

@Singleton
export class CameraManager {
   constructor(
      @Inject private readonly component: CameraComponent,
      @Inject private readonly controller: CoreControllerComponent,
   ) {
      controller.windowResized$.subscribe(size => component.updateSize(size));
   }
}
