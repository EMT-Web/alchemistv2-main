# Solution: Natural Frequency of Vibration

## Problem Statement

Determine the natural frequency of vibration of the system shown in Fig. 1-1.  
Assume the bar AB to be rigid and weightless with C as the mid-point.

## System Description

- **Rigid bar AB** (weightless, horizontal)
- **Point C** = midpoint of AB
- **Spring k₁** attached vertically from ceiling to point A
- **Spring k₂** attached vertically from ceiling to point B
- **Spring k₃** attached vertically from point C to mass m below it

## Solution Approach

### Step 1: Coordinate System and Displacements

Let us define:
- `y_A` = vertical displacement of point A (positive downward)
- `y_B` = vertical displacement of point B (positive downward)
- `y_C` = vertical displacement of point C (positive downward)
- `y_m` = vertical displacement of mass m (positive downward)

Since AB is rigid and C is the midpoint:
```
y_C = (y_A + y_B) / 2
```

### Step 2: Forces Acting on the System

#### Forces on the bar (at points A and B):

From spring k₁ at A:
```
F_A = k₁ · y_A  (upward, restoring force)
```

From spring k₂ at B:
```
F_B = k₂ · y_B  (upward, restoring force)
```

From spring k₃ at C (connecting to mass m):
```
F_C = k₃ · (y_C - y_m)  (force on bar, depends on relative displacement)
```

#### Forces on mass m:

From spring k₃:
```
F_m = k₃ · (y_m - y_C)  (upward when y_C > y_m)
```

### Step 3: Equations of Motion

Since the bar is rigid and weightless, for equilibrium:
- Sum of vertical forces = 0 (translational equilibrium)
- Sum of moments = 0 (rotational equilibrium, but since bar is weightless, this gives constraint)

**For the rigid bar:**
For small displacements, if the bar translates without rotation:
```
y_A = y_B = y_bar
y_C = y_bar
```

Then:
```
F_A = k₁ · y_bar
F_B = k₂ · y_bar
F_C = k₃ · (y_bar - y_m)
```

**Equilibrium of the bar:**
```
F_A + F_B = F_C
k₁ · y_bar + k₂ · y_bar = k₃ · (y_bar - y_m)
(k₁ + k₂) · y_bar = k₃ · (y_bar - y_m)
```

Solving for y_m:
```
k₃ · (y_bar - y_m) = (k₁ + k₂) · y_bar
k₃ · y_bar - k₃ · y_m = (k₁ + k₂) · y_bar
-k₃ · y_m = (k₁ + k₂) · y_bar - k₃ · y_bar
k₃ · y_m = (k₃ - k₁ - k₂) · y_bar
y_m = (k₃ - k₁ - k₂) / k₃ · y_bar
```

**Equation of motion for mass m:**
```
m · d²y_m/dt² = -k₃ · (y_m - y_bar)
m · d²y_m/dt² = -k₃ · y_m + k₃ · y_bar
```

Substituting y_bar from the equilibrium condition:
From: `(k₁ + k₂) · y_bar = k₃ · (y_bar - y_m)`
We get: `y_bar = k₃ · y_m / (k₃ + k₁ + k₂)`

Actually, let me reconsider the approach. The system has coupling between the bar and mass.

### Step 4: Correct Derivation Using Energy Method

For small oscillations, we can use the energy method or directly write equations.

**Alternative Approach: Equivalent Spring Constant**

The mass m experiences displacement through spring k₃, which is attached to point C.
Point C moves due to the combined effect of springs k₁ and k₂.

When the bar translates by δ:
- Spring k₁ stores energy: ½k₁δ²
- Spring k₂ stores energy: ½k₂δ²
- Total energy stored in bar springs: ½(k₁ + k₂)δ²

When mass m displaces by x relative to the bar:
- Spring k₃ stores energy: ½k₃x²

**However, we need to relate bar displacement to mass displacement.**

For the rigid bar in vertical translation:
- Effective spring constant at C due to k₁ and k₂: `k_eff_bar = k₁ + k₂`

Now, springs k₃ and the effective spring at C are in series from the mass's perspective.

When mass m moves by y_m:
- If bar moves by y_bar, spring k₃ extension = y_m - y_bar
- For equilibrium: `(k₁ + k₂) · y_bar = k₃ · (y_m - y_bar)`
- Therefore: `y_bar = k₃ · y_m / (k₁ + k₂ + k₃)`

Force on mass m:
```
F_m = k₃ · (y_m - y_bar)
    = k₃ · (y_m - k₃ · y_m / (k₁ + k₂ + k₃))
    = k₃ · y_m · (1 - k₃ / (k₁ + k₂ + k₃))
    = k₃ · y_m · ((k₁ + k₂ + k₃ - k₃) / (k₁ + k₂ + k₃))
    = k₃ · y_m · (k₁ + k₂) / (k₁ + k₂ + k₃)
```

**Equation of motion:**
```
m · d²y_m/dt² = -F_m
m · d²y_m/dt² = -[k₃(k₁ + k₂)/(k₁ + k₂ + k₃)] · y_m
```

This is a simple harmonic oscillator with:
```
ω² = k_equivalent / m
```

Where:
```
k_equivalent = k₃(k₁ + k₂) / (k₁ + k₂ + k₃)
```

### Step 5: Natural Frequency

The natural frequency is:
```
ω_n = √(k_equivalent / m)
    = √{[k₃(k₁ + k₂)] / [m(k₁ + k₂ + k₃)]}
```

In Hz:
```
f_n = (1/2π) · √{[k₃(k₁ + k₂)] / [m(k₁ + k₂ + k₃)]}
```

## Final Answer

**Natural frequency of vibration:**
```
ω_n = √{[k₃(k₁ + k₂)] / [m(k₁ + k₂ + k₃)]}
```

or

```
f_n = (1/2π) · √{[k₃(k₁ + k₂)] / [m(k₁ + k₂ + k₃)]}
```

Where:
- `k₁` = spring constant of spring at point A
- `k₂` = spring constant of spring at point B  
- `k₃` = spring constant of spring connecting point C to mass m
- `m` = mass of the block

## Physical Interpretation

The equivalent spring constant for the mass is the combination of:
1. Springs k₁ and k₂ in parallel (attached to the rigid bar): `k₁ + k₂`
2. This effective spring in series with k₃: `k_equivalent = (k₁ + k₂)k₃ / (k₁ + k₂ + k₃)`

This gives the natural frequency of the system.

