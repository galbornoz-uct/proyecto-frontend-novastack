(() => {
    const header = document.querySelector('.navegacion-principal');
    const button = header?.querySelector('.menu-boton');
    if (!button) return;

    const mobile = window.matchMedia('(max-width: 767.98px)');
    const setOpen = (open) => {
        header.classList.toggle('menu-abierto', open);
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', open ? 'Cerrar menú principal' : 'Abrir menú principal');
    };

    setOpen(false);
    button.hidden = false;
    header.classList.add('menu-listo');

    button.addEventListener('click', () => {
        setOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    header.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobile.matches && button.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            button.focus();
        }
    });

    header.querySelector('nav').addEventListener('click', (event) => {
        if (mobile.matches && event.target.closest('a')) {
            setOpen(false);
            button.focus();
        }
    });

    mobile.addEventListener('change', () => setOpen(false));
})();
