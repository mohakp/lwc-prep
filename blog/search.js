/**
 * search.js — Client-side search for LWC.guide
 *
 * Usage:
 *   - On index.html: filter the in-memory ARTICLES array (handled inline in index.html)
 *   - On article pages: optionally surface global search via URL param
 *
 * This file is intentionally lightweight (no dependencies).
 * It provides shared search utilities that both the homepage and
 * article pages can use.
 */

(function (window) {
  'use strict';

  // ------------------------------------------------------------------
  // Normalize: lowercase, remove punctuation, collapse whitespace
  // ------------------------------------------------------------------
  function normalize(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')  // strip punctuation
      .replace(/\s+/g, ' ')       // collapse whitespace
      .trim();
  }

  // ------------------------------------------------------------------
  // Score a single article against a query.
  // Returns a relevance score (higher = more relevant, 0 = no match).
  //
  // Scoring weights:
  //   Title match:        10 pts per term
  //   Description match:   5 pts per term
  //   Tag match:           3 pts per term
  //   Prefix bonus:       +3 pts (term starts with query token)
  // ------------------------------------------------------------------
  function scoreArticle(article, queryTerms) {
    if (!queryTerms || queryTerms.length === 0) return 1;

    const title  = normalize(article.title);
    const desc   = normalize(article.desc || '');
    const tags   = (article.tags || []).join(' ');

    let score = 0;

    for (const term of queryTerms) {
      if (!term) continue;

      // Exact substring matches
      if (title.includes(term))  score += 10;
      if (desc.includes(term))   score += 5;
      if (tags.includes(term))   score += 3;

      // Word-boundary bonus (term appears at word start)
      const wordRegex = new RegExp(`\\b${escapeRegex(term)}`);
      if (wordRegex.test(title)) score += 3;
      if (wordRegex.test(desc))  score += 2;
    }

    return score;
  }

  // ------------------------------------------------------------------
  // Escape special regex characters in user input
  // ------------------------------------------------------------------
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ------------------------------------------------------------------
  // Main search function.
  // @param {Array}  articles  - full article manifest
  // @param {string} query     - raw search string from user
  // @returns {Array} filtered + sorted articles
  // ------------------------------------------------------------------
  function search(articles, query) {
    if (!query || !query.trim()) return articles;

    const terms = normalize(query)
      .split(' ')
      .filter(t => t.length >= 2);

    if (terms.length === 0) return articles;

    const scored = articles
      .map(a => ({ article: a, score: scoreArticle(a, terms) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.map(r => r.article);
  }

  // ------------------------------------------------------------------
  // Highlight matching terms in a string (returns HTML).
  // Wraps matched terms in <mark> elements.
  // Only called if you want to show highlighted excerpts.
  // ------------------------------------------------------------------
  function highlight(str, queryTerms) {
    if (!str || !queryTerms || queryTerms.length === 0) return str;

    let result = str;
    for (const term of queryTerms) {
      if (!term) continue;
      const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    }
    return result;
  }

  // ------------------------------------------------------------------
  // URL-based search: reads ?q= param and prefills search input on
  // article pages so users can navigate from search results.
  // ------------------------------------------------------------------
  function initUrlSearch() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (!q) return;

    // If there's a search input on the page, populate it
    const input = document.getElementById('searchInput');
    if (input) {
      input.value = q;
      // Dispatch input event so any listeners fire
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  // ------------------------------------------------------------------
  // Expose the API on window.LWCSearch
  // ------------------------------------------------------------------
  window.LWCSearch = {
    search,
    highlight,
    normalize,
    escapeRegex,
    initUrlSearch,
  };

})(window);
