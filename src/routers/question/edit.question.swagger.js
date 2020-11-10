/**
 * @swagger
 * /question:
 *  put:
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
 *       - in: body
 *         name: question info
 *         description: for edit question
 *         schema:
 *          type: object
 *          required:
 *            - questionId 
 *          properties:
 *           questionId:
 *            type: string
 *           type:
 *            type: string
 *           public:
 *            type: string
 *           question:
 *            type: string
 *           answer:
 *            type: string
 *           options:
 *            type: string
 *           base:
 *            type: string
 *           hardness:
 *            type: string
 *           course:
 *            type: string
 *
 *    responses:
 *      '200':
 *        description: edit question question
 *      '400':
 *        description: Erro
 *        
 */