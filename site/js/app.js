var viewTodo = function(){
  console.log("view todo");
  document.title = "todo";
  var appView = new AppView({collection: app.Todos});
  React.renderComponent(appView, document.getElementById("render"));
};

var viewTest = function(){
  console.log("view test");
  document.title = "test";
  var myView = new MyView();
  React.renderComponent(myView, document.getElementById("render"));
};

var index = function(){
  console.log("index");
};

var routes = {
  '/': index,
  '/todo': viewTodo,
  '/test': viewTest
};

var router = Router(routes).configure({html5history: true});
router.init();

function setRoute(href){
  router.setRoute(href);
  return false;
}
