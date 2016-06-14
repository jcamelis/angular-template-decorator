
INSTALL
```shell
bower install jcamelis/angular-template-decorator --save
```

Implementation example:

```html
<body ng-app="myModule">
    <my-directive></my-directive>

    <script type="text/ng-template" id="templates/myDecorator.html">
        <div class="my-decorator">
            <h3 class="my-decorator-title">This is A decorator</h3>
            {{template}}
        </div>
    </script>

    <script type="text/ng-template" id="templates/myTemplate.html">
        <div class="my-template">
            <h4 class="my-template-title">Original Template</h4>
            <ul class="my-template-list">
                <li class="my-template-list-item">Item 1</li>
                <li class="my-template-list-item">Item 2</li>
            </ul>
        </div>
    </script>
</body>
```

```javascript
angular.module('myModule', ['templateDecorator'])

    .run(function(templateDecorator) {
        templateDecorator.put('templates/myTemplate.html', 'templates/myDecorator.html');
    })

    .directive('myDirective', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/myTemplate.html'
        }
    });
```

```html
    <my-directive></my-directive>
```

will output

```html
    <my-directive>
        <div class="my-decorator">
            <h3 class="my-decorator-title">This is A decorator</h3>
            <div class="my-template">
                <h4 class="my-template-title">Original Template</h4>
                <ul class="my-template-list">
                    <li class="my-template-list-item">Item 1</li>
                    <li class="my-template-list-item">Item 2</li>
                </ul>
            </div>
        </div>
    </my-directive>
```