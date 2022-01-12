(() => {
    $(document).ready(() => {
        $('.menu-toggle').click(function () {
            $(this).toggleClass('active');
            $('#menu-overlay').toggleClass('open');
            $('body').toggleClass('no-scroll')
        });
    });
})();
