# Solutions: Damped Free Vibration Problems

## Problem 12 (Figure 2-1)

### System Description
- **Rigid beam** pivoted at left end, total length L
- **Mass m** attached at free end (distance L from pivot)
- **Spring k** connected vertically at distance a from pivot
- **Damper c** connected vertically at distance a from pivot (same point as spring)

### Coordinate System
Let θ be the angular displacement of the beam from equilibrium (small angles, measured in radians, positive in counterclockwise direction).

### Step 1: Displacements and Forces

**Displacement at spring/damper location (distance a from pivot):**
- Vertical displacement: `y_a = a·sin(θ) ≈ a·θ` (for small θ)
- Horizontal displacement: negligible for small θ

**Displacement at mass location (distance L from pivot):**
- Vertical displacement: `y_L = L·sin(θ) ≈ L·θ`
- Tangential acceleration: `a_tang = L·d²θ/dt²`

### Step 2: Forces and Moments

**Spring force at distance a:**
- Spring extension: `y_a = a·θ`
- Spring force (upward when θ positive): `F_spring = -k·a·θ`
- Moment about pivot: `M_spring = F_spring · a = -k·a²·θ`

**Damper force at distance a:**
- Damper velocity: `dy_a/dt = a·dθ/dt`
- Damper force (upward when rotating): `F_damper = -c·a·dθ/dt`
- Moment about pivot: `M_damper = F_damper · a = -c·a²·dθ/dt`

**Mass at distance L:**
- Vertical acceleration: `a_vert = L·d²θ/dt²`
- Force on mass: `F_mass = m·a_vert = m·L·d²θ/dt²`
- Moment about pivot: `M_mass = F_mass · L = m·L²·d²θ/dt²`

### Step 3: Equation of Motion (Newton's Second Law for Rotation)

Sum of moments about pivot = Moment of inertia × Angular acceleration

The moment of inertia of the system about the pivot is:
```
I = m·L²
```

Applying Newton's second law for rotation:
```
ΣM = I · d²θ/dt²
```

```
M_spring + M_damper = M_mass
-k·a²·θ - c·a²·dθ/dt = m·L²·d²θ/dt²
```

Rearranging:
```
m·L²·d²θ/dt² + c·a²·dθ/dt + k·a²·θ = 0
```

**Differential equation of motion:**
```
m·L² · (d²θ/dt²) + c·a² · (dθ/dt) + k·a² · θ = 0
```

Dividing by `m·L²`:
```
d²θ/dt² + (c·a²/(m·L²))·dθ/dt + (k·a²/(m·L²))·θ = 0
```

This is the standard form: `d²θ/dt² + 2ζ·ω_n·dθ/dt + ω_n²·θ = 0`

Where:
- Natural frequency: `ω_n² = k·a²/(m·L²)`
- Damping ratio coefficient: `2ζ·ω_n = c·a²/(m·L²)`

### Step 4: Natural Frequency

From the differential equation:
```
ω_n² = k·a²/(m·L²)
```

**Natural frequency:**
```
ω_n = √(k·a²/(m·L²)) = (a/L)·√(k/m)
```

### Step 5: Critical Damping Coefficient

Critical damping occurs when `ζ = 1`, which means:
```
2·ω_n = c_crit·a²/(m·L²)
```

Solving for `c_crit`:
```
c_crit = 2·ω_n·m·L²/a²
```

Substituting `ω_n = (a/L)·√(k/m)`:
```
c_crit = 2·(a/L)·√(k/m)·m·L²/a²
       = 2·m·L·√(k/m)
       = 2·L·√(k·m)
```

**Critical damping coefficient:**
```
c_crit = 2·L·√(k·m)
```

### Step 6: Natural Frequency of Damped Oscillation

For underdamped systems (ζ < 1), the damped natural frequency is:
```
ω_d = ω_n·√(1 - ζ²)
```

Where the damping ratio is:
```
ζ = c/(2·√(k·m)) · (a²/(L²))
```

But more directly, comparing with standard form:
```
2ζ·ω_n = c·a²/(m·L²)
```

Since `ω_n = (a/L)·√(k/m)`, we get:
```
2ζ·(a/L)·√(k/m) = c·a²/(m·L²)
ζ = c·a/(2·L·√(k·m))
```

**Natural frequency of damped oscillation:**
```
ω_d = (a/L)·√(k/m) · √(1 - [c·a/(2·L·√(k·m))]²)
    = (a/L)·√(k/m) · √(1 - c²·a²/(4·L²·k·m))
```

---

## Problem 13 (Figure 2-2)

### System Description
- **Rigid beam** pivoted at left end, total length b
- **Mass m** attached at distance a from pivot
- **Damper c** connected vertically at distance a from pivot (same point as mass)
- **Spring k** connected vertically at free end (distance b from pivot)

### Coordinate System
Let θ be the angular displacement of the beam from equilibrium (small angles, positive counterclockwise).

