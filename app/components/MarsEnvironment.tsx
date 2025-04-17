
// 'use client';
// import { KeyboardControls, PointerLockControls, Html } from '@react-three/drei'
// import { useKeyboardControls } from '@react-three/drei'

// import { useRef, useEffect, useState, useMemo } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls, Stars, useGLTF, Environment } from '@react-three/drei';
// import * as THREE from 'three';



// // Mars environment with authentic terrain and effects
// function MarsScene({ isInteractive }: { isInteractive: boolean }) {
//   const groundRef = useRef<THREE.Mesh>(null);
//   const { scene: concertStage } = useGLTF('/concert-stage.glb');
//   const [time, setTime] = useState(0);
//   const { camera } = useThree();
//   const controlsRef = useRef<any>(null);

//   // Set initial camera position
//   useEffect(() => {
//     camera.position.set(-6000, -970, 780);
//     camera.lookAt(40, 50, 80);
//     if (controlsRef.current) {
//       controlsRef.current.target.set(40, 0, 80);
//       controlsRef.current.update();
//     }
//   }, [camera]);

//   // Update time for dynamic effects
//   useFrame(({ clock }) => {
//     setTime(clock.getElapsedTime());
//   });

//   // Scale and position the concert stage
//   useEffect(() => {
//     if (concertStage) {
//       const scale = 1.0;
//       concertStage.scale.set(scale, scale, scale);
//       concertStage.position.set(40, 0, 180);
//       concertStage.rotation.set(0, Math.PI, 0);

//       concertStage.traverse((child) => {
//         if (child instanceof THREE.Mesh) {
//           child.material = new THREE.MeshStandardMaterial({
//             color: '#E0E0E0',
//             metalness: 0.7,
//             roughness: 0.3,
//             envMapIntensity: 0.5,
//             emissive: '#404040',
//             emissiveIntensity: 0.2,
//           });
//         }
//       });
//     }
//   }, [concertStage]);

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight
//         position={[10, 10, 5]}
//         intensity={1.5}
//         castShadow
//         color="#FFD580"
//       />
//       <spotLight
//         position={[0, 20, 0]}
//         intensity={1.0}
//         color="#FFFFFF"
//         angle={Math.PI / 4}
//         penumbra={0.5}
//         castShadow
//       />
//       <Environment preset="dawn" />
//       <fog attach="fog" args={['#C46D3D', 400 + Math.sin(time * 0.2) * 50, 800 + Math.cos(time * 0.1) * 100]} />

//       <MarsianTerrain ref={groundRef} />
//       <primitive object={concertStage} />
//       <DustParticles />

//       <Stars
//         radius={100}
//         depth={100}
//         count={5000}
//         factor={6}
//         saturation={2}
//         fade
//         speed={2}
//       />

//       <OrbitControls
//         ref={controlsRef}
//         enablePan={isInteractive}
//         enableZoom={isInteractive}
//         enableRotate={isInteractive}
//         minDistance={80}
//         maxDistance={400}
//         minPolarAngle={Math.PI * 0.1}
//         maxPolarAngle={Math.PI * 0.5}
//         target={[40, 0, 180]}
//         makeDefault
//       />
//     </>
//   );
// }

// // Detailed Mars terrain with craters and texture
// const MarsianTerrain = ({ ...props }) => {
//   const displacementTexture = useMemo(() => {
//     const size = 512;
//     const data = new Float32Array(size * size);
//     const canvas = document.createElement('canvas');
//     canvas.width = size;
//     canvas.height = size;
//     const ctx = canvas.getContext('2d');

//     if (!ctx) return null;

//     const gradient = ctx.createLinearGradient(0, 0, size, size);
//     gradient.addColorStop(0, '#9C4A2D');
//     gradient.addColorStop(0.5, '#C34517');
//     gradient.addColorStop(1, '#8B3A1D');

//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, size, size);

//     for (let y = 0; y < size; y++) {
//       for (let x = 0; x < size; x++) {
//         const noise = Math.random() * 0.1;
//         const value = Math.max(0, Math.min(1, noise));
//         data[y * size + x] = value;

