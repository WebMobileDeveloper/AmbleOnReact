export const DEV_ENV = true;
export const DEV_HOST_ADDRESS = 'http://localhost:3000';
export const PROD_HOST_ADDRESS = 'http://ec2-3-14-143-176.us-east-2.compute.amazonaws.com:3000';
export const HOST_ADDRESS = DEV_ENV ? DEV_HOST_ADDRESS : PROD_HOST_ADDRESS;