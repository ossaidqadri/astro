import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import * as cheerio from 'cheerio';
import { loadFixture } from './test-utils.js';

describe('Path alias with style tag', () => {
	let fixture;

	before(async () => {
		fixture = await loadFixture({
			root: './fixtures/alias-path-alias-style/',
		});
	});

	describe('build', () => {
		before(async () => {
			await fixture.build();
		});

		it('compiles styles when component is imported via path alias', async () => {
			const html = await fixture.readFile('/index.html');
			const $ = cheerio.load(html);

			// Should render the component
			assert.equal($('.styled').text(), 'Styled Component');

			// Should include the compiled styles
			// The style tag should be present in the output
			const styles = $('style').toArray();
			assert.ok(styles.length > 0, 'Expected styles to be compiled');
		});
	});
});
