angular.module('restaurantApp')
.controller('MenuController', ['$scope', 'orderByFilter', 'sharedDishes', function($scope, orderBy, sharedDishes)
{
    // Pievieno watcher, kas atjauno dish sarakstu, kad tiek pievienots jauns dish.
    $scope.$watch(sharedDishes.getDishes, function(change)
    {
        this.change = change;
        $scope.dishes = sharedDishes.getDishes();

    }.bind(this));

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
    $scope.dishes = sharedDishes.getDishes();
    $scope.newDish = {name:'', description:'', image:'', category:[], price:''};
    
    $scope.checkInfo = function()
    {
        $scope.combineCategories();
        currImage = $scope.newDish.image;
        if(currImage === "")
        {
            $scope.newDish.image = 'images/apple.png';
        }
        else
        {
            $scope.newDish.image = 'images/' + currImage;
        }
        $scope.dishes.push($scope.newDish)
        sharedDishes.setDishes($scope.dishes);

        console.log("New dish info:");
        console.log($scope.newDish.name);
        console.log($scope.newDish.description);
        console.log($scope.newDish.image);
        console.log($scope.newDish.category);
        console.log($scope.newDish.price);
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
}]);
