export const TASK_CARDS_CONFIG = {
  params: {
    filter: {
      fields: {
        id: true,
        title: true,
        sortOrder: true,
        dueDate: true,
        columnId: true,
        statusId: true,
        userId: true,
        tags: true
      },
      include: [
        {
          relation: 'user',
          scope: {
            fields: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      ]
    }
  }
};
export const TASK_DETAILS_CONFIG = {
  params: {
    filter: {
      fields: {
        id: true,
        title: true,
        description: true,
        sortOrder: true,
        dueDate: true,
        url: true,
        urlDescription: true,
        createdAt: true,
        updatedAt: true,
        columnId: true,
        statusId: true,
        userId: true,
        tags: true
      },
      include: [
        {
          relation: 'user',
          scope: {
            fields: {
              id: true,
              name: true,
              email: false,
              isAdmin: false,
              avatar: true
            }
          }
        },
        {
          relation: 'ticks'
        },
        {
          relation: 'comments',
          scope: {
            include: [
              {
                relation: 'user',
                scope: {
                  fields: {
                    id: true,
                    name: true,
                    email: false,
                    isAdmin: false,
                    avatar: true
                  }
                }
              }
            ]
          }
        }
      ]
    }
  }
};
