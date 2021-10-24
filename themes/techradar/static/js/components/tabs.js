(() => {
  $(document).ready(() => {
    const tabsActions = $('.cp-tabs-list-item a');

    const handleTabsActionsClick = (e) => {
      e.preventDefault();

      const element = $(e.target);
      const content = element.data('tab-content')
      const contentSection = $('.cp-tabs-content');

      element.parent().addClass('is-active').siblings().removeClass('is-active');

      if (contentSection) {
        contentSection.html(content)
      }
    };

    if (tabsActions) {
      tabsActions.on('click', handleTabsActionsClick);
    }
  });
})();