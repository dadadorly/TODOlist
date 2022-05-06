import Express from "express";

export function wrapHandler(fn: Function) {
  return async (req: Express.Request, res: Express.Response) => {
    try {
      const result = await fn(req, res);

      if (result === undefined) {
        return res.status(204).send();
      }

      res.status(200).json(result);
    } catch (er: any) {
      res.status(er.status || 500).json({
        status: er.status || 500,
        message: er.message,
        stack: process.env.NODE_ENV === "production" ? undefined : er.stack
      });
    }
  };
}
