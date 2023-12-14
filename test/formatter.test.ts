import {format_results, format_results_full} from '../src/utils/formatters';

describe('format_results', ()=>{
    it('should format results', ()=>{
        const results = ['hello', 'world'];
        const formatted = format_results(results);
        expect(formatted).toBe('<item index=0>\n<page_content>\nhello\n</page_content></item>\n<item index=1>\n<page_content>\nworld\n</page_content></item>');
    });
}
);

describe('format_results_full', ()=>{
    it('should format results', ()=>{
        const results = ['hello', 'world'];
        const formatted = format_results_full(results);
        expect(formatted).toBe('<search_results>\n<item index=0>\n<page_content>\nhello\n</page_content></item>\n<item index=1>\n<page_content>\nworld\n</page_content></item>\n</search_results>');
    });
});