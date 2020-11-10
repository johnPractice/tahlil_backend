/**
 * @swagger
 * /class/join:
 *  post:
 *    description: Joins a class
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
 *       - in: body
 *         name: class info
 *         description: to join a class
 *         schema:
 *          type: object
 *          required:
 *            - classId 
 *          properties:
 *           classId:
 *            type: string
 *
 *    responses:
 *      '200':
 *        description: User joined the class
 *      '400':
 *        description: error detail in response
 *        schema:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *        
 */