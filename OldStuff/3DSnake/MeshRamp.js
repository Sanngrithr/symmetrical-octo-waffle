"use strict";
var Snake3D;
(function (Snake3D) {
    /**
     *  ```plaintext
     * Generate a simple ramp, fitting into a unitcube (sidelength 1)
     *              0_____3
     *             /|    /|
     *            / |   / |
     *           /__4__/__5
     *          1     2
     * ```
     * @authors Tomislav Sever, HFU, 2020
     */
    var f = FudgeCore;
    class MeshRamp extends f.Mesh {
        constructor() {
            super();
        }
        createVertices() {
            let vertices = new Float32Array([
                // front
                /*0*/ -1, 1, -1, /*1*/ -1, -1, 1, /*2*/ 1, -1, 1, /*3*/ 1, 1, -1,
                // back
                /*4*/ -1, -1, -1, /* 5*/ 1, -1, -1,
                //additional points for uv and normals
                /*6=1*/ -1, -1, 1, /*7=2*/ 1, -1, 1
            ]);
            // scale down to a length of 1 for outer edges
            vertices = vertices.map(_value => _value / 2);
            return vertices;
        }
        createIndices() {
            let indices = new Uint16Array([
                // front
                1, 2, 0, 2, 3, 0,
                // right tri
                2, 5, 3,
                // back
                5, 4, 3, 4, 0, 3,
                // left tri
                0, 4, 1,
                // bottom
                5, 4, 1, 5, 2, 1
            ]);
            return indices;
        }
        createTextureUVs() {
            let textureUVs = new Float32Array([
                /*0*/ 2, 1, /*1*/ 0, 1, /*2*/ 0, 0, /*3*/ 2, 0,
                // back
                /*4*/ 1, 1, /*5*/ 1, 0, /*6*/ 2, 0, /*7*/ 2, 1
            ]);
            return textureUVs;
        }
        createFaceNormals() {
            let normals = new Float32Array([
                // for each triangle, the last vertex of the three defining refers to the normalvector when using flat shading
                // First wrap
                // front
                /*0*/ 0, 1, 1, /*1*/ 0, -1, 0, /*2*/ 0, -1, 0, /*3*/ 0, 0, -1,
                // back
                /*4*/ 0, 0, 0, /*5*/ 0, 0, 0,
                /*6*/ -1, 0, 0, /*7*/ 1, 0, 0
            ]);
            //normals = this.createVertices();
            return normals;
        }
    }
    MeshRamp.iSubclass = f.Mesh.registerSubclass(MeshRamp);
    Snake3D.MeshRamp = MeshRamp;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=MeshRamp.js.map