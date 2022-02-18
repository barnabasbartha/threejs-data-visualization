import './main.scss';
import {Container, Inject, Singleton} from 'typescript-ioc';
import {MainControllerComponent} from "./controller/main-controller.component";
import {MainThreadComponent} from "./main-thread.component";
import {GuiComponent} from "./gui/gui.component";

@Singleton
class MainThreadManager {
   constructor(
      @Inject private readonly component: MainThreadComponent,
      @Inject private readonly gui: GuiComponent,
      @Inject private readonly mainController: MainControllerComponent,
   ) {
      gui.canvasLoaded$.subscribe(canvas => {
         console.log('Main canvas created');
         component.initCoreThread(canvas);
      });
      component.coreThreadLoaded$.subscribe(() => console.log('Core thread created'));

      gui.initCanvas();
      console.log('Main thread OK');
   }
}

Container.get(MainThreadManager);
