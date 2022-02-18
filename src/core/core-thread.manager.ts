import {expose} from 'threads/worker';
import {Container, Inject, Singleton} from 'typescript-ioc';
import {RendererManager} from './renderer/renderer.manager';
import {TimerManager} from './timer/timer.manager';
import {CoreThreadComponent} from "./core-thread.component";

@Singleton
export class CoreThreadManager {
   constructor(
      @Inject private readonly component: CoreThreadComponent,
      @Inject private readonly renderer: RendererManager,
      @Inject private readonly timer: TimerManager,
   ) {
      component.waitForCanvas();
      component.canvasLoaded$.subscribe(() => console.log('Canvas loaded in Core thread.'))
   }
}

const coreThread = Container.get(CoreThreadManager);

expose({});
