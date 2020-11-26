/**
 * @swagger
 * /user/classes:
 *  get:
 *    description: get users classes
 *    consumes:
 *       - application/json
 *    tags:
 *       - class
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
 *        description: the array of class objects in the response
 *        schema:
 *          type: object
 *          properties:
 *              classes:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          classId:
 *                              type: string
 *                          ownerFullname:
 *                              type: string
 *                          isOwned:
 *                              type: boolean
 *                          
 *      '400':
 *          description: error
 *
 */