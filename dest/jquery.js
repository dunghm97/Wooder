$(document).ready(function() {
    //Menu-mobile
    let header = $('#header');
    let menuBtn = $('#btnMenu');
    let openMenu = $('.menu-mobile');
    let lang = $('.lang');
    let backToTop = $('.backToTop');
    let logo = $('.logo a ');
    menuBtn.on('click', function() {
        let checkClosed = openMenu.css('opacity') == 0;
        if(checkClosed) {
            openMenu.addClass('active');
            header.addClass('active');
            lang.css('opacity', 0);
            backToTop.css('display', 'none');
            logo.css('pointer-event','none');
            $('body').css('overflow','hidden');
        } else {
            openMenu.removeClass('active');
            header.removeClass('active');
            lang.css('opacity', 1);
            backToTop.css('display', 'initial');
            logo.css('pointer-event','auto');
            $('body').css('overflow','auto');
        }
    })

    //Clicking nav in menu-mobile 
    let menuItems = $('.menu-mobile ul li a');
    menuItems.on('click', function(e){
        e.preventDefault();
        openMenu.removeClass('active');
        lang.css('opacity', 1);
        header.removeClass('active');
        let href = $(this).attr('href');
        let positionElement = $(`${href}`).offset().top;
        let positionScroll = positionElement - (header.innerHeight());
        window.scrollTo({
            top: positionScroll
        });
        document.body.style.overflow = 'auto';
    })

    //Clicking Nav in PC
    let navItems = $('.nav li a');
    navItems.on('click', function(e){
        e.preventDefault();
        let href = $(this).attr('href');
        let positionElement = $(`${href}`).offset().top;
        let positionScroll = positionElement - (header.innerHeight());
        window.scrollTo({
            top: positionScroll
        });
        $(this).addClass('active');
        navItems.not($(this)).removeClass('active');
    })

    // open/close transition
    let menuLang = $('.lang__current');
    let langOption = $('.lang__option');
    let langItems = $('.lang__option li a');
    menuLang.on('click', function(event) {
        event.stopPropagation();
        langOption.toggleClass('active');
        $('body').on('click',function() {
            langOption.removeClass('active');
        })
    })
    langItems.on('click', function() {
        let langCurrentName = $('.lang__current span');
        let tempLang = langCurrentName.text();
        langCurrentName.html($(this).text());
        $(this).html(tempLang);
        langOption.removeClass('active');
    })

    //resizeWindow
    $(window).resize(function(){
        if(window.outerWidth > 767) {
            openMenu.removeClass('active');
            header.removeClass('active');
            lang.css('opacity', 1);
            $('body').css('overflow','auto');
        }
    })
    // Add/remove background-color Header and Back to top button
    $(document).on('scroll', () => {
        let slider = $('#slider');
        windowHeight = window.scrollY + header.innerHeight();
        if(windowHeight>slider.innerHeight() ) {
            header.addClass('active')
            backToTop.addClass('active');
        } else {
            header.removeClass('active');
            backToTop.removeClass('active');
        }
    })
    //Clicking 'Back to top' button
    backToTop.on('click', (event) => {
        event.stopPropagation();
        $(window).scrollTop(0);
    })


    // Slider with Flickity
    let $carousel = $('#slider .slider_wrap');
    $carousel.flickity({
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: true,
        draggable: true,
        height: '100%',
        on: {
            ready: () => {
                let dots = $('.flickity-page-dots');
                let placeDots = $('.slider_bottom-left .dots');
                let listsDots = dots.css('display','none');
                placeDots.append(listsDots);
                let dotsActive = $('.slider_bottom-left .dots .flickity-page-dots');
                dotsActive.css('display','flex');
                dotsActive.css('width','auto');
                dotsActive.removeClass('is-selected');
            },
            change: (index) => {
                let number = $('.slider_bottom .slider_bottom-left .number');
                let indexPage = index + 1;
                number.text(indexPage.toString().padStart(2,0));
                let active = $('.slider_bottom-left .dots .flickity-page-dots .dot');
                if(index )
                active.eq(index).addClass('is-selected');
                active.eq(index-1).removeClass('is-selected');
            }
        }
    })
    let clickLeft = $('.slider_bottom .slider_bottom-right #click-left');
    let clickRight = $('.slider_bottom .slider_bottom-right #click-right');
    clickLeft.on('click', (e) => {
        e.preventDefault();
        $carousel.flickity('previous');
    })
    clickRight.on('click', (e) => {
        e.preventDefault();
        $carousel.flickity('next');
    })
    // //Slider
    // let clickLeft = $('#click-left');
    // let clickRight = $('#click-right');
    // let sliderItems = $('.slider_item');
    // let slideNum = $('.slider_bottom-left .number');
    // let slideDots = $('.slider_bottom-left .dotted');
    // let sliderIndex = 0;
    // clickLeft.on('click', (e) => {
    //     e.preventDefault();
    //     if(sliderIndex > 0) {
    //         sliderItems.eq(sliderIndex).removeClass('active');
    //         sliderItems.eq(sliderIndex-1).addClass('active');
    //         slideDots.eq(sliderIndex).removeClass('active');
    //         slideDots.eq(sliderIndex-1).addClass('active');
    //         sliderIndex--;
    //         slideNum.html((sliderIndex +1).toString().padStart(2,"0"));
    //     } else if (sliderIndex == 0) {
    //         sliderIndex=sliderItems.length-1;
    //         sliderItems.eq(0).removeClass('active');
    //         sliderItems.eq(sliderIndex).addClass('active');
    //         slideDots.eq(0).removeClass('active');
    //         slideDots.eq(sliderIndex).addClass('active');
    //         slideNum.html((sliderIndex +1).toString().padStart(2,"0"));
    //     } 
    // })
    // clickRight.on('click', (e) => {
    //     e.preventDefault();
    //     if(sliderIndex < sliderItems.length -1) {
    //         sliderItems.eq(sliderIndex).removeClass('active');
    //         sliderItems.eq(sliderIndex+1).addClass('active');
    //         slideDots.eq(sliderIndex).removeClass('active');
    //         slideDots.eq(sliderIndex+1).addClass('active');
    //         sliderIndex++;
    //         slideNum.html((sliderIndex +1).toString().padStart(2,"0"));   
    //     } else {
    //         sliderItems.eq(sliderIndex).removeClass('active');
    //         sliderItems.eq(0).addClass('active');
    //         slideDots.eq(sliderIndex).removeClass('active');
    //         slideDots.eq(0).addClass('active');
    //         sliderIndex= 0;
    //         slideNum.html((sliderIndex +1).toString().padStart(2,"0"));
    //     }
    // })

    //Pop-up wood-Video 
    let playVideos = $('.video-img');
    let popUp = $('.popup-video');
    let iframe = $('.iframe-wrapper iframe');
    let closePopUp = $('.iframe-wrapper .close-video');
    playVideos.on('click',(e) => {
        e.stopPropagation();
        let videoId = $(e.currentTarget).data('video-id');
        iframe.attr('src',`https://www.youtube.com/embed/${videoId}?autoplay=1`);   
        setTimeout(() => {
            popUp.css('display','flex');
            $('body').css('overflow','hidden');
        }, 500);
        closePopUp.on('click', () => {
            popUp.css('display','none');
            iframe.attr('src','');
            $('body').css('overflow','auto');
        })
        $(window).on('click', () => {
            popUp.css('display','none');
            $('body').css('overflow','auto');
        })
    })

    //Image Gallery
    let imgLists = $('.galleryImg .galleryImg_items img');
    let popUpImage = $('.popupImage');
    let imgFull = $('.popupImage .image-wrapper img');
    let prevImg = $('.image-wrapper .prev');
    let nextImg = $('.image-wrapper .next');
    let currentIndexImg = 0;
    imgLists.on('click', (e) => {
        e.stopPropagation();
        popUpImage.css('display','flex');
        let imgLink = $(e.currentTarget).text($(e.currentTarget).attr('src').replace('-thumbnail',''));
        imgFull.attr('src', imgLink.text());
        $('body').css('overflow','hidden');
        $('body').on('click', () => {
            popUpImage.css('display','none');
            $('body').css('overflow','auto');
        })
    })
    nextImg.on('click', (e) => {
        e.stopPropagation();
        if(currentIndexImg < imgLists.length-1) {
            let imgLink = imgLists.eq(currentIndexImg+1).text(imgLists.eq(currentIndexImg+1).attr('src').replace('-thumbnail',''));
            imgFull.attr('src',imgLink.text());
            currentIndexImg++;
        } else {
            currentIndexImg = 0;
            let imgLink = imgLists.eq(currentIndexImg).text(imgLists.eq(currentIndexImg).attr('src').replace('-thumbnail',''));
            imgFull.attr('src',imgLink.text());
        }
    })
    prevImg.on('click', (e) => {
        e.stopPropagation();
        if(currentIndexImg > 0) {
            let imgLink = imgLists.eq(currentIndexImg-1).text(imgLists.eq(currentIndexImg-1).attr('src').replace('-thumbnail',''));     
            imgFull.attr('src',imgLink.text());
            currentIndexImg--;
        } else {
            currentIndexImg = imgLists.length-1;
            let imgLink = imgLists.eq(currentIndexImg).text(imgLists.eq(currentIndexImg).attr('src').replace('-thumbnail','')); 
            imgFull.attr('src',imgLink.text());
        }
    })

    //Tab News
    let panel = $('#news .news-articles');
    $(document).on('click', '#news .news-tabs a' , function(e){
        e.preventDefault();
        let index = $(this).index();
        let itemPanel = panel.eq(index);
        $('#news .news-articles').removeClass('active');
        $('#news .news-tabs a').removeClass('active');
        itemPanel.addClass('active');
        $(this).addClass('active');
    })
    //FAQ JQuery
    $(document).on('click', '.faq_content .question' , function(e){
        e.preventDefault();
        $(this).next().toggleClass('active');
        if ($('.faq_content .question').next().hasClass('active')) {
            $('.faq_content .question').children().removeClass('active');
            $('.faq_content .question').parent().removeClass('active');
            $('.faq_content .question').next().removeClass('active');
            $(this).next().toggleClass('active');
        }
        $(this).parent().toggleClass('active');
        $(this).children().toggleClass('active');
        $('.faq_content .question').not($(this).children()).removeClass('active');
    })

    // TAG JQuery
    $(document).on('keypress', 'input[name="tag"]', function(e){
        if(e.keyCode == 13) {
            let val = $(this).val();
            let htmlTag = `<div class="tag">${val} <span class="remove"><i class="ti-close"></i></span></div>`;
            $('#tag .tag_lists').append(htmlTag);
            $(this).val('');
        }
    })
    $(document).on('click', '#tag .tag_lists .tag .remove', function() {
        $(this).parent().remove();
    })

    // SlideImageDrag
    $carouselImg = $('#sliderDrag .sliderImages');
    $carouselImg.flickity({
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        autoPlay: true,
        adaptiveHeight: true,
    })

})