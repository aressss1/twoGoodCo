function loadingAnimation() {
  document.addEventListener("DOMContentLoaded", function () {
    const counter3 = document.querySelector(".counter-3");

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }

    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);


    function animate(counter, duration, delay = 0) {
      const numHeight = counter.querySelector(".num").clientHeight;
      const totalDistance =
        (counter.querySelectorAll(".num").length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    }

    animate(counter3, 5);
    animate(document.querySelector(".counter-2"), 6);
    animate(document.querySelector(".counter-1"), 2, 4);
  });

  gsap.to(".digit", {
    top: "-150px",
    stagger: {
      amount: 0.25,
    },
    delay: 6,
    duration: 1,
    ease: "power4.inOut",
  });

  gsap.from(".loader-1", {
    width: 0,
    duration: 6,
    ease: "power2.inOut",
  });

  gsap.from(".loader-2", {
    width: 0,
    delay: 1.9,
    duration: 2,
    ease: "power2.inOut",
  });

  gsap.to(".loader", {
    background: "none",
    delay: 6,
    duration: 0.1,
  });

  gsap.to(".loader-1", {
    rotate: 90,
    y: -50,
    duration: 0.5,
    delay: 6,
  });

  gsap.to(
    ".loader-2",
    {
      x: -75,
      y: 75,
      duration: 0.5,
    },
    "<"
  );

  gsap.to(".loader", {
    scale: 40,
    duration: 1,
    delay: 7,
    ease: "power2.inOut",
  });

  gsap.to(".loader", {
    rotate: 45,
    y: 500,
    x: 2000,
    duration: 1,
    delay: 7,
    ease: "power2.inOut",
  });

  gsap.to(".loading-screen", {
    opacity: 0,
    duration: 0.5,
    delay: 7.5,
    ease: "power1.inOut",
  });
}

function LocomotiveWithScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function NavbarAnimation() {
  gsap.to("#nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#section1",
      scroller: "#main",
      start: "top 0",
      end: "top -8%",
      scrub: 1,
    },
  });
  gsap.to("#nav-part2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#section1",
      scroller: "#main",
      start: "top 0",
      end: "top -8%",
      scrub: 1,
    },
  });
}

function HeroAnimation() {
  gsap.from("#section1 #headingdiv #mainheading", {
    y: 100,
    opacity: 0,
    delay: 8,
    duration: 0.9,
    stagger: 0.3,
  });

  gsap.from("#section1 #image-container", {
    scale: 0.9,
    opacity: 0,
    delay: 9.5,
    duration: 0.5,
  });
}

function cursorHover() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });
  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)",
      });
    });
    
    elem.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(0)",
      });
    });
  });
}

loadingAnimation()

LocomotiveWithScrollTrigger();

NavbarAnimation();

HeroAnimation();

cursorHover();
