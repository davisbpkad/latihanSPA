# LatihanSPA - Vue.js Single Page Application

A modern Vue.js SPA demonstrating best practices with components, views, and proper architecture.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Navbar.vue      # Navigation component
│   ├── ProductItem.vue # Product display component
│   ├── ProductForm.vue # Product form component
│   ├── ProductSearch.vue # Search functionality
│   ├── GalleryItem.vue # Gallery image component
│   └── ...
├── views/              # Page-level components
│   ├── HomeView.vue    # Home page
│   ├── ProductView.vue # Products page
│   ├── GalleryView.vue # Gallery page
│   └── ...
├── composables/        # Reusable logic
│   └── useLocalStorage.js # localStorage management
├── utils/              # Utility functions
│   └── api.js         # API handling functions
├── constants/          # Application constants
│   └── api.js         # API URLs and defaults
└── router/            # Vue Router configuration
```

## ✨ Features

### 🛍️ Product Management
- **CRUD Operations**: Create, Read, Update, Delete products
- **Search Functionality**: Real-time product search
- **Form Validation**: Input validation and error handling
- **Local Storage**: Persistent data storage

### 🖼️ Gallery
- **Picsum Integration**: High-quality random images
- **Responsive Design**: Works on all devices
- **Loading States**: Smooth loading experience
- **Error Handling**: Graceful error management

### 🎨 UI/UX
- **Modern Design**: Clean, responsive interface
- **Bootstrap Integration**: Professional styling
- **Font Awesome Icons**: Beautiful iconography
- **Hover Effects**: Interactive user experience

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd latihanSPA

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏛️ Architecture

### Component Design
- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Components are designed to be reusable
- **Props & Events**: Clean data flow between components
- **Composition API**: Modern Vue.js patterns

### State Management
- **Local State**: Component-level state with `ref()` and `reactive()`
- **Persistent Storage**: `useLocalStorage` composable for data persistence
- **Reactive Updates**: Automatic UI updates when data changes

### API Integration
- **Centralized Configuration**: API URLs in constants
- **Error Handling**: Robust error handling with fallbacks
- **Utility Functions**: Reusable API functions
- **Type Safety**: JSDoc documentation for better development experience

## 📝 Code Quality

### Best Practices
- ✅ **Composition API**: Modern Vue.js patterns
- ✅ **Component Separation**: Clear separation of concerns
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Documentation**: JSDoc comments for functions
- ✅ **Consistent Naming**: Clear, descriptive names
- ✅ **Responsive Design**: Mobile-first approach

### Performance
- **Lazy Loading**: Images load with loading states
- **Efficient Rendering**: Optimized component updates
- **Minimal Re-renders**: Smart use of Vue's reactivity system

## 🔧 Development

### Adding New Features
1. Create components in `src/components/`
2. Create views in `src/views/`
3. Add routes in `src/router/index.js`
4. Use existing utilities and composables
5. Follow established patterns

### Code Style
- Use Composition API with `<script setup>`
- Follow Vue.js style guide
- Use meaningful component and variable names
- Add JSDoc comments for complex functions

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.
