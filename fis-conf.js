var PROJECT_NAME = 'dika';

fis.config.merge({
    projectname: PROJECT_NAME,

    project: {
        //include: ["common/**", "app/phoenix/**", "test/**"]
        include: ["src/*"]
    },

    roadmap: {
        //domain: ['http://wx.haodehaode.cn/static']
        //domain: ['http://message.haodehaode.cn/static']
        domain: ["www.dika.com"]
    },

    modules: {
        // 自动css sprites插件
        spriter: 'csssprites',
        parser: {
            //utc：underscore自带模板语言
            tmpl: 'utc',
            //less：css方言
            less: 'less',
            scss: 'sass',
            jsx: 'react'
        },
        postprocessor: {
            js: 'jswrapper, require-async'
        },
        postpackager: ['autoload','simple']
    },

    settings: {
        // optimizer : {
        //     'png-compressor' : {
        //         type : 'pngquant' //default is pngcrush
        //     }
        // },
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        postpackager: {
            //用于配合amd规范进行require文件的自动合并
            autoload: {
                //使用静态资源地图，便于支持require.async进行异步组件加载
                useSiteMap: false,
                useInlineMap: false,
                //资源资源地图放置位置
                subpath: 'pkg/asyncmap.js',
                //自动加载script依赖的占位标识符
                scriptTag: '<!-- SCIRPT_AUTOLOAD -->',
                //自动加载css依赖的占位标识符
                styleTag: '<!-- STYLE_AUTOLOAD -->',
                //资源表占位标识符
                resourceMapTag: '<!-- MAP_AUTOLOAD -->'
            },
            //用于进行零散文件依据pack配置进行打包替换
            simple: {
                //不开启自动的零散资源合并
                //所有资源严格进行手动整合
                autoCombine: true
            }
        },
        spriter: {
            csssprites: {
                margin: 30
            }
        },
    }
});

fis.config.merge({

    deploy: {
        //卢景锋阿里云测试环境部署
        lujingfeng: [{
            receiver: 'http://101.200.173.14:8999/receiver',
            //从产出的结果的static目录下找文件
            from: '/resource/',
            //保存到远端机器
            to: '/data/apache-tomcat-6.0.44wx/webapps/ROOT/static',
            replace: {
                from: "http://weixin.haodehaode.cn/static",
                to: "http://wx.haodehaode.cn/static"
            }
        }, {
            receiver: 'http://101.200.173.14:8999/receiver',
            //从产出的结果的static目录下找文件
            from: '/templates/screen/',
            //保存到远端机器
            to: '/data/apache-tomcat-6.0.44wx/webapps/ROOT/user/templates/',
            replace: {
                from: "http://weixin.haodehaode.cn/static",
                to: "http://wx.haodehaode.cn/static"
            }
        }],

        local: [{
            from: '/',
            to: '/Users/lujingfeng/dika/'
        }],

        //线上打包
        onlinepack: [{
            from: '/',
            to: '/var/lib/jenkins/jobs/hdhd-gclient/workspace/target/'
        }],

        //线上测试环境（已废弃）
        online_test: [{
            from: '/',
            to: '../../build_fe/'+ Date.now(),
            replace: {
                from : /haodehaode\.cn\/static\/resource\/app|haodehaode\.cn\/static\/resource\/common/gi,
                to : function(m){
                    if(m === 'haodehaode.cn/static/resource/app') return 'haodehaode.cn/static/resource/test';
                    if(m === 'haodehaode.cn/static/resource/common') return 'haodehaode.cn/static/resource/common_test';
                }
            }
        }]
    },

    roadmap: {
        ext: {
            //less输出为css文件
            less: 'css',
            scss: 'css',
            jsx: 'js'
        }
    }
});

//设置jshint插件要排除检查的文件，默认不检查lib、jquery、backbone、underscore等文件
//使用spmx release命令时，添加--lint或-l参数即可生效
//fis.config.set('settings.lint.jshint.ignored', [ 'lib/**', /jquery|backbone|underscore/i ]);


var path = [{
    reg: /(\.inline\.less|readme.txt|build.*|(fis-conf|fis-conf2)\.js|\/conf\/.*.js)$/,
    release: false
}, {
    reg: /^\/src\/(common)\/.*\.(less|css)$/,
    useSprite: true,
    release: '/resource/$&'
}, {
    reg: /^\/src\/common\/libs\/(mod|convertor)\.js$/,
    isMod: false,
    useHash: false,
    useOptimizer: false,
    release: '/resource/$&'
}, {
    reg: /^\/src\/common\/libs\/.*\.js$/,
    useHash: false,
    isMod: true,
    useOptimizer: false,
    release: '/resource/$&'
}, {
    reg: /^\/src\/common\/.*\.(js|jsx)$/,
    useHash: false,
    isMod: true,
    release: '/resource/$&'
}, {
    reg: /^\/src\/(pagelet|static|model)\/.*\.(js|jsx|html)$/,
    isMod: true,
    release: '/resource/$&'
}, {
    reg: /^\/src\/page\/(.*)\.(vm|html)$/,
    isHtmlLike: true,
    release: '/template/$1'
}, {
    reg: /^\/src\/(page|pagelet|common|static).*\.(jpg|png|gif|ico|amr|eot|svg|ttf|woff)$/,
    release: '/resource/$&'
}];

fis.config.set('roadmap.path', path);