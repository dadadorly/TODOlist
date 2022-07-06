export const isUserLoggedIn = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("Unauthorizedx");
  } else {
    next();
  }
};
