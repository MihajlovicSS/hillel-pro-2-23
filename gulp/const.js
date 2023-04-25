module.exports.path = {
    destination: './dist',
    srcHtml: './src/index.html',
    appJs: 'app.js',
    vendorJs: 'vendor.js',
    vendorSrc: "./node_modules/jquery/dist/jquery.min.js",
    allJsFilesTemp: './src/**/*.js',
    allCssFilesTemp: './src/**/*.css',
    cssDest: 'style.css',
    jsSrc: [
        "./src/model/ContactAPI.js",
        "./src/model/ContactList.js",
        "./src/view/ContactFormView.js",
        "./src/view/ContactTableView.js",
        "./src/Controller.js",
        "./src/index.js"
    ]
}