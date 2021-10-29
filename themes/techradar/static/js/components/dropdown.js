(() => {
  $(document).ready(() => {
    const ELEMENT = $('.cp-dropdown-list');

    const handleToggle = () => {
      ELEMENT.toggle()
    }

    const handleItemChange = (e) => {
      const { value } = e.target.dataset;

      location.href =  value.replace('/', '');
    }

    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        ELEMENT.hide()
      }
    })

    $(document).click(event => {
      if (!$(event.target).closest('.cp-dropdown').length) {
        ELEMENT.hide()
      }
    })

    $('.cp-dropdown-head').on('click', handleToggle);
    $('.cp-dropdown-list-item').on('click', handleItemChange)
  });
})();