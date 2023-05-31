export const getResults = {
  tags: ['Result'],
  responses: {
    '200': {
      description: 'List of results.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                },
                result: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getResult = {
  tags: ['Result'],
  responses: {
    '200': {
      description: 'Result.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              description: {
                type: 'string',
              },
              sponsor: {
                type: 'string',
              },
              results: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    desciption: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  parameters: [
    {
      in: 'path',
      name: 'id',
      schema: {
        type: 'number',
      },
      required: true,
    },
  ],
};

export const postResult = {
  tags: ['Result'],
  responses: {
    '201': {
      description: 'Create a new result',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              description: {
                type: 'string',
              },
              projectId: {
                type: 'string',
              },
              members: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  produces: ['application/json'],
  requestBody: {
    description: 'New result ',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
            },
            projectId: {
              type: 'string',
            },
            members: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};
