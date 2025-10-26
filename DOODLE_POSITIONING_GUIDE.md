# Doodle Positioning Guide

## Overview

This guide documents the **precise, pixel-perfect** method for adding draggable, positioned SVG doodles to any page in the PYRO webapp. This system ensures that the drag-and-drop positioning tool produces **identical results** to the final static doodle placement.

---

## ⚠️ Critical Lessons Learned

### **THE GOLDEN RULE: Match the Final Component Exactly**

The drag-and-drop tool **must use identical CSS** to the final `<Doodle>` component. Any difference in:
- Container structure
- CSS positioning properties
- Transform origin
- Base offsets

...will result in mismatched positioning when the drag controls are removed.

### **Key Mistakes to Avoid**

❌ **DON'T:** Add wrapper divs around the draggable image that don't exist in the final component  
✅ **DO:** Position the draggable image as a direct child of the same parent as the final `<Doodle>`

❌ **DON'T:** Use different `transformOrigin` values (e.g., `bottom left` vs `center`)  
✅ **DO:** Use the exact same transform origin as the Doodle component (default: `center`)

❌ **DON'T:** Calculate offsets from a different container  
✅ **DO:** Calculate offsets from the StepShell card (which has `position: relative`)

❌ **DON'DON'T:** Use different base offset values (e.g., `0px` vs `20px`)  
✅ **DO:** Use the exact same base offset (Doodle component uses `20px`)

---

## Architecture

### Component Hierarchy

```
<StepShell>
  └─ <div style={{ position: 'relative' }}> ← THE ANCHOR
      ├─ <Doodle /> ← Final static doodle (absolute positioned)
      └─ <form>
```

### Doodle Component Positioning Logic

```typescript
// From /src/components/Doodle.tsx
case 'bottom-left':
  return {
    position: 'absolute',
    bottom: `${20 + (offset.y || 0)}px`,  // BASE: 20px
    left: `${20 + (offset.x || 0)}px`,    // BASE: 20px
    transform: `scale(${desktopScale})`,
    transformOrigin: 'center', // DEFAULT
    maxWidth: '320px'
  };
```

**Key Details:**
- Base offset: **20px** from edges
- Transform origin: **center** (browser default)
- Positioned relative to parent with `position: relative` (StepShell card)

---

## Step-by-Step Implementation

### Step 1: Add Temporary Drag Controls to Page

Add imports and state to the page component:

```typescript
import { useState, useEffect, useRef } from 'react';

// Inside component:
const [isDragging, setIsDragging] = useState(false);
const [doodlePos, setDoodlePos] = useState({ x: 0, y: 0 }); // Starting position
const [doodleScale, setDoodleScale] = useState(0.60); // Starting scale
const doodleRef = useRef<HTMLImageElement>(null);
```

### Step 2: Add Drag Handler (CRITICAL - Matches Doodle Logic)

```typescript
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !doodleRef.current) return;
    
    // Get the StepShell card (parent with position:relative)
    const card = doodleRef.current.parentElement;
    if (!card) return;
    
    const cardRect = card.getBoundingClientRect();
    
    // Calculate position from bottom-left of card (matching Doodle component)
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Mouse position relative to card
    const relX = mouseX - cardRect.left;
    const relBottom = cardRect.bottom - mouseY;
    
    // Subtract the base 20px offset to get the actual offset value
    setDoodlePos({
      x: Math.round(relX - 20),
      y: Math.round(relBottom - 20)
    });
  };
  
  const handleMouseUp = () => setIsDragging(false);
  
  if (isDragging) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
  
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
}, [isDragging]);
```

**Why this works:**
- Positions from **StepShell card** (same container as final Doodle)
- Subtracts the **base 20px offset** to match Doodle component logic
- Calculates from **bottom** (for bottom-left anchor)

### Step 3: Add Draggable Image (EXACT CSS Match)

```typescript
<img
  ref={doodleRef}
  src="/doodles/1.svg"
  alt="Doodle description"
  draggable={false}
  onMouseDown={(e) => {
    setIsDragging(true);
    e.preventDefault();
  }}
  style={{
    position: 'absolute',
    bottom: `${20 + doodlePos.y}px`, // Matches Doodle component exactly
    left: `${20 + doodlePos.x}px`,   // Matches Doodle component exactly
    transform: `scale(${doodleScale})`, // Matches Doodle component exactly
    transformOrigin: 'center', // DEFAULT - matches Doodle component
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : 'all 0.3s ease-out',
    maxWidth: '320px',
    height: 'auto',
    zIndex: 10,
    pointerEvents: 'auto'
  }}
/>
```