//         if (Math.random() < 0.001) {
//           const radius = 5 + Math.random() * 20;
//           ctx.beginPath();
//           ctx.arc(x, y, radius, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(60, 30, 15, ${0.7 + Math.random() * 0.3})`;
//           ctx.fill();

//           ctx.beginPath();
//           ctx.arc(x, y, radius * 1.1, 0, Math.PI * 2);
//           ctx.strokeStyle = '#BB5533';
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         }

//         if (Math.random() < 0.0005) {
//           const length = 10 + Math.random() * 40;
//           const angle = Math.random() * Math.PI * 2;
//           ctx.beginPath();
//           ctx.moveTo(x, y);
//           ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
//           ctx.strokeStyle = '#7A3A25';
//           ctx.lineWidth = 1 + Math.random();
//           ctx.stroke();
//         }
//       }
//     }

//     const texture = new THREE.CanvasTexture(canvas);
//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//     return texture;
//   }, []);

//   const normalTexture = useMemo(() => {
//     const size = 512;
//     const canvas = document.createElement('canvas');
//     canvas.width = size;
//     canvas.height = size;
//     const ctx = canvas.getContext('2d');

//     if (!ctx) return null;

//     ctx.fillStyle = '#8080ff';
//     ctx.fillRect(0, 0, size, size);

//     for (let i = 0; i < 500; i++) {
//       const x = Math.random() * size;
//       const y = Math.random() * size;
//       const radius = 3 + Math.random() * 10;
//       const r = 128 + Math.random() * 40 - 20;
//       const g = 128 + Math.random() * 40 - 20;
//       const b = 255;

//       const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
//       gradient.addColorStop(0, `rgb(${r},${g},${b})`);
//       gradient.addColorStop(1, '#8080ff');

//       ctx.beginPath();
//       ctx.arc(x, y, radius, 0, Math.PI * 2);
//       ctx.fillStyle = gradient;
//       ctx.fill();
//     }

//     const texture = new THREE.CanvasTexture(canvas);
//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//     return texture;
//   }, []);

//   const meshRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.z = clock.getElapsedTime() * 0.03;
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       rotation={[-Math.PI / 2, 0, 0]}
//       position={[0, -3, 0]}
//       receiveShadow
//       {...props}
//     >
//       <planeGeometry args={[1000, 1000, 128, 128]} />
//       <meshStandardMaterial
//         color="#9C4A2D"
//         displacementMap={displacementTexture || undefined}
//         displacementScale={1.5}
//         normalMap={normalTexture || undefined}
//         roughness={1}
//         metalness={0.1}
//         bumpMap={displacementTexture || undefined}
//         bumpScale={0.5}
//         side={THREE.FrontSide}
//       />
//     </mesh>
//   );
// };

// function DustParticles() {
//   const [particles, setParticles] = useState<THREE.Points>();
//   const { viewport } = useThree();

//   useEffect(() => {
//     const particleCount = 1000;
//     const positions = new Float32Array(particleCount * 3);

//     for (let i = 0; i < particleCount; i++) {
//       const i3 = i * 3;
//       positions[i3] = (Math.random() - 0.5) * viewport.width * 2;
//       positions[i3 + 1] = Math.random() * 10;
//       positions[i3 + 2] = (Math.random() - 0.5) * viewport.width * 2;
//     }

//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//     const material = new THREE.PointsMaterial({
//       size: 0.05,
//       color: '#D88D5A',
//       transparent: true,
//       opacity: 0.6
//     });

//     setParticles(new THREE.Points(geometry, material));
//   }, [viewport]);

//   useFrame(({ clock }) => {
//     if (particles) {
//       const positions = particles.geometry.attributes.position.array as Float32Array;
//       const time = clock.getElapsedTime();

//       for (let i = 0; i < positions.length; i += 3) {
//         positions[i] += Math.sin(time * 0.1 + i * 0.01) * 0.01;
//         if (positions[i] > viewport.width) positions[i] = -viewport.width;
//       }

//       particles.geometry.attributes.position.needsUpdate = true;
//     }
//   });

//   return particles ? <primitive object={particles} /> : null;
// }

