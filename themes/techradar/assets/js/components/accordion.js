(() => {
  $(document).ready(() => {
    const accordionToggles = $('.cp-accordion-item-head-toggle')
  
    if (accordionToggles) {
      const handleToggleClick = (e) => {
        e.preventDefault();
    
        const accordionItem = $(e.target).parents('.cp-accordion-item');
        if (accordionItem.hasClass('is-active')) {
          accordionItem.removeClass('is-active')
        } else {
          $('.cp-accordion-item').removeClass('is-active')
          accordionItem.addClass('is-active')
        }

        accordionItem[0].scrollIntoView({
          block: "start", behavior: "smooth"
        });
      }
    
      accordionToggles.on('click', handleToggleClick)
    }
  });
})();