### Step 4: Add Control Panel (Fixed Position)

```typescript
<div style={{
  position: 'fixed',
  bottom: 20,
  right: 20,
  background: '#2e2e2e',
  color: 'white',
  padding: 20,
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  zIndex: 1000,
  minWidth: 320
}}>
  <div style={{ marginBottom: 12, fontWeight: 700, fontSize: 16 }}>🎨 Doodle Controls</div>
  
  {/* Scale Slider */}
  <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
    <label style={{ fontSize: 13, minWidth: 50 }}>Scale:</label>
    <input
      type="range"
      min={0.1}
      max={1.0}
      step={0.05}
      value={doodleScale}
      onChange={(e) => setDoodleScale(Number(e.target.value))}
      style={{ flex: 1 }}
    />
    <span style={{ fontSize: 13, minWidth: 40 }}>{doodleScale.toFixed(2)}</span>
  </div>
  
  {/* Live Code Output */}
  <div style={{
    background: '#1a1a1a',
    padding: 12,
    borderRadius: 6,
    fontSize: 12,
    fontFamily: 'monospace',
    marginTop: 12,
    lineHeight: 1.6
  }}>
    <div>offset={`{{ x: ${Math.round(doodlePos.x)}, y: ${Math.round(doodlePos.y)} }}`}</div>
    <div>desktopScale={`{${doodleScale.toFixed(2)}}`}</div>
  </div>
  
  {/* Copy Button */}
  <button
    onClick={() => {
      const code = `<Doodle
  src="/doodles/X.svg"
  alt="Description"
  position="bottom-left"
  offset={{ x: ${Math.round(doodlePos.x)}, y: ${Math.round(doodlePos.y)} }}
  desktopScale={${doodleScale.toFixed(2)}}
  mobilePosition="hidden"
/>`;
      navigator.clipboard.writeText(code);
      alert('✅ Code copied!');
    }}
    style={{
      width: '100%',
      marginTop: 12,
      padding: '10px',
      background: '#7aa3a1',
      color: 'white',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      fontWeight: 600
    }}
  >
    📋 Copy Code
  </button>
</div>
```

### Step 5: User Positions Doodle

1. Navigate to the page with drag controls
2. Drag the doodle to desired position
3. Adjust scale slider
4. Click "Copy Code"
5. Send the code snippet

### Step 6: Apply Final Positioning

Replace the draggable image and controls with:

```typescript
<Doodle
  src="/doodles/X.svg"
  alt="Description"
  position="bottom-left"
  offset={{ x: -265, y: -200 }} // Values from drag tool
  desktopScale={0.60} // Value from drag tool
  mobilePosition="hidden" // Hide on mobile
/>
```

Remove all temporary state and handlers.

---

## Mobile Strategy

### Current Approach: Hide All Doodles

```typescript
mobilePosition="hidden"
```

**Why:**
- Simplifies mobile UI
- Prevents layout issues on small screens
- Keeps forms clean and focused

### Future Enhancement (if needed):

```typescript
mobilePosition="bottom-center"
mobileScale={0.4}
```

---

## Position Anchors

Available anchor positions:

| Anchor | Use Case |
|--------|----------|
| `bottom-left` | Bottom-left corner of card |
| `bottom-right` | Bottom-right corner of card |
| `middle-left` | Vertically centered, left edge |
| `middle-right` | Vertically centered, right edge |
| `top-left` | Top-left corner of card |
| `top-right` | Top-right corner of card |

---

## Offset System

### Positive vs Negative Offsets

```typescript
// For bottom-left anchor:
offset={{ x: 50, y: 50 }}   // Move 50px right, 50px up from bottom-left
offset={{ x: -50, y: -50 }} // Move 50px left, 50px down from bottom-left
```

### Calculating from Card Edges

The Doodle component adds a **base 20px offset** from edges:

```typescript
// Final position formula:
left = 20px + offset.x
bottom = 20px + offset.y
```

**Examples:**
- `offset={{ x: 0, y: 0 }}` → 20px from left, 20px from bottom
- `offset={{ x: -20, y: -20 }}` → 0px from left, 0px from bottom (touching edge)
- `offset={{ x: 100, y: -50 }}` → 120px from left, -30px from bottom (outside card)

