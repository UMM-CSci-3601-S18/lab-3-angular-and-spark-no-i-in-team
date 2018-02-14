import {browser, by, element, Key} from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return "highlighted";
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTodoTitle() {
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));

    return title;
  }

  typeAnOwner(name: string) {
    let input = element(by.id('owner'));
    input.click();
    input.sendKeys(name);
  }

  typeACategory(category: string) {
    let input = element(by.id('category'));
    input.click();
    input.sendKeys(category);
  }

  typeABody(body: string) {
    let input = element(by.id('body'));
    input.click();
    input.sendKeys(body);
  }

  selectAStatus(status: boolean) {
    if(status) {
      let input = element(by.id('complete'));
      input.click();
    }
    else {
      let input = element(by.id('incomplete'));
      input.click();
    }
  }

  selectALimit(limit: string) {
    //TODO: implement selectALimit
  }

  selectASortBy(field: string) {
    //TODO: implement selectASortBy
  }

  getNumberOfTodos() {
    //not sure if works
    let num = element(by.className('todo')).length;
    return num;
  }


  selectUpKey() {
    browser.actions().sendKeys(Key.ARROW_UP).perform();
  }

  backspace(){
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }

  getUniqueTodo(_Id:string) {
    let todo = element(by.id(_Id)).getText();
    this.highlightElement(by.id(_Id));

    return todo;
  }

}
