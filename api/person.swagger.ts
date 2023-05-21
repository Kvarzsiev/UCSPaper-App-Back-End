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
              instituition: {
                type: 'string',
              },
              //   personProjects: {
              //     type: 'object',
              //     properties: {
              //       project: {
              //         type: 'object',
              //         properties: {

              //         },
              //       },
              //     },
              //   },
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
