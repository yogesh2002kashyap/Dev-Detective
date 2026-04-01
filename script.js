const GITHUB_API_URL = 'https://api.github.com/users';


const searchTabBtn = document.getElementById('searchTabBtn');
const battleTabBtn = document.getElementById('battleTabBtn');

const searchMode = document.getElementById('searchMode');
const battleMode = document.getElementById('battleMode');

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const errorMessage = document.getElementById("errorMessage");

const loadingSpinner = document.getElementById("loadingSpinner");

const profileCard = document.getElementById("profileCard");
const profileImage = document.getElementById("profileImage");
const userName = document.getElementById("userName");
const userBio = document.getElementById("userBio");
const joinDate = document.getElementById("joinDate");
const portfolioUrl = document.getElementById("portfolioUrl");

const reposContainer = document.getElementById("reposContainer");
const reposList = document.getElementById("reposList");


const battleForm = document.getElementById('battleForm');
const battleInput1 = document.getElementById('battleInput1');
const battleInput2 = document.getElementById('battleInput2');

const battleResults = document.getElementById('battleResults');
const profileCard1 = document.getElementById('profileCard1');
const profileCard2 = document.getElementById('profileCard2');

const badge1 = document.getElementById('badge1');
const badge2 = document.getElementById('badge2');
const comparisonTitle = document.getElementById('comparisonTitle');

const profileImage1 = document.getElementById('profileImage1');
const userName1 = document.getElementById('userName1');
const userFollower1 = document.getElementById('userFollower1');
const starCount1 = document.getElementById('starCount1');
const profileImage2 = document.getElementById('profileImage2');
const userName2 = document.getElementById('userName2');
const userFollower2 = document.getElementById('userFollower2');
const starCount2 = document.getElementById('starCount2');

const battleErrorMessage = document.getElementById('battleErrorMessage');
const battleLoadingSpinner = document.getElementById('battleLoadingSpinner');

/**
 * Switch between Search Mode and Battle Mode
 * @param {string} mode - Either 'search' or 'battle'
 */
function switchMode(mode) {
    if (mode === 'search') {
        // Show search, hide battle
        searchMode.classList.remove('hidden');
        battleMode.classList.add('hidden');
        
        // Update button styles
        searchTabBtn.classList.add('active');
        battleTabBtn.classList.remove('active');
        
    } else if (mode === 'battle') {
        // Show battle, hide search
        searchMode.classList.add('hidden');
        battleMode.classList.remove('hidden');
        
        // Update button styles
        battleTabBtn.classList.add('active');
        searchTabBtn.classList.remove('active');
        
        // Clear battle form and results
        battleInput1.value = '';
        battleInput2.value = '';
        battleResults.classList.add('hidden');
    }
}

// Add event listeners to tab buttons
searchTabBtn.addEventListener('click', () => switchMode('search'));
battleTabBtn.addEventListener('click', () => switchMode('battle'));

/**
 * Handle battle form submission
 * @param {Event} e - Form submission event
 */
function handleBattleSearch(e) {
    e.preventDefault();  // Stop page reload
    
    // Get usernames from inputs
    const username1 = battleInput1.value.trim();
    const username2 = battleInput2.value.trim();
    
    // Validate both inputs are not empty
    if (!username1 || !username2) {
        showBattleError('Please enter both usernames!');
        return;
    }
    
    // Validate they're not the same
    if (username1.toLowerCase() === username2.toLowerCase()) {
        showBattleError('Please enter two different usernames!');
        return;
    }
    clearBattleUI();
    
    // Clear inputs
    battleInput1.value = '';
    battleInput2.value = '';
    // Start the battle!
    fetchBothUsers(username1, username2);
}

// Add event listener to battle form
battleForm.addEventListener('submit', handleBattleSearch);

/**
 * Fetch data for both users in parallel
 * @param {string} username1 - First GitHub username
 * @param {string} username2 - Second GitHub username
 */
async function fetchBothUsers(username1, username2) {
    try {
        showBattleLoading();
        
        // Fetch BOTH users at the same time using Promise.all()
        // This is much faster than fetching one, then the other
        const [user1, user2] = await Promise.all([
            fetch(`${GITHUB_API_URL}/${username1}`).then(r => r.json()),
            fetch(`${GITHUB_API_URL}/${username2}`).then(r => r.json())
        ]);
        
        // Check if both users exist (no 404 errors)
        if (!user1 || user1.message === 'Not Found') {
            hideBattleLoading();
            showBattleError(`❌User "${username1}" not found`);
            return; 
        }
        
        if (!user2 || user2.message === 'Not Found') {
            hideBattleLoading();
            showBattleError(`❌ User "${username2}" not found`);
            return;
        }
        
        hideBattleLoading();
        
        // Now fetch repos for both and compare
        await comparePlayers(user1, user2);
        
    } catch (error) {
        hideBattleLoading();
        showBattleError('❌ Network error. Please try again.');
        console.error(error);
    }
}

