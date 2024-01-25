import axios from 'axios';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import convertToXml from './xmlUtils';
import { productSchema, ApiResponse } from './types';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: '*',
  }),
);

const requestLogger = async (req: Request, _: Response, next: NextFunction) => {
  const loggingRequest = {
    type: 'messageIn',
    body: JSON.stringify(req.method === 'GET' ? req.query : req.body),
    method: req.method,
    path: req.originalUrl,
    dateTime: new Date().toISOString(),
  };
  console.log('Incoming Request:', loggingRequest);
  next();
};

const responseLogger = async (req: Request, res: Response) => {
  const err = res.locals.error;

  const loggingResponse = {
    type: 'messageOut',
    body: err ? null : res.locals.responseBody,
    dateTime: new Date().toISOString(),
    fault: err ? err.stack : null,
  };

 

  if (err && err.response) {
    const { status, statusText } = err.response;
    res.status(status).json({
      code: status,
      message: statusText,
    });
  } else {
    console.log('Outgoing Response:', loggingResponse);
  }
};

app.use(requestLogger);

app.get('/products', (req: Request, res: Response, next: NextFunction) => {
  const { query, page } = req.query;
  const pageNumber = Number(page);

  axios.get(`https://dummyjson.com/products/search?q=${query}&limit=2&skip=${String((pageNumber - 1) * 2)}`)
    .then((apiResp) => {
      const { data } = apiResp;

      const transformedData = data.products.map((product: ApiResponse) => {
        try {
          const validatedData = productSchema.parse({
            title: product.title,
            description: product.description,
            final_price: parseFloat(
              (product.price - (product.price * product.discountPercentage) / 100).toFixed(2),
            ),
          });

          return validatedData;
        } catch (error) {
          res.locals.error = error;
          next();
        }

        return transformedData;
      });

      res.locals.responseBody = transformedData;

      res.format({
        'application/json': () => {
          res.json(transformedData);
        },
        'application/xml': () => {
          const xmlResponse = convertToXml(transformedData);
          res.type('application/xml').send(xmlResponse);
        },
        default: () => {
          res.status(406).send({ code: 406, message: 'Not Acceptable' });
        },
      });

      next();
    })
    .catch((error) => {
      res.locals.error = error;
      next();
    });
});

app.use(responseLogger);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
