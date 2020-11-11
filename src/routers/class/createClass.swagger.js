/**
 * @swagger
 * /class/:
 *  post:
 *    description: Creates a class with random-generated classId
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
 *          properties:
 *           name:
 *            type: string
 *           description:
 *            type: string
 *
 *    responses:
 *      '200':
 *        description: Created the class
 *        schema:
 *          type: object
 *          properties:
 *              newClass:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      classId:
 *                          type: string
 *                      ownerFullname:
 *                          type: string
 *
 */