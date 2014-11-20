angular.module('aha.directives', [])
.directive('googlePlaces', function(){
				var googleVar = "google_places_ac";
                return {
                    restrict:'E',
                    replace:true,
                    // transclude:true,
                    scope: {location:'='},
                    template: '<input ng-model="googleP" id="google_places_ac" name="'+googleVar+'" type="text" class="input-block-level"/>',
                    link: function($scope, elm, attrs){
                        var autocomplete = new google.maps.places.Autocomplete(googleVar[0], {});
                        google.maps.event.addListener(autocomplete, 'place_changed', function() {
                            var place = autocomplete.getPlace();
                            $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                            $scope.$apply();
                        });
                    }
                }
            });