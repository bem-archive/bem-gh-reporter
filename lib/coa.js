var Q = require('q'),
    PATH = require('path'),
    PACKAGE = require('../package.json');

module.exports = require('coa').Cmd()
    .name(PATH.basename(process.argv[1]))
    .title(PACKAGE.description)
    .helpful()
    .opt()
        .name('version').title('Show version')
        .short('v').long('version')
        .flag()
        .only()
        .act(function() {
            return PACKAGE.version;
        })
        .end()
    .completable()
    .act(function(opts, args) {

        var GH = require('octonode').client();
        return Q.ninvoke(GH.repo('bem/bem-tools'), 'issues')
            .then(function(issues) {

                issues.forEach(function(i) {
                    console.log('#%s %s (%s)\n%s\n',
                        i.number,
                        i.title,
                        i.assignee && i.assignee.login || 'none',
                        i.html_url);
                });

            });

    });
