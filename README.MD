

Implementation example:

```html
<body ng-app="myModule">
    <my-directive></my-directive>

    <script type="text/ng-template" id="templates/myDecorator.html">
        <div>
            <h3>This is A decorator</h3>
            {{template}}
        </div>
    </script>

    <script type="text/ng-template" id="templates/myTemplate.html">
        <div>
            <h4>Original Template</h4>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
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
    })
```

```html
    <my-directive></my-directive>
```

will output

```html
    <my-directive>
        <div>
            <h3>This is A decorator</h3>
            <div>
                <h4>Original Template</h4>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
            </div>
        </div>
    </my-directive>
```