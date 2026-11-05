async function loadStats() {
  try {
    const response = await fetch('./stats.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Could not load stats.json');
    }

    const stats = await response.json();

    const totalTools = document.getElementById('total-tools');
    const totalCategories = document.getElementById('total-categories');
    const popularTools = document.getElementById('popular-tools');
    const categorySnapshot = document.getElementById('category-snapshot');
    const lastUpdated = document.getElementById('last-updated');

    if (totalTools) totalTools.textContent = String(stats.totalTools || 0);
    if (totalCategories) totalCategories.textContent = String(stats.totalCategories || 0);
    if (popularTools) popularTools.textContent = String(stats.popular || 0);
    if (lastUpdated) {
      lastUpdated.textContent = stats.lastUpdated
        ? new Date(stats.lastUpdated).toUTCString()
        : '-';
    }

    if (categorySnapshot && stats.categories) {
      const categoryNames = Object.keys(stats.categories)
        .sort((a, b) => stats.categories[b] - stats.categories[a])
        .slice(0, 6)
        .map(category =>
          category
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ')
        );

      categorySnapshot.textContent = `${categoryNames.join(', ')} and more.`;
    }
  } catch (_error) {
    // Keep initial content as fallback when stats file is unavailable.
  }
}

let allToolsData = [];
let activeCategory = 'all';
let activePricing = 'all';
let currentSearch = '';
let currentSort = 'featured';
const PAGE_SIZE = 18;
let visibleCount = PAGE_SIZE;

const linkIcon = '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14l4-4"></path><path d="M7.5 16.5l-2 2a3 3 0 104.2 4.2l2-2"></path><path d="M16.5 7.5l2-2a3 3 0 10-4.2-4.2l-2 2"></path></svg>';
const tagIcon = '<svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3.4 13.4a2 2 0 010-2.8L10.6 3.4a2 2 0 011.4-.6H19a2 2 0 012 2v7a2 2 0 01-.6 1.4z"></path><circle cx="16.5" cy="7.5" r="1.2"></circle></svg>';

function getFilteredAndSortedTools() {
  return allToolsData.filter(tool => {
    if (activeCategory !== 'all' && tool.category !== activeCategory) return false;
    if (activePricing !== 'all' && tool.pricing !== activePricing) return false;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const inName = (tool.name || '').toLowerCase().includes(q);
      const inDesc = (tool.description || '').toLowerCase().includes(q);
      const inTags = (tool.tags || []).some(t => t.toLowerCase().includes(q));
      const inCat = (tool.category || '').toLowerCase().includes(q);
      if (!inName && !inDesc && !inTags && !inCat) return false;
    }
    return true;
  }).sort((a, b) => {
    if (currentSort === 'featured') {
      if (a.featured !== b.featured) return b.featured ? 1 : -1;
      return (b.rating || 0) - (a.rating || 0);
    }
    if (currentSort === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (currentSort === 'popular') {
      if (a.popular !== b.popular) return b.popular ? 1 : -1;
      return (b.rating || 0) - (a.rating || 0);
    }
    if (currentSort === 'new') {
      if (a.new !== b.new) return b.new ? 1 : -1;
      return (b.rating || 0) - (a.rating || 0);
    }
    if (currentSort === 'name') return (a.name || '').localeCompare(b.name || '');
    return 0;
  });
}

