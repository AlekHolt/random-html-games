/* scout-drone · Phobos · v1 · shared
   Reference asset for the pipeline: a small hovering scout drone in the house style.
   Dark flat-shaded hull, emissive cyan eye + strips, four ducted rotors.
   Budget technique: every static part is merged into 2 meshes (vertex-coloured hull + emissive glow),
   and the four rotors are one InstancedMesh → 3 draw calls total. */
(window.PHOBOS_ASSETS = window.PHOBOS_ASSETS || {})['scout-drone'] = (() => {
  // Merge transformed geometries into one non-indexed BufferGeometry with per-part vertex colours.
  // r128 has no BufferGeometryUtils in the core build, so this stays inline (copy it with the asset).
  function merge(THREE, parts) {
    const pos = [], nor = [], col = [], c = new THREE.Color();
    for (const p of parts) {
      const g = (p.geo.index ? p.geo.toNonIndexed() : p.geo.clone()).applyMatrix4(p.matrix);
      const P = g.attributes.position.array, N = g.attributes.normal.array;
      c.set(p.color || '#ffffff');
      for (let i = 0; i < P.length; i += 3) { pos.push(P[i], P[i + 1], P[i + 2]); nor.push(N[i], N[i + 1], N[i + 2]); col.push(c.r, c.g, c.b); }
      g.dispose();
    }
    const out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    return out;
  }

  const cache = {};
  const ROTORS = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz]) => [sx * 0.78, 0.1, sz * 0.62]);

  const def = {
    meta: {
      name: 'Scout Drone', scope: 'shared', version: 1, budget: 'actor',
      scale: '1 unit = 1 m · nose points -Z · origin at centre of mass',
      palette: ['#1a2338', '#2f3d5e', '#4ff2ff'],
      options: { hull: 'hull colour (hex)', accent: 'emissive colour (hex)', lights: 'bool, emissive on/off' },
    },

    build(THREE, opts = {}) {
      const o = { hull: '#1a2338', trim: '#2f3d5e', accent: '#4ff2ff', lights: true, ...opts };
      const key = JSON.stringify(o);
      if (!cache[key]) {
        const dummy = new THREE.Object3D();
        const at = (geo, color, p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1]) => {
          dummy.position.set(...p); dummy.rotation.set(...r); dummy.scale.set(...s); dummy.updateMatrix();
          return { geo, color, matrix: dummy.matrix.clone() };
        };
        const H = o.hull, T = o.trim;

        // Hull: squashed octahedral pod, spine plate, belly keel, eye bezel, arms, ducts.
        const hull = [
          at(new THREE.OctahedronGeometry(0.5, 1), H, [0, 0, 0], [0, 0, 0], [1.1, 0.55, 1.5]),
          at(new THREE.BoxGeometry(0.34, 0.08, 1.1), T, [0, 0.27, 0.05]),
          at(new THREE.BoxGeometry(0.16, 0.12, 0.8), T, [0, -0.27, 0.1]),
          at(new THREE.CylinderGeometry(0.17, 0.2, 0.12, 10), T, [0, 0.02, -0.68], [Math.PI / 2, 0, 0]),
        ];
        for (const [x, y, z] of ROTORS) {
          const len = Math.hypot(x, z), a = Math.atan2(-z, x);           // aim the arm's +X at the rotor hub
          hull.push(at(new THREE.BoxGeometry(len * 0.62, 0.06, 0.1), T, [x * 0.6, 0.06, z * 0.6], [0, a, 0]));
          hull.push(at(new THREE.TorusGeometry(0.26, 0.045, 6, 14), H, [x, y, z], [Math.PI / 2, 0, 0]));
          hull.push(at(new THREE.CylinderGeometry(0.035, 0.035, 0.1, 6), T, [x, y, z]));   // hub
        }

        // Glow: sensor eye, side strips, nav lights under each hub.
        const glow = [
          at(new THREE.SphereGeometry(0.12, 10, 8), null, [0, 0.02, -0.74], [0, 0, 0], [1, 1, 0.6]),
          ...[-1, 1].map(s => at(new THREE.BoxGeometry(0.03, 0.035, 0.7), null, [s * 0.5, 0.02, 0.05], [0, s * 0.12, 0])),
          ...ROTORS.map(([x, , z]) => at(new THREE.CylinderGeometry(0.025, 0.025, 0.05, 6), null, [x, 0.02, z])),
        ];

        // Rotor: two crossed blades, one geometry shared by 4 instances.
        const blade = new THREE.BoxGeometry(0.46, 0.012, 0.06);
        cache[key] = {
          hullGeo: merge(THREE, hull),
          glowGeo: merge(THREE, glow),
          rotorGeo: merge(THREE, [at(blade, null), at(blade, null, [0, 0, 0], [0, Math.PI / 2, 0])]),
          hullMat: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .6, metalness: .45, flatShading: true }),
          glowMat: new THREE.MeshStandardMaterial({ color: '#05070e', emissive: o.accent, emissiveIntensity: o.lights ? 2.4 : 0, flatShading: true }),
          rotorMat: new THREE.MeshStandardMaterial({ color: '#8094bb', roughness: .4, metalness: .7, transparent: true, opacity: .55, depthWrite: false }),
        };
        [...hull, ...glow].forEach(p => p.geo.dispose()); blade.dispose();
      }
      const k = cache[key];

      const g = new THREE.Group(); g.name = 'scoutDrone';
      const hullMesh = new THREE.Mesh(k.hullGeo, k.hullMat); hullMesh.name = 'hull';
      const glowMesh = new THREE.Mesh(k.glowGeo, k.glowMat); glowMesh.name = 'glow';
      const rotors = new THREE.InstancedMesh(k.rotorGeo, k.rotorMat, ROTORS.length); rotors.name = 'rotors';
      g.add(hullMesh, glowMesh, rotors);
      animate(g, 0);
      return g;
    },

    update: animate,
  };
  return def;

  function animate(obj, t) {
    const rotors = obj.getObjectByName('rotors');
    if (rotors) {
      const m = rotors.instanceMatrix, e = Math.cos, s = Math.sin;
      ROTORS.forEach(([x, y, z], i) => {
        const a = t * 38 * (i % 2 ? 1 : -1), c = e(a), sn = s(a);
        // Rotation about Y + translation, written directly into the instance matrix (column-major).
        m.array.set([c, 0, -sn, 0, 0, 1, 0, 0, sn, 0, c, 0, x, y, z, 1], i * 16);
      });
      m.needsUpdate = true;
    }
    obj.position.y = Math.sin(t * 1.6) * 0.05;   // idle hover bob
    obj.rotation.z = Math.sin(t * 0.9) * 0.03;
  }
})();
