import {Singleton} from "typescript-ioc";
import {Subject} from "rxjs";

@Singleton
export class CoreThreadComponent {
   private readonly canvasLoadedSubject = new Subject<HTMLCanvasElement>();
   readonly canvasLoaded$ = this.canvasLoadedSubject.asObservable();

   waitForCanvas() {
      onmessage = (event) => {
         const canvas = event?.data?.canvas as HTMLCanvasElement | null;
         if (canvas) {
            this.canvasLoadedSubject.next(canvas);
         }
      };
   }
}
