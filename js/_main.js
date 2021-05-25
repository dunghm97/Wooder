let header = document.getElementById('header');
let menuItem = document.getElementById('btnMenu');
let openMenu = document.getElementsByClassName('menu-mobile');
let lang = document.querySelector('.lang');
let backToTop = document.querySelector('.backToTop');
let logo = document.querySelector('.logo a ');
// open and close Menu-mobile
menuItem.onclick = () => {
    let isClosed = window.getComputedStyle(openMenu[0]).getPropertyValue("opacity") == 0 ;
    if (isClosed) {
        document.body.style.overflow = 'hidden';
        backToTop.style.display = 'none';
        openMenu[0].classList.add('active');
        lang.style.opacity = '0';
        openMenu[0].style.transition = 'all 0.4s ease-in-out 0s';
        header.style.backgroundColor = '#000'; 
        header.style.transition = 'all 0.4s ease-in-out 0s';
        logo.style.pointerEvent = 'none';
    } else {
        openMenu[0].classList.remove('active');
        document.body.style.overflow = 'auto';
        backToTop.style.display = 'inherit';
        lang.style.opacity = '1';
        openMenu[0].style.transition = 'all 0.4s ease-in-out 0s';
        header.style.transition = '0';
        if(window.scrollY > 335) {
            header.style.backgroundColor = '#000';
        } else {
            header.style.backgroundColor = 'initial';
        }
         
        logo.style.pointerEvent = 'auto';
    }
};
document.body.onresize = () => {
    //console.log(window.outerWidth);
    if(window.outerWidth > 767) {
        openMenu[0].classList.remove('active');
        header.style.backgroundColor = 'transparent'; 
        lang.style.opacity = '1';
        document.body.style.overflow = 'auto';
    }
}

//automation closing menu-mobile when clicking nav
let menuItems = document.querySelectorAll('.menu-mobile ul li a');
for(let i = 0; i< menuItems.length; i++) {
    let menuItem = menuItems[i];
    menuItem.onclick = (e) => {
        if(window.scrollY == 0) {
            document.body.style.overflow = 'auto';
            openMenu[0].classList.remove('active');
            lang.style.opacity = '1';
            header.style.backgroundColor = 'initial';
        } else {
            document.body.style.overflow = 'auto';
            openMenu[0].classList.remove('active');
            lang.style.opacity = '1';
        }
        e.preventDefault();
        let href = menuItem.getAttribute('href');
        let positionElement = document.querySelector(`${href}`).offsetTop;
        let positionScroll = positionElement - (header.clientHeight);
        window.scrollTo({
            top: positionScroll
        });
    }
}

//Click in nav PC
let navItems = document.querySelectorAll('.nav li a');
let navIndex = 0;
navItems.forEach((item,index) => {
    if(item.classList.contains('active')) {
        navIndex = index;
    }
    item.onclick = (e) => {
        e.preventDefault();
        let href = item.getAttribute('href');
        let positionElement = document.querySelector(`${href}`).offsetTop;
        let positionScroll = positionElement - header.clientHeight;
        navItems[navIndex].classList.remove('active');
        item.classList.add('active');
        navIndex = index;
        window.scrollTo({
            top: positionScroll
        });
    }   
})

// open/close Translation 
let menuLang = document.querySelector('.lang__current');
let langOption = document.querySelector('.lang__option');
let langItems = document.querySelectorAll('.lang__option li a');
menuLang.onclick = (event) => {
    event.stopPropagation();
    langOption.classList.toggle('active');
}

for(let i =0 ; i< langItems.length; i++) {
    let langItem = langItems[i];
    langItem.onclick = (e) => {
        e.preventDefault();
        let langCurrentName = document.querySelector('.lang__current span');
        let temp = langCurrentName.textContent;
        langCurrentName.innerHTML =langItem.textContent;
        langItem.innerHTML = temp;
        langOption.classList.remove('active');
    }
   
}
document.body.onclick = () => {
    langOption.classList.remove('active');
}

// Add/remove background-color-header and Back to top button
document.onscroll = () => {
    let slider = document.querySelector('#slider');
    let products = document.querySelector('#product');
    let backToTop = document.querySelector('.backToTop');
    windowHeight = window.scrollY+header.clientHeight;
    if(windowHeight>slider.clientHeight ) {
        header.style.backgroundColor = '#000';
        header.style.transition = 'all 0.4s ease-in-out 0s';
        backToTop.classList.add('active');
    } else {
        header.style.backgroundColor = 'initial';
        header.style.transition = 'all 0.4s ease-in-out 0s';
        backToTop.classList.remove('active');
    }
}


//Clicking 'Back to top' button
backToTop.onclick = (event) => {
    event.stopPropagation();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop= 0;
}

