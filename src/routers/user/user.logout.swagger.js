// logout
/**
 * @swagger
 * /user/logout:
 *  post:
 *    description: logs out user from current device
 *    consumes:
 *       - application/json
 *    tags: 
 *       - logout
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 * 
 *    responses:
 *      '200':
 *        description: User logged out from current device
 */

// logoutAll

/**
 * @swagger
 * /user/logoutall:
 *  post:
 *    description: logs out user from all devices
 *    consumes:
 *       - application/json
 *    tags: 
 *       - logout
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 * 
 *    responses:
 *      '200':
 *        description: User logged out from all devices
 */