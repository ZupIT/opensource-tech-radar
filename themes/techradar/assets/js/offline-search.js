// Adapted from code by Matt Walters https://www.mattwalters.net/posts/hugo-and-lunr/

;(function ($) {
  'use strict'

  $(document).ready(function () {
    const $searchInput = $('.cp-search-bar-field')

    if ($searchInput && $searchInput.length) {
      //
      // Options for popover
      //

      $searchInput.data('html', true)
      $searchInput.data('placement', 'bottom')
      $searchInput.data(
        'template',
        '<div class="popover offline-search-result" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
      )

      //
      // Register handler
      //

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
      $.ajax($searchInput.data('offline-search-index-json-src')).then(data => {
        idx = lunr(function () {
          this.ref('ref')

          // If you added more searchable fields to the search index, list them here.
          // Here you can specify searchable fields to the search index - e.g. individual toxonomies for you project
          // With "boost" you can add weighting for specific (default weighting without boost: 1)
          this.field('title', { boost: 5 })
          this.field('categories', { boost: 3 })
          this.field('tags', { boost: 3 })
          // this.field('projects', { boost: 3 }); // example for an individual toxonomy called projects
          this.field('description', { boost: 2 })
          this.field('body')

          data.forEach(doc => {
            this.add(doc)

            resultDetails.set(doc.ref, {
              title: doc.title,
              excerpt: doc.excerpt
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

        const results = idx
          .query(q => {
            const tokens = lunr.tokenizer(searchQuery.toLowerCase())
            tokens.forEach(token => {
              const queryString = token.toString()
              q.term(queryString, {
                boost: 100
              })
              q.term(queryString, {
                wildcard:
                  lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
                boost: 10
              })
              q.term(queryString, {
                editDistance: 2
              })
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
          $searchResultBody.append(
            $('<p>').text(`No results found for query "${searchQuery}"`)
          )
        } else {
          results.forEach((r, index) => {
            if (index <= 3) {
              const doc = resultDetails.get(r.ref)
              const baseURL = $searchInput.data('offline-search-base-href')
              const href = baseURL + r.ref.replace(/^\//, '')

              const $entry = $('<div>').addClass(
                'row justify-content-between align-items-center cp-search-results-found-item'
              )

              $entry.append(
                $('<span>')
                  .addClass('col-auto cp-search-results-found-item-title')
                  .text(r.ref)
              )

              // $entry.append(
              //   $('<span>')
              //     .addClass('col-auto cp-search-results-found-item-description')
              //     .text(doc.excerpt)
              // )

              $entry.append(
                $('<span>')
                  .addClass('col-auto')
                  .append(
                    `<a href="${href}"><img src="${baseURL}/icons/arrow-right.svg" alt="Ir"></a>`
                  )
              )

              $searchResultBody.append($entry)
            }
          })
        }

        $('.cp-search-bar-button').on('click', () => {
          $targetSearchInput.val('')
          $targetSearchInput.trigger('change')
        })
      }
    }
  })
})(jQuery)
