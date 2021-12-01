const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { promisify } = require("util");
const sizeOf = promisify(require("image-size"));

const UPLOADS = "./public/images/uploads";
const RESIZED = "./public/images/resized";
const META = "./public/images/meta.json";

const QUALITY = 80;
const WIDTHS = [768, 992, 1200, 1920, 3840];
// TODO: jpeg...png...webp...
// TODO: DO NOT UPSCALE ?

const purgeResized = (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    fs.unlinkSync(path.join(dir, file));
  }
};

const resizeDir = async (dir, destDir, sizes, quality) => {
  // Ignore hidden files.
  const fromFiles = fs.readdirSync(dir).filter((file) => file[0] !== ".");
  const meta = {};

  await Promise.all(
    fromFiles.map(async (file) => {
      const uri = `${dir}/${file}`;
      // Re-size multiple directories in one go.
      // const stats = fs.statSync(uri)
      // if (stats.isDirectory()) return resizeDir(uri, `${dest}/${file}`, sizes)

      meta[`/${uri.split("/").slice(2).join("/")}`] = await sizeOf(uri);

      return Promise.all(
        sizes.map((size) => resizeImg(uri, destDir, size, quality))
      );
    })
  );

  return fs.writeFile(META, JSON.stringify(meta), (err) => {
    //
  });
};

const resizeImg = (src, destDir, size, quality) => {
  const file = path.parse(src);
  const dest = `${destDir}/${file.name}-${size}${file.ext}`;

  return sharp(src).resize({ width: size }).jpeg({ quality }).toFile(dest);
};

const resize = async (imageDir, resizedDir, sizes, quality) => {
  await purgeResized(resizedDir);

  await resizeDir(imageDir, resizedDir, sizes, quality);
};

resize(UPLOADS, RESIZED, WIDTHS, QUALITY);
