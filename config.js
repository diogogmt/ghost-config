// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

var procEnv = process.env;
var convertToBool = function (val) {
    return val === 'true';
};

var mailgun = procEnv.GHOST_MAIL_PROVIDER != null && procEnv.GHOST_MAIL_PROVIDER.toLowerCase() === 'mailgun';
var mail = {};

var theme = {};
if (procEnv.GHOST_DISQUS_SHORTNAME) {
    theme.disqus = {};
    theme.discus.shortname = procEnv.GHOST_DISQUS_SHORTNAME;
}
if (procEnv.GHOST_GANALYTICS_TRACKING_ID) {
    theme.google = theme.google || {};
    theme.google.analytics = theme.google.analytics || {};
    theme.google.analytics.trackingId = procEnv.GHOST_GANALYTICS_TRACKING_ID;
}
if (procEnv.GHOST_GANALYTICS_DEFAULT_URL) {
    theme.google = theme.google || {};
    theme.google.analytics = theme.google.analytics || {};
    theme.google.analytics.defaultUrl = procEnv.GHOST_GANALYTICS_DEFAULT_URL;
}
if (procEnv.GHOST_GITHUB_URL) { theme.github = { url: procEnv.GHOST_GITHUB_URL }; }
if (procEnv.GHOST_LINKEDIN_URL) { theme.linkedin = { url: procEnv.GHOST_LINKEDIN_URL }; }
if (procEnv.GHOST_TWITTER_URL) { theme.twitter = { url: procEnv.GHOST_TWITTER_URL }; }
if (procEnv.GHOST_GOOGLE_PLUS_URL) {
    theme.google = theme.google || {};
    theme.google.plus = theme.google.plus || {};
    theme.google.plus = { url: procEnv.GHOST_GOOGLE_PLUS_URL };
}
if (procEnv.GHOST_YOUTUBE_URL) { theme.youtube = { url: procEnv.GHOST_YOUTUBE_URL }; }
if (procEnv.GHOST_CONTACT_URL) { theme.contact = { email: procEnv.GHOST_CONTACT_URL }; }

if (mailgun) {
    mail = {
        transport: 'SMTP',
        options: {
            service: 'Mailgun',
            auth: {
                user: procEnv.GHOST_MAIL_PROVIDER_USER,
                pass: procEnv.GHOST_MAIL_PROVIDER_PASSWORD
            }
        }
    }
}
var contentPath = procEnv.GHOST_CONTENT || path.join(__dirname, '/content/');
var commonConfig = {
    url: procEnv.GHOST_URL || 'http://my-ghost-blog.com',
    test: 'test123',
    mail: mail,
    database: {
        client: 'sqlite3',
        connection: {
            filename: path.join(contentPath, '/data/ghost.db')
        },
        debug: procEnv.GHOST_DEBUG != null ? convertToBool(procEnv.GHOST_DEBUG) : false
    },

    server: {
        // Host to be passed to node's `net.Server#listen()`
        host: procEnv.GHOST_HOST || '0.0.0.0',
        // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
        port: procEnv.GHOST_PORT || '2368'
    },
    paths: {
        contentPath: contentPath
    },
    theme: theme
};

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: commonConfig,

    // ### Development **(default)**
    development: commonConfig
};

// Export config
module.exports = config;
