// Smoth Scroll using Locomotive and gsap ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main-page"),
  smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);


ScrollTrigger.scrollerProxy(".main-page", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 

  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  
  pinType: document.querySelector(".main-page").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

// end of smooth scroll 

//////////////////////////////////////////////////////////////////////////




// cursor animation 
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (movement)=> {
    gsap.to(cursor,  {
        opacity: 1,
        duration: 1,
        x: movement.clientX,
        y: movement.clientY,
    });
});

document.addEventListener("mouseleave", ()=> {
    gsap.to(cursor,  {
        opacity: 0,
        duration: 1,
    });
});


// menu toggler
function menuToggle(){
    const menuIcon = document.querySelector("#menuIcon");

    t1 = gsap.timeline({paused:true});

    t1.to("nav ul", {
        right: "10%",
        duration: 1,
        ease: "power2.inOut",
    });

    menuIcon.addEventListener("click", ()=> {
        if(t1.reversed()){
            t1.play();
        }else{
            t1.reverse();
        }
    });

    t1.from("nav ul li a", {
        opacity: 0,
        right: "-80%",
        duration: 0.5,
        stagger: 0.3,
    }, "<");

};

menuToggle();

// hero section 

function heroSection(){
    const heroHeader = document.querySelector(".hero h1");
    
    heroHeader.addEventListener("mousemove", ()=>{
        gsap.to(cursor, {
            scale: 5,
            duration: 0.5,
            ease: "elastic"
        });
    });

    heroHeader.addEventListener("mouseleave", ()=>{
        gsap.to(cursor, {
            scale: 1,
            duration: 0.5,
        });
    });

};

heroSection();







// magnetic button

function initMagneticButtons(){
    const magneticBtn = document.querySelectorAll(".magnetic");
    const defaultStrenth = 100;

    if(window.innerWidth > 540){
        magneticBtn.forEach((magnet) => {
            const magnetStrength = magnet.getAttribute("data-strength") || defaultStrenth;
            const magnetStrengthTexts = magnet.getAttribute("data-strength-text") || defaultStrenth;

            magnet.addEventListener("mousemove", (event) => moveMagnet(event, magnet, magnetStrength, magnetStrengthTexts));
            magnet.addEventListener("mouseleave", (event) => resetMagnet(event, magnet));

            magnet.addEventListener("mouseenter", () => handleMouseEnter(magnet));
            magnet.addEventListener("mouseleave", () => handleMouseLeave(magnet));
        });


        // for moving a button 
        function moveMagnet(event, magnetBtn, strength, strengthText){
            const bounding = magnetBtn.getBoundingClientRect();
            gsap.to(magnetBtn, 1.5, {
                x:(((event.clientX - bounding.left) / magnetBtn.offsetWidth)- 0.5) * strength,
                y:(((event.clientY - bounding.top) / magnetBtn.offsetHeight)- 0.5) * strength,
                rotate: "0.001deg",
                ease: Power4.easeOut
            });

            const btnText = magnetButton.querySelector(".btn-text");
            if (btnText){
                gsap.to(btnText, 1.5, {
                    x:(((event.clientX - bounding.left) / magnetBtn.offsetWidth)- 0.5) * strength,
                    y:(((event.clientY - bounding.top) / magnetBtn.offsetHeight)- 0.5) * strength,
                    rotate: "0.001deg",
                    ease: Power4.easeOut
                })
            }
        }

        // for resetting the magnet 
        function resetMagnet(event, magnetBtn){
            gsap.to(magnetBtn, 1.5, {
                x: 0,
                y: 0,
                ease: Elastic.easeOut
            });

            const btnText = magnetButton.querySelector(".btn-text");
            if(btnText, 1.5){
                gsap.to(magnetBtn, 1.5, {
                    x: 0,
                    y: 0,
                    ease: Elastic.easeOut
                });
            }
        }

        // to handle mouse enter
        function handleMouseEnter(magnetButton){
            const btnFill = magnetButton.querySelector(".btn-fill");

            if(btnFill){
                gsap.to(btnFill, 0.6, {
                    startAt: {y: "76%"},
                    y: "0%",
                    ease: Power2.easeInOut
                });
            }

            const btnTextInner = magnetButton.querySelector(".btn-text-inner.change");
            if(btnTextInner){
                gsap.to(btnTextInner, 0.3, {
                    startAt: {color: "#1C1D20"},
                    color: "#FFFFFF",
                    ease: Power3.easeIn
                });
            }
            magnetButton.parentNode.classList.remove("not-active");
        }
        
        // to handle mouse leave 

        function handleMouseLeave(magnetButton){
            const btnFill = magnetButton.querySelector(".btn-fill");

            if(btnFill){
                gsap.to(btnFill, 0.6, {
                    y: "-76%",
                    ease: Power2.easeInOut,
                })
            }

            const btnTextInner = magnetButton.querySelector(".btn-text-inner.change");

            if(btnTextInner){
                gsap.to(btnTextInner, 0.3, {
                    color: "#1C1D20",
                    delay: 0.3,
                    ease: Power3.easeOut,
                })
            }
            magnetButton.parentNode.classList.remove("not-active");
        }
    }
}

document.addEventListener('DOMContentLoaded', initMagneticButtons);