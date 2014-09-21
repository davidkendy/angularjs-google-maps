/**
 * @ngdoc directive
 * @name MapController
 * @requires $scope
 * @property {Hash} controls collection of Controls initiated within `map` directive
 * @property {Hash} markersi collection of Markers initiated within `map` directive
 * @property {Hash} shapes collection of shapes initiated within `map` directive
 * @property {MarkerClusterer} markerClusterer MarkerClusterer initiated within `map` directive
 */
ngMap.directives.MapController = function($scope) { 

  this.map = null;
  this._objects = [];

  /**
   * Add a marker to map and $scope.markers
   * @memberof MapController
   * @name addMarker
   * @param {Marker} marker google map marker
   */
  this.addMarker = function(marker) {
    /**
     * marker and shape are initialized before map is initialized
     * so, collect _objects then will init. those when map is initialized
     * However the case as in ng-repeat, we can directly add to map
     */
    if (this.map) {
      marker.setMap(this.map);
      if (marker.centered) {
        this.map.setCenter(marker.position);
      }
      var len = Object.keys(this.map.markers).length;
      this.map.markers[marker.id || len] = marker;
    } else {
      this._objects.push(marker);
    }
  };

  /**
   * Add a shape to map and $scope.shapes
   * @memberof MapController
   * @name addShape
   * @param {Shape} shape google map shape
   */
  this.addShape = function(shape) {
    if (this.map) {
      shape.setMap(this.map);
      var len = Object.keys(this.map.shapes).length;
      this.map.shapes[shape.id || len] = shape;
    } else {
      this._objects.push(shape);
    }
  };

};
ngMap.directives.MapController.$inject = ['$scope'];
