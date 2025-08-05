# Multi-Module Landing Page Platform

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Overview

This is a Nuxt 4-based landing page service designed to host multiple different landing page variants and assessment workflows. The platform provides a flexible foundation for various health-related modules, each with their own specific requirements and user flows.

### Architecture Philosophy

The application follows a modular architecture where:

- **Shared Infrastructure**: Common Nuxt 4 setup, styling system, and core utilities
- **Module Isolation**: Each landing page variant operates independently with its own stores, types, and workflows
- **Consistent Patterns**: All modules follow the same architectural conventions and design guidelines
- **Scalable Structure**: Easy to add new modules without affecting existing ones

### Current Modules

- **Coherence Assessment**: 25-question terrain assessment with personalized results (located in `/assessment/`)
- **Future Modules**: Additional landing pages and assessment workflows can be added as needed

## Technical Architecture

### Technology Stack

- **Framework**: Nuxt 4 (Vue 3 with Composition API)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Icons**: Lucide Vue Next for consistent iconography
- **State Management**: Pinia stores for module-specific state
- **Build Tool**: Vite with @tailwindcss/vite plugin
- **TypeScript**: Full TypeScript support throughout
- **Animations**: @formkit/auto-animate for smooth transitions

### Project Structure

```text
app/
├── app.vue              # Root component with global providers (Toaster, etc.)
├── components/          # Shared components
│   └── ui/             # shadcn/ui component library (comprehensive set)
├── pages/              # File-based routing (module entry points)
│   ├── index.vue       # Main landing page
│   └── [module]/       # Module-specific page directories
│       ├── index.vue   # Module landing/flow pages
│       └── *.vue       # Additional module pages
├── stores/             # Pinia stores (one per module)
│   └── [module].ts     # Module-specific state management
├── types/              # TypeScript definitions (one per module)
│   └── [module].ts     # Module-specific types
└── assets/             # Static assets
    └── css/            # Global Tailwind CSS
```

### State Management Conventions

Each module uses a single Pinia store with embedded logic:

**Store Pattern:**

```typescript
// stores/[module].ts - Module store with embedded logic
export const use[Module]Store = defineStore("[module]-store", {
  state: (): ModuleState => ({
    // Navigation state
    currentStep: 0,
    isComplete: false,
    startTime: null,

    // Module-specific data
    responses: new Map(),
    results: null,

    // UI state
    isLoading: false,
    error: null,
  }),

  getters: {
    // Computed properties for UI
    getCurrentStep(): Step,
    getProgressPercentage(): number,
  },

  actions: {
    // Navigation actions
    nextStep(),
    previousStep(),
    startModule(),
    completeModule(),

    // Data management
    setData(key: string, value: any),
    getData(key: string),

    // Business logic (embedded in store)
    calculateResults(),
    processData(),

    // Persistence
    saveToStorage(),
    loadFromStorage(),
    resetModule(),
  },
});
```

**Key Conventions:**

- One store per module with all logic embedded
- Consistent naming: `use[Module]Store`
- Standard state structure: navigation, data, UI state
- localStorage integration for persistence

## Development Guidelines

### Adding a New Module

1. **Create module directory**: `pages/[module]/`
2. **Define types**: `types/[module].ts`
3. **Implement store**: `stores/[module].ts` with embedded logic
4. **Build pages**: Following established patterns
5. **Add entry point**: Link from main landing page

### Module Architecture Pattern

Each module follows this structure:

```
/pages/[module]/        # Module pages (file-based routing)
/stores/[module].ts     # Single store with embedded logic
/types/[module].ts      # Module-specific TypeScript types
```

### Development Workflow

- **TypeScript**: Each module defines its own types in a dedicated file
- **Data Embedding**: All module-specific data should be embedded within the store
- **Testing**: Create `doc/testing/[module].md` for manual testing scenarios
- **Validation**: Implement comprehensive validation patterns in store actions

## Styling and Design Guidelines

### Design System (shadcn/ui + Tailwind CSS)

The application uses shadcn/ui components with Tailwind CSS for consistent styling:

- **Component Library**: shadcn/ui (comprehensive set of accessible components)
- **Utility Framework**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **Icons**: Lucide Vue Next for consistent iconography
- **Animations**: @formkit/auto-animate for smooth transitions

### Layout Guidelines

**Core Principles:**

- **No Margins**: Use `gap` and `padding` instead of margins wherever possible
- **Inline UI**: Keep UI code in-line within pages unless components can be reused when abstracted
- **Responsive Design**: Mobile-first approach with responsive utilities

### Component Styling Patterns

**Card Components:**

```vue
<Card class="shadow-sm border border-gray-200">
  <CardHeader class="pb-4">
    <CardTitle class="text-xl font-medium">Title</CardTitle>
  </CardHeader>
  <CardContent class="flex flex-col gap-6">
    <!-- Content with gap spacing -->
  </CardContent>
</Card>
```

