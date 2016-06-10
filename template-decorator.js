angular.module('templateDecorator', [])

    .config(['$provide', 'templateDecoratorProvider', function($provide, templateDecoratorProvider) {

        $provide.decorator('$templateRequest', ['$delegate', function $templateCacheDecorator($originalTemplateRequest) {
            /**
             * @name $templateRequestDecorator
             *
             * @description Decorator for $templateRequest
             *
             * @param {string|TrustedResourceUrl} tpl The HTTP request template URL
             * @param {boolean=} ignoreRequestError Whether or not to ignore the exception when the request fails or the template is empty
             **/
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
        /**
         * @type {Object.<String, String>}
         */
        var decorators = {};
        /**
         * @param  {String} templateUrl
         * @param  {String} decoratorTemplateUrl
         * @returns {void}
         */
        function put(templateUrl, decoratorTemplateUrl) {
            if (templateUrl !== decoratorTemplateUrl && angular.isString(templateUrl) && angular.isString(decoratorTemplateUrl)) {
                decorators[templateUrl] = decoratorTemplateUrl;
            }
        };

        this.put = put;

        /**
         * @param  {String} templateUrl
         */
        function get(templateUrl) {
            return decorators[templateUrl];
        };

        this.get = get;

        /**
         * @returns {Object}
         */
        this.$get = function () {
            return {
                get: get,
                put: put
            }
        };
    })