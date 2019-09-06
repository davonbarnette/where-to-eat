const plopTemplatesDir = 'plop-templates';
const modelTemplatesDir = plopTemplatesDir + '/data/model';
const specificComponentsDir = plopTemplatesDir + '/components/specific';

const createDataModelPrompts = {
    model: {type: 'input', name: 'modelName', message: 'Model Name (e.g. User Session):'}
};

const COMPONENT_TYPES = {
    COMMON: 'common',
    SPECIFIC: 'specific',
};

const COMPONENT_OPTIONS = {
    PAGE: {name:'Generate a dedicated Page for this component', value:'Page'},
    FORM: {name:'Generate a Form and a FormModal', value:'Form'},
    LIST: {name:'Generate a sidebar List (should be used when this component owns a discrete piece of data)', value:'List'},
    ROUTING: {name:'Add dedicated page to SPA Routing', value:'Routing'},
    MODEL: {name:'Add component as discrete data model', value:'Model'},
};

const createComponentPrompts = {
    name: {
        type: 'input',
        name: 'componentName',
        message: 'Component Name'
    },
    type: {
        type: 'list',
        name: 'componentType',
        message: 'Component Type',
        choices: [COMPONENT_TYPES.COMMON, COMPONENT_TYPES.SPECIFIC]
    },
    options: {
        type: 'checkbox',
        name: 'checkComponentOptions',
        message: 'Check any options to create a specific component',
        when: (data) => data[createComponentPrompts.type.name] === 'specific',
        choices: objectToArray(COMPONENT_OPTIONS),
    }
};

const createComponentActions = (data) => {
    let actions = [];
    let basePath = 'src/components';
    let baseTemplatePath = `${plopTemplatesDir}/components`;
    let pascalName = '{{pascalCase componentName}}';
    if (data[createComponentPrompts.type.name] === COMPONENT_TYPES.COMMON) {
        let path = `${basePath}/${COMPONENT_TYPES.COMMON}/${pascalName}/`;
        let templatePath = `${baseTemplatePath}/${COMPONENT_TYPES.COMMON}`;
        actions.push(
            {
                type: 'add', path: `${path}${pascalName}.tsx`,
                templateFile: `${templatePath}/${pascalName}.hbs`
            },
            {
                type: 'add', path: path + 'styles.scss',
                templateFile: `${templatePath}/styles.hbs`
            },
        );
    }
    else if (data[createComponentPrompts.type.name] === COMPONENT_TYPES.SPECIFIC) {
        let selectedOptions = data[createComponentPrompts.options.name];

        if (selectedOptions.indexOf(COMPONENT_OPTIONS.PAGE.value) !== -1) {
            let filesToCreate = ['ContentHeader.tsx', 'Page.tsx', 'Tabs.tsx', 'styles.scss'];
            actions.push(...createSpecificComponentActions(pascalName, COMPONENT_OPTIONS.PAGE.value, filesToCreate))
        }
        if (selectedOptions.indexOf(COMPONENT_OPTIONS.FORM.value) !== -1) {
            let filesToCreate = ['Form.tsx', 'FormModal.tsx', 'styles.scss'];
            actions.push(...createSpecificComponentActions(pascalName, COMPONENT_OPTIONS.FORM.value, filesToCreate))
        }
        if (selectedOptions.indexOf(COMPONENT_OPTIONS.LIST.value) !== -1) {
            let filesToCreate = ['List.tsx', 'ListItem.tsx', 'styles.scss'];
            actions.push(...createSpecificComponentActions(pascalName, COMPONENT_OPTIONS.LIST.value, filesToCreate))
        }
        if (selectedOptions.indexOf(COMPONENT_OPTIONS.ROUTING.value) !== -1) {
            actions.push(
                {
                    type: 'append',
                    path: 'src/data/Routers/BrowserRouter.ts',
                    pattern: /(\/\* Data Type Route Chunks \*\/)/,
                    templateFile: 'plop-templates/components/BrowserRouter/RouteChunks.hbs'
                },
                {
                    type: 'append',
                    path: 'src/data/Routers/BrowserRouter.ts',
                    pattern: /(\/\* Data Type Static Routes \*\/)/,
                    templateFile: 'plop-templates/components/BrowserRouter/StaticRoutes.hbs'
                },
                {
                    type: 'append',
                    path: 'src/components/specific/App/App.tsx',
                    pattern: /(\/\* Data Routes \*\/)/,
                    template: '<Route path={BrowserRoutes.{{camelCase componentName}}ByIdParam} component={ {{~pascalCase componentName}}Page}/>'
                },
                {
                    type: 'append',
                    path: 'src/components/specific/App/App.tsx',
                    pattern: /(\/\* App Imports \*\/)/,
                    template: 'import {{pascalCase componentName}}Page from "../{{pascalCase componentName}}/Page/Page"'
                },

            );
        }
    }
    return actions;
};

const createDataModelActions = (modelName) => {
    let filesToCreate = ['Actions.tsx', 'APIHandler.tsx', 'Consumer.tsx', 'Methods.tsx', 'Types.tsx', 'ValidationSchemas.tsx'];
    let actions = filesToCreate.map(file => {
        let fileName = removeExtension(file);
        return {
            type: 'add',
            path: `src/data/${modelName}/${file}`,
            templateFile: `${modelTemplatesDir}/${fileName}.hbs`
        }
    });
    return [...actions,
        {
            type: 'append',
            path: 'src/data/Routers/SocketRouting.ts',
            pattern: /(\/\* Socket Actions \*\/)/,
            templateFile: 'plop-templates/data/model/SocketRouting/Actions.hbs'
        },
        {
            type: 'append',
            path: 'src/data/Routers/SocketRouting.ts',
            pattern: /(\/\* Socket Callbacks \*\/)/,
            templateFile: 'plop-templates/data/model/SocketRouting/Callbacks.hbs'
        },
        {
            type: 'append',
            path: 'src/data/Routers/SocketRouting.ts',
            pattern: /(\/\* Consumer Imports \*\/)/,
            templateFile: 'plop-templates/data/model/SocketRouting/ConsumerImports.hbs'
        },
        {
            type: 'append',
            path: 'src/data/App/Store.ts',
            pattern: /(\/\* Data Types \*\/)/,
            template: '\t{{camelCase modelName}}: BaseMapManager<string, ExampleType> = new BaseMapManager("uuid");'
        },
        {
            type: 'append',
            path: 'src/data/App/Store.ts',
            pattern: /(\/\* Data Decorators \*\/)/,
            template: '\t{{camelCase modelName}}: observable,'
        },
    ]
};

const createSpecificComponentActions = (componentName, optionKey, filesToCreate) => {
    let path = `src/components/specific/${componentName}/${optionKey}`;
    return filesToCreate.map(file => {
        let fileName = removeExtension(file);
        return {
            type: 'add',
            path: `${path}/${file}`,
            templateFile: `${specificComponentsDir}/${optionKey}/${fileName}.hbs`
        }
    })
};

function objectToArray(object) {
    return Object.keys(object).map(key => {
        return object[key];
    })
}

function removeExtension(fileName){
    return fileName.split('.')[0];
}

module.exports = function (plop) {

    plop.setGenerator('Create Data Model', {
        description: 'Create a new folder that is owned by a discrete piece of data.',
        prompts: objectToArray(createDataModelPrompts),
        actions: createDataModelActions('{{pascalCase modelName}}'),
    });

    plop.setGenerator('Create Component', {
        description: 'Create a new component.',
        prompts: objectToArray(createComponentPrompts),
        actions: createComponentActions
    });
};
