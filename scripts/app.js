angular.module('restaurantApp',[])
.service('sharedDishes', function($rootScope)
{
    // Service, kas satures mainigos, kas jadala starp controllers
    var dishes = 
    [
        {name:'Garneles ar rīsiem', image:'images/food1.jpg', category:['specials'], price:'4.00', description:'Šis ēdiens jums noteikti jānogaršo. Maecenas vel interdum massa. Nam nec justo a dui tempus aliquam. Suspendisse sollicitudin lacus non ligula vehicula tincidunt. Maecenas venenatis eros ac malesuada placerat. Fusce in aliquet purus, in iaculis sapien. Vivamus nec sem nibh. Nunc aliquet nisl nec nunc egestas, eu ornare risus accumsan. Suspendisse ligula mi, consectetur nec lacus eget, sollicitudin laoreet nulla. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus dictum tincidunt mauris quis tincidunt. Maecenas laoreet massa erat, non volutpat elit faucibus ultrices. Integer dapibus ac nibh at aliquet. Suspendisse sed turpis ac magna rutrum aliquam.'},
        {name:'Pavasara pārsteigums', image:'images/food2.jpg', category:['specials', 'vegan', 'vegetarian'], price:'6.00', description:'Šis ēdiens jums noteikti jānogaršo. Maecenas vel interdum massa. Nam nec justo a dui tempus aliquam. Suspendisse sollicitudin lacus non ligula vehicula tincidunt. Maecenas venenatis eros ac malesuada placerat. Fusce in aliquet purus, in iaculis sapien. Vivamus nec sem nibh. Nunc aliquet nisl nec nunc egestas, eu ornare risus accumsan. Suspendisse ligula mi, consectetur nec lacus eget, sollicitudin laoreet nulla. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus dictum tincidunt mauris quis tincidunt. Maecenas laoreet massa erat, non volutpat elit faucibus ultrices. Integer dapibus ac nibh at aliquet. Suspendisse sed turpis ac magna rutrum aliquam.'},
        {name:'Putra ar zaļumiem', image:'images/food3.jpg', category:['vegetarian'], price:'5.00', description:'Šis ēdiens jums noteikti jānogaršo. Maecenas vel interdum massa. Nam nec justo a dui tempus aliquam. Suspendisse sollicitudin lacus non ligula vehicula tincidunt. Maecenas venenatis eros ac malesuada placerat. Fusce in aliquet purus, in iaculis sapien. Vivamus nec sem nibh. Nunc aliquet nisl nec nunc egestas, eu ornare risus accumsan. Suspendisse ligula mi, consectetur nec lacus eget, sollicitudin laoreet nulla. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus dictum tincidunt mauris quis tincidunt. Maecenas laoreet massa erat, non volutpat elit faucibus ultrices. Integer dapibus ac nibh at aliquet. Suspendisse sed turpis ac magna rutrum aliquam.'},
        {name:'Lasis ar spinātiem', image:'images/food4.jpg', category:['specials', 'vegetarian'], price:'6.99', description:'Šis ēdiens jums noteikti jānogaršo. Maecenas vel interdum massa. Nam nec justo a dui tempus aliquam. Suspendisse sollicitudin lacus non ligula vehicula tincidunt. Maecenas venenatis eros ac malesuada placerat. Fusce in aliquet purus, in iaculis sapien. Vivamus nec sem nibh. Nunc aliquet nisl nec nunc egestas, eu ornare risus accumsan. Suspendisse ligula mi, consectetur nec lacus eget, sollicitudin laoreet nulla. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus dictum tincidunt mauris quis tincidunt. Maecenas laoreet massa erat, non volutpat elit faucibus ultrices. Integer dapibus ac nibh at aliquet. Suspendisse sed turpis ac magna rutrum aliquam.'},
        {name:'Kijevas kotletes', image:'images/food5.jpg', category:['vegetarian', 'vegan'], price:'5.00', description:'Šis ēdiens jums noteikti jānogaršo. Maecenas vel interdum massa. Nam nec justo a dui tempus aliquam. Suspendisse sollicitudin lacus non ligula vehicula tincidunt. Maecenas venenatis eros ac malesuada placerat. Fusce in aliquet purus, in iaculis sapien. Vivamus nec sem nibh. Nunc aliquet nisl nec nunc egestas, eu ornare risus accumsan. Suspendisse ligula mi, consectetur nec lacus eget, sollicitudin laoreet nulla. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus dictum tincidunt mauris quis tincidunt. Maecenas laoreet massa erat, non volutpat elit faucibus ultrices. Integer dapibus ac nibh at aliquet. Suspendisse sed turpis ac magna rutrum aliquam.'},

    ];

    return {
        getDishes: function() {
            return dishes;
        },
        setDishes: function(value) {
            dishes = value;
        }
    };
})
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
}])
