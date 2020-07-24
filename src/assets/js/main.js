window.addEventListener('load', function() {
    let allSection = document.querySelectorAll('section'),
        pnls = allSection.length,
        scdir, hold = false;
    let wrapper = document.getElementById('wrapper');
    wrapper.style.transform = 'translateY(0)';

    function checkWidth() {
        if (document.querySelector('#slidewrapper').getAttribute('style') !== null) {
            document.querySelector('#slidewrapper').removeAttribute('style');
        }
        if (window.outerWidth > 655)
            document.querySelector('.header-right').insertAdjacentElement('beforeend', document.querySelector('.header-right__number'));
        if (window.outerWidth <= 655)
            document.querySelector('.menu-desktop').insertAdjacentElement('beforeend', document.querySelector('.header-right__number'));
    }

    function wheelUser(event) {
        if (event.deltaY < 0) {
            scdir = 'down';
        }
        if (event.deltaY > 0) {
            scdir = 'up';
        }
        event.stopPropagation();
    }

    function _scrollY(obj) {
        var slength, plength, pan, step = 100,
            vh = window.innerHeight / 100,
            vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
        if ((this !== undefined && this.id === 'wrapper') || (obj !== undefined && obj.id === 'wrapper')) {
            pan = this || obj;
            plength = parseInt(pan.offsetHeight / vh);
        }
        if (pan === undefined) {
            return;
        }
        plength = plength || parseInt(pan.offsetHeight / vmin);
        slength = parseInt(pan.style.transform.replace('translateY(', ''));
        if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls)) {
            slength = slength - step;
        } else if (scdir === 'down' && slength < 0) {
            slength = slength + step;
        } else if (scdir === 'top') {
            slength = 0;
        }
        if (hold === false) {
            hold = true;
            pan.style.transform = 'translateY(' + slength + 'vh)';
            setTimeout(function() {
                hold = false;
            }, 1000);
        }
        if ('translateY(0vh)' !== pan.style.transform) document.querySelector('.header').className = 'header content';
        else {
            document.querySelector('.header').className = 'header';

        }
    }

    function _swipe(obj) {
        var swdir,
            sX,
            sY,
            dX,
            dY,
            threshold = 100,
            /*[min distance traveled to be considered swipe]*/
            slack = 50,
            /*[max distance allowed at the same time in perpendicular direction]*/
            alT = 500,
            /*[max time allowed to travel that distance]*/
            elT, /*[elapsed time]*/
            stT; /*[start time]*/
        obj.addEventListener('touchstart', function(e) {
            var tchs = e.changedTouches[0];
            swdir = 'none';
            sX = tchs.pageX;
            sY = tchs.pageY;
            stT = new Date().getTime();
            //e.preventDefault();
        }, false);

        obj.addEventListener('touchmove', function(e) {
            e.preventDefault(); /*[prevent scrolling when inside DIV]*/
        }, false);

        obj.addEventListener('touchend', function(e) {
            var tchs = e.changedTouches[0];
            dX = tchs.pageX - sX;
            dY = tchs.pageY - sY;
            elT = new Date().getTime() - stT;
            if (elT <= alT) {
                if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
                    swdir = (dX < 0) ? 'left' : 'right';
                } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
                    swdir = (dY < 0) ? 'up' : 'down';
                }
                if (obj.id === 'wrapper') {
                    if (swdir === 'up') {
                        scdir = swdir;
                        _scrollY(obj);
                    } else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
                        scdir = swdir;
                        _scrollY(obj);

                    }
                    e.stopPropagation();
                }
            }
        }, false);
    }

    function clickMenuBurger() {
        this.closest('.menu').classList.toggle('menu_state_open');
        this.closest('.menu').querySelector('.menu-desktop').classList.toggle('open');
        if (window.outerWidth <= 500) {
            document.querySelector('.first-inner').classList.toggle('hidden');
            document.querySelector('.about-inner').classList.toggle('hidden');
            document.querySelector('.advantages .container').classList.toggle('hidden');
            document.querySelector('.specifications .container').classList.toggle('hidden');
            document.querySelector('.question .container').classList.toggle('hidden');
            document.querySelector('.contacts .container').classList.toggle('hidden');
        }
    }

    function slider() {
        function nextSlide() {
            if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
                document.querySelector('#slidewrapper').style.transform = 'translate(0, 0)';
                slideNow = 1;
                if (document.querySelector('.slide-nav-btn') !== null) document.querySelector('.slide-nav-btn.active').className = 'slide-nav-btn';
                if (document.querySelector('.slide-nav-btn') !== null) document.querySelector('.slide-nav-btn:first-child').className = 'slide-nav-btn active';
            } else {
                translateWidth = -document.querySelector('#viewport').offsetWidth * (slideNow);
                document.querySelector('#slidewrapper').style.transform = 'translate(' + translateWidth + 'px, 0)';
                slideNow++;
                if (document.querySelector('.slide-nav-btn') !== null) document.querySelector('.slide-nav-btn.active').nextElementSibling.className = 'slide-nav-btn active';
                if (document.querySelector('.slide-nav-btn') !== null) document.querySelector('.slide-nav-btn.active').className = 'slide-nav-btn';
            }
        }

        function prevSlide() {
            if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
                translateWidth = -document.querySelector('#viewport').offsetWidth * (slideCount - 1);
                document.querySelector('#slidewrapper').style.transform = 'translate(' + translateWidth + 'px, 0)';
                slideNow = slideCount;
                if (document.querySelector('.slide-nav-btn') !== null) document.querySelector('.slide-nav-btn.active').className = 'slide-nav-btn';
                if (document.querySelector('.slide-nav-btn') !== null) document.querySelector('.slide-nav-btn:last-child').className = 'slide-nav-btn active';
            } else {
                translateWidth = -document.querySelector('#viewport').offsetWidth * (slideNow - 2);
                document.querySelector('#slidewrapper').style.transform = 'translate(' + translateWidth + 'px, 0)';
                slideNow--;
                if (document.querySelector('.slide-nav-btn.active') !== null) document.querySelector('.slide-nav-btn.active').previousElementSibling.className = 'slide-nav-btn active';
                if (document.querySelector('.slide-nav-btn.active') !== null) document.querySelector('.slide-nav-btn.active').nextElementSibling.className = 'slide-nav-btn';
            }
        }
        let slideNow = 1;
        let slideCount = document.querySelector('#slidewrapper').children.length
            // let slideInterval = 3000;
        let navBtnId = 0;
        let translateWidth = 0;
        // 
        let initialPoint;
        let finalPoint;
        document.querySelector('#viewport').addEventListener('touchstart', function(event) {
            event.preventDefault();
            event.stopPropagation();

            initialPoint = event.changedTouches[0];
        }, false);
        document.querySelector('#viewport').addEventListener('touchend', function(event) {
            event.preventDefault();
            event.stopPropagation();
            finalPoint = event.changedTouches[0];
            var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
            var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
            if (xAbs > 20 || yAbs > 20) {
                if (xAbs > yAbs) {
                    if (finalPoint.pageX < initialPoint.pageX) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                } else {
                    if (finalPoint.pageY < initialPoint.pageY) {
                        /*СВАЙП ВВЕРХ*/
                    } else {
                        /*СВАЙП ВНИЗ*/
                    }
                }
            }
        }, false);
        document.querySelector('#next-btn').addEventListener('click', nextSlide);
        document.querySelector('#next-btn').addEventListener('touchstart', nextSlide);
        document.querySelector('#prev-btn').addEventListener('click', prevSlide);
        document.querySelector('#prev-btn').addEventListener('touchstart', prevSlide);
        if (document.querySelector('.slide-nav-btn') !== null) document.querySelectorAll('.slide-nav-btn').forEach(function(item, index) {
            function dotClick() {
                document.querySelector('.slide-nav-btn.active').className = 'slide-nav-btn';
                event.target.className = 'slide-nav-btn active';
                navBtnId = index;
                if (navBtnId + 1 != slideNow) {
                    translateWidth = -document.querySelector('#viewport').offsetWidth * (navBtnId);
                    document.querySelector('#slidewrapper').style.transform = 'translate(' + translateWidth + 'px, 0)';
                    slideNow = navBtnId + 1;
                }
            }
            item.addEventListener('click', dotClick);
            item.addEventListener('touchstart', dotClick);
        });
    }

    function clickPseudoAnchor() {
        event.preventDefault();
        scdir = 'up';
        _scrollY(wrapper);
    }

    function clickMenuItem() {
        event.preventDefault();
        document.querySelector('.header').className = 'header content';
        allSection.forEach(function(item, index) {
            if (event.target.href.indexOf(item.id) !== -1) {
                console.log(index * -100);
                wrapper.style.transform = `translateY(${index * -100}vh)`;
            }
        });
        if (document.querySelector('.menu.menu_state_open') !== null) document.querySelector('.menu__burger').click();
    }

    function clickQustion() {
        if (this.className === 'question-content__box open') this.classList.toggle('open')
        else {
            this.closest('.question-content').querySelectorAll('.question-content__box').forEach(function(item) {
                item.classList.forEach(function(className) {
                    if (className === 'open') item.classList.toggle('open');
                });
            });
            this.classList.toggle('open');
        }
    }

    function clickBody() {
        if (document.querySelector('.menu.menu_state_open') !== null &&
            event.target.closest('.header') === null)
            document.querySelector('.menu__burger').click();
    }

    function pressSpecialKey() {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            scdir = 'up';
            _scrollY(wrapper);
        }
    }

    checkWidth();
    slider();
    _swipe(wrapper);

    document.querySelectorAll('.arrow-down').forEach(function(item) {
        item.addEventListener('click', clickPseudoAnchor);
    });
    document.querySelectorAll('.menu-desktop__item').forEach(function(item) {
        item.addEventListener('click', clickMenuItem);
    });
    document.querySelectorAll('.question-content__box').forEach(function(item) {
        item.addEventListener('click', clickQustion);
    });
    document.querySelector('.menu__burger').addEventListener('click', clickMenuBurger);
    wrapper.addEventListener('wheel', wheelUser);
    wrapper.addEventListener('wheel', _scrollY);
    document.querySelector('body').addEventListener('click', clickBody);
    document.querySelector('body').addEventListener('keydown', pressSpecialKey);

    window.addEventListener('resize', checkWidth);
});