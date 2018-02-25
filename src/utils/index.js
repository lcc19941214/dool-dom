import typeCheck from './typeCheck';
import chore from './chore';
import tools from './tools';
import alias from './alias';

export default {
  ...chore,
  ...typeCheck,
  ...tools,
  ...alias
};
