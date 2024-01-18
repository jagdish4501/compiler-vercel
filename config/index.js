const dev = process.env.NODE_ENV !== 'production';

// DEV - 1: localhost
// export const server = dev ? 'http://localhost:3000' : 'http://localhost:3000';

// DEV - 2: chotu ec2
// export const server = dev ? 'http://localhost:3000' : 'http://13.232.91.82:3000';

// PROD: bada ec2
export const server = dev ? 'http://localhost:3000' : 'https://labs.thecodehelp.in';
