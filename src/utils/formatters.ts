export const format_results = (results:string[])=>{
    const result = results.map((result, index) => `<item index=${index}>\n<page_content>\n${result}\n</page_content></item>`).join('\n');
    return result;
   
}
export const format_results_full  = (results:string[])=>{
    return `<search_results>\n${format_results(results)}\n</search_results>`

}
