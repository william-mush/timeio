# Maintenance Schedule

## Scheduled Tasks

### [x] Revisit @react-three/fiber Upgrade
- **Completed:** February 28, 2026
- **Context:** We forced an upgrade to React 19 and `@react-three/fiber` v9 Beta to support the new stack. The `SolarClock3D` component used `// @ts-nocheck` to bypass missing JSX intrinsic type definitions in the beta release.
- **Resolution:**
  1. Upgraded `@react-three/fiber` from v9.0.0-beta.1 to v9.5.0 (stable)
  2. Upgraded `@react-three/drei` from v9.0.0-beta.6 to v10.7.7 (stable)
  3. Removed `@types/three` (R3F v9 auto-maps Three.js types to JSX)
  4. Removed `// @ts-nocheck` and `// @ts-ignore` from `src/components/SolarClock3D.tsx`
  5. Removed unused imports (`useLoader`, `useThree`)
  6. Zero type errors — all JSX intrinsic types resolve correctly with stable release
