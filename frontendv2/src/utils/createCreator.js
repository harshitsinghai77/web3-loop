import { create } from "ipfs-http-client";
import * as fs from "fs";

class DeStore {
  ipfs;
  config;

  constructor(url, config) {
    this.ipfs = create({ url: url });
    this.config = config;
  }

  async uploadImage(imageFileName) {
    const imagePath = `${this.config.imagesPath}/${imageFileName}`;
    const fileInfo = await this.ipfs.add({
      path: imageFileName,
      content: fs.readFileSync(imagePath),
    });

    return fileInfo.cid.toString();
  }

  addSocialLinks(
    twitterHandler = "",
    instagramHandler = "",
    youtubeChannel = "",
    github = "",
    facebook = ""
  ) {
    return {
      twitterHandler,
      instagramHandler,
      youtubeChannel,
      github,
      facebook,
    };
  }

  async addCreator(
    username,
    fullName,
    description,
    displayImage,
    socialMediaHandler,
    creatorId,
    creatorAddress
  ) {
    const tokenMetaData = JSON.stringify({
      username: username,
      fullName: fullName,
      description: description,
      image: displayImage,
      socialMediaHandler: socialMediaHandler,
      creatorAddress: creatorAddress,
      attributes: [
        {
          trait_type: "CreatorAddress",
          display_type: "string",
          value: creatorAddress,
        },
        {
          trait_type: "CreatorId",
          display_type: "int",
          value: creatorId,
        },
      ],
    });

    const hash = await this.ipfs.add(tokenMetaData);
    return hash.cid.toString();
  }

  async uploadMetadata(jsonData) {
    const imageHash = await this.uploadImage(jsonData.image);
    const socialMedia = this.addSocialLinks();
    return await this.addCreator(
      jsonData.username,
      jsonData.fullName,
      jsonData.description,
      imageHash,
      socialMedia,
      jsonData.creatorId,
      jsonData.creatorAddress
    );
  }
}

async function main(jsonData) {
  const deStore = new DeStore("https://ipfs.infura.io:5001");
  const hash = await deStore.uploadMetadata(jsonData);
  console.log("hash: ", hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
