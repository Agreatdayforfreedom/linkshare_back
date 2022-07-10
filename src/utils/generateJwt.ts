import jwt from 'jsonwebtoken';

export default function (id: any): string {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET as string);
}
