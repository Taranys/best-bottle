'use strict';

directives.directive('image', function ($timeout) {
    var imageMagic = {
        template: '<div>' +
            '<input id="addPictureByClick" type="file" style="display: none">' +
            '<canvas id="canvas" style="display: none"></canvas>' +
            '<img id="drop_zone" class="img-thumbnail" style="margin-bottom: 20px" ng-src="{{ getPicture() }}">' +
            '</div>',
        replace: true,
        transclude: false,
        restrict: 'A',
        scope: {
            "pictureContent": "=",
            "contentType": "=",
            "imageWidth": "="
        },
        link: function postLink($scope) {
            //return base64 picture
            $scope.getPicture = function () {
                if ($scope.contentType && $scope.pictureContent)
                    return "data:" + $scope.contentType + ";base64," + $scope.pictureContent;
                else
                    return "";
            };

            //manage dreag over the img field
            $scope.handleDragOver = function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
            };

            //handle file selection and drop
            $scope.handleFileSelect = function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                var files = [];
                if (evt.dataTransfer) {
                    files = evt.dataTransfer.files;
                } else if (evt.target) {
                    files = evt.target.files;
                }

                for (var i = 0, f; f = files[i]; i++) {
                    // Only process image files.
                    if (!f.type.match('image.*')) {
                        continue;
                    }

                    var reader = new FileReader();
                    //on image load, add image to beer model
                    reader.onload = function (e) {
                        $scope.$apply(function () {
                            //retrieve data
                            var base64 = e.target.result;

                            //reduce image size to 200 width
                            var image = new Image();
                            image.src = base64;

                            $timeout(function () {
                                var canvas = document.getElementById('canvas');
                                var context = canvas.getContext("2d");
                                var factor = $scope.imageWidth / image.width;
                                canvas.width = image.width * factor;
                                canvas.height = image.height * factor;
                                context.drawImage(image, image.x, image.y, image.width, image.height, 0, 0, canvas.width, canvas.height);

                                var result = canvas.toDataURL().split(',');
                                var contentType = result[0];
                                contentType = contentType.split(";")[0].split(":")[1];

                                $scope.contentType = contentType;
                                $scope.pictureContent = result[1];
                            }, 100);
                        });
                    };
                    reader.readAsDataURL(f);
                    return;
                }
            };

            //when click on picture, activate hidden file input
            $scope.activeFileButton = function () {
                document.getElementById('addPictureByClick').click();
            };

            // Setup the dnd listeners.
            var dropZone = document.getElementById('drop_zone');
            dropZone.addEventListener('dragover', $scope.handleDragOver, false);
            dropZone.addEventListener('drop', $scope.handleFileSelect, false);
            dropZone.addEventListener('click', $scope.activeFileButton, false);

            document.getElementById('addPictureByClick').addEventListener('change', $scope.handleFileSelect, false);
        }
    };

    return imageMagic;
});