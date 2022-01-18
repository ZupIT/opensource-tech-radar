(() => {
  $(document).ready(() => {
    const removeLastBarFromString = string => {
      const lastCharIndex = string.length - 1
  
      if (string[lastCharIndex] === '/') {
        return string.slice(0, -1)
      }
  
      return string
    }
  
    const baseURL = removeLastBarFromString($('meta[name=baseURL]').attr('content'))
    const element = $('.cp-dropdown-list');

    const handleToggle = () => {
      element.toggle()
    }

    const handleItemChange = (e) => {
      const { value } = e.target.dataset;
      
      location.href =  baseURL + value;
    }

    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        element.hide()
      }
    })

    $(document).click(event => {
      if (!$(event.target).closest('.cp-dropdown').length) {
        element.hide()
      }
    })

    $('.cp-dropdown-head').on('click', handleToggle);
    $('.cp-dropdown-list-item').on('click', handleItemChange)
  });
})();