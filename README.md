# oomo

# Terrain Coherence Dashboard - AI Development Documentation

## 1. Project Overview

### 1.1 Purpose

The Terrain Coherence Dashboard is a Nuxt 4-based health optimization tracking application that guides users through a structured 5-phase wellness protocol. It provides a comprehensive interface for tracking progress through foundational health improvements (Phase 0) and coherence building (Phase 1), with premium phases locked for future development.

### 1.2 Core Concept

The application is based on "terrain optimization" - a health approach that focuses on:

- **Foundation (Phase 0)**: Removing systemic burdens and restoring basic biological functions
- **Coherence (Phase 1)**: Building synchronized rhythms and stable routines
- **Future Phases (2-4)**: Amplitude, Resilience, and Emergence (premium features)

### 1.3 Target Users

- Health optimization enthusiasts
- Individuals following structured wellness protocols
- Users seeking systematic approaches to circadian health and metabolic optimization

## 2. Technical Architecture

### 2.1 Technology Stack

- **Framework**: Nuxt 4 (Vue 3 with Composition API)
- **Styling**: Tailwind CSS utility classes with shadcn/ui components
- **Icons**: Lucide Vue icon library
- **State Management**: Pinia stores for global state
- **Build Tool**: Vite (default with Nuxt 4)
- **TypeScript**: Full TypeScript support

### 2.2 Structure

#### Directory

```text
client/
├── app/                   # Application source code
│   ├── app.vue           # Root component
│   ├── assets/           # Static assets (CSS, images)
│   ├── components/       # Vue components
│   │   ├── ui/          # shadcn/ui components
│   │   └── App/         # Application-specific components
│   ├── composables/      # Vue composables (business logic)
│   ├── layouts/          # Layout components
│   ├── middleware/       # Route middleware
│   ├── pages/           # File-based routing pages
│   ├── plugins/         # Nuxt plugins
│   ├── stores/          # Pinia stores (state management)
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── i18n/                # Internationalization
├── public/              # Public static files
├── nuxt.config.ts       # Nuxt configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

#### Component Hierarchy

```
TerrainCoherenceDashboard (Main Layout/Page)
├── Header Section
├── Phase Navigation Component
├── Main Content Area
│   ├── Phase 0 Content (4 subphases)
│   └── Phase 1 Content
└── Modal Components
    ├── AI Modal
    ├── Link Options Modal
    └── Premium Modal
```

### 2.3 State Management with Pinia

The application uses Pinia stores for centralized state management:

```typescript
// stores/terrain.ts - Main terrain dashboard store
export const useTerrainStore = defineStore("terrain", () => {
  // Navigation state
  const currentView = ref<string>("phase0");
  const currentSubphase = ref<string>("0.1");

  // UI state
  const expandedSections = ref<Record<string, boolean>>({});
  const completedGates = ref<Record<string, boolean>>({});

  // Modal state
  const showPremiumModal = ref<boolean>(false);
  const showAIModal = ref<boolean>(false);
  const showLinkOptions = ref<boolean>(false);

  // AI-specific state
  const aiLoading = ref<boolean>(false);
  const aiPhase = ref<string>("");
  const selectedLink = ref<string>("");

  // Actions
  const setCurrentView = (view: string) => {
    currentView.value = view;
  };

  const toggleSection = (sectionId: string) => {
    expandedSections.value[sectionId] = !expandedSections.value[sectionId];
  };

  const toggleGate = (gateId: string) => {
    completedGates.value[gateId] = !completedGates.value[gateId];
  };

  return {
    // State
    currentView,
    currentSubphase,
    expandedSections,
    completedGates,
    showPremiumModal,
    showAIModal,
    showLinkOptions,
    aiLoading,
    aiPhase,
    selectedLink,
    // Actions
    setCurrentView,
    toggleSection,
    toggleGate,
  };
});
```

## 3. Data Structure and Content

### 3.1 Phase 0 Content Structure

Phase 0 contains 4 subphases, each with identical data structure:

```typescript
// types/terrain.ts
export interface ActionItem {
  id: string;
  text: string;
  priority: "Essential" | "Non-essential";
  maintainThrough?: string;
}

