/**
 * Magnetic Buttons
 */
function initMagneticButtons() {
    const magnets = document.querySelectorAll('.magnetic');
    const defaultStrength = 100;
  
    if (window.innerWidth > 540) {
      magnets.forEach((magnet) => {
        const magnetsStrength = magnet.getAttribute("data-strength") || defaultStrength;
        const magnetsStrengthText = magnet.getAttribute("data-strength-text") || defaultStrength;
  
        magnet.addEventListener('mousemove', (event) => moveMagnet(event, magnet, magnetsStrength, magnetsStrengthText));
        magnet.addEventListener('mouseleave', (event) => resetMagnet(event, magnet));
  
        magnet.addEventListener('mouseenter', () => handleMouseEnter(magnet));
        magnet.addEventListener('mouseleave', () => handleMouseLeave(magnet));
      });
  
      function moveMagnet(event, magnetButton, strength, strengthText) {
        const bounding = magnetButton.getBoundingClientRect();
        gsap.to(magnetButton, 1.5, {
          x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strength,
          y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
          rotate: "0.001deg",
          ease: Power4.easeOut
        });
        
        const btnText = magnetButton.querySelector(".btn-text");
        if (btnText) {
          gsap.to(btnText, 1.5, {
            x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strengthText,
            y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strengthText,
            rotate: "0.001deg",
            ease: Power4.easeOut
          });
        }
      }
  
      function resetMagnet(event, magnetButton) {
        gsap.to(magnetButton, 1.5, {
          x: 0,
          y: 0,
          ease: Elastic.easeOut
        });
        const btnText = magnetButton.querySelector(".btn-text");
        if (btnText) {
          gsap.to(btnText, 1.5, {
            x: 0,
            y: 0,
            ease: Elastic.easeOut
          });
        }
      }
  
      function handleMouseEnter(magnetButton) {
        const btnFill = magnetButton.querySelector(".btn-fill");
        if (btnFill) {
          gsap.to(btnFill, 0.6, { startAt: { y: "76%" }, y: "0%", ease: Power2.easeInOut });
        }
        const btnTextInner = magnetButton.querySelector(".btn-text-inner.change");
        if (btnTextInner) {
          gsap.to(btnTextInner, 0.3, { startAt: { color: "#1C1D20" }, color: "#FFFFFF", ease: Power3.easeIn });
        }
        magnetButton.parentNode.classList.remove('not-active');
      }
  
      function handleMouseLeave(magnetButton) {
        const btnFill = magnetButton.querySelector(".btn-fill");
        if (btnFill) {
          gsap.to(btnFill, 0.6, { y: "-76%", ease: Power2.easeInOut });
        }
        const btnTextInner = magnetButton.querySelector(".btn-text-inner.change");
        if (btnTextInner) {
          gsap.to(btnTextInner, 0.3, { color: "#1C1D20", ease: Power3.easeOut, delay: 0.3 });
        }
        magnetButton.parentNode.classList.remove('not-active');
      }
    }
  }
  
  // Call the function after DOM is ready
  document.addEventListener('DOMContentLoaded', initMagneticButtons);
  