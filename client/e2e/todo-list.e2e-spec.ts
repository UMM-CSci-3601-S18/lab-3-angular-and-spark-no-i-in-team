import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Name attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type something in filter owner box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAnOwner("b");
    /* TODO: figure out IDs and the owners
    expect(page.getUniqueTodo("kittypage@surelogic.com")).toEqual("Kitty Page");
    page.backspace();
    page.typeAnOwner("fry")
    expect(page.getUniqueTodo("lynnferguson@niquent.com")).toEqual("Fry");
    */
  });

  it('should type something in filter category box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeACategory("h");
    /* TODO: figure out IDs and the owners
    expect(page.getUniqueTodo("kittypage@surelogic.com")).toEqual("Kitty Page");
    page.backspace();
    page.typeACategory("fry")
    expect(page.getUniqueTodo("lynnferguson@niquent.com")).toEqual("Fry");
    */
  });

  it('should type something in filter body box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeABody("c");
    /* TODO: figure out IDs and the owners
    expect(page.getUniqueTodo("kittypage@surelogic.com")).toEqual("Kitty Page");
    page.backspace();
    page.typeABody("ipsum")
    expect(page.getUniqueTodo("lynnferguson@niquent.com")).toEqual("Fry");
    */
  });

  it('should select something in the limit dropdown and check the number of elements is correct', () => {
    page.navigateTo();
    page.selectALimit("10");
    expect(page.getNumberOfTodos().toEqual(10));

    page.selectALimit("25");
    expect(page.getNumberOfTodos().toEqual(25));
  });

  it('should select something in the sort dropdown and check that it returned correct element', () => {
    page.navigateTo();
    page.selectASortBy("owner");
    /*TODO: figure out IDs and the owners
    expect(page.getUniqueTodo("").toEqual(''));
    page.selectASortBy("category");
    expect(page.getUniqueTodo("").toEqual(''));
    */
  });

  it('should use all filters at once and check that it returned correct element correct', () => {
    page.navigateTo();
    page.selectALimit("10");
    page.typeABody("cillum");
    page.typeACategory("video games");
    page.typeAnOwner("r");
    page.selectASortBy("owner");
    page.selectAStatus(true);
    /*TODO: figure out IDs and the owners
    expect(page.getUniqueTodo("lynnferguson@niquent.com")).toEqual("Fry");
    expect(page.getUniqueTodo("lynnferguson@niquent.com")).toEqual("Fry");
    */
  });
});
