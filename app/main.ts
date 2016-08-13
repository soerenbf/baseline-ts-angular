import 'angular';

import { app } from './app.module';

(function() {
    let dependencies: string[] = [
        app
    ];

    angular.element(document).ready(function() {
        angular.bootstrap(document, dependencies);
    });
})();