export interface Gate {
  id: string;
  text: string;
  completed?: boolean;
}

export interface SubphaseContent {
  title: string;
  framing: string;
  sections: {
    Light: string[];
    Field: string[];
    Substance: string[];
    Pattern: string[];
  };
  subjectiveGates: string[];
  objectiveGates: string[];
}

// composables/useTerrainContent.ts
const phase0Content: Record<string, SubphaseContent> = {
  "0.1": {
    title: "Burden Offloading",
    framing:
      "Remove chaos inputs to lower systemic pressure. Avoids overwhelming redox, bile, and fascia.",
    sections: {
      Light: [
        "Avoid all direct sunlight at any time of day. (Essential)",
        "Indirect indoor light is tolerable but should not be deliberately sought. (Non-essential)",
        "Use dim, warm artificial light at night. (Essential, maintain through Phase 1)",
      ],
      Field: [
        "Remove all artificial fragrances (detergents, air fresheners, scented soaps). (Essential, maintain through all phases)",
        "Turn off WiFi at night and keep phone in airplane mode away from the body. (Essential, maintain through Phase 1)",
        "Minimize Bluetooth and wearables. (Non-essential, maintain through Phase 1)",
      ],
      Substance: [
        "Eat warm, low-fat, simple meals with few ingredients. (Essential, maintain through Phase 1)",
        "Avoid all seed oils and any foods containing them. (Essential, maintain through all phases)",
        "Eliminate caffeine, alcohol, and processed sugar. (Essential, maintain through Phase 1)",
        "Start each morning with warm salt water (¼–½ tsp high-mineral salt). (Essential, maintain through Phase 1)",
        "No snacking between meals. (Essential, maintain through Phase 1)",
      ],
      Pattern: [
        "Fix wake and sleep times within ±30 minutes. (Essential, maintain through Phase 1)",
        "Delay breakfast until true hunger. (Essential, maintain through Phase 1)",
        "Keep consistent meal times daily. (Essential, maintain through Phase 1)",
        "Do not engage in grounding, breathwork, or meditation intentionally. (Essential)",
      ],
    },
    subjectiveGates: [
      "Less bloating after meals",
      "Morning hunger reappears",
      "Less sensory overwhelm, esp. light/noise",
    ],
    objectiveGates: ["TG < 90", "ALT/AST < 20", "HTMA: Ca/Mg normalizing"],
  },
  // Additional subphases: 0.2, 0.3, 0.4 with similar structure
};
```

### 3.2 Phase 1 Content Structure

```typescript
const phase1Content: SubphaseContent = {
  title: "Coherence",
  framing:
    "Rebuild internal harmony by anchoring circadian and peripheral rhythms, clarifying signal inputs, and establishing stable routines. This is where true synchrony is built—rhythms, signals, and behaviors begin reinforcing each other.",
  sections: {
    Light: [
      "Daily early-morning direct sunlight within 30 minutes of wake time, skin + eyes exposed (Essential, maintained indefinitely)",
      "Gentle midday sunlight 3–4×/week for 10–20 minutes, build tolerance slowly (Essential, maintained indefinitely)",
      "No sunglasses unless medically required (Essential, maintained permanently)",
      "Continue dim light after sunset, or red-only light environments (Essential, maintain through Phase 2)",
    ],
    Field: [
      "Begin safe outdoor grounding on natural surfaces for 10–20 minutes/day, ideally during morning light (Essential, maintained indefinitely)",
      "Continue keeping devices in airplane mode when not in use; avoid EMF exposure at night (Essential, maintained permanently)",
      "Optional: Low-EMF environment sleep audit (kill switch, EMF shielding) (Non-essential)",
    ],
    Substance: [
      "Gradually increase healthy fat intake to moderate (e.g. ghee, egg yolks, olive oil, fish) (Essential, maintain through Phase 2)",
      "Reintroduce small portions of raw foods if digestion is stable (Non-essential, maintain through Phase 2)",
      "Prioritize hydrogen-structured water, spring or filtered, consumed away from meals (Essential, maintained indefinitely)",
      "Avoid stimulants (coffee, chocolate) unless previously tolerated and exits are consistent (Essential, reintroduce in Phase 2 or later)",
      "Bone broth remains central if tolerated (Essential, maintain through Phase 3)",
      "Avoid any new supplements or biohacks unless terrain is stable (Essential)",
    ],
    Pattern: [
      "Lock in fixed wake and sleep times (within 15 min window) (Essential, maintained permanently)",
      "Morning movement within 30 min of wake time (walk, stretch) (Essential, maintain through Phase 2)",
      "Meals at regular clock times (3/day max), matching digestive peak windows (Essential, maintained permanently)",
      "No snacking or grazing; no eating after sunset (Essential, maintained indefinitely)",
      "Add 1–2 structured social rhythms per week (shared meals, calls) (Non-essential, maintain through Phase 3)",
    ],
  },
  subjectiveGates: [
    "Sleep onset and wake timing feel automatic",
    "Energy stays stable through the day",
    "Hunger and elimination follow clear pattern",
    "Cravings and compensations reduced",
    "Mental state more stable and less reactive",
  ],
  objectiveGates: [
    "Cortisol AM:PM ratio stabilizing (saliva or Oura)",
    "HRV trending upward week-over-week",
    "Sleep latency < 15 min without crutches",
    "TG:HDL < 2",
    "AM body temp consistently 97.7–98.3°F (36.5–36.8°C)",
  ],
};
```

### 3.3 Complete Phase 0 Subphase Details

Based on the prototype, here are the complete subphase structures:

**Phase 0.2: "Exits Restoration"**

- **Framing**: "Restore bile, kidney, gut, and fascia drainage to allow entropy and waste to exit systemically. All downstream progress depends on the strength and clarity of these exits."

**Phase 0.3: "Override Softening"**

- **Framing**: "Reduce behavioral, mental, and biochemical override patterns that distort internal sensing. The goal is to resensitize the system to subtle cues—without force or premature entrainment."

**Phase 0.4: "Fascia Unlocking"**

- **Framing**: "Reopen signal conduction, water structuring, and charge transfer by restoring fascia elasticity and bioelectric responsiveness. Fascia is a signaling and fluid transfer interface—not just structural tissue—and this phase prepares it to transmit coherent cues."

### 3.4 Content Categories

**Four Main Action Categories:**

1. **Light**: Circadian rhythm and light exposure protocols
2. **Field**: EMF management and environmental factors
3. **Substance**: Nutrition and supplementation guidelines
4. **Pattern**: Behavioral routines and timing protocols

**Two Gate Types:**

1. **Subjective Gates**: Self-reported progress indicators
2. **Objective Gates**: Measurable biomarkers and metrics

## 4. User Flows and Interactions

### 4.1 Primary Navigation Flow

```
Start → Phase 0 (default) → Select Subphase (0.1-0.4) → Review Content → Track Progress
                ↓
