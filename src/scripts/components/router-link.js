class RouterLink extends HTMLAnchorElement {
  constructor() {
    super();

    this.href = this.getAttribute('href') || null;
    this.alt = this.getAttribute('alt') || null;
    this.caption = this.getAttribute('caption') || null;

    const template = document.createElement('template');
    template.innerHTML = `
        <slot></slot>
    `;
    // const shadowRoot = this.attachShadow({ mode: 'open' });
    // shadowRoot.appendChild(template.content.cloneNode(true));

    // this.anchorTag = shadowRoot.querySelector('a');
    // console.log('this.anchorTag', this.anchorTag);

    // this.addEventListener('click', this.click.bind(this));
  }

  connectedCallback() {
    console.log('connectedCallback', this.anchorTag);
    // this.anchorTag.addEventListener('click', this.onClick);
    this.addEventListener('click', this.click.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.click.bind(this));
    // this.anchorTag.removeEventListener('click', this.onClick);
  }

  click(event) {
    if (event.getModifierState('Control') || event.getModifierState('Meta')) return; // allow control-click or cmd-click (mac) to work as usual
    event?.preventDefault();
    window.history.pushState(null, null, this.href);
    console.log(this.href);
    // do whatever you like here
  }
}

customElements.define('router-link', RouterLink, { extends: 'a' });
