const swagerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');



const swaggerOptions ={
    swaggerDefinition:{
        info: {
            title: "Hotel Management System",
            description:'test desctiption',
            version:'1.0.0',
            contact:{
                name:'test Name'
            },
            servers: ["http://localhost:8080"],
            basePath: "api/v1"
            
        }
    },
   
    apis: ["./routes.js"]
};
const swaggerDocs = swagerJsDoc(swaggerOptions);

    // app.use('api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    

// app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = {swaggerOptions, swaggerDocs}