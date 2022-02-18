import {Singleton} from "typescript-ioc";
import {Subject} from "rxjs";


@Singleton
export class GuiComponent {
   private readonly canvasLoadedSubject = new Subject<HTMLCanvasElement>();
   readonly canvasLoaded$ = this.canvasLoadedSubject.asObservable();

   private canvas?: HTMLCanvasElement;

   initCanvas() {
      this.canvas = document.createElement('canvas');
      document.body.appendChild(this.canvas);
      this.canvasLoadedSubject.next(this.canvas);
   }
}
