// logout
/**
 * @swagger
 * /user/logout:
 *  post:
 *    description: logout user at curent device
 *    consumes:
 *       - application/json
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: token for check the auth
 *         schema:
 *          type: string
 *         required: true
 * 
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
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: token for check the auth
 *         schema:
 *          type: string
 *         required: true
 * 
 *    responses:
 *      '200':
 *        description: user loged out all device
 */