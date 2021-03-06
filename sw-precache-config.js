module.exports = {
      stripPrefix: 'build/',
      staticFileGlobs: [
        'build/*.html',
        'build/manifest.json',
        'build/logo.png',
        'build/favicon.ico',
        'build/static/**/!(*map*)',
        'build/icons/**/!(*map*)'
      ],
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      swFilePath: 'build/service-worker.js',
    maximumFileSizeToCacheInBytes: 3145780
};