// export default function MarsEnvironment({ isInteractive = true }: { isInteractive?: boolean }) {
//   return (
//     <div className="fixed inset-0 z-0">
//       <Canvas
//         shadows
//         camera={{
//           position: [120, 100, 180],
//           fov: 45,
//           near: 0.1,
//           far: 1000
//         }}
//         style={{ background: 'linear-gradient(to top, #421309, #8B3A1D)' }}
//       >
//         <MarsScene isInteractive={isInteractive} />
//       </Canvas>
//     </div>
//   );
// }



















'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF, Environment, KeyboardControls, PointerLockControls, Html, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

type KeyboardControlsState = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  jump: boolean
}

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] }
] as const;

function TutorialWrapper({ setVisible }) {
  // This is a simpler approach without context or complex state management
  const [currentStep, setCurrentStep] = useState(1);

  // Auto-advance tutorial after a delay
  useEffect(() => {
    if (currentStep <= 3) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 6000); // Show each step for 6 seconds
      return () => clearTimeout(timer);
    } else if (currentStep === 4) {
      // Final tip shows for a shorter time
      const timer = setTimeout(() => {
        setVisible(false); // Hide tutorial completely using parent state
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, setVisible]);

  // Tutorial content based on current step
  if (currentStep === 1) {
    return <p><strong>STEP 1:</strong> Click and drag to look around</p>;
  } else if (currentStep === 2) {
    return <p><strong>STEP 2:</strong> Use WASD or arrow keys to move around</p>;
  } else if (currentStep === 3) {
    return <p><strong>STEP 3:</strong> Press SPACE to jump</p>;
  } else if (currentStep === 4) {
    return <p><strong>TIP:</strong> Press ESC to see your cursor and exit first-person mode</p>;
  } else {
    return null;
  }
}

// Wrapper component for the tutorial text
function TutorialText({ setVisible }) {
  return <TutorialWrapper setVisible={setVisible} />;
}

function FirstPersonControls() {
  const { camera, scene } = useThree();
  const [, get] = useKeyboardControls<KeyboardControlsState>();
  const velocity = useRef(new THREE.Vector3());
  const moveSpeed = 40;
  const jumpForce = 60;
  const gravity = 90;
  const isOnGround = useRef(false);
  const raycaster = useRef(new THREE.Raycaster());
  const objectsToCollideWith = useRef<THREE.Object3D[]>([]);
  const jumpCooldown = useRef(false);
  const playerHeight = 3;
  const groundCheckDistance = 0.2;
  const cameraHeight = 1.7; // Adjusted to be more realistic

  // Maximum falling velocity
  const MAX_FALL_SPEED = -30;

  // Collision detection
  const playerRadius = 1.0;
  const collisionRaycasters = useRef<THREE.Raycaster[]>([]);

  useEffect(() => {
    // Create more directions for better coverage (including diagonals)
    const directions = [
      new THREE.Vector3(1, 0, 0),    // right
      new THREE.Vector3(-1, 0, 0),   // left
      new THREE.Vector3(0, 0, 1),    // forward
      new THREE.Vector3(0, 0, -1),   // backward
      new THREE.Vector3(1, 0, 1).normalize(),    // forward-right
      new THREE.Vector3(-1, 0, 1).normalize(),   // forward-left
      new THREE.Vector3(1, 0, -1).normalize(),   // backward-right
      new THREE.Vector3(-1, 0, -1).normalize(),  // backward-left
      // Add raycasters that check slightly upward and downward for angled surfaces
      new THREE.Vector3(1, 0.2, 0).normalize(),    // right-up
      new THREE.Vector3(-1, 0.2, 0).normalize(),   // left-up
      new THREE.Vector3(0, 0.2, 1).normalize(),    // forward-up
      new THREE.Vector3(0, 0.2, -1).normalize(),   // backward-up
      new THREE.Vector3(1, -0.2, 0).normalize(),   // right-down
      new THREE.Vector3(-1, -0.2, 0).normalize(),  // left-down
      new THREE.Vector3(0, -0.2, 1).normalize(),   // forward-down
      new THREE.Vector3(0, -0.2, -1).normalize(),  // backward-down
    ];

    collisionRaycasters.current = directions.map(dir => {
      const raycaster = new THREE.Raycaster();
      raycaster.far = playerRadius + 0.3; // Slightly increased collision distance
      return raycaster;
    });
  }, []);

  // Get all collidable objects and ensure they're properly set up for collision
  useEffect(() => {
    const collidableObjects: THREE.Object3D[] = [];
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        // Force all meshes to be collidable
        object.userData.isCollidable = true;

        // Make sure the geometry has computed vertex normals for proper collision detection
        if (object.geometry && !object.geometry.attributes.normal) {
          object.geometry.computeVertexNormals();
        }

        collidableObjects.push(object);

        // For debugging collision objects - uncomment to see collision boxes
        // const box = new THREE.Box3().setFromObject(object);
        // const helper = new THREE.Box3Helper(box, new THREE.Color(0xff0000));
        // scene.add(helper);
      }
    });
    objectsToCollideWith.current = collidableObjects;
    console.log("Collidable objects:", collidableObjects.length);
  }, [scene]);

  useFrame((_, delta) => {
    const { forward, backward, left, right, jump } = get();

    // Movement
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward));
    const sideVector = new THREE.Vector3(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(moveSpeed)
      .applyEuler(camera.rotation);

    // Apply gravity with max fall speed
    velocity.current.y = Math.max(velocity.current.y - gravity * delta, MAX_FALL_SPEED);

    // Enhanced ground detection - send multiple rays for better coverage
    const groundRays = [
      { origin: new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z), direction: new THREE.Vector3(0, -1, 0) },
      { origin: new THREE.Vector3(camera.position.x + 0.3, camera.position.y, camera.position.z), direction: new THREE.Vector3(0, -1, 0) },
      { origin: new THREE.Vector3(camera.position.x - 0.3, camera.position.y, camera.position.z), direction: new THREE.Vector3(0, -1, 0) },
      { origin: new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z + 0.3), direction: new THREE.Vector3(0, -1, 0) },
      { origin: new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z - 0.3), direction: new THREE.Vector3(0, -1, 0) },
    ];

    // Find the closest ground intersection
    let closestGroundIntersect = null;
    let closestDistance = Infinity;

    for (const ray of groundRays) {
      raycaster.current.set(
        ray.origin,
        ray.direction
      );
      raycaster.current.far = playerHeight + groundCheckDistance;

      const intersects = raycaster.current.intersectObjects(objectsToCollideWith.current, true);
      const groundIntersect = intersects[0]; // Get the closest intersection

      if (groundIntersect && groundIntersect.distance < closestDistance) {
        closestGroundIntersect = groundIntersect;
        closestDistance = groundIntersect.distance;
      }
    }

    // Check if we're on ground based on the closest intersection
    if (closestGroundIntersect) {
      // How far the player's "feet" are from the ground
      const distanceToGround = closestDistance;
      const shouldBeOnGround = distanceToGround <= playerHeight + groundCheckDistance;

      if (shouldBeOnGround) {
        isOnGround.current = true;

        // Stop falling when we hit the ground
        if (velocity.current.y < 0) {
          velocity.current.y = 0;
        }

        // Only adjust height when falling or standing
        if (velocity.current.y <= 0) {
          // Set player to stand on the ground with proper height
          camera.position.y = closestGroundIntersect.point.y + playerHeight / 2;
        }
      } else {
        isOnGround.current = false;
      }
    } else {
      isOnGround.current = false;
    }

    // Handle jumping - only when on ground and not in cooldown
    if (jump && isOnGround.current && !jumpCooldown.current) {
      velocity.current.y = jumpForce;
      isOnGround.current = false;
      jumpCooldown.current = true;
      setTimeout(() => {
        jumpCooldown.current = false;
      }, 500);
    }

    // Enhanced collision detection with objects
    let canMoveX = true;
    let canMoveZ = true;
    let slideAlongSurface = true; // Allow sliding along surfaces by default

    // Get the intended movement direction (before applying constraints)
    const intendedMove = direction.clone().multiplyScalar(delta);

    // Test all directions for collisions
    for (let i = 0; i < collisionRaycasters.current.length; i++) {
      const raycaster = collisionRaycasters.current[i];

      // Update raycaster origin and direction
      raycaster.set(
        camera.position,
        raycaster.ray.direction
      );

      // Check for collisions
      const collisions = raycaster.intersectObjects(objectsToCollideWith.current, true);

      if (collisions.length > 0 && collisions[0].distance < playerRadius) {
        // Determine which direction to block based on collision normal and ray direction
        const collisionNormal = collisions[0].face?.normal.clone() || new THREE.Vector3(0, 1, 0);
        // Convert normal from object space to world space
        collisionNormal.transformDirection(collisions[0].object.matrixWorld);

        // Calculate how much the movement is in the direction of the collision
        const moveDot = intendedMove.dot(collisionNormal);

        // If we're moving into the surface (negative dot product), block that component
        if (moveDot < 0) {
          const xDot = Math.abs(collisionNormal.x);
          const zDot = Math.abs(collisionNormal.z);

          // Block movement in directions that would cause collision
          if (xDot > 0.5) canMoveX = false;
          if (zDot > 0.5) canMoveZ = false;

          // For angled surfaces, potentially block both
          if (xDot > 0.3 && zDot > 0.3) {
            slideAlongSurface = true;
          }
        }
      }
    }

    // Update position with collision constraints
    if (canMoveX) {
      camera.position.x += direction.x * delta;
    }

    if (canMoveZ) {
      camera.position.z += direction.z * delta;
    }

    // Always apply Y movement (gravity and jumping)
    camera.position.y += velocity.current.y * delta;

    // Safety check - reset if fall too far
    if (camera.position.y < -50) {
      camera.position.set(40, 10, 50);
      velocity.current.set(0, 0, 0);
    }
  });

  return null;
}

