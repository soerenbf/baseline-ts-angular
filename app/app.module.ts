import 'angular';

import { testComponent } from './app.component';

namespace baseline {
    export var app = 'app';

    angular
        .module(app, [])
        .component('baselineTest', testComponent);
}

export var app = baseline.app;
