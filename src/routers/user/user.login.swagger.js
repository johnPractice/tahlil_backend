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
 *        description: User logged in :)
 *        schema:
 *          type: object
 *          properties:
 *                  user:
 *                      type: object
 *                      properties:
 *                          firstname:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          avatar:
 *                              type: string
 *                          _id:
 *                              type: string
 *                          username:
 *                              type: string
 *                          email:
 *                              type: string
 *                  token:
 *                      type: string
 *      '400':
 *          description: Error
 *          schema:
 *              type: object
 *              properties:
 *                  err:
 *                   type: object
 */

// signup///////////////////////////////////////////////////////////////////
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
 *        description: New user is created
 *        schema:
 *          type: object
 *          properties:
 *                  user:
 *                      type: object
 *                      properties:
 *                          firstname:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          avatar:
 *                              type: string
 *                          _id:
 *                              type: string
 *                          username:
 *                              type: string
 *                          email:
 *                              type: string
 *                  token:
 *                      type: string
 *      '400':
 *          description: Error
 *          schema:
 *              type: object
 *              properties:
 *                  err:
 *                      type: object
 */