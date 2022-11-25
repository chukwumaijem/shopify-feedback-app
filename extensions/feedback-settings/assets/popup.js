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

  async onSubmit(e) {
    e.preventDefault();
    const form = document.querySelector('form[is="chat-window"]');
    const customer = form.elements['name']?.value;
    const feedback = form.elements['feedback']?.value;
    const shopId = form.elements['shopId'].value;
    const shopDomain = form.elements['shopDomain'].value;
    const apiURL = 'https://b9b5-197-210-85-109.eu.ngrok.io/api/feedback';

    const resp = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify({ customer, feedback, shopId, shopDomain }),
    });
    const data = await resp.json();
    this.showResponseToast(data);
  }

  showResponseToast(data) {
    console.log('==data==', data);
  }
}

customElements.define('popup-icon', PopUp, { extends: 'img' });
