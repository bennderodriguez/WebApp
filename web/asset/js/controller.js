//<html ng-app="app">
angular.module('MyFirstApp',[])
	.controller("FirstController",function($scope,$http)
	{
		$scope.posts= [];
		$scope.newPost= {};
		$accion="Buscar";
		$idUsuario="10";
		$http.get("history_request.json")
		.success(function(data)
		{
			console.log(data);
			$scope.posts= data;
			
		})
		.error(function(err)
		{
			console.log(err);
		});
		$scope.addPost=function()
		{
			$http.post("http://jsonplaceholder.typicode.com/posts",{
				title: $scope.newPost.title,
				body: $scope.newPost.body,
				userId: 1
			})
			.success(function(data,status,headers,config)
			{
				$scope.posts.push($scope.newPost);
				$scope.addPost={};
				
			})
			.error(function(error,status,headers,config)
			{
				console.log(error);
			});
		}
	});