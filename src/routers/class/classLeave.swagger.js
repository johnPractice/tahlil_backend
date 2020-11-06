/**
 * @swagger
 * /class/leave:
 *  post:
 *    description: Leaves a class
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
 *         description: to leave a class
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
 *        description: User left the class
 *        schema:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *              message:
 *                  type: string
 *
 */