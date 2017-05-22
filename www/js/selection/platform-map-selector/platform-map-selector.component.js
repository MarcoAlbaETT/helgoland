angular.module('n52.core.profile')
    .component('platformMapSelector', {
        bindings: {
            mapId: '@',
            serviceUrl: '<',
            filter: '<',
            mapLayers: '<',
            cluster: '<',
            platformSelected: "&onPlatformSelected",
        },
        templateUrl: 'n52.core.selection.platform-map-selector',
        controller: ['seriesApiInterface', '$scope', 'leafletData',
            function(seriesApiInterface, $scope, leafletData) {

                this.markers = {};
                var clickHandler;

                var createLayer = () => {
                        this.mapLayers.overlays.platforms = {
                            name: 'markergroup',
                            type: this.cluster ? 'markercluster': 'featureGroup',
                            visible: true,
                            layerOptions: {
                                showOnSelector: false
                            }
                        };
                };

                var createEventListener = () => {
                    this.events = {
                        markers: {
                            enable: ['click'],
                        }
                    };
                    var eventNam = 'leafletDirectiveMarker.' + this.mapId + '.' + 'click';
                    clickHandler = $scope.$on(eventNam, (event, item) => {
                        seriesApiInterface.getPlatforms(item.modelName, this.serviceUrl)
                            .then(entry => {
                                this.platformSelected({
                                    platform: entry
                                });
                            });
                    });
                };

                this.$onInit = () => {
                    createEventListener();
                    createLayer();
                    setTimeout(() => {
                        leafletData.getMap(this.mapId).then((map) => {
                            map.invalidateSize();
                        });
                    }, 10);
                };

                this.$onDestroy = () => {
                    clickHandler();
                };

                this.$onChanges = () => {
                    this.loading = true;
                    var markers = {};
                    leafletData.getLayers(this.mapId).then((layers) => {
                        layers.overlays.platforms.clearLayers();
                    });
                    seriesApiInterface.getPlatforms(null, this.serviceUrl, this.filter)
                        .then((res) => {
                            res.forEach(entry => {
                                markers[entry.id] = {
                                    lat: entry.geometry.coordinates[1],
                                    lng: entry.geometry.coordinates[0],
                                    draggable: false,
                                    focus: true,
                                    layer: 'platforms'
                                };
                            });

                            this.markers = markers;

                            setTimeout(() => {
                                leafletData.getLayers(this.mapId).then((layers) => {
                                    var temp = layers.overlays.platforms.getBounds();
                                    layers.overlays.platforms._map.fitBounds(temp);
                                    this.loading = false;
                                });
                            }, 10);
                        });
                };
            }
        ]
    });
