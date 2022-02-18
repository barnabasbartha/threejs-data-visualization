import {Singleton} from 'typescript-ioc';
import {KeyEvent} from '../../common/controller/controller.model';
import {EventStatus, Vector2} from '../../common/event.model';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';

@Singleton
export class ControllerComponent {
   private readonly resizeObject: Vector2 = {x: 0, y: 0};
   readonly resize$: Observable<Vector2>;
   readonly key$: Observable<KeyEvent>;

   private readonly mouseMoveObject: Vector2 = {x: 0, y: 0};
   private readonly mouseMoveSubject = new Subject<Vector2>();
   readonly mouseMove$ = this.mouseMoveSubject.pipe();

   private readonly pointerLockSubject = new Subject<EventStatus>();
   readonly pointerLock$ = this.pointerLockSubject.pipe();

   constructor() {
      this.resize$ = fromEvent(window, 'resize').pipe(
         tap(() => {
            this.resizeObject.x = window.innerWidth;
            this.resizeObject.y = window.innerHeight;
         }),
         map(() => this.resizeObject),
      );

      this.key$ = merge(
         (fromEvent(window, 'keydown') as Observable<KeyboardEvent>).pipe(
            map((event) => ({
               status: EventStatus.ON,
               key: event.code,
            })),
         ),
         (fromEvent(window, 'keyup') as Observable<KeyboardEvent>).pipe(
            map((event) => ({
               status: EventStatus.OFF,
               key: event.code,
            })),
         ),
         (fromEvent(window, 'mousedown') as Observable<MouseEvent>).pipe(
            map((event) => ({
               status: EventStatus.ON,
               key: event.button.toString(),
            })),
         ),
         (fromEvent(window, 'mouseup') as Observable<MouseEvent>).pipe(
            map((event) => ({
               status: EventStatus.OFF,
               key: event.button.toString(),
            })),
         ),
      ).pipe(
         distinctUntilChanged((prev, curr) => {
            return prev.key === curr.key && prev.status === curr.status;
         }),
      );
   }

   init(canvas: HTMLElement, guiLayer: HTMLDivElement) {
      (fromEvent(canvas, 'mousemove') as Observable<MouseEvent>)
         .pipe(
            tap((event) => {
               this.mouseMoveObject.x = event.movementX;
               this.mouseMoveObject.y = event.movementY;
            }),
            map(() => this.mouseMoveObject),
         )
         .subscribe((object) => this.mouseMoveSubject.next(object));

      fromEvent(document, 'pointerlockchange')
         .pipe(
            // @ts-ignore
            map(
               () =>
                  document.pointerLockElement === canvas ||
                  // @ts-ignore
                  document.mozPointerLockElement === canvas,
            ),
            map((locked) => (locked ? EventStatus.ON : EventStatus.OFF)),
         )
         .subscribe((status) => this.pointerLockSubject.next(status));

      fromEvent(guiLayer, 'mousedown').subscribe(() => canvas.requestPointerLock());
   }
}
