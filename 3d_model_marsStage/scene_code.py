import bpy
import math

## Clear existing objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()




def add_mirror_material(obj):
    mat = bpy.data.materials.new(name="Stage_Metal")
    mat.metallic = 1
    mat.roughness = 0.3
    obj.data.materials.append(mat)



    

    
    

# 1. Create buildings (your existing code)
for i in range(1, 8):
    for side in [-1, 1]:
        height = 120 - (15 * i)
        radius = 12 - (1 * i)
        x_pos = 12 * i * side
        
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=8,
            radius=radius,
            depth=height,
            location=(x_pos, 50, height/2))
        obj = bpy.context.object
        obj.name = "building_L{}".format(i) if side < 0 else "building_R{}".format(i)

# Central tower
bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=9,
    depth=120,
    location=(0, 50, 60))
obj = bpy.context.object
obj.name = "building_central"

central_obj = bpy.data.objects.get("building_central")
if central_obj:
    add_mirror_material(central_obj)

# Then, loop over the left and right buildings (from 1 to 7)
for side in ["L", "R"]:
    for i in range(1, 8):
        obj_name = f"building_{side}{i}"
        obj = bpy.data.objects.get(obj_name)
        if obj:
            add_mirror_material(obj)
            
            
            

### 2. Main concert stage (thicker)
bpy.ops.mesh.primitive_cube_add(
    size=1, 
    location=(0, 15, 3.5))  # Z = height/2
main_stage = bpy.context.object
main_stage.dimensions = (180, 60, 3)  # Width, Depth, Height

#main_stage.rotation_euler = (0, 0, math.radians(45))  # Rotate 45° to make diamond
main_stage.name = "stage_main"





bpy.ops.mesh.primitive_cube_add(
    size=1, 
    location=(0, -20, 5))  # Z = height/2
main_stage = bpy.context.object
main_stage.dimensions = (140, 40, 5)  # Width, Depth, Height

#main_stage.rotation_euler = (0, 0, math.radians(45))  # Rotate 45° to make diamond
main_stage.name = "stage_main2"




bpy.ops.mesh.primitive_cube_add(
    size=1, 
    location=(0, -30, 3))  # Z = height/2
main_stage = bpy.context.object
main_stage.dimensions = (100, 70, 3)  # Width, Depth, Height

#main_stage.rotation_euler = (0, 0, math.radians(45))  # Rotate 45° to make diamond
main_stage.name = "stage_main3"







# 3. Diamond-shaped secondary stage (half size)
bpy.ops.mesh.primitive_cube_add(
    size=1,
    location=(0, -200, 2.5))  # Positioned 80m away from main stage
secondary_stage = bpy.context.object
secondary_stage.dimensions = (40, 40, 5)  # Half width/depth
secondary_stage.rotation_euler = (0, 0, math.radians(45))  # Rotate 45° to make diamond
secondary_stage.name = "stage_diamond"


#smaller top stage on the diamond stage
bpy.ops.mesh.primitive_cube_add(
    size=1,
    location=(0, -200, 5))  # Positioned 80m away from main stage
secondary_stage = bpy.context.object
secondary_stage.dimensions = (25, 25, 3)  # Half width/depth
#secondary_stage.rotation_euler = (0, 0, math.radians(45))  # Rotate 45° to make diamond
secondary_stage.name = "stage2_diamond"



# 4. Connecting path (narrow bridge)
bpy.ops.mesh.primitive_cube_add(
    size=1,
    location=(0, -120, 2.5))  # Midpoint between stages
path = bpy.context.object
path.dimensions = (15, 120, 5)  # Narrow width, long depth
path.name = "stage_path"













# 5. Camera setup
bpy.ops.object.camera_add(
    location=(60, -100, 50))  # Adjusted to see all elements
camera = bpy.context.object
camera.rotation_euler = (math.radians(50), 0, math.radians(25))
bpy.context.scene.camera = camera

# (Optional) Add metallic material to all stage parts
#def add_metal_material(obj):
#    mat = bpy.data.materials.new(name="Stage_Metal")
#    mat.metallic = 0.7
#    mat.roughness = 0.3
#    obj.data.materials.append(mat)

#for obj in [main_stage, secondary_stage, path]:
#    add_metal_material(obj)








# small stage -ball tower
bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=3,
    depth=80,
    location=(15, -215, 40))
obj = bpy.context.object
obj.name = "small_stage_ball_tower1"


# small stage -ball tower
bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=3,
    depth=80,
    location=(-15, -215, 40))
obj = bpy.context.object
obj.name = "small_stage_ball_tower2"