//Slider
let clickLeft = document.getElementById('click-left');
let clickRight = document.getElementById('click-right');
let sliderItems = document.querySelectorAll('.slider_item');
let slideNum = document.querySelector('.slider_bottom-left .number');
let slideDots = document.querySelectorAll('.slider_bottom-left .dotted');
let sliderIndex = 0;
sliderItems.forEach((item,index) => {
    if(item.classList.contains('active')){
        sliderIndex = index;
    }
})
clickRight.onclick = (e) => {
    e.preventDefault();
    if(sliderIndex < sliderItems.length -1) {
        sliderItems[sliderIndex].classList.remove('active');
        sliderItems[sliderIndex+1].classList.add('active');
        slideDots[sliderIndex].classList.remove('active');
        slideDots[sliderIndex+1].classList.add('active');
        sliderIndex++;
        slideNum.textContent = (sliderIndex +1).toString().padStart(2,"0");   
    } else {
        sliderItems[sliderIndex].classList.remove('active');
        sliderItems[0].classList.add('active');
        slideDots[sliderIndex].classList.remove('active');
        slideDots[0].classList.add('active');
        sliderIndex= 0;
        slideNum.textContent = (sliderIndex +1).toString().padStart(2,"0");
    }
}
clickLeft.onclick = (e) => {
    e.preventDefault();
    if(sliderIndex > 0) {
        sliderItems[sliderIndex].classList.remove('active');
        sliderItems[sliderIndex-1].classList.add('active');
        slideDots[sliderIndex].classList.remove('active');
        slideDots[sliderIndex-1].classList.add('active');
        sliderIndex--;
        slideNum.textContent = (sliderIndex +1).toString().padStart(2,"0");
    } else if (sliderIndex == 0) {
        sliderIndex=sliderItems.length-1;
        sliderItems[0].classList.remove('active');
        sliderItems[sliderIndex].classList.add('active');
        slideDots[0].classList.remove('active');
        slideDots[sliderIndex].classList.add('active');
        slideNum.textContent = (sliderIndex +1).toString().padStart(2,"0");
    } 
}


//Pop-up wood-Video 
let playVideos = document.querySelectorAll('.video-content .video-img');
let popUp = document.querySelector('.popup-video');
let iframe = document.querySelector('.iframe-wrapper iframe');
let closePopUp = document.querySelector('.popup-video .iframe-wrapper .close-video');
playVideos.forEach(play => {
    play.onclick = (e) => {
        e.stopPropagation();
        videoId = play.getAttribute('video-id');
        iframe.setAttribute('src','https://www.youtube.com/embed/'+videoId);   
        this.setTimeout(() => {
            popUp.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }, 500);
        closePopUp.onclick = () => {
            popUp.style.display = "none";
            iframe.setAttribute('src','');
            document.body.style.overflow = 'auto';
        }
    }
    window.onclick = () => {
        popUp.style.display = "none";
        document.body.style.overflow = 'auto';
    }
})


//Pop-up Image Gallery
let imgLists = document.querySelectorAll('.galleryImg .galleryImg_items img');
let popUpImage = document.querySelector('.popupImage');
let imgFull = document.querySelector('.popupImage .image-wrapper img');
let prevImg = document.querySelector('.image-wrapper .prev');
let nextImg = document.querySelector('.image-wrapper .next');
let currentIndexImg = 0;
imgLists.forEach((item,index) => {
    currentIndexImg = index;
    item.onclick = (e) => {
        currentIndexImg = index;
        e.stopPropagation();
        popUpImage.style.display = 'flex';
        let imgLink = item.getAttribute('src').replace('-thumbnail','');
        console.log(imgLink);
        imgFull.setAttribute('src',imgLink);
        document.body.style.overflow = 'hidden';
        document.body.onclick = () => {
            popUpImage.style.display = 'none';
            document.body.style.overflow = 'auto';
        }      
    }
})
nextImg.onclick = (e) => {
    e.stopPropagation();
    if(currentIndexImg < imgLists.length-1) {
        let imgLink = imgLists[currentIndexImg+1].getAttribute('src').replace('-thumbnail','');
        imgFull.setAttribute('src',imgLink);
        currentIndexImg++;
    } else {
        currentIndexImg = 0;
        let imgLink = imgLists[currentIndexImg].getAttribute('src').replace('-thumbnail','');
        imgFull.setAttribute('src',imgLink);
    }
}
prevImg.onclick = (e) => {
    e.stopPropagation();
    if(currentIndexImg > 0) {
        let imgLink = imgLists[currentIndexImg-1].getAttribute('src').replace('-thumbnail','');
        imgFull.setAttribute('src',imgLink);
        currentIndexImg--;
    } else {
        currentIndexImg = imgLists.length-1;
        let imgLink = imgLists[currentIndexImg].getAttribute('src').replace('-thumbnail','');
        imgFull.setAttribute('src',imgLink);
        currentIndexImg--;
    }
}


//Tabs news
let tabs = document.querySelectorAll('#news .news-tabs a');
let newsList = document.querySelectorAll('#news .news-articles');
let currentTab = 0;
tabs.forEach((tab,index) => {
    if(tab.classList.contains('active')){
        currentTab = index;
    }
    tab.onclick = (e) => {
        e.preventDefault();
        tabs[currentTab].classList.remove('active');
        tab.classList.add('active');
        newsList[currentTab].classList.remove('active');
        newsList[index].classList.add('active');
        currentTab = index;
    }
})


//FAQ
let faqLists = document.querySelectorAll('.faq_content a');
let faqAnswers = document.querySelectorAll('.faq_content p');
let currentQuestion = 0;
faqLists.forEach((item,index)=> {
    if(item.classList.contains('active')){
        currentQuestion = index;
    }
    item.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // item.classList.toggle('active');
        // let answer = item.nextElementSibling;
        // if(answer.style.height) {
        //     answer.style.height = null;
        //     answer.style.padding = '0';
        // } else {
        //     answer.style.height = '100%';
        //     answer.style.padding = '18px 24px';
        // }
        if(item.classList.contains('active')){
            item.classList.remove('active');
            faqAnswers[currentQuestion].classList.remove('active');
        } else {
            faqLists[currentQuestion].classList.remove('active');
            faqAnswers[currentQuestion].classList.remove('active');
            item.classList.toggle('active');
            faqAnswers[index].classList.add('active');
            currentQuestion = index;
        }
    }
    document.body.onclick = () => {
        item.classList.remove('active');
        faqAnswers[currentQuestion].classList.remove('active');
    }
})


// FAQ JQuery
// ${document}.ready(function{
//     console.log('ok')
// })