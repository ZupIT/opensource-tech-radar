(() => {
  $(document).ready(() => {
    const tabsActions = $('.cp-tabs-list-item a');
    const contentSection = $('.cp-tabs-content');

    const handleTabsActionsClick = (e) => {      
      e.preventDefault();

      const element = $(e.target);
      const content = element.data('tab-content')
      

      element.parent().addClass('is-active').siblings().removeClass('is-active');

      if (contentSection) {
        contentSection.html(content)
      }
    };
    

    if (tabsActions && tabsActions.length) {
      const { tabContent  } = $(tabsActions[0]).data();

      $(tabsActions[0]).parent().addClass('is-active')
      contentSection.html(tabContent)
      
      tabsActions.on('click', handleTabsActionsClick);
    }
  });
    
})();