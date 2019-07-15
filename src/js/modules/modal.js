function modal(moreBtn, overlay, closeBtn, descrBtn, animationName) {

    moreBtn.addEventListener('click', function(event) {
        overlay.style.display = 'block';
        this.classList.add(animationName);
        document.body.style.overflow = 'hidden';
    });

    descrBtn.forEach((item) => {
        item.addEventListener('click', function(event) {
            overlay.style.display = 'block';
            this.classList.add(animationName);
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        moreBtn.classList.remove(animationName);
        document.body.style.overflow = '';
    });
}

module.exports = modal;