function renderTools() {
  const container = document.getElementById('latest-tools');
  const resultsCount = document.getElementById('results-count');
  const loadMoreContainer = document.getElementById('load-more-container');
  const remainingCount = document.getElementById('remaining-count');
  const resetBtn = document.getElementById('reset-filters');
  if (!container) return;

  const filtered = getFilteredAndSortedTools();
  const visible = filtered.slice(0, visibleCount);

  if (resultsCount) {
    resultsCount.textContent = `Showing ${visible.length} of ${filtered.length} tool${filtered.length === 1 ? '' : 's'}${filtered.length !== allToolsData.length ? ` (filtered from ${allToolsData.length})` : ''}`;
  }

  if (resetBtn) {
    const isFiltered = activeCategory !== 'all' || activePricing !== 'all' || currentSearch !== '';
    resetBtn.classList.toggle('hidden', !isFiltered);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <article class="col-span-full rounded-xl border border-dashed border-black/30 p-8 text-center text-sm text-black/60 dark:border-white/30 dark:text-white/60">
        <p class="text-base font-semibold text-black dark:text-white">No tools found matching your criteria</p>
        <p class="mt-1">Try clearing filters or searching for different keywords.</p>
        <button id="clear-search-btn" class="mt-3 rounded-md border border-black/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-black dark:border-white/40 dark:text-white">Clear All Filters</button>
      </article>
    `;
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.addEventListener('click', resetAllFilters);
    if (loadMoreContainer) loadMoreContainer.classList.add('hidden');
    return;
  }

  container.innerHTML = visible.map(tool => {
    const badges = [];
    if (tool.featured) badges.push('<span class="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-400/15 dark:text-amber-300">★ FEATURED</span>');
    if (tool.new) badges.push('<span class="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300">NEW</span>');

    const tagsHtml = (tool.tags || []).slice(0, 4).map(tag =>
      `<button data-tag="${tag}" class="tag-click inline-flex items-center gap-0.5 rounded border border-black/15 bg-black/[0.03] px-1.5 py-0.5 text-[10px] text-black/70 hover:bg-black/10 dark:border-white/15 dark:bg-white/[0.04] dark:text-white/70 dark:hover:bg-white/10">${tagIcon}${tag}</button>`
    ).join(' ');

    const priceClass = tool.pricing === 'Free'
      ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
      : 'border-black/30 text-black/75 dark:border-white/30 dark:text-white/75';

    return `
      <article class="flex flex-col justify-between rounded-xl border border-black/20 bg-black/[0.02] p-4 transition duration-150 hover:-translate-y-0.5 hover:border-black/40 hover:bg-black/[0.05] dark:border-white/20 dark:bg-white/[0.02] dark:hover:border-white/40 dark:hover:bg-white/[0.05]">
        <div>
          <div class="flex items-center justify-between gap-2">
            <span class="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-black/50 dark:text-white/50">${tool.category || 'tool'}</span>
            <div class="flex items-center gap-1.5">
              ${badges.join('')}
              <span class="rounded border px-1.5 py-0.5 text-[10px] font-medium ${priceClass}">${tool.pricing || 'Freemium'}</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline justify-between gap-2">
            <h3 class="text-base font-bold">${tool.name || 'Untitled Tool'}</h3>
            ${tool.rating ? `<span class="text-xs font-semibold text-amber-500">★ ${tool.rating}</span>` : ''}
          </div>
          <p class="mt-2 text-xs leading-relaxed text-black/70 dark:text-white/70">${tool.description || ''}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-black/10 dark:border-white/10">
          <div class="flex flex-wrap gap-1 mb-3">${tagsHtml}</div>
          <div class="flex items-center justify-between">
            <a class="inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-4 text-black hover:opacity-80 dark:text-white" href="${tool.link || '#'}" target="_blank" rel="noopener noreferrer">${linkIcon}Visit Website</a>
            <button data-copylink="${tool.link}" class="copy-tool-link text-[11px] text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">Copy Link</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  if (loadMoreContainer && remainingCount) {
    const remaining = filtered.length - visible.length;
    if (remaining > 0) {
      loadMoreContainer.classList.remove('hidden');
      remainingCount.textContent = String(remaining);
    } else {
      loadMoreContainer.classList.add('hidden');
    }
  }

  // Bind tag click handlers
  container.querySelectorAll('.tag-click').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tag = btn.getAttribute('data-tag');
      if (tag) {
        const input = document.getElementById('search-input');
        if (input) {
          input.value = tag;
          currentSearch = tag;
          visibleCount = PAGE_SIZE;
          renderTools();
        }
      }
    });
  });

  // Bind copy link handlers
  container.querySelectorAll('.copy-tool-link').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const link = btn.getAttribute('data-copylink');
      if (link) {
        try {
          await navigator.clipboard.writeText(link);
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = orig; }, 1500);
        } catch (_) {}
      }
    });
  });
}

function resetAllFilters() {
  activeCategory = 'all';
  activePricing = 'all';
  currentSearch = '';
  currentSort = 'featured';
  visibleCount = PAGE_SIZE;

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'featured';

  updateCategoryPillStyles();
  updatePricingPillStyles();
  renderTools();
}