Phase 1 → Review Coherence Content → Track Progress
                ↓
Phase 2-4 → Premium Modal (locked content)
```

### 4.2 Content Interaction Flow

```
View Phase Overview → Navigate to Subphase → Expand Action Sections → Check off Gates → Progress to Next Subphase/Phase
```

### 4.3 Modal Interactions

**AI Modal Flow:**

1. User clicks "oomo AI" button
2. Modal opens with loading state (2.5 second simulation)
3. AI-generated content displays with clickable research links
4. Links trigger Link Options Modal

**Premium Modal Flow:**

1. User clicks locked phase (2-4)
2. Premium upgrade modal displays
3. Options to cancel or upgrade

### 4.4 Progress Tracking Flow

1. User views gates (subjective/objective)
2. Checks off completed items
3. Progress persists in component state
4. Visual feedback (strikethrough, gray text) for completed items

## 5. Component Specifications

### 5.1 Header Component (`components/TerrainHeader.vue`)

**Elements:**

- Application title and subtitle
- Three metric displays (Terrain: 78, Coherence: 65, DOC: 82)

**Implementation:**

```vue
<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-4xl mx-auto px-6 py-4">
      <!-- Component content -->
    </div>
  </header>
</template>

<script setup lang="ts">
// Component logic using Composition API
</script>
```

**Styling Requirements:**

- Clean, minimal design using shadcn/ui components
- Metrics displayed as numbers with labels
- Consistent spacing and typography

### 5.2 Phase Navigation (`components/PhaseNavigation.vue`)

**Functionality:**

- 5 circular phase buttons (0-4)
- Active state highlighting
- Phases 2-4 display lock icons
- Click handlers for navigation and premium modal

**Implementation Pattern:**

```vue
<template>
  <nav class="flex justify-center space-x-4 mb-8">
    <Button
      v-for="phase in phases"
      :key="phase.id"
      :variant="currentPhase === phase.id ? 'default' : 'outline'"
      @click="handlePhaseClick(phase.id)"
    >
      <!-- Button content -->
    </Button>
  </nav>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useTerrainStore } from "@/stores/terrain";

