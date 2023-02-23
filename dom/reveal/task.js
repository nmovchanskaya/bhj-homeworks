document.addEventListener("scroll", (e) => {
    const viewportHeight = window.innerHeight;
    let blocks = Array.from(document.querySelectorAll(".reveal"));

    blocks.forEach((item) => {
        if (item.getBoundingClientRect().top < viewportHeight && 
            item.getBoundingClientRect().bottom > 0) {
            
            item.classList.add("reveal_active");
        }
    });
});