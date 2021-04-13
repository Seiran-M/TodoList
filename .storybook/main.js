module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: [/\.stories\.tsx?$/],
                },
                loaderOptions: {
                    prettierConfig: {
                        tabWidth: 2,
                        bracketSpacing: true,
                        trailingComma: 'es5',
                        singleQuote: true,
                        printWidth: 80,
                        options: {
                            parser: 'typescript',
                            injectDecorator: false
                        }
                    },
                },
            },
        },
    ],
}
