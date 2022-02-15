import {expose} from 'threads/worker';
import {Container, Inject, Singleton} from 'typescript-ioc';
import {RendererComponent} from './renderer/renderer.component';
import {RendererManager} from './renderer/renderer.manager';
import {TimerManager} from './timer/timer.manager';

@Singleton
export class CoreThread {
   constructor(
      @Inject private readonly renderer: RendererManager,
      @Inject private readonly rendererComponent: RendererComponent,
      @Inject private readonly timer: TimerManager,
   ) {
      this.waitForCanvas();
   }

   private waitForCanvas(): void {
      onmessage = (event) => {
         const canvas: HTMLCanvasElement = event?.data?.canvas;
         if (canvas) {
            this.init(canvas);
         }
      };
   }

   private init(canvas: HTMLCanvasElement): void {
      this.rendererComponent.init(canvas);
      console.log('Core thread OK');
   }
}

const coreThread = Container.get(CoreThread);

expose({});
