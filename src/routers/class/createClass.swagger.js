/**
 * @swagger
 * /class/:
 *  post:
 *    description: Creates a class
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
 *         description: to create a class
 *         schema:
 *          type: object
 *          required:
 *            - name
 *            - classId
 *            - password
 *          properties:
 *           name:
 *            type: string
 *           classId:
 *            type: string
 *           password:
 *            type: string
 *           description:
 *            type: string
 *           image:
 *            type: string
 *
 *    responses:
 *      '200':
 *        description: Created the class
 *        schema:
 *          type: object
 *          properties:
 *              info:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      description:
 *                          type: string
 *                      classId:
 *                          type: string
 *                      owner:
 *                          type: string
 *                      image:
 *                          type: string
 *              message:
 *                  type: string
 *
 */