/**
 * @swagger
 * /class/{classId}:
 *  put:
 *    description: edits a class
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
 *       - in: path
 *         name: classId
 *         description: to edit a class
 *         schema:
 *          type: string
 *         required: true
 *       - in: body
 *         name: class info
 *         description: to edit a class
 *         schema:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              classId:
 *                  type: string
 *              password:
 *                  type: string
 *
 *    responses:
 *      '200':
 *        description: User edited the class
 *        schema:
 *          type: object
 *          properties:
 *              editedClass:
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
 *      '400':
 *          description: error in classid or request body or something else!
 *          schema:
 *            type: object
 *            properties:
 *                error:
 *                    type: string
 *      '403':
 *          description: user is not the class owner 
 *          schema:
 *            type: object
 *            properties:
 *                error:
 *                    type: string
 *
 */