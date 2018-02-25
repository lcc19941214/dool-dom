const alias = {
  def: (o, p, attr) => {
    Object.defineProperty(o, p, attr);
  },

  defs: (o, properties) => {
    Object.defineProperties(o, properties);
  }
};

export default alias;
