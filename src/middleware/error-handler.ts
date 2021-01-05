import { Context } from 'koa';

// error handler
const errorHandler = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch(e) {
    ctx.status = e.status || 500;
    ctx.body = { error: e.message } ;
    ctx.app.emit('error', e, ctx);
  }
};

export default errorHandler;