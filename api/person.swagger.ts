export const getPersons = {
  tags: ['Person'],
  responses: {
    '200': {
      description: 'List of persons.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                institution: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getPerson = {
  tags: ['Person'],
  responses: {
    '200': {
      description: 'Person.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              institution: {
                type: 'string',
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

export const postPerson = {
  tags: ['Person'],
  produces: ['application/json'],
  responses: {
    '201': {
      description: 'Create a new person',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              institution: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
  requestBody: {
    description: 'New person',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            institution: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
