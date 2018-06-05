# Pear Haven: A collaborative repository for academic notes

Created by Daniel Gacitua

## Minimum requirements

Installation steps described below are for Ubuntu 16.04:

- Node.js 8.x (or higher)

    ```
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs build-essential
    ```

## Install and usage instructions

- Download this repo as ZIP (either from Releases or `master` branch)
- Enter to the repos's directory and edit your project name, author and license in `package.json`
- Run `npm install` to install all NPM dependencies
- Run `npm run dev` to enable developer mode with browser live reload 
- Run `npm run build` to package your project as a static web application (the result will be available on `dist` folder on project's root directory)
- To install a production NPM package, run `npm install --save <mypackage>`
- To install a development NPM package, run `npm install --save-dev <mypackage>`

## License

GNU Affero Public License 3.0