angular.module('templateDecorator', [])

    .config(['$provide', 'templateDecoratorProvider', function($provide, templateDecoratorProvider) {

        $provide.decorator('$templateRequest', ['$delegate', function $templateCacheDecorator($originalTemplateRequest) {

            function $templateRequestDecorator(templateUrl, ignoreRequestError) {

                if (templateDecoratorProvider.get(templateUrl)) {

                    return $originalTemplateRequest(templateUrl, ignoreRequestError)
                        .then(function (template) {

                            return $templateRequestDecorator(templateDecoratorProvider.get(templateUrl), ignoreRequestError)
                                .then(function (decoratorTemplate) {

                                    return (decoratorTemplate || '').replace('{{template}}', template);
                                })
                        });
                } else {
                    return $originalTemplateRequest(templateUrl, ignoreRequestError);
                }
            }

            return $templateRequestDecorator;
        }]);

    }])

    .provider('templateDecorator', function () {
        var decorators = {};

        function put(templateUrl, decoratorTemplateUrl) {
            if (templateUrl !== decoratorTemplateUrl) {
                decorators[templateUrl] = decoratorTemplateUrl;
            }
        };

        this.put = put;

        function get(templateUrl) {
            return decorators[templateUrl];
        };

        this.get = get;

        this.$get = function () {
            return {
                get: get,
                put: put
            }
        };
    })