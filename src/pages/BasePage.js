const { expect, step } = require('@playwright/test');

export class BasePage {
  _url;

  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  url() {
    if (this._url) {
      return this._url;
    } else {
      throw Error(`The property '_url' must be implemented`);
    }
  }

  _pageName() {
    this.constructor.name.replace('Page', '')
  }

  async open() {
    await step(`Open ${this._pageName()} page`, async () => {
      await this.page.goto(this.url());
    });
  }

  async waitForLoading() {
    await step(`Wait for ${this._pageName()} page to open`, async () => {
      await this.page.waitForURL(this.url());
    });
  }

  async reload() {
    await step(`Reload the ${this._pageName()} Page`, async () => {
      await this.page.reload();
    });
  }

}