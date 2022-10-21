export function Configuration () {
  return {
  microservice: {
    host: process.env.MS_HOST,
    port: parseInt(process.env.MS_PORT),
  },
}};