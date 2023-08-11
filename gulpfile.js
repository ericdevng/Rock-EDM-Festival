const {src, dest, watch, parallel, series} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const webp = require("gulp-webp");
const autoprefixer = require("autoprefixer"); //compatibilidad con navegadores
const cssnano = require("cssnano");           //compresion de codigo
const postcss = require("gulp-postcss");      //mejoras despues de minificar css
const terser = require("gulp-terser-js");     //minificar js
//const imagemin = require("gulp-imagemin"); //checar error del imagemin
const cache = require("gulp-cache");
const sourcemaps = require("gulp-sourcemaps");
//const imagemin = require("gulp-imagemin");

function css(done){
    src("src/scss/**/*.scss")       //identificar el archivo sass
        .pipe(sourcemaps.init())
        .pipe(plumber())            //errores
        .pipe(sass())               //compilar
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"))    //guardar

    done();
}



function versionWebp(done){ //creacion de imagenes webp
    const opciones = {
        quality: 50 //calidad de imagen
    };
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"))

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.')) 
        .pipe( dest('build/js'))

    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);

    done(); 
}



exports.css = css;
exports.js = javascript;

exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev, javascript);//ejecuta la primera y luego la segunda