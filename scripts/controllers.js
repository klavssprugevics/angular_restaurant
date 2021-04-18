angular.module('restaurantApp')
.controller('MenuController', ['$scope', 'orderByFilter', 'sharedDishes', function($scope, orderBy, sharedDishes)
{
    $scope.showMenu = false;
    $scope.message = "Uzgaidiet..."
 
    // iegust datus no JSON server
    sharedDishes.getDishes().query(
    function(resp){
        $scope.dishes = resp;
        $scope.showMenu = true;
    },
        function(resp){
        $scope.message = "Kļūda: " + resp.status + " " + resp.statusText;
    });
    


    $scope.selected_tags = [];

    // funckija atjauno izveleto tag sarakstu
    $scope.addTag = function(tag)
    {
        tag_index = $scope.selected_tags.indexOf(tag);
        if(tag_index === -1)
        {
            $scope.selected_tags.push(tag);
        }
        else
        {
            $scope.selected_tags.splice(tag_index, 1);
        }
    };

    // funkcija, kas parbauda, vai izveleto tag saraksts ir ediena kategoriju apakssaraksts
    $scope.checkTags = function()
    {
        return function(food)
        {
            return $scope.selected_tags.every(tag => food.category.includes(tag));
        };
    };

    // sakarto masivu pec cenas
    $scope.orderBy = function()
    {
        $scope.dishes = orderBy($scope.dishes, 'price', (($scope.selectedOrder == '1') ? false : true));
    };
}])
.controller('DishController', ['$scope',  'sharedDishes', function($scope, sharedDishes)
{
    // nodrosina jaunu dish pievienosanu
    $scope.newDish = {name:'', image:'', category:[], price:0.00, description:''};
    $scope.checkInfo = function()
    {
        $scope.combineCategories();
        currImage = $scope.newDish.image;

        if(currImage === "")
        {
            $scope.newDish.image = 'images/apple.png';
        }

        sharedDishes.getDishes().save($scope.newDish);
    };

    // No checkbox izveido kategoriju sarakstu
    $scope.combineCategories = function()
    {
        category = [];
        if($scope.vegan)
        {
            category.push('vegan');
        }
        if($scope.vegetarian)
        {
            category.push('vegetarian');
        }
        if($scope.specials)
        {
            category.push('specials');
        }
        $scope.newDish.category = category;
    };
}])
.controller('DishSpotlightController', ['$scope', 'sharedDishes', function($scope, sharedDishes)
{
    $scope.showMenu = false;
    $scope.message = "Uzgaidiet..."
 
    // iegust datus no JSON server
    sharedDishes.getDishes().query(
    function(resp){
        $scope.showMenu = true;
        $scope.dishes = resp;
        // Samaisa masiivu
        var shuffled = $scope.dishes.sort(() => 0.5 - Math.random());
        $scope.selectedDishes = shuffled.slice(0, 3);
    },
        function(resp){
        $scope.message = "Kļūda: " + resp.status + " " + resp.statusText;
    });
}]);