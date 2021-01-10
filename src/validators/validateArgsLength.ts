export default (args: string[], numArgs: number): void => {
  if (args.length > numArgs || args.length < numArgs)
    throw new Error('bad arguments lenght');
};
