module.exports = {
    devServer: (devServerConfig) => {
        devServerConfig.headers = {
            'Referrer-Policy': 'no-referrer-when-downgrade',
        };
        return devServerConfig;
    },
};