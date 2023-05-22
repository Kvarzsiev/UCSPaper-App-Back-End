export const getProjects = {
  tags: ['Project'],
  responses: {
    '200': {
      description: 'List of projects.',
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
                instituition: {
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

export const getProject = {
  tags: ['Project'],
  responses: {
    '200': {
      description: 'Project.',
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

export const postProject = {
  tags: ['Project'],
  responses: {
    '201': {
      description: 'Create a new project',
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
  produces: ['application/json'],
  requestBody: {
    description: 'New project ',
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
            resultIds: {
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
