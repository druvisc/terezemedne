const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const urlSlug = require("url-slug");

const UPLOADS = "/images/uploads";
const RESIZED = "/images/resized";
const IMAGE_ATTRIBUTES = "./public/images/attributes.json";

const WIDTHS = [768, 992, 1200, 1920, 3840];

const PARSED_EXT = ".jpg";

const purgeResized = (dir) => {
  const files = fs.readdirSync(`./public${dir}`);

  for (const file of files) {
    fs.unlinkSync(path.join(`./public${dir}`, file));
  }
};

const resizeDir = async (dir, destDir, sizes) => {
  // Ignore hidden files.
  const images = fs
    .readdirSync(`./public${dir}`)
    .filter((image) => image[0] !== ".");
  const imageAttributes = {};

  await Promise.all(
    images.map(async (image) => {
      const uri = `./public${dir}/${image}`;

      const stats = fs.statSync(uri);
      if (stats.isDirectory())
        return resizeDir(`${dir}/${image}`, `${destDir}/${image}`, sizes);

      const parsed = path.parse(uri);
      const imageNameSplit = parsed.name.split("/");
      const slugName = urlSlug(imageNameSplit[imageNameSplit.length - 1]);

      // See config.yml "public_folder".
      const publicUri = uri.replace("./public", "");

      const { width, height } = await sharp(uri).metadata();

      imageAttributes[publicUri] = {
        width,
        height,
        srcSet: WIDTHS.map(
          (width) => `${destDir}${slugName}-${width}${PARSED_EXT} ${width}w`
        ).join(", "),
        src: `${destDir}${slugName}-${WIDTHS[WIDTHS.length - 1]}${PARSED_EXT}`,
      };

      return Promise.all(
        sizes.map((size) =>
          sharp(uri)
            .resize(size)
            .jpeg()
            .toFile(`./public${destDir}${slugName}-${size}${PARSED_EXT}`)
        )
      );
    })
  );

  return fs.writeFile(
    IMAGE_ATTRIBUTES,
    JSON.stringify(imageAttributes),
    (err) => {
      //
    }
  );
};

const resize = async (imageDir, resizedDir, sizes, quality) => {
  await purgeResized(resizedDir);

  await resizeDir(imageDir, resizedDir, sizes, quality);
};

resize(UPLOADS, RESIZED, WIDTHS);
