# Landing Page Doodle Positioning Guide

## Critical Lesson: Positioning Context for Layout-Locked Doodles

### The Problem We Solved

When positioning doodles on the **homepage (landing page)**, we initially placed them as children of the `<section>` element. This caused the doodle to shift position when the browser window was resized because:

1. The hero section uses a **centered grid** with `maxWidth: 1200px` and `margin: 0 auto`
2. The doodle was positioned `absolute` relative to the `<section>`
3. As the window width changed, the centered grid shifted, but the doodle (positioned from the viewport edge) stayed fixed
4. **Result:** The doodle "drifted" away from the 4-step boxes it was meant to overlay

### The Solution

**Move the doodle INSIDE the grid column** that contains the content it should be locked to.

#### Structure That WORKS:
```jsx
<section style={{ position: 'relative' }}>
  <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid' }}>
    <div>Left column (text)</div>
    
    <div style={{ position: 'relative' }}>  {/* Right column - THIS is the anchor! */}
      <div>{/* 4-step boxes card */}</div>
      
      {/* DOODLES GO HERE - locked to the column! */}
      <Doodle ... />
      <DoodleDevOverlay ... />
    </div>
  </div>
</section>
```

#### Structure That FAILS:
```jsx
<section style={{ position: 'relative' }}>
  <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
    {/* Grid columns */}
  </div>
  
  {/* DOODLES HERE - NOT LOCKED! They drift as window resizes! */}
  <Doodle ... />
</section>
```

### Key Differences: Landing Page vs. Onboarding Pages

| Aspect | Onboarding Pages | Landing Page (Homepage) |
|--------|------------------|-------------------------|
| **Layout** | Uses `StepShell` component | Custom hero grid with centered layout |
| **Container** | Single centered card, always consistent width | Grid with `maxWidth: 1200px` and `margin: 0 auto` |
| **Doodle Parent** | `StepShell`'s content card with `position: relative` | The **grid column** (`<div style={{ position: 'relative' }}>`) |
| **Behavior** | Doodles are always positioned relative to the card | Doodles MUST be inside the column to move WITH the content |
| **Window Resize** | Card width is fixed, doodles stay put | Grid shifts horizontally, doodles must be locked to column |

### Critical Questions to Ask When Positioning Doodles

Before positioning a doodle on ANY page, ask:

1. **Does this page use a centered layout with `margin: 0 auto`?**
   - If YES → Doodle must be inside the content column, not the outer container
   - If NO → Doodle can be at the section level

2. **What should the doodle be "locked" to?**
   - Identify the visual element it overlays (e.g., 4-step boxes, form card)
   - The doodle must be a child of that element's immediate `position: relative` parent

3. **Does the container shift position when the window resizes?**
   - Test by resizing the browser window
   - If the content moves horizontally → Doodle must be inside that moving container

### The "Doodle Anchor" Rule

**A doodle should ALWAYS be positioned relative to its visual anchor:**

- ✅ **Onboarding forms:** Doodle is a child of the `StepShell` card (the form container)
- ✅ **Landing page hero:** Doodle is a child of the right column div (contains the 4-step boxes)
- ❌ **WRONG:** Doodle is a child of a section that contains centered content

### Implementation Checklist

When adding a doodle to a page with centered/responsive layout:

1. [ ] Identify the visual element the doodle should overlay
2. [ ] Find the `position: relative` parent of that element
3. [ ] Place the doodle as a direct child of that parent
4. [ ] Add `zIndex` if the doodle needs to overlay content (e.g., `zIndex={10}`)
5. [ ] Test by resizing the browser window from 1920px down to 1200px
6. [ ] Verify the doodle stays "locked" to its visual anchor

### User's Key Requirement

> "This doodle is very sensitive to where it should be... it is shaped to stay around our four process box... this doodle cannot be affected by window adjustments... it is to just like the hero page cut cut cut until it gets to a mobile view and then disappears."

**Translation:** The doodle must move WITH the 4-step boxes as a single unit, maintaining the exact same visual relationship regardless of window size, until mobile breakpoint where it disappears.

### Solution Template for Future Similar Issues

If a user reports that a doodle is "drifting" or "moving when the window resizes":

1. **Ask:** "Is the doodle meant to stay locked to specific content (like boxes, cards, or forms)?"
2. **If YES:** "The doodle needs to be positioned inside the same container as that content, not the outer section."
3. **Explain:** "Right now it's positioned relative to [X], but it should be positioned relative to [Y] so it moves WITH the content."
4. **Fix:** Move the doodle to be a child of the correct `position: relative` parent.

### Code Reference

**Final Working Implementation (Landing Page):**

```jsx
// src/app/page.tsx
<section style={{ ...section, paddingTop: 96, paddingBottom: 96, position: 'relative' }}>
  <div className="hero-grid" style={{ ...maxw, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
    <div>{/* Left column: text content */}</div>
    
    <div style={{ position: 'relative' }}>  {/* RIGHT COLUMN - DOODLE ANCHOR */}
      <div style={{ /* 4-step boxes card */ }}>
        {/* 4-step process grid */}
      </div>
      
      {/* Doodles are SIBLINGS of the card, CHILDREN of the column */}
      {!doodleParam && (
        <Doodle
          src="/doodles/landing-page/Savetime.svg"
          alt="Save time doodle"
          position="bottom-right"
          offset={{ x: -498, y: -288 }}
          desktopScale={0.85}
          mobilePosition="hidden"
          maxWidth="none"
          zIndex={10}
        />
      )}
      
      {doodleParam === 'savetime' && (
        <DoodleDevOverlay
          src="/doodles/landing-page/Savetime.svg"
          alt="Save time doodle"
          position="bottom-right"
          initialScale={1.0}
          maxWidth="none"
        />
      )}
    </div>
  </div>
</section>
```

### Key Takeaway

**The doodle's positioning parent determines whether it's "locked" to content or "fixed" to the viewport.**

- Parent = Section → Doodle drifts when centered content shifts
- Parent = Column/Card → Doodle moves WITH the content (CORRECT for this use case)

---

## Future Reference

If working on a similar page with:
- Centered layouts (`margin: 0 auto`)
- Responsive grids
- Content that shifts horizontally on window resize

**ALWAYS place doodles inside the content container, not the outer section!**