---

## Dynamic Repositioning

For content that expands/collapses (e.g., Job Boards page):

```typescript
const [showAdditionalBoards, setShowAdditionalBoards] = useState(false);

<Doodle
  src="/doodles/2.svg"
  alt="Job boards"
  position="top-left"
  offset={{ y: showAdditionalBoards ? 200 : 80 }} // Shifts down when expanded
  desktopScale={0.8}
  mobilePosition="hidden"
/>
```

The `transition: 'all 0.3s ease-out'` in the Doodle component handles smooth movement.

---

## Troubleshooting

### Issue: Doodle shifts position after removing drag controls

**Cause:** Drag tool and final component use different CSS  
**Fix:** Ensure draggable image matches Doodle component exactly:
- Same `transformOrigin`
- Same base offset (20px)
- Same container (StepShell card with `position: relative`)
- Same CSS properties

### Issue: Drag calculations are off

**Cause:** Calculating from wrong container  
**Fix:** Always use `doodleRef.current.parentElement` (the StepShell card)

### Issue: Negative offsets don't work as expected

**Cause:** Misunderstanding offset direction  
**Fix:** For `bottom-left`:
- Positive X = move right
- Negative X = move left
- Positive Y = move up
- Negative Y = move down

---

## File Reference

### Components
- `/src/components/Doodle.tsx` - Reusable doodle component
- `/src/components/StepShell.tsx` - Form card container (has `position: relative`)

### Assets
- `/public/doodles/1.svg` - Woman with laptop (Basics)
- `/public/doodles/2.svg` - Job boards (Job Boards)
- `/public/doodles/3.svg` - Man on phone (Contact)
- `/public/doodles/4.svg` - Woman with AI (Job Boards)
- `/public/doodles/5.svg` - Man with resume (Resume)
- `/public/doodles/6.svg` - Man at desktop (Contact)
- `/public/doodles/7.svg` - Woman with luggage (Location)

### Pages with Doodles
- `/src/app/onboarding/basics/page.tsx` - ✅ Complete (doodle #1)
- `/src/app/onboarding/location/page.tsx` - doodle #7
- `/src/app/onboarding/resume/page.tsx` - doodle #5
- `/src/app/onboarding/contact/page.tsx` - doodles #6 + #3
- `/src/app/onboarding/job-boards/page.tsx` - doodles #2 + #4
- `/src/app/onboarding/review/page.tsx` - all 7 doodles (smaller scale)

---

## Best Practices

1. **Always start from a working example** (Basics page)
2. **Test positioning with drag tool** before finalizing
3. **Use SVG format** for crisp, scalable graphics
4. **Keep doodles at 0.5-0.8 scale** for visual balance
5. **Hide on mobile** unless specifically needed
6. **Use negative offsets** to position doodles touching/overlapping card edges
7. **Document final positions** in code comments for future reference

---

## Example: Basics Page (Complete Reference)

```typescript
// Temporary drag implementation (Step 1-4)
const [isDragging, setIsDragging] = useState(false);
const [doodlePos, setDoodlePos] = useState({ x: -265, y: -200 });
const [doodleScale, setDoodleScale] = useState(0.60);
const doodleRef = useRef<HTMLImageElement>(null);

// Drag handler (matches Doodle positioning exactly)
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !doodleRef.current) return;
    const card = doodleRef.current.parentElement;
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const relX = e.clientX - cardRect.left;
    const relBottom = cardRect.bottom - e.clientY;
    setDoodlePos({
      x: Math.round(relX - 20),
      y: Math.round(relBottom - 20)
    });
  };
  const handleMouseUp = () => setIsDragging(false);
  if (isDragging) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
}, [isDragging]);

// Final static implementation (Step 6)
<Doodle
  src="/doodles/1.svg"
  alt="Person working on laptop"
  position="bottom-left"
  offset={{ x: -265, y: -200 }}
  desktopScale={0.60}
  mobilePosition="hidden"
/>
```

---

## Version History

- **v1.0** - Initial implementation with PNG support
- **v1.1** - Migrated to SVG for better scaling
- **v1.2** - Fixed drag positioning to match final component exactly
- **v1.3** - Changed mobile strategy to hide all doodles

---

## Support

For questions or issues with doodle positioning, refer to:
1. This guide
2. Basics page implementation (`/src/app/onboarding/basics/page.tsx`)
3. Doodle component source (`/src/components/Doodle.tsx`)


