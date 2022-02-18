import {Inject, Singleton} from 'typescript-ioc';
import {GuiComponent} from "../gui/gui.component";
import {MainControllerComponent} from "./main-controller.component";
import {ControllerComponent} from "./controller.component";

@Singleton
export class MainControllerManager {
   constructor(
      @Inject private readonly component: MainControllerComponent,
      @Inject private readonly controller: ControllerComponent,
      @Inject private readonly gui: GuiComponent,
   ) {
      gui.canvasLoaded$.subscribe(canvas => controller.init(canvas));
   }
}
