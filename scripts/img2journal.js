// Get List of Img Paths
// Create a new Journal Folder
// Create new Journal Entries for each file in list
//EXPORT THIS // Create a rolltable from all files in folder
//import { log } from "./cardimporter.js";
export const imagesToJournalEntries = async (folderName, targetFolder, files) => {
  //console.log("Folder Name: ", folderName);
  //console.log(files);
  try {
    let folderId = "";
    let folder = game.folders.entities.find((el) => el.name == folderName);
    if (folder != undefined) {
      folderId = folder.id;
    } else {
      folderId = (await Folder.create({ name: folderName, type: "JournalEntry", parent: null })).id;
    }

    let compendium = game.packs.find((el) => el.metadata.label == folderName);
    console.log(compendium);
    if (compendium == null) {
      //create it
      compendium = await Compendium.create({
        name: folderName.toLowerCase(),
        label: folderName,
        entity: "JournalEntry",
      });
    }
    for (let i = 0; i < files.length; i++) {
      //console.log(files[i]);
      let filePath = (await FilePicker.upload("data", targetFolder, files[i], {})).path;
      //console.log(filePath);
      let entry = await JournalEntry.create(
        { name: files[i].name.split(".")[0], img: filePath, folder: folderId },
        { renderSheet: false }
      );
      console.log(entry);
      await compendium.createEntity(entry);
    }
  } catch (e) {
    ui.notifications.error(e.message);
    console.error(e);
  }
};
