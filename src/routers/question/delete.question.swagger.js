/**
 * @swagger
 * /question/{questionId}:
 *  delete:
 *    description: edit question
 *    consumes:
 *       - application/json
 *    tags: 
 *       - question
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *       - in: path
 *         name: questionId
 *         description: to edit a question
 *         schema:
 *          type: string
 *         required: true
 * 
 *    responses:
 *      '200':
 *        description: delete question 
 *      '400':
 *        description: Erro
 *        
 */