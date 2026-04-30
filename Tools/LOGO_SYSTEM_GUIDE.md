# UrbanWear Dual-Logo Branding System

## Overview

This document describes the dual-logo branding system implemented for UrbanWear website. The system displays different logos based on the page context to maintain brand consistency and optimize visual hierarchy.

---

## Logo Types & Usage

### 1. **Detailed Logo** (Homepage)

- **File Path:** `images/logo-detailed.png`
- **Usage:** Homepage (index.html) only
- **Desktop Size:** 100px height
- **Tablet Size:** 75px height
- **Mobile Size:** 65px height
- **Description:** A circular badge-style logo with skyline and text inside. This detailed logo is prominent on the homepage to create a strong visual impact.

### 2. **Text Logo** (Other Pages)

- **File Path:** `images/logo-text.png`
- **Usage:** All other pages (Login, Signup, Shop, Contact, Password Reset, Terms)
- **Desktop Size:** 42px height
- **Tablet Size:** 38px height
- **Mobile Size:** 32px height
- **Description:** A simplified text-based or minimalist logo. Smaller and cleaner for secondary pages.

---

## File Structure

### HTML Files

All HTML files have been updated with:

- `data-page` attribute on the `.brand` container
  - `data-page="home"` for index.html
  - `data-page="other"` for all other pages
- Logo image src set to appropriate file:
  - `src="images/logo-detailed.png"` for homepage
  - `src="images/logo-text.png"` for other pages
- Script reference to logo switcher: `<script src="scripts/pages/logo-switcher.js"></script>`

### CSS Files

Updated styling in all CSS files:

- **landing.css** (Homepage)
- **login.css**
- **password-reset.css**
- **signup.css**
- **terms.css**
- **contact.css**
- **shop.css**

#### CSS Classes for Logo Control

```css
/* Homepage detailed logo */
[data-page="home"] .logo {
  width: 100px; /* Desktop */
}

/* Other pages text logo */
[data-page="other"] .logo {
  width: 42px; /* Desktop */
}
```

#### Responsive Breakpoints

```css
@media (max-width: 1024px) {
  [data-page="home"] .logo {
    width: 85px;
  }
}

@media (max-width: 768px) {
  [data-page="home"] .logo {
    width: 75px;
  }
  [data-page="other"] .logo {
    width: 38px;
  }
}

@media (max-width: 480px) {
  [data-page="home"] .logo {
    width: 65px;
  }
  [data-page="other"] .logo {
    width: 32px;
  }
}
```

### JavaScript File

**Location:** `scripts/pages/logo-switcher.js`

**Functionality:**

- Detects current page via `data-page` attribute
- Sets responsive classes based on viewport width
- Handles window resize events with debouncing (250ms)
- Automatically initializes on page load

**Key Classes:**

- `.logo-desktop` - Applied on viewport ≥ 768px
- `.logo-tablet` - Applied on viewport 768px-1023px (homepage only)
- `.logo-mobile` - Applied on viewport < 768px

---

## Implementation Details

### Logo Sizing Strategy

**Homepage (`data-page="home"`)**

- Large, eye-catching detailed logo
- Gradually scales down on smaller screens
- Maintains visual prominence throughout
- Sizing: 100px → 85px → 75px → 65px

**Other Pages (`data-page="other"`)**

- Compact, simple text logo
- Focuses on functionality and space efficiency
- Balances with other navbar elements
- Sizing: 42px → 38px → 32px

### Layout & Alignment

All logos use flexbox alignment:

```css
.brand {
  display: flex;
  align-items: center; /* Vertically centered */
  gap: 12px; /* Spacing from brand name */
}

.logo {
  height: auto;
  object-fit: contain; /* Maintains aspect ratio */
}
```

### Brand Container Structure

**Homepage:**

```html
<div class="brand" data-page="home">
  <img src="images/logo-detailed.png" alt="UrbanWear logo" class="logo" />
  <span class="brand-name">UrbanWear</span>
</div>
```

**Other Pages (Simple):**

```html
<div class="brand" data-page="other">
  <img src="images/logo-text.png" alt="UrbanWear logo" class="logo" />
  <span class="brand-name">UrbanWear</span>
</div>
```