function updateCategoryPillStyles() {
  const container = document.getElementById('category-filters');
  if (!container) return;
  container.querySelectorAll('.cat-pill').forEach(btn => {
    const cat = btn.getAttribute('data-cat');
    const isSelected = cat === activeCategory;
    if (isSelected) {
      btn.className = 'cat-pill rounded-full border border-black bg-black px-3 py-1 text-xs font-semibold text-white transition dark:border-white dark:bg-white dark:text-black';
    } else {
      btn.className = 'cat-pill rounded-full border border-black/25 bg-transparent px-3 py-1 text-xs font-medium text-black/75 hover:bg-black/5 transition dark:border-white/25 dark:text-white/75 dark:hover:bg-white/5';
    }
  });
}

function updatePricingPillStyles() {
  const container = document.getElementById('pricing-filters');
  if (!container) return;
  container.querySelectorAll('.price-pill').forEach(btn => {
    const price = btn.getAttribute('data-price');
    const isSelected = price === activePricing;
    if (isSelected) {
      btn.className = 'price-pill rounded border border-black/40 bg-black/10 px-2 py-0.5 font-semibold text-black dark:border-white/40 dark:bg-white/10 dark:text-white';
    } else {
      btn.className = 'price-pill rounded border border-black/20 px-2 py-0.5 text-black/70 hover:bg-black/5 dark:border-white/20 dark:text-white/70 dark:hover:bg-white/5';
    }
  });
}

function setupDirectoryControls(categories) {
  const categoryFilters = document.getElementById('category-filters');
  if (categoryFilters && Array.isArray(categories)) {
    const existingPills = new Set(Array.from(categoryFilters.querySelectorAll('.cat-pill')).map(b => b.getAttribute('data-cat')));

    categories.forEach(cat => {
      const id = typeof cat === 'string' ? cat : cat.id;
      const name = typeof cat === 'string'
        ? id.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
        : (cat.name || id);

      if (!existingPills.has(id)) {
        const btn = document.createElement('button');
        btn.setAttribute('data-cat', id);
        btn.className = 'cat-pill rounded-full border border-black/25 bg-transparent px-3 py-1 text-xs font-medium text-black/75 hover:bg-black/5 transition dark:border-white/25 dark:text-white/75 dark:hover:bg-white/5';
        btn.textContent = name;
        categoryFilters.appendChild(btn);
      }
    });

    categoryFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      activeCategory = btn.getAttribute('data-cat') || 'all';
      visibleCount = PAGE_SIZE;
      updateCategoryPillStyles();
      renderTools();
    });
  }

  const pricingFilters = document.getElementById('pricing-filters');
  if (pricingFilters) {
    pricingFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.price-pill');
      if (!btn) return;
      activePricing = btn.getAttribute('data-price') || 'all';
      visibleCount = PAGE_SIZE;
      updatePricingPillStyles();
      renderTools();
    });
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      visibleCount = PAGE_SIZE;
      renderTools();
    });

    // Keyboard shortcut '/' to focus search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      visibleCount = PAGE_SIZE;
      renderTools();
    });
  }

  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += PAGE_SIZE;
      renderTools();
    });
  }

  const resetBtn = document.getElementById('reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllFilters);
  }
}

async function loadLatestTools() {
  try {
    const response = await fetch('./tools.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load tools.json');

    const data = await response.json();
    allToolsData = Array.isArray(data.tools) ? data.tools : [];

    setupDirectoryControls(data.categories || []);
    renderTools();
  } catch (error) {
    const container = document.getElementById('latest-tools');
    if (container) {
      container.innerHTML = '<article class="rounded-xl border border-black/20 p-4 text-sm text-black/60 dark:border-white/20 dark:text-white/60">Unable to load tools feed.</article>';
    }
  }
}

