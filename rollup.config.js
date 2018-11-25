//currently unused

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/index.js',
	output: {
		file: 'lib/index.js',
		format: 'umd',
		name: 'ButtonNice'
	},
	plugins: [
		babel({
			runtimeHelpers: true,
			exclude: 'node_modules/**',
			babelrc: true,
		}),
		resolve({
			module: false
		}),
		commonJS(),
		replace({
			ENV: JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		process.env.NODE_ENV === 'production' && uglify()
	]
};
