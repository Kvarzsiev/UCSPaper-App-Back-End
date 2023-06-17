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
                title: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                sponsor: {
                  type: 'string',
                },
                startDate: {
                  type: 'date',
                },
                finishDate: {
                  type: 'date',
                },
                isFinished: {
                  type: 'boolean',
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
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              sponsor: {
                type: 'string',
              },
              startDate: {
                type: 'date',
              },
              finishDate: {
                type: 'date',
              },
              isFinished: {
                type: 'boolean',
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
                items: {
                  type: 'object',
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
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              sponsor: {
                type: 'string',
              },
              startDate: {
                type: 'date',
              },
              finishDate: {
                type: 'date',
              },
              isFinished: {
                type: 'boolean',
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
                items: {
                  type: 'object',
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
  },
  produces: ['application/json'],
  requestBody: {
    description: 'New project ',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            sponsor: {
              type: 'string',
            },
            startDate: {
              type: 'date',
            },
            finishDate: {
              type: 'date',
            },
            isFinished: {
              type: 'boolean',
            },
          },
        },
      },
    },
  },
};

export const putProject = {
  tags: ['Project'],
  produces: ['application/json'],
  responses: {
    '200': {
      description: 'Project.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              sponsor: {
                type: 'string',
              },
              startDate: {
                type: 'date',
              },
              finishDate: {
                type: 'date',
              },
              isFinished: {
                type: 'boolean',
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
                items: {
                  type: 'object',
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
  },
  requestBody: {
    description: 'Edit project',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            sponsor: {
              type: 'string',
            },
            startDate: {
              type: 'date',
            },
            finishDate: {
              type: 'date',
            },
            isFinished: {
              type: 'boolean',
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

export const deleteProject = {
  tags: ['Project'],
  produces: ['application/json'],
  response: {
    '200': {
      description: 'Project deleted',
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

export const removeProjectPersons = {
  tags: ['Project'],
  responses: {
    '200': {
      description: 'Persons to remove from project.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              sponsor: {
                type: 'string',
              },
              startDate: {
                type: 'date',
              },
              finishDate: {
                type: 'date',
              },
              isFinished: {
                type: 'boolean',
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
                      type: 'integer',
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
  },
  produces: ['application/json'],
  requestBody: {
    description: 'Edit project',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            personsIds: {
              type: 'array',
              items: {
                type: 'integer',
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

export const editProjectPersons = {
  tags: ['Project'],
  produces: ['application/json'],
  responses: {
    '200': {
      description: 'Edited project.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              sponsor: {
                type: 'string',
              },
              startDate: {
                type: 'date',
              },
              finishDate: {
                type: 'date',
              },
              isFinished: {
                type: 'boolean',
              },
              persons: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
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
  },
  requestBody: {
    description: 'Project persons to add',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            persons: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
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