async function loadRepoMetrics() {
  const starsEl = document.getElementById('repo-stars');
  const starsNavEl = document.getElementById('repo-stars-nav');
  const starsInlineEl = document.getElementById('repo-stars-inline');
  const prsNavEl = document.getElementById('repo-prs-nav');
  const prsEl = document.getElementById('repo-prs');
  const prsInlineEl = document.getElementById('repo-prs-inline');
  const forksEl = document.getElementById('repo-forks');
  const forksInlineEl = document.getElementById('repo-forks-inline');
  const issuesEl = document.getElementById('repo-issues');
  const issuesInlineEl = document.getElementById('repo-issues-inline');
  const watchersEl = document.getElementById('repo-watchers');

  const compact = value =>
    new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value || 0);

  try {
    const response = await fetch('https://api.github.com/repos/Durgesh-Vaigandla/ai-tools-database', {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load repo metrics');
    }

    const repo = await response.json();

    const starCount = compact(repo.stargazers_count);
    const forkCount = compact(repo.forks_count);
    const issueCount = compact(repo.open_issues_count);
    const watcherCount = compact(repo.subscribers_count);

    if (starsEl) starsEl.textContent = starCount;
    if (starsNavEl) starsNavEl.textContent = starCount;
    if (starsInlineEl) starsInlineEl.textContent = starCount;
    if (forksEl) forksEl.textContent = forkCount;
    if (forksInlineEl) forksInlineEl.textContent = forkCount;
    if (issuesEl) issuesEl.textContent = issueCount;
    if (issuesInlineEl) issuesInlineEl.textContent = issueCount;
    if (watchersEl) watchersEl.textContent = watcherCount;

    const prsResponse = await fetch(
      'https://api.github.com/search/issues?q=repo:Durgesh-Vaigandla/ai-tools-database+is:pr+is:open',
      {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      }
    );

    if (prsResponse.ok) {
      const prData = await prsResponse.json();
      const prCount = compact(prData.total_count || 0);
      if (prsNavEl) prsNavEl.textContent = prCount;
      if (prsEl) prsEl.textContent = prCount;
      if (prsInlineEl) prsInlineEl.textContent = prCount;
    }
  } catch (_error) {
    if (starsEl) starsEl.textContent = '-';
    if (starsNavEl) starsNavEl.textContent = '-';
    if (starsInlineEl) starsInlineEl.textContent = '-';
    if (forksEl) forksEl.textContent = '-';
    if (forksInlineEl) forksInlineEl.textContent = '-';
    if (issuesEl) issuesEl.textContent = '-';
    if (issuesInlineEl) issuesInlineEl.textContent = '-';
    if (watchersEl) watchersEl.textContent = '-';
    if (prsNavEl) prsNavEl.textContent = '-';
    if (prsEl) prsEl.textContent = '-';
    if (prsInlineEl) prsInlineEl.textContent = '-';
  }
}

function setupThemeToggle() {
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const knob = document.getElementById('theme-toggle-knob');
  const darkLabel = document.getElementById('theme-label-dark');
  const lightLabel = document.getElementById('theme-label-light');
  if (!toggle) return;

  const getStoredTheme = () => localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = theme => {
    const useDark = theme === 'dark';
    html.classList.toggle('dark', useDark);
    toggle.setAttribute('aria-pressed', useDark ? 'true' : 'false');

    if (knob) {
      knob.classList.toggle('translate-x-12', !useDark);
      knob.classList.toggle('translate-x-0', useDark);
    }

    if (darkLabel) {
      darkLabel.classList.toggle('text-white', useDark);
      darkLabel.classList.toggle('text-black/70', !useDark);
      darkLabel.classList.toggle('dark:text-black', useDark);
    }

    if (lightLabel) {
      lightLabel.classList.toggle('text-black/70', useDark);
      lightLabel.classList.toggle('text-black', !useDark);
      lightLabel.classList.toggle('dark:text-white', !useDark);
    }
  };

  const initial = getStoredTheme() || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  toggle.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}

function setupCopyButtons() {
  const buttons = document.querySelectorAll('[data-copy]');
  const feedback = document.getElementById('copy-feedback');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-copy') || '';
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        if (feedback) feedback.textContent = 'Copied command to clipboard.';
      } catch (_error) {
        if (feedback) feedback.textContent = 'Copy failed. Clipboard access was denied.';
      }
    });
  });
}

loadStats();
loadLatestTools();
loadRepoMetrics();
setupCopyButtons();
setupThemeToggle();
