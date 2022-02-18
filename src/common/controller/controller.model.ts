import {EventStatus} from '../event.model';

export enum ControllerEventType {
   Key,
   MouseMove,
   WindowResize,
}

export type DynamicControllerEvent = ControllerEvent<unknown>;

export interface ControllerEvent<T> {
   type: ControllerEventType;
   status?: EventStatus;
   value: T;
}

export interface KeyEvent {
   status: EventStatus;
   key: string;
}

export const leftMouseKey = "0";
export const middleMouseKey = "1";
export const rightMouseKey = "2";
