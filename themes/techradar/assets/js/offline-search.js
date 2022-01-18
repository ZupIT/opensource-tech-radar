// Adapted from code by Matt Walters https://www.mattwalters.net/posts/hugo-and-lunr/

;(function ($) {
  'use strict'

  const removeSymbolsFromString = (string) => {
    let wip = string;

    wip = wip.replace('-', '');
    wip = wip.replace('_', '');

    return wip;
  };

  const removeLastBarFromString = string => {
    const lastCharIndex = string.length - 1

    if (string[lastCharIndex] === '/') {
      return string.slice(0, -1)
    }

    return string
  }

  const baseURL = removeLastBarFromString($('meta[name=baseURL]').attr('content'))

  $(document).ready(function () {
    const $searchInput = $('.cp-search-bar-field')

    const currentLanguage = removeSymbolsFromString($('html').attr('lang'))
    const offlineJsonUri = $searchInput.data('offline-search-index-json-src');

    if ($searchInput && $searchInput.length) {
      $searchInput.data('html', true)
      $searchInput.data('placement', 'bottom')
      $searchInput.data('template', '<div class="popover offline-search-result" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>')

      $searchInput.on('change', event => {
        render($(event.target))

        // Hide keyboard on mobile browser
        $searchInput.blur()
      })

      // Prevent reloading page by enter key on sidebar search.
      $searchInput.closest('form').on('submit', () => {
        return false
      })

      //
      // Lunr
      //

      let idx = null // Lunr index
      const resultDetails = new Map() // Will hold the data for the search results (titles and summaries)

      // Set up for an Ajax call to request the JSON data file that is created by Hugo's build process
      $.ajax(offlineJsonUri).then(data => {
        idx = lunr(function () {
          this.ref('ref')

          // If you added more searchable fields to the search index, list them here.
          // Here you can specify searchable fields to the search index - e.g. individual toxonomies for you project
          // With "boost" you can add weighting for specific (default weighting without boost: 1)
          this.field('title', { boost: 5 })
          // this.field('projects', { boost: 3 }); // example for an individual toxonomy called projects
          this.field('description', { boost: 2 })
          this.field('body')
          this.field('language')

          data.forEach(doc => {
            doc.language = removeSymbolsFromString(doc.language);

            this.add(doc)

            resultDetails.set(doc.ref, {
              title: doc.title,
              excerpt: doc.excerpt,
              language: doc.language
            })
          })
        })

        $searchInput.trigger('change')
      })

      const render = $targetSearchInput => {
        $('.cp-search-results').remove()

        if (idx === null) {
          return
        }

        const searchQuery = $targetSearchInput.val()

        if (searchQuery === '') {
          return
        }

        const results = idx.query(q => {
            const tokens = lunr.tokenizer(searchQuery.toLowerCase())

            tokens.forEach(token => {
              const queryString = token.toString()

              q.term(queryString, {
                boost: 100
              });

              q.term(queryString, {
                wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
                boost: 10
              });

              q.term(queryString, {
                editDistance: 2
              });
            })

            q.term(`content/${currentLanguage}`, {
              fields: ['language'],
              wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
              presence: lunr.Query.presence.REQUIRED
            })
          })
          .slice(0, $targetSearchInput.data('offline-search-max-results'))

        //
        // Make result html
        //

        const $html = $('<div class="cp-search-results">')
        const $searchResultBody = $('<div class="cp-search-results-found">')

        $('.cp-search').append($html)

        $html.append($searchResultBody)

        if (results.length === 0) {
          $searchResultBody.append($('<p>').text(`No results found for query "${searchQuery}"`))
        } else {
          results.forEach((r, index) => {
            if (index <= 2) {
              const doc = resultDetails.get(r.ref)

              const $entry = $('<div>').addClass('row justify-content-between align-items-center cp-search-results-found-item')

              $entry.append($('<span>').addClass('col-auto cp-search-results-found-item-title').text(doc.title))

              // $entry.append(
              //   $('<span>')
              //     .addClass('col-auto cp-search-results-found-item-description')
              //     .text(doc.excerpt)
              // )

              $entry.append($('<span>').addClass('col-auto').append(`<a href="${r.ref}"><img src="${baseURL}/icons/arrow-right.svg" alt="Ir"></a>`))

              $searchResultBody.append($entry)
            }
          })
        }

        const handleSearchReset = () => {
          $targetSearchInput.val('')
          $targetSearchInput.trigger('change')
        }

        $('.cp-search-bar-button').on('click', () => {
          handleSearchReset()
        })

        $(document).keydown(function (e) {
          if (e.keyCode == 27) {
            handleSearchReset()
          }
        })

        $(document).click(event => {
          if (!$(event.target).closest('.cp-search').length) {
            handleSearchReset()
          }
        })
      }
    }
  })
})(jQuery)
