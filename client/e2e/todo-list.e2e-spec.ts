import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  /*origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });*/

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

    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche");
    page.backspace();
    page.typeAnOwner("fry");
    expect(page.getUniqueTodo("58895985c1849992336c219b")).toEqual("Fry");

  });

  it('should type something in filter category box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeACategory("h");

    expect(page.getUniqueTodo("58895985ae3b752b124e7663")).toEqual("Fry");
    page.navigateTo();
    page.typeACategory("video games")
    expect(page.getUniqueTodo("588959856f0b82ee93cd93eb")).toEqual("Barry");

  });

  it('should type something in filter body box and check that it returned correct element', () => {
    page.navigateTo();

    page.typeABody("ipsum")
    expect(page.getUniqueTodo("5889598585bda42fb8388ba1")).toEqual("Blanche");

  });

  it('should type a limit and check the number of elements is correct', () => {
    page.navigateTo();
    page.selectALimit("10");
    expect(page.getNumberOfTodos() == 10);

    page.navigateTo();
    page.selectALimit("25");
    expect(page.getNumberOfTodos() == 25);
  });

  it('should type something in the sort box and check that it returned correct element', () => {
    page.navigateTo();
    page.selectASortBy("owner");

    expect(page.getUniqueTodo("588959855f1ee021726da5f9")).toEqual('Barry');
    page.navigateTo();
    page.selectASortBy("category");
    expect(page.getUniqueTodo("588959856b2259d62afcebf4")).toEqual('Roberta');

  });

  it('should use all filters at once and check that it returned correct element correct', () => {
    page.navigateTo();
    page.typeAnOwner("r");
    page.typeAStatus("complete");
    page.typeABody("cillum");
    page.typeACategory("video games");
    page.selectASortBy("owner");
    page.selectALimit("4");

    expect(page.getUniqueTodo("58895985756338a6d69e107c")).toEqual("Fry");
    expect(page.getUniqueTodo("5889598593f949fbeea56296")).toEqual("Roberta");

  });
});
