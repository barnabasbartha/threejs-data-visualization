import {Inject, Singleton} from 'typescript-ioc';
import {KeyEvent} from '../../common/controller/controller.model';
import {EventStatus, Vector2} from '../../common/event.model';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';
import {ControllerComponent} from "./controller.component";

@Singleton
export class MainControllerComponent {
   constructor(@Inject private readonly controller: ControllerComponent) {
   }

   init(){

   }
}