const terrainStore = useTerrainStore();
// Component logic
</script>
```

**Visual States:**

- Active: Blue background, blue border, blue text
- Inactive: Gray background, gray border, gray text
- Locked: Gray with lock icon, triggers premium modal

### 5.3 Expandable Sections (`components/ExpandableSection.vue`)

**Behavior:**

- Sections collapsed by default
- Click header to expand/collapse
- Smooth transitions using Vue transitions
- Icon rotation (chevron right/down)

**Implementation:**

```vue
<template>
  <Collapsible v-model:open="isOpen">
    <CollapsibleTrigger class="flex items-center justify-between w-full">
      <!-- Trigger content -->
    </CollapsibleTrigger>
    <CollapsibleContent>
      <!-- Section content -->
    </CollapsibleContent>
  </Collapsible>
</template>

<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
</script>
```

**Icons per Section (using NuxtIcon):**

- Light: Sun icon
- Field: Radio icon
- Substance: Utensils icon
- Pattern: Repeat icon

### 5.4 Gate Tracking (`components/GateTracker.vue`)

**Checkbox Functionality:**

- Individual state tracking per gate using Pinia
- Visual feedback for completion
- Persistent state during session
- Unique IDs for each checkbox

**Implementation:**

```vue
<template>
  <div class="grid md:grid-cols-2 gap-6">
    <Card v-for="gate in gates" :key="gate.id">
      <CardContent class="p-4">
        <label class="flex items-center space-x-3 cursor-pointer">
          <Checkbox
            :checked="terrainStore.completedGates[gate.id]"
            @update:checked="terrainStore.toggleGate(gate.id)"
          />
          <span
            :class="{
              'line-through text-gray-500':
                terrainStore.completedGates[gate.id],
            }"
          >
            {{ gate.text }}
          </span>
        </label>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTerrainStore } from "@/stores/terrain";
