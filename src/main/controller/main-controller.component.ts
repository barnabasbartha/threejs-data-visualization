import {Inject, Singleton} from 'typescript-ioc';
import {ControllerComponent} from "./controller.component";
import {merge, Observable} from "rxjs";
import {ControllerEvent, ControllerEventType, DynamicControllerEvent} from "../../common/controller/controller.model";
import {map} from "rxjs/operators";
import {Vector2} from "../../common/event.model";

@Singleton
export class MainControllerComponent {
   readonly event$: Observable<DynamicControllerEvent>;

   constructor(
      @Inject private readonly controller: ControllerComponent,
   ) {
      this.event$ = merge(
         controller.key$.pipe(
            map(keyboardEvent => ({
               type: ControllerEventType.Key,
               status: keyboardEvent.status,
               value: keyboardEvent.key,
            } as ControllerEvent<string>)),
         ),
         controller.mouseMove$.pipe(
            map(mouseMoveEvent => ({
               type: ControllerEventType.MouseMove,
               value: mouseMoveEvent,
            } as ControllerEvent<Vector2>)),
         ),
         controller.resize$.pipe(
            map(resizeEvent => ({
               type: ControllerEventType.WindowResize,
               value: resizeEvent,
            } as ControllerEvent<Vector2>)),
         ),
      );
   }
}
