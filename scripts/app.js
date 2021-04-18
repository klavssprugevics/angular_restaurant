angular.module('restaurantApp', ['ui.router', 'ngResource'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('app', {url:'/', views:
    {
        'header' : {templateUrl : './views/header.html'},
        'content@' : {templateUrl : './views/home.html', controller : 'DishSpotlightController'},
        'footer' :{templateUrl : './views/footer.html'}
    }})
    .state('app.edienkarte', {url:'edienkarte', views:
    {
        'header' : {templateUrl : './views/header.html'},
        'content@' : {templateUrl : './views/menu.html', controller : 'MenuController'},
        'footer' :{templateUrl : './views/footer.html'}
    }})
	   .state('app.pievienot', {url:'pievienot', views:
    {
        'header' : {templateUrl : './views/header.html'},
        'content@' : {templateUrl : './views/add_dish.html', controller : 'DishController'},
        'footer' :{templateUrl : './views/footer.html'}
    }})
 	  .state('app.kontakti', {url:'kontakti', views:
    {
        'header' : {templateUrl : './views/header.html'},
        'content@' : {templateUrl : './views/contacts.html'},
        'footer' :{templateUrl : './views/footer.html'}
    }})
  	 .state('app.vakances', {url:'vakances', views:
    {
        'header' : {templateUrl : './views/header.html'},
        'content@' : {templateUrl : './views/jobs.html'},
        'footer' :{templateUrl : './views/footer.html'}
    }})
    $urlRouterProvider.otherwise('/');
}]);
