export default (time: string): boolean => {
  const match = time.match(/^([0-9]?[0-9]:)([0-5][0-9]:)([0-5][0-9])$/gm);

  return !!match;
};
