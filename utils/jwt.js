import jwt from 'jsonwebtoken';


const createJWT = ({id}) => {
  const token = jwt.sign({id}, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.SECRET_KEY);

export {
  isTokenValid,
  createJWT
};