### Step 1: Displacements and Forces

**Displacement at mass/damper location (distance a from pivot):**
- Vertical displacement: `y_a = a·sin(θ) ≈ a·θ`
- Tangential acceleration: `a_tang = a·d²θ/dt²`

**Displacement at spring location (distance b from pivot):**
- Vertical displacement: `y_b = b·sin(θ) ≈ b·θ`

### Step 2: Forces and Moments

**Spring force at distance b:**
- Spring extension: `y_b = b·θ`
- Spring force (upward when θ positive): `F_spring = -k·b·θ`
- Moment about pivot: `M_spring = F_spring · b = -k·b²·θ`

**Damper force at distance a:**
- Damper velocity: `dy_a/dt = a·dθ/dt`
- Damper force (upward when rotating): `F_damper = -c·a·dθ/dt`
- Moment about pivot: `M_damper = F_damper · a = -c·a²·dθ/dt`

**Mass at distance a:**
- Tangential acceleration: `a_tang = a·d²θ/dt²`
- Force on mass: `F_mass = m·a_tang = m·a·d²θ/dt²`
- Moment about pivot: `M_mass = F_mass · a = m·a²·d²θ/dt²`

### Step 3: Equation of Motion

Moment of inertia about pivot:
```
I = m·a²
```

Applying Newton's second law for rotation:
```
ΣM = I · d²θ/dt²
```

```
M_spring + M_damper = M_mass
-k·b²·θ - c·a²·dθ/dt = m·a²·d²θ/dt²
```

Rearranging:
```
m·a²·d²θ/dt² + c·a²·dθ/dt + k·b²·θ = 0
```

**Differential equation of motion:**
```
m·a² · (d²θ/dt²) + c·a² · (dθ/dt) + k·b² · θ = 0
```

Dividing by `m·a²`:
```
d²θ/dt² + (c/m)·dθ/dt + (k·b²/(m·a²))·θ = 0
```

This is the standard form: `d²θ/dt² + 2ζ·ω_n·dθ/dt + ω_n²·θ = 0`

Where:
- Natural frequency: `ω_n² = k·b²/(m·a²)`
- Damping ratio coefficient: `2ζ·ω_n = c/m`

### Step 4: Natural Frequency of Damped Oscillation

From the differential equation:
```
ω_n² = k·b²/(m·a²)
```

**Natural frequency (undamped):**
```
ω_n = √(k·b²/(m·a²)) = (b/a)·√(k/m)
```

**Damped natural frequency:**
```
ω_d = ω_n·√(1 - ζ²)
```

Where the damping ratio is:
```
2ζ·ω_n = c/m
ζ = c/(2·m·ω_n) = c/(2·m) · (a/b)·√(m/k) = c·a/(2·b·√(k·m))
```

**Natural frequency of damped oscillation:**
```
ω_d = (b/a)·√(k/m) · √(1 - [c·a/(2·b·√(k·m))]²)
    = (b/a)·√(k/m) · √(1 - c²·a²/(4·b²·k·m))
```

### Step 5: Critical Damping Coefficient

Critical damping occurs when `ζ = 1`:
```
c_crit/(2·m) = ω_n
c_crit = 2·m·ω_n
```

Substituting `ω_n = (b/a)·√(k/m)`:
```
c_crit = 2·m·(b/a)·√(k/m)
       = 2·(b/a)·√(k·m)
```

**Critical damping coefficient:**
```
c_crit = 2·(b/a)·√(k·m)
```

---

## Summary of Results

### Problem 12 (Fig. 2-1)

**Differential equation:**
```
m·L² · (d²θ/dt²) + c·a² · (dθ/dt) + k·a² · θ = 0
```

**Critical damping coefficient:**
```
c_crit = 2·L·√(k·m)
```

**Natural frequency of damped oscillation:**
```
ω_d = (a/L)·√(k/m) · √(1 - c²·a²/(4·L²·k·m))
```

### Problem 13 (Fig. 2-2)

**Differential equation:**
```
m·a² · (d²θ/dt²) + c·a² · (dθ/dt) + k·b² · θ = 0
```

**Natural frequency of damped oscillation:**
```
ω_d = (b/a)·√(k/m) · √(1 - c²·a²/(4·b²·k·m))
```

**Critical damping coefficient:**
```
c_crit = 2·(b/a)·√(k·m)
```

---

## Notes

1. All solutions assume small angle approximations: `sin(θ) ≈ θ` and `cos(θ) ≈ 1`
2. The coordinate θ is measured from the equilibrium position
3. Positive θ corresponds to counterclockwise rotation
4. For overdamped systems (c > c_crit), there is no oscillation, only exponential decay
5. For critically damped systems (c = c_crit), there is no oscillation, only exponential decay with the fastest return to equilibrium
6. For underdamped systems (c < c_crit), the system oscillates with frequency ω_d

