# 🔍 Dev-Detective: GitHub User Search App

A full-stack vanilla JavaScript application that searches for GitHub developers, displays their profiles, shows their repositories, and lets you compare two developers in "Battle Mode".

**Status:** ✅ Complete | **Level:** Full-Stack Developer Internship - Week 3

---

## 📋 Table of Contents

- [Features](#features)
- [Project Levels](#project-levels)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Key Concepts](#key-concepts)
- [Screenshots](#screenshots)
- [Learning Journey](#learning-journey)
- [Contributing](#contributing)

---

## ✨ Features

### Level 1: Basic Search (Beginner)
- 🔍 Search for any GitHub user by username
- 👤 Display user profile with avatar
- 📝 Show user bio, join date, and portfolio URL
- 📊 Display follower count and public repos
- ⚠️ Error handling for invalid usernames
- ⏳ Loading spinner while fetching
- 🎨 Professional dark theme UI

### Level 2: Repository Display (Intermediate)
- 📚 Fetch and display top 5 latest repositories
- 📅 Human-readable date formatting
- 🔗 Clickable repository links to GitHub
- ⭐ Show star count for each repo
- 📏 Repository descriptions
- 🔄 Sort repos by most recently updated first
- 📱 Fully responsive design

### Level 3: Battle Mode (Advanced)
- ⚔️ Compare two GitHub developers simultaneously
- 🏆 Determine winner by followers or total stars
- 🟢 Highlight winner with green styling
- 🔴 Highlight loser with red styling
- 🔀 Tab switching between Search and Battle modes
- ⚡ Parallel API requests using Promise.all()
- 📊 Calculate total stars across all repos
- 🎯 Smart pagination for users with 100+ repos

---

## 🎓 Project Levels

### Level 1: Beginner Requirements
**Goal:** Learn async/await, fetch API, and error handling

**What You'll Learn:**
- Making HTTP requests with Fetch API
- Async/await syntax
- Error handling with try/catch
- DOM manipulation with classList
- Loading states and user feedback
- Conditional rendering

**Key Files:**
- HTML: Search form, profile card, error/loading elements
- JavaScript: handleSearch(), fetchUserData(), displayUserData()
- CSS: Dark theme, animations, responsive layout

---

### Level 2: Intermediate Requirements
**Goal:** Master array methods, API chaining, and date formatting

**What You'll Learn:**
- Fetching related data from API responses
- Array methods: sort(), slice(), map(), reduce()
- Date formatting for user display
- Handling optional/null data
- Creating DOM elements dynamically
- Responsive grid layouts

**Key Files:**
- HTML: Repository list section
- JavaScript: fetchUserRepos(), displayRepositories(), formatDate()
- CSS: Repository card styling, hover effects

---

### Level 3: Advanced Requirements
**Goal:** Build complex features with parallel requests and data comparison

**What You'll Learn:**
- Promise.all() for parallel requests
- Comparing datasets
- Pagination logic
- Tab/mode switching
- Dynamic CSS based on data
- Complex state management

**Key Files:**
- HTML: Battle mode form, comparison cards, tab buttons
- JavaScript: fetchBothUsers(), calculateTotalStars(), comparePlayers(), switchMode()
- CSS: Battle cards, winner/loser styling, tab states

---

## 🛠 Tech Stack

### Frontend
- **Language:** Vanilla JavaScript (ES6+)
  - Async/Await
  - Arrow functions
  - Template literals
  - Array methods
  - Promise handling

- **Markup:** HTML5
  - Semantic elements
  - Form handling
  - Data attributes

- **Styling:** CSS3
  - Flexbox & Grid
  - CSS Variables
  - Animations & Transitions
  - Responsive design
  - Dark theme

### APIs
- **GitHub REST API v3**
  - `/users/{username}` - User profile data
  - `repos_url` - Repository list endpoint

### Browser APIs
- **Fetch API** - HTTP requests
- **DOM API** - Element manipulation
- **LocalStorage** - Optional persistence (not used in this version)

---

## 📦 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required
- Text editor (VS Code recommended)

### Setup Steps

1. **Clone or Download the project**
   ```bash
   git clone <repository-url>
   cd dev-detective
   ```

2. **Open in browser**
   ```bash
   # Option 1: Open directly
   open index.html
   
   # Option 2: Use VS Code Live Server extension
   # Or use any local server
   ```

3. **Using a local server (recommended)**
   ```bash
   # With Python 3
   python -m http.server 8000
   
   # With Python 2
   python -m SimpleHTTPServer 8000
   
   # With Node.js (http-server)
   npx http-server
   ```

   Then visit: `http://localhost:8000`

---

## 🚀 Usage

### Level 1: Search for a User

1. **Enter a GitHub username** in the search box
   - Example: `octocat`, `torvalds`, `gvanrossum`

2. **Press Enter or click Search**
   - Loading spinner appears while fetching

3. **View profile information**
   - Avatar, name, bio
   - Follower count, public repos
   - Portfolio URL (if available)

4. **Search again** for another user
   - Old results are cleared automatically

### Level 2: View Repositories

1. **After searching** for a user, scroll down

2. **See "Top 5 Latest Repositories"** section
   - Most recently updated repos first
   - Repository name (clickable link)
   - Description and star count
   - Last updated date in readable format

3. **Click any repo name** to visit GitHub page

### Level 3: Battle Mode

1. **Click "Battle Mode"** tab at the top

2. **Enter two different usernames**
   - Example: `octocat` vs `torvalds`

3. **Click "Start Battle"**
   - Fetches both users simultaneously
   - Calculates total stars for each
   - Compares followers count

4. **View the results**
   - 🏆 Winner highlighted in green
   - Loser highlighted in red
   - Shows followers and total stars
   - Winner badge displayed

5. **Switch back to Search** mode using the tab button

---

## 📁 File Structure

```
dev-detective/
├── index.html          # Complete HTML (Levels 1, 2, 3)
│   ├── Header
│   ├── Search Mode
│   │   ├── Form
│   │   ├── Error message
│   │   ├── Loading spinner
│   │   ├── Profile card
│   │   └── Repositories list
│   └── Battle Mode
│       ├── Tab buttons
│       ├── Battle form
│       ├── Error/Loading
│       └── Battle cards
│
├── script.js           # Complete JavaScript (Levels 1, 2, 3)
│   ├── Level 1: Search & Display
│   │   ├── handleSearch()
│   │   ├── fetchUserData()
│   │   ├── displayUserData()
│   │   └── Error/Loading utilities
│   ├── Level 2: Repositories
│   │   ├── fetchUserRepos()
│   │   ├── displayRepositories()
│   │   ├── formatDate()
│   │   └── Array manipulation
│   └── Level 3: Battle Mode
│       ├── switchMode()
│       ├── handleBattleSearch()
│       ├── fetchBothUsers()
│       ├── calculateTotalStars()
│       ├── comparePlayers()
│       ├── displayBattleResults()
│       └── clearUI functions
│
├── style.css           # Complete CSS (Levels 1, 2, 3)
│   ├── CSS Variables (Colors, spacing)
│   ├── Level 1 Styles
│   │   ├── Header & layout
│   │   ├── Search form
│   │   ├── Profile card
│   │   └── Animations
│   ├── Level 2 Styles
│   │   ├── Repository cards
│   │   └── Responsive grid
│   ├── Level 3 Styles
│   │   ├── Battle cards
│   │   ├── Tab buttons
│   │   ├── Winner/loser styling
│   │   └── Loading spinner
│   └── Animations
│       ├── fadeIn, slideInUp
│       ├── spin, bounce
│       └── Responsive breakpoints
│
├── README.md           # This file
├── Prompt.md           # AI prompts used in development
└── .gitignore          # (Optional) Git ignore rules
```

---

## 🧠 Key Concepts

### JavaScript Concepts

**Async/Await**
```javascript
async function fetchUserData(username) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

**Promise.all() - Parallel Requests**
```javascript
const [user1, user2] = await Promise.all([
    fetch(url1).then(r => r.json()),
    fetch(url2).then(r => r.json())
]);
```

**Array Methods**
```javascript
// Sort by date (most recent first)
repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

// Get first 5
const topFive = repos.slice(0, 5);

// Sum all stars
const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
```

**DOM Manipulation**
```javascript
// Get element
const card = document.getElementById('profileCard');

// Show/Hide
card.classList.remove('hidden');
card.classList.add('hidden');

// Set content
card.textContent = 'Hello';
card.innerHTML = '<h2>Title</h2>';
```

### CSS Concepts

**CSS Variables**
```css
:root {
    --primary-color: #0066cc;
    --text-primary: #e6edf3;
}

/* Usage */
color: var(--primary-color);
```

**Responsive Design**
```css
@media (max-width: 600px) {
    .battle-cards {
        grid-template-columns: 1fr;  /* Single column on mobile */
    }
}
```

**Animations**
```css
@keyframes slideInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.element {
    animation: slideInUp 0.5s ease-out;
}
```

---

## 🎬 How It Works

### Data Flow Diagram

```
User Interaction
    ↓
Form Handler (handleSearch / handleBattleSearch)
    ↓
Clear Old UI (clearUI)
    ↓
Show Loading Spinner
    ↓
Fetch Data (API Request)
    ↓
Parse JSON Response
    ↓
Error Check
    ├─ Error → Show Error Message
    └─ Success → Process Data
    ↓
Display Results
    ├─ Level 1: Profile Card
    ├─ Level 2: + Repositories List
    └─ Level 3: + Comparison (Winner/Loser)
    ↓
Hide Loading Spinner
```

### API Request Flow

**Level 1:**
```
User Input
    ↓
GET /users/{username}
    ↓
Display Profile
```

**Level 2:**
```
User Input
    ↓
GET /users/{username}
    ↓
Extract repos_url from response
    ↓
GET repos_url (fetch repositories)
    ↓
Display Profile + Top 5 Repos
```

**Level 3:**
```
Two Users Input
    ↓
Promise.all([
    GET /users/{user1},
    GET /users/{user2}
])
    ↓
Calculate totalStars for each
    ↓
Compare (followers or stars)
    ↓
Display Winner & Loser Cards
```

---

## 🖼️ Screenshots & Examples

### Search Mode (Level 1)
```
[Search Bar] ← "octocat"
[Loading...] ← While fetching

After fetching:
┌─────────────────┐
│ [Avatar]        │
│ The Octocat     │
│ GitHub mascot   │
│ Followers: 3938 │
│ Public Repos: 2 │
└─────────────────┘
```

### With Repositories (Level 2)
```
[Profile Card above]

Top 5 Latest Repositories
┌──────────────────────────┐
│ repo-name (link)         │
│ Description of project   │
│ ⭐ 256 stars            │
│ 📅 Updated 20 Mar 2024  │
└──────────────────────────┘
```

### Battle Mode (Level 3)
```
[Tab: Search] [Tab: Battle Mode - ACTIVE]

Player 1 [Battle!] Player 2
         (button)

After battle:
┌──────────────┐    ┌──────────────┐
│🏆 WINNER    │    │❌ LOSER      │
│[Avatar 1]   │    │[Avatar 2]    │
│User 1       │    │User 2        │
│👥 5000      │    │👥 2000       │
│⭐ 1500      │    │⭐ 800        │
│(Green)      │    │(Red)         │
└──────────────┘    └──────────────┘
```

---

## 📚 Learning Journey

This project teaches:

### Week 1-2: Foundation
- ✅ HTML structure and semantic elements
- ✅ CSS fundamentals and responsive design
- ✅ JavaScript basics and ES6 syntax

### Week 3: This Project (Dev-Detective)

**Days 1-2: Level 1**
- GitHub API basics
- Fetch API and HTTP requests
- Async/await and error handling
- DOM manipulation and classList
- Loading states and user feedback

**Days 3-4: Level 2**
- Array methods (sort, slice, map, reduce)
- API chaining and nested requests
- Date formatting and parsing
- Dynamic DOM element creation
- Responsive grid layouts

**Days 5-7: Level 3**
- Promise.all() for parallel requests
- Data comparison and logic
- Pagination handling
- Tab switching and state management
- Complex CSS styling (winner/loser)
- Professional code organization

---

## 🎯 Key Learnings

### Concepts Mastered
1. **Async Programming** - Understanding promises and async/await
2. **HTTP Requests** - Making API calls with fetch
3. **Error Handling** - Gracefully handling failures
4. **Array Manipulation** - Using modern array methods
5. **DOM API** - Manipulating HTML with JavaScript
6. **CSS Animations** - Creating smooth, professional animations
7. **Responsive Design** - Making apps work on all screen sizes
8. **State Management** - Managing UI states (loading, error, results)
9. **Data Comparison** - Comparing and ranking data
10. **Clean Code** - Organizing code in functions and logical sections

### Skills Developed
- 💻 Full-stack thinking (frontend to backend API integration)
- 🔍 Debugging JavaScript code
- 📖 Reading API documentation
- 🎨 Professional UI/UX design
- 📱 Mobile-first responsive design
- ♿ Basic accessibility considerations
- 📝 Code documentation and comments
- 🚀 Performance optimization (parallel requests)

---

## 🐛 Debugging Tips

### Common Issues & Solutions

**Problem: "User not found" error always appears**
- Check: GitHub username is spelled correctly
- Solution: Try a known user like `octocat`

**Problem: Repositories not showing**
- Check: Profile loaded successfully
- Solution: Some users have zero repos - try a different user

**Problem: Battle mode shows old results**
- Check: clearBattleUI() is being called
- Solution: Clear browser cache or reload

**Problem: Loading spinner doesn't disappear**
- Check: Network tab in DevTools for failed requests
- Solution: Check internet connection, GitHub API status

**Using Browser DevTools**
```javascript
// Open DevTools (F12 or Cmd+Option+I)
// Console tab:
console.log('data:', userData);
console.log('repos:', repos);

// Network tab:
// Check API requests and responses
// Look for 404 errors, rate limiting

// Elements tab:
// Inspect HTML structure
// Check if classes are being added/removed
```

---

## 🚀 Performance Optimizations

1. **Parallel Requests** - Using Promise.all() for Battle Mode
2. **Lazy Loading** - Repositories load after profile
3. **Pagination** - Fetching max items per page (100)
4. **Efficient DOM Updates** - Using classList instead of style changes
5. **CSS Animations** - Using transform/opacity for smooth animations

---

## 📖 API Reference

### GitHub REST API

**Get User Profile**
```
GET /users/{username}
Returns: User object with avatar, bio, followers, repos_url, etc.
```

**Get User Repositories**
```
GET /users/{username}/repos?per_page=100&page=1
Returns: Array of repository objects
```

**Rate Limiting**
- Unauthenticated: 60 requests/hour
- Authenticated: 5000 requests/hour
- Headers: X-RateLimit-Remaining, X-RateLimit-Reset

---

## 📋 Checklist for Testing

- [ ] Search works for valid usernames
- [ ] Error message appears for invalid username
- [ ] Loading spinner appears while fetching
- [ ] Profile information displays correctly
- [ ] Avatar image loads properly
- [ ] Repositories list shows (if user has repos)
- [ ] Repository links are clickable
- [ ] Dates are formatted nicely
- [ ] Battle mode tab switches correctly
- [ ] Both users can be searched in battle mode
- [ ] Winner highlighted in green
- [ ] Loser highlighted in red
- [ ] Works on mobile (responsive)
- [ ] No console errors
- [ ] All animations are smooth

---

## 🤝 Contributing

This is a learning project, but feel free to:
- 🐛 Report bugs
- 💡 Suggest improvements
- 📚 Add documentation
- ✨ Enhance features

---

## 📝 License

This project is created for educational purposes as part of a full-stack developer internship.

---

## 🙏 Acknowledgments

- Built with help from Claude AI (Anthropic)
- GitHub API documentation
- Mozilla Developer Network (MDN)
- Modern JavaScript tutorials and guides

---

## 📞 Support

**Having issues?**

1. Check the [Debugging Tips](#debugging-tips) section
2. Look at browser console for errors (F12)
3. Review the [Prompt.md](./Prompt.md) for learning concepts
4. Check GitHub API status at status.github.com

---

## 🎓 Next Steps

After completing this project:

1. **Deploy to GitHub Pages** - Make it live online
2. **Add Authentication** - Use OAuth for user login
3. **Add Dark/Light Theme Toggle** - Save preference in localStorage
4. **Advanced Filtering** - Filter repos by language, stars, etc.
5. **Statistics Dashboard** - Show charts and analytics
6. **Testing** - Add unit tests with Jest
7. **Build Tools** - Learn webpack, babel, npm scripts

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Total Prompts Used | 16+ |
| HTML Lines | 500+ |
| JavaScript Lines | 800+ |
| CSS Lines | 800+ |
| Learning Concepts | 15+ |
| Development Time | 7 days |
| File Count | 3 (consolidated) |
| Status | ✅ Complete |

---

**Happy exploring with Dev-Detective!** 🔍⚔️

For more details on AI prompts used, see [Prompt.md](./Prompt.md)