# small stage -ball tower
bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=3,
    depth=80,
    location=(-15, -185, 40))
obj = bpy.context.object
obj.name = "small_stage_ball_tower3"



# small stage -ball tower
bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=3,
    depth=80,
    location=(15, -185, 40))
obj = bpy.context.object
obj.name = "small_stage_ball_tower4"









import bpy

# Create the ring (torus)
bpy.ops.mesh.primitive_torus_add(
    location=(0, -200, 75),  # Position between stages
    major_radius=22,        # Overall ring size
    minor_radius=1.2,         # Thickness of the ring
    major_segments=15,      # Smoothness of the ring
    minor_segments=5       # Smoothness of the thickness
    
)


ring = bpy.context.object
#ring.rotation_euler.x = math.radians(40)  # 90° rotation

ring.name = "stage_ring"

# Make it metallic (optional)
#mat = bpy.data.materials.new(name="Ring_Metal")
#mat.metallic = 0.8
#mat.roughness = 0.3
#ring.data.materials.append(mat)



# Create the ring (torus)
bpy.ops.mesh.primitive_torus_add(
    location=(0, -200, 75),  # Position between stages
    major_radius=20,        # Overall ring size
    minor_radius=1.2,         # Thickness of the ring
    major_segments=15,      # Smoothness of the ring
    minor_segments=5       # Smoothness of the thickness
    
)


ring = bpy.context.object
ring.rotation_euler.x = math.radians(150)  # 90° rotation

ring.name = "stage_small_ring1"

# Create the ring (torus)
bpy.ops.mesh.primitive_torus_add(
    location=(0, -200, 75),  # Position between stages
    major_radius=20,        # Overall ring size
    minor_radius=1.2,         # Thickness of the ring
    major_segments=15,      # Smoothness of the ring
    minor_segments=5       # Smoothness of the thickness
    
)


ring = bpy.context.object
ring.rotation_euler.x = math.radians(70)  # 90° rotation

ring.name = "stage_small_ring2"







# Create perfect sphere
bpy.ops.mesh.primitive_uv_sphere_add(
    radius=10,               # Size of the ball
    location=(0, -200, 75),  # Position above diamond stage (X,Y,Z)
    segments=32,             # Smoothness (32-64 recommended)
    ring_count=16            # Vertical subdivisions
)
sphere = bpy.context.object
sphere.name = "stage_sphere"

# Make it smooth shaded
bpy.ops.object.shade_smooth()






#huge ring


# Create the ring (torus)
bpy.ops.mesh.primitive_torus_add(
    location=(0, -120, 65),  # Position between stages
    major_radius=200,        # Overall ring size
    minor_radius=3,         # Thickness of the ring
    major_segments=20,      # Smoothness of the ring
    minor_segments=5       # Smoothness of the thickness
    
)


ring = bpy.context.object
ring.rotation_euler.x = math.radians(165)  # 90° rotation

ring.name = "huge_ring"




#ring tower
# small stage -ball tower
bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=5,
    depth=140,
    location=(55, -305, 80))
obj = bpy.context.object
obj.name = "huge_ring_tower1"

#ring tower
# small stage -ball tower
bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=5,
    depth=140,
    location=(-55, -305, 80))
obj = bpy.context.object
obj.name = "huge_ring_tower2"

## small stage -ball tower
#bpy.ops.mesh.primitive_cylinder_add(
#    vertices=8,
#    radius=5,
#    depth=105,
#    location=(-145, -250, 55))
#obj = bpy.context.object
#obj.name = "huge_ring_tower3"


## small stage -ball tower
#bpy.ops.mesh.primitive_cylinder_add(
#    vertices=8,
#    radius=5,
#    depth=105,
#    location=(145, -250, 55))
#obj = bpy.context.object
#obj.name = "huge_ring_tower4"


# small stage -ball tower
bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=5,
    depth=140,
    location=(200, -120, 80))
obj = bpy.context.object
obj.name = "huge_ring_tower5"


bpy.ops.mesh.primitive_cylinder_add(
    vertices=8,
    radius=5,
    depth=140,
    location=(-200, -120, 80))
obj = bpy.context.object
obj.name = "huge_ring_tower6"



#bpy.ops.mesh.primitive_cylinder_add(
#    vertices=8,
#    radius=5,
#    depth=45,
#    location=(-160, -5, 20))
#obj = bpy.context.object
#obj.name = "huge_ring_tower7"


#bpy.ops.mesh.primitive_cylinder_add(
#    vertices=8,
#    radius=5,
#    depth=45,
#    location=(160, -5, 20))
#obj = bpy.context.object
#obj.name = "huge_ring_tower8"


