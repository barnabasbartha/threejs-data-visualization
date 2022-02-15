import {spawn, Worker} from 'threads/dist';
import {CoreThread} from '../core/core-thread';
import './main.scss';
import {Container, Singleton} from 'typescript-ioc';
import {WorkerImplementation} from 'threads/dist/types/master';

@Singleton
class Main {
   private canvas: HTMLCanvasElement;
   private coreThread?: CoreThread;

   constructor() {
      this.initCanvas();
      this.initCoreThread();
      console.log('Main thread OK');
   }

   private async initThread<T>(worker: WorkerImplementation): Promise<[T, WorkerImplementation]> {
      // @ts-ignore
      const thread = ((await spawn<unknown>(worker)) as unknown) as T;
      return [thread, worker];
   }

   private initCanvas(): void {
      this.canvas = document.createElement('canvas');
      document.body.appendChild(this.canvas);
   }

   private initCoreThread(): void {
      // @ts-ignore
      const offscreenCanvas = this.canvas.transferControlToOffscreen();
      offscreenCanvas.width = this.canvas.clientWidth;
      offscreenCanvas.height = this.canvas.clientHeight;
      this.initThread<CoreThread>(new Worker('../core/core-thread'))
         .then(([coreThread, coreWorker]) => {
            this.coreThread = coreThread;
            console.log('Core thread created');
            this.initComponents();
            coreWorker.postMessage({canvas: offscreenCanvas}, [offscreenCanvas]);
         });
   }

   private initComponents(): void {
   }
}

Container.get(Main);
