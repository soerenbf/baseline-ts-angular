namespace baseline {
    /**
     * TestController
     */
    class TestController implements ng.IComponentController {
        constructor() {}
    }

    export let testComponent: ng.IComponentOptions = {
        controller: TestController,
        template: `
            <div>Test component!</div>
        `
    }
}

export var testComponent = baseline.testComponent;