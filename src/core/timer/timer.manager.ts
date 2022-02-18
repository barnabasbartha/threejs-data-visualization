import {Inject, Singleton} from 'typescript-ioc';
import {TimerComponent} from './timer.component';
import {CoreThreadComponent} from "../core-thread.component";

@Singleton
export class TimerManager {
   constructor(
      @Inject private readonly component: TimerComponent,
      @Inject private readonly coreThread: CoreThreadComponent,
   ) {
      coreThread.canvasLoaded$.subscribe(() => component.enable());
   }
}
