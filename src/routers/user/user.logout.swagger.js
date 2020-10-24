//JWT schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */


// logout
/**
 * @swagger
 * /user/logout:
 *  post:
 *    description: logout user at curent device
 *    consumes:
 *       - application/json
 *    security:
        - bearerAuth: []

 *    responses:
 *      '200':
 *        description: user loged out
 */

// logoutAll
/**
 * @swagger
 * /user/logoutall:
 *  post:
 *    description: logout user at all device
 *    consumes:
 *       - application/json
 *    security:
        - bearerAuth: []
 * 
 *    responses:
 *      '200':
 *        description: user loged out all device
 */