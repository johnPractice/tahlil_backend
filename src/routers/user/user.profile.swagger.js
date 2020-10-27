//get profile
/**
 * @swagger
 * /user/:
 *  get:
 *    description: Gets user profile (user is identified by token)
 *    consumes:
 *       - application/json
 *    tags:
 *       - profile
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
 *        description: User profile is sent :)
 *        name: User
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
 *                  
 *      '400':
 *        description: Something wrong :(
 */


// edit profile///////////////////////////////////////////////////////////

/**
 * @swagger
 * /user/update:
 *  put:
 *    description: Edits user info 
 *    consumes:
 *       - application/json
 *    tags: 
 *       - profile
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *       - in: body
 *         name: userUpdate
 *         description: to edit user info.
 *         schema:
 *          type: object
 *          required:
 *            - username 
 *            - password 
 *            - firstname 
 *            - lastname 
 *            - email 
 *            - avatar 
 *            - avatarname 
 *          properties:
 *           username:
 *            type: string
 *           password:
 *            type: string
 *           firstname:
 *            type: string
 *           lastname:
 *            type: string
 *           email:
 *            type: string
 *            
 *    responses:
 *      '200':
 *        description: User info updated :)
 *        schema:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              user:
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
 *      '400':
 *        description: Something wrong :(
 *        schema:
 *          type: object
 *          properties:
 *              e:
 *                  type:object
 *              error:
 *                  type: string
 */

// avatar updated////////////////////////////////////////////////////
/**
 * @swagger
 * /user/update/avatar:
 *  put:
 *    description: Edits user avatar
 *    consumes:
 *       - application/json
 *    tags: 
 *       - profile
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *       - in: formData
 *         name: avatar
 *         type: file
 *         description: to add avatar image.
 *         
 *    responses:
 *      '200':
 *        description: User avatar attached :)
 *        schema:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *              user:
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
 *      '400':
 *        description: Something wrong :(
 *        schema:
 *          type: object
 *          properties:
 *              e:
 *                  type:object
 *              error:
 *                  type: string
 */

//get  avatar ////////////////////////////////////////////////////////
/**
 * @swagger
 * /user/avatar/:
 *  get:
 *    description: Get user avatar
 *    consumes:
 *       - application/json
 *    tags: 
 *       - profile
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *    responses:
 *      '200':
 *        description: User avatar attached :)
 *        schema:
 *          type: object
 *          properties:
 *              avatar:
 *                  type: string
 *      '400':
 *        description: Something wrong :(
 *        name: e
 *        schema:
 *          type: object
 *      '401':
 *        description: There is no image :(
 *        schema:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 */