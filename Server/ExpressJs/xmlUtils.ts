import xml2js from 'xml2js';
import { EndProduct } from './types';

const convertToXml = (data: EndProduct []): string => {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject({ products: data });
  return xml;
};

export default convertToXml;
