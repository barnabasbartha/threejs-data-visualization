import {WorkerImplementation} from "threads/dist/types/master";
import {spawn} from "threads";

export const initThread = async <ThreadManager>(worker: WorkerImplementation): Promise<[ThreadManager, WorkerImplementation]> =>
   // @ts-ignore
   [((await spawn<unknown>(worker)) as unknown) as ThreadManager, worker];
