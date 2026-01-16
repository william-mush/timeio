# Maintenance Schedule

## Scheduled Tasks

### [ ] Revisit @react-three/fiber Upgrade
- **Due Date:** ~February 15, 2026 (4 weeks from Jan 15, 2026)
- **Context:** We forced an upgrade to React 19 and `@react-three/fiber` v9 Beta to support the new stack. The `SolarClock3D` component currently uses `// @ts-nocheck` to bypass missing JSX intrinsic type definitions in the beta release.
- **Action:**
  1. Check if `@react-three/fiber` v9.0.0 (stable) is released.
  2. Run `npm install @react-three/fiber@latest`.
  3. Remove `// @ts-nocheck` from `src/components/SolarClock3D.tsx`.
  4. Verify the 3D Solar Clock still renders correctly.
