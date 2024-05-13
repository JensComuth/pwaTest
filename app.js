window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }
  });

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const home = document.querySelector('#home');

const topAppBarMeme = document.querySelector('.mdc-top-app-bar-meme');
const imageLi = document.querySelector('.mdc-image-list__image');

const listItems = document.querySelectorAll('.mdc-image-list__item');

const titleElement = document.getElementById('title');
const mainImage = document.querySelector('.mdc-top-app-bar--fixed-adjust.main-content img');

// Open Drawer
let hamburger = document.querySelector('#hamburger');
hamburger.addEventListener('click', (event) => {
    openDrawer();
});

// Close Drawer
listEl.addEventListener('click', (event) => {
    closeDrawer();
});

// Home button event
home.addEventListener('click', (event) => {
    homeSelect();
});

// Filter event
document.querySelectorAll('.mdc-tab').forEach((tab) => {
    tab.addEventListener('click', filter);
});

// OpenSheet
listItems.forEach((item) => {
    item.addEventListener('click', (event) => {
        openSheet();
    });
});

// CloseSheet
let closeBtn = document.querySelector('#closeBtn');
closeBtn.addEventListener('click', (event) => {
    closeSheet();
});

// Fill data of the sheet section with the data from clicked li
listItems.forEach(item => {
  item.addEventListener('click', function() {

    const img = this.querySelector('img');
    const src = img.getAttribute('src');
    const title = img.getAttribute('title');

    titleElement.textContent = title;
    mainImage.setAttribute('src', src);
  });
});



/////* Functions */////


// Open Drawer Function
function openDrawer()
{
    drawer.open = true;
}

// Close Drawer Function
function closeDrawer()
{
    drawer.open = false;
}

// Open Sheet Function
function openSheet()
{
    // No scroll
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';
    window.scrollTo(0, 0);

    let url = new URL(window.location.href);
    url.searchParams.append('sheet', 'memes');

    window.history.pushState({ sheetOpened: true }, '', url.href);
    document.querySelector('.sheet').classList.remove('sheet-out-of-view');
}

// Close Sheet Function
function closeSheet()
{
    // Reset body
    document.body.style.height = '';
    document.body.style.overflowY = '';

    let url = new URL(window.location.href);

    url.searchParams.delete('sheet');
    window.history.replaceState({}, '', url.href);

    document.querySelector('.sheet').classList.add('sheet-out-of-view');
}

// Listen to the popstate event
window.addEventListener('popstate', function(event) {
    // Check if the 'sheet' is not in url
    let url = new URL(window.location.href);
    if (!url.searchParams.has('sheet')) {
        // If sheet is open, close it
        closeSheet();
    }
});

// Home Button Function that basically resets the view
function homeSelect()
{
    const activeTab = document.querySelector('.mdc-tab--active');
    const activeIndicator = document.querySelector('.mdc-tab-indicator--active');

    activeTab.classList.remove('mdc-tab--active');
    activeIndicator.classList.remove('mdc-tab-indicator--active');

    const hidden = document.querySelectorAll('.hidden');
    hidden.forEach((item) => {
        item.classList.remove('hidden');
    });
}

// Filter that filters the li's based on which tab is clicked
function filter(event)
{
    const filter = event.target.parentElement.querySelector('.mdc-tab__text-label').textContent.toLowerCase();
    console.log(event);
    console.log(filter);
    document.querySelectorAll('.mdc-image-list__item').forEach((item) => {
        item.classList.add('hidden');
    });

    document.querySelectorAll(`.${filter}`).forEach((item) => {
        item.classList.remove('hidden');
    });
}