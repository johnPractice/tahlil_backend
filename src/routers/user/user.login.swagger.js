// login
/**
 * @swagger
 * /user/login:
 *  post:
 *    description: Use to login user
 *    consumes:
 *       - application/json
 *    tags: 
 *       - login
 *    parameters:
 *       - in: body
 *         name: user
 *         description: to login user.
 *         schema:
 *          type: object
 *          required:
 *            - username 
 *            - password 
 *          properties:
 *           username:
 *            type: string
 *           password:
 *            type: string
 * 
 *    responses:
 *      '200':
 *        description: user loged in :)
 */

// signup
/**
 * @swagger
 * /user/signup:
 *  post:
 *    description: Use to signup user
 *    consumes:
 *       - application/json
 *    tags: 
 *       - login
 *    parameters:
 *       - in: body
 *         name: createUser
 *         description: The user to create.
 *         schema:
 *          type: object
 *          required:
 *            - username 
 *            - firstname 
 *            - lastname 
 *            - password 
 *            - email 
 *          properties:
 *           username:
 *            type: string
 *           firstname:
 *            type: string
 *           lastname:
 *            type: string
 *           password:
 *            type: string
 *           email:
 *            type: string
 * 
 *    responses:
 *      '201':
 *        description: created user
 */