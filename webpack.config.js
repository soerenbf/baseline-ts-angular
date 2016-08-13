// var extensions = [
//     '.module.ts',
//     '.controller.ts',
//     '.component.ts',
//     '.directive.ts',
//     '.filter.ts',
//     '.pipe.ts',
//     '.service.ts',
//     '.factory.ts',
// ];

module.exports = {
    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};