/**
 * Calculate total stars for a user across top 100 repositories
 * @param {string} reposUrl - The repos_url from GitHub API user object
 * @returns {number} Total number of stars
 */
async function calculateTotalStars(reposUrl) {
    try {
        const response = await fetch(`${reposUrl}?per_page=100`);
        const repos = await response.json();
        
        let totalStars = 0;
        repos.forEach(repo => {
            totalStars += repo.stargazers_count || 0;
        });
        
        return totalStars;
    } catch (error) {
        console.error('Error calculating stars:', error);
        return 0;
    }
}

/**
 * Compare two players and determine the winner
 * @param {Object} user1 - First user object from GitHub API
 * @param {Object} user2 - Second user object from GitHub API
 */
async function comparePlayers(user1, user2) {
    try {
        showBattleLoading();
        
        // Calculate total stars for both users
        const stars1 = await calculateTotalStars(user1.repos_url);
        const stars2 = await calculateTotalStars(user2.repos_url);
        
        hideBattleLoading();
            
        const player1Wins = stars1 > stars2;
        const player2Wins = stars2 > stars1;
        const isTie = stars1 === stars2;
        
        // Display the results
        displayBattleResults(user1, user2, stars1, stars2, player1Wins, player2Wins, isTie);
        
    } catch (error) {
        hideBattleLoading();
        showBattleError('Error comparing players');
        console.error(error);
    }
}

/**
 * Display battle results with winner/loser styling
 * @param {Object} user1 - First user data
 * @param {Object} user2 - Second user data
 * @param {number} stars1 - Total stars for user1
 * @param {number} stars2 - Total stars for user2
 * @param {boolean} player1Wins - Does player1 win?
 * @param {boolean} player2Wins - Does player2 win?
 * @param {boolean} isTie - Is it a tie?
 */
function displayBattleResults(user1, user2, stars1, stars2, player1Wins, player2Wins, isTie) {
    // Show results container
    battleResults.classList.remove('hidden');
    
    // Set comparison title
    if (isTie) {
        comparisonTitle.textContent = '🤝 It\'s a Tie!';
    } else if (player1Wins) {
        comparisonTitle.textContent = `🏆 ${user1.name || user1.login} Wins!`;
    } else {
        comparisonTitle.textContent = `🏆 ${user2.name || user2.login} Wins!`;
    }
    
    // ===== Display Player 1 =====
    profileCard1.classList.remove('hidden', 'winner', 'loser');
    profileImage1.src = user1.avatar_url;
    profileImage1.alt = user1.login;
    userName1.textContent = user1.name || user1.login;
    userFollower1.textContent = user1.followers || 0;
    starCount1.textContent = stars1;
    
    // Set winner/loser styling for player 1
    if (player1Wins) {
        profileCard1.classList.add('winner');
        badge1.classList.add('winner');
        badge1.textContent = 'WINNER';
    } else if (player2Wins) {
        profileCard1.classList.add('loser');
        badge1.classList.add('loser');
        badge1.textContent = 'LOSER';
    } else {
        badge1.classList.add('winner');
        badge1.textContent = 'TIE';
    }
    
    // ===== Display Player 2 =====
    profileCard2.classList.remove('hidden', 'winner', 'loser');
    profileImage2.src = user2.avatar_url;
    profileImage2.alt = user2.login;
    userName2.textContent = user2.name || user2.login;
    userFollower2.textContent = user2.followers || 0;
    starCount2.textContent = stars2;
    
    // Set winner/loser styling for player 2
    if (player2Wins) {
        profileCard2.classList.add('winner');
        badge2.classList.add('winner');
        badge2.textContent = 'WINNER';
    } else if (player1Wins) {
        profileCard2.classList.add('loser');
        badge2.classList.add('loser');
        badge2.textContent = 'LOSER';
    } else {
        badge2.classList.add('winner');
        badge2.textContent = 'TIE';
    }
}


searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    handleSearch()
})

function handleSearch(){
    const username = searchInput.value.trim()
    if(username == ""){
        alert("Please Enter username")
        return;
    }
    clearSearchUI();
    fetchUserData(username)
}

async function fetchUserData(username){
    try{
        showLoading();
        const response = await fetch(`${GITHUB_API_URL}/${username}`);
        if(!response.ok){
            hideLoading();
            showError('User not found'); 
            return;
        }
        const data = await response.json();
        displayUserData(data);
        const repos_url = data.repos_url;
        fetchUserRepos(repos_url);
        hideLoading();
        
    }
    catch(error){
        hideLoading();
        showError('Network error');    
    }
}


function displayUserData(data){
    errorMessage.classList.add('hidden');

    profileImage.src = data.avatar_url;

    userName.textContent = data.name;

    const bio = data.bio;
    if(bio == ""){
        userBio.textContent = "User has no bio"
    }
    userBio.textContent = bio;

    joinDate.textContent = formatDate(data.created_at);

    const blog = data.blog
    if(blog == ""){
        portfolioUrl.textContent = "User has no PortfolioURL"
    } else{
        portfolioUrl.textContent = "Portfolio URL Link";
        portfolioUrl.href = blog
    };

    profileCard.classList.remove('hidden');
}

