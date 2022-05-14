import {Singleton} from "typescript-ioc";
import {BoxBufferGeometry, InstancedMesh, Mesh, MeshNormalMaterial, Object3D, Scene} from "three";

@Singleton
export class SceneComponent {
   private scene: Scene;
   private time = 0;

   constructor() {
      this.scene = new Scene();
   }

   getScene(): Scene {
      return this.scene;
   }

   createDefaultScene() {
      this.scene = new Scene();
      const geometry = new BoxBufferGeometry(0.2, 0.2, 0.2);
      const material = new MeshNormalMaterial();
      const mesh = new Mesh(geometry, material);
      this.scene.add(mesh);
   }


   private meshes: Object3D[] = [];
   private mesh: InstancedMesh;

   createInstancedDemoScene() {
      this.scene = new Scene();
      const geometry = new BoxBufferGeometry(0.07, 0.07, 0.07);
      const material = new MeshNormalMaterial();
      this.mesh = new InstancedMesh(geometry, material, 10000);
      this.scene.add(this.mesh);

      for (let x = 0; x < 100; x++) {
         for (let z = 0; z < 100; z++) {
            this.meshes.push(new Object3D());
         }
      }
   }

   update(delta: number) {
      this.time += 0.05 * delta;
      let i = 0;
      const sTime = Math.sin(this.time);
      for (let x = 0; x < 100; x++) {
         for (let z = 0; z < 100; z++) {
            this.meshes[i].position.set(
               x / 10 * 1.05 - 6.5,
               Math.sin(z / 10) * Math.cos(x / 10) * sTime - 2,
               z / 10 * 1.05 - 13.5,
            );
            this.meshes[i].updateMatrix();
            this.mesh.setMatrixAt(i, this.meshes[i].matrix);
            i++;
         }
      }
      this.mesh.instanceMatrix.needsUpdate = true;
   }
}
