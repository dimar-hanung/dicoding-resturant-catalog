const DrawerInitiator = {
  init({
    button, drawer, content, callback = () => true,
  }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
    this._callback = callback;
  },

  _callback: () => true,

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('--active');

    this._callback(drawer.classList.contains('--active'));
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('--active');
    this._callback(drawer.classList.contains('--active'));
  },
};

export default DrawerInitiator;
