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
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  classId:
 *                      type: string
 *                  owner:
 *                      type: string
 *                  image:
 *                      type: string
 *
 */