function MarsScene({ isInteractive }: { isInteractive: boolean }) {
  const groundRef = useRef<THREE.Mesh>(null);
  const { scene: concertStage } = useGLTF('/concert-stage.glb');
  const [time, setTime] = useState(0);
  const [firstPerson, setFirstPerson] = useState(false);
  const [tutorialVisible, setTutorialVisible] = useState(true);
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Set initial camera position
  useEffect(() => {
    if (firstPerson) {
      camera.position.set(40, 10, 50); // Start slightly above ground
    } else {
      camera.position.set(-6000, -970, 780);
      camera.lookAt(40, 50, 80);
    }

    if (controlsRef.current) {
      controlsRef.current.target.set(40, 0, 80);
      controlsRef.current.update();
    }
  }, [camera, firstPerson]);

  // Update time for dynamic effects
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  // Scale and position the concert stage
  useEffect(() => {
    if (concertStage) {
      const scale = 1.0;
      concertStage.scale.set(scale, scale, scale);
      concertStage.position.set(40, 0, 180);
      concertStage.rotation.set(0, Math.PI, 0);

      // Add collision boxes for stage elements with enhanced collider setup
      concertStage.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Mark all meshes as collidable
          child.userData.isCollidable = true;

          // Make sure geometry has computed vertex normals for proper collision
          if (child.geometry && !child.geometry.attributes.normal) {
            child.geometry.computeVertexNormals();
          }

          // Make sure the bounding box is computed
          if (!child.geometry.boundingBox) {
            child.geometry.computeBoundingBox();
          }

          // Create bounding box helper for collision - uncomment for debugging
          // const box = new THREE.Box3().setFromObject(child);
          // const helper = new THREE.Box3Helper(box, new THREE.Color(0xff0000));
          // scene.add(helper);

          child.material = new THREE.MeshStandardMaterial({
            color: '#E0E0E0',
            metalness: 0.7,
            roughness: 0.3,
            envMapIntensity: 0.5,
            emissive: '#404040',
            emissiveIntensity: 0.2,
          });
        }
      });
    }
  }, [concertStage]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        color="#FFD580"
      />
      <spotLight
        position={[0, 20, 0]}
        intensity={1.0}
        color="#FFFFFF"
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
      />
      <Environment preset="dawn" />
      <fog attach="fog" args={['#C46D3D', 400 + Math.sin(time * 0.2) * 50, 800 + Math.cos(time * 0.1) * 100]} />

      <MarsianTerrain ref={groundRef} />
      <primitive object={concertStage} />
      <DustParticles />

      <Stars
        radius={100}
        depth={100}
        count={5000}
        factor={6}
        saturation={2}
        fade
        speed={2}
      />

      {!firstPerson && (
        <Html center>
          <button
            onClick={() => setFirstPerson(true)}
            style={{
              padding: '12px 24px',
              background: '#FF6B00',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transform: 'translateY(-50px)'
            }}
          >
            Enter Concert (First Person)
          </button>
        </Html>
      )}

      {firstPerson ? (
        <>
          <FirstPersonControls />
          <PointerLockControls />
          {tutorialVisible && (
            <Html
              center
              fullscreen
            >
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '500px',
                color: 'white',
                textAlign: 'center',
                pointerEvents: 'none',
                fontFamily: 'Arial, sans-serif',
                fontSize: '24px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '20px 30px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                zIndex: 1000
              }}
                id="tutorial-text"
              >
                <TutorialText setVisible={setTutorialVisible} />
              </div>
            </Html>
          )}
        </>
      ) : (
        <OrbitControls
          ref={controlsRef}
          enablePan={isInteractive}
          enableZoom={isInteractive}
          enableRotate={isInteractive}
          minDistance={80}
          maxDistance={400}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.5}
          target={[40, 0, 180]}
          makeDefault
        />
      )}
    </>
  );
}