**Button Variants:**

```vue
<Button variant="default" size="lg">Primary Action</Button>
<Button variant="outline" size="lg">Secondary Action</Button>
<Button variant="destructive">Delete Action</Button>
```

**Collapsible Sections:**

```vue
<Collapsible v-model:open="isOpen">
  <CollapsibleTrigger class="flex items-center justify-between w-full cursor-pointer">
    <CardTitle>Section Title</CardTitle>
    <Icon :name="isOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'" />
  </CollapsibleTrigger>
  <CollapsibleContent v-auto-animate>
    <!-- Animated content -->
  </CollapsibleContent>
</Collapsible>
```

### Color and Typography

**Color Usage:**

- use color variables from [tailwind](app/assets/css/tailwind.css) in most cases

## Error Handling and Validation

### Module Validation Patterns

- Implement validation methods in store actions
- Use TypeScript interfaces for type safety
- Validate data at state boundaries

### State Persistence and Recovery

- Use localStorage for progress tracking (surveys, assessments)
- Implement save/load methods in store actions
- Handle data migration for schema changes

### UI Error States

**Common Error Handling Patterns:**

- **Loading States**: Consistent spinner indicators during processing
- **Validation Messages**: Clear, actionable error feedback
- **Fallback Content**: Graceful degradation when data is unavailable
- **Navigation Guards**: Prevent invalid state transitions
- **Error Boundaries**: Catch and handle component-level errors

## Performance and Optimization

### Module Performance Guidelines

**Data Performance:**

- **Map-based Storage**: Use Map objects for O(1) lookup performance
- **Embedded Logic**: Keep business logic in stores to minimize overhead
- **Lazy Evaluation**: Calculate results only when required
- **Memoization**: Cache expensive computations with computed properties

### Memory Management

**Resource Cleanup:**

```typescript
// Component lifecycle management
onMounted(() => {
  moduleStore.initializeModule();
});

onUnmounted(() => {
  // Clean up timers
  if (autoAdvanceTimeout.value) {
    clearTimeout(autoAdvanceTimeout.value);
  }

  // Clean up event listeners
  moduleStore.removeEventListeners();
});
```

**State Optimization:**

- **Efficient Serialization**: Optimize localStorage data structure
- **Memory Leaks Prevention**: Proper cleanup of reactive references
- **Component Lifecycle**: Use appropriate mounted/unmounted hooks

## Testing Strategy

### Unit Testing (Vitest + Vue Test Utils)

**Store Testing:**

- Business logic calculations with known inputs
- Data processing algorithms with edge cases
- Validation methods with various input scenarios
- State management and persistence functionality

### Integration Testing

**Module Flow Testing:**

- Complete module flow from start to finish
- Data persistence across page refreshes
- Navigation between steps
- Error handling and recovery

**Cross-Module Testing:**

- Shared component behavior consistency
- Common utility function reliability
- Platform-wide styling consistency
- Performance benchmarks across modules

### Quality Assurance

**Testing Standards:**

- **Functionality**: All features work as designed
- **Usability**: Intuitive user experience across modules
- **Performance**: Meet platform performance targets
- **Accessibility**: WCAG 2.1 compliance
- **Browser Compatibility**: Support for modern browsers

**Automated Testing:**

```typescript
// Example test structure
describe("Module Store", () => {
  it("should calculate results correctly", () => {
    const store = useModuleStore();
    const testData = generateTestData();
    const results = store.calculateResults(testData);
    expect(results.score).toBe(expectedScore);
  });
});
```

**Manual Testing:**

- provide documentation named "doc/testing/[module].md"
- list all the scenarios a human should try to perform to test

## Implementation Guidelines for AI Development

### Core Architecture Principles

1. **Single Store Pattern**: Use one Pinia store per module (`stores/[module].ts`) with all business logic embedded
2. **Inline UI Components**: Keep UI code within page components unless components can be reused when abstracted
3. **No Margins Rule**: Use `gap` and `padding` instead of margins wherever possible for consistent spacing
4. **Type Safety**: Leverage TypeScript throughout with proper interfaces in `types/[module].ts`

### Module Development Standards

**State Management:**

- All module data embedded in store (questions, configuration, business logic)
- Map-based data storage for efficient lookups
- localStorage integration for persistence across sessions
- Consistent naming: `use[Module]Store`

**Business Logic:**

- Calculation algorithms embedded in store actions
- Validation methods for data integrity
- Result generation and formatting
- Error handling and recovery

**UI Patterns:**

- shadcn/ui components for consistent design system
- Collapsible sections with auto-animate for smooth transitions
- Progress tracking with visual feedback
- Responsive design with mobile-first approach