</script>
```

**Key Format:** `${phaseId}-${gateType}-${index}`

## 6. AI Integration Specifications

### 6.1 AI Content System (`composables/useAI.ts`)

**Mock AI Responses:**

- Phase 0: Foundation analysis with research citations
- Phase 1: Coherence optimization strategies
- Loading simulation: 2.5 seconds
- Rich content with markdown-style formatting

**Implementation:**

```typescript
export const useAI = () => {
  const isLoading = ref(false);
  const content = ref("");

  const generateContent = async (phase: string) => {
    isLoading.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    content.value = getMockAIResponse(phase);
    isLoading.value = false;
  };

  return {
    isLoading: readonly(isLoading),
    content: readonly(content),
    generateContent,
  };
};
```

### 6.2 Research Link System (`components/AIModal.vue`)

**Link Detection:**

- Regex pattern: `\[(.*?)\]\((.*?)\)`
- Clickable links within AI content
- External link icon display using NuxtIcon
- Link options modal trigger

**Vue Implementation:**

```vue
<template>
  <Dialog v-model:open="terrainStore.showAIModal">
    <DialogContent class="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>oomo AI Analysis</DialogTitle>
      </DialogHeader>

      <div v-if="aiComposable.isLoading" class="flex justify-center py-8">
        <LoadingSpinner />
      </div>

      <div v-else class="prose prose-sm max-w-none">
        <!-- Rendered AI content with clickable links -->
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAI } from "@/composables/useAI";
import { useTerrainStore } from "@/stores/terrain";
</script>
```

### 6.3 AI Content Requirements

- Professional, science-based tone
- Bullet points and structured formatting
- Fake research citations for demonstration
- Actionable insights and recommendations

## 7. Styling and Design System

### 7.1 Color System (shadcn/ui with OKLCH)

The application uses shadcn/ui's modern OKLCH color system for better color consistency and accessibility:

```css
:root {
  --background: oklch(1 0 0); /* Pure white background */
  --foreground: oklch(0.145 0 0); /* Near-black text */
  --primary: oklch(0.205 0 0); /* Dark primary color */
  --primary-foreground: oklch(0.985 0 0); /* Light text on primary */
  --secondary: oklch(0.97 0 0); /* Light secondary */
  --muted: oklch(0.97 0 0); /* Muted backgrounds */
  --muted-foreground: oklch(0.556 0 0); /* Muted text */
  --border: oklch(0.922 0 0); /* Subtle borders */
  --destructive: oklch(0.577 0.245 27.325); /* Error states */
}
```

**Key Benefits:**

- **Perceptual uniformity**: OKLCH provides better color consistency
- **Accessibility**: Better contrast ratios and color relationships
- **Customizable**: All colors defined via CSS custom properties
- **Dark mode ready**: Automatic theme switching support

### 7.2 Layout Patterns

- **Container**: `max-w-4xl mx-auto px-6`
- **Card**: shadcn/ui Card components (`Card`, `CardContent`, `CardHeader`)
- **Modal**: shadcn/ui Dialog components with backdrop
- **Grid**: `grid md:grid-cols-2 gap-6` for gates

### 7.3 Typography Scale (shadcn/ui semantic classes)

- **Heading 1**: `text-2xl font-light` or use shadcn/ui typography utilities
- **Heading 2**: `text-lg font-medium`
- **Body**: `text-sm text-muted-foreground` (uses OKLCH muted color)
- **Caption**: `text-xs text-muted-foreground`

### 7.4 Component Theming

**Semantic Color Usage:**

```vue
<!-- Primary actions -->
<Button variant="default">Primary Action</Button>

<!-- Secondary actions -->
<Button variant="secondary">Secondary Action</Button>

<!-- Destructive actions -->
<Button variant="destructive">Delete</Button>

<!-- Muted content -->
<p class="text-muted-foreground">Supporting text</p>

<!-- Cards with proper contrast -->
<Card class="bg-card text-card-foreground border-border">
  <CardContent>Content with semantic colors</CardContent>
