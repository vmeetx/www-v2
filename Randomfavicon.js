(function () {
    function setRandomFavicon() {
        const favicons = [
            'favicon1.svg',
            'favicon2.svg',
            'favicon3.svg',
            'favicon4.svg',
            'favicon5.svg',
            'favicon6.svg',
            'favicon7.svg'
        ];
        const randomIndex = Math.floor(Math.random() * favicons.length);
        const randomFavicon = 'favicons/' + favicons[randomIndex];
        const faviconLink = document.getElementById('dynamic');
        if (faviconLink) {
            faviconLink.href = randomFavicon;
        }
    }
    document.addEventListener('DOMContentLoaded', setRandomFavicon);
})();