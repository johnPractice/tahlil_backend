// /
/**
 * 
 */


// edit profile

/**
 * @swagger
 * /user/update:
 *  put:
 *    description: edit info of user 
 *    consumes:
 *       - application/json
 *    tags: 
 *       - profile
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: token for check the auth(Bearer + " " + token )
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
 *           avatar:
 *            type: string
 *           avatarname:
 *            type: string
 *    responses:
 *      '200':
 *        description: user info updated :)
 *      '400':
 *        description: somthing wrong :(
 */

// avatar updated
/**
 * @swagger
 * /user/update/avatar:
 *  put:
 *    description: edit avatar of user 
 *    consumes:
 *       - application/json
 *    tags: 
 *       - profile
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: token for check the auth(Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *       - in: formData
 *         name: avatar
 *         type: file
 *         description: to add avatar image.
 *    responses:
 *      '200':
 *        description: user avatar atached :)
 *      '400':
 *        description: somthing wrong :(
 */

//get  avatar 
/**
 * @swagger
 * /user/avatar/:
 *  get:
 *    description: get avatar of user 
 *    consumes:
 *       - application/json
 *    tags: 
 *       - profile
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: token for check the auth(Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *    responses:
 *      '200':
 *        description: user avatar atached :)
 *      '400':
 *        description: somthing wrong :(
 */