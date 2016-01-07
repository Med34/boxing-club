angular.module('bclub').controller("HomeController", function ($scope) {
    console.log("HomeController");
});

angular.module('bclub').controller("FindMemberController", function ($scope, $http) {
    $http.get("http://localhost:8888/findMember").then(function (response) {
        $scope.mapJSON = response.data;
    });

    // Stocke l'utilisateur.
    $scope.user = {};
    $scope.find = function (user) {
        $http.get("http://localhost:8888/listMembers", {
            params: user
        }).then(function (response) {
            $scope.members = response.data;
        });
    }
    $scope.reset = function () {
        $scope.user = {};
        $scope.members = null;
    }
});

angular.module('bclub').controller("LocalizeMemberController", function($scope, $http){
    var width= 500, height=550;
    var path = d3.geo.path();

    // On change la projection de la carte et on la centre sur la France.
    var projection = d3.geo.conicConformal()
        .center([2.454071, 46.279229])
        .scale(3000)
        .translate([width / 2, height / 2]);

    path.projection(projection);

    var svg = d3.select('#map').append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height);

    var deps = svg.append("g");
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Creation de la carte avec le support geojson
    d3.json('vendor/regions.geojson', function(req, geojson) {
        deps.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path)
            .on("mouseover", function(d) {
                div.transition().duration(200).style("opacity", .9);
                div.html("Région : " + d.properties.nom)
                       .style("left", (d3.event.pageX + 30) + "px")
                       .style("top", (d3.event.pageY - 30) + "px")
            })
            .on("mouseout", function(d) {
                div.transition().duration(500).style("opacity", 0);
                div.html("").style("left", "0px").style("top", "0px");
            });
    });
});
