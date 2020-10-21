// login


// signup
/**
 * @swagger
 * /user/signup:
 *  post:
 *    description: Use to signup user
 *    consumes:
 *       - application/json
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