const MarsianTerrain = ({ ...props }) => {
  const displacementTexture = useMemo(() => {
    const size = 512;
    const data = new Float32Array(size * size);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#9C4A2D');
    gradient.addColorStop(0.5, '#C34517');
    gradient.addColorStop(1, '#8B3A1D');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const noise = Math.random() * 0.1;
        const value = Math.max(0, Math.min(1, noise));
        data[y * size + x] = value;

        if (Math.random() < 0.001) {
          const radius = 5 + Math.random() * 20;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(60, 30, 15, ${0.7 + Math.random() * 0.3})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, radius * 1.1, 0, Math.PI * 2);
          ctx.strokeStyle = '#BB5533';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (Math.random() < 0.0005) {
          const length = 10 + Math.random() * 40;
          const angle = Math.random() * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
          ctx.strokeStyle = '#7A3A25';
          ctx.lineWidth = 1 + Math.random();
          ctx.stroke();
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  const normalTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    ctx.fillStyle = '#8080ff';
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 500; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = 3 + Math.random() * 10;
      const r = 128 + Math.random() * 40 - 20;
      const g = 128 + Math.random() * 40 - 20;
      const b = 255;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgb(${r},${g},${b})`);
      gradient.addColorStop(1, '#8080ff');

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, 0]}
      receiveShadow
      userData={{ isCollidable: true, isGround: true }} // Mark terrain as collidable and as ground
      {...props}
    >
      <planeGeometry args={[1000, 1000, 128, 128]} />
      <meshStandardMaterial
        color="#9C4A2D"
        displacementMap={displacementTexture || undefined}
        displacementScale={1.5}
        normalMap={normalTexture || undefined}
        roughness={1}
        metalness={0.1}
        bumpMap={displacementTexture || undefined}
        bumpScale={0.5}
        side={THREE.FrontSide}
      />
    </mesh>
  );
};

function DustParticles() {
  const [particles, setParticles] = useState<THREE.Points>();
  const { viewport } = useThree();

  useEffect(() => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i3 + 1] = Math.random() * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * viewport.width * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: '#D88D5A',
      transparent: true,
      opacity: 0.6
    });

    setParticles(new THREE.Points(geometry, material));
  }, [viewport]);

  useFrame(({ clock }) => {
    if (particles) {
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const time = clock.getElapsedTime();

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(time * 0.1 + i * 0.01) * 0.01;
        if (positions[i] > viewport.width) positions[i] = -viewport.width;
      }

      particles.geometry.attributes.position.needsUpdate = true;
    }
  });

  return particles ? <primitive object={particles} /> : null;
}

export default function MarsEnvironment({ isInteractive = true }: { isInteractive?: boolean }) {
  return (
    <KeyboardControls map={keyboardMap}>
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          camera={{
            position: [120, 100, 180],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          style={{ background: 'linear-gradient(to top, #421309, #8B3A1D)' }}
        >
          <MarsScene isInteractive={isInteractive} />
        </Canvas>
      </div>
    </KeyboardControls>
  );
}