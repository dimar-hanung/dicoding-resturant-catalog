class IconFavorite extends HTMLElement {
  connectedCallback() {
    const ariaLabel = this.getAttribute('aria-label') || 'Add to favorites';
    const isFavorite = this.getAttribute('is-favorite') || false;
    this.innerHTML = `   <button
    aria-label="${ariaLabel}"
    is-favorite="${isFavorite}"
    class="icon__favorite"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0,0,256,256"
      width="44px"
      height="44px"
      fill-rule="nonzero"
    >
      <g
        class="icon__favorite__stroke"
        fill-rule="nonzero"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="butt"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
      >
        <path
          transform="scale(5.12,5.12)"
          d="M37,48c-0.17578,0 -0.34766,-0.04687 -0.50391,-0.13672l-11.49609,-6.70703l-11.49609,6.70703c-0.30859,0.17969 -0.69141,0.18359 -1,0.00391c-0.3125,-0.17969 -0.50391,-0.50781 -0.50391,-0.86719v-44c0,-0.55078 0.44922,-1 1,-1h24c0.55469,0 1,0.44922 1,1v44c0,0.35938 -0.19141,0.6875 -0.50391,0.86719c-0.15234,0.08984 -0.32422,0.13281 -0.49609,0.13281z"
          id="strokeMainSVG"
        ></path>
      </g>
      <g
        class="icon__favorite__fill"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
      >
        <g transform="scale(5.12,5.12)">
          <path
            d="M37,48c-0.17578,0 -0.34766,-0.04687 -0.50391,-0.13672l-11.49609,-6.70703l-11.49609,6.70703c-0.30859,0.17969 -0.69141,0.18359 -1,0.00391c-0.3125,-0.17969 -0.50391,-0.50781 -0.50391,-0.86719v-44c0,-0.55078 0.44922,-1 1,-1h24c0.55469,0 1,0.44922 1,1v44c0,0.35938 -0.19141,0.6875 -0.50391,0.86719c-0.15234,0.08984 -0.32422,0.13281 -0.49609,0.13281z"
          ></path>
        </g>
      </g>
    </svg>
  </button>`;
  }
}

customElements.define('icon-favorite', IconFavorite);
