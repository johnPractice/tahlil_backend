//delete

/**
 * @swagger
 * /user/delete:
 *  delete:
 *    description: Used for user deletion
 *    consumes:
 *       - application/json
 *    security:
        - bearerAuth: []
 *
 *    responses:
 *      '200':
 *        description: user is deleted :)
 *      '503':
 *        description: Database error :)
 *        content:
            application/json:
              schema:
                type: object
                description: error
 *      '400':
 *        description: Error :)
 *        content:
            application/json:
              schema:
                type: object
                description: error
 */