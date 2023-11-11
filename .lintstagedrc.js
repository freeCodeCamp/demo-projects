const { ESLint } = require('eslint');

const cli = new ESLint();
const completedStages = new Set();

module.exports = {
  '*.(js|jsx|ts|tsx)': async files => {
    if (completedStages.has('js')) return [];

    const ignoredIds = await Promise.all(
      files.map(file => cli.isPathIgnored(file))
    );
    const lintableFiles = files.filter((_, i) => !ignoredIds[i]);

    if (files.length > 10) {
      completedStages.add('js');
      return ['eslint --max-warnings=0 --cache --fix .', 'prettier --write .'];
    } else {
      return [
        `eslint --max-warnings=0 --cache --fix ${lintableFiles
          .map(file => `"${file}"`)
          .join(' ')}`,
        ...files.map(filename => `prettier --write "${filename}"`)
      ];
    }
  },
  '*.!(js|jsx|ts|tsx)': files => {
    if (completedStages.has('not-js')) return [];

    if (files.length > 10) {
      completedStages.add('not-js');
      return 'prettier --write .';
    } else {
      return files.map(
        filename => `prettier --write --ignore-unknown "${filename}"`
      );
    }
  }
};
