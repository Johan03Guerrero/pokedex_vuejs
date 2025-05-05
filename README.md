# Pokedex Vue.js

A modern Pokédex web application built with Vue.js that allows users to search, filter, and manage their favorite Pokémon.

## 🎥 Project Demo

![Pokedex Demo](./src/assets/videos/pokedex.webm)

## 🚀 Features

- 🔍 Real-time Pokémon search
- ⭐ Favorites system
- 🎨 Modern and responsive interface
- 📱 Mobile-friendly design
- 🔄 Favorites filtering
- 📋 Pokémon details modal
- 📤 Share Pokémon information

## 🛠️ Technologies and Dependencies

### Core
- **Vue.js 3**: Main framework for building the user interface
  - Used for its reactive component system and excellent performance
  - Implements Composition API for better code organization

- **TypeScript**: JavaScript superset that adds static typing
  - Improves maintainability and reduces development-time errors
  - Provides better autocompletion and IDE documentation

### State and Data
- **Pinia**: State management
  - Implemented to handle global application state
  - Manages favorites list and authentication state

- **Vue Query**: Server data handling
  - Used to manage cache and API requests
  - Provides automatic loading and error states

### UI/UX
- **Tailwind CSS**: CSS utility framework
  - Implemented for quick and consistent design
  - Provides utility classes for responsive styles

- **Font Awesome**: Icons
  - Used for interface icons (search, favorites, etc.)

### Testing
- **Vitest**: Testing framework
  - Implemented for unit and component testing
  - Provides a fast testing environment compatible with Vue

- **@testing-library/vue**: Testing utilities
  - Facilitates Vue component testing
  - Provides methods to interact with the DOM

- **@pinia/testing**: Pinia testing
  - Allows mocking Pinia store in tests

- **@faker-js/faker**: Test data generation
  - Used to create random test data
  - Helps test different scenarios

## 📁 Project Structure

```
src/
├── pokedex/
│   ├── components/
│   │   ├── PokemonItem.vue
│   │   └── PokemonDetailModal.vue
│   ├── controllers/
│   │   └── pokemon.controller.ts
│   ├── services/
│   │   └── pokemon.service.ts
│   └── views/
│       ├── __tests__/
│       │   └── PokemonList.spec.ts
│       └── PokemonList.vue
├── core/
│   └── controllers/
│       └── usePokemonStore.controller.ts
└── commons/
    └── components/
        └── Loader.vue
```

## 🚀 Installation Guide

1. Clone the repository:
```bash
git clone https://github.com/Johan03Guerrero/pokedex_vuejs.git
cd pokedex_vuejs
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm run test
```

## 🧪 Testing

The project includes unit tests for main components. Tests are located in the `__tests__` directory and use Vitest along with Testing Library.

Example test:
```typescript
describe("[views] Given PokemonList", () => {
  describe("When is mounted and there is pokemon data", () => {
    it("Then it should render the search input", async () => {
      const { findByPlaceholderText } = render(PokemonList, renderConfig);
      const searchInput = await findByPlaceholderText(/Search/i);
      expect(searchInput).toBeDefined();
    });
  });
});
```

## 🔄 Development Process

### 1. Architecture and Design Patterns

#### Layered Architecture
The application follows a well-defined layered architecture:

1. **Presentation Layer (Components)**
   - Vue components handling the user interface
   - Separated by responsibility (PokemonItem, PokemonDetailModal)
   - Use composables for reusable logic

2. **Control Layer (Controllers)**
   - Coordinate interaction between views and services
   - Handle business logic
   - Manage component local state

3. **Service Layer**
   - Implement business logic
   - Handle external API calls
   - Adapt external data to our model

4. **View Layer**
   - Main application pages
   - Orchestrate components and logic
   - Handle navigation and global state

#### Implemented Patterns

1. **Adapter Pattern**
   - Implemented adapters to transform Pokémon API data
   - Maintains consistent data model
   - Facilitates data source changes without affecting the application

2. **Repository Pattern**
   - Abstract data access in repositories
   - Centralize data access logic
   - Facilitate data source changes

3. **Controller Pattern**
   - Implemented controllers to handle business logic
   - Separate logic from user interface
   - Facilitate code reuse

### 2. State Management with Pinia

#### Store Structure
1. **Main Store (PokemonStore)**
   - Manages global application state
   - Maintains favorites list
   - Provides actions to modify state

2. **Persistent State**
   - Favorites persist between sessions
   - Use localStorage for persistence
   - Implement automatic synchronization

3. **Actions and Mutations**
   - Actions for asynchronous operations
   - Mutations for synchronous state changes
   - Getters for secure state access

#### Component Integration
1. **Composables**
   - Created composables to interact with store
   - Encapsulate state logic
   - Facilitate reuse

2. **Reactivity**
   - Leverage Pinia's reactivity
   - Components update automatically
   - Maintain state consistency

### 3. Controllers and Business Logic

#### Controller Implementation
1. **PokemonController**
   - Coordinates Pokémon search
   - Handles favorites logic
   - Manages loading and error states

2. **SearchController**
   - Implements search logic
   - Handles search debouncing
   - Manages results cache

3. **ModalController**
   - Controls details modal logic
   - Handles information sharing
   - Manages modal state

#### Error Handling
1. **Error Strategy**
   - Implemented centralized error system
   - Handle different error types
   - Provide user feedback

2. **Error Recovery**
   - Implement retry mechanisms
   - Handle data fallbacks
   - Provide user-friendly error states

### 4. Testing

#### Testing Strategy
1. **Unit Testing**
   - Individual component testing
   - Props and events verification
   - Business logic testing

2. **Integration Testing**
   - Complete flow testing
   - Component interaction verification
   - Store integration testing

3. **Mocking Strategy**
   - External service mocking
   - API response simulation
   - Store and component mocking

#### Testing Tools
1. **Vitest**
   - Fast testing framework
   - Vue 3 compatible
   - TypeScript support

2. **Testing Library**
   - User-centric testing
   - Role-based queries
   - Easy Vue integration

3. **Pinia Testing**
   - Store testing
   - Global state mocking
   - Action verification

### 5. Optimization and Improvements

#### Performance
1. **Rendering Optimization**
   - Implemented lazy loading
   - Optimized re-renders
   - Used memoization

2. **Cache and State**
   - Implemented results cache
   - Optimized global state
   - Reduced API calls

#### UX Improvements
1. **Visual Feedback**
   - Loading states
   - Error messages
   - Smooth animations

2. **Accessibility**
   - Implemented ARIA labels
   - Improved keyboard navigation
   - Ensured adequate contrast

## 📝 License

This project is under the MIT License. See the `LICENSE` file for details.

## 👥 Authors

- **Johan Guerrero** - *Initial development* - [Johan03Guerrero](https://github.com/Johan03Guerrero)
