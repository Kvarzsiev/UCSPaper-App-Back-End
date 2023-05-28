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

export const putProject = {
  tags: ['Project'],
  reponses: {
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
              persons: {
                type: 'array',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  institution: { type: 'string' },
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
    description: 'Edit project',
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
            persons: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  role: {
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
