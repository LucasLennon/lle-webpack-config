// see https://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  Authorization:{
    client_id:"cqmobileqa",
    type:"Bearer",
    external_path:'https://federate-qa.volvo.com/as/authorization.oauth2',
    response_type:"token",
    // 'device-agent':"web",
    // 'Accept-Language':'pt-BR'
    'device-agent':null,
    'Accept-Language':"application/json"
  },
  setup:{
    autoRefresh:false,
    hasMe:false,
    autoLogoffTime:1000,
    has_MultiServers:false,
  },
  http:{
    mock:{
      local:{
        api: 'https://localhost:3050/api/v2/',
        roots: 'https://localhost:3050/'
      },
      external:{
        api: 'https://json-server-example-rfhkucdpku.now.sh/api/v2/',
        roots: 'https://json-server-example-rfhkucdpku.now.sh/',
      },
      servers:{
        activated:0,
        options:[
          'json-server-example-rfhkucdpku.now.sh',
          '10.1.1.1',
          '10.1.1.2',
          '10.1.1.3',
        ]
      }
    },
    development:{
      has_MultiServers:false,
      local:{
        api: 'https://aftersales.eastus.cloudapp.azure.com/service/api/v1',
        roots: 'https://aftersales.eastus.cloudapp.azure.com/service/'
      },
      external:{
        api: 'https://cqmobile-qa.volvo.com/service/api/v1',
        roots: 'https://cqmobile-qa.volvo.com/service/'
      },
      testing:{
        api: 'https://localhost/service/api/v1/',
        roots: 'https://localhost/service',
      },
      servers:{
        activated:1,
        options:[
          'json-server-example-rfhkucdpku.now.sh',
          '10.1.1.1',
          '10.1.1.2',
          '10.1.1.3',
        ]
      }
    },
    production:{
      external:{
        api: 'https://cqmobile.volvo.com/service/api/v1/',
        roots: 'https://cqmobile.volvo.com/service',
      },
      servers:{
        activated:1,
        options:[
          'json-server-example-rfhkucdpku.now.sh',
          '10.1.1.1',
          '10.1.1.2',
          '10.1.1.3',
        ]
      }
    }
  },
  commonDirectories: {
    assetsRoot: path.resolve(__dirname, '../../'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  },
  development: {
    assetsPublicPath: './',
    // env: require('./dev.env'),
    port: 443,
    autoOpenBrowser: true,
    proxyTable:{},
    cssSourceMap: false
  },
  production: {
    assetsPublicPath: '/',
    // env: require('./prod.env'),
    index: path.resolve(__dirname, '../../dist/index.html'),
    output: path.resolve(__dirname, '../../dist'),
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }
}
