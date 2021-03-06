(function() {
	'use strict';

	/*global angular, $, document*/
	angular.module('NowPlayingApp')
		.controller('MainCtrl', ['$scope', 'NowPlayingSvc', function ($scope, NowPlayingSvc) {
			/*
			 * using the hardcoded data
			 */
			/*$scope.movies = NowPlayingSvc.data.movies;
			$scope.slide = 0;
			$scope.numSlides = $scope.movies.length;*/

			/*
			 * using the actual http call to the server
			 */
			NowPlayingSvc.getMovies().then(function(data) {
				$scope.movies = data.data.movies;
				$scope.slide = 0;
				$scope.numSlides = $scope.movies.length;
			});

			$scope.moveBack = function() {
				if ($scope.slide > 0) {
					$scope.slide -= 1;
				}
			};

			$scope.moveForward = function() {
				if ($scope.slide < $scope.numSlides - 1) {
					$scope.slide += 1;
				}
			};

			$scope.toggleSave = function(movie) {
				if (!movie.saved) {
					NowPlayingSvc.saveMovie(movie);
				} else {
					NowPlayingSvc.removeSavedMovie(movie);
				}
			};

			/*
			 * let the user use their left and right arrow keys to move
			 * back and forth through the movies
			 */
			$(document).on('keyup', function(event) {
				if (event.keyCode === 37) {
					$scope.moveBack();
				}

				if (event.keyCode === 39) {
					$scope.moveForward();
				}

				$scope.$apply();
			});
	}]);
}());