/**
 * @swagger
 * /question/create:
 *  post:
 *    description: create question
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
 *         description: for create new question
 *         schema:
 *          type: object
 *          required:
 *            - type 
 *            - public 
 *            - question 
 *            - answer 
 *            - options 
 *            - hardness 
 *            - base 
 *            - course 
 *          properties:
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
 *        description: create new question
 *        schema:
 *          type: object
 *          properties:

 *        
 */