import { setupWorker, rest } from 'msw';

let counter = 0;

const worker = setupWorker(
  rest.get('/user/:userId', async (req, res, ctx) => {
    const id = counter;
    const content = {
        firstName: 'John',
        lastName: 'Maverick',
        id,
    };
    counter += 1;

    await new Promise((r) => {
        let delay = 0;

        switch(id) {
          case 0: {
            break;
          }

          case 2: {
            delay = 3000;
            break;
          }

          case 3: {
            delay = 2000;
            break;
          }

          default: {
            delay = 1000;
          }
        }

        setTimeout(() => r(''), delay)
    })

    return res(
      ctx.json(content),
    )
  }),
);

export default worker;
