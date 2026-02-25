document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".bar");

    // Animate the bar width and the percentage text from 0 to target
    function animateBar(bar, target) {
        const percentEl = bar.closest(".right").querySelector(".percent");
        let start = 0;
        const duration = 1000; // animation duration in ms
        const startTime = performance.now();

        function frame(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            bar.style.width = value + "%";
            percentEl.textContent = value + "%";
            if (progress < 1) {
                requestAnimationFrame(frame);
            }
        }
        requestAnimationFrame(frame);
    }

    // set new random percents and start animation
    function randomize() {
        bars.forEach(bar => {
            const target = Math.floor(Math.random() * 101); // 0-100%
            bar.dataset.percent = target;
            animateBar(bar, target);
        });
    }

    // only animate bars when they appear in the viewport (better for long lists)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const target = parseInt(bar.dataset.percent, 10) || 0;
                animateBar(bar, target);
                observer.unobserve(bar); // animate once
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));

    // randomize on load
    randomize();

    // helper to apply descending static values on the bars
    function descendingStatic() {
        // calculate step based on number of bars
        const count = bars.length;
        let value = 100;
        const step = count > 1 ? Math.floor(100 / (count - 1)) : 100;
        bars.forEach(bar => {
            bar.dataset.percent = value;
            bar.style.width = value + "%"; // no animation, immediate
            const percentEl = bar.closest(".right").querySelector(".percent");
            percentEl.textContent = value + "%";
            value = Math.max(value - step, 0);
        });
    }

    const redo = document.querySelector(".btn-orange");
    if (redo) {
        redo.addEventListener("click", e => {
            e.preventDefault();
            descendingStatic();
        });
    }
});