export const pack2table = async (packName) => {
  try {
    console.log(packName);
    //See if the journalFolder exists and is of type "journal entry"
    let pack = game.packs.find((el) => el.metadata.label == packName);
    console.log(pack);
    if (pack == null || pack.metadata.entity != "JournalEntry") {
      throw new Error("Invalid Compendium! (Must exist and be of type JournalEntry");
    }
    let packContent = await pack.getContent();
    //console.log("Pack Content: ");
    //console.log(packContent);
    let tableEntries = [];
    for (let i = 0; i < packContent.length; i++) {
      tableEntries[i] = {
        type: 2, //compendium
        text: packContent[i].name,
        collection: pack.collection,
        img: packContent[i].img,
        range: [i + 1, i + 1],
      };
    }

    //if rolltable already exists add to it, else make a new one
    let rTable = await RollTable.create({
      name: packName,
      results: tableEntries,
      formula: `1d${tableEntries.length}`,
    });
    //console.log(rTable);
  } catch (e) {
    console.error(e.message);
    ui.notifications.error(e);
  }
};
