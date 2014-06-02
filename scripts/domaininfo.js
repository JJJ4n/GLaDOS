'use strict';
var request = require('request');
var cheerio = require('cheerio');
var net = require('net');
var _ = require('underscore');
var debug = require('debug')('GLaDOS:script:domaininfo');
var Table = require('cli-table');

module.exports = function (irc) {
    var formatTitle, formatBlock, sprunge;

    formatTitle = function (str) {
        return '\n\n============================================\n' + str + '\n============================================\n';
    };

    formatBlock = function (block) {
        var table = new Table({
            chars: {
                'top': '',
                'top-mid': '',
                'top-left': '',
                'top-right': '',
                'bottom': '',
                'bottom-mid': '',
                'bottom-left': '',
                'bottom-right': '',
                'left': '',
                'left-mid': '',
                'mid': '',
                'mid-mid': '',
                'right': '',
                'right-mid': '',
                'middle': ' '
            },
            style: {
                'padding-left': 1,
                'padding-right': 1,
                head: [],
                border: []
            },
            colAligns: ['right', 'left']
        });
        block.forEach(function (row) {
            row[1] = row[1].replace(/__NEWLINE__/gmi, '\n').replace(/^\s+|\s+$/g, '');
            table.push(row);
        });
        return '\n' + table.toString();
    };

    sprunge = function (string, fn) {
        request.post({
            url: 'http://sprunge.us',
            form: {
                sprunge: string.trim()
            }
        }, function (error, response, body) {
            fn(error, body.trim());
        });
    };

    irc.command('domaininfo', function (event) {
        if (event.params.length > 0) {
            request({
                "uri": 'http://www.tcpiputils.com/inc/api.php?version=1.0&type=domaininfo&hostname=' + event.text + '&source=chromeext',
                "headers": {
                    "User-Agent": irc.config.userAgent
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var $ = cheerio.load(body.replace(/<br \/>/gmi, '__NEWLINE__')), string = '';
                    if ($('<div>').html(body).text() === 'No valid domain found!') {
                        event.channel.reply(event.user, 'No valid domain found!');
                    } else {
                        $('.result').each(function () {
                            var block = null;
                            $(this).find('tr').each(function (i) {
                                if ($(this).text().trim().length > 0) {
                                    if (i === 0) {
                                        if ($(this).text() !== 'Graphs') {
                                            string += formatTitle($(this).text());
                                        }
                                    } else {
                                        if ($(this).find('td').length > 1) {
                                            block = block || [];
                                            block.push([$(this).find('td').first().text(), $(this).find('td').last().text().trim()]);
                                        } else {
                                            if ($(this).find('td').attr('colspan') !== '2' || ($(this).find('td').attr('colspan') === '2' && $(this).find('td').attr('style') === "font-size: 80%;")) {
                                                string += '\n' + $(this).text();
                                            }
                                        }
                                    }
                                }
                            });
                            if (block) {
                                string += formatBlock(block);
                            }
                        });
                        sprunge(string, function (err, url) {
                            if (err) {
                                event.channel.reply(event.user, 'Gratz. You broke it. (' + error + ')');
                                debug('[domaininfo] %s', error);
                            } else {
                                event.channel.reply(event.user, url);
                            }
                        });
                    }
                } else {
                    event.channel.reply(event.user, 'Gratz. You broke it. (' + error + ')');
                    debug('[domaininfo] %s', error);
                }
            });
        } else {
            event.user.notice('Use: !domaininfo <domain>');
        }
    });
};