class PopUp extends HTMLImageElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const form = document.querySelector('form[is="chat-window"]');
    this.addEventListener('click', this.handlePopupClick);
    form.addEventListener('submit', this.onSubmit);
  }

  disconnectedCallback() {
    const form = document.querySelector('form[is="chat-window"]');
    this.removeEventListener('click', this.handlePopupClick);
    form.removeEventListener('submit', this.onSubmit);
  }

  handlePopupClick() {
    this.toggleActiveClass();
    this.toggleChatWindow();
  }

  toggleChatWindow() {
    const className = 'show';
    const element = document.querySelector('form[is="chat-window"]');
    element.classList.toggle(className);
  }

  toggleActiveClass() {
    const className = 'active';
    this.classList.toggle(className);
  }

  onSubmit(e) {
    e.preventDefault();
    const form = document.querySelector('form[is="chat-window"]');
    const customer = form.elements['name']?.value;
    const feedback = form.elements['feedback']?.value;

    console.log('==submitted==', form);
    console.log('==customer==', customer);
    console.log('==feedback==', feedback);
  }
}

customElements.define('popup-icon', PopUp, { extends: 'img' });
