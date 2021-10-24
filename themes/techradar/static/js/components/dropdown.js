(() => {
  $(document).ready(() => {
    const handleToggle = () => {
      $('.cp-dropdown-list').toggle()
    }

    const handleItemChange = (e) => {
      const { value } = e.target.dataset;

      location.href = value;
    }

    $('.cp-dropdown-head').on('click', handleToggle);
    $('.cp-dropdown-list-item').on('click', handleItemChange)
  });
})();