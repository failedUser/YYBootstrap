//包装函数
module.exports = function(grunt)
{
	//任务配置，所有插件的配置信息
	grunt.initConfig({
		//获取插件的配置信息
		pkg: grunt.file.readJSON('package.json'),
// 运行成功
    uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
            },
            builda: {//任务一：压缩a.js，不混淆变量名，保留注释，添加banner和footer
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                    footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
                },
                files: {
                    'output/js/a.min.js': ['src/JS/myjs/yueyin.js']
                }
            }
          },
//这个地址配置有些问题。不能通用配置js文件，已有的文件是可以检测出来问题
    jshint:{
     all: ['src/JS/myjs/*.js'],
      options:{
        jshintrc:'.jshintrc'
      }
    },


// 运行成功
    watch:{
      build:{
        files:['src/JS/*.js','src/CSS/*.css','src/CSS/PageCSS/.css'],
        tasks:['jshint','uglify'],
        options:{ spawn:false}
      }
    },

     concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['', '', ''],
        dest: ''
      }
    },
    clean: {
    build: {
    src: ['']
      }
},

copy: {
  main: {
    flatten: true,
    src: '',
    dest: ''
  }
},

postcss: {
            options: {
                map: true,
                processors: [
                     require('autoprefixer')({browsers: ['last 1 version']}),
                     require('cssnext')(),
                     require('precss')()
                ]
            },
            dist: {
                src: "src/CSS/dest.css",
                dest:'dest/dest.css'
            }
        }

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-postcss');
	//告诉grunt当我们在终端输入grunt时需要做些什么（注意先后顺序）
	grunt.registerTask('default',['uglify','jshint','postcss']);
};
