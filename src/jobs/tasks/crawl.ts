import { load as cheerioLoad } from 'cheerio';

export const crawlIBAN = (html: string) => {
  const data = [];

  const $ = cheerioLoad(html);

  const statsTable = $('.table.table-bordered.table-hover.downloads > tbody > tr');

  statsTable.each(function () {
    let title = $(this).find('td').text();

    data.push(title);
  });

  return data;
};
