angular.module('restaurantApp')
.constant('baseURL', 'http://localhost:3000/')
.service('sharedDishes', ['$resource', 'baseURL', function($resource, baseURL)
{   
    return {
        getDishes: function() {
           return $resource(baseURL + 'dishes/:id', null, {'update':{method:'PUT', isArray:true}});
        },
        setDishes: function(value) {
            dishes = value;
        }
    };
}]);