import {Singleton} from "typescript-ioc";
import {CoreThreadManager} from "../core/core-thread.manager";
import {Worker} from "threads";
import {initThread} from "./main-thread.component.utils";
import {Subject} from "rxjs";
import {DynamicControllerEvent} from "../common/controller/controller.model";

@Singleton
export class MainThreadComponent {
   private readonly coreThreadLoadedSubject = new Subject<void>();
   readonly coreThreadLoaded$ = this.coreThreadLoadedSubject.asObservable();

   private coreThread?: CoreThreadManager;

   initCoreThread(canvas: HTMLCanvasElement) {
      // @ts-ignore
      const offscreenCanvas = canvas.transferControlToOffscreen();
      offscreenCanvas.width = canvas.clientWidth;
      offscreenCanvas.height = canvas.clientHeight;
      initThread<CoreThreadManager>(new Worker('../core/core-thread.manager'))
         .then(([coreThread, coreWorker]) => {
            this.coreThread = coreThread;
            coreWorker.postMessage({canvas: offscreenCanvas}, [offscreenCanvas]);
            this.coreThreadLoadedSubject.next();
         });
   }

   sendEvent(event: DynamicControllerEvent) {
      this.coreThread?.sendEvent(event);
   }
}
