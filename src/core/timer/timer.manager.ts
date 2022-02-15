import {Inject, Singleton} from 'typescript-ioc';
import {TimerComponent} from './timer.component';

@Singleton
export class TimerManager {
   constructor(
      @Inject private readonly component: TimerComponent,
   ) {
      component.enable();
   }
}