**Other Pages (Extended):**

```html
<div class="brand" data-page="other">
  <img src="images/logo-text.png" alt="UrbanWear logo" class="logo" />
  <div class="brand-copy">
    <span class="brand-name">UrbanWear</span>
    <span class="brand-tagline">Street style, elevated</span>
  </div>
</div>
```

---

## Required Logo Image Files

You need to add two logo files to the `images/` folder:

1. **logo-detailed.png**
   - Circular badge design with skyline
   - Minimum 200x200px (will be scaled down)
   - Should include text inside the logo
   - Transparent background recommended

2. **logo-text.png**
   - Simple, minimal text-based design
   - Minimum 100x100px
   - Clean, readable at small sizes
   - Transparent background recommended

**Recommended Specs:**

- Format: PNG with transparency
- DPI: 72 (web-optimized)
- Color: Match brand palette
- Ensure text is crisp and readable at smallest size (32px)

---

## Browser Support & Performance

### Features Used

- CSS attribute selectors (`[data-page]`)
- CSS media queries
- ES5+ JavaScript (no build tools required)
- Object-fit for responsive images

### Performance

- Minimal JavaScript (IIFE pattern, no dependencies)
- Debounced resize handler (250ms)
- No layout shift after initial load
- Images loaded as standalone files

### Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- IE 11: Partial (CSS attribute selectors work, resize debounce may need polyfill)

---

## Updating the System

### To Change Logo Sizes

1. Update CSS in respective style files
2. Modify `[data-page="home"] .logo` and `[data-page="other"] .logo` width values
3. Update media query breakpoints if needed

### To Change Logo Images

1. Replace `logo-detailed.png` in `/images/` folder
2. Replace `logo-text.png` in `/images/` folder
3. No HTML/CSS/JS changes needed

### To Add New Pages

1. Add `data-page="other"` attribute to `.brand` element
2. Set logo src to `images/logo-text.png`
3. Include script reference: `<script src="scripts/pages/logo-switcher.js"></script>`
4. Add CSS media queries if using different brand structure

---

## Testing Checklist

- [ ] Homepage displays large detailed logo (100px desktop)
- [ ] Other pages display small text logo (42px desktop)
- [ ] Logo scales correctly on tablet (768px breakpoint)
- [ ] Logo scales correctly on mobile (480px breakpoint)
- [ ] Logo remains vertically centered in navbar
- [ ] No layout shift on page load
- [ ] Resize works smoothly without jank
- [ ] Logo maintains aspect ratio at all sizes
- [ ] Text inside detailed logo remains readable
- [ ] Text logo is crisp at smallest sizes (32px)

---

## Troubleshooting

### Logo Not Showing

- Verify image files exist: `images/logo-detailed.png` and `images/logo-text.png`
- Check browser console for 404 errors
- Ensure correct file paths in HTML

### Logo Not Scaling

- Verify CSS media queries are in correct stylesheet
- Check that `data-page` attribute is present on `.brand` element
- Verify `.logo` class has `object-fit: contain;`

### Layout Issues

- Ensure `.brand` has `display: flex;` and `align-items: center;`
- Check gap spacing between logo and brand-name
- Verify navbar padding is appropriate for screen size

### Script Not Loading

- Verify `scripts/pages/logo-switcher.js` exists and path is correct
- Check browser console for JavaScript errors
- Ensure script tag is placed before closing `</body>` tag

---

## Future Enhancements

Potential improvements to consider:

1. **Lazy Loading:** Load pages/logo-switcher.js asynchronously
2. **Favicon Integration:** Use logo colors for favicon
3. **Animation:** Add subtle fade transitions between screen sizes
4. **Dynamic Detection:** Detect page via URL without data-page attribute
5. **CDN Optimization:** Serve optimized images via CDN
6. **Dark Mode:** Provide alternative logos for dark theme

---

## Contact & Support

For questions about the dual-logo system, refer to:

- HTML structure in index.html and other page files
- CSS media query sections in style files
- JavaScript logic in scripts/pages/logo-switcher.js
