import {expose} from 'threads/worker';
import {Container, Inject, Singleton} from 'typescript-ioc';
import {RendererManager} from './renderer/renderer.manager';
import {TimerManager} from './timer/timer.manager';
import {CoreThreadComponent} from "./core-thread.component";
import {DynamicControllerEvent} from "../common/controller/controller.model";
import {CoreControllerComponent} from "./controller/core-controller.component";

@Singleton
export class CoreThreadManager {
   constructor(
      @Inject private readonly component: CoreThreadComponent,
      @Inject private readonly renderer: RendererManager,
      @Inject private readonly timer: TimerManager,
      @Inject private readonly controller: CoreControllerComponent,
   ) {
      component.waitForCanvas();
      component.canvasLoaded$.subscribe(() => console.log('Canvas loaded in Core thread.'))
   }

   sendEvent(event: DynamicControllerEvent) {
      this.controller.sendEvent(event);
   }
}

const coreThread = Container.get(CoreThreadManager);

expose({
   sendEvent: coreThread.sendEvent.bind(coreThread),
});