</Card>
```

### 7.5 Interactive States

- **Hover**: Consistent hover effects across shadcn/ui Button components
- **Active**: Clear active state differentiation using Button variants
- **Disabled**: Reduced opacity and non-interactive state
- **Focus**: Proper focus rings for accessibility (uses `--ring` OKLCH color)

## 8. Error Handling and Edge Cases

### 8.1 Data Validation

- Check for existence of phase content before rendering using computed properties
- Fallback UI for missing data
- Graceful degradation for incomplete content using Vue's conditional rendering

### 8.2 State Management Edge Cases

- Handle undefined gate states in Pinia store getters
- Prevent state corruption during rapid interactions using proper reactive patterns
- Ensure modal state consistency across components

### 8.3 Browser Compatibility

- Modern browser support (ES2022+ with Nuxt 4)
- Responsive design for mobile/tablet using Tailwind responsive utilities
- Fallback fonts and icon handling

## 9. Performance Considerations

### 9.1 Optimization Strategies

- Minimal re-renders through Vue 3's reactivity system and proper ref usage
- Efficient v-for rendering with stable keys
- Conditional rendering for large content blocks using v-if/v-show
- Optimized icon loading from NuxtIcon
- Lazy loading of modal components

### 9.2 Memory Management

- Clean modal state on close using Pinia actions
- Prevent memory leaks in setTimeout callbacks with proper cleanup
- Efficient object updates in Pinia stores using proper reactive patterns

## 10. Testing Specifications

### 10.1 Unit Testing Requirements (Vitest + Vue Test Utils)

- Component rendering tests using @vue/test-utils
- Pinia store functionality testing
- User interaction handlers using fireEvent
- Modal behavior validation

### 10.2 Integration Testing

- Phase navigation flow testing
- Gate tracking persistence with Pinia
- Modal interaction chains
- Content display accuracy

### 10.3 Accessibility Testing

- Keyboard navigation support
- Screen reader compatibility
- ARIA labels and roles (built into shadcn/ui components)
- Color contrast validation

## 11. Future Development Considerations

### 11.1 Premium Feature Integration

- Phase 2-4 content structure planning
- Payment integration requirements (possibly Stripe)
- User account management with Nuxt Auth
- Progress persistence across sessions using localStorage or database

### 11.2 Real AI Integration

- API endpoint specifications (OpenAI, Anthropic, etc.)
- Authentication requirements
- Content caching strategies using Nuxt's built-in caching
- Error handling for AI failures

### 11.3 Data Persistence

- Local storage implementation using VueUse composables
- Cloud synchronization options (Supabase, Firebase)
- Export/import functionality
- Progress analytics

## 12. Deployment Requirements

### 12.1 Build Configuration (Nuxt 4)

- Nuxt 4 build optimization (automatic)
- Tailwind CSS purging (built-in)
- Icon tree-shaking from NuxtIcon
- Bundle size optimization through Nitro

### 12.2 Environment Setup

- Node.js 18+ requirements
- Package dependencies (pnpm recommended)
- Development server configuration (`nuxt dev`)
- Production build process (`nuxt build`)

### 12.3 Browser Support

- Modern browser compatibility (ES2022+)
- Mobile responsiveness using Tailwind
- Performance benchmarks with Nuxt DevTools
- Accessibility compliance (WCAG 2.1)

---

## Implementation Notes for AI Development Teams

1. **State Management**: Use Pinia stores for global state - leverage Vue 3's reactivity system
2. **Content Structure**: Maintain the nested object structure with proper TypeScript interfaces
3. **Modal System**: Use shadcn/ui Dialog components for consistent modal behavior
4. **Styling**: Stick to Tailwind utility classes and shadcn/ui components - avoid custom CSS
5. **Icons**: Use NuxtIcon for consistency with the icon library
6. **Accessibility**: shadcn/ui components come with proper ARIA labels and keyboard navigation
7. **Performance**: Leverage Vue 3's reactivity and Nuxt 4's optimization features
8. **Testing**: Use Vitest (built into Nuxt 4) and @vue/test-utils for component testing
9. **File Structure**: Follow Nuxt 4 conventions for auto-imports and file organization
10. **TypeScript**: Use strict TypeScript throughout the application for better DX
