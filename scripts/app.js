angular.module('restaurantApp', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){


    $stateProvider
    .state('app', {url:'/', views:
    {
        'header' : {templateUrl : './views/header.html'},
        'content' : {templateUrl : './views/home.html'},
        'footer' :{templateUrl : './views/footer.html'}
    }})
    .state('app.edienkarte', {url:'edienkarte', views:
    {
        'header' : {templateUrl : './views/header.html'},
        'content@' : {templateUrl : './views/edienkarte.html', controller : 'MenuController'},
        'footer' :{templateUrl : './views/footer.html'}
    }})
	.state('app.pievienot', {url:'pievienot', views:
    {
        'header' : {templateUrl : './views/header.html'},
        'content@' : {templateUrl : './views/add_dish.html', controller : 'DishController'},
        'footer' :{templateUrl : './views/footer.html'}
    }})   
    $urlRouterProvider.otherwise('/');
}])