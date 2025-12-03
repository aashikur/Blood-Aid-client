# Contributing to Blood-Aid

Thank you for considering contributing to Blood-Aid! This document provides guidelines and instructions for contributing to the project.

## 🎯 Our Mission

Blood-Aid connects blood donors with patients in emergency need. By contributing, you're helping save lives and improve healthcare accessibility.

## 📋 Code of Conduct

- Be respectful and inclusive
- Welcome feedback and criticism
- Focus on problems, not people
- Report violations to maintainers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- GitHub account

### Setup Development Environment

1. **Fork the repository**
   - Click "Fork" on GitHub
   - Clone your fork: `git clone https://github.com/YOUR_USERNAME/Blood-Aid-client.git`

2. **Install dependencies**
   ```bash
   cd Blood-Aid-client
   npm install
   ```

3. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Setup environment**
   ```bash
   cp .env.example .env.local
   # Add your Firebase, Stripe, and ImgBB credentials
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Making Changes

### Code Standards

- **Formatting**: Use ESLint & Prettier
  ```bash
  npm run lint
  npm run format
  ```

- **Component Structure**
  ```jsx
  // ✅ Good
  const MyComponent = ({ title, onAction }) => {
    return <div>{title}</div>;
  };
  
  MyComponent.propTypes = {
    title: PropTypes.string.isRequired,
    onAction: PropTypes.func
  };
  ```

- **Naming Conventions**
  - Components: PascalCase (`DonorDashboard.jsx`)
  - Files: Match component name
  - Variables: camelCase (`donorList`, `isLoading`)
  - Constants: UPPER_SNAKE_CASE (`API_URL`, `MAX_ITEMS_PER_PAGE`)

- **File Organization**
  ```
  Feature/
  ├── ComponentName.jsx
  ├── ComponentName.module.css (if needed)
  ├── hooks/ (custom hooks for this feature)
  └── utils/ (utility functions)
  ```

### Git Workflow

1. **Create descriptive commit messages**
   ```bash
   git commit -m "feat: add donor search by blood group"
   git commit -m "fix: resolve query invalidation on payment"
   git commit -m "docs: update API documentation"
   git commit -m "refactor: simplify filter logic in donations table"
   ```

   **Prefixes:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `style:` - Formatting/styling
   - `refactor:` - Code restructuring
   - `perf:` - Performance improvement
   - `test:` - Adding tests
   - `chore:` - Maintenance

2. **Keep commits atomic**
   - One logical change per commit
   - Don't mix refactoring with new features

3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🔄 Pull Request Process

1. **Before Submitting**
   - Run tests: `npm test` (if available)
   - Run linter: `npm run lint`
   - Test in browser at `http://localhost:5173`
   - Review your own code first

2. **Open Pull Request**
   - Go to original repo on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill PR template with:
     - Clear title: "Add donor search filtering"
     - Description of changes
     - Related issues: "Fixes #123"
     - Screenshots if UI changes
     - Testing instructions

3. **PR Title Format**
   ```
   [TYPE] Brief description
   ```
   Examples:
   - `[FEATURE] Add real-time donor notifications`
   - `[FIX] Resolve payment query invalidation`
   - `[DOCS] Update API documentation`

4. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix (non-breaking change)
   - [ ] New feature (non-breaking change)
   - [ ] Breaking change
   - [ ] Documentation update

   ## How Has This Been Tested?
   - [ ] Manual testing on localhost
   - [ ] Tested in multiple browsers
   - [ ] Tested on mobile

   ## Checklist
   - [ ] Code follows project standards
   - [ ] ESLint passes (`npm run lint`)
   - [ ] No console errors/warnings
   - [ ] Comments added for complex logic
   - [ ] Updated documentation
   - [ ] Screenshots attached (if UI changes)

   ## Related Issues
   Fixes #123
   ```

5. **Respond to Review**
   - Read all feedback carefully
   - Make requested changes
   - Re-request review after updates
   - Explain disagreements respectfully

## 🐛 Reporting Issues

### Bug Report Template
```markdown
## Description
Clear description of the bug

## Reproduction Steps
1. Go to...
2. Click on...
3. See error...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome/Firefox/Safari
- Device: Desktop/Mobile
- OS: Windows/Mac/Linux

## Screenshots
[Attach screenshots if applicable]

## Additional Context
Any other relevant information
```

### Feature Request Template
```markdown
## Description
Clear description of requested feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternative Solutions
Other approaches considered

## Additional Context
[Screenshots, mockups, etc.]
```

## 🧪 Testing Guidelines

### What to Test
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Android Chrome)
- ✅ Different screen sizes (responsive design)
- ✅ User flows (happy path and edge cases)
- ✅ Error states (network errors, validation)

### Testing Checklist
Before submitting PR:
- [ ] Feature works as intended
- [ ] No console errors
- [ ] No broken links
- [ ] Forms validate correctly
- [ ] Loading states appear
- [ ] Error messages display
- [ ] Responsive on mobile
- [ ] Accessibility (keyboard, screen reader)

## 📚 Documentation Guidelines

- Write clear, concise comments
- Document complex logic
- Update README if needed
- Add JSDoc comments for functions:
  ```javascript
  /**
   * Fetches donors by blood group and location
   * @param {string} bloodGroup - Blood group (e.g., 'A+')
   * @param {string} location - District name
   * @returns {Promise<Array>} List of matching donors
   */
  const fetchDonors = (bloodGroup, location) => {
    // Implementation
  };
  ```

## 🎨 Design Guidelines

### Component Design
- Follow existing design system (glassmorphism)
- Use Tailwind CSS utility classes
- Maintain dark theme consistency
- Ensure accessibility (color contrast, labels)

### Color Palette
- Primary: Purple (`from-purple-600 to-pink-600`)
- Background: `#0B0B15`
- Card: `#131320`
- Text: White for primary, Gray for secondary
- Status: Yellow (pending), Blue (inprogress), Green (done), Red (canceled)

## 🚀 Performance Tips

- Use React.memo for expensive components
- Implement useMemo for complex calculations
- Lazy load routes and components
- Optimize images and assets
- Avoid unnecessary re-renders

## 🔒 Security Guidelines

- Never commit sensitive keys (.env.local is gitignored)
- Sanitize user inputs
- Validate on both frontend and backend
- Use HTTPS in production
- Follow OWASP top 10

## 📦 Deployment

After PR is merged:
- Main branch triggers build
- Build artifacts uploaded to CDN
- Deployed to production

## 🙋 Need Help?

- Check existing issues/PRs
- Read documentation
- Ask in discussions
- Contact maintainers

## 📄 License

By contributing, you agree your code will be licensed under MIT License.

---

**Thank you for contributing to Blood-Aid! Together, we're saving lives. ❤️**