async function fetchUserRepos(repos_url) {
    try{
        const res = await fetch(repos_url);
        if(!res.ok){
            showError('Error in fetching repos');
            throw new Error(`HTTP ${res.status}`);
        }
        const repos = await res.json();
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        const topRepos = repos.slice(0, 5);
        displayRepositories(topRepos);
    }
    catch(error){
        showError('Network error')
    }
}

function displayRepositories(repos){
    reposList.innerHTML = '';

    if (!repos || repos.length === 0) {
        reposList.innerHTML = '<li>No repositories found</li>';
        return;
    }

       repos.forEach(repo => {
        // Create a list item for each repo
        const li = document.createElement('li');
        
        // Get the values (handle if some are null/undefined)
        const repoName = repo.name || 'Unnamed repo';
        const repoUrl = repo.html_url || '#';
        const description = repo.description || 'No description provided';
        const stars = repo.stargazers_count || 0;
        const updatedDate = formatDate(repo.updated_at);
        
        // Build the HTML for this repo
        li.innerHTML = `
            <div class="repo-item">
                <h3>
                    <a href="${repoUrl}" target="_blank" class="repo-name">
                        ${repoName}
                    </a>
                </h3>
                <p class="repo-description">${description}</p>
                <div class="repo-meta">
                    <span class="repo-stars">⭐ ${stars} stars</span>
                    <span class="repo-date">📅 Updated ${updatedDate}</span>
                </div>
            </div>
        `;
        
        // Add this repo to the list
        reposList.appendChild(li);
    });

    reposContainer.classList.remove('hidden');
}



function showLoading(){
    loadingSpinner.classList.remove('hidden');
}

function hideLoading(){
    loadingSpinner.classList.add('hidden');
}

function showError(message){ 
    errorMessage.classList.remove('hidden'); 
    errorMessage.textContent = message;
    profileCard.classList.add('hidden');
    loadingSpinner.classList.add('hidden');
}

function showBattleLoading() {
    battleLoadingSpinner.classList.remove('hidden');
}

function hideBattleLoading(){
    battleLoadingSpinner.classList.add('hidden');
}
function showBattleError(message) {
    battleErrorMessage.textContent = message;
    battleErrorMessage.classList.remove('hidden');
    battleLoadingSpinner.classList.add('hidden');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * CLEAR UI FUNCTIONS FOR BOTH MODES
 * These functions reset the UI to a clean state before starting a new search/battle
 */
 
/**
 * Clear UI for SEARCH MODE
 * Hides all search-related messages and results
 * Called at the start of handleSearch()
 */
function clearSearchUI() {
    // Hide error message
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
    
    // Hide loading spinner
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.classList.add('hidden');
    
    // Hide profile card
    const profileCard = document.getElementById('profileCard');
    profileCard.classList.add('hidden');
    
    // Hide repositories container (if it exists)
    const reposContainer = document.getElementById('reposContainer');
    if (reposContainer) {
        reposContainer.classList.add('hidden');
    }
    
    // Focus back on search input for user convenience
    const searchInput = document.getElementById('searchInput');
    searchInput.focus();
}
 
/**
 * Clear UI for BATTLE MODE
 * Hides all battle-related messages and results
 * Called at the start of handleBattleSearch()
 */
function clearBattleUI() {
    // Hide error message
    const battleErrorMessage = document.getElementById('battleErrorMessage');
    if (battleErrorMessage) {
        battleErrorMessage.classList.add('hidden');
        battleErrorMessage.textContent = '';
    }
    
    // Hide loading spinner
    const battleLoadingSpinner = document.getElementById('battleLoadingSpinner');
    if (battleLoadingSpinner) {
        battleLoadingSpinner.classList.add('hidden');
    }
    
    // Hide battle results
    const battleResults = document.getElementById('battleResults');
    if (battleResults) {
        battleResults.classList.add('hidden');
    }
    
    // Hide both player cards
    const profileCard1 = document.getElementById('profileCard1');
    const profileCard2 = document.getElementById('profileCard2');
    
    if (profileCard1) {
        profileCard1.classList.add('hidden');
        profileCard1.classList.remove('winner', 'loser');
    }
    
    if (profileCard2) {
        profileCard2.classList.add('hidden');
        profileCard2.classList.remove('winner', 'loser');
    }
    
    // Clear badge text and classes
    const badge1 = document.getElementById('badge1');
    const badge2 = document.getElementById('badge2');
    
    if (badge1) {
        badge1.textContent = '';
        badge1.className = 'badge';
    }
    
    if (badge2) {
        badge2.textContent = '';
        badge2.className = 'badge';
    }
    
    // Focus on first input for user convenience
    const battleInput1 = document.getElementById('battleInput1');
    if (battleInput1) {
        battleInput1.focus();
    }
}

console.log('Level 3 JavaScript loaded - Ready for Battle Mode!');