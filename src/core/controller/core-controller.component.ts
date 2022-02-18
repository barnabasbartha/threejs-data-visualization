import {Singleton} from "typescript-ioc";
import {ControllerEventType, DynamicControllerEvent} from "../../common/controller/controller.model";
import {Observable, Subject} from "rxjs";
import {Vector2} from "../../common/event.model";
import {filter, map} from "rxjs/operators";

@Singleton
export class CoreControllerComponent {
   private readonly sendEventSubject = new Subject<DynamicControllerEvent>();

   readonly windowResized$: Observable<Vector2>;

   constructor() {
      this.windowResized$ = this.sendEventSubject.pipe(
         filter(event => event.type === ControllerEventType.WindowResize),
         map(event => event.value as Vector2),
      );
   }

   sendEvent(event: DynamicControllerEvent) {
      this.sendEventSubject.next(event);
   }
}
