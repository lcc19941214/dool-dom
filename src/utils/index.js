import typeCheck from './typeCheck';
import chore from './chore';
import tools from './tools';

export default {
  ...chore,
  ...typeCheck,
  ...tools
};
