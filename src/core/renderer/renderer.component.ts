import {Camera, Object3D, sRGBEncoding, WebGLRenderer,} from 'three';
import {Subject} from 'rxjs';
import {Config} from '../../config/config';
import {Singleton} from 'typescript-ioc';

@Singleton
export class RendererComponent {
   private readonly initSubject = new Subject<void>();
   readonly init$ = this.initSubject.pipe();

   private renderer?: WebGLRenderer;
   private gl?: WebGLRenderingContext;

   init(canvas: HTMLCanvasElement) {
      // @ts-ignore
      canvas['style'] = {width: canvas.width, height: canvas.height};
      this.renderer = new WebGLRenderer({
         canvas,
         context: canvas.getContext('webgl2', {
            stencil: true,
            depth: true,
            powerPreference: 'high-performance' as WebGLPowerPreference,
         } as WebGLContextAttributes) as WebGL2RenderingContext,
         powerPreference: 'high-performance',

      });
      this.renderer.autoClear = false;
      this.renderer.setPixelRatio(Config.RENDERER_PIXEL_RATIO);
      this.renderer.shadowMap.enabled = true;
      this.renderer.outputEncoding = sRGBEncoding;
      this.gl = this.renderer.getContext();
      this.initSubject.next();
   }

   setSize(width: number, height: number) {
      this.renderer?.setSize(width, height);
   }

   render(scene: Object3D, camera: Camera) {
      this.renderer?.render(scene, camera);
   }
}
