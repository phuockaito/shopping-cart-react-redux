$(document).ready(function () {
    const onClickCloseMenu = $('i.fa.fa-times')
    const onClickOpenMenu = $('i.fa.fa-bars');
    const btnShowSearch = $('.btn-show-search');
    const btnCloseSearch = $('.btn-search');
    const btnShowLogin = $('.btn-show-login');
    const btnCloseLogin = $('.btn-close-login');
    const scrollMenu = $('.ground-header');
    // open menu window dowload 1000 px
    $("ul.menu").find('li.active-menu a').on('click', function () {
        $(this).parent('li.active-menu').toggleClass('open');
    })
    //
    onClickOpenMenu.on('click', function () {
        toggleMenu();

    })
    onClickCloseMenu.on('click', function () {
        toggleMenu();
    })
    function toggleMenu() {
        $('.ground-menu').toggleClass('open');
        hedenBody();
    }
    //
    btnShowSearch.on('click', function () {
        toggleShowSearch();
    })
    btnCloseSearch.on('click', function () {
        CloseSearch();

    });
    function CloseSearch() {
        $('.search').removeClass('open');
        $('body').removeClass('active');
        $('.main-container').removeClass('active');
    }
    function toggleShowSearch() {
        $('.search').toggleClass('open');
        hedenBody();
    }
    // show login
    btnShowLogin.on('click', function () {
        toggleShowLogin();
    })
    btnCloseLogin.on('click', function () {
        $('.show-login').removeClass('open');
        $('body').removeClass('active');
        $('.main-container').removeClass('active');
    })
    function toggleShowLogin() {
        $('.show-login').toggleClass('open');
        hedenBody();
    }

    function hedenBody() {
        $('body').toggleClass('active');
        $('.main-container').toggleClass('active');
    }

    $('button.scrollTop').on('click', () => {
        $("html ,body").animate({ scrollTop: 0 }, 500);

    })

    var lastScrollTop = 0;
    window.addEventListener("scroll", () => {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            scrollMenu.css("top","-80px");
            $('.ground-menu .nav-toggle').css("height","0");
            $('.card-total-money').css("top","5px");
        } else {
            scrollMenu.css("top","0");
            $('.ground-menu .nav-toggle').css("height","76px");
            $('.card-total-money').css("top","80px");
        }
        lastScrollTop = scrollTop;
    });

    //------------open menu ------------
    // //------------scroll//------------
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.scrollTop').addClass('active');
        } else {

            $('.scrollTop').removeClass('active');
        